---
level: research_toolkit
---

# DOS & PDOS Plotter

Analisis interaktif **Density of States (DOS)** dan **Projected Density of States (PDOS)** untuk hasil SIESTA. Data diproses **di browser**, tanpa diunggah ke server.

!!! info "Format data"
    - **CSV/TXT/DAT**: baris angka dengan kolom `Energy, Total, Cu_d, O_p, ...`; mendukung pemisah koma, tab, titik koma, dan spasi. Baris komentar yang diawali `#`, `!`, `%` dilewati.
    - **`.PDOS.xml` SIESTA**: membaca `<energy_values>`, `<nspin>`, serta `<orbital species="..." n="..." l="..." ...><data>...</data></orbital>`. Komponen orbital dijumlahkan menurut **unsur dan momentum sudut** (`s`, `p`, `d`, `f`) dengan opsi spin.
    - **`.EIG` SIESTA bukan file DOS langsung**. Konversi dahulu memakai `Eig2DOS` atau utilitas sejenis. Kolom numerik dari hasil konversi dapat dimuat di sini.

<div id="sie-dos-app" class="sie-dos-app">
  <section class="sie-panel">
    <h3>1. Muat data</h3>
    <div class="sie-controls">
      <label>File DOS / PDOS <input id="sie-file" type="file" accept=".csv,.txt,.dat,.dos,.xml,.pdos,text/plain,text/xml,application/xml"></label>
      <button id="sie-demo" type="button">Muat data contoh</button>
      <button id="sie-reset" type="button" class="sie-secondary">Reset</button>
    </div>
    <div id="sie-status" role="status" aria-live="polite">Belum ada data. Coba tombol “Muat data contoh”.</div>
  </section>
  <section class="sie-panel">
    <h3>2. Pengaturan grafik</h3>
    <div class="sie-controls">
      <label>Energi Fermi, E<sub>F</sub> (eV) <input id="sie-fermi" type="number" step="any" value="0"></label>
      <label><input id="sie-shift" type="checkbox" checked> Tampilkan E − E<sub>F</sub></label>
      <label><input id="sie-mirror" type="checkbox" checked> Mirror spin-down (jika tersedia)</label>
      <label>E minimum (eV) <input id="sie-emin" type="number" step="any" value="-8"></label>
      <label>E maksimum (eV) <input id="sie-emax" type="number" step="any" value="6"></label>
      <label>Label sumbu Y <input id="sie-ylabel" type="text" value="DOS (states/eV)"></label>
    </div>
    <p class="sie-hint">Perubahan nilai E<sub>F</sub> tidak mengubah hasil SCF, hanya menggeser sumbu energi. Nilai E<sub>F</sub> harus diambil dari output perhitungan yang sesuai.</p>
    <h4>Pilih kurva</h4>
    <div id="sie-curves" class="sie-curves">Belum ada kurva.</div>
  </section>
  <section class="sie-panel">
    <div class="sie-controls sie-toolbar">
      <h3 style="margin:0">3. Visualisasi</h3>
      <button id="sie-svg" type="button">Unduh SVG</button>
      <button id="sie-csv" type="button" class="sie-secondary">Unduh CSV</button>
    </div>
    <div id="sie-chart" class="sie-chart" role="img" aria-label="Grafik DOS dan PDOS"></div>
    <div id="sie-hover" class="sie-hint" aria-live="polite">Arahkan kursor ke kurva untuk melihat energi dan DOS.</div>
  </section>
  <section class="sie-panel">
    <h3>4. Interpretasi</h3>
    <p><strong>DOS</strong> menunjukkan distribusi keadaan elektronik. <strong>PDOS</strong> menampilkan kontribusi orbital dan unsur. Jangan menetapkan band gap hanya dari grafik DOS yang memiliki broadening; gunakan eigenvalue dan sampling k yang konvergen untuk mengonfirmasi VBM serta CBM.</p>
    <p>Untuk perhitungan spin-polarized, intensitas spin-down yang tampil negatif hanya merupakan <strong>konvensi visualisasi</strong>. DOS fisik tetap nonnegatif.</p>
    <p>Untuk `.PDOS.xml`, plotter ini menjumlahkan orbital dengan label unsur dan kanal `s/p/d/f`. Penjumlahan tersebut merupakan proyeksi basis, bukan ukuran muatan eksak dan tidak selalu sama dengan total DOS.</p>
  </section>
</div>

!!! warning "Sebelum digunakan dalam publikasi"
    Pastikan semua data memiliki satuan yang konsisten, energi referensi benar, normalisasi per spin/per atom jelas, broadening memadai, dan k-point DOS sudah konvergen. Parser XML ditujukan untuk struktur `.PDOS.xml` standar SIESTA. Jika versinya berbeda, periksa label dan format orbital sebelum menafsirkan grafik.
