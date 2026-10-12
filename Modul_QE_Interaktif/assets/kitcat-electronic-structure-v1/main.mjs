import {readDOS,readPDOS,readBandsGNU,qeFermi,pdosGroups,sameBandKPath} from './parser.mjs';
const $=id=>document.getElementById(id);let tab='dos',data=[],svgText='',lastRows=[],combinedDOS=null,combinedPDOS=[],bandDOSBands=null,bandDOSDOS=null,spinUpBands=null,spinDownBands=null,spinError='';const colors=['#1764ad','#df842e','#288472','#a34782','#6b75c4','#bc5148','#5f6d7a'];
const safe=t=>String(t).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const settings=()=>Object.fromEntries(['fermi','xmin','xmax','column','ylabel','title','color','refcolor','width','font','layout','scale','kpath'].map(id=>[id,$(id).value]));
const estimate=(a,b,count=5)=>{if(!Number.isFinite(a)||!Number.isFinite(b)||a===b)return[];return Array.from({length:count},(_,i)=>a+(b-a)*i/(count-1))};
const fmt=v=>!Number.isFinite(v)?'–':(Math.abs(v)<1e-9?'0':Number(v.toPrecision(4)).toString());
function strokes(series,xf,yf,c,w){let d='';for(const p of series){if(!Number.isFinite(p.x)||!Number.isFinite(p.y)){d+=' ';continue}d+=`${d?' L':'M'}${xf(p.x).toFixed(2)},${yf(p.y).toFixed(2)}`}return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`}
function chooseSeries(){const s=settings(),fermi=Number(s.fermi||0),column=Math.max(1,Math.floor(Number(s.column||2))-1);let series=[],notes=[],names=[];
 if(tab==='pdos' && $('pdosMode').value==='aggregate'){
  const ag=pdosGroups(data,{species:$('pdosSpecies').value,orbital:$('pdosOrbital').value,spin:$('pdosSpin').value,schema:$('pdosSchema').value,groupBy:$('pdosGroup').value});notes.push(...ag.warnings);
  for(const g of ag.groups){series.push(g.points.map(p=>({x:p.x-fermi,y:$('mirror').checked&&$('pdosSpin').value==='down'?-p.y:p.y})));names.push(`${g.name} (${g.files} files)`)}
 }else if(tab==='bands'){for(const file of activeSpinBands(data)){for(const [i,b] of file.bands.entries()){series.push(b.map(p=>({x:p.x,y:p.y-fermi})));names.push(`${file.spin||file.name} · band ${i+1}`)}}}
 else {for(const file of data){if(column>file.columns-1){notes.push(`${file.name}: kolom ${column+1} tidak tersedia`);continue}let p=file.points.map(r=>({x:r.x-fermi,y:r.ys[column-1]}));if($('mirror').checked && file.columns>=3 && column===2)p=p.map(z=>({...z,y:-z.y}));series.push(p);names.push(file.name);if(file.warning)notes.push(`${file.name}: ${file.warning}`)}}
 return {series,notes,names};}
function plot(){if(tab==='combined'){plotCombined();return;}if(tab==='banddos'){plotBandDOS();return;}const s=settings(),f=Number(s.font),{series,notes,names}=chooseSeries();$('count').textContent=`${data.length} file · ${series.length} curve(s)`;
 if(!series.length){$('plot').innerHTML='<p class="small">Upload hasil QE atau muat data demo untuk mulai.</p>';$('audit').textContent=[...notes,spinError].filter(Boolean).join('\n')||'Belum ada data valid.';svgText='';$('gap').hidden=true;return}
 const shape={landscape:[1200,700],column:[900,900],wide:[1500,650]}[s.layout]||[1200,700];const [W,H]=shape;
 const m={left:110,right:52,top:105,bottom:108};const pw=W-m.left-m.right,ph=H-m.top-m.bottom;let xmin,xmax,ymin,ymax;
 if(tab==='bands'){xmin=Math.min(...series.flat().map(z=>z.x));xmax=Math.max(...series.flat().map(z=>z.x));}else{xmin=Number(s.xmin);xmax=Number(s.xmax)}
 if(!Number.isFinite(xmin)||!Number.isFinite(xmax)||xmin>=xmax){$('audit').textContent='Rentang X tidak valid (minimum harus lebih kecil dari maksimum).';return}
 const clipped=series.flat().filter(p=>p.x>=xmin&&p.x<=xmax);if(!clipped.length){$('audit').textContent='Tidak ada titik di rentang X; ubah batas energi.';return}
 ymin=Math.min(...clipped.map(p=>p.y));ymax=Math.max(...clipped.map(p=>p.y));let pad=(ymax-ymin||1)*.10;ymin-=pad;ymax+=pad;
 if(tab!=='bands'&&clipped.every(p=>p.y>=0))ymin=0;
 const xf=x=>m.left+(x-xmin)/(xmax-xmin)*pw,yf=y=>m.top+ph-(y-ymin)/(ymax-ymin)*ph;
 const grid=$('grid').checked;let v=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="KITCAT scientific figure">`;
 v+=`<rect width="${W}" height="${H}" fill="#ffffff"/><text x="${W/2}" y="48" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="${f+6}" font-weight="bold" fill="#1c2c3f">${safe(s.title)}</text>`;
 for(const x of estimate(xmin,xmax,6)){let px=xf(x);if(grid)v+=`<path d="M ${px} ${m.top} V ${m.top+ph}" stroke="#dce3e9" stroke-width="1"/>`;v+=`<text x="${px}" y="${m.top+ph+30}" text-anchor="middle" font-family="Arial" font-size="${f}" fill="#32485d">${fmt(x)}</text>`}
 for(const y of estimate(ymin,ymax,6)){let py=yf(y);if(grid)v+=`<path d="M ${m.left} ${py} H ${m.left+pw}" stroke="#dce3e9" stroke-width="1"/>`;v+=`<text x="${m.left-16}" y="${py+5}" text-anchor="end" font-family="Arial" font-size="${f}" fill="#32485d">${fmt(y)}</text>`}
 v+=`<path d="M${m.left} ${m.top}V${m.top+ph}H${m.left+pw}" stroke="#283c50" stroke-width="2" fill="none"/>`;
 const label=tab==='bands'?'k-path coordinate (a.u.)':'E − E_F (eV)',yl=tab==='bands'?'Energy − E_F (eV)':s.ylabel;
 v+=`<text x="${W/2}" y="${H-33}" text-anchor="middle" font-family="Arial" font-size="${f+2}" fill="#20384f">${safe(label)}</text><text x="30" y="${H/2}" transform="rotate(-90 30 ${H/2})" text-anchor="middle" font-family="Arial" font-size="${f+2}" fill="#20384f">${safe(yl)}</text>`;
 v+=`<defs><clipPath id="graphClip"><rect x="${m.left}" y="${m.top}" width="${pw}" height="${ph}"/></clipPath></defs><g clip-path="url(#graphClip)">`;
 if(tab==='bands'&&ymin<=0&&ymax>=0)v+=`<path d="M${m.left} ${yf(0)} H${m.left+pw}" stroke="${s.refcolor}" stroke-width="2" stroke-dasharray="9 6"/>`;
 if(tab!=='bands'&&xmin<=0&&xmax>=0)v+=`<path d="M${xf(0)} ${m.top} V${m.top+ph}" stroke="${s.refcolor}" stroke-width="2" stroke-dasharray="9 6"/>`;
 if(tab==='bands'&&s.kpath.trim()){for(const pair of s.kpath.split(',')){const [k,label]=pair.trim().split(':');const x=Number(k);if(!Number.isFinite(x)||x<xmin||x>xmax||!label)continue;v+=`<path d="M${xf(x)} ${m.top}V${m.top+ph}" stroke="#adb9c5" stroke-dasharray="5 7"/><text x="${xf(x)}" y="${m.top-12}" fill="#2e4e68" font-size="${f}" text-anchor="middle">${safe(label)}</text>`}}
 series.forEach((a,i)=>v+=strokes(a,xf,yf,tab==='bands'&&names[i].startsWith('down ·')?$('spinDownColor').value:tab==='bands'&&names[i].startsWith('up ·')?$('spinUpColor').value:i===0?s.color:colors[i%colors.length],Number(s.width)));
 v+='</g>';
 if($('legend').checked&&series.length<=8&&tab!=='bands'){series.forEach((p,i)=>{const x=m.left+14+(i%3)*Math.max(170,pw/3),y=76+Math.floor(i/3)*22;v+=`<path d="M${x} ${y}h27" stroke="${i===0?s.color:colors[i%colors.length]}" stroke-width="3"/><text x="${x+34}" y="${y+5}" font-family="Arial" fill="#475d72" font-size="${Math.max(11,f-3)}">${safe(names[i].slice(0,28))}</text>`})}
 v+='</svg>';svgText=v;$('plot').innerHTML=v;
 const unique=[...new Set(notes)];$('audit').textContent=(tab==='bands'?'Bands: pastikan filband.gnu berasal dari satu lintasan k terdefinisi; k-path labels harus dimasukkan sesuai input.':'DOS/PDOS: periksa header kolom, spin, satuan, dan E_F. Data dari material berbeda tidak boleh ditafsirkan sebagai satu spektrum.')+(unique.length?'\n'+unique.join('\n'):'')+(spinError&&tab==='bands'?'\n'+spinError:'');$('audit').className='notice'+(unique.length?' warn':'');
 $('gap').hidden=tab!=='bands';if(tab==='bands'){$('gap').textContent='Interpretasi gap: nilai sepanjang lintasan k saja tidak dapat membuktikan fundamental band gap. Metallic crossing di antara titik k juga mungkin terlewat; periksa data pada seluruh BZ, occupation, spin, dan kualitas k-sampling.'}
 lastRows=series.flat().filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y));
}
function save(name,blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1200)}
async function exportImage(kind){if(!svgText)return;const base=`kitcat_${tab}${spinUpBands||spinDownBands?'_spin':''}_${$('layout').value}`;if(kind==='svg'){save(base+'.svg',new Blob([svgText],{type:'image/svg+xml;charset=utf-8'}));return}
 const svg=new Blob([svgText],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(svg);const img=new Image();img.onload=()=>{const shape=(tab==='banddos'?{landscape:[1200,800],column:[900,1050],wide:[1500,800]}:tab==='combined'?{landscape:[1200,900],column:[900,1200],wide:[1500,860]}:{landscape:[1200,700],column:[900,900],wide:[1500,650]})[$('layout').value],scale=Number($('scale').value),c=document.createElement('canvas');c.width=shape[0]*scale;c.height=shape[1]*scale;const ctx=c.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);c.toBlob(blob=>{if(blob)save(base+'.'+kind,blob);else alert('Gagal ekspor gambar.')},kind==='jpg'?'image/jpeg':'image/png',.95);URL.revokeObjectURL(url)};img.onerror=()=>{URL.revokeObjectURL(url);alert('Browser tidak dapat merender SVG menjadi '+kind)};img.src=url}
