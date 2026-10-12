/** KITCAT UPF v0.8. Strict metadata extraction and auditable preflight checks.
 * This is NOT a pseudopotential numerical-quality validator.
 */
import {createStructure,StructureError} from './structure-core.mjs';
const err=(code,message)=>{throw new StructureError(code,message)};
const normalizeElement=x=>String(x||'').trim().replace(/[^A-Za-z]/g,'');
const attr=(tag,name)=>{const m=tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(["'])(.*?)\\1`,'i'));return m?.[2]??null};
const num=x=>{if(x==null||String(x).trim()==='')return null;const n=Number(String(x).replace(/[dD]/g,'E'));return Number.isFinite(n)?n:null};
const yes=x=>x==null?null:/^(true|t|1|yes)$/i.test(x)?true:/^(false|f|0|no)$/i.test(x)?false:null;
export function parseUPF(text,{maxBytes=20_000_000}={}){
 if(typeof text!=='string'||!text.trim())err('INVALID_UPF','UPF text must not be empty');
 if(text.length>maxBytes)err('UPF_TOO_LARGE','UPF exceeds configured character limit');
 const header=/<PP_HEADER\b[^>]*\/?>/i.exec(text);
 if(!header)err('UPF_HEADER_MISSING','UPF v2 PP_HEADER not found; legacy formats are not silently guessed');
 const h=header[0];
 const element=normalizeElement(attr(h,'element'));
 if(!/^[A-Z][a-z]?$/.test(element))err('UPF_ELEMENT_MISSING','Unrecognized element in UPF header');
 const functional=attr(h,'functional');
 const pseudoType=attr(h,'pseudo_type');
 const rel=attr(h,'relativistic');
 const zValence=num(attr(h,'z_valence'));
 const wfc=num(attr(h,'wfc_cutoff'));const rho=num(attr(h,'rho_cutoff'));
 const nlcc=yes(attr(h,'core_correction'));const hasSo=yes(attr(h,'has_so'));
 const warnings=[];
 if(!functional)warnings.push('Exchange-correlation functional not declared in UPF header.');
 if(!pseudoType)warnings.push('Pseudo type not declared in UPF header.');
 if(wfc==null||rho==null)warnings.push('Suggested cutoffs absent; must establish cutoffs by testing.');
 return {format:'UPF-v2-header',element,functional:functional?.trim()||null,pseudoType:pseudoType?.trim()||null,relativistic:rel?.trim()||null,zValence,cutoffsRy:{wfc,rho},coreCorrection:nlcc,hasSpinOrbit:hasSo,warnings};
}
function canonicalFunctional(x){return String(x??'').toUpperCase().replace(/[^A-Z0-9]/g,'')}
/** UPF map by QE species label, value {file,text}. No local file reading is attempted. */
export function validatePWSetup(structure,config,upfFiles={}){
 const s=createStructure(structure);const issues=[];const push=(severity,code,message)=>issues.push({severity,code,message});
 const species=[...new Set(s.atoms.map(a=>a.speciesLabel||a.element))];
 const cutW=config.ecutwfc,cutR=config.ecutrho;
 if(!Number.isFinite(cutW)||cutW<=0||!Number.isFinite(cutR)||cutR<=0)push('error','CUTOFF_INVALID','Both ecutwfc and ecutrho must be positive finite numbers (Ry).');
 else if(cutR<cutW)push('error','CUTOFF_ORDER','ecutrho must be >= ecutwfc.');
 const metadata={};
 for(const label of species){
  const element=s.atoms.find(a=>(a.speciesLabel||a.element)===label).element;
  const selected=config.pseudos?.[label];
  if(!selected?.file){push('error','PSEUDO_MAPPING_MISSING',`No UPF filename mapped for ${label}.`);continue}
  const resource=upfFiles[label];
  if(!resource){push('warning','UPF_NOT_READ',`UPF contents for ${label} not provided; cannot verify element or cutoffs.`);continue}
  if(resource.file!==selected.file){push('error','UPF_FILENAME_MISMATCH',`${label}: selected filename differs from provided UPF filename.`);continue}
  try{const p=parseUPF(resource.text);metadata[label]=p;
   if(p.element!==element)push('error','UPF_ELEMENT_MISMATCH',`${label} (${element}) uses UPF declaring ${p.element}.`);
   if(p.cutoffsRy.wfc!=null&&Number.isFinite(cutW)&&cutW<p.cutoffsRy.wfc)push('warning','ECUTWFC_BELOW_HINT',`${label}: ecutwfc below UPF suggested value ${p.cutoffsRy.wfc} Ry.`);
   if(p.cutoffsRy.rho!=null&&Number.isFinite(cutR)&&cutR<p.cutoffsRy.rho)push('warning','ECUTRHO_BELOW_HINT',`${label}: ecutrho below UPF suggested value ${p.cutoffsRy.rho} Ry.`);
   if(p.functional&&config.functional&&canonicalFunctional(p.functional)!==canonicalFunctional(config.functional))push('warning','XC_LABEL_DIFFERENCE',`${label}: UPF XC label '${p.functional}' differs from requested '${config.functional}'; confirm aliases and compatibility manually.`);
   if(p.hasSpinOrbit===true&&config.lspinorb!==true)push('warning','SO_UPF_WITHOUT_SOC',`${label}: UPF has spin-orbit metadata; SOC is not enabled in this scoped generator.`);
   for(const warning of p.warnings)push('info','UPF_METADATA_INCOMPLETE',`${label}: ${warning}`);
  }catch(e){push('error','UPF_PARSE_ERROR',`${label}: ${e.message}`)}
 }
 if(config.lspinorb===true||config.noncolin===true)push('error','UNSUPPORTED_RELATIVISTIC_MODE','v0.8 generator does not support noncollinear or spin–orbit QE input.');
 const uniqueXc=[...new Set(Object.values(metadata).map(v=>canonicalFunctional(v.functional)).filter(Boolean))];
 if(uniqueXc.length>1)push('warning','MIXED_XC_LABELS','UPFs declare different XC labels; investigate compatibility.');
 if(!Array.isArray(config.kpoints)||config.kpoints.length!==3||config.kpoints.some(n=>!Number.isSafeInteger(n)||n<=0))push('error','KPOINTS_INVALID','K-points must be three positive integers.');
 if(config.modelType==='molecule'&&config.kpoints?.some(n=>n!==1))push('warning','MOLECULE_KPOINTS','Isolated molecular supercells typically start with Gamma-only sampling.');
 if(config.modelType==='slab'&&config.kpoints?.[2]!==1)push('warning','SLAB_KPOINTS','For vacuum normal to the third lattice vector, review kz sampling; 1 is commonly used.');
 push('info','CONVERGENCE_NOT_VERIFIED','UPF cutoff hints, grid checks, and metadata do not prove DFT convergence or scientific suitability.');
 const errors=issues.filter(i=>i.severity==='error');
 return {status:errors.length?'blocked':issues.some(i=>i.severity==='warning')?'review':'checked',issues,metadata,scope:'Static preflight only; no pw.x execution, UPF integrity checksum, or physical convergence testing'};
}
