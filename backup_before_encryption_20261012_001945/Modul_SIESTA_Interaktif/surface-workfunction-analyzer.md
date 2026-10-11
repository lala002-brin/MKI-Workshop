# Surface & Work Function Analyzer

Analisis potensial elektrostatik rata-rata bidang (*planar-averaged potential*) pada slab, daerah vakum, dan work function secara interaktif. **Semua perhitungan dijalankan di browser**, tanpa mengirimkan file ke server.

!!! info "Data masukan dan interpretasi"
    Unggah data teks numerik dua kolom `z (Å), V(z) (eV)` yang telah diekstrak/dikonversi dari SIESTA. File output mentah SIESTA seperti `.VH`, `.VT`, `.RHO`, `.cube`, atau `.nc` **tidak dibaca langsung** oleh alat ini. Gunakan utilitas pascaproses sesuai versi SIESTA untuk menghasilkan potensial rata-rata bidang. Perhatikan bahwa referensi potensial dan energi Fermi harus konsisten. Data demo bukan hasil perhitungan DFT.

<div id="swf-studio" class="swf-studio">
  <section class="swf-panel">
    <div class="swf-heading"><div><span class="swf-eyebrow">01 · DATA</span><h2>Impor potensial slab</h2></div><span class="swf-chip">Browser-only</span></div>
    <div class="swf-upload"><label for="swf-file">File data `.csv`, `.txt`, `.dat`</label><input id="swf-file" type="file" accept=".csv,.txt,.dat,text/plain,text/csv" /><div class="swf-buttonrow"><button id="swf-demo" class="swf-primary" type="button">Muat contoh slab</button><button id="swf-reset" type="button">Reset</button></div></div>
    <p id="swf-status" class="swf-status" role="status" aria-live="polite">Belum ada data. Muat contoh atau pilih file lokal.</p>
  </section>

  <section class="swf-panel">
    <div class="swf-heading"><div><span class="swf-eyebrow">02 · PENGATURAN</span><h2>Energi dan daerah vakum</h2></div></div>
    <div class="swf-fields">
      <label>Energi Fermi, E<sub>F</sub> (eV)<input id="swf-fermi" type="number" step="any" value="-4.6" /></label>
      <label>z vakum mulai (Å)<input id="swf-zmin" type="number" step="any" value="24" /></label>
      <label>z vakum akhir (Å)<input id="swf-zmax" type="number" step="any" value="29" /></label>
      <label>Batas variasi potensial (eV)<input id="swf-tolerance" type="number" step="0.001" min="0" value="0.12" /></label>
      <label>Lebar smoothing (titik)<input id="swf-smooth" type="number" min="1" max="101" step="2" value="1" /></label>
      <label>Presisi hasil (desimal)<select id="swf-precision"><option value="2">2</option><option value="3" selected>3</option><option value="4">4</option></select></label>
    </div>
    <p class="swf-hint">Pilih daerah vakum yang benar-benar datar dan jauh dari slab. Rata-rata potensial pada interval tersebut dipakai sebagai V<sub>vac</sub>. Rentang (maks − min) digunakan sebagai indikator kestabilan plateau, bukan ketidakpastian statistik.</p>
  </section>

  <section class="swf-panel">
    <div class="swf-heading"><div><span class="swf-eyebrow">03 · VISUALISASI</span><h2>Atur tampilan grafik</h2></div></div>
    <div class="swf-fields">
      <label>Gaya grafik<select id="swf-style"><option value="paper">Paper Classic</option><option value="modern">Modern Journal</option><option value="dark">Dark Research</option><option value="minimal">Minimal Mono</option></select></label>
      <label>Warna kurva<input id="swf-color" type="color" value="#d32f2f" /></label>
      <label>Ketebalan garis<input id="swf-width" type="range" min="1" max="5" step="0.5" value="2.5" /></label>
      <label>Lebar grafik<select id="swf-aspect"><option value="wide">Lebar (16:9)</option><option value="paper" selected>Paper (4:3)</option><option value="square">Persegi (1:1)</option></select></label>
    </div>
    <div class="swf-checks"><label><input id="swf-show-region" type="checkbox" checked /> Tandai vakum</label><label><input id="swf-show-fermi" type="checkbox" checked /> Garis E<sub>F</sub></label><label><input id="swf-show-vac" type="checkbox" checked /> Garis V<sub>vac</sub></label><label><input id="swf-show-grid" type="checkbox" checked /> Grid</label><label><input id="swf-relative" type="checkbox" /> Sumbu energi relatif E<sub>F</sub></label></div>
    <div class="swf-buttonrow swf-actions"><button id="swf-plot" class="swf-primary" type="button">Perbarui grafik</button><button id="swf-svg" type="button" disabled>Unduh SVG</button><button id="swf-csv" type="button" disabled>Unduh CSV</button></div>
    <div class="swf-chartframe"><div id="swf-chart" class="swf-chart" role="img" aria-label="Grafik potensial elektrostatik terhadap koordinat z"><div class="swf-placeholder">Grafik muncul setelah data dimuat.</div></div></div>
    <p id="swf-hover" class="swf-hint" aria-live="polite">Arahkan kursor ke grafik untuk melihat nilai.</p>
  </section>

  <section class="swf-panel">
    <div class="swf-heading"><div><span class="swf-eyebrow">04 · HASIL</span><h2>Analisis work function</h2></div></div>
    <div class="swf-metrics"><div><span>Level vakum, V<sub>vac</sub></span><strong id="swf-vac-value">—</strong></div><div><span>Energi Fermi, E<sub>F</sub></span><strong id="swf-fermi-value">—</strong></div><div><span>Work function, Φ</span><strong id="swf-phi-value">—</strong></div><div><span>Variasi plateau</span><strong id="swf-span-value">—</strong></div></div>
    <p id="swf-quality" class="swf-note" role="status">Belum ada analisis.</p>
    <details class="swf-details"><summary>Rumus dan catatan interpretasi</summary><p>Φ = V<sub>vac</sub> − E<sub>F</sub>, dalam eV, dengan kedua energi merujuk ke nol potensial yang sama. Untuk slab asimetris atau memiliki dipol, dua sisi dapat memiliki level vakum berbeda. Ukur masing-masing sisi secara terpisah dan pastikan koreksi dipol, ketebalan vakum, serta konvergensi slab memadai. Nilai Φ negatif atau plateau yang belum datar perlu pemeriksaan kembali.</p></details>
  </section>
