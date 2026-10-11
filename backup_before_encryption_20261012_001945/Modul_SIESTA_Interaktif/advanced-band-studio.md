# Advanced Band Structure Studio

Visualisasikan satu atau dua file `SystemLabel.bands` dari SIESTA. Pilih gaya **Paper Classic**, **Modern**, **Rainbow**, atau **Spin**, dan ekspor grafik SVG serta data CSV. Data diproses **di browser**, tanpa upload ke server.

!!! info "Penting untuk analisis ilmiah"
    Warna *Rainbow* adalah warna dekoratif per pita, **bukan proyeksi orbital**. Mode perbandingan hanya menghitung RMSE ketika kedua file mempunyai k-path, jumlah pita, dan kanal spin yang cocok. File `.bands` tidak menyimpan bobot orbital; *fat band* memerlukan file/proyeksi tambahan.

<div id="mki-advanced-band" class="abs-app">
  <section class="abs-panel">
    <h2>1. Sumber data</h2>
    <div class="abs-grid abs-two">
      <label>Data A · file `.bands` <input type="file" id="abs-file-a" accept=".bands,.txt,.dat"></label>
      <label>Data B · untuk perbandingan <input type="file" id="abs-file-b" accept=".bands,.txt,.dat"></label>
    </div>
    <div class="abs-grid abs-two">
      <label>Nama data A <input id="abs-name-a" value="Perhitungan A" type="text"></label>
      <label>Nama data B <input id="abs-name-b" value="Perhitungan B" type="text"></label>
    </div>
    <div class="abs-actions"><button id="abs-demo" class="abs-primary" type="button">Muat contoh kompleks</button><button id="abs-demo-compare" type="button">Muat contoh perbandingan</button><button id="abs-reset" type="button">Reset</button></div>
    <p id="abs-status" class="abs-status" role="status">Belum ada data. Pilih file atau muat data contoh.</p>
  </section>
  <section class="abs-panel">
    <h2>2. Pilih gaya visualisasi</h2>
    <div class="abs-grid abs-three">
      <label>Gaya grafik<select id="abs-style"><option value="paper">Paper Classic</option><option value="modern">Modern Journal</option><option value="rainbow">Rainbow per pita</option><option value="spin">Spin Up / Down</option></select></label>
      <label>Mode data<select id="abs-mode"><option value="single">Satu perhitungan</option><option value="compare">Overlay A + B</option></select></label>
      <label>Ketebalan pita <input id="abs-width" type="range" min="0.6" max="3.5" step="0.1" value="1.6"><output id="abs-width-out">1.6 px</output></label>
    </div>
    <div class="abs-grid abs-four">
      <label>Warna A <input id="abs-color-a" type="color" value="#d7191c"></label>
      <label>Warna B <input id="abs-color-b" type="color" value="#237a37"></label>
      <label>E minimum (eV)<input id="abs-ymin" type="number" step="any" value="-8"></label>
      <label>E maksimum (eV)<input id="abs-ymax" type="number" step="any" value="8"></label>
    </div>
    <div class="abs-grid abs-three">
      <label>Energi referensi A (eV)<input id="abs-fermi-a" type="number" step="any" value="0"></label>
      <label>Energi referensi B (eV)<input id="abs-fermi-b" type="number" step="any" value="0"></label>
      <label>Format garis vertikal<select id="abs-vertical"><option value="dotted">Titik-titik</option><option value="dashed">Putus-putus</option><option value="solid">Solid</option><option value="none">Tidak tampil</option></select></label>
    </div>
    <div class="abs-options">
      <label><input id="abs-shift" type="checkbox" checked> Energi relatif terhadap referensi</label>
      <label><input id="abs-grid" type="checkbox"> Grid horizontal</label>
      <label><input id="abs-zeroline" type="checkbox" checked> Garis referensi energi</label>
      <label><input id="abs-labels" type="checkbox" checked> Label titik simetri</label>
      <label><input id="abs-legend" type="checkbox" checked> Legend</label>
      <label><input id="abs-spin-up" type="checkbox" checked> Spin 1</label>
      <label><input id="abs-spin-down" type="checkbox" checked> Spin 2</label>
      <label><input id="abs-rmse" type="checkbox" checked> Tampilkan RMSE jika valid</label>
    </div>
    <p class="abs-hint">Untuk perbandingan energi, pastikan kedua hasil menggunakan acuan yang sebanding. Nilai referensi diambil dari header `.bands` saat file dimuat dan dapat diubah manual.</p>
  </section>
  <section class="abs-panel">
    <div class="abs-bar"><h2>3. Grafik band structure</h2><div class="abs-actions"><button id="abs-save-svg" type="button">Unduh SVG</button><button id="abs-save-csv" type="button">Unduh CSV</button></div></div>
    <div id="abs-graph" class="abs-graph" aria-live="polite"><p>Grafik muncul setelah data dimuat.</p></div>
    <p id="abs-cursor" class="abs-hint">Arahkan kursor ke grafik untuk melihat koordinat.</p>
  </section>
  <section class="abs-panel">
    <h2>4. Ringkasan dan validasi</h2>
    <div class="abs-metrics"><div><span>Data A</span><strong id="abs-info-a">—</strong></div><div><span>Data B</span><strong id="abs-info-b">—</strong></div><div><span>RMSE overlay</span><strong id="abs-info-rmse">—</strong></div></div>
    <p id="abs-diagnostics" class="abs-status">Pilih data untuk memulai.</p>
  </section>
</div>

<link rel="stylesheet" href="../assets/advanced-band-studio.css">
<script defer src="../assets/advanced-band-studio.js"></script>

## Dari mana file `.bands`?

File `SystemLabel.bands` dihasilkan dari perhitungan *BandLines* SIESTA setelah sistem memiliki hasil SCF yang memadai. Data eigenvalue sepanjang lintasan k inilah yang divisualisasikan. Dua file yang dibandingkan perlu menggunakan lintasan, sampling, indeks pita, spin, serta acuan energi yang konsisten agar RMSE bermakna. Hasil visualisasi tidak dengan sendirinya memvalidasi tingkat teori, spin-orbit coupling, atau band gap.
