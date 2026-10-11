# DFT Quality Checker Pro

Pemeriksaan konsistensi pengaturan, log perhitungan, dan kesiapan dokumentasi hasil **SIESTA**. Alat ini berjalan lokal di browser; berkas tidak dikirim ke server.

<div class="dqc-app" id="dqc-app">
  <div class="dqc-hero"><span class="dqc-tag">MKI Workshop · SIESTA</span><h2>Calculation Quality & Reproducibility</h2><p>Periksa input <code>.fdf</code> dan output <code>.out</code> dengan status yang transparan: <strong>Detected</strong>, <strong>Warning</strong>, atau <strong>Not verified</strong>.</p></div>
  <div class="dqc-panel dqc-upload">
    <label>File input SIESTA (.fdf) <input id="dqc-fdf" type="file" accept=".fdf,.txt"></label>
    <label>File output SIESTA (.out) <input id="dqc-out" type="file" accept=".out,.log,.txt"></label>
    <div class="dqc-actions"><button id="dqc-demo" type="button">Muat contoh sintetis</button><button id="dqc-reset" class="dqc-secondary" type="button">Reset</button></div>
    <p class="dqc-note" id="dqc-fileinfo">Unggah salah satu atau kedua file. Penilaian konvergensi numerik membutuhkan serangkaian run dengan parameter yang divariasikan.</p>
  </div>
  <div class="dqc-metrics" id="dqc-metrics" aria-live="polite"></div>
  <div class="dqc-panel"><div class="dqc-heading"><h3>Parameter yang terdeteksi</h3><div class="dqc-actions"><button id="dqc-csv" class="dqc-secondary" disabled type="button">Ekspor CSV</button><button id="dqc-json" class="dqc-secondary" disabled type="button">Ekspor JSON</button><button id="dqc-html" class="dqc-secondary" disabled type="button">Ekspor HTML</button></div></div><div class="dqc-tablewrap"><table><thead><tr><th>Parameter</th><th>Nilai</th><th>Sumber</th></tr></thead><tbody id="dqc-params"><tr><td colspan="3">Belum ada data</td></tr></tbody></table></div></div>
  <div class="dqc-panel"><div class="dqc-heading"><h3>Hasil pemeriksaan</h3><label class="dqc-small">Filter <select id="dqc-filter"><option value="all">Semua</option><option value="warning">Warning</option><option value="not_verified">Not verified</option><option value="detected">Detected</option></select></label></div><div id="dqc-checks" class="dqc-checks" aria-live="polite"><p>Unggah data untuk memulai.</p></div></div>
  <div class="dqc-panel"><h3>Ringkasan interpretasi</h3><div id="dqc-summary" class="dqc-summary">Belum ada analisis.</div></div>
</div>

!!! warning "Batas interpretasi"
    **Detected bukan berarti nilai parameter sudah konvergen atau optimal.** Mesh cutoff, k-point, basis set, vacuum, dan toleransi gaya perlu diuji melalui studi sensitivitas/konvergensi yang terpisah. Pemeriksaan ini bukan sertifikasi kualitas perhitungan dan tidak menggantikan evaluasi ilmiah.

### Checklist studi konvergensi yang disarankan

1. Bandingkan beberapa nilai `MeshCutoff` sambil menjaga parameter lain tetap.
2. Uji kepadatan k-point dan basis (`PAO.BasisSize`, `PAO.EnergyShift`) sesuai sistem.
3. Untuk sistem slab, uji ketebalan slab, vacuum, dan pengaturan dipol bila relevan.
4. Periksa status SCF serta kesesuaian magnetisasi dan struktur akhir berdasarkan log asli.
5. Laporkan parameter input, versi perangkat lunak, pseudopotensial, kriteria konvergensi, dan hasil uji sensitivitas.
