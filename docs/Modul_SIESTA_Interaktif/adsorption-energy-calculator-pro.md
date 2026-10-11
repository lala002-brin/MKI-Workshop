---
level: research_toolkit
---

# Adsorption Energy Calculator Pro

Analisis energi adsorpsi dari hasil SIESTA, dengan pemeriksaan referensi, koreksi opsional, dan perbandingan konfigurasi. Semua pemrosesan dilakukan di browser Anda.

<div id="aec-pro">
  <div class="aec-hero"><span> MKI WORKSHOP · SIESTA RESEARCH TOOLS </span><h2>Adsorption Energy Calculator Pro</h2><p>Calculation workflow · Energy parsing · Comparative analysis · Research exports</p></div>
  <div class="aec-panel">
    <h3>1. Alur perhitungan</h3>
    <div class="aec-steps"><div><b>01 · Sistem gabungan</b><small>Optimasi dan single-point adsorbat + permukaan</small></div><div><b>02 · Permukaan bersih</b><small>Sel, parameter, dan referensi sesuai protokol</small></div><div><b>03 · Molekul terisolasi</b><small>Vakum memadai; keadaan spin/charge sesuai</small></div><div><b>04 · Audit & perbandingan</b><small>Periksa konsistensi, koreksi, lalu interpretasikan</small></div></div>
    <p class="aec-note">Konvensi: <b>Eads = E(complex) − E(surface) − E(molecule)</b>. Nilai negatif berarti keadaan teradsorpsi lebih rendah energinya daripada referensi yang dipilih; bukan bukti otomatis adsorpsi spontan atau kinetika cepat.</p>
  </div>
  <div class="aec-panel"><h3>2. Energi referensi</h3><div class="aec-grid">
    <label>Energi permukaan bersih (eV)<input id="aec-surf" type="number" step="any" placeholder="Contoh: -14500"></label>
    <label>Energi molekul terisolasi (eV)<input id="aec-mol" type="number" step="any" placeholder="Contoh: -600"></label>
    <label>Nama permukaan<input id="aec-surface-name" placeholder="Fe3O4 (001)"></label>
    <label>Nama adsorbat<input id="aec-molecule-name" placeholder="Tetracycline"></label>
  </div><div class="aec-actions"><button id="aec-load-demo">Muat demo sintetis</button><button id="aec-clear" class="aec-light">Reset</button></div></div>
  <div class="aec-panel"><h3>3. Konfigurasi adsorpsi</h3><p>Masukkan energi gabungan untuk setiap konfigurasi atau impor CSV. Unggah log <code>.out</code> untuk mengambil energi SIESTA yang dikenali; hasil parser harus diperiksa terhadap log aslinya.</p>
    <div class="aec-grid"><label>Nama konfigurasi<input id="aec-label" placeholder="Top Fe / orientation A"></label><label>Energi gabungan (eV)<input id="aec-complex" type="number" step="any" placeholder="-15105"></label><label>Koreksi tambahan (eV)<input id="aec-correction" type="number" step="any" value="0"></label><label>Jarak adsorpsi (Å), opsional<input id="aec-distance" type="number" min="0" step="any" placeholder="2.1"></label></div>
    <label class="aec-check"><input type="checkbox" id="aec-correction-ack"> Saya memahami tanda dan definisi koreksi: nilai di atas <b>ditambahkan</b> pada Eads mentah.</label>
    <div class="aec-actions"><button id="aec-add">Tambah konfigurasi</button><label class="aec-file">Impor CSV<input id="aec-csv" type="file" accept=".csv,.tsv,text/plain"></label><label class="aec-file">Baca .out SIESTA<input id="aec-out" type="file" accept=".out,.log,.txt,text/plain"></label></div>
    <div id="aec-parser-note" class="aec-message" role="status">Belum ada file diunggah.</div>
  </div>
  <div class="aec-panel"><h3>4. Audit konsistensi perhitungan</h3><div class="aec-checklist" id="aec-audit"><label><input type="checkbox" data-audit="Composition & stoichiometry verified">Komposisi dan stoikiometri benar</label><label><input type="checkbox" data-audit="Functional, pseudopotentials & basis verified">XC, pseudopotensial, dan basis kompatibel</label><label><input type="checkbox" data-audit="Cutoff and k-point convergence demonstrated">Uji konvergensi cutoff dan k-point tersedia</label><label><input type="checkbox" data-audit="Cell, spin and charge reference verified">Sel, spin, muatan, dan vakum referensi sesuai</label><label><input type="checkbox" data-audit="All structures and SCF converged">Optimasi geometri dan SCF terkonvergensi</label><label><input type="checkbox" data-audit="Correction conventions verified">Konvensi BSSE/ZPE/solvasi/koreksi sudah diperiksa</label></div><div class="aec-message" id="aec-audit-status"></div></div>
  <div class="aec-panel"><h3>5. Hasil & grafik</h3><div id="aec-summary" class="aec-summary" aria-live="polite"></div><div class="aec-chart-frame"><svg id="aec-chart" viewBox="0 0 740 370" role="img" aria-label="Perbandingan energi adsorpsi"></svg></div><div class="aec-table-wrap"><table class="aec-table"><thead><tr><th>Konfigurasi</th><th>E gabungan (eV)</th><th>Eads mentah (eV)</th><th>Koreksi (eV)</th><th>Eads terkoreksi (eV)</th><th>kJ/mol</th><th>Jarak (Å)</th><th>Aksi</th></tr></thead><tbody id="aec-rows"></tbody></table></div><div class="aec-actions"><button id="aec-svg" class="aec-light">Unduh grafik SVG</button><button id="aec-export-csv" class="aec-light">Unduh CSV</button><button id="aec-json" class="aec-light">Unduh laporan JSON</button></div></div>
  <div class="aec-message aec-warning"><b>Batas ilmiah:</b> Energi total hanya dapat dibandingkan langsung bila definisi sistem dan parameter perhitungan kompatibel. Hasil ini merupakan energi elektronik dengan koreksi tambahan yang dimasukkan pengguna, bukan ΔG adsorpsi. Nilai negatif saja tidak membuktikan mekanisme adsorpsi, stabilitas pada pelarut, atau hasil eksperimen.</div>
</div>