</div>

## Format data yang diterima

Gunakan dua kolom numerik `z_A, potential_eV`, dengan header opsional. Separator koma, titik koma, tab, atau spasi didukung. Contoh:

```csv
z_A,potential_eV
0.0,-1.2
0.5,-1.4
1.0,-1.1
```

Jika file memiliki kolom tambahan, **dua kolom numerik pertama** akan digunakan. Baris komentar `#`, `!`, dan `%` diabaikan. Potensial pada file harus sudah bersatuan **eV**; bila output berasal dari satuan lain, konversikan terlebih dahulu. Tidak semua nilai yang diberi nama *electrostatic potential* menggunakan konvensi referensi/energi yang sama.

## Bagaimana memperoleh data dari SIESTA?

1. Selesaikan perhitungan slab dengan vakum cukup, SCF konvergen, dan simpan potensial yang dibutuhkan sesuai versi SIESTA.
2. Gunakan utilitas pascaproses SIESTA (misalnya keluarga `Macroave`/`macroave` jika tersedia pada instalasi) untuk mendapatkan profil potensial sepanjang arah tegak lurus permukaan, lalu pastikan apakah hasilnya *planar average* atau *macroscopic average*.
3. Ekspor profil sebagai tabel `z (Å), V(z) (eV)`, dengan nol energi konsisten terhadap E<sub>F</sub> yang dibaca dari hasil SIESTA.
4. Unggah ke halaman ini dan pilih plateau vakum yang benar. Untuk dua permukaan berbeda, ulangi pengukuran di masing-masing sisi.

!!! warning "Untuk laporan dan publikasi"
    Plotter ini menghitung rata-rata potensial pada interval yang Anda pilih. Ia **tidak** mendeteksi plateau fisik secara otomatis, tidak melakukan koreksi dipol, dan tidak membuktikan konvergensi slab. Gunakan data ilustrasi hanya untuk latihan; gunakan data perhitungan asli untuk publikasi.
