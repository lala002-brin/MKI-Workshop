import {createStructure} from '../src/structure-core.mjs';
const norm=v=>Math.hypot(...v);
const composition=atoms=>{const o={};for(const a of atoms)o[a.element]=(o[a.element]||0)+1;return o;};
function sameRatio(a,b){const keys=[...new Set([...Object.keys(a),...Object.keys(b)])];const ratios=keys.map(k=>b[k]?a[k]/b[k]:NaN);return ratios.length>0&&ratios.every(x=>Number.isFinite(x)&&Math.abs(x-ratios[0])<1e-7);}
function equalComposition(a,b){const keys=[...new Set([...Object.keys(a),...Object.keys(b)])];return keys.every(k=>(a[k]||0)===(b[k]||0));}
export function diagnoseSlab(slabInput,{bulkInput=null,layerToleranceAngstrom=0.15,minimumVacuumAngstrom=10}={}){
 const slab=createStructure(slabInput), bulk=bulkInput?createStructure(bulkInput):null;
 const axes=slab.lattice,c=axes[2],L=norm(c),dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
 if(!(L>0)||![...axes.flat()].every(Number.isFinite))throw Error('Kisi slab tidak valid');
 if(axes.slice(0,2).some(v=>Math.abs(dot(v,c))>1e-7*norm(v)*L))throw Error('Diagnostics memerlukan c tegak lurus bidang permukaan');
 if(!(layerToleranceAngstrom>0&&layerToleranceAngstrom<=1))throw Error('Toleransi lapisan harus (0,1] Å');
 if(!(minimumVacuumAngstrom>=0&&Number.isFinite(minimumVacuumAngstrom)))throw Error('Ambang vakum harus finite >= 0');
 const sorted=slab.atoms.map(a=>({z:a.fractional[2]*L,el:a.element})).sort((a,b)=>a.z-b.z);
 if(!sorted.length)throw Error('Slab kosong');
 const clusters=[];for(const e of sorted){let last=clusters.at(-1);if(!last||e.z-last.max>layerToleranceAngstrom){last={min:e.z,max:e.z,atoms:[]};clusters.push(last)}last.max=e.z;last.atoms.push({element:e.el});}
 const min=sorted[0].z,max=sorted.at(-1).z,span=max-min,empty=L-span;
 const top=composition(clusters.at(-1).atoms),bottom=composition(clusters[0].atoms),tot=composition(slab.atoms);
 const issues=[];
 const add=(code,status,message)=>issues.push({code,status,message});
 if(empty<minimumVacuumAngstrom)add('VACUUM_REVIEW','warning',`Jarak kosong geometris ${empty.toFixed(3)} Å di bawah ambang tinjauan ${minimumVacuumAngstrom} Å; bukan kriteria konvergensi.`);
 else add('VACUUM_NOT_VERIFIED','info',`Jarak kosong geometris ${empty.toFixed(3)} Å; kecukupan vakum belum dibuktikan lewat uji konvergensi.`);
 if(clusters.length<3)add('THIN_SLAB_REVIEW','warning','Kurang dari 3 kelompok lapisan; ketebalan fisik perlu ditinjau.');
 else add('THICKNESS_NOT_VERIFIED','info',`${clusters.length} lapisan geometris; konvergensi ketebalan belum diuji.`);
 if(!equalComposition(top,bottom))add('SURFACE_COMPOSITION_DIFFERS','warning','Komposisi lapisan teratas dan terbawah berbeda; ini bukan pembuktian polaritas.');
 else add('SURFACE_SYMMETRY_NOT_VERIFIED','info','Komposisi teratas/terbawah sama, tetapi simetri atomik atau elektrostatik belum terbukti.');
 if(bulk){if(!sameRatio(tot,composition(bulk.atoms)))add('STOICHIOMETRY_DIFFERS','warning','Rasio komposisi slab berbeda dari bulk sumber.');else add('STOICHIOMETRY_RATIO_MATCH','pass','Rasio unsur slab sesuai bulk sumber; tidak membuktikan stabilitas.');}
 else add('STOICHIOMETRY_UNVERIFIED','info','Bulk pembanding tidak tersedia.');
 add('POLARITY_UNVERIFIED','info','Polaritas/dipol tidak dapat ditentukan hanya dari identitas unsur dan geometri.');
 return {status:'GEOMETRY_DRAFT',cellVectorCAngstrom:L,atomicThicknessAngstrom:span,geometricEmptyIntervalAngstrom:empty,topLayerComposition:top,bottomLayerComposition:bottom,totalComposition:tot,layerCount:clusters.length,stoichiometryRatioMatchesBulk:bulk?sameRatio(tot,composition(bulk.atoms)):null,issues};
}
