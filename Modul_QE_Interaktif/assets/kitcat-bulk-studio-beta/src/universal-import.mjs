/** KITCAT v0.6 Universal Structure Importer.
 * The legacy Structure Core stores computational cells as 3D-periodic. For
 * ordinary XYZ, boundaryIntent=isolated is metadata, not a claim that QE PBC is disabled.
 */
import {createStructure,cartesianToFractional,fractionalToCartesian,StructureError,ELEMENTS} from './structure-core.mjs';
import {parsePOSCAR,parseXYZ as parseExtendedXYZ,parseCIF,importJSON} from './structure-io.mjs';
const fail=(code,msg)=>{throw new StructureError(code,msg)};
const num=(x)=>{const v=Number(String(x).replace(/[dD]/g,'E'));if(!Number.isFinite(v))fail('INVALID_NUMBER',`Invalid coordinate: ${x}`);return v};
const vec=(v)=>Array.isArray(v)&&v.length===3&&v.every(x=>typeof x==='number'&&Number.isFinite(x));
function xyzRows(text){
 const lines=String(text).replace(/\r/g,'').trimEnd().split('\n');
 const n=Number(lines[0]?.trim());if(!Number.isSafeInteger(n)||n<1||n>100000)fail('INVALID_XYZ','First line must contain atom count (1..100000)');
 if(lines.length<n+2)fail('TRUNCATED_XYZ','XYZ atom records missing');
 if(lines.slice(n+2).some(x=>x.trim()))fail('UNSUPPORTED_XYZ','Multiple XYZ frames or trailing records are unsupported');
 const atoms=[];for(let i=0;i<n;i++){
  const tokens=lines[i+2].trim().split(/\s+/);if(tokens.length!==4)fail('UNSUPPORTED_XYZ_COLUMNS',`Atom ${i+1}: expected exactly element and 3 Cartesian coordinates`);
  const element=tokens[0];if(!ELEMENTS.includes(element))fail('INVALID_ELEMENT',`Atom ${i+1}: unsupported element ${element}`);
  atoms.push({id:`atom-${i+1}`,element,position:tokens.slice(1).map(num)});
 }
 return {comment:lines[1],atoms};
}
export function parseStandardXYZ(text,{cell=null,vacuum=null,center=true}={}){
 const {comment,atoms}=xyzRows(text);
 if(/(?:^|\s)Lattice\s*=/.test(comment))fail('EXTXYZ_USE_EXTENDED','Use parseExtendedXYZ for lattice-bearing Extended XYZ');
 const coords=atoms.map(a=>a.position), minima=[0,1,2].map(j=>Math.min(...coords.map(p=>p[j]))),maxima=[0,1,2].map(j=>Math.max(...coords.map(p=>p[j])));
 let lattice,positions,mode;
 if(cell!==null){
  if(!Array.isArray(cell)||cell.length!==3||!cell.every(vec))fail('INVALID_CELL','Cell must contain three row vectors in Angstrom');
  lattice=cell.map(x=>[...x]);positions=coords;mode='user-supplied-cell';
 }else{
  if(typeof vacuum!=='number'||!Number.isFinite(vacuum)||vacuum<=0)fail('CELL_DEFINITION_REQUIRED','Ordinary XYZ needs explicit cell or a positive vacuum padding (Angstrom)');
  const lengths=[0,1,2].map(j=>maxima[j]-minima[j]+2*vacuum);
  lattice=[[lengths[0],0,0],[0,lengths[1],0],[0,0,lengths[2]]];
  positions=coords.map(p=>p.map((x,j)=>x-minima[j]+(center?vacuum:0)));
  if(!center)positions=coords.map(p=>p.map((x,j)=>x-minima[j]));
  mode='vacuum-box';
 }
 const result=createStructure({lattice,atoms:atoms.map((a,i)=>({id:a.id,element:a.element,fractional:cartesianToFractional(positions[i],lattice)})),metadata:{sourceFormat:'xyz',sourceComment:comment,boundaryIntent:cell?'user-defined':'isolated',cellConstruction:mode,vacuumPaddingAngstrom:vacuum??null,warning:'XYZ has no intrinsic lattice. The computational cell is user-defined; verify periodic-image interactions and QE electrostatics.'}});
 return result;
}
export function inspectStructureFormat(text,{filename=''}={}){
 const s=String(text).replace(/^\uFEFF/,'').trimStart();const ext=String(filename).toLowerCase().split('.').pop();
 if(ext==='cif'||/^data_\S*/im.test(s)&&/_cell_length_a\b/i.test(s))return 'cif';
 if(ext==='json'||s.startsWith('{'))return 'kitcat-json';
 if(ext==='xyz'||/^\d+\s*\n/.test(s))return /(?:^|\s)Lattice\s*=/.test(s.split(/\r?\n/)[1]||'')?'extxyz':'xyz';
 if(ext==='vasp'||ext==='poscar'||/^poscar$/i.test(filename))return 'poscar';
 fail('UNKNOWN_FORMAT','Specify a supported filename extension: .cif, .xyz, .json, .vasp or POSCAR');
}
export function importStructure(text,{format='auto',filename='',xyz={}}={}){
 const kind=format==='auto'?inspectStructureFormat(text,{filename}):format;
 switch(kind){
  case 'cif':return parseCIF(text);
  case 'poscar':return parsePOSCAR(text);
  case 'kitcat-json':return importJSON(text);
  case 'extxyz':return parseExtendedXYZ(text);
  case 'xyz':return parseStandardXYZ(text,xyz);
  default:fail('UNSUPPORTED_FORMAT',`Format ${kind} not supported`);
 }
}
export function exportStandardXYZ(s,{comment='KITCAT atomic Cartesian structure; cell not included'}={}){
 s=createStructure(s);
 if(/\r|\n/.test(comment))fail('INVALID_COMMENT','Comment must be a single line');
 return [String(s.atoms.length),comment,...s.atoms.map(a=>`${a.element} ${fractionalToCartesian(a.fractional,s.lattice).map(v=>v.toPrecision(16)).join(' ')}`),''].join('\n');
}
