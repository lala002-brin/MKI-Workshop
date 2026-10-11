# Kalkulator Konvergensi K-Point SIESTA

Gunakan kalkulator ini setelah menjalankan beberapa **single-point SCF** pada struktur, pseudopotential, functional, basis, MeshCutoff, dan pengaturan spin yang sama. Masukkan **energi total dengan satuan eV**, bukan energi per atom. Kalkulator menghitung selisih terhadap grid paling rapat yang Anda masukkan.

!!! warning "Hasil adalah kandidat, bukan bukti konvergensi mutlak"
    Grid referensi harus cukup rapat. Pastikan semua SCF konvergen, gunakan offset Monkhorst-Pack yang konsisten, dan cek gaya serta properti elektronik penting. Untuk sel nonkubik, gunakan grid `Nx Ny Nz` yang sesuai arah kisi.

<div id="kpoint-calculator" class="kp-wrap">
  <div class="kp-header"><strong>Input perhitungan</strong><span class="kp-pill">SIESTA · Bulk / Slab</span></div>
  <div class="kp-controls">
    <label>Jumlah atom <input id="kp-atoms" type="number" min="1" step="1" value="6"></label>
    <label>Toleransi (meV/atom) <input id="kp-tol" type="number" min="0.001" step="0.1" value="1"></label>
    <label>Nama material <input id="kp-material" type="text" value="Cu2O" placeholder="mis. Cu2O"></label>
  </div>
  <p class="kp-help">Isi energi dari output <code>siesta: E_KS</code> secara konsisten. Nilai contoh di bawah adalah <strong>ilustrasi</strong>, bukan hasil DFT aktual.</p>
  <div class="kp-scroll"><table class="kp-table"><thead><tr><th>Grid Nx</th><th>Ny</th><th>Nz</th><th>Energi total (eV)</th><th>ΔE (meV/atom)</th><th></th></tr></thead><tbody id="kp-rows"></tbody></table></div>
  <div class="kp-actions"><button type="button" id="kp-add">+ Tambah baris</button><button type="button" id="kp-calc" class="kp-primary">Hitung konvergensi</button><button type="button" id="kp-reset">Reset contoh</button><button type="button" id="kp-export">Unduh CSV</button></div>
  <div id="kp-result" class="kp-result" role="status" aria-live="polite">Klik <strong>Hitung konvergensi</strong> setelah mengisi data.</div>
  <div class="kp-chartbox"><svg id="kp-chart" viewBox="0 0 720 280" role="img" aria-label="Grafik selisih energi terhadap urutan grid k-point"></svg></div>
  <p class="kp-foot">Kriteria kandidat: pilih grid terkecil yang memenuhi toleransi terhadap referensi dan seluruh grid lebih rapat yang telah diuji juga memenuhi toleransi. Perbandingan hanya masuk akal jika seri grid tersusun dari kasar ke rapat.</p>
</div>

## Cara mengambil energi dari output SIESTA

```bash
for k in 2 4 6 8 10 12; do
  echo "Grid $k x $k x $k"
  grep 'siesta: E_KS' "k_${k}/run.out" | tail -1
done
```

Gunakan nilai energi yang sama untuk setiap pengujian. Jika label energi berbeda pada versi SIESTA Anda, periksa output terlebih dahulu. **Jangan membandingkan energi total dari sel dengan jumlah atom berbeda.**

## Interpretasi

- **ΔE kecil** menunjukkan energi relatif stabil terhadap grid referensi.
- **Rekomendasi** hanya berlaku untuk struktur dan pengaturan komputasi yang diuji.
- **DOS/PDOS** dapat memerlukan grid lebih rapat daripada optimasi geometri.
- **Band structure** menggunakan lintasan titik simetri tinggi selain grid SCF.

<link rel="stylesheet" href="assets/kpoint-calculator.css">
<script defer src="assets/kpoint-calculator.js"></script>