$('files').addEventListener('change',async e=>{const files=[...e.target.files];let next=[],errors=[];for(const file of files){try{const t=await file.text();next.push(tab==='dos'?readDOS(t,file.name):tab==='pdos'?readPDOS(t,file.name):readBandsGNU(t,file.name))}catch(err){errors.push(`${file.name}: ${err.message}`)}}data=next;$('fileInfo').textContent=`${next.length} file valid${errors.length?'\n'+errors.join('\n'):''}`;$('fileInfo').className='notice'+(errors.length?' warn':'');refreshPDOS();plot()});
$('qeout').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;const f=qeFermi(await file.text());if(f!==null){$('fermi').value=f;$('fileInfo').textContent=`E_F = ${f} eV dibaca dari ${file.name}. Verifikasi bahwa run ini sama dengan data spektrum.`}else $('fileInfo').textContent=`E_F tidak ditemukan dalam ${file.name}. Isi nilai referensi secara manual.`;plot()});
for(const btn of document.querySelectorAll('[data-tab]'))btn.onclick=()=>{tab=btn.dataset.tab;document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b===btn));data=[];refreshPDOS();$('files').value='' ;$('fileInfo').textContent='Upload file untuk '+tab;const h={dos:'.dos / dos.dat',pdos:'*.pdos_tot / *.pdos_atm#*',bands:'filband.gnu dari bands.x'};$('uploadHint').textContent=h[tab]||'Gunakan upload Total DOS + PDOS di bawah';$('combinedUploads').hidden=tab!=='combined';$('bandDOSUploads').hidden=tab!=='banddos';$('spinBandsUploads').hidden=tab!=='bands'&&tab!=='banddos';$('files').closest('.filebox').hidden=tab==='combined'||tab==='banddos';$('pdosPanel').hidden=tab!=='pdos'&&tab!=='combined';$('title').value={dos:'Total density of states',pdos:'Projected density of states',bands:'Electronic band structure',combined:'Total and projected density of states',banddos:'Electronic bands and density of states'}[tab];$('ylabel').value=tab==='pdos'?'PDOS (states/eV)':'DOS (states/eV)';plot()};
for(const id of ['pdosMode','pdosSpecies','pdosOrbital','pdosGroup','pdosSpin','pdosSchema','fermi','xmin','xmax','column','ylabel','title','color','refcolor','width','font','layout','kpath','grid','mirror','legend','spinUpColor','spinDownColor','spinDownDash'])$(id).addEventListener('input',plot);
$('svg').onclick=()=>exportImage('svg');$('png').onclick=()=>exportImage('png');$('jpg').onclick=()=>exportImage('jpg');$('csv').onclick=()=>{if(tab==='banddos'){if(!lastRows.length)return;const q=x=>'"'+String(x).replaceAll('"','""')+'"';const out=['panel,series,x,y',...lastRows.map(r=>[q(r.panel),q(r.name),r.x,r.y].join(','))];save('kitcat_bands_dos_figure.csv',new Blob([out.join('\n')],{type:'text/csv'}));return;}if(tab==='combined'){if(!lastRows.length)return;const rows=['panel,series,energy_relative_eV,intensity_states_per_eV',...lastRows.map(r=>[r.panel,'"'+r.name.replaceAll('"','""')+'"',r.x,r.y].join(','))];save('kitcat_combined_dos_pdos.csv',new Blob([rows.join('\n')],{type:'text/csv'}));return;}const {series,names}=chooseSeries();if(!series.length)return;const quote=x=>'"'+String(x).replaceAll('"','""')+'"';const body=series.flatMap((points,i)=>points.map(p=>`${quote(names[i])},${p.x},${p.y}`));save(`kitcat_${tab}_plotted.csv`,new Blob(['series,x,y\n'+body.join('\n')],{type:'text/csv'}))};
function refreshPDOS(){ $('pdosPanel').hidden=tab!=='pdos'&&tab!=='combined'; const sel=$('pdosSpecies'),old=sel.value;sel.replaceChildren(new Option('All species','all'));for(const sp of [...new Set(data.map(f=>f.species).filter(Boolean))].sort())sel.add(new Option(sp,sp));sel.value=[...sel.options].some(o=>o.value===old)?old:'all';}
$('reset').onclick=()=>{$('color').value='#1764ad';$('refcolor').value='#c34546';$('font').value=17;$('width').value=2;$('grid').checked=true;$('layout').value='landscape';plot()};$('presets').onclick=()=>{$('color').value='#222222';$('refcolor').value='#6d6d6d';$('font').value=19;$('width').value=2.5;$('grid').checked=false;plot()};
$('demo').onclick=()=>{if(tab==='combined'){loadCombinedDemo();return;}if(tab==='banddos'){loadBandDOSDemo();return;}const E=Array.from({length:141},(_,i)=>-10+i*.13);data=tab==='bands'?[{kind:'bands',name:'DEMO synthetic bands',bands:Array.from({length:8},(_,i)=>Array.from({length:80},(_,k)=>({x:k/79*2.2,y:i-3.7+Math.sin(k/79*Math.PI*2+i*.4)*.6})))}]:[{kind:tab,name:'DEMO synthetic curve (not QE)',columns:2,points:E.map(x=>({x,ys:[Math.exp(-Math.pow((x+3)/1.9,2))*2+Math.exp(-Math.pow((x-2)/2.3,2))*3]}))}];$('fermi').value=0;if(tab==='pdos'){const curve=(scale,shift)=>E.map(x=>({x,ys:[scale*Math.exp(-(((x-shift)/2)**2)),scale*Math.exp(-(((x-shift)/2)**2))]}));data=[{kind:'pdos',name:'DEMO.pdos_atm#1(O)_wfc#1(s)',atom:1,species:'O',orbital:'s',columns:3,points:curve(1,-3)},{kind:'pdos',name:'DEMO.pdos_atm#2(Fe)_wfc#1(s)',atom:2,species:'Fe',orbital:'s',columns:3,points:curve(2,2)}]}refreshPDOS();$('fileInfo').textContent='DATA DEMO SINTETIS — tidak boleh digunakan sebagai hasil penelitian.';plot()};
// Combined publication figure: never equate Total DOS magnitude to sum of projected curves.
const palette=['#df842e','#288472','#a34782','#6b75c4','#bc5148','#5f6d7a','#8b663e'];
function combinedData(){
 const s=settings(),fermi=Number(s.fermi||0),notes=[];let curves=[];
 if(combinedDOS){let col=Math.max(1,Math.floor(Number(s.column||2))-1);if(col>combinedDOS.columns-1)notes.push('Total DOS: kolom tidak tersedia.');else curves.push({panel:'Total DOS',name:combinedDOS.name,color:s.color,points:combinedDOS.points.map(p=>({x:p.x-fermi,y:p.ys[col-1]}))});}
 if(combinedPDOS.length){const agg=pdosGroups(combinedPDOS,{species:$('pdosSpecies').value,orbital:$('pdosOrbital').value,spin:$('pdosSpin').value,schema:$('pdosSchema').value,groupBy:$('pdosGroup').value});notes.push(...agg.warnings);agg.groups.forEach((g,i)=>curves.push({panel:'Projected DOS',name:g.name,color:palette[i%palette.length],points:g.points.map(p=>({x:p.x-fermi,y:$('mirror').checked&&$('pdosSpin').value==='down'?-p.y:p.y}))}));}
 if(!combinedDOS)notes.push('Unggah Total DOS untuk menampilkan panel atas.');if(!combinedPDOS.length)notes.push('Unggah file site-resolved PDOS untuk panel bawah.');
 if(curves.some(c=>c.points.some(p=>!Number.isFinite(p.y))))notes.push('Nilai non-finite terdeteksi.');
 return {curves,notes};
}
function plotCombined(){
 const s=settings(),{curves,notes}=combinedData(),f=Number(s.font),font=Math.max(12,Math.min(25,f));
 $('gap').hidden=true;$('count').textContent=`${combinedDOS?1:0} DOS + ${combinedPDOS.length} PDOS file · ${curves.length} curve(s)`;
 if(!curves.length){svgText='';lastRows=[];$('plot').innerHTML='<p class="small">Unggah Total DOS dan PDOS; atau klik Data demo.</p>';$('combinedLegend').hidden=true;$('audit').textContent=notes.join('\n');return;}
 const xmin=Number(s.xmin),xmax=Number(s.xmax);if(!(Number.isFinite(xmin)&&Number.isFinite(xmax)&&xmin<xmax)){$('audit').textContent='Rentang energi tidak valid.';return;}
 const shape={landscape:[1200,900],column:[900,1200],wide:[1500,860]}[s.layout]||[1200,800];const [W,H]=shape;
 const m={l:108,r:55,t:106,b:165,gap:65};const panelH=(H-m.t-m.b-m.gap)/2,pw=W-m.l-m.r;
 const xf=x=>m.l+(x-xmin)/(xmax-xmin)*pw;
 const panels=[{key:'Total DOS',top:m.t,title:'(a) Total DOS'},{key:'Projected DOS',top:m.t+panelH+m.gap,title:'(b) Projected DOS'}];
 let v=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="DOS and PDOS scientific figure"><rect width="${W}" height="${H}" fill="white"/><text x="${W/2}" y="46" text-anchor="middle" font-size="${font+7}" font-family="Arial,Helvetica,sans-serif" font-weight="bold" fill="#1c2c3f">${safe(s.title)}</text>`;
 const grid=$('grid').checked;let legend=[];lastRows=[];
 for(let pi=0;pi<2;pi++){
  const p=panels[pi],subset=curves.filter(c=>c.panel===p.key),visible=subset.flatMap(c=>c.points.filter(pt=>pt.x>=xmin&&pt.x<=xmax&&Number.isFinite(pt.y)));
  let ymin=0,ymax=1;if(visible.length){ymin=Math.min(0,...visible.map(pt=>pt.y));ymax=Math.max(...visible.map(pt=>pt.y));const span=ymax-ymin||1;ymax+=span*.09;if(ymin<0)ymin-=span*.09;}
  const yf=y=>p.top+panelH-(y-ymin)/(ymax-ymin)*panelH;
  v+=`<text x="${m.l}" y="${p.top-17}" font-family="Arial" font-weight="bold" font-size="${font}" fill="#20384f">${p.title}</text>`;
  for(const y of estimate(ymin,ymax,5)){let yy=yf(y);if(grid)v+=`<path d="M${m.l} ${yy}H${m.l+pw}" stroke="#e5ebf0"/>`;v+=`<text x="${m.l-15}" y="${yy+4}" text-anchor="end" font-family="Arial" font-size="${font-2}" fill="#42586c">${fmt(y)}</text>`;}
  for(const x of estimate(xmin,xmax,6)){let xx=xf(x);if(grid)v+=`<path d="M${xx} ${p.top}V${p.top+panelH}" stroke="#edf1f5"/>`;if(pi===1)v+=`<text x="${xx}" y="${p.top+panelH+30}" text-anchor="middle" font-family="Arial" font-size="${font-2}" fill="#42586c">${fmt(x)}</text>`;}
  v+=`<path d="M${m.l} ${p.top}V${p.top+panelH}H${m.l+pw}" stroke="#283c50" stroke-width="1.8" fill="none"/>`;
  if(xmin<=0&&xmax>=0)v+=`<path d="M${xf(0)} ${p.top}V${p.top+panelH}" stroke="${s.refcolor}" stroke-width="2" stroke-dasharray="8 6"/>`;
  const ylabel=pi===0?'Total DOS (states/eV)':'PDOS (states/eV)';const cy=p.top+panelH/2;
  v+=`<text x="27" y="${cy}" transform="rotate(-90 27 ${cy})" text-anchor="middle" font-family="Arial" font-size="${font}" fill="#20384f">${ylabel}</text>`;
  v+=`<defs><clipPath id="combinedClip${pi}"><rect x="${m.l}" y="${p.top}" width="${pw}" height="${panelH}"/></clipPath></defs><g clip-path="url(#combinedClip${pi})">`;
  for(const c of subset){v+=strokes(c.points,xf,yf,c.color,Number(s.width));lastRows.push(...c.points.filter(pt=>Number.isFinite(pt.x)&&Number.isFinite(pt.y)).map(pt=>({...pt,panel:c.panel,name:c.name})));legend.push({name:c.name,color:c.color,panel:c.panel})}
  v+='</g>';
 }
 v+=`<text x="${W/2}" y="${H-103}" text-anchor="middle" font-family="Arial" font-size="${font+1}" fill="#20384f">Energy − E_F (eV)</text>`;
 if($('legend').checked){if(legend.length<=8){const perRow=Math.min(4,legend.length),cellW=pw/perRow;legend.forEach((l,i)=>{const xx=m.l+(i%perRow)*cellW,yy=H-64+Math.floor(i/perRow)*30;v+=`<path d="M${xx} ${yy}h25" stroke="${l.color}" stroke-width="3"/><text x="${xx+32}" y="${yy+5}" font-family="Arial" font-size="${Math.max(11,font-3)}" fill="#33485e">${safe(l.name.slice(0,Math.floor(cellW/8)))}</text>`})}else notes.push('Legend figure: lebih dari 8 kurva, batasi filter agar legend tetap terbaca dalam ekspor.');}
 v+='</svg>';
 svgText=v;$('plot').innerHTML=v;
 // Legend deliberately outside plot so it never overlaps curves; included in screen and report CSV.
 const legendEl=$('combinedLegend');legendEl.hidden=!$('legend').checked||!legend.length;
 legendEl.innerHTML=legendEl.hidden?'':legend.map(l=>`<span><i style="background:${l.color}"></i>${safe(l.panel)}: ${safe(l.name)}</span>`).join('');
 if(combinedDOS&&combinedPDOS.length){const a=combinedDOS.points,b=combinedPDOS[0].points;if(a.length!==b.length||a.some((x,i)=>!b[i]||Math.abs(x.x-b[i].x)>1e-5))notes.push('Grid energi DOS dan PDOS berbeda; figure tetap menampilkan kurva asli tanpa interpolasi. Periksa bahwa energi dan perhitungan kompatibel.');}
 $('audit').className='notice warn';$('audit').textContent='Publication audit: konfirmasi Total DOS/PDOS berasal dari perhitungan kompatibel dan menggunakan energi referensi, spin, satuan, serta normalisasi yang sama. Jumlah projected DOS tidak selalu persis sama dengan Total DOS. File noncollinear/SOC tidak divalidasi.\n'+notes.join('\n');
}
function refreshCombinedSpecies(){const sel=$('pdosSpecies'),old=sel.value;sel.replaceChildren(new Option('All species','all'));for(const sp of [...new Set(combinedPDOS.map(f=>f.species).filter(Boolean))].sort())sel.add(new Option(sp,sp));sel.value=[...sel.options].some(o=>o.value===old)?old:'all';}
$('combinedDOS').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{combinedDOS=readDOS(await file.text(),file.name);$('fileInfo').textContent=`Total DOS: ${file.name} parsed`; }catch(err){combinedDOS=null;$('fileInfo').textContent=`Total DOS ERROR: ${err.message}`;}plot()});
$('combinedPDOS').addEventListener('change',async e=>{let files=[],bad=[];for(const file of e.target.files){try{files.push(readPDOS(await file.text(),file.name))}catch(err){bad.push(`${file.name}: ${err.message}`)}}combinedPDOS=files;refreshCombinedSpecies();$('fileInfo').textContent=`${files.length} file PDOS parsed${bad.length?'\n'+bad.join('\n'):''}`;plot()});
function loadCombinedDemo(){let en=Array.from({length:201},(_,i)=>-9+i*.08);const gaussian=(x,c,w)=>Math.exp(-(((x-c)/w)**2));
 combinedDOS={kind:'dos',name:'DEMO Total DOS',columns:2,points:en.map(x=>({x,ys:[1.2*gaussian(x,-3,1.5)+2*gaussian(x,2,2)]}))};
 const demo=(sp,orb,at,c,w,k)=>({kind:'pdos',name:`DEMO.pdos_atm#${at}(${sp})_wfc#1(${orb})`,atom:at,species:sp,orbital:orb,columns:k+2,points:en.map(x=>({x,ys:[gaussian(x,c,w),...Array.from({length:k},()=>gaussian(x,c,w)/k)]}))});
 combinedPDOS=[demo('O','p',1,-3,1.3,3),demo('Fe','d',2,2,1.8,5)];refreshCombinedSpecies();$('fermi').value=0;$('fileInfo').textContent='SYNTHETIC DEMO — bukan hasil QE / bukan data penelitian.';plot();}


