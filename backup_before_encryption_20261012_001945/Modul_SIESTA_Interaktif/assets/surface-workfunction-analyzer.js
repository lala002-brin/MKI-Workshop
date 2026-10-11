/* Surface & Work Function Analyzer | self-contained SVG renderer, no external dependencies */
(() => {
  function init(){
    const root=document.getElementById('swf-studio');
    if(!root || root.dataset.swfInitialized==='true') return;
    root.dataset.swfInitialized='true';
    const $=id=>root.querySelector('#swf-'+id);
    let records=[], latestSVG='', lastAnalysis=null;
    const watched=['fermi','zmin','zmax','tolerance','smooth','precision','style','color','width','aspect','show-region','show-fermi','show-vac','show-grid','relative'];
    const num=id=>Number($(id).value);
    const checked=id=>$(id).checked;
    const finite=x=>Number.isFinite(x);
    const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const format=(x,d=3)=>finite(x)?x.toFixed(d):'—';
    function notify(s,err=false){$('status').textContent=s;$('status').classList.toggle('swf-error',err);}
    function parseData(text){
      let rows=[];
      text.replace(/^\uFEFF/,'').split(/\r?\n/).forEach((raw,idx)=>{
        const s=raw.trim();if(!s || /^[#!%]/.test(s)) return;
        const parts=s.split(/[;,\t ]+/).filter(Boolean);
        if(parts.length<2)return;
        const a=Number(parts[0].replace(/[dD]/,'E')),b=Number(parts[1].replace(/[dD]/,'E'));
        if(finite(a)&&finite(b))rows.push({z:a,v:b});
      });
      if(rows.length<3)throw new Error('Minimal 3 baris data numerik dengan kolom z dan potensial.');
      if(rows.length>150000)throw new Error('File terlalu besar: maksimal 150.000 titik.');
      rows.sort((a,b)=>a.z-b.z);
      for(let i=1;i<rows.length;i++)if(rows[i].z===rows[i-1].z)throw new Error('Koordinat z duplikat terdeteksi. Gunakan satu potensial per z.');
      return rows;
    }
    function example(){
      const r=[];
      for(let i=0;i<=600;i++){
        const z=i*0.05;
        const interior=Math.exp(-Math.pow((z-15)/6,8));
        const osc=.65*Math.sin((z-5)*3.4)+.34*Math.sin((z-5)*7.7);
        const v=-.42 + interior*(-4.6+osc)+.017*Math.sin(z*.64);
        r.push({z:+z.toFixed(3),v:+v.toFixed(7)});
      }
      return r;
    }
    function avgSmooth(data,windowSize){
      const w=Math.max(1,Math.min(101,Math.round(windowSize)||1)); const h=Math.floor(w/2);
      if(w<=1)return data.map(r=>({...r}));
      const prefix=[0];for(const d of data)prefix.push(prefix[prefix.length-1]+d.v);
      return data.map((r,i)=>{const a=Math.max(0,i-h),b=Math.min(data.length,i+h+1);return {z:r.z,v:(prefix[b]-prefix[a])/(b-a)}});
    }
    function setupDemo(){records=example();$('file').value='';$('fermi').value='-4.6';$('zmin').value='24';$('zmax').value='29';$('smooth').value='1';notify('Data ilustrasi: 601 titik z (0–30 Å). Bukan hasil SIESTA.');update();}
    function setMetric(id,s){$(id).textContent=s;}
    function quality(s,isError){$('quality').textContent=s;$('quality').classList.toggle('swf-error',!!isError);}
    function download(content,name,type){const b=new Blob([content],{type}),url=URL.createObjectURL(b),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
    function update(){
      if(records.length<3){$('chart').innerHTML='<div class="swf-placeholder">Grafik muncul setelah data dimuat.</div>';['vac-value','fermi-value','phi-value','span-value'].forEach(k=>setMetric(k,'—'));$('svg').disabled=true;$('csv').disabled=true;quality('Belum ada analisis.',false);return;}
      const ef=num('fermi'),z1=num('zmin'),z2=num('zmax'),tol=num('tolerance'),w=num('smooth');
      if(![ef,z1,z2,tol,w].every(finite)||tol<0||w<1||z2<=z1){quality('Input tidak valid. Pastikan angka terisi, toleransi ≥ 0, dan z akhir > z awal.',true);$('svg').disabled=true;$('csv').disabled=true;return;}
      const filtered=records.filter(r=>r.z>=z1&&r.z<=z2);
      if(filtered.length<3){quality('Rentang vakum harus memuat minimal 3 titik data. Sesuaikan z mulai dan akhir.',true);$('svg').disabled=true;$('csv').disabled=true;return;}
      const vv=filtered.reduce((t,r)=>t+r.v,0)/filtered.length;
      const pmin=Math.min(...filtered.map(r=>r.v)),pmax=Math.max(...filtered.map(r=>r.v));
      const variation=pmax-pmin,phi=vv-ef,digits=num('precision');
      const smoothed=avgSmooth(records,w);
      setMetric('vac-value',format(vv,digits)+' eV');setMetric('fermi-value',format(ef,digits)+' eV');setMetric('phi-value',format(phi,digits)+' eV');setMetric('span-value',format(variation,digits)+' eV');
      let warnings=[];
      if(variation>tol)warnings.push('Daerah vakum belum datar menurut toleransi Anda. Nilai Φ perlu diverifikasi.');
      if(phi<0)warnings.push('Φ negatif: periksa referensi energi, pilihan plateau, dan E_F.');
      if(z1<records[0].z||z2>records.at(-1).z)warnings.push('Sebagian interval di luar rentang data.');
      if(w>1)warnings.push('Smoothing hanya memengaruhi tampilan kurva; perhitungan plateau memakai data mentah.');
      quality(warnings.length?warnings.join(' '):'Plateau memenuhi batas variasi yang ditentukan. Verifikasi juga konvergensi slab, dipole correction, dan konsistensi referensi energi.',variation>tol||phi<0);
      lastAnalysis={ef,z1,z2,vv,variation,phi,smoothed};
      render(lastAnalysis);$('svg').disabled=false;$('csv').disabled=false;
    }
    function render(a){
      const relative=checked('relative'),offset=relative?a.ef:0;
      const theme=$('style').value;const dark=theme==='dark',minimal=theme==='minimal';
      const paper=theme==='paper'||minimal;
      const bg=dark?'#101824':'#ffffff',fg=dark?'#e8effb':'#171b23',gridColor=dark?'#3a495f':'#e4e8ee',axis=fg;
      const color=(theme==='minimal')?'#222222':$('color').value;
      const lw=Math.max(1,Math.min(5,num('width'))),W=1000,H=$('aspect').value==='wide'?560:$('aspect').value==='square'?940:740;
      const m={l:93,r:28,t:35,b:83},cw=W-m.l-m.r,ch=H-m.t-m.b;
      const x0=records[0].z,x1=records.at(-1).z;
      const values=a.smoothed.map(r=>r.v-offset);values.push(a.ef-offset,a.vv-offset);
      let y0=Math.min(...values),y1=Math.max(...values),extra=(y1-y0||1)*.12;y0-=extra;y1+=extra;
      const x=z=>m.l+(z-x0)/(x1-x0)*cw,y=v=>m.t+(y1-v)/ (y1-y0)*ch;
      const fmt=(n,d=2)=>Number(n.toFixed(d)).toString();
      let out=[];const put=v=>out.push(v);
      put(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Profil potensial dan level vakum" style="background:${bg}">`);
      put(`<rect x="0" y="0" width="${W}" height="${H}" fill="${bg}"/>`);
      const styles=`font-family:${paper?'Georgia,Times New Roman,serif':'Arial,sans-serif'};fill:${fg}`;
      if(checked('show-region')){
        const left=Math.max(x0,a.z1),right=Math.min(x1,a.z2);
        if(right>left)put(`<rect x="${x(left)}" y="${m.t}" width="${x(right)-x(left)}" height="${ch}" fill="${dark?'#314a68':'#dbeafe'}" opacity="0.52"/>`);
      }
      for(let i=0;i<=5;i++){
        const v=y0+(y1-y0)*i/5,yy=y(v);
        if(checked('show-grid'))put(`<line x1="${m.l}" x2="${W-m.r}" y1="${yy}" y2="${yy}" stroke="${gridColor}" stroke-width="1"/>`);
        put(`<text x="${m.l-13}" y="${yy+5}" text-anchor="end" style="${styles};font-size:17px">${fmt(v)}</text>`);
      }
      for(let i=0;i<=6;i++){
        const z=x0+(x1-x0)*i/6,xx=x(z);
        if(checked('show-grid'))put(`<line x1="${xx}" x2="${xx}" y1="${m.t}" y2="${H-m.b}" stroke="${gridColor}" stroke-width="1"/>`);
        put(`<text x="${xx}" y="${H-m.b+28}" text-anchor="middle" style="${styles};font-size:17px">${fmt(z)}</text>`);
      }
      if(checked('show-fermi')){
        const yy=y(a.ef-offset);put(`<line x1="${m.l}" y1="${yy}" x2="${W-m.r}" y2="${yy}" stroke="${dark?'#ffbd69':'#b65e19'}" stroke-width="2" stroke-dasharray="8 7"/>`);
        put(`<text x="${W-m.r-8}" y="${yy-7}" text-anchor="end" style="${styles};font-size:17px">E_F</text>`);
      }
      if(checked('show-vac')){
        const yy=y(a.vv-offset);put(`<line x1="${m.l}" y1="${yy}" x2="${W-m.r}" y2="${yy}" stroke="${dark?'#61d4ae':'#14866d'}" stroke-width="2" stroke-dasharray="5 5"/>`);
        put(`<text x="${W-m.r-8}" y="${yy-8}" text-anchor="end" style="${styles};font-size:17px">V_vac</text>`);
      }
      const maxNodes=4000,step=Math.max(1,Math.ceil(a.smoothed.length/maxNodes));
      let path='';for(let i=0;i<a.smoothed.length;i+=step){const r=a.smoothed[i];path+=(path?'L':'M')+fmt(x(r.z),3)+' '+fmt(y(r.v-offset),3)+' ';}
      const last=a.smoothed.at(-1);if((a.smoothed.length-1)%step!==0)path+='L'+fmt(x(last.z),3)+' '+fmt(y(last.v-offset),3);
      put(`<path d="${path}" fill="none" stroke="${color}" stroke-width="${lw}" stroke-linejoin="round" stroke-linecap="round"/>`);
      put(`<rect x="${m.l}" y="${m.t}" width="${cw}" height="${ch}" stroke="${axis}" stroke-width="${paper?2.6:1.7}" fill="none"/>`);
      put(`<text x="${m.l+cw/2}" y="${H-21}" text-anchor="middle" style="${styles};font-size:23px">z (Å)</text>`);
      put(`<text transform="translate(27 ${m.t+ch/2}) rotate(-90)" text-anchor="middle" style="${styles};font-size:23px">${relative?'V(z) − E_F (eV)':'Potential V(z) (eV)'}</text>`);
      put(`<text x="${m.l+8}" y="${m.t+27}" style="${styles};font-size:17px">Φ = ${format(a.phi,num('precision'))} eV</text>`);
      put(`</svg>`);latestSVG=out.join('');$('chart').innerHTML=latestSVG;
      const svg=$('chart').querySelector('svg');
      svg.addEventListener('pointermove',e=>{const bb=svg.getBoundingClientRect(),px=(e.clientX-bb.left)/bb.width*W;if(px<m.l||px>W-m.r)return;const zz=x0+(px-m.l)/cw*(x1-x0);let lo=0,hi=records.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(records[mid].z<zz)lo=mid+1;else hi=mid;}const k=lo>0&&Math.abs(records[lo-1].z-zz)<Math.abs(records[lo].z-zz)?lo-1:lo;const r=records[k];$('hover').textContent=`z = ${format(r.z,3)} Å | V(z) = ${format(r.v,4)} eV | V(z) − E_F = ${format(r.v-a.ef,4)} eV`;});
    }
    $('demo').addEventListener('click',setupDemo);
    $('reset').addEventListener('click',()=>{records=[];lastAnalysis=null;latestSVG='';$('file').value='';notify('Data dibersihkan.');update();});
    $('file').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{if(f.size>12*1024*1024)throw new Error('Ukuran file maksimal 12 MB.');records=parseData(await f.text());notify(`${esc(f.name)}: ${records.length} titik z terbaca (${format(records[0].z)} hingga ${format(records.at(-1).z)} Å).`);$('zmin').value=records[Math.floor(records.length*.8)].z.toFixed(3);$('zmax').value=records[Math.floor(records.length*.95)].z.toFixed(3);update();}catch(err){records=[];notify('Gagal membaca file: '+err.message,true);update();}});
    $('plot').addEventListener('click',update);
    for(const key of watched)$(key).addEventListener(['style','aspect','precision','show-region','show-fermi','show-vac','show-grid','relative','color'].includes(key)?'change':'input',()=>{if(records.length)update();});
    $('svg').addEventListener('click',()=>{if(latestSVG)download('<?xml version="1.0" encoding="UTF-8"?>\n'+latestSVG,'surface_workfunction.svg','image/svg+xml;charset=utf-8');});
    $('csv').addEventListener('click',()=>{if(!lastAnalysis)return;const a=lastAnalysis,lines=['# Work function (eV),'+a.phi,'# Vacuum level (eV),'+a.vv,'# Fermi level (eV),'+a.ef,'# Plateau variation (eV),'+a.variation,'z_A,potential_eV,smoothed_potential_eV,in_selected_vacuum_region'];records.forEach((r,i)=>lines.push([r.z,r.v,a.smoothed[i].v,r.z>=a.z1&&r.z<=a.z2?1:0].join(',')));download(lines.join('\n')+'\n','surface_workfunction.csv','text/csv;charset=utf-8');});
    update();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  if(typeof document$!=='undefined' && document$.subscribe)document$.subscribe(init);
})();
