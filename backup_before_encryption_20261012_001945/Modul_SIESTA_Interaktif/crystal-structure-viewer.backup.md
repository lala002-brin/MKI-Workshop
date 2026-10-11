# Interactive Crystal Structure Viewer

Putar struktur atom secara 3D, unggah file **`.cif` / `.xyz`**, pilih model visualisasi, dan ukur jarak antara dua atom. Semua pemrosesan file dilakukan di browser; file tidak dikirim ke server oleh halaman ini.

!!! info "Keterangan data"
    Contoh **Cu₂O cuprite ideal** memuat sel konvensional 6 atom (4 Cu + 2 O), dengan parameter kisi ilustratif 4.2696 Å. Ini **struktur ideal pembelajaran, bukan hasil relaksasi SIESTA**. Contoh H₂O merupakan molekul sederhana untuk menguji XYZ.

<div id="mki-crystal" class="cv-root">
  <section class="cv-hero"><div><span class="cv-eyebrow">MKI WORKSHOP · STRUCTURE TOOLKIT</span><h2>Crystal Structure Viewer 3D</h2><p>Eksplorasi kristal dan molekul sebelum simulasi SIESTA.</p></div><span class="cv-tag">CIF · XYZ · Client-side</span></section>
  <section class="cv-card"><h3>1. Pilih struktur</h3><div class="cv-toolbar"><label class="cv-upload">Unggah CIF / XYZ<input id="cv-upload" type="file" accept=".cif,.xyz,chemical/x-cif,text/plain"></label><button type="button" id="cv-cu" class="cv-primary">Contoh Cu₂O</button><button type="button" id="cv-water">Contoh H₂O</button><button type="button" id="cv-reset">Reset kamera</button></div><div class="cv-meta" id="cv-status" role="status" aria-live="polite">Menyiapkan viewer 3D…</div></section>
  <section class="cv-card"><h3>2. Pengaturan tampilan</h3><div class="cv-settings"><label>Gaya atom<select id="cv-style"><option value="ballstick">Ball & stick</option><option value="sphere">Space-filling (CPK)</option><option value="stick">Sticks</option><option value="line">Wireframe</option></select></label><label>Warna latar<select id="cv-bg"><option value="white">Putih · Paper</option><option value="dark">Gelap · Presentasi</option><option value="blue">Biru muda</option></select></label><label>Ukuran atom<input id="cv-scale" type="range" min="35" max="140" value="72"><span id="cv-scale-val" class="cv-range-val">72%</span></label><label class="cv-checkbox"><input id="cv-label" type="checkbox"> Tampilkan simbol atom</label></div><div class="cv-toolbar"><button type="button" id="cv-spin">Putar otomatis</button><button type="button" id="cv-stop">Hentikan rotasi</button><button type="button" id="cv-png">Unduh PNG</button><button type="button" id="cv-download-xyz">Unduh XYZ</button></div></section>
  <section class="cv-card"><div class="cv-heading"><div><h3>3. Visualisasi struktur</h3><p>Drag untuk rotasi, scroll untuk zoom, klik dua atom untuk mengukur jarak.</p></div><span class="cv-note">3Dmol.js</span></div><div class="cv-viewport"><div id="cv-canvas" aria-label="Area viewer kristal tiga dimensi"></div><div id="cv-loading" class="cv-loading">Memuat mesin grafis 3D…</div></div><div class="cv-detail"><div><b id="cv-name">Belum ada struktur</b><small id="cv-summary">Pilih contoh atau unggah file.</small></div><div><b>Jarak atom</b><small id="cv-distance">Klik atom pertama, lalu atom kedua.</small></div></div></section>
  <section class="cv-card"><h3>4. Informasi dan batasan</h3><div id="cv-elements" class="cv-elements">Komposisi akan muncul di sini.</div><p class="cv-muted">Pengukuran jarak memakai koordinat Kartesius yang ditampilkan, **bukan** algoritme minimum-image untuk batas periodik. CIF akan dirender menggunakan parser 3Dmol.js; tampilan sel periodik, simetri, dan ikatan bergantung pada struktur dan parser. File XYZ tidak memiliki sel kristal kecuali informasi sel tersedia secara terpisah. Untuk analisis geometrik publikasi dan persiapan input SIESTA, periksa kembali struktur dengan perangkat kristalografi khusus.</p><p class="cv-muted">Memerlukan koneksi internet pertama kali untuk memuat pustaka <a href="https://3dmol.csb.pitt.edu/" target="_blank" rel="noopener noreferrer">3Dmol.js</a>. Setelah pustaka dimuat, input file diproses secara lokal di browser.</p></section>
</div>

## Contoh CIF Cu₂O dan XYZ H₂O

Paket unduhan juga menyediakan contoh `Cu2O_cuprite_ideal.cif` dan `H2O_molecule.xyz` yang dapat diunggah melalui tombol **Unggah CIF / XYZ**.

## Format masukan SIESTA

SIESTA umumnya dapat menghasilkan file struktur seperti `.XV` atau `.STRUCT_OUT`. Format tersebut **belum didukung langsung** oleh viewer ini. Konversikan dulu ke CIF atau XYZ memakai alat yang mendukung sel periodik, lalu periksa konsistensi koordinat sebelum mengunggahnya.

<link rel="stylesheet" href="../assets/crystal-structure-viewer.css">
<script defer src="../assets/crystal-structure-viewer.js"></script>
