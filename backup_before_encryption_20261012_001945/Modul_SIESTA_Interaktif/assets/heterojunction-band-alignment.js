
/* MKI Heterojunction Band Alignment Studio — Pro update */
(()=>{'use strict';
const root=document.getElementById('hba-studio'); if(!root||root.dataset.ready==='yes') return; root.dataset.ready='yes';
const $=id=>root.querySelector('#'+id), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
      f=n=>Number.isFinite(n)?n.toFixed(2):'–', val=x=>x===''||x==null?null:Number(x), num=x=>x!=null&&Number.isFinite(x);
const demo=[
  {name:'Cu₂O',vbm:-5.55,cbm:-3.55,ef:-4.45,phi:4.45,shift:-0.20,color:'#e85d1f'},
  {name:'ZIF-67',vbm:-6.05,cbm:-2.70,ef:-4.40,phi:4.40,shift:0.12,color:'#2684c7'},
  {name:'Fe₃O₄',vbm:null,cbm:null,ef:-4.78,phi:4.78,shift:0.06,color:'#7a4fd1'}
];
let lastSVG='';
const setMsg=(s,error=false)=>{$('hba-message').textContent=s; $('hba-message').classList.toggle('hba-error',error)};
function addRow(d={}){ let tr=document.createElement('tr'); const fields=['name','vbm','cbm','ef','phi','shift','color'];
  for(const field of fields){ let td=document.createElement('td'), input=document.createElement('input'); input.dataset.field=field; input.setAttribute('aria-label',field); input.type=field==='color'?'color':field==='name'?'text':'number'; if(input.type==='number') input.step='any'; input.value=d[field]??(field==='color'?'#2563eb':field==='shift'?0:''); input.addEventListener('change',render); td.append(input); tr.append(td); }
  let td=document.createElement('td'), b=document.createElement('button'); b.type='button'; b.className='hba-remove'; b.textContent='Hapus'; b.addEventListener('click',()=>{tr.remove(); render()}); td.append(b); tr.append(td); $('hba-rows').append(tr);
}
function rows(){ return [...$('hba-rows').children].map(tr=>{ const d={}; tr.querySelectorAll('input').forEach(x=>{ d[x.dataset.field]=['name','color'].includes(x.dataset.field)?x.value:val(x.value); }); return d; }).filter(d=>d.name.trim()); }
function load(ds){ $('hba-rows').textContent=''; ds.forEach(addRow); render(); }
function svgEl(s){ $('hba-plot').innerHTML=s; lastSVG=s; }
function stylePack(style){
  if(style==='dark') return {bg:'#0f1727',fg:'#eef4ff',muted:'#b6c4d8',grid:'#314056',vac:'#eef4ff',axis:'#e5edf8'};
  if(style==='mono') return {bg:'#ffffff',fg:'#111827',muted:'#616b78',grid:'#e5e7eb',vac:'#111827',axis:'#111827'};
  if(style==='modern') return {bg:'#fbfdff',fg:'#132337',muted:'#5f6f82',grid:'#dfe7ef',vac:'#1d2632',axis:'#1b2a3b'};
  return {bg:'#ffffff',fg:'#111111',muted:'#515c69',grid:'#d8dee6',vac:'#111111',axis:'#111111'};
}
function render(){
  try{
    const data=rows(), emin=Number($('hba-min').value), emax=Number($('hba-max').value), mode=$('hba-mode').value, style=$('hba-style').value, ann=$('hba-annotation').value, showVac=$('hba-show-vac').checked, grid=$('hba-grid').checked, labels=$('hba-labels').checked;
    if(!num(emin)||!num(emax)||emin>=emax) throw Error('Rentang energi tidak valid: minimum harus lebih kecil dari maksimum.');
    if(!data.length){ svgEl(''); $('hba-metrics').textContent=''; $('hba-interpret').textContent=''; setMsg('Masukkan material atau klik Muat data contoh.'); return; }
    if(data.length>8) throw Error('Maksimal 8 material agar diagram tetap terbaca.');
    for(const d of data){ if(d.vbm!=null&&d.cbm!=null&&d.vbm>d.cbm) throw Error(d.name+': VBM harus ≤ CBM.'); if(d.phi!=null&&d.phi<0) throw Error(d.name+': work function tidak boleh negatif.'); if(d.ef!=null&&d.phi!=null&&Math.abs(-d.ef-d.phi)>.18) throw Error(d.name+': E_F dan Φ tidak konsisten dengan referensi vakum (Φ = −E_F).'); }
    const theme=stylePack(style), phases=mode==='side'?['isolated','contact']:[mode], W=1320, H=860, margin={l:105,r:36,t:92,b:135}, plotH=H-margin.t-margin.b, axisY=e=>margin.t+(emax-e)/(emax-emin)*plotH, axisRight=W-margin.r;
    const chunks=[`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Band alignment"><rect width="100%" height="100%" fill="${theme.bg}"/>`,`<text x="${W/2}" y="42" font-family="Georgia,Times New Roman,serif" font-size="28" font-weight="700" text-anchor="middle" fill="${theme.fg}">${esc($('hba-title').value)}</text>`];
    const axisTicks=10;
    for(let i=0;i<=axisTicks;i++){ let e=emin+(emax-emin)*i/axisTicks, y=axisY(e); if(grid) chunks.push(`<line x1="${margin.l}" x2="${axisRight}" y1="${y}" y2="${y}" stroke="${theme.grid}" stroke-width="1.1"/>`); chunks.push(`<text x="${margin.l-14}" y="${y+5}" text-anchor="end" font-family="Georgia,Times New Roman,serif" font-size="16" fill="${theme.muted}">${f(e)}</text>`); }
    chunks.push(`<line x1="${margin.l}" y1="${margin.t}" x2="${margin.l}" y2="${H-margin.b}" stroke="${theme.axis}" stroke-width="2.3"/>`,`<line x1="${margin.l}" y1="${H-margin.b}" x2="${axisRight}" y2="${H-margin.b}" stroke="${theme.axis}" stroke-width="2.3"/>`,`<text transform="translate(34 ${H/2}) rotate(-90)" fill="${theme.fg}" font-family="Georgia,Times New Roman,serif" font-size="20" text-anchor="middle">Energy vs vacuum (eV)</text>`);
    if(showVac&&emin<=0&&emax>=0){ let y=axisY(0); chunks.push(`<line x1="${margin.l}" x2="${axisRight}" y1="${y}" y2="${y}" stroke="${theme.vac}" stroke-dasharray="9 7" stroke-width="2.2"/>`,`<text x="${axisRight-4}" y="${y-10}" font-family="Georgia,Times New Roman,serif" font-size="15" text-anchor="end" fill="${theme.fg}">E<tspan baseline-shift="sub">vac</tspan> = 0 eV</text>`); }
    let count=data.length*phases.length, usable=axisRight-margin.l, step=usable/count, index=0;
    for(const phase of phases){
      for(const d of data){
        const center=margin.l+step*(index+.5), width=Math.min(96,step*.62), shift=phase==='contact'?(d.shift||0):0, color=(style==='mono'?(theme.fg):d.color), ef=num(d.ef)?d.ef:num(d.phi)?-d.phi:null;
        const putLine=(e,lbl,dashed=false,thick=5.2)=>{ if(e==null) return; let E=e+shift; if(E<emin||E>emax) return; let y=axisY(E); chunks.push(`<line x1="${center-width/2}" x2="${center+width/2}" y1="${y}" y2="${y}" stroke="${color}" stroke-width="${thick}" ${dashed?'stroke-dasharray="7 5"':''}/>`); if(labels&&ann!=='minimal') chunks.push(`<text x="${center+width/2+7}" y="${y-6}" font-family="Arial,sans-serif" font-size="12.5" fill="${theme.fg}">${lbl}: ${f(E)}</text>`); };
        if(num(d.vbm)&&num(d.cbm)){
          const y1=axisY(Math.min(emax,d.cbm+shift)), y2=axisY(Math.max(emin,d.vbm+shift));
          if(y2>=y1) chunks.push(`<rect x="${center-width/2}" y="${y1}" width="${width}" height="${y2-y1}" fill="${color}" fill-opacity="${style==='dark'?0.22:0.15}" rx="0"/>`);
          putLine(d.cbm,'CBM',false,5.4); putLine(d.vbm,'VBM',false,5.4);
          if(ann==='edgesgap') chunks.push(`<text x="${center}" y="${Math.max(margin.t+18,Math.min(H-margin.b-18,(y1+y2)/2))}" font-family="Georgia,Times New Roman,serif" text-anchor="middle" font-size="15" font-weight="700" fill="${theme.fg}">E<tspan baseline-shift="sub">g</tspan> = ${f(d.cbm-d.vbm)} eV</text>`);
        } else if(num(ef)){
          const yTop=axisY(Math.min(emax,ef+0.35+shift)), yBot=axisY(Math.max(emin,ef-0.35+shift));
          chunks.push(`<rect x="${center-width/2}" y="${Math.min(yTop,yBot)}" width="${width}" height="${Math.abs(yBot-yTop)}" fill="${color}" fill-opacity="${style==='dark'?0.28:0.18}"/>`);
          chunks.push(`<text x="${center}" y="${Math.min(yTop,yBot)-10}" text-anchor="middle" font-family="Georgia,Times New Roman,serif" font-size="14" font-weight="700" fill="${theme.fg}">metal-like</text>`);
        }
        putLine(ef,'E_F',true,3.2);
        chunks.push(`<text x="${center}" y="${H-margin.b+34}" text-anchor="middle" font-family="Georgia,Times New Roman,serif" font-size="18" font-weight="700" fill="${theme.fg}">${esc(d.name)}</text>`);
        if(mode==='side') chunks.push(`<text x="${center}" y="${H-margin.b+56}" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="${theme.muted}">${phase==='isolated'?'before contact':'after shift'}</text>`);
        index++;
      }
    }
    const footerLabel = mode==='isolated' ? 'Vacuum alignment · before contact' : mode==='contact' ? 'Illustrative rigid shifts · not self-consistent interface' : 'Before / after comparison · illustrative rigid shifts';
    chunks.push(`<text x="${W/2}" y="${H-22}" font-family="Arial,sans-serif" font-size="14" text-anchor="middle" fill="${theme.muted}">${footerLabel}</text></svg>`);
    svgEl(chunks.join(''));

    const metrics=$('hba-metrics'); metrics.innerHTML='';
    data.forEach(d=>{ const gap=num(d.vbm)&&num(d.cbm)?d.cbm-d.vbm:null, ef=num(d.ef)?d.ef:num(d.phi)?-d.phi:null, phi=num(d.phi)?d.phi:num(ef)?-ef:null; const cell=document.createElement('div'); cell.className='hba-metric'; cell.innerHTML=`<small>${esc(d.name)}</small><strong>${gap==null?'Metal / gap undefined':'Gap: '+f(gap)+' eV'}</strong><div class="meta"><span>Φ: ${phi==null?'n/a':f(phi)+' eV'}</span><span>E_F: ${ef==null?'n/a':f(ef)+' eV'}</span></div>`; metrics.append(cell); });

    const semi=data.filter(d=>num(d.vbm)&&num(d.cbm)); let info=`<p><strong>${data.length} material</strong> ditampilkan. Material dengan gap divisualisasikan sebagai blok pita, sedangkan material tanpa VBM/CBM ditampilkan sebagai blok metal di sekitar E<sub>F</sub>.</p>`;
    if(semi.length>=2){
      const pairs=[]; for(let i=0;i<semi.length;i++) for(let j=i+1;j<semi.length;j++) pairs.push([semi[i],semi[j]]);
      info += '<p><strong>Offset pita (acuan vakum yang sama):</strong></p><ul>' + pairs.map(([a,b])=>`<li>${esc(a.name)} ↔ ${esc(b.name)}: ΔE<sub>V</sub> = ${f(b.vbm-a.vbm)} eV, ΔE<sub>C</sub> = ${f(b.cbm-a.cbm)} eV.</li>`).join('') + '</ul>';
      if(semi.length>=2){ const a=semi[0], b=semi[1]; if((a.vbm>b.vbm&&a.cbm>b.cbm)||(b.vbm>a.vbm&&b.cbm>a.cbm)) info += '<p>Untuk dua semikonduktor pertama, urutan tepi pita menyerupai <strong>Type-II</strong> secara skematis. Namun mekanisme transfer muatan antarmuka tetap memerlukan data antarmuka self-consistent.</p>'; else info += '<p>Periksa kembali alignment karena urutan tepi pita tidak langsung menunjukkan mekanisme Z-scheme atau S-scheme.</p>'; }
    }
    const metals=data.filter(d=>!num(d.vbm)||!num(d.cbm)); if(metals.length) info += `<p><strong>Catatan metal:</strong> ${metals.map(d=>esc(d.name)).join(', ')} ditampilkan terutama melalui E<sub>F</sub> dan Φ. Untuk sistem seperti Fe₃O₄, analisis spin-resolved dapat lebih relevan daripada satu gap skalar.</p>`;
    if(mode!=='isolated') info += '<p><strong>Sesudah kontak:</strong> pergeseran rigid yang dimasukkan pengguna hanyalah skenario ilustratif. Band bending, dipol antarmuka, dan redistribusi muatan tidak dihitung oleh alat ini.</p>';
    $('hba-interpret').innerHTML=info; setMsg('Diagram diperbarui. Mode Paper Classic + tiga material cocok untuk visualisasi ringkas Fe₃O₄ / ZIF-67 / Cu₂O.');
  } catch(err){ setMsg(err.message,true); }
}
function csvEscape(x){ const s=String(x??''); return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; }
function download(name,body,type){ const url=URL.createObjectURL(new Blob([body],{type})), a=document.createElement('a'); a.href=url; a.download=name; document.body.append(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1200); }
function parseCSV(text){ const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(l=>l.trim()&&!l.trim().startsWith('#')); if(lines.length<2) throw Error('CSV harus memiliki header dan setidaknya satu baris data.');
  const split=l=>{ let out=[],buf='',q=false; for(let i=0;i<l.length;i++){ const c=l[i]; if(c==='"'){ if(q&&l[i+1]==='"'){ buf+='"'; i++; } else q=!q; } else if(c===','&&!q){ out.push(buf.trim()); buf=''; } else buf+=c; } out.push(buf.trim()); return out; };
  const heads=split(lines.shift()).map(x=>x.trim().toLowerCase()); if(!heads.includes('name')) throw Error('Header CSV harus memuat kolom name.');
  return lines.map(l=>{ const cells=split(l), d={}; heads.forEach((h,i)=>{ if(['name','color'].includes(h)) d[h]=cells[i]||''; else if(['vbm','cbm','ef','phi','shift'].includes(h)) d[h]=cells[i]===''?null:Number(cells[i]); }); for(const k of ['vbm','cbm','ef','phi','shift']) if(d[k]!=null&&!num(d[k])) throw Error('Nilai numerik tidak valid pada '+(d.name||'baris CSV')); d.color=/^#[\da-fA-F]{6}$/.test(d.color||'')?d.color:'#2563eb'; return d; }).filter(d=>d.name);
}
$('hba-demo').addEventListener('click',()=>load(demo)); $('hba-add').addEventListener('click',()=>{ if(rows().length>=8){ setMsg('Maksimal 8 material.',true); return; } addRow({name:'Material '+($('hba-rows').children.length+1),color:'#2387c2'}); render(); }); $('hba-reset').addEventListener('click',()=>{ load([]); setMsg('Data dikosongkan. Klik Muat data contoh untuk mulai.'); }); $('hba-update').addEventListener('click',render);
for(const id of ['hba-min','hba-max','hba-mode','hba-style','hba-annotation','hba-title','hba-show-vac','hba-grid','hba-labels']) $(id).addEventListener('change',render);
$('hba-upload').addEventListener('change', async e=>{ const file=e.target.files?.[0]; if(!file) return; try{ load(parseCSV(await file.text())); setMsg('File '+file.name+' berhasil dibaca. Pastikan semua energi sudah direferensikan ke vakum.'); } catch(err){ setMsg('Impor gagal: '+err.message,true); } e.target.value=''; });
$('hba-csv').addEventListener('click',()=>{ const head=['name','vbm','cbm','ef','phi','shift','color']; const s=[head.join(','), ...rows().map(d=>head.map(k=>csvEscape(d[k])).join(','))].join('\n'); download('heterojunction-band-alignment.csv',s,'text/csv;charset=utf-8'); });
$('hba-svg').addEventListener('click',()=>{ if(!lastSVG){ setMsg('Tidak ada grafik untuk diekspor.',true); return; } download('heterojunction-band-alignment.svg','<?xml version="1.0" encoding="UTF-8"?>\n'+lastSVG,'image/svg+xml;charset=utf-8'); });
load(demo);
})();
