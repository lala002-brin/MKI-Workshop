<!-- =========================================================
     BAHAN PENDALAMAN
     PART 1
     Halaman 39
     File: bahan-pendalaman.md
     ========================================================= -->

<section class="session-header">

  <h1>Bahan pendalaman</h1>

</section>


<section class="analysis-section">

  <h2>A · Latihan lanjutan setelah workshop</h2>

  <h3>A.1 Kasus 3 — migrasi CO pada katalis Pt(111)</h3>

  <p>
    <strong>Pertanyaan.</strong>
    Berapa hambatan perpindahan CO dari satu situs atop Pt ke situs atop
    terdekat? NEB mencari lintasan di ruang koordinat antara dua keadaan ujung.
    Di model ini Pt dibekukan dan C/O bergerak. Tiap evaluasi gaya memakai
    beda hingga energi SCC-DFTB sehingga perhitungannya lebih lama dari MD
    singkat.
  </p>


  <figure class="analysis-figure">

    <img
      src="../images/co-pt111.png"
      alt="CO di atas Pt(111)"
    >

    <figcaption class="analysis-figure-caption">
      Gambar 11: CO di atas Pt(111). Pt abu-abu, C sian, dan O merah.
    </figcaption>

  </figure>


  <h4>Langkah 1. Buat image awal dan identifikasi dua ujung.</h4>

  <div class="analysis-command">
    <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>mkdir -p proyek_pribadi</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/neb_dftb.py --help</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/neb_dftb.py --mode siapkan --images 7 --output proyek_pribadi/neb_pt_co_awal</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/neb_pt_co_awal/ringkasan.txt</code></pre>
  </div>

</section>
<!-- =========================================================
     BAHAN PENDALAMAN
     PART 2
     Halaman 40
     File: bahan-pendalaman.md
     ========================================================= -->

<section class="analysis-section">

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/neb_pt_co_awal/image_00</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/neb_pt_co_awal/image_06</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cd proyek_pribadi/neb_pt_co_awal/image_00</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>pwd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 8 dftb.inp</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cd ../../../../</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/periksa_dcdftbmd.py proyek_pribadi/neb_pt_co_awal/image_00</code></pre>
  </div>

  <p>
    Image 00 dan 06 adalah ujung lintasan. Image 01–05 adalah interpolasi awal,
    bukan hasil NEB. Bila gambar skema dibutuhkan:
  </p>

  <div class="analysis-command">
    <pre><code>python skrip/gambar_lintasan_neb.py proyek_pribadi/neb_pt_co_awal</code></pre>
  </div>


  <h4>Langkah 2. Jalankan NEB pada direktori baru.</h4>

  <p>
    Pastikan sembilan pasangan parameter Pt/C/O dan ASE tersedia. Direktori
    hasil baru diperlukan karena menjalankan mode jalankan tidak menimpa image
    persiapan.
  </p>

  <div class="analysis-command">
    <pre><code>python -c "import ase; print(ase.__version__)"</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>command -v dcdftbmd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>sbatch skrip/job_python_slurm.sh python skrip/neb_dftb.py --mode jalankan --images 7
→ --langkah-ujung 30 --langkah 30 --fmax 0.12 --output proyek_pribadi/neb_pt_co_hasil</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>squeue -u $(whoami)</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/neb_pt_co_hasil/status_neb.txt</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 8 proyek_pribadi/neb_pt_co_hasil/profil_neb.csv</code></pre>
  </div>

</section>
<!-- =========================================================
     BAHAN PENDALAMAN
     PART 3
     Halaman 40–41
     ========================================================= -->

<section class="analysis-section">

  <h4>Langkah 3. Buat dan baca profil.</h4>

  <div class="analysis-command">
    <pre><code>python skrip/gambar_lintasan_neb.py proyek_pribadi/neb_pt_co_hasil</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls -lh proyek_pribadi/neb_pt_co_hasil/skema_lintasan.png</code></pre>
  </div>

  <p>
    <code>status_neb.txt</code> mencantumkan konvergen dan perkiraan barrier
    maju. Jika <code>Konvergen: False</code>, laporkan profil sebagai belum
    konvergen. Barrier maju adalah energi image tertinggi dikurangi energi
    ujung awal, dalam eV. Bandingkan juga energi ujung akhir. Uji jumlah image
    atau ukuran slab sebelum membandingkan dengan data eksperimen. Panduan ASE
    NEB menjelaskan gaya serta konvergensi image.
  </p>

  <p>
    Unduh <code>profil_neb.csv</code>, <code>status_neb.txt</code>, dan
    <code>skema_lintasan.png</code> dari remote
    <code>latihan_simulasi/workshop_material/proyek_pribadi/neb_pt_co_hasil</code>
    ke folder lokal
    <code>Downloads\hasil_workshop\neb_pt_co</code> di SFTP Termius.
    Unduh pula <code>struktur.xyz</code> dari image_00, image_03, dan image_06
    ke subfolder bernama sama. Sesudah transfer, buka ketiga struktur tersebut
    di VMD Windows. Image NEB adalah urutan geometri, bukan frame waktu MD.
    Setiap evaluasi DFTB oleh skrip memuat <code>dftb.out</code> dari folder
    <code>hitung_*</code>.
  </p>


  <h3>A.2 Kasus 4 — pengenalan ibuprofen oleh motif arginina</h3>

  <p>
    <strong>Pertanyaan.</strong>
    Bagaimana gugus karboksilat ibuprofen bermuatan negatif mendekati guanidinium
    bermuatan positif? Besaran yang dihitung adalah jarak O–N dan energi
    interaksi elektrostatik pada geometri kompleks yang sama. Fragmen
    metil-guanidinium hanya model sederhana gugus sisi rantai arginina.
  </p>


  <figure class="analysis-figure">

    <img
      src="../images/ibuprofen-guanidinium.png"
      alt="Pose awal ibuprofen dan motif guanidinium"
    >

    <figcaption class="analysis-figure-caption">
      Gambar 12: Pose awal ibuprofen dan motif guanidinium; O merah dan N biru.
    </figcaption>

  </figure>


  <h4>Langkah 1. Buat tiga input yang konsisten.</h4>

  <p>
    Generator memakai RDKit untuk geometri awal, kemudian menyimpan kompleks
    dan dua fragmen pada koordinat yang sama. Pastikan RDKit tersedia
    di environment Python peserta sebelum menjalankan skrip.  </p>