// KITCAT 1.3: paired bands + DOS; no interpolation, no hidden normalization.
function parseKlabels(input){const result=[],errors=[];for(const raw of String(input||'').split(',')){if(!raw.trim())continue;const at=raw.indexOf(':');if(at<1){errors.push('Label k-path salah: '+raw.trim());continue;}const x=Number(raw.slice(0,at).trim()),label=raw.slice(at+1).trim();if(!Number.isFinite(x)||!label||label.length>24){errors.push('Label k-path salah: '+raw.trim());continue;}result.push({x,label});}return {result,errors};}
function plotBandDOS(){
 const s=settings(),f=Number(s.font),warn=[];
 $('combinedLegend').hidden=true;$('gap').hidden=false;$('gap').textContent='Band structure hanya memuat lintasan k yang dihitung. Titik di bawah/atas E_F bukan penetapan VBM/CBM global; jangan mengklaim fundamental gap tanpa pemeriksaan Brillouin zone dan occupation.';
 $('count').textContent=`${spinUpBands||spinDownBands?'Spin-resolved ':''}${(spinUpBands?.bands.length||0)+(spinDownBands?.bands.length||0)||(bandDOSBands?.bands.length||0)} bands · ${bandDOSDOS?'1 DOS':'0 DOS'}`;
 if((!bandDOSBands&&!spinUpBands&&!spinDownBands)||!bandDOSDOS){svgText='';lastRows=[];$('plot').innerHTML='<p class="small">Upload filband.gnu dan berkas DOS untuk membentuk figure berdampingan, atau gunakan data demo.</p>';$('audit').textContent='Kedua berkas diperlukan. Input k-path label dan E_F secara terpisah.';return;}
 const emin=Number(s.xmin),emax=Number(s.xmax),ef=Number(s.fermi||0);if(!Number.isFinite(emin)||!Number.isFinite(emax)||emin>=emax){svgText='';$('audit').textContent='Jendela energi harus memiliki minimum < maksimum.';return;}
 const shape={landscape:[1200,800],column:[900,1050],wide:[1500,800]}[s.layout]||[1200,800], [W,H]=shape;
 const m={l:110,r:78,t:116,b:120,g:48},ph=H-m.t-m.b,pw=W-m.l-m.r,gap=m.g,bandW=pw*.67,dosW=pw-bandW-gap,dosLeft=m.l+bandW+gap;
 const bandfiles=activeSpinBands(bandDOSBands?[bandDOSBands]:[]);if(!bandfiles.length){svgText='';$('plot').innerHTML='<p class="small">Spin k-path mismatch: cannot plot incompatible channels.</p>';$('audit').textContent=spinError;return;}const ks=bandfiles.flatMap(b=>b.bands.flat().map(z=>z.x)),kmin=Math.min(...ks),kmax=Math.max(...ks);if(!(kmax>kmin)){svgText='';$('audit').textContent='k-path tidak memiliki jarak positif.';return;}
 const energyY=e=>m.t+ph-(e-emin)/(emax-emin)*ph,kx=x=>m.l+(x-kmin)/(kmax-kmin)*bandW;
 const ci=Math.floor(Number(s.column||2))-2;
 if(ci<0||ci>=bandDOSDOS.columns-1){svgText='';$('audit').textContent='Kolom DOS tidak tersedia. Pilih kolom numerik yang tepat (umumnya 2).';return;}
 const pts=bandDOSDOS.points.map(p=>({e:p.x-ef,d:p.ys[ci]})).filter(p=>Number.isFinite(p.e)&&Number.isFinite(p.d));const visible=pts.filter(p=>p.e>=emin&&p.e<=emax);const dmax=Math.max(0,...visible.map(p=>p.d));if(!Number.isFinite(dmax)||dmax<=0)warn.push('DOS tidak memiliki nilai positif pada jendela energi terpilih; rentang DOS default digunakan.');
 const dmin=Math.min(0,...visible.map(p=>p.d)),dlow=dmin<0?dmin*1.1:0,dhi=Math.max(dmax*1.08,dlow+1e-8,1e-7),dx=d=>dosLeft+(d-dlow)/(dhi-dlow)*dosW;
 const kl=parseKlabels(s.kpath);warn.push(...kl.errors);if(!kl.result.length)warn.push('Posisi high-symmetry k-path belum diberikan; label tidak boleh ditebak dari filband.gnu.');
 let v=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="KITCAT band structure plus total density of states"><rect width="${W}" height="${H}" fill="white"/><text x="${W/2}" y="44" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="bold" font-size="${f+6}" fill="#1c2c3f">${safe(s.title)}</text>`;
 v+=`<text x="${m.l}" y="${m.t-35}" font-family="Arial" font-weight="bold" font-size="${f+1}" fill="#20384f">(a) Band structure</text><text x="${dosLeft}" y="${m.t-35}" font-family="Arial" font-weight="bold" font-size="${f+1}" fill="#20384f">(b) Total DOS</text>`;
 if(spinUpBands||spinDownBands){const ly=m.t-12;let lx=m.l+bandW-245;for(const [name,co,dash] of [["Spin ↑",$('spinUpColor').value,''],["Spin ↓",$('spinDownColor').value,$('spinDownDash').value]]){const exists=name==='Spin ↑'?spinUpBands:spinDownBands;if(!exists)continue;v+=`<path d="M${lx} ${ly}h25" stroke="${co}" stroke-width="3" ${dash?'stroke-dasharray="'+dash+'"':''}/><text x="${lx+30}" y="${ly+5}" font-size="${Math.max(11,f-3)}" font-family="Arial" fill="#34495f">${name}</text>`;lx+=100;}}
 for(const e of estimate(emin,emax,7)){const y=energyY(e);if($('grid').checked)v+=`<path d="M${m.l} ${y}H${m.l+bandW} M${dosLeft} ${y}H${dosLeft+dosW}" fill="none" stroke="#e6ebef" stroke-width="1"/>`;v+=`<text x="${m.l-14}" y="${y+5}" text-anchor="end" font-family="Arial" font-size="${f-1}" fill="#34495f">${fmt(e)}</text>`;}
 v+=`<path d="M${m.l} ${m.t}V${m.t+ph}H${m.l+bandW} M${dosLeft} ${m.t}V${m.t+ph}H${dosLeft+dosW}" stroke="#273c50" stroke-width="1.8" fill="none"/>`;
 if(emin<=0&&emax>=0)v+=`<path d="M${m.l} ${energyY(0)}H${m.l+bandW} M${dosLeft} ${energyY(0)}H${dosLeft+dosW}" stroke="${s.refcolor}" stroke-width="2" stroke-dasharray="8 6" fill="none"/>`;
 for(const {x,label} of kl.result){if(x<kmin-1e-8||x>kmax+1e-8){warn.push('Label '+label+' berada di luar rentang k-path.');continue;}const px=kx(x);v+=`<path d="M${px} ${m.t}V${m.t+ph}" stroke="#b7c2cc" stroke-width="1" stroke-dasharray="5 5"/><text x="${px}" y="${m.t+ph+30}" text-anchor="middle" font-family="Arial" font-size="${f}" fill="#2b455d">${safe(label)}</text>`;}
 v+=`<defs><clipPath id="bandDOSclipBand"><rect x="${m.l}" y="${m.t}" width="${bandW}" height="${ph}"/></clipPath><clipPath id="bandDOSclipDOS"><rect x="${dosLeft}" y="${m.t}" width="${dosW}" height="${ph}"/></clipPath></defs><g clip-path="url(#bandDOSclipBand)">`;
 lastRows=[];for(const file of bandfiles){for(const [i,band] of file.bands.entries()){const p=band.map(z=>({x:z.x,y:z.y-ef}));const co=file.spin==='up'?$('spinUpColor').value:file.spin==='down'?$('spinDownColor').value:s.color;let curve=strokes(p,kx,energyY,co,Number(s.width));if(file.spin==='down'&&$('spinDownDash').value)curve=curve.replace('<path ',`<path stroke-dasharray="${$('spinDownDash').value}" `);v+=curve;lastRows.push(...p.map(z=>({panel:'bands',name:(file.spin||'unknown')+' band '+(i+1),x:z.x,y:z.y})));}}v+='</g><g clip-path="url(#bandDOSclipDOS)">';
 const dp=pts.map(p=>({x:p.d,y:p.e}));v+=strokes(dp,dx,energyY,colors[2],Number(s.width));lastRows.push(...dp.map(z=>({panel:'dos',name:bandDOSDOS.name,x:z.x,y:z.y})));v+='</g>';
 for(const val of estimate(dlow,dhi,4)){const x=dx(val);v+=`<text x="${x}" y="${m.t+ph+30}" text-anchor="middle" font-family="Arial" font-size="${Math.max(10,f-2)}" fill="#34495f">${fmt(val)}</text>`;}
 v+=`<text x="29" y="${m.t+ph/2}" transform="rotate(-90 29 ${m.t+ph/2})" text-anchor="middle" font-family="Arial" font-size="${f+1}" fill="#20384f">Energy − E_F (eV)</text>`;
 v+=`<text x="${m.l+bandW/2}" y="${H-47}" text-anchor="middle" font-family="Arial" font-size="${f+1}" fill="#20384f">High-symmetry k-path</text><text x="${dosLeft+dosW/2}" y="${H-47}" text-anchor="middle" font-family="Arial" font-size="${f+1}" fill="#20384f">DOS (states/eV)</text></svg>`;
 svgText=v;$('plot').innerHTML=v;
 if(spinError)warn.push(spinError);if(spinUpBands&&spinDownBands)warn.push('Spin colors indicate files explicitly selected by the user, not independently determined spin quantum numbers.');warn.push('Konfirmasi Fermi/reference energy, spin convention, lintasan k, DOS source, functional, pseudopotential dan struktur sebelum publikasi. Tidak ada pencocokan struktur otomatis antara dua file.');
 $('audit').className='notice warn';$('audit').textContent='Bands + DOS publication audit:\n'+warn.join('\n');
}
$('bandDOSBands').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{bandDOSBands=readBandsGNU(await file.text(),file.name);$('fileInfo').textContent='Bands: '+file.name+' · '+bandDOSBands.bands.length+' bands';}catch(err){bandDOSBands=null;$('fileInfo').textContent='Band parser: '+err.message;}plot()});
$('bandDOSDOS').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{bandDOSDOS=readDOS(await file.text(),file.name);$('fileInfo').textContent='DOS: '+file.name+' · '+bandDOSDOS.points.length+' points';}catch(err){bandDOSDOS=null;$('fileInfo').textContent='DOS parser: '+err.message;}plot()});
function loadBandDOSDemo(){const xs=Array.from({length:90},(_,i)=>i/89*2.3);bandDOSBands={kind:'bands',name:'SYNTHETIC DEMO',bands:Array.from({length:8},(_,j)=>xs.map(x=>({x,y:j-3.3+.6*Math.cos(x*3+j*.2)})))};const es=Array.from({length:190},(_,i)=>-9+i*.085);bandDOSDOS={kind:'dos',name:'SYNTHETIC DEMO',columns:2,points:es.map(x=>({x,ys:[2*Math.exp(-(((x-2)/2)**2))+1.4*Math.exp(-(((x+3)/1.7)**2))]}))};$('fermi').value=0;$('kpath').value='0:Γ, 0.65:X, 1.5:M, 2.3:Γ';$('fileInfo').textContent='DATA DEMO SINTETIS — tidak boleh digunakan sebagai hasil penelitian.';plot();}


// 1.4: Spin identity is never guessed. Both bands MUST share identical k-coordinate vectors.
function activeSpinBands(fallback=[]){
 spinError='';if(!spinUpBands&&!spinDownBands)return fallback;
 if(spinUpBands&&spinDownBands&&!sameBandKPath(spinUpBands,spinDownBands)){
   spinError='BLOCKED: Spin-up and spin-down have inconsistent k-path sampling. Do not overlay until both computations use matching k grids.';return [];
 }
 return [spinUpBands&&{...spinUpBands,spin:'up'},spinDownBands&&{...spinDownBands,spin:'down'}].filter(Boolean);
}
for(const [id,spin] of [['spinUpBands','up'],['spinDownBands','down']]){
 $(id).addEventListener('change',async e=>{
  const file=e.target.files[0];if(!file)return;
  try{const parsed=readBandsGNU(await file.text(),file.name);
   if(spin==='up')spinUpBands=parsed;else spinDownBands=parsed;
   $('fileInfo').textContent=`${spin} loaded explicitly: ${file.name} (${parsed.bands.length} bands).`;
  }catch(err){if(spin==='up')spinUpBands=null;else spinDownBands=null;$('fileInfo').textContent=`${spin} parse error: ${err.message}`;}
  plot();
 });
}

refreshPDOS();plot();
