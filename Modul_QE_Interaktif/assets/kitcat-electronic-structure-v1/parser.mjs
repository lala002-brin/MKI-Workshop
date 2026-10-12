export const num = s => {const v=Number(String(s).replace(/[dD]/g,'e'));return Number.isFinite(v)?v:null};
export function numericRows(text){return text.split(/\r?\n/).map((line)=>{const x=line.trim();if(!x||/^[#!@]/.test(x))return null;const p=x.split(/\s+/).map(num);return p.length>=2&&p.every(v=>v!==null)?p:null}).filter(Boolean)}
export function readDOS(text,name='dos.dat'){
 const rows=numericRows(text);if(rows.length<2)throw Error('Minimal dua baris numerik DOS diperlukan.');
 const n=Math.min(...rows.map(r=>r.length));if(n<2)throw Error('Kolom DOS tidak cukup.');
 const first=text.split(/\r?\n/).find(l=>/fermi/i.test(l))||'';
 const fm=first.match(/(?:EFermi|E\s*fermi|Fermi\s+energy)\s*[:=]?\s*([-+\d.EeDd]+)/i);
 const fermi=fm?num(fm[1]):null;
 return {kind:'dos',name,fermi,columns:n,points:rows.map(r=>({x:r[0],ys:r.slice(1,n)})),warning:n>3?'Kolom tambahan bisa berupa integrated DOS. Pilih kolom yang sesuai dengan header file.':null};
}
export function readPDOS(text,name='pdos'){
 const rows=numericRows(text);if(rows.length<2)throw Error('Minimal dua baris numerik PDOS diperlukan.');
 const n=Math.min(...rows.map(r=>r.length));if(n<2)throw Error('Kolom PDOS tidak cukup.');
 const meta=name.match(/pdos_atm#(\d+)\(([^)]*)\)_wfc#(\d+)\(([^)]*)\)/i);
 const tot=/pdos_tot/i.test(name);
 return {kind:'pdos',name,atom:meta?Number(meta[1]):null,species:meta?meta[2]:null,wfc:meta?Number(meta[3]):null,orbital:meta?meta[4]:tot?'total':'unspecified',columns:n,points:rows.map(r=>({x:r[0],ys:r.slice(1,n)})),warning:n>2?'Kolom spin/LDOS/proyeksi berbeda antarjenis PDOS. Periksa header sebelum memilih kolom.':null};
}
export function readBandsGNU(text,name='bands.dat.gnu'){
 const bands=[];let current=[];for(const line of text.split(/\r?\n/)){
  const s=line.trim();if(!s||s.startsWith('#')){if(!s&&current.length){bands.push(current);current=[]}continue}
  const p=s.split(/\s+/).map(num);if(p.length>=2&&p[0]!==null&&p[1]!==null){
   if(current.length&&p[0]<current.at(-1).x-1e-8){bands.push(current);current=[]}
   current.push({x:p[0],y:p[1]});
  }
 }
 if(current.length)bands.push(current);
 const valid=bands.filter(b=>b.length>=2);if(!valid.length)throw Error('Format band tidak dikenali. Gunakan data dua kolom dari bands.x (filband.gnu), dengan baris kosong antarband.');
 return {kind:'bands',name,bands:valid,kmin:Math.min(...valid.flat().map(p=>p.x)),kmax:Math.max(...valid.flat().map(p=>p.x))};
}
export function inferGap(bands,fermi,threshold=1e-5){
 if(!Number.isFinite(fermi))return {status:'unknown',reason:'Fermi/reference energy belum diset; tidak ada penentuan band gap otomatis.'};
 const vals=bands.flat().map(p=>p.y-fermi);
 const vb=Math.max(...vals.filter(x=>x<=threshold));const cb=Math.min(...vals.filter(x=>x>=-threshold));
 if(!Number.isFinite(vb)||!Number.isFinite(cb))return {status:'unknown',reason:'Data energi tidak mencakup kedua sisi energi referensi.'};
 if(vals.some(v=>Math.abs(v)<threshold))return {status:'crossing',reason:'Ada titik di Fermi; band gap tidak dapat disimpulkan hanya dari sampel lintasan ini.'};
 return {status:'path-estimate',gap:Math.max(0,cb-vb),vbm:vb,cbm:cb,reason:'Estimasi hanya sepanjang lintasan k yang diunggah, bukan jaminan fundamental gap seluruh Brillouin zone.'};
}
export function qeFermi(text){
 const all=[...text.matchAll(/(?:the\s+Fermi\s+energy\s+is|Fermi\s+energy\s*(?:is|=)|highest\s+occupied\s+level\s*\(ev\)\s*:)\s*([-+\d.]+)\s*ev/ig)];
 return all.length?num(all.at(-1)[1]):null;
}

// QE projwfc.x: unpolarized [E, LDOS, m...]; collinear [E, LDOSup, LDOSdw, m1up,m1dw,...].
// Never infer spin merely from column count: non-spin p/d orbitals have many columns.
export function pdosChannel(file,spin='total',schema='auto'){
 const rows=file.points||[];if(!rows.length)throw Error('No PDOS rows');
 const n=file.columns;let spinful=schema==='collinear',orb=String(file.orbital||'').toLowerCase();
 const angular=orb.match(/\(([spdf])\)/)?.[1]||orb.match(/^[spdf]/)?.[0]||null;
 const expected=angular?({s:1,p:3,d:5,f:7}[angular]):null;
 if(schema==='auto'&&expected){if(n===3+expected*2)spinful=true;else if(n===2+expected)spinful=false;else throw Error(`${file.name}: ${n} kolom tidak cocok dengan skema orbital ${angular}; pilih mode kolom manual.`)}
 else if(schema==='auto')throw Error(`${file.name}: orbital tidak dikenali; set skema spin secara eksplisit.`);
 if(spinful&&n<5)throw Error(`${file.name}: kolom spin tidak cukup`);
 const proj=spinful?Array.from({length:Math.floor((n-3)/2)},(_,i)=>[3+i*2,4+i*2]).flat():Array.from({length:n-2},(_,i)=>2+i);
 const pairs=rows.map(p=>{
  const up=spinful?proj.filter((_,i)=>i%2===0).reduce((a,i)=>a+(p.ys[i-1]??0),0):proj.reduce((a,i)=>a+(p.ys[i-1]??0),0);
  const down=spinful?proj.filter((_,i)=>i%2===1).reduce((a,i)=>a+(p.ys[i-1]??0),0):0;
  return {x:p.x,up,down};
 });
 if(spin==='up')return {points:pairs.map(p=>({x:p.x,y:p.up})),spinful};
 if(spin==='down')return {points:pairs.map(p=>({x:p.x,y:p.down})),spinful};
 return {points:pairs.map(p=>({x:p.x,y:p.up+p.down})),spinful};
}
export function pdosGroups(files,{species='all',orbital='all',spin='total',schema='auto',groupBy='orbital'}={}){
 const groups=new Map(),warnings=[];
 for(const file of files){
  if(file.kind!=='pdos'||!file.atom||!file.species){warnings.push(`${file.name}: not a site-resolved PDOS file; excluded from aggregation`);continue}
  const base=String(file.orbital||'').toLowerCase().match(/[spdf]/)?.[0]||'?';
  if(species!=='all'&&file.species!==species)continue;
  if(orbital!=='all'&&base!==orbital)continue;
  let channel;try{channel=pdosChannel(file,spin,schema)}catch(e){warnings.push(e.message);continue}
  if(spin==='down'&&!channel.spinful){warnings.push(`${file.name}: no collinear spin-down detected`);continue}
  const key=groupBy==='species'?file.species:groupBy==='atom'?`${file.species} #${file.atom}`:groupBy==='species-orbital'?`${file.species} ${base}`:base;
  const old=groups.get(key);
  if(!old){groups.set(key,{name:key,points:channel.points.map(p=>({...p})),files:1});continue}
  if(old.points.length!==channel.points.length||old.points.some((p,i)=>Math.abs(p.x-channel.points[i].x)>1e-6)){
   warnings.push(`${file.name}: energy grid differs from group ${key}; excluded (no interpolation)`);continue;
  }
  old.points.forEach((p,i)=>p.y+=channel.points[i].y);old.files++;
 }
 return {groups:[...groups.values()],warnings};
}

export function sameBandKPath(a,b,tol=1e-6){
 if(!a||!b||!a.bands?.length||!b.bands?.length)return false;
 const k=a.bands[0].map(p=>p.x),q=b.bands[0].map(p=>p.x);
 return k.length===q.length&&k.every((x,i)=>Number.isFinite(x)&&Math.abs(x-q[i])<=tol)&&[a,b].every(file=>file.bands.every(b=>b.length===file.bands[0].length&&b.every((p,i)=>Math.abs(p.x-file.bands[0][i].x)<=tol)));
}
