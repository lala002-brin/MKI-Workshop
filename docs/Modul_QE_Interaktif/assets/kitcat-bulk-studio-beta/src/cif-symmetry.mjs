/** KITCAT CIF symmetry expansion, explicit operation_xyz subset. No database inference. */
import {createStructure, StructureError, wrapFractional} from './structure-core.mjs';
import {parseCIFP1} from './structure-io.mjs';
const fail=(c,m)=>{throw new StructureError(c,m)};
const SYM_KEYS=['_space_group_symop_operation_xyz','_symmetry_equiv_pos_as_xyz'];
function tokenize(line){return line.match(/'(?:[^']*)'|"(?:[^"]*)"|\S+/g)?.map(x=>x.replace(/^['"]|['"]$/g,''))||[];}
function rational(text){const m=text.match(/^(\d+)(?:\/(\d+))?$/);if(!m)fail('INVALID_SYMMETRY',`Unsupported constant: ${text}`);const den=m[2]?Number(m[2]):1;if(!den)fail('INVALID_SYMMETRY','Zero denominator');return Number(m[1])/den;}
export function parseSymmetryOperation(op){
 const axes=String(op).replace(/\s+/g,'').toLowerCase().split(',');if(axes.length!==3)fail('INVALID_SYMMETRY','Operation must have 3 coordinate components');
 const matrix=[],offset=[];
 for(const expr of axes){const terms=expr.match(/[+-]?[^+-]+/g);if(!terms||terms.join('')!==expr)fail('INVALID_SYMMETRY',`Malformed expression: ${expr}`);const row=[0,0,0];let t=0;
 for(const term of terms){const sign=term[0]==='-'?-1:1;const raw=term.replace(/^[+-]/,'');if(/^[xyz]$/.test(raw)){const j='xyz'.indexOf(raw);row[j]+=sign;}else t+=sign*rational(raw);}
 if(row.some(v=>Math.abs(v)>1)||!row.some(Boolean))fail('INVALID_SYMMETRY','Unsupported coordinate transform');matrix.push(row);offset.push(t);}
 const d=matrix[0][0]*(matrix[1][1]*matrix[2][2]-matrix[1][2]*matrix[2][1])-matrix[0][1]*(matrix[1][0]*matrix[2][2]-matrix[1][2]*matrix[2][0])+matrix[0][2]*(matrix[1][0]*matrix[2][1]-matrix[1][1]*matrix[2][0]);
 if(Math.abs(d)!==1)fail('INVALID_SYMMETRY','Matrix is not a crystallographic unimodular rotation');
 return {matrix,offset,source:op};
}
function extract(text){
 const lines=String(text).replace(/\r/g,'').split('\n');const kept=[],ops=[];let found=false;
 for(let i=0;i<lines.length;){const line=lines[i].trim();if(/^loop_$/i.test(line)){
   let j=i+1;const heads=[];while(j<lines.length&&lines[j].trim().startsWith('_'))heads.push(lines[j++].trim().split(/\s+/)[0].toLowerCase());
   if(heads.some(h=>SYM_KEYS.includes(h))){if(found)fail('AMBIGUOUS_SYMMETRY','Multiple symmetry operation loops');found=true;const idx=heads.findIndex(h=>SYM_KEYS.includes(h));
    while(j<lines.length){const s=lines[j].trim();if(!s||s.startsWith('#')){j++;continue}if(s.startsWith('_')||/^(loop_|data_|save_)/i.test(s))break;const v=tokenize(s);if(v.length!==heads.length)fail('UNSUPPORTED_CIF','Wrapped symmetry loop is not supported');ops.push(v[idx]);j++;}i=j;continue;
   }
  }
  if(/^(_space_group_it_number|_symmetry_int_tables_number)\s+/i.test(line)){kept.push(line.replace(/\s+\S+\s*$/,' 1'));i++;continue;}
  kept.push(lines[i++]);
 }
 return {plain:kept.join('\n'),ops,found};
}
function sameSite(a,b,eps){return a.every((x,k)=>{let d=x-b[k];d-=Math.round(d);return Math.abs(d)<eps})}
export function parseCIF(text,{tolerance=1e-6,maxAtoms=50000}={}){
 if(!(tolerance>0&&tolerance<0.01))fail('INVALID_TOLERANCE','Tolerance must be positive and below 0.01 fractional units');
 const {plain,ops,found}=extract(text);
 if(!found){return parseCIFP1(text)}
 if(!ops.length)fail('INVALID_SYMMETRY','Empty symmetry operations');
 const base=parseCIFP1(plain);const transforms=ops.map(parseSymmetryOperation);const atoms=[];
 for(const a of base.atoms){for(const tr of transforms){const f=wrapFractional(tr.matrix.map((row,i)=>row.reduce((s,v,j)=>s+v*a.fractional[j],tr.offset[i])));
 const matching=atoms.find(x=>sameSite(x.fractional,f,tolerance));
 if(matching){if(matching.element!==a.element||matching.speciesLabel!==a.speciesLabel)fail('SITE_COLLISION','Different atom species occupy the same fractional site');continue;}
 if(atoms.length>=maxAtoms)fail('ATOM_LIMIT','Expanded CIF exceeds atom limit');atoms.push({id:`atom-${atoms.length+1}`,element:a.element,speciesLabel:a.speciesLabel,fractional:f});
 }}
 return createStructure({lattice:base.lattice,atoms,metadata:{...base.metadata,sourceFormat:'cif-symmetry-explicit',symmetryOperationCount:ops.length,asymmetricSiteCount:base.atoms.length,expansionTolerance:tolerance,warning:'Explicit symmetry operations only; no space group database inference or disorder resolution.'}});
}
