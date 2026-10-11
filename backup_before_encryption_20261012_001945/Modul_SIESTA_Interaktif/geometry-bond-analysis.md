# Geometry & Bond Analysis Studio

Analisis geometri atomistik dari struktur **XYZ** dan **VASP POSCAR/CONTCAR** secara lokal di browser. Modul ini menghitung jarak antarat​​om, panjang ikatan menurut cutoff, sudut tiga atom, dan perubahan geometri antara dua struktur. Struktur periodik menggunakan *minimum-image convention* pada sel kisi jika tersedia. Data tidak diunggah ke server.

<div id="gba-app" class="gba-app">
  <div class="gba-hero"><span class="gba-kicker">MKI · Computational Materials Science</span><h2>Geometry & Bond Analysis Studio</h2><p>Structure inspection · Bond statistics · Angle measurement · Before/after comparison</p></div>
  <div class="gba-card gba-toolbar">
    <div class="gba-upload"><label for="gba-file">Struktur utama (.xyz / POSCAR)</label><input id="gba-file" type="file" accept=".xyz,.vasp,.poscar,.contcar,.txt"/></div>
    <div class="gba-upload"><label for="gba-compare">Struktur pembanding (opsional)</label><input id="gba-compare" type="file" accept=".xyz,.vasp,.poscar,.contcar,.txt"/></div>
    <button id="gba-demo" type="button" class="gba-button">Muat demo Fe–O sintetis</button>
  </div>
  <div id="gba-message" class="gba-message" role="status">Unggah struktur atau muat contoh sintetis untuk memulai.</div>
  <div class="gba-card gba-settings"><h3>Pengaturan analisis</h3><div class="gba-grid">
    <label>Cutoff ikatan (Å)<input id="gba-cutoff" type="number" min="0.1" max="10" step="0.1" value="2.5"></label>
    <label>Jarak minimum (Å)<input id="gba-min" type="number" min="0" max="5" step="0.1" value="0.4"></label>
    <label>Atom pusat (sudut)<select id="gba-center"><option value="">Pilih atom</option></select></label>
    <label>Atom pertama (sudut)<select id="gba-a"><option value="">Pilih atom</option></select></label>
    <label>Atom ketiga (sudut)<select id="gba-b"><option value="">Pilih atom</option></select></label>
  </div><div class="gba-actions"><button id="gba-calc-angle" class="gba-button gba-primary" type="button">Hitung sudut</button><span id="gba-angle-result" aria-live="polite"></span></div></div>
  <div class="gba-metrics" id="gba-metrics"></div>
  <div class="gba-columns"><section class="gba-card"><h3>Pratinjau struktur (proyeksi XY)</h3><svg id="gba-structure" viewBox="0 0 640 350" role="img" aria-label="Proyeksi XY struktur atom"></svg><p class="gba-note">Proyeksi 2D adalah panduan visual, bukan representasi 3D. Ikatan digambar dari cutoff dan minimum image bila periodik.</p></section><section class="gba-card"><h3>Distribusi panjang ikatan</h3><svg id="gba-hist" viewBox="0 0 640 350" role="img" aria-label="Histogram panjang ikatan"></svg><p class="gba-note">Histogram menghitung pasangan atom unik dalam sel, bukan koordinasi yang dihitung dengan seluruh citra periodik.</p></section></div>
  <section class="gba-card"><div class="gba-section-head"><h3>Bond list</h3><div class="gba-actions"><label class="gba-inline-label">Cari unsur / atom <input id="gba-filter" placeholder="contoh Fe–O, Fe, 3"/></label><button id="gba-export-bonds" class="gba-button" type="button">Ekspor CSV ikatan</button></div></div><div class="gba-scroll"><table class="gba-table"><thead><tr><th>Atom i</th><th>Atom j</th><th>Pasangan</th><th>Jarak (Å)</th><th>Periodik</th></tr></thead><tbody id="gba-bond-rows"><tr><td colspan="5">Belum ada data.</td></tr></tbody></table></div><p class="gba-note" id="gba-table-note"></p></section>
  <section class="gba-card"><h3>Statistik per pasangan unsur</h3><div class="gba-scroll"><table class="gba-table"><thead><tr><th>Pasangan</th><th>Jumlah ikatan</th><th>Rata-rata (Å)</th><th>Min (Å)</th><th>Maks (Å)</th></tr></thead><tbody id="gba-stats"><tr><td colspan="5">Belum ada data.</td></tr></tbody></table></div></section>
  <section class="gba-card"><h3>Perbandingan struktur awal vs akhir</h3><div id="gba-compare-results" class="gba-note">Unggah struktur pembanding dengan jumlah atom dan urutan spesies yang sama untuk menganalisis perubahan panjang ikatan dan perpindahan atom.</div><div class="gba-actions"><button class="gba-button" id="gba-export-report" type="button">Ekspor laporan JSON</button><button class="gba-button" id="gba-export-comparison" type="button">Ekspor perbandingan CSV</button></div></section>
  <details class="gba-card gba-help"><summary>Catatan ilmiah dan keterbatasan</summary><p>XYZ standar tidak membawa sel kisi sehingga dianalisis sebagai struktur nonperiodik. POSCAR membawa vektor kisi dan dihitung dengan kondisi batas periodik. Perbandingan memerlukan urutan atom yang sama; rotasi/translasi keseluruhan belum disejajarkan otomatis. Cutoff hanya definisi kedekatan geometris, bukan bukti ikatan kimia. Minimum image berlaku untuk pencarian pasangan atom terdekat; untuk sistem sangat kecil atau sel miring ekstrem diperlukan pemeriksaan lanjutan. Jangan gunakan contoh sintetis sebagai hasil eksperimen atau DFT.</p></details>
</div>
