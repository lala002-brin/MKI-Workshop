---
level: research_toolkit
---

# Multi-Run DFT Comparison Studio

Bandingkan beberapa hasil **SIESTA** tanpa mengunggah data ke server. Analisis ini bersifat diagnostik; selisih energi total hanya bermakna untuk sistem dan pengaturan yang sebanding.

<div id="mrd-root" class="mrd-root">
  <div class="mrd-hero"><div class="mrd-eyebrow">MKI Workshop · Research Utilities</div><h2>Multi-Run DFT Comparison Studio</h2><p>SCF curves · final energies · input audit · comparison safety</p></div>
  <div class="mrd-panel"><label class="mrd-upload">Unggah beberapa file <code>.out</code>, <code>.fdf</code>, atau <code>.csv</code> (maksimal 12)<input id="mrd-files" type="file" accept=".out,.fdf,.csv,.txt" multiple></label><div class="mrd-actions"><button id="mrd-demo" type="button">Muat demo sintetis</button><button id="mrd-clear" type="button" class="mrd-secondary">Hapus semua</button><button id="mrd-csv" type="button" class="mrd-secondary">Ekspor CSV</button><button id="mrd-json" type="button" class="mrd-secondary">Ekspor JSON</button><button id="mrd-svg" type="button" class="mrd-secondary">Ekspor grafik SVG</button></div><p id="mrd-message" role="status">Belum ada data. Unggah file atau muat demonstrasi.</p></div>
  <div class="mrd-grid"><div class="mrd-panel"><h3>Konfigurasi perbandingan</h3><label>Kurva <select id="mrd-mode"><option value="relative">Energi relatif terhadap iterasi terakhir (meV)</option><option value="absolute">Energi absolut (eV)</option><option value="delta">|ΔE| antar iterasi (eV)</option></select></label><label>Zoom <select id="mrd-zoom"><option value="0">Semua iterasi</option><option value="10">10 terakhir</option><option value="20">20 terakhir</option><option value="40">40 terakhir</option></select></label><label><input id="mrd-show-points" type="checkbox"> Tampilkan titik data</label></div><div class="mrd-panel"><h3>Interpretasi</h3><p>Untuk membandingkan energi total antar-run, pastikan komposisi, jumlah atom, muatan, metode XC, basis, dan parameter numerik sesuai. Grafik SCF di sini menampilkan <strong>siklus terakhir</strong> yang terdeteksi; bukan gabungan langkah geometri.</p><p><strong>Catatan:</strong> pembacaan energi dilakukan secara konservatif. Jika log tidak memiliki kolom energi SCF yang dikenali, grafik tidak dibuat-buat.</p></div></div>
  <div class="mrd-panel"><h3>Riwayat SCF</h3><div class="mrd-graph-wrap"><svg id="mrd-chart" viewBox="0 0 900 400" role="img" aria-label="Grafik perbandingan SCF"><text x="25" y="35">Belum ada data untuk diplot</text></svg></div><div id="mrd-legend" class="mrd-legend"></div></div>
  <div class="mrd-panel"><h3>Ringkasan run</h3><div class="mrd-table-wrap"><table><thead><tr><th>Run</th><th>Jenis</th><th>Siklus</th><th>Iterasi terakhir</th><th>Energi akhir (eV)</th><th>ΔE terakhir (eV)</th><th>SCF status</th></tr></thead><tbody id="mrd-summary"></tbody></table></div></div>
  <div class="mrd-panel"><h3>Audit keterbandingan</h3><div id="mrd-audit" class="mrd-audit">Tambahkan minimal dua run untuk audit.</div></div>
  <div class="mrd-panel"><h3>Parameter yang terdeteksi</h3><div class="mrd-table-wrap"><table><thead><tr><th>Run</th><th>Jumlah atom</th><th>XC</th><th>MeshCutoff</th><th>Basis</th><th>Spin</th><th>K-points</th></tr></thead><tbody id="mrd-params"></tbody></table></div><p class="mrd-note">Jika parameter tidak terdeteksi, ditampilkan “—”; tidak otomatis berarti parameter tidak digunakan. File <code>.fdf</code> bisa melengkapi output <code>.out</code> dengan nama dasar yang sama.</p></div>
</div>

!!! warning "Batasan ilmiah"
    Output non-spin dan spin-polarized, geometri/komposisi berbeda, serta parameter numerik tidak sebanding tidak boleh dinilai hanya berdasarkan selisih total energi. Untuk uji konvergensi cutoff atau k-point, jalankan rangkaian perhitungan yang terkontrol.
