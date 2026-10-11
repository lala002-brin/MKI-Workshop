(() => {
  'use strict';
  const root = document.getElementById('dqc-app');
  if (!root || root.dataset.initialized === '1') return;
  root.dataset.initialized = '1';
  const $ = id => root.querySelector('#' + id);
  let inputs = {fdf: null, out: null, fdfName: '', outName: '', demo: false};
  let report = null;
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num = value => { const m = String(value ?? '').match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:[EeDd][-+]?\d+)?/); return m ? Number(m[0].replace(/[Dd]/,'E')) : NaN; };
  function parseFDF(text) {
    const fields = {}, blocks = {};
    const lines = text.split(/\r?\n/); let block = null;
    for (const source of lines) {
      const line = source.replace(/[#;!].*$/, '').trim();
      if (!line) continue;
      const start = line.match(/^%block\s+(\S+)/i), end = line.match(/^%endblock\b/i);
      if (start) {block=start[1].toLowerCase();blocks[block]=[];continue;}
      if (end) {block=null;continue;}
      if (block) {blocks[block].push(line);continue;}
      const m=line.match(/^([^\s]+)\s+(.+)$/);if(m) fields[m[1].toLowerCase()]=m[2].trim();
    }
    return {fields,blocks};
  }
  function findValue(fields, keys){ for(const key of keys){if(fields[key.toLowerCase()]!==undefined)return fields[key.toLowerCase()];}return null; }
  function parseOutput(text) {
    const lines = text.split(/\r?\n/);let converged=false, notConverged=false, scfSteps=0, finalEnergy=null, ended=false;
    for (const line of lines){
      if (/\bscf:\s*\d+\b/i.test(line)) scfSteps++;
      if (/\bSCF\b.{0,60}(?:converg(?:ed|ence reached)|has converged)|(?:converg(?:ed|ence reached)).{0,60}\bSCF\b/i.test(line)) converged=true;
      if (/\bSCF\b.{0,60}(?:not converged|did not converge|unconverged)|(?:not converged|did not converge).{0,60}\bSCF\b/i.test(line)) notConverged=true;
      const e=line.match(/siesta:\s*E_(?:KS|tot)\s*=\s*([-+\d.eEdD]+)/i);if(e)finalEnergy=num(e[1]);
      if (/siesta:\s*End of run|Job completed|End of SIESTA/i.test(line))ended=true;
    }
    return {scfSteps,converged:converged&&!notConverged,notConverged,finalEnergy,ended};
  }
  const check = (id,title,state,detail,recommendation='')=>({id,title,state,detail,recommendation});
  function analyze(){
    const f=inputs.fdf ? parseFDF(inputs.fdf) : {fields:{},blocks:{}};
    const o=inputs.out ? parseOutput(inputs.out) : null;
    const rows=[], checks=[], add=(label,val,source)=>{if(val!==null&&val!==undefined)rows.push({label,value:String(val),source});};
    const get=(label,keys)=>{const val=findValue(f.fields,keys);add(label,val,'FDF');return val;};
    const cutoff=get('MeshCutoff',['MeshCutoff']);
    const basis=get('PAO.BasisSize',['PAO.BasisSize']);
    const energyShift=get('PAO.EnergyShift',['PAO.EnergyShift']);
    const spin=get('Spin / SpinPolarized',['Spin','SpinPolarized']);
    const xc=get('XC.Functional',['XC.Functional']);
    const xcAuthor=get('XC.Authors',['XC.Authors']);
    const maxSCF=get('MaxSCFIterations',['MaxSCFIterations']);
    const dmTol=get('DM.Tolerance',['DM.Tolerance']);
    const typeRun=get('MD.TypeOfRun',['MD.TypeOfRun']);
    const forceTol=get('MD.MaxForceTol',['MD.MaxForceTol']);
    const kblock=f.blocks['kgrid_monkhorst_pack'];
    if(kblock) add('kgrid_Monkhorst_Pack',kblock.join(' | '),'FDF');
    const species=f.blocks['chemicalspecieslabel'];if(species)add('ChemicalSpeciesLabel',`${species.length} baris`,'FDF');
    if(o){add('SCF rows (log)',o.scfSteps,'OUT');add('Final energy (log)',o.finalEnergy === null ? null : `${o.finalEnergy} eV`,'OUT');}
    if(!inputs.fdf)checks.push(check('fdf','Input FDF belum tersedia','not_verified','Pengaturan cutoff, basis, k-point, spin, dan parameter lainnya tidak dapat diaudit tanpa input.'));
    else {
      checks.push(check('cutoff','MeshCutoff',cutoff ? (Number.isFinite(num(cutoff))&&num(cutoff)>0?'detected':'warning'):'not_verified',cutoff?`Terdeteksi ${cutoff}. Ini bukan bukti konvergensi cutoff.`:'MeshCutoff tidak tercantum secara eksplisit.', 'Lakukan uji sensitivitas dengan beberapa MeshCutoff.'));
      checks.push(check('basis','Basis set dan energy shift',basis&&energyShift?'detected':'not_verified',`PAO.BasisSize: ${basis??'tidak dinyatakan'}; PAO.EnergyShift: ${energyShift??'tidak dinyatakan'}.`,'Uji konvergensi basis dan dokumentasikan parameter aktual.'));
      if(kblock){const valid=kblock.length>=3&&kblock.slice(0,3).every(l=>l.trim().split(/\s+/).length>=4);checks.push(check('kmesh','k-point grid',valid?'detected':'warning',valid?`kgrid block terdeteksi (${kblock.length} baris). Kepadatan mesh belum tervalidasi.`:'Blok kgrid tidak mengikuti susunan tiga baris empat angka yang umum.','Bandingkan beberapa kepadatan k-point.'));}
      else checks.push(check('kmesh','k-point grid','not_verified','Blok kgrid_Monkhorst_Pack tidak ditemukan. Ini bisa valid untuk Gamma-only atau pengaturan melalui include/default, tetapi perlu diverifikasi.'));
      checks.push(check('spin','Spin configuration',spin?'detected':'not_verified',spin?`Pengaturan spin: ${spin}.`:'Spin tidak dicantumkan eksplisit pada FDF yang diunggah.'));
      checks.push(check('xc','Exchange-correlation',xc||xcAuthor?'detected':'not_verified',`XC.Functional: ${xc??'tidak dinyatakan'}, XC.Authors: ${xcAuthor??'tidak dinyatakan'}.`));
      checks.push(check('sctol','SCF controls',maxSCF||dmTol?'detected':'not_verified',`MaxSCFIterations: ${maxSCF??'tidak dinyatakan'}; DM.Tolerance: ${dmTol??'tidak dinyatakan'}.`));
      if(typeRun)checks.push(check('geom','Geometry settings','detected',`MD.TypeOfRun: ${typeRun}; MD.MaxForceTol: ${forceTol??'tidak dinyatakan'}. Parameter yang terdeteksi belum membuktikan geometri sudah teroptimasi.`));
      checks.push(check('include','FDF include / external files',/^\s*(?:%include|%block\s+(?:pseudopotential|basis))/im.test(inputs.fdf)?'warning':'not_verified',/\%include/i.test(inputs.fdf)?'Ditemukan %include. Parameter di file eksternal belum dianalisis.':'File pseudopotensial dan file include eksternal belum diverifikasi.','Periksa seluruh FDF include serta metadata pseudopotensial yang digunakan.'));
    }
    if(!o)checks.push(check('out','Output SIESTA','not_verified','File .out belum tersedia; status eksekusi dan SCF tidak dapat dicek.'));
    else {
      checks.push(check('scf','Status konvergensi SCF',o.notConverged?'warning':o.converged?'detected':'not_verified',o.notConverged?'Log mengandung pernyataan SCF tidak konvergen.':o.converged?'Terdeteksi pesan konvergensi eksplisit; pastikan berkaitan dengan siklus SCF terakhir.':`Terdeteksi ${o.scfSteps} baris SCF. Tidak ditemukan pernyataan konvergensi eksplisit dengan pola yang dikenali.`, 'Periksa akhir log dan kriteria SCF untuk setiap siklus.'));
      checks.push(check('end','Akhir perhitungan',o.ended?'detected':'not_verified',o.ended?'Ditemukan penanda akhir run yang dikenali.':'Penanda akhir run tidak ditemukan oleh parser; belum tentu berarti proses gagal.'));
      checks.push(check('energy','Energi akhir',Number.isFinite(o.finalEnergy)?'detected':'not_verified',Number.isFinite(o.finalEnergy)?`Nilai E_KS/E_tot terakhir yang tercatat: ${o.finalEnergy} eV. Tidak boleh membandingkan energi lintas sistem berbeda tanpa normalisasi/kondisi setara.`:'Tidak ditemukan E_KS / E_tot dengan format yang dikenali.'));
    }
    checks.push(check('convergence','Numerical convergence study','not_verified','Satu pasangan file tidak membuktikan konvergensi MeshCutoff, k-point, atau basis.', 'Bandingkan run terkontrol dan nilai observabel yang relevan.'));
    checks.push(check('pseudo','Pseudopotential provenance','not_verified','Validitas, sumber, dan versi pseudopotensial tidak dapat dipastikan otomatis dari FDF/OUT yang diunggah.'));
    checks.push(check('slab','Slab / vacuum adequacy','not_verified','Ketebalan vacuum, interaksi citra periodik, dan konvergensi slab memerlukan data struktur serta uji terpisah.'));
    const counts={detected:checks.filter(x=>x.state==='detected').length,warning:checks.filter(x=>x.state==='warning').length,not_verified:checks.filter(x=>x.state==='not_verified').length};
    const summary=`${inputs.demo?'DATA SINTETIS / DEMONSTRASI. ':''}Hasil pemeriksaan: ${counts.detected} terdeteksi, ${counts.warning} peringatan, ${counts.not_verified} belum terverifikasi.\n\nStatus “Detected” hanya menunjukkan keberadaan parameter atau penanda log yang dikenali, bukan kelulusan uji konvergensi. ${o?.notConverged?'Log memuat indikasi SCF tidak konvergen. ':'Tidak ada kesimpulan otomatis bahwa SCF terakhir telah konvergen. '}Lakukan pengujian sensitivitas terkontrol dan periksa pseudopotensial sebelum mengklaim kualitas hasil.`;
    report={tool:'DFT Quality Checker Pro',version:'1.0',generatedAt:new Date().toISOString(),files:{fdf:inputs.fdfName||null,out:inputs.outName||null},synthetic:inputs.demo,parameters:rows,checks,counts,summary};render();
  }
  function render(){if(!report)return;const r=report;
    $('dqc-fileinfo').textContent=`${r.synthetic?'⚠ CONTOH SINTETIS · ':''}FDF: ${r.files.fdf??'belum ada'} · OUT: ${r.files.out??'belum ada'} · Pemrosesan lokal dalam browser.`;
    $('dqc-metrics').innerHTML=[['Detected',r.counts.detected],['Warning',r.counts.warning],['Not verified',r.counts.not_verified]].map(([a,b])=>`<div class="dqc-metric"><b>${b}</b><span>${a}</span></div>`).join('');
    $('dqc-params').innerHTML=r.parameters.length?r.parameters.map(p=>`<tr><td>${escapeHTML(p.label)}</td><td>${escapeHTML(p.value)}</td><td>${escapeHTML(p.source)}</td></tr>`).join(''):'<tr><td colspan="3">Belum ada parameter terdeteksi</td></tr>';
    const state=$('dqc-filter').value;const visible=r.checks.filter(c=>state==='all'||c.state===state);
    $('dqc-checks').innerHTML=visible.length?visible.map(c=>`<article class="dqc-check" data-state="${c.state}"><span class="dqc-pill">${c.state.replace('_',' ')}</span><strong>${escapeHTML(c.title)}</strong><p>${escapeHTML(c.detail)}</p>${c.recommendation?`<p><em>Langkah lanjut: ${escapeHTML(c.recommendation)}</em></p>`:''}</article>`).join(''):'<p>Tidak ada item untuk filter ini.</p>';
    $('dqc-summary').textContent=r.summary;
    for(const id of ['dqc-csv','dqc-json','dqc-html'])$(id).disabled=false;
  }
  function download(filename,contents,mime){const blob=new Blob([contents],{type:mime});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
  const csvEscape=s=>'"'+String(s??'').replace(/"/g,'""')+'"';
  function exportCSV(){if(!report)return;const lines=[['status','check','detail','recommendation'],...report.checks.map(c=>[c.state,c.title,c.detail,c.recommendation])];download('siesta_quality_checks.csv',lines.map(x=>x.map(csvEscape).join(',')).join('\r\n'),'text/csv;charset=utf-8');}
  function exportHTML(){if(!report)return;const r=report;const html=`<!doctype html><html lang="en"><meta charset="utf-8"><title>DFT Quality Checker Report</title><style>body{font:15px system-ui;max-width:900px;margin:40px auto;padding:0 20px;color:#172c42}table{border-collapse:collapse;width:100%}td,th{padding:10px;border:1px solid #ccd3dc;text-align:left}th{background:#edf3f8}h1{color:#14549a}pre{white-space:pre-wrap}</style><h1>DFT Quality Checker Pro</h1><p>${escapeHTML(r.synthetic?'SYNTHETIC DEMO · ':'')}${escapeHTML(r.generatedAt)}</p><p>FDF: ${escapeHTML(r.files.fdf||'not supplied')} · OUT: ${escapeHTML(r.files.out||'not supplied')}</p><h2>Parameters</h2><table><tr><th>Name</th><th>Value</th><th>Source</th></tr>${r.parameters.map(x=>`<tr><td>${escapeHTML(x.label)}</td><td>${escapeHTML(x.value)}</td><td>${escapeHTML(x.source)}</td></tr>`).join('')}</table><h2>Checks</h2><table><tr><th>Status</th><th>Item</th><th>Finding</th></tr>${r.checks.map(x=>`<tr><td>${escapeHTML(x.state)}</td><td>${escapeHTML(x.title)}</td><td>${escapeHTML(x.detail)}</td></tr>`).join('')}</table><h2>Interpretation</h2><pre>${escapeHTML(r.summary)}</pre></html>`;download('siesta_quality_report.html',html,'text/html;charset=utf-8');}
  function clear(){inputs={fdf:null,out:null,fdfName:'',outName:'',demo:false};report=null;$('dqc-fdf').value='';$('dqc-out').value='';$('dqc-filter').value='all';$('dqc-fileinfo').textContent='Unggah salah satu atau kedua file. Penilaian konvergensi numerik membutuhkan serangkaian run dengan parameter yang divariasikan.';$('dqc-metrics').innerHTML='';$('dqc-params').innerHTML='<tr><td colspan="3">Belum ada data</td></tr>';$('dqc-checks').innerHTML='<p>Unggah data untuk memulai.</p>';$('dqc-summary').textContent='Belum ada analisis.';for(const id of ['dqc-csv','dqc-json','dqc-html'])$(id).disabled=true;}
  async function fileLoad(kind,file){if(!file)return;try{if(file.size>30*1024*1024)throw new Error('Berkas melebihi batas 30 MB.');const contents=await file.text();inputs[kind]=contents;inputs[kind+'Name']=file.name;inputs.demo=false;analyze();}catch(e){$('dqc-fileinfo').textContent='Tidak berhasil membaca: '+e.message;}}
  $('dqc-fdf').addEventListener('change',e=>fileLoad('fdf',e.target.files?.[0]));
  $('dqc-out').addEventListener('change',e=>fileLoad('out',e.target.files?.[0]));
  $('dqc-filter').addEventListener('change',render);
  $('dqc-reset').addEventListener('click',clear);
  $('dqc-demo').addEventListener('click',()=>{inputs={fdf:`SystemName FeCo Demo\nMeshCutoff 300 Ry\nPAO.BasisSize DZP\nPAO.EnergyShift 0.02 Ry\nXC.Functional GGA\nXC.Authors PBE\nSpin polarized\nMaxSCFIterations 150\nDM.Tolerance 1.d-4\n%block kgrid_Monkhorst_Pack\n4 0 0 0.0\n0 4 0 0.0\n0 0 4 0.0\n%endblock kgrid_Monkhorst_Pack`,out:`siesta: E_KS = -985.322 eV\nscf: 1 -982.5\nscf: 2 -984.6\nscf: 3 -985.3\nSCF has converged\nsiesta: End of run`,fdfName:'demo_synthetic.fdf',outName:'demo_synthetic.out',demo:true};$('dqc-fdf').value='';$('dqc-out').value='';analyze();});
  $('dqc-csv').addEventListener('click',exportCSV);
  $('dqc-json').addEventListener('click',()=>report&&download('siesta_quality_report.json',JSON.stringify(report,null,2),'application/json'));
  $('dqc-html').addEventListener('click',exportHTML);
})();
