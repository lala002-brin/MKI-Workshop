(function(){
'use strict';
const ID='mki-band-tool', NS='http://www.w3.org/2000/svg';
function parseBands(source){
 const lines=source.replace(/\r/g,'').split('\n').map(s=>s.trim()).filter(s=>s && !s.startsWith('#'));
 if(lines.length<6) throw Error('File terlalu pendek untuk format .bands SIESTA.');
 const nums=s=>{let m=s.match(/[+-]?(?:\d+\.?\d*|\.\d+)(?:[EeDd][+-]?\d+)?/g);return m?m.map(t=>Number(t.replace(/[dD]/,'E'))):[];};
 const f=nums(lines[0]),kr=nums(lines[1]),er=nums(lines[2]),head=nums(lines[3]);
 if(f.length!==1||kr.length<2||er.length<2||head.length<3)throw Error('Header .bands tidak sesuai (E_F, k-range, E-range, NBand NSpin Nk).');
 const [nb,ns,nk]=head.slice(0,3);if(![nb,ns,nk].every(Number.isInteger)||nb<1||nb>3000||![1,2].includes(ns)||nk<2||nk>100000)throw Error('Jumlah band/spin/k-point tidak valid atau melampaui batas aplikasi.');
 const payload=[];for(let i=4;i<lines.length;i++)payload.push(...lines[i].split(/\s+/));
 // Every k point has 1 coordinate followed by (nb*ns) eigenvalues; Fortran wraps lines.
 const need=nk*(1+nb*ns);if(payload.length<need+1)throw Error('Data eigenvalue tidak lengkap: dibutuhkan '+need+' angka untuk '+nk+' k-point.');
 const toNum=t=>Number(t.replace(/[dD]/g,'E'));let offset=0,ks=[],bands=Array.from({length:ns},()=>Array.from({length:nb},()=>[]));
 for(let k=0;k<nk;k++){
   const x=toNum(payload[offset++]);if(!Number.isFinite(x))throw Error('Koordinat k-point tidak valid pada titik '+(k+1));ks.push(x);
   for(let sp=0;sp<ns;sp++)for(let ib=0;ib<nb;ib++){
     const e=toNum(payload[offset++]);if(!Number.isFinite(e))throw Error('Eigenvalue tidak valid pada k-point '+(k+1));bands[sp][ib].push(e);
   }
 }
 const nlabels=Number(payload[offset++]);if(!Number.isInteger(nlabels)||nlabels<0||nlabels>500)throw Error('Jumlah label k-point tidak valid. Pastikan file adalah output BandLines (bukan BandPoints).');
 const labels=[];for(let i=0;i<nlabels;i++){
   const pos=toNum(payload[offset++]),label=payload[offset++];if(!Number.isFinite(pos)||!label)throw Error('Label lintasan k-point tidak lengkap.');labels.push({x:pos,label:label.replace(/^\\Gamma$/,'Γ').replace(/^Gamma$/i,'Γ')});
 }
 if(!ks.every(Number.isFinite))throw Error('Koordinat k tidak valid.');
 return {fermi:f[0],ks,bands,labels,nb,ns,nk,name:'File SIESTA'};
}
function demo(){const ks=Array.from({length:121},(_,i)=>i/40),bands=[[]];for(let j=0;j<9;j++){const a=[];for(let i=0;i<ks.length;i++){const k=ks[i];let val;if(j<4)val= -0.85-0.52*(3-j)-0.18*(1-Math.cos(k*3.1+j*.5));else val=0.75+0.45*(j-4)+0.22*(1-Math.cos(k*3.5+j));a.push(val);}bands[0].push(a);}return {fermi:0,ks,bands,labels:[{x:0,label:'Γ'},{x:1,label:'X'},{x:2,label:'M'},{x:3,label:'Γ'}],nb:9,ns:1,nk:121,name:'Contoh sintetis (bukan hasil DFT)'};}
function init(){const root=document.getElementById(ID);if(!root||root.dataset.ready==='yes')return;root.dataset.ready='yes';const $=id=>document.getElementById(id);let model=null,currentSVG='';
 const status=(s)=>{$('mb-status').textContent=s;},fixed=n=>Number.isFinite(n)?n.toFixed(4)+' eV':'—';
 function evaluate(){if(!model)return;const ef=Number($('mb-fermi').value),eps=1e-5,states=[];for(let s=0;s<model.ns;s++)for(let b=0;b<model.nb;b++)for(let k=0;k<model.nk;k++)states.push({e:model.bands[s][b][k],k:model.ks[k],s,b});const below=states.filter(v=>v.e<ef-eps),above=states.filter(v=>v.e>ef+eps),on=states.filter(v=>Math.abs(v.e-ef)<=eps);let vbm=below.reduce((a,b)=>!a||b.e>a.e?b:a,null),cbm=above.reduce((a,b)=>!a||b.e<a.e?b:a,null);
 $('mb-vbm').textContent=vbm?fixed(vbm.e-ef):'—';$('mb-cbm').textContent=cbm?fixed(cbm.e-ef):'—';const text=$('mb-interpretation');
 if(!vbm||!cbm){$('mb-gap').textContent='Tidak tersedia';text.textContent='Tidak ada keadaan di kedua sisi E_F pada data yang diberikan. Periksa E_F, rentang pita, dan okupansi.';return;}
 const gap=cbm.e-vbm.e;$('mb-gap').textContent=gap.toFixed(4)+' eV';
 const hasCrossing=on.length>0||model.bands.some(sp=>sp.some(arr=>arr.some((v,i)=>i&&((v-ef)*(arr[i-1]-ef)<0))));
 if(hasCrossing){text.textContent='Ada keadaan pada atau pita melintasi E_F di lintasan ini. Sistem berpotensi metalik; nilai gap di atas hanya jarak tingkat yang mengapit E_F dan BUKAN band gap isolator yang sah.';return;}
 const same=Math.abs(vbm.k-cbm.k)<1e-6;
 const perSpin=Array.from({length:model.ns},(_,s)=>{let q=states.filter(v=>v.s===s),lo=q.filter(v=>v.e<ef-eps),hi=q.filter(v=>v.e>ef+eps);if(!lo.length||!hi.length)return 'Spin '+(s+1)+': tidak cukup data';const a=Math.max(...lo.map(v=>v.e)),b=Math.min(...hi.map(v=>v.e));return 'Spin '+(s+1)+': '+(b-a).toFixed(4)+' eV';});
 text.textContent='Gap yang teramati pada lintasan: '+(same?'direct':'indirect')+' (VBM k='+vbm.k.toFixed(4)+', CBM k='+cbm.k.toFixed(4)+'). '+perSpin.join(' | ')+'. Klasifikasi ini terbatas pada lintasan yang dihitung dan asumsi okupansi berdasar E_F.';
 }
 function draw(){if(!model)return;const ef=Number($('mb-fermi').value),ymin=Number($('mb-ymin').value),ymax=Number($('mb-ymax').value),shift=$('mb-shift').checked;if(![ef,ymin,ymax].every(Number.isFinite)||ymin>=ymax){status('Periksa energi Fermi dan batas Y (minimum harus lebih kecil daripada maksimum).');return;}const x0=model.ks[0],x1=model.ks[model.ks.length-1];if(!(x1>x0)){status('Koordinat lintasan k-point tidak meningkat.');return;}const W=950,H=525,m={l:70,r:22,t:26,b:65},plotW=W-m.l-m.r,plotH=H-m.t-m.b,x=v=>m.l+(v-x0)/(x1-x0)*plotW,y=v=>m.t+(ymax-v)/(ymax-ymin)*plotH;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));let parts=[`<svg xmlns="${NS}" viewBox="0 0 ${W} ${H}" role="img" aria-label="SIESTA band structure">`,`<rect width="${W}" height="${H}" fill="${getComputedStyle(root).getPropertyValue('--md-default-bg-color').trim()||'#fff'}"/>`];
 for(let i=0;i<=8;i++){const v=ymin+(ymax-ymin)*i/8,Y=y(v);parts.push(`<line class="mb-grid-line" x1="${m.l}" y1="${Y}" x2="${W-m.r}" y2="${Y}"/>`,`<text x="${m.l-12}" y="${Y+4}" text-anchor="end">${v.toFixed(1)}</text>`);}if(ymin<=0&&ymax>=0&&shift)parts.push(`<line class="mb-fermi-line" x1="${m.l}" x2="${W-m.r}" y1="${y(0)}" y2="${y(0)}"/>`);if(!shift&&ef>=ymin&&ef<=ymax)parts.push(`<line class="mb-fermi-line" x1="${m.l}" x2="${W-m.r}" y1="${y(ef)}" y2="${y(ef)}"/>`);
 if($('mb-markers').checked)for(const point of model.labels){if(point.x<x0-1e-5||point.x>x1+1e-5)continue;const X=x(point.x);parts.push(`<line class="mb-sym-line" x1="${X}" x2="${X}" y1="${m.t}" y2="${H-m.b}"/>`,`<text x="${X}" y="${H-m.b+27}" text-anchor="middle">${esc(point.label)}</text>`);}
 parts.push(`<line x1="${m.l}" y1="${H-m.b}" x2="${W-m.r}" y2="${H-m.b}" stroke="#778392"/><line x1="${m.l}" y1="${m.t}" x2="${m.l}" y2="${H-m.b}" stroke="#778392"/>`,`<text x="${W/2}" y="${H-10}" text-anchor="middle">k-path</text>`,`<text transform="translate(19 ${H/2}) rotate(-90)" text-anchor="middle">${shift?'E − E_F (eV)':'Energy (eV)'}</text>`);
 for(let s=0;s<model.ns;s++){if(s===0&&!$('mb-spin1').checked||s===1&&!$('mb-spin2').checked)continue;for(let b=0;b<model.nb;b++){const energies=model.bands[s][b];let cmd='';for(let k=0;k<model.nk;k++){const val=energies[k]-(shift?ef:0);cmd+=(k?' L':'M')+x(model.ks[k]).toFixed(2)+' '+y(val).toFixed(2);}parts.push(`<path d="${cmd}" class="${s===0?'mb-band-up':'mb-band-down'}" clip-path="url(#mb-clip)"/>`);}}
 parts.splice(2,0,`<defs><clipPath id="mb-clip"><rect x="${m.l}" y="${m.t}" width="${plotW}" height="${plotH}"/></clipPath></defs>`);parts.push('</svg>');currentSVG=parts.join('');$('mb-chart').innerHTML=currentSVG;evaluate();status(model.name+': '+model.nb+' pita, '+model.ns+' kanal spin, '+model.nk+' k-point. E_F = '+model.fermi.toFixed(5)+' eV (file).');}
 function setModel(m){model=m;$('mb-fermi').value=m.fermi;let values=m.bands.flat(2).map(e=>e-m.fermi),min=Math.min(...values),max=Math.max(...values);$('mb-ymin').value=Math.floor(Math.max(-30,min-1));$('mb-ymax').value=Math.ceil(Math.min(30,max+1));if(Number($('mb-ymin').value)>=Number($('mb-ymax').value)){$('mb-ymin').value=-5;$('mb-ymax').value=5;}draw();}
 $('mb-demo').addEventListener('click',()=>setModel(demo()));$('mb-upload').addEventListener('change',async e=>{let file=e.target.files&&e.target.files[0];if(!file)return;if(file.size>25*1024*1024){status('File terlalu besar (maksimum 25 MB).');return;}try{let m=parseBands(await file.text());m.name=file.name;setModel(m);}catch(err){status('Gagal membaca file: '+err.message);}});$('mb-reset').addEventListener('click',()=>{model=null;currentSVG='';$('mb-upload').value='';$('mb-chart').innerHTML='';$('mb-vbm').textContent=$('mb-cbm').textContent=$('mb-gap').textContent='—';$('mb-interpretation').textContent='Belum ada data.';status('Data telah direset.');});$('mb-render').addEventListener('click',draw);['mb-fermi','mb-ymin','mb-ymax','mb-shift','mb-spin1','mb-spin2','mb-markers'].forEach(id=>$(id).addEventListener('change',draw));
 function download(name,type,content){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);} $('mb-svg').addEventListener('click',()=>{if(!currentSVG)return status('Muat data sebelum mengunduh SVG.');download('band-structure.svg','image/svg+xml;charset=utf-8',currentSVG);});$('mb-csv').addEventListener('click',()=>{if(!model)return status('Muat data sebelum mengunduh CSV.');let header=['k_path',...model.bands.flatMap((sp,s)=>sp.map((_,b)=>'spin'+(s+1)+'_band'+(b+1)+'_eV'))],lines=[header.join(',')];for(let k=0;k<model.nk;k++)lines.push([model.ks[k],...model.bands.flatMap(sp=>sp.map(b=>b[k]))].join(','));download('band-structure.csv','text/csv;charset=utf-8',lines.join('\n'));});
}
if(typeof document$!=='undefined'&&document$.subscribe)document$.subscribe(init);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
