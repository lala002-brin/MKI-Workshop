// Lightweight input metadata reader; no QE execution or pseudo validation.
const n = x => Number(String(x).replace(/[dD]/g,'E'));
const last = (text,re) => {const m=[...text.matchAll(re)];return m.length?m.at(-1)[1]:null;};
const numberField=(body,key)=>{const v=last(body,new RegExp('\\b'+key+'\\s*=\\s*([+-]?(?:\\d+\\.?\\d*|\\.\\d+)(?:[EeDd][+-]?\\d+)?)','gi'));return v===null?null:n(v);};
const stringField=(body,key)=>last(body,new RegExp('\\b'+key+'\\s*=\\s*[\\\"\\\']?([A-Za-z0-9_.+\\-]+)','gi'));
export function parseQEInput(text,filename='input.in'){
 const data=String(text).replace(/![^\n\r]*/g,'');
 const system=(data.match(/&SYSTEM\b([\s\S]*?)\/\s*(?:\r?\n|$)/i)||[])[1]||'';
 const control=(data.match(/&CONTROL\b([\s\S]*?)\/\s*(?:\r?\n|$)/i)||[])[1]||'';
 const electrons=(data.match(/&ELECTRONS\b([\s\S]*?)\/\s*(?:\r?\n|$)/i)||[])[1]||'';
 const kp=data.match(/(?:^|\n)\s*K_POINTS\s*\{?\s*(automatic|gamma|crystal|tpiba)\s*\}?\s*(?:\r?\n|$)([^\r\n]*)/i);
 let mesh=null,shifts=null,kpointType=kp?.[1]?.toLowerCase()||null;
 if(kpointType==='automatic'){
  const vals=(kp[2]||'').trim().split(/\s+/).map(Number);
  if(vals.length>=6&&vals.slice(0,6).every(Number.isInteger)&&vals.slice(0,3).every(x=>x>0)&&vals.slice(3,6).every(x=>x===0||x===1)){
   mesh=vals.slice(0,3).join('x');shifts=vals.slice(3,6).join(' ');
  }
 } else if(kpointType==='gamma'){mesh='1x1x1';shifts='0 0 0';}
 const pseudos=[];
 const species=data.match(/(?:^|\n)\s*ATOMIC_SPECIES\s*\r?\n([\s\S]*?)(?=\n\s*(?:ATOMIC_POSITIONS|K_POINTS|CELL_PARAMETERS|OCCUPATIONS|CONSTRAINTS|ATOMIC_FORCES|HUBBARD|&|$))/i);
 if(species){for(const line of species[1].split(/\r?\n/)){const s=line.trim().split(/\s+/);if(s.length>=3&&/^[A-Za-z][A-Za-z0-9]*$/.test(s[0])&&Number.isFinite(Number(s[1])))pseudos.push({element:s[0],upf:s[2]});}}
 return {filename,mesh,shifts,kpointType,wfc:numberField(system,'ecutwfc'),rho:numberField(system,'ecutrho'),atoms:numberField(system,'nat'),ntyp:numberField(system,'ntyp'),nspin:numberField(system,'nspin'),occupations:stringField(system,'occupations'),smearing:stringField(system,'smearing'),degauss:numberField(system,'degauss'),input_dft:stringField(system,'input_dft'),calculation:stringField(control,'calculation'),conv_thr:numberField(electrons,'conv_thr'),pseudos,warnings:[...(!kp?['K_POINTS card tidak ditemukan.']:[]),...(kp&&kpointType==='automatic'&&!mesh?['K_POINTS automatic tidak valid.']:[])]};
}
export function pairStem(name){return String(name).split(/[\\/]/).pop().replace(/\.(?:in|pwi|out|log|txt)$/i,'').replace(/(?:[._-](?:scf|relax))?([._-](?:input|output))$/i,'').toLowerCase();}
export function matchInputsOutputs(inputs,outputs){
 const matches=[],warnings=[];const groups=new Map();for(const it of inputs){const stem=pairStem(it.filename);groups.set(stem,[...(groups.get(stem)||[]),it]);}
 for(const out of outputs){const stem=pairStem(out.filename),candidates=groups.get(stem)||[];if(candidates.length===1)matches.push({output:out,input:candidates[0]});else if(candidates.length>1)warnings.push(`${out.filename}: beberapa input cocok; pilih nama berkas unik.`);else warnings.push(`${out.filename}: file .in pasangan belum ditemukan (nama dasar harus sama).`);}
 return {matches,warnings};
}
