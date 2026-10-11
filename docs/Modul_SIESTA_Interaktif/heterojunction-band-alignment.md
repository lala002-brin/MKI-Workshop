---
level: research_toolkit
---

# Heterojunction Band Alignment Studio

Analisis diagram pita elektronik berbasis **energi terhadap level vakum**. Untuk Cu₂O, ZIF-67, dan Fe₃O₄, masukkan VBM/CBM jika memiliki gap terdefinisi, atau gunakan level Fermi dan work function untuk material yang bersifat metalik. **Contoh bawaan adalah ilustrasi, bukan hasil SIESTA.**

<div id="hba-studio" class="hba-root">
  <div class="hba-top"><div><span class="hba-kicker">MKI WORKSHOP · DFT ANALYSIS TOOLKIT</span><h2>Heterojunction Band Alignment Studio</h2><p>Diagram tingkat energi, band offset, dan perbandingan sebelum/sesudah kontak.</p></div><span class="hba-chip">Client-side · tanpa unggah server</span></div>
  <div class="hba-toolbar"><button type="button" id="hba-demo" class="hba-primary">Muat data contoh</button><label class="hba-upload">Impor CSV <input id="hba-upload" type="file" accept=".csv,.txt,.dat,text/csv"></label><button type="button" id="hba-csv">Ekspor CSV</button><button type="button" id="hba-svg">Ekspor SVG</button><button type="button" id="hba-reset">Reset</button></div>
  <div id="hba-message" class="hba-message" role="status" aria-live="polite">Muat data contoh atau masukkan parameter material.</div>
  <section class="hba-card"><div class="hba-section"><h3>1 · Data material</h3><p>Energi dalam eV relatif terhadap vakum (vakum = 0 eV). Gunakan tanda negatif untuk energi elektronik di bawah vakum.</p></div><div class="hba-table-scroll"><table class="hba-table"><thead><tr><th>Material</th><th>VBM (eV)</th><th>CBM (eV)</th><th>E<sub>F</sub> (eV)</th><th>Φ (eV)</th><th>Geser kontak (eV)</th><th>Warna</th><th></th></tr></thead><tbody id="hba-rows"></tbody></table></div><div class="hba-actions"><button type="button" id="hba-add">+ Material</button><p>Biarkan VBM/CBM kosong untuk metal; E<sub>F</sub> boleh diisi sebagai referensi. Φ = −E<sub>F</sub> hanya jika semua energi direferensikan ke vakum yang sama.</p></div></section>
  <section class="hba-card"><div class="hba-section"><h3>2 · Pengaturan visualisasi</h3><p>Gaya diagram dapat diubah tanpa mengubah data fisik.</p></div><div class="hba-config"><label>Mode tampilan<select id="hba-mode"><option value="isolated">Sebelum kontak · vacuum alignment</option><option value="contact">Sesudah kontak · ilustrasi rigid shift</option><option value="side">Perbandingan sebelum / sesudah</option></select></label><label>Gaya grafik<select id="hba-style"><option value="paper">Paper Classic</option><option value="modern">Modern Journal</option><option value="dark">Dark Research</option><option value="mono">Minimal Monochrome</option></select></label><label>Energi minimum (eV)<input id="hba-min" type="number" step="0.2" value="-8"></label><label>Energi maksimum (eV)<input id="hba-max" type="number" step="0.2" value="1"></label><label>Tipe anotasi<select id="hba-annotation"><option value="edges">VBM / CBM / Fermi</option><option value="edgesgap">VBM / CBM / gap</option><option value="minimal">Minimal</option></select></label><label>Judul grafik<input id="hba-title" type="text" value="Band alignment (illustrative)"></label></div><div class="hba-checks"><label><input id="hba-show-vac" type="checkbox" checked> Garis vakum 0 eV</label><label><input id="hba-grid" type="checkbox" checked> Grid energi</label><label><input id="hba-labels" type="checkbox" checked> Label nilai energi</label></div><div class="hba-actions"><button type="button" class="hba-primary" id="hba-update">Perbarui diagram</button></div></section>
  <section class="hba-card"><div class="hba-section"><h3>3 · Diagram band alignment</h3><p>Garis level VBM/CBM dan E<sub>F</sub>; blok berwarna mewakili gap. Diagram rigid-shift bukan hasil prediksi redistribusi muatan.</p></div><div id="hba-plot" class="hba-plot" role="img" aria-label="Diagram band alignment"></div><div id="hba-metrics" class="hba-metrics"></div></section>
  <section class="hba-card"><div class="hba-section"><h3>4 · Interpretasi dan batasan ilmiah</h3></div><div id="hba-interpret" class="hba-explain"></div><div class="hba-note"><strong>Perhatian:</strong> Type-I/II/III dapat ditinjau berdasarkan tepi pita dua semikonduktor pada acuan energi yang konsisten. Tidak cukup menggunakan alignment sebelum kontak untuk mengklaim Z-scheme, S-scheme, arah transfer muatan, atau band bending. Untuk sistem magnetik, analisis spin-resolved mungkin diperlukan. Perbandingan sesudah kontak di halaman ini hanya menggeser level secara rigid mengikuti angka masukan.</div></section>
</div>

## Format impor CSV

Kolom wajib: `name`. Kolom opsional: `vbm`, `cbm`, `ef`, `phi`, `shift`, `color`. Nilai `vbm`, `cbm`, dan `ef` adalah energi dalam eV relatif terhadap vakum. Biarkan kosong bila tidak diketahui. `shift` hanya untuk **ilustrasi** perubahan tingkat energi setelah kontak.

```csv
name,vbm,cbm,ef,phi,shift,color
Cu2O,-5.3,-3.3,-4.2,4.2,-0.25,#e67e22
ZIF-67,-6.1,-2.8,-4.5,4.5,0.10,#2c82c9
Fe3O4,,,-4.7,4.7,0.05,#7e57c2
```

## Cara memperoleh data dari SIESTA

- **Work function:** dari profil potensial elektrostatik rata-rata bidang pada slab dengan plateau vakum yang teridentifikasi, dikurangi E<sub>F</sub> pada acuan energi yang sama.
- **VBM/CBM:** dari hasil struktur elektronik yang cukup tersampling, dikaitkan ke **level vakum** melalui referensi potensial yang konsisten; energi terhadap Fermi saja belum cukup.
- **Setelah kontak:** gunakan perhitungan antarmuka self-consistent untuk mendiskusikan transfer muatan dan perubahan potensial. Nilai `shift` di atas hanya membuat skema ilustrasi.
- **Surface dipole, terminasi, adsorbat, SOC, spin, dan metode XC** dapat mengubah hasil alignment. Jangan menganggap nilai contoh sebagai prediksi Fe₃O₄/ZIF-67/Cu₂O.

<link rel="stylesheet" href="../assets/heterojunction-band-alignment.css">
<script defer src="../assets/heterojunction-band-alignment.js"></script>
