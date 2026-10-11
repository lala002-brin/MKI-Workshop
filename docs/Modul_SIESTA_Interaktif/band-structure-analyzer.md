---
level: research_toolkit
---

# Band Structure & Band Gap Analyzer

Unggah file `SystemLabel.bands` dari SIESTA atau gunakan data contoh. Grafik dibuat di browser, tanpa mengunggah data ke server.

<div id="mki-band-tool" class="mki-band" data-ready="no">
  <div class="mb-panel">
    <h3>1. Data struktur pita</h3>
    <p class="mb-note">Mendukung <code>.bands</code> standar SIESTA dari <code>BandLines</code>, termasuk spin 1 atau 2. File <code>.EIG</code> dan <code>.bands.WFSX</code> tidak didukung.</p>
    <div class="mb-action"><label class="mb-file">Pilih file .bands <input id="mb-upload" type="file" accept=".bands,.txt,.dat,text/plain" /></label><button id="mb-demo" type="button">Muat data contoh</button><button id="mb-reset" type="button">Reset</button></div>
    <div id="mb-status" class="mb-status" role="status" aria-live="polite">Belum ada data. Klik “Muat data contoh” untuk menguji.</div>
  </div>

  <div class="mb-panel">
    <h3>2. Pengaturan grafik</h3>
    <div class="mb-grid">
      <label>Energi Fermi, E<sub>F</sub> (eV)<input id="mb-fermi" type="number" step="any" value="0" /></label>
      <label>Energi minimum (eV)<input id="mb-ymin" type="number" step="any" value="-5" /></label>
      <label>Energi maksimum (eV)<input id="mb-ymax" type="number" step="any" value="5" /></label>
    </div>
    <div class="mb-checks"><label><input type="checkbox" id="mb-shift" checked /> Tampilkan E − E<sub>F</sub></label><label><input type="checkbox" id="mb-spin1" checked /> Spin 1 / up</label><label><input type="checkbox" id="mb-spin2" checked /> Spin 2 / down</label><label><input type="checkbox" id="mb-markers" checked /> Titik simetri tinggi</label></div>
    <div class="mb-action"><button id="mb-render" type="button" class="mb-primary">Perbarui grafik</button><button id="mb-svg" type="button">Unduh SVG</button><button id="mb-csv" type="button">Unduh CSV</button></div>
  </div>

  <div class="mb-panel">
    <h3>3. Band structure</h3>
    <div class="mb-chart-scroll"><div id="mb-chart" class="mb-chart" aria-label="Grafik struktur pita"></div></div>
    <div id="mb-hover" class="mb-note" aria-live="polite">Arahkan kursor pada titik pita untuk melihat nilainya.</div>
  </div>

  <div class="mb-panel">
    <h3>4. Analisis band gap</h3>
    <div class="mb-grid mb-metrics"><div><span>VBM relatif terhadap E<sub>F</sub></span><strong id="mb-vbm">—</strong></div><div><span>CBM relatif terhadap E<sub>F</sub></span><strong id="mb-cbm">—</strong></div><div><span>Gap teramati</span><strong id="mb-gap">—</strong></div></div>
    <div id="mb-interpretation" class="mb-status">Belum ada data untuk dianalisis.</div>
    <p class="mb-note"><strong>Batas ilmiah:</strong> Nilai dihitung dari eigenvalue pada lintasan k yang diunggah, dengan asumsi keadaan terisi berada di bawah E<sub>F</sub> dan keadaan kosong di atasnya. Klasifikasi direct/indirect hanya relatif terhadap lintasan yang tersedia. Material logam atau sistem dengan E<sub>F</sub> di dalam celah karena numerik perlu diperiksa menggunakan okupansi, DOS, dan sampling k-point. Spin-polarized dianalisis per kanal dan secara gabungan.</p>
  </div>
</div>

<script defer src="assets/band-structure-analyzer.js"></script>
<link rel="stylesheet" href="assets/band-structure-analyzer.css">

## Dari mana file `.bands` berasal?

Tambahkan lintasan struktur pita yang sesuai dengan simetri kristal Anda pada input SIESTA, misalnya **hanya ilustrasi** berikut:

```fdf
%block BandLines
 1  0.0 0.0 0.0  \Gamma
 40 0.5 0.0 0.0  X
 40 0.5 0.5 0.0  M
 40 0.0 0.0 0.0  \Gamma
%endblock BandLines
```

Lintasan di atas **bukan** rekomendasi universal untuk Cu₂O, Fe₃O₄, ZIF-67 atau heterostruktur: tentukan terlebih dahulu Brillouin zone dan high-symmetry path yang benar. Hasil perhitungan berlabel `Cu2O` biasanya menghasilkan `Cu2O.bands`.

Referensi format: [Dokumentasi SIESTA, *Format of the .bands file*](https://siesta-docs-garalb-2de2b185929b5216c4be1ca85897318798b740c42833.gitlab.io/reference/siesta.html).
