# SIESTA Geometry Optimization Analyzer

Analisis perubahan energi dan gaya maksimum sepanjang **langkah optimasi geometri** SIESTA. Semua data diproses secara lokal di browser. **Data demo bersifat sintetis**, bukan hasil perhitungan DFT.

<div id="goa-app" class="goa-app">
  <div class="goa-hero"><div><span class="goa-eyebrow">MKI WORKSHOP · DFT ANALYSIS TOOLKIT</span><h2>Geometry Optimization Analyzer</h2><p>Energy · Maximum force · Convergence diagnostics</p></div><span class="goa-tag">SIESTA · Research tools</span></div>
  <section class="goa-card"><h3>1. Muat data optimasi</h3><p>Unggah CSV berformat <code>step,energy_eV,max_force_eV_A</code> atau log <code>.out</code>. Parser log hanya menerima pola langkah geometri yang dikenali secara eksplisit; iterasi SCF tidak dianggap langkah geometri.</p><div class="goa-toolbar"><label class="goa-upload">Pilih CSV / .out <input type="file" id="goa-file" accept=".csv,.txt,.dat,.out"></label><button type="button" id="goa-demo" class="goa-primary">Muat data sintetis</button><button type="button" id="goa-template">Unduh template CSV</button><button type="button" id="goa-reset">Reset</button></div><div id="goa-notice" role="status" aria-live="polite" class="goa-notice">Belum ada data. Klik “Muat data sintetis” untuk menguji grafik.</div><div id="goa-source" class="goa-source">Sumber: belum ada</div></section>
  <section class="goa-card"><h3>2. Ringkasan hasil</h3><div class="goa-metrics"><div><small>Langkah geometri</small><strong id="goa-steps">—</strong></div><div><small>Energi terakhir (eV)</small><strong id="goa-lastE">—</strong></div><div><small>ΔE terakhir (eV)</small><strong id="goa-dE">—</strong></div><div><small>Gaya maksimum (eV/Å)</small><strong id="goa-force">—</strong></div></div></section>
  <section class="goa-card"><h3>3. Pengaturan grafik</h3><div class="goa-controls"><label>Jenis grafik<select id="goa-mode"><option value="combined">Energi + gaya maksimum</option><option value="energy">Energi total</option><option value="delta">Perubahan energi ΔE</option><option value="force">Gaya maksimum</option></select></label><label>Gaya publikasi<select id="goa-theme"><option value="paper">Paper Classic</option><option value="modern">Modern Journal</option><option value="dark">Dark Research</option><option value="mono">Monochrome</option></select></label><label>Gaya garis<select id="goa-line"><option value="both">Garis dan titik</option><option value="line">Garis</option><option value="points">Titik</option></select></label><label>Ambang |ΔE| (eV)<input id="goa-etol" type="number" min="0" step="any" value="0.0001"></label><label>Ambang gaya (eV/Å)<input id="goa-ftol" type="number" min="0" step="any" value="0.04"></label><label>Judul grafik<input id="goa-title" type="text" value="SIESTA Geometry Optimization"></label></div><div class="goa-checks"><label><input id="goa-showpoints" type="checkbox" checked> Label titik terakhir</label><label><input id="goa-showgrid" type="checkbox" checked> Grid</label><label><input id="goa-showthreshold" type="checkbox" checked> Garis ambang gaya</label></div></section>
  <section class="goa-card"><div class="goa-heading"><h3>4. Grafik optimasi</h3><div class="goa-toolbar"><button type="button" id="goa-export-svg">Unduh SVG</button><button type="button" id="goa-export-csv">Unduh CSV</button><button type="button" id="goa-export-json">Unduh laporan JSON</button></div></div><div id="goa-plot" class="goa-plot" aria-label="Grafik energi dan gaya optimasi"><div class="goa-empty">Belum ada data untuk diplot.</div></div><p class="goa-small">ΔE adalah selisih energi antar langkah geometri yang tersedia, bukan perubahan antar iterasi SCF.</p></section>
  <section class="goa-card"><h3>5. Diagnostik konvergensi</h3><div id="goa-diagnostics" class="goa-diagnostics"></div><div class="goa-warning"><strong>Catatan ilmiah:</strong> Memenuhi dua ambang yang dipilih tidak serta-merta membuktikan optimasi SIESTA dinyatakan selesai. Periksa log lengkap, tegangan (jika relevan), gaya residual, dan kriteria <code>MD.MaxForceTol</code> atau pengaturan optimasi yang digunakan.</div></section>
  <section class="goa-card"><h3>6. Tabel langkah geometri</h3><div class="goa-table-wrap"><table class="goa-table"><thead><tr><th>Step</th><th>Energi (eV)</th><th>ΔE (eV)</th><th>Max Force (eV/Å)</th><th>Provenance</th></tr></thead><tbody id="goa-table-body"></tbody></table></div></section>
</div>

## Format data CSV

Header minimal: `step,energy_eV`. Kolom `max_force_eV_A` disarankan untuk analisis gaya. Langkah harus naik tanpa duplikasi.

```csv
step,energy_eV,max_force_eV_A
1,-1200.34,0.82
2,-1201.10,0.51
3,-1201.42,0.24
```

## Sumber dan keterbatasan

- **SYNTHETIC:** data contoh yang dihasilkan aplikasi; tidak boleh digunakan sebagai hasil penelitian.
- **IMPORTED CSV:** data dari berkas pengguna, perlu diverifikasi asal dan satuannya.
- **SIESTA LOG:** ekstraksi heuristik dari `.out` dengan penanda langkah geometri yang dikenali; cocokkan hasil dengan log asli.

Penggunaan alat ini tidak menggantikan verifikasi konvergensi elektronik (SCF), geometri, basis, pseudopotensial, dan parameter k-point.