</section>
<!-- =========================================================
     BAHAN PENDALAMAN
     PART 4
     Halaman 42
     File: bahan-pendalaman.md
     ========================================================= -->

<section class="analysis-section">

  <div class="analysis-command">
    <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>mkdir -p proyek_pribadi</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/buat_model_ibuprofen_arginin.py --help</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/buat_model_ibuprofen_arginin.py --output proyek_pribadi/ibuprofen_arginin</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/ibuprofen_arginin/ringkasan.txt</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/ibuprofen_arginin</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cd proyek_pribadi/ibuprofen_arginin/kompleks</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>pwd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 8 dftb.inp</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cd ../../../../</code></pre>
  </div>

  <p>
    Jika muncul <code>ModuleNotFoundError: rdkit</code>, minta fasilitator
    mengaktifkan environment Python dengan RDKit, lalu jalankan kembali
    perintah generator. Struktur contoh dalam kasus digunakan untuk pemeriksaan,
    bukan menggantikan pekerjaan peserta.
  </p>


  <h4>Langkah 2. Periksa muatan dan hitung tiga energi.</h4>

  <div class="analysis-command">
    <pre><code>head -n 8 proyek_pribadi/ibuprofen_arginin/kompleks/dftb.inp</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 8 proyek_pribadi/ibuprofen_arginin/ibuprofenat/dftb.inp</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 8 proyek_pribadi/ibuprofen_arginin/guanidinium/dftb.inp</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>sbatch skrip/job_interaksi_slurm.sh proyek_pribadi/ibuprofen_arginin</code></pre>
  </div>

</section>
<!-- =========================================================
     BAHAN PENDALAMAN
     PART 5
     Halaman 43
     ========================================================= -->

<section class="analysis-section">

  <div class="analysis-command">
    <pre><code>squeue -u $(whoami)</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/ibuprofen_arginin/kompleks/dftb.out</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/ibuprofen_arginin/ibuprofenat/dftb.out</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/ibuprofen_arginin/guanidinium/dftb.out</code></pre>
  </div>

  <p>
    Header geometri mempunyai banyak N muatan multiplet. Muatan kompleks 0,
    ibuprofenat −1, dan guanidinium +1. Set parameter, opsi SCC, serta geometri
    fragmen harus konsisten.
  </p>


  <h4>Langkah 3. Hitung energi interaksi.</h4>

  <div class="analysis-command">
    <pre><code>python skrip/analisis_interaksi_obat.py proyek_pribadi/ibuprofen_arginin</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/ibuprofen_arginin/kontak.csv</code></pre>
  </div>

  <p>
    Skrip membaca tiga energi akhir dari <code>dftb.out</code> yang berakhir
    normal, kemudian menghitung
    ΔE<sub>int</sub> = E<sub>kompleks</sub> − E<sub>ibuprofenat</sub> −
    E<sub>guanidinium</sub>. Tanda negatif menunjukkan kompleks lebih rendah
    energinya daripada fragmen pada geometri pembanding ini. Ini bukan energi
    ikat bebas: belum ada pelarut, koreksi BSSE, perubahan konformasi, entropi,
    atau protein lengkap. Buat dua orientasi tambahan sebagai latihan lanjutan
    dan ulangi ketiga perhitungan untuk interpolasi.
  </p>

  <p>
    Di SFTP, buka folder remote
    <code>latihan_simulasi/workshop_material/proyek_pribadi/ibuprofen_arginin</code>;
    buat folder lokal
    <code>Downloads\hasil_workshop\ibuprofen_arginin</code>. Unduh
    <code>kontak.csv</code>, tiga <code>dftb.out</code>, dan tiga
    <code>struktur.xyz</code> sambil mempertahankan subfolder
    <code>kompleks</code>, <code>ibuprofenat</code>, dan
    <code>guanidinium</code>. Sesudah transfer, buka struktur kompleks di VMD
    Windows, ukur kontak O–N, dan bandingkan dengan CSV.
  </p>


  <h3>A.3 Sebelum menulis kesimpulan</h3>

  <p>
    Untuk setiap grafik, catat sumber berkas, jumlah frame/titik, parameter,
    satuan, dan status perhitungan. Bedakan koordinat awal, keluaran yang telah
    dihitung, dan interpretasi. Muatan Mulliken bergantung pada cara membagi
    populasi elektron; RDF memerlukan sampling cukup; barrier NEB memerlukan
    lintasan konvergen; energi interaksi elektronik tidak mencakup semua
    sumbangan termodinamika.
  </p>


  <h3>B · Jika perintah berhenti: panduan pemeriksaan</h3>

  <p>
    Perintah yang gagal umumnya memberi petunjuk pada baris terakhir Terminal
    atau pada berkas log. Jangan langsung mengubah banyak pengaturan sekaligus.
    Catat perintah yang dijalankan, lokasi <code>pwd</code>, pesan kesalahan,
    lalu periksa satu penyebab paling mungkin. Setelah diperbaiki, ulangi
    langkah yang gagal.
  </p>

</section>
