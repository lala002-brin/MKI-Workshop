/** KITCAT v0.3 import/export. Explicit supported subsets; unsupported variants fail closed. */
import {createStructure, fractionalToCartesian, cartesianToFractional, determinant, StructureError, latticeMetrics} from './structure-core.mjs';
const err=(code,msg)=>{throw new StructureError(code,msg)};
const number=s=>{const v=Number(String(s).replace(/[dD]/g,'E'));if(!Number.isFinite(v))err('INVALID_NUMBER',`Invalid number: ${s}`);return v};
const words=s=>s.trim().split(/\s+/).filter(Boolean);
const cleanLines=s=>String(s).replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));
const elementFromLabel=label=>{const m=String(label).match(/^([A-Z][a-z]?)/);if(!m)err('INVALID_SPECIES',`Cannot identify chemical element for ${label}`);return m[1]};
function make(lattice,atoms,source){return createStructure({lattice,atoms,metadata:{sourceFormat:source}})};
const floats=a=>a.map(number);
function fromVectors(lattice,els,coords,kind,format){if(els.length!==coords.length)err('COUNT_MISMATCH','Atomic symbols and positions differ');const atoms=els.map((el,i)=>({id:`atom-${i+1}`,element:elementFromLabel(el),fractional:kind==='cartesian'?cartesianToFractional(coords[i],lattice):coords[i],speciesLabel:el}));return make(lattice,atoms,format)}
export function parsePOSCAR(text){
 const l=String(text).replace(/\r/g,'').split('\n').map(x=>x.trim());
 // Preserve meaningful lines including POSCAR title; do not strip position comments arbitrarily.
 if(l.length<8)err('TRUNCATED_POSCAR','POSCAR too short');
 const scale=number(l[1]);if(scale===0)err('INVALID_SCALE','POSCAR scale cannot be zero');
 const raw=l.slice(2,5).map(x=>floats(words(x)));if(raw.some(x=>x.length!==3))err('INVALID_CELL','POSCAR lattice must be 3x3');
 let factor=scale;if(scale<0){const v=Math.abs(determinant(raw));if(v===0)err('INVALID_CELL','Zero volume');factor=Math.cbrt((-scale)/v)}
 const lattice=raw.map(r=>r.map(x=>x*factor));
 let idx=5;const names=words(l[idx]||'');if(names.every(x=>/^\d+$/.test(x)))err('UNSUPPORTED_POSCAR','VASP4 POSCAR without element symbols is not supported');idx++;
 const counts=words(l[idx++]||'').map(x=>{const n=number(x);if(!Number.isInteger(n)||n<0)err('INVALID_COUNT','Invalid POSCAR count');return n});
 if(!names.length||names.length!==counts.length)err('COUNT_MISMATCH','POSCAR species/count mismatch');
 let selective=false;if(/^s/i.test(l[idx]||'')){selective=true;idx++}
 const mode=l[idx++]||'',direct=/^[dD]/.test(mode),cart=/^[cCkK]/.test(mode);
 if(!direct&&!cart)err('INVALID_COORDINATES','Require Direct or Cartesian');
 const labels=names.flatMap((n,i)=>Array(counts[i]).fill(n));const atoms=[];
 for(let i=0;i<labels.length;i++){
   if(idx>=l.length)err('TRUNCATED_POSCAR','Missing atom positions');const w=words(l[idx++]);if(w.length<3)err('TRUNCATED_POSCAR','Incomplete position');
   const values=floats(w.slice(0,3));const fractional=cart?cartesianToFractional(values.map(v=>v*factor),lattice):values;
   let constraints={};
   if(selective){if(w.length<6||!w.slice(3,6).every(x=>/^[TF]$/i.test(x)))err('INVALID_FLAGS','Selective dynamics requires exactly three T/F flags for every atom');const free=w.slice(3,6).map(x=>x.toUpperCase()==='T');constraints={selectiveDynamics:free,fixedAxes:free.map(v=>!v)}}
   atoms.push({id:`atom-${i+1}`,element:elementFromLabel(labels[i]),speciesLabel:labels[i],fractional,...constraints});
 }
 if(l.slice(idx).some(x=>x&&!x.startsWith('#')))err('UNSUPPORTED_POSCAR_TRAILING','Trailing POSCAR blocks (e.g. velocities) are not supported; cannot safely discard them');
 return createStructure({lattice,atoms,metadata:{sourceFormat:'poscar',sourceTitle:l[0],coordinateMode:direct?'Direct':'Cartesian',selectiveDynamicsPresent:selective}});
}
export function writePOSCAR(s){
 s=createStructure(s);const labels=[...new Set(s.atoms.map(a=>a.speciesLabel||a.element))];
 const sorted=labels.flatMap(label=>s.atoms.filter(a=>(a.speciesLabel||a.element)===label));
 const hasSelective=sorted.some(a=>a.selectiveDynamics!==undefined||a.fixedAxes!==undefined);
 if(hasSelective&&sorted.some(a=>a.selectiveDynamics===undefined&&a.fixedAxes===undefined))err('MISSING_CONSTRAINTS','Some atoms have Selective Dynamics flags while others do not; explicitly assign flags to all atoms');
 const title=typeof s.metadata?.sourceTitle==='string'&&s.metadata.sourceTitle.trim()?s.metadata.sourceTitle.replace(/\r|\n/g,' ').trim():'KITCAT exported POSCAR';
 return [title,'1.0',...s.lattice.map(r=>r.map(x=>x.toPrecision(15)).join(' ')),labels.join(' '),labels.map(label=>sorted.filter(a=>(a.speciesLabel||a.element)===label).length).join(' '),...(hasSelective?['Selective dynamics']:[]),'Direct',...sorted.map(a=>[...a.fractional.map(x=>x.toPrecision(15)),...(hasSelective?a.selectiveDynamics.map(x=>x?'T':'F'):[])].join(' ')),''].join('\n');
}
export function parseXYZ(text){const l=String(text).replace(/\r/g,'').split('\n');const n=Number(l[0]?.trim());if(!Number.isSafeInteger(n)||n<1)err('INVALID_XYZ','First line must be atom count');if(l.length<n+2)err('TRUNCATED_XYZ','Insufficient lines');const comment=l[1]||'';const m=comment.match(/(?:^|\s)Lattice="([^"]+)"/);if(!m)err('XYZ_CELL_REQUIRED','XYZ needs extended XYZ Lattice="..."; ordinary XYZ has no periodic cell');const a=floats(words(m[1]));if(a.length!==9)err('INVALID_CELL','Extended XYZ Lattice needs 9 numbers');const lattice=[a.slice(0,3),a.slice(3,6),a.slice(6,9)];const labels=[],coords=[];for(let i=0;i<n;i++){const w=words(l[i+2]||'');if(w.length<4)err('TRUNCATED_XYZ','Incomplete XYZ atom');labels.push(w[0]);coords.push(floats(w.slice(1,4)))}return fromVectors(lattice,labels,coords,'cartesian','extxyz')}
export function writeXYZ(s){const lines=[String(s.atoms.length),`Lattice="${s.lattice.flat().join(' ')}" Properties=species:S:1:pos:R:3 pbc="T T T"`];for(const a of s.atoms)lines.push(`${a.element} ${fractionalToCartesian(a.fractional,s.lattice).map(x=>x.toPrecision(15)).join(' ')}`);return lines.join('\n')+'\n'}
function tokenizeCIF(line){return line.match(/'(?:[^']*)'|"(?:[^"]*)"|\S+/g)?.map(x=>x.replace(/^['"]|['"]$/g,''))||[]}
export function parseCIFP1(text){
 const l=String(text).replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(x=>x&&!x.startsWith('#'));
 const tags={};const loops=[];for(let i=0;i<l.length;){if(l[i].startsWith(';'))err('UNSUPPORTED_CIF','Multiline semicolon CIF values not supported');if(/^loop_$/i.test(l[i])){i++;const heads=[];while(i<l.length&&l[i].startsWith('_'))heads.push(l[i++].split(/\s+/)[0].toLowerCase());const rows=[];while(i<l.length&&!l[i].startsWith('_')&&!/^loop_|data_|save_/i.test(l[i])){const w=tokenizeCIF(l[i++]);if(w.length===heads.length)rows.push(w);else err('UNSUPPORTED_CIF','Wrapped CIF loops/multiline values not supported')}loops.push({heads,rows});continue}if(l[i].startsWith('_')){const w=tokenizeCIF(l[i++]);if(w.length!==2)err('UNSUPPORTED_CIF','Expected tag and value on same line');tags[w[0].toLowerCase()]=w[1];continue}i++}
 const required=['_cell_length_a','_cell_length_b','_cell_length_c','_cell_angle_alpha','_cell_angle_beta','_cell_angle_gamma'];if(required.some(x=>!tags[x]))err('MISSING_CELL','Missing unit cell CIF fields');const [a,b,c,al,be,ga]=required.map(t=>number(String(tags[t]).replace(/\([^)]*\)$/,'')));const rad=Math.PI/180,ca=Math.cos(al*rad),cb=Math.cos(be*rad),cg=Math.cos(ga*rad),sg=Math.sin(ga*rad);if(a<=0||b<=0||c<=0||Math.abs(sg)<1e-12)err('INVALID_CELL','Invalid CIF cell');const cz2=1-ca*ca-cb*cb-cg*cg+2*ca*cb*cg;if(cz2<=0)err('INVALID_CELL','Invalid angles');const lattice=[[a,0,0],[b*cg,b*sg,0],[c*cb,c*(ca-cb*cg)/sg,c*Math.sqrt(cz2)/sg]];
 const loop=loops.find(x=>['_atom_site_fract_x','_atom_site_fract_y','_atom_site_fract_z'].every(k=>x.heads.includes(k)));if(!loop)err('NO_FRACTIONAL_ATOMS','CIF requires atom_site_fract_* loop');const pos=k=>loop.heads.indexOf(k);let elIdx=pos('_atom_site_type_symbol');if(elIdx<0)elIdx=pos('_atom_site_label');if(elIdx<0)err('NO_SPECIES','Missing CIF atom symbols');const occup=pos('_atom_site_occupancy');const labels=[],coords=[];for(const row of loop.rows){if(occup>=0&&Math.abs(number(row[occup])-1)>1e-8)err('UNSUPPORTED_CIF_OCCUPANCY','Partial occupancy requires explicit ordering and cannot be silently discarded');labels.push(row[elIdx]);coords.push(['_atom_site_fract_x','_atom_site_fract_y','_atom_site_fract_z'].map(x=>number(row[pos(x)].replace(/\([^)]*\)$/,''))))}if(!labels.length)err('NO_ATOMS','CIF has no atoms');const sym=tags['_space_group_it_number']||tags['_symmetry_int_tables_number'];if(sym&&number(sym)!==1)err('CIF_SYMMETRY_NOT_EXPANDED','Symmetry-expanded CIF needs crystallographic symmetry engine; no silent incomplete imports');if(loops.some(x=>x.heads.includes('_space_group_symop_operation_xyz')||x.heads.includes('_symmetry_equiv_pos_as_xyz')))err('CIF_SYMMETRY_NOT_EXPANDED','Explicit symmetry operations require expansion; unsupported in v0.3');return fromVectors(lattice,labels,coords,'fractional','cif-p1')
}
export function writeQEGeometry(s,{prefix='structure',pseudos={},allowConstraintLoss=false}={}){
 if(!allowConstraintLoss&&s.atoms.some(a=>a.fixedAxes?.some(Boolean)))err('CONSTRAINT_MAPPING_REQUIRED','QE geometry exporter cannot silently discard constrained atoms; use an explicit constraint mapper or allowConstraintLoss=true');const species=[...new Set(s.atoms.map(a=>a.speciesLabel||a.element))];if(species.some(x=>!/^([A-Z][a-z]?)(?:[A-Za-z0-9_]*)$/.test(x)))err('INVALID_SPECIES','QE species label invalid');const spec=species.map(label=>{const symbol=elementFromLabel(label);const p=pseudos[label];if(!p||!p.file||!Number.isFinite(p.mass)||p.mass<=0)err('PSEUDO_REQUIRED',`Explicit UPF file and mass required for ${label}`);return `${label} ${p.mass} ${p.file}`});return [`! KITCAT GEOMETRY FRAGMENT ONLY — NOT RUNNABLE WITHOUT QE NAMELISTS`,`! nat=${s.atoms.length} ntyp=${species.length}; set ibrav=0 in SYSTEM`,`ATOMIC_SPECIES`,...spec,'','CELL_PARAMETERS angstrom',...s.lattice.map(r=>r.join(' ')),'','ATOMIC_POSITIONS crystal',...s.atoms.map(a=>`${a.speciesLabel||a.element} ${a.fractional.join(' ')}`),''].join('\n')}
export function exportJSON(s){return JSON.stringify(s,null,2)+'\n'}
export function importJSON(t){let s;try{s=JSON.parse(t)}catch(e){err('INVALID_JSON',e.message)}return createStructure(s)}

export {parseCIF} from "./cif-symmetry.mjs";
