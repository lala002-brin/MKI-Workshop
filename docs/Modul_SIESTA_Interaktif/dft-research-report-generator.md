---
level: research_toolkit
---

# DFT Research Report Generator Pro

Bangun laporan penelitian DFT/SIESTA dengan **jejak sumber data, pemeriksaan keterbatasan, dan ekspor HTML/JSON/CSV**. Seluruh proses dilakukan di browser Anda; file tidak diunggah ke server. Data hasil impor perlu ditinjau sebelum digunakan sebagai hasil ilmiah.

<div id="drr-app">
  <div class="drr-hero"><div class="drr-eyebrow">MKI WORKSHOP · SIESTA RESEARCH TOOLS</div><h2>DFT Research Report Generator Pro</h2><p>Reproducible research · Evidence-aware reporting · Export-ready documentation</p><span>Local processing · No upload server</span></div>
  <section class="drr-panel"><h3>1. Identitas penelitian</h3><div class="drr-grid">
    <label>Judul penelitian<input id="drr-title" placeholder="Electronic and magnetic properties of..."></label>
    <label>Nama peneliti / tim<input id="drr-author" placeholder="Nama peneliti / kelompok"></label>
    <label>Material / sistem<input id="drr-material" placeholder="Fe3O4 / CoFe3O4 / heterojunction"></label>
    <label>Perangkat lunak dan versi<input id="drr-software" placeholder="SIESTA 5.x (verifikasi pada log)"></label>
    <label>Tujuan perhitungan<textarea id="drr-objective" rows="2" placeholder="Apa yang ingin diuji?"></textarea></label>
    <label>Catatan metode<textarea id="drr-method" rows="2" placeholder="XC, pseudo, basis, cutoff, k-grid, spin, geometri..."></textarea></label>
  </div></section>
  <section class="drr-panel"><h3>2. Tambahkan bukti / hasil analisis</h3><p>Setiap temuan disimpan bersama sumber dan tingkat verifikasinya. Impor JSON hasil modul lain sebagai <b>lampiran data</b>; isinya tidak otomatis dianggap terverifikasi atau disalin menjadi kesimpulan.</p>
    <div class="drr-grid"><label>Bagian<select id="drr-section"><option>SCF & convergence</option><option>Structure & geometry</option><option>Band structure & DOS</option><option>Magnetism & spin</option><option>Charge density</option><option>Adsorption energy</option><option>Calculation quality</option><option>Other</option></select></label>
    <label>Nama parameter / temuan<input id="drr-metric" placeholder="Eads (Top Fe) / ΔE SCF / bond length"></label>
    <label>Nilai dan satuan<input id="drr-value" placeholder="-1.03 eV / 2.09 Å"></label>
    <label>Status<select id="drr-status"><option value="unverified">Belum diverifikasi</option><option value="reviewed">Ditinjau manual</option><option value="synthetic">Data sintetis / demo</option></select></label>
    <label>File sumber / referensi<input id="drr-source" placeholder="FeCo.out / adsorption_report.json / tabel 2"></label>
    <label>Interpretasi & keterbatasan<textarea id="drr-note" rows="2" placeholder="Tidak otomatis membuktikan konvergensi atau mekanisme..."></textarea></label></div>
    <div class="drr-actions"><button id="drr-add" type="button">Tambahkan temuan</button><label class="drr-file">Impor JSON / CSV <input id="drr-file" type="file" accept=".json,.csv,.tsv,application/json,text/csv" multiple></label><button id="drr-demo" class="drr-light" type="button">Muat demo sintetis</button><button id="drr-reset" class="drr-danger" type="button">Reset semua</button></div><div id="drr-message" class="drr-message" role="status">Belum ada data yang dimuat.</div>
  </section>
  <section class="drr-panel"><h3>3. Ringkasan & audit bukti</h3><div class="drr-stats" id="drr-stats"></div><div class="drr-table-wrap"><table class="drr-table"><thead><tr><th>Bagian</th><th>Parameter</th><th>Nilai</th><th>Status</th><th>Sumber</th><th>Catatan</th><th>Aksi</th></tr></thead><tbody id="drr-rows"></tbody></table></div><p class="drr-small">Status “ditinjau manual” berarti pengguna telah memeriksa sumber, bukan validasi otomatis oleh aplikasi.</p></section>
  <section class="drr-panel"><h3>4. Checklist pelaporan yang dapat direproduksi</h3><div class="drr-checklist" id="drr-checklist"><label><input type="checkbox" data-check="Metode XC, basis dan pseudopotensial dicatat"> XC, basis set, serta pseudopotensial dicatat</label><label><input type="checkbox" data-check="Cutoff dan k-mesh dicatat serta diuji"> MeshCutoff dan k-point disertai uji konvergensi</label><label><input type="checkbox" data-check="Spin, muatan dan sel simulasi dicatat"> Spin, muatan total, dan sel simulasi dicatat</label><label><input type="checkbox" data-check="SCF dan optimasi diverifikasi"> Konvergensi SCF dan optimasi diperiksa</label><label><input type="checkbox" data-check="Sumber hasil dan satuan dapat ditelusuri"> Sumber, satuan, dan definisi setiap hasil dapat ditelusuri</label><label><input type="checkbox" data-check="Keterbatasan dan koreksi dijelaskan"> Batasan metode dan koreksi dinyatakan</label></div><div id="drr-check-status" class="drr-message"></div></section>
  <section class="drr-panel"><h3>5. Pratinjau laporan penelitian</h3><div id="drr-preview" class="drr-preview"></div><div class="drr-actions"><button type="button" id="drr-html">Unduh laporan HTML</button><button type="button" id="drr-json" class="drr-light">Unduh proyek JSON</button><button type="button" id="drr-csv" class="drr-light">Unduh tabel CSV</button><button type="button" id="drr-print" class="drr-light">Cetak / Simpan PDF</button></div></section>
  <div class="drr-warning"><strong>Batas ilmiah:</strong> Modul ini menyusun laporan dari data dan klaim yang dimasukkan pengguna. Tidak menjalankan DFT, tidak membuktikan kualitas perhitungan, tidak mengubah data demo menjadi hasil penelitian, serta tidak melakukan verifikasi otomatis atas sumber. Lampiran impor harus diperiksa secara manual.</div>
</div>
