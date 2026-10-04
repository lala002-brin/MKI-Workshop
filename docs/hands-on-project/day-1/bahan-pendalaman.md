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
<!-- =========================================================
     BAHAN PENDALAMAN
     PART 6
     Halaman 44–45
     File: bahan-pendalaman.md
     ========================================================= -->

<section class="analysis-section">

  <h3>B.1 Direktori dan berkas</h3>

  <div class="troubleshooting-table">

    <table>
      <thead>
        <tr>
          <th>Gejala</th>
          <th>Periksa</th>
          <th>Tindakan</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td><code>No such file or directory</code></td>
          <td>
            <code>pwd</code>; ls; apakah Anda sudah di direktori latihan?
          </td>
          <td>
            Kembali ke direktori utama; lihat perintah di bawah tabel.
          </td>
        </tr>

        <tr>
          <td>Folder output sudah ada</td>
          <td>
            <code>ls proyek_pribadi</code>
          </td>
          <td>
            Pilih nama output baru seperti <code>lipf6_ec_ulang</code>;
            simpan hasil sebelumnya. Jangan menghapus baris komentar;
            buat ulang struktur dari generator.
          </td>
        </tr>

        <tr>
          <td>Jumlah atom XYZ berbeda</td>
          <td>
            <code>head -n 2 struktur.xyz</code>; hitung baris atom
          </td>
          <td>
            Jangan menghapus baris komentar; buat ulang struktur dari generator.
          </td>
        </tr>

        <tr>
          <td><code>dftb.inp</code> dianggap tidak empat blok</td>
          <td>
            Lihat baris kosong dengan <code>less dftb.inp</code>
          </td>
          <td>
            Cocokkan urutan keyword, judul, parameter, geometri pada latihan
            input manual.
          </td>
        </tr>
      </tbody>
    </table>

  </div>


  <p>
    Jika lokasi direktori salah, jalankan perintah ini di Terminal:
  </p>

  <div class="analysis-command">
    <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>pwd</code></pre>
  </div>


  <h3>B.2 Program dan parameter</h3>

  <div class="troubleshooting-table">

    <table>
      <thead>
        <tr>
          <th>Gejala</th>
          <th>Periksa</th>
          <th>Tindakan</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td><code>dcdftbmd: command not found</code></td>
          <td>
            <code>command -v dcdftbmd</code>
          </td>
          <td>
            Minta lokasi program atau perintah module load dari panitia.
          </td>
        </tr>

        <tr>
          <td>Daftar panjang <code>.skf</code> hilang</td>
          <td>
            <code>ls parameter</code>; lihat pasangan dalam input
          </td>
          <td>
            Lengkapi seluruh pasangan terurut dari satu set kompatibel.
            Pemeriksaan format tetap dapat dilakukan tanpa parameter.
          </td>
        </tr>

        <tr>
          <td>
            <code>python</code> tidak menemukan <code>ase</code>,
            <code>mace</code>, <code>rdkit</code>, atau <code>matplotlib</code>
          </td>
          <td>
            <code>python -c "import nama_paket"</code>
          </td>
          <td>
            Gunakan environment Python workshop yang diberikan fasilitator;
            ulangi pemeriksaan paket.
          </td>
        </tr>

        <tr>
          <td>VMD tidak ditemukan di PATH</td>
          <td>
            <code>command -v vmd</code>
          </td>
          <td>
            Minta fasilitator memeriksa modul program atau lokasi VMD pada
            Mahameru.
          </td>
        </tr>
      </tbody>
    </table>

  </div>


  <h3>B.3 Keluaran yang belum siap</h3>

  <div class="troubleshooting-table">

    <table>
      <thead>
        <tr>
          <th>Gejala</th>
          <th>Periksa</th>
          <th>Tindakan</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Tidak ada <code>trajectory</code> / <code>mulliken</code></td>
          <td>
            <code>tail -n 20 dftb.out</code>; pastikan MD aktif
          </td>
          <td>
            Selesaikan perhitungan MD dan periksa apakah program berhenti normal.
            Gunakan hanya keluaran satu run yang sama dan lengkap; jangan
            gabungkan file acak.
          </td>
        </tr>

        <tr>
          <td>Jumlah frame tidak sama</td>
          <td>
            Hitung frame kedua berkas; periksa apakah run terpotong
          </td>
          <td>
            Selesaikan perhitungan MD dan periksa apakah program berhenti normal.
            Gunakan hanya keluaran satu run yang sama dan lengkap; jangan
            gabungkan file acak.
          </td>
        </tr>

        <tr>
          <td>RDF menolak <code>--rmax</code></td>
          <td>
            Bandingkan <code>--rmax</code> dengan <code>L/2</code>
          </td>
          <td>
            Untuk sel 12,3 Å gunakan 6,0 Å atau lebih kecil.
          </td>
        </tr>

        <tr>
          <td>Tidak ada <code>profil_neb.csv</code></td>
          <td>
            Periksa mode NEB dan <code>status_neb.txt</code>
          </td>
          <td>
            Mode siapkan hanya membuat image awal; jalankan mode jalankan
            setelah prasyarat lengkap.
          </td>
        </tr>

        <tr>
          <td>Parser energi <code>dftb.out</code> menolak</td>
          <td>
            Cari <code>Final SCC-DFTB Energy</code> dan <code>Final</code>
            pada output yang normal
          </td>
          <td>
            Perbaiki perhitungan yang gagal; jangan memasukkan angka parsial.
          </td>
        </tr>

        <tr>
          <td>Tidak ada gambar VMD</td>
          <td>
            Periksa pesan Terminal dan berkas <code>.tga</code>
          </td>
          <td>
            TGA adalah hasil asli VMD; jika perlu PNG, gunakan ImageMagick
            atau penampil gambar di Windows.
          </td>
        </tr>
      </tbody>
    </table>

  </div>


  <h3>B.4 Contoh alur diagnosis satu kasus</h3>

  <p>
    Misalkan <code>analisis_elektron_lintasan.py</code> melaporkan jumlah
    bingkai <code>trajectory</code> dan <code>mulliken</code> harus sama.
    Urutkan pemeriksaan berikut: (1) kembali ke direktori paket dengan
    <code>pwd</code>; (2) pastikan kedua berkas berada dalam folder hasil yang
    sama; (3) lihat baris akhir <code>dftb.out</code> dan catatan Slurm;
    (4) pastikan MD selesai, bukan terhenti di tengah; (5) jalankan lagi
    analisis. Jangan menyunting angka manual atau koordinat untuk memaksa
    jumlah frame sama.
  </p>

  <p>
    Jika perhitungan belum bisa dijalankan saat sesi kelas, gunakan struktur
    contoh untuk mempelajari input dan VMD. Dalam lembar kerja, tandai hasil
    numerik sebagai belum dihitung, catat prasyarat yang hilang, dan lanjutkan
    pada komputer yang memiliki biner serta parameter yang diperlukan.
  </p>

</section>

<!-- =========================================================
     C. LEMBAR KERJA PESERTA
     PART 1
     PDF HALAMAN 46–48
     
     Isi:
     C. Lembar kerja peserta
     C.1 Catatan awal yang berlaku untuk semua kasus
     C.2 Kasus 1 · elektrolit LiPF6/EC
     
     Part berikutnya:
     C.3 Kasus 2
     C.4 Kasus 3
     C.5 Kasus 4
     C.6 Kasus 5
     C.7 Laporan singkat
     D. Glosarium
     ========================================================= -->


<div class="worksheet-page">


  <!-- =======================================================
       TOOLBAR
       ======================================================= -->

  <div class="worksheet-toolbar">

    <button
      class="worksheet-btn primary"
      type="button"
      onclick="saveMDWorksheet()">
      💾 Save
    </button>

    <button
      class="worksheet-btn"
      type="button"
      onclick="downloadMDWorksheet()">
      ⬇ Download
    </button>

    <button
      class="worksheet-btn"
      type="button"
      onclick="document.getElementById('worksheet-file').click()">
      📂 Load
    </button>

    <button
      class="worksheet-btn"
      type="button"
      onclick="clearMDWorksheet()">
      ↻ Reset
    </button>

    <button
      class="worksheet-btn drive"
      type="button"
      onclick="uploadMDWorksheet()">
      ☁ Save to Google Drive
    </button>

    <input
      type="file"
      id="worksheet-file"
      accept=".json"
      hidden
      onchange="loadMDWorksheet(event)">

  </div>


  <!-- =======================================================
       PROGRESS
       ======================================================= -->

  <div class="worksheet-progress">

    <div class="worksheet-progress-header">

      <span>
        Worksheet Progress
      </span>

      <strong id="worksheet-completion">
        0 / 33 fields
      </strong>

    </div>


    <div class="worksheet-progress-track">

      <div
        id="worksheet-progress-bar"
        class="worksheet-progress-bar"
        style="width:0%;">
      </div>

    </div>


    <div
      id="worksheet-progress-label"
      class="worksheet-progress-label">
      0% complete
    </div>

  </div>


  <div
    id="worksheet-status"
    class="worksheet-status">
    Ready
  </div>


  <!-- =======================================================
       HEADER
       ======================================================= -->

  <div class="worksheet-card">

    <div class="worksheet-header">

      <div class="worksheet-header-content">

        <span class="worksheet-label">
          C
        </span>

        <h2>
          Lembar kerja peserta
        </h2>

        <p>
          Gunakan lembar ini untuk mencatat hasil dari komputer Anda.
          Isi nama berkas dan satuan bersama angka. Bila suatu perhitungan
          belum berjalan, tulis belum dihitung pada sel hasil. Contoh
          aritmetika di bawah adalah ilustrasi cara menghitung, bukan
          keluaran DFTB atau MACE.
        </p>

      </div>


      <div class="worksheet-meta">

        <label>

          <span>
            Nama
          </span>

          <input
            type="text"
            id="participant-name"
            placeholder="Nama peserta">

        </label>


        <label>

          <span>
            Akun komputer
          </span>

          <input
            type="text"
            id="computer-account"
            placeholder="Akun komputer">

        </label>

      </div>

    </div>


    <!-- =====================================================
         C.1
         ===================================================== -->

    <section class="worksheet-section">

      <div class="worksheet-section-title">

        <span>
          C.1
        </span>

        <div>

          <strong>
            Catatan awal yang berlaku untuk semua kasus
          </strong>

          <small>
            Informasi awal
          </small>

        </div>

      </div>


      <div class="worksheet-table-wrap">

        <table class="worksheet-table">

          <thead>

            <tr>

              <th>
                Informasi
              </th>

              <th>
                Isian peserta
              </th>

            </tr>

          </thead>


          <tbody>

            <tr>

              <td>
                Tanggal dan komputer
              </td>

              <td>

                <input
                  type="text"
                  id="initial-date-computer"
                  placeholder="Isi jawaban">

              </td>

            </tr>


            <tr>

              <td>
                Direktori kerja hasil <code>pwd</code>
              </td>

              <td>

                <input
                  type="text"
                  id="initial-working-directory"
                  placeholder="Isi jawaban">

              </td>

            </tr>


            <tr>

              <td>
                Versi DCDFTBMD / lokasi biner
              </td>

              <td>

                <input
                  type="text"
                  id="initial-dcdftbmd"
                  placeholder="Isi jawaban">

              </td>

            </tr>


            <tr>

              <td>
                Set Slater–Koster dan asalnya
              </td>

              <td>

                <input
                  type="text"
                  id="initial-slater-koster"
                  placeholder="Isi jawaban">

              </td>

            </tr>


            <tr>

              <td>
                Versi Python, ASE, MACE, VMD
              </td>

              <td>

                <input
                  type="text"
                  id="initial-software-version"
                  placeholder="Isi jawaban">

              </td>

            </tr>


            <tr>

              <td>
                Nama checkpoint MACE
              </td>

              <td>

                <input
                  type="text"
                  id="initial-mace-checkpoint"
                  placeholder="Isi jawaban">

              </td>

            </tr>

          </tbody>

        </table>

      </div>


      <div class="worksheet-note">

        <strong>
          Pemeriksaan pertama.
        </strong>

        <p>
          Apakah <code>python skrip/cek_paket.py</code> menemukan seluruh
          berkas inti? Catat pustaka dan parameter yang belum tersedia
          pada akun Anda. Jika hasil visualisasi dibuat ulang, catat
          nama PNG dan apakah log VMD berisi <code>Rendering Complete</code>.
        </p>

      </div>

    </section>


    <!-- =====================================================
         C.2
         ===================================================== -->

    <section class="worksheet-section">

      <div class="worksheet-section-title">

        <span>
          C.2
        </span>

        <div>

          <strong>
            Kasus 1 · elektrolit LiPF<sub>6</sub>/EC
          </strong>

          <small>
            LiPF<sub>6</sub> / EC
          </small>

        </div>

      </div>


      <p class="worksheet-question">

        <strong>
          Hipotesis awal.
        </strong>

        Li<sup>+</sup> akan dikelilingi terutama oleh atom

        <input
          type="text"
          id="case1-hypothesis-atom"
          class="inline-answer"
          aria-label="Atom yang mengelilingi Li">

        ;

        kontak Li–F dapat menunjukkan

        <input
          type="text"
          id="case1-hypothesis-contact"
          class="inline-answer"
          aria-label="Kontak Li-F">

        .

      </p>


      <div class="worksheet-table-wrap">

        <table class="worksheet-table">

          <thead>

            <tr>

              <th>
                Langkah / besaran
              </th>

              <th>
                Isian peserta
              </th>

            </tr>

          </thead>


          <tbody>

            <tr>

              <td>
                Seed dan direktori hasil
              </td>

              <td>
                <input
                  type="text"
                  id="case1-seed-directory"
                  placeholder="Isi jawaban">
              </td>

            </tr>


            <tr>

              <td>
                Jumlah atom, EC, LiPF<sub>6</sub>
              </td>

              <td>
                <input
                  type="text"
                  id="case1-atom-count"
                  placeholder="Isi jawaban">
              </td>

            </tr>


            <tr>

              <td>
                Panjang sel L dan volume L<sup>3</sup>
              </td>

              <td>
                <input
                  type="text"
                  id="case1-cell-volume"
                  placeholder="Isi jawaban">
              </td>

            </tr>


            <tr>

              <td>
                Suhu, Δt, NSTEP, PRINT
              </td>

              <td>
                <input
                  type="text"
                  id="case1-md-parameters"
                  placeholder="Isi jawaban">
              </td>

            </tr>


            <tr>

              <td>
                Lama MD dan selang antarframe
              </td>

              <td>
                <input
                  type="text"
                  id="case1-md-duration"
                  placeholder="Isi jawaban">
              </td>

            </tr>


            <tr>

              <td>
                Jumlah frame <code>traject</code> /
                <code>mulliken</code>
              </td>

              <td>
                <input
                  type="text"
                  id="case1-frame-count"
                  placeholder="Isi jawaban">
              </td>

            </tr>


            <tr>

              <td>
                Rentang frame yang dianalisis
              </td>

              <td>
                <input
                  type="text"
                  id="case1-frame-range"
                  placeholder="Isi jawaban">
              </td>

            </tr>


            <tr>

              <td>
                Cutoff Li–O / Li–F dan alasannya
              </td>

              <td>
                <textarea
                  id="case1-cutoff-reason"
                  rows="3"
                  placeholder="Isi jawaban"></textarea>
              </td>

            </tr>


            <tr>

              <td>
                Nama grafik hasil
              </td>

              <td>
                <input
                  type="text"
                  id="case1-graph-name"
                  placeholder="Isi jawaban">
              </td>

            </tr>

          </tbody>

        </table>

      </div>


      <div class="worksheet-calculation">

        <strong>
          Latihan hitung tangan.
        </strong>

        <p>

          Jika jarak satu Li ke empat O adalah 1,9; 2,1; 2,4; dan 3,8 Å,
          maka dengan cutoff 3,2 Å bilangan koordinasi Li–O =

          <input
            type="text"
            id="case1-hand-calculation"
            class="inline-answer"
            aria-label="Bilangan koordinasi Li-O">

          .

          Ini hanya contoh cara menghitung CN. Gunakan jarak dan cutoff
          Anda sendiri untuk hasil simulasi.

        </p>

      </div>


      <div class="worksheet-table-wrap">

        <table class="worksheet-table">

          <thead>

            <tr>

              <th>
                Hasil dari CSV / grafik
              </th>

              <th>
                Nilai, satuan, dan sumber berkas
              </th>

            </tr>

          </thead>


          <tbody>

            <tr>

              <td>
                Puncak pertama RDF Li–O
              </td>

              <td>
                <input
                  type="text"
                  id="case1-rdf-li-o-peak"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                Minimum pertama RDF Li–O
              </td>

              <td>
                <input
                  type="text"
                  id="case1-rdf-li-o-minimum"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                CN Li–O rata-rata ± simpangan
              </td>

              <td>
                <input
                  type="text"
                  id="case1-cn-li-o-average"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                CN Li–O paling sering muncul
              </td>

              <td>
                <input
                  type="text"
                  id="case1-cn-li-o-mode"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                Puncak pertama RDF Li–F
              </td>

              <td>
                <input
                  type="text"
                  id="case1-rdf-li-f-peak"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                Fraksi frame dengan CN Li–F &gt; 0
              </td>

              <td>
                <input
                  type="text"
                  id="case1-cn-li-f-positive"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                Muatan Mulliken Li rata-rata
              </td>

              <td>
                <input
                  type="text"
                  id="case1-mulliken-li"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                Tren muatan O selama MD
              </td>

              <td>
                <input
                  type="text"
                  id="case1-charge-o-trend"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                MSD Li pada lag 100 dan 200 fs (Å<sup>2</sup>)
              </td>

              <td>
                <input
                  type="text"
                  id="case1-msd-li"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                Jendela fit MSD dan jumlah titik
              </td>

              <td>
                <input
                  type="text"
                  id="case1-msd-fit"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                D<sub>Li</sub> dan D<sub>P</sub> (cm<sup>2</sup>/s)
              </td>

              <td>
                <input
                  type="text"
                  id="case1-diffusion"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                σ<sub>NE</sub> ideal (S/cm)
              </td>

              <td>
                <input
                  type="text"
                  id="case1-sigma-ne"
                  placeholder="Nilai, satuan, dan sumber berkas">
              </td>

            </tr>


            <tr>

              <td>
                Perubahan hasil saat jendela fit diganti
              </td>

              <td>
                <textarea
                  id="case1-fit-window-change"
                  rows="3"
                  placeholder="Tuliskan hasil pengamatan"></textarea>
              </td>

            </tr>

          </tbody>

        </table>

      </div>


      <div class="worksheet-interpretation">

        <strong>
          Tafsirkan.
        </strong>

        <p>
          Apakah koordinasi Li berubah antarframe? Apakah RDF tetap serupa
          jika 20% frame awal dibuang? Perpanjangan lintasan atau perubahan
          seed mana yang Anda usulkan untuk menilai ketidakpastian?
        </p>

        <textarea
          id="case1-interpretation"
          rows="6"
          placeholder="Tuliskan tafsiran Anda..."></textarea>

      </div>

    </section>


  </div>

</div>
<!-- =========================================================
     C.2 KASUS 2 · ANTARMUKA LiF–EC
     ========================================================= -->

<div class="worksheet-section">

  <div class="worksheet-section-title">

    <span>
      C.2
    </span>

    <div>
      <strong>
        Kasus 2 · antarmuka LiF–EC
      </strong>

      <small>
        Surface contact and charge analysis
      </small>
    </div>

  </div>


  <div class="worksheet-question">

    <strong>
      Sketsa pengamatan VMD.
    </strong>

    <p>
      Tandai slab, O karbonil, dan Li permukaan terdekat.
      Mengapa jarak antarkerdua atom ini lebih tepat daripada RDF 3D
      seluruh sel yang memiliki vakum?
    </p>

  </div>


  <div class="worksheet-table">

    <div class="worksheet-table-header">

      <span>
        Langkah / besaran
      </span>

      <span>
        Isian peserta
      </span>

    </div>


    <label class="worksheet-table-row">

      <span>
        Jumlah atom slab dan EC
      </span>

      <input
        type="text"
        id="case2-atom-count"
        placeholder="Masukkan jumlah atom"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Nomor atom O karbonil
      </span>

      <input
        type="text"
        id="case2-carbonyl-o"
        placeholder="Nomor atom"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Panjang sel x, y, z
      </span>

      <input
        type="text"
        id="case2-cell-length"
        placeholder="Masukkan x, y, z"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Suhu, lama MD, jumlah frame
      </span>

      <input
        type="text"
        id="case2-md-condition"
        placeholder="Suhu, waktu MD, jumlah frame"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        File antarmuka.csv tersedia?
      </span>

      <select id="case2-interface-file">

        <option value="">
          Pilih
        </option>

        <option value="Ya">
          Ya
        </option>

        <option value="Tidak">
          Tidak
        </option>

      </select>

    </label>


    <label class="worksheet-table-row">

      <span>
        Jarak O–Li awal dan akhir
      </span>

      <input
        type="text"
        id="case2-distance-initial-final"
        placeholder="Contoh: 2.10 Å → 2.25 Å"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Jarak O–Li rata-rata ± simpangan
      </span>

      <input
        type="text"
        id="case2-distance-average"
        placeholder="Masukkan nilai dan simpangan"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Jarak O–Li minimum dan maksimum
      </span>

      <input
        type="text"
        id="case2-distance-range"
        placeholder="Minimum dan maksimum"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Muatan EC rata-rata
      </span>

      <input
        type="text"
        id="case2-charge-ec"
        placeholder="Masukkan hasil"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Muatan slab rata-rata
      </span>

      <input
        type="text"
        id="case2-charge-slab"
        placeholder="Masukkan hasil"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Perubahan jumlah muatan EC+slab
      </span>

      <input
        type="text"
        id="case2-charge-total-change"
        placeholder="Masukkan hasil"
      >

    </label>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Kesimpulan sementara
    </strong>

    <p>
      Apakah jarak kontak menetap, membesar, atau berfluktuasi?
      Apakah perubahan muatan EC diikuti perubahan berlawanan pada slab?
      Tulis satu hasil yang mendukung dan satu hasil yang membatasi
      kesimpulan Anda.
    </p>

    <textarea
      id="case2-preliminary-conclusion"
      rows="5"
      placeholder="Tuliskan kesimpulan sementara berdasarkan data yang diperoleh..."
    ></textarea>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Uji berikutnya
    </strong>

    <p>
      Pilih satu: slab lebih tebal, beberapa EC, garam dalam elektrolit,
      atau lintasan lebih panjang. Jelaskan besaran apa yang harus
      dibandingkan agar uji tersebut informatif.
    </p>

    <select id="case2-next-test">

      <option value="">
        Pilih uji berikutnya
      </option>

      <option value="Slab lebih tebal">
        Slab lebih tebal
      </option>

      <option value="Beberapa EC">
        Beberapa EC
      </option>

      <option value="Garam dalam elektrolit">
        Garam dalam elektrolit
      </option>

      <option value="Lintasan lebih panjang">
        Lintasan lebih panjang
      </option>

    </select>

    <textarea
      id="case2-next-test-analysis"
      rows="4"
      placeholder="Jelaskan besaran yang perlu dibandingkan..."
    ></textarea>

  </div>

</div>
<!-- =========================================================
     C.4 KASUS 3 · NEB CO PADA Pt(111)
     ========================================================= -->

<div class="worksheet-section">

  <div class="worksheet-section-title">

    <span>
      C.4
    </span>

    <div>
      <strong>
        Kasus 3 · NEB CO pada Pt(111)
      </strong>

      <small>
        Nudged Elastic Band
      </small>
    </div>

  </div>


  <div class="worksheet-question">

    <strong>
      Pisahkan tiga tahap:
    </strong>

    <p>
      antara image interpolasi, energi awal per image, dan NEB terelaksasi.
      Hanya tahap terakhir dapat digunakan untuk memperkirakan barrier
      setelah status konvergensi diperiksa.
    </p>

  </div>


  <div class="worksheet-table">

    <div class="worksheet-table-header">

      <span>
        Langkah / besaran
      </span>

      <span>
        Isian peserta
      </span>

    </div>


    <label class="worksheet-table-row">

      <span>
        Situs awal dan akhir menurut VMD
      </span>

      <input
        type="text"
        id="case3-sites"
        placeholder="Tuliskan situs awal dan akhir"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Jumlah image / Pt dibekukan?
      </span>

      <input
        type="text"
        id="case3-images-fixed"
        placeholder="Contoh: 7 image; Pt dibekukan"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Kriteria gaya dan langkah maksimum
      </span>

      <input
        type="text"
        id="case3-force-criteria"
        placeholder="Masukkan kriteria gaya dan langkah maksimum"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Status optimasi ujung awal
      </span>

      <input
        type="text"
        id="case3-initial-end-status"
        placeholder="Masukkan status"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Status optimasi ujung akhir
      </span>

      <input
        type="text"
        id="case3-final-end-status"
        placeholder="Masukkan status"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Status NEB dari status_neb.txt
      </span>

      <input
        type="text"
        id="case3-neb-status"
        placeholder="Konvergen / belum konvergen"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Energi image awal E<sub>0</sub>
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case3-energy-initial"
          placeholder="Masukkan energi"
        >

        <em>
          eV
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        Energi image tertinggi E<sub>max</sub>
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case3-energy-max"
          placeholder="Masukkan energi"
        >

        <em>
          eV
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        Barrier maju E<sub>max</sub> − E<sub>0</sub>
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case3-forward-barrier"
          placeholder="Hitung barrier maju"
        >

        <em>
          eV
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        E<sub>akhir</sub> − E<sub>0</sub>
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case3-final-energy-difference"
          placeholder="Hitung selisih energi"
        >

        <em>
          eV
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        Nama grafik profil
      </span>

      <input
        type="text"
        id="case3-profile-graph"
        placeholder="Nama file grafik"
      >

    </label>

  </div>


  <div class="worksheet-calculation">

    <strong>
      Latihan hitung tangan
    </strong>

    <p>
      Untuk contoh aritmetika saja, jika
      E<sub>0</sub> = −100,00 eV dan
      E<sub>max</sub> = −99,65 eV,
      barrier maju =
      <span class="worksheet-blank">
        ______
      </span>
      eV.
      Tuliskan persamaan yang sama dengan angka dari
      <em>profil_neb.csv</em> bila perhitungan Anda selesai.
    </p>

    <label class="worksheet-field full">

      <span>
        Hasil perhitungan contoh
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case3-hand-calculation"
          placeholder="Masukkan hasil"
        >

        <em>
          eV
        </em>

      </div>

    </label>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Tafsirkan
    </strong>

    <p>
      Apakah image energi tertinggi berada di tengah lintasan?
      Apakah urutan posisi CO pada gambar VMD cocok dengan perubahan
      energi? Uji apa yang paling mungkin mengurangi ketidakpastian
      barrier: jumlah image, ketebalan slab, atau ukuran sel?
      Jelaskan alasannya.
    </p>

    <textarea
      id="case3-interpretation"
      rows="6"
      placeholder="Tuliskan interpretasi berdasarkan hasil NEB..."
    ></textarea>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Catatan batas kesimpulan
    </strong>

    <p>
      Gunakan barrier hanya setelah status konvergensi NEB diperiksa.
      Pisahkan hasil image interpolasi dari hasil NEB terelaksasi.
    </p>

    <textarea
      id="case3-claim-limit"
      rows="4"
      placeholder="Tuliskan batas kesimpulan Anda..."
    ></textarea>

  </div>

</div>
<!-- =========================================================
     C.5 KASUS 4 · IBUPROFENAT DAN MOTIF ARGININA
     ========================================================= -->

<div class="worksheet-section">

  <div class="worksheet-section-title">

    <span>
      C.5
    </span>

    <div>
      <strong>
        Kasus 4 · ibuprofenat dan motif arginina
      </strong>

      <small>
        Interaksi elektronik
      </small>
    </div>

  </div>


  <div class="worksheet-question">

    <strong>
      Rumus yang digunakan:
    </strong>

    <div class="worksheet-formula">

      ΔE<sub>int</sub> =
      E<sub>kompleks</sub> −
      E<sub>ibuprofenat</sub> −
      E<sub>guanidinium</sub>

    </div>

    <p>
      Fragmen mempertahankan geometri yang dimiliki dalam kompleks.
      Periksa bahwa jumlah muatan fragmen sama dengan muatan kompleks.
    </p>

  </div>


  <div class="worksheet-table">

    <div class="worksheet-table-header">

      <span>
        Langkah / besaran
      </span>

      <span>
        Isian peserta
      </span>

    </div>


    <label class="worksheet-table-row">

      <span>
        Seed dan sumber geometri awal
      </span>

      <input
        type="text"
        id="case4-seed-geometry"
        placeholder="Masukkan seed / sumber geometri"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Jumlah atom / muatan kompleks
      </span>

      <input
        type="text"
        id="case4-complex-atoms-charge"
        placeholder="Contoh: jumlah atom, muatan 0"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Jumlah atom / muatan ibuprofenat
      </span>

      <input
        type="text"
        id="case4-ibuprofenate-atoms-charge"
        placeholder="Contoh: jumlah atom, muatan −1"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Jumlah atom / muatan guanidinium
      </span>

      <input
        type="text"
        id="case4-guanidinium-atoms-charge"
        placeholder="Contoh: jumlah atom, muatan +1"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Jarak O−N terpendek
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case4-on-shortest"
          placeholder="Masukkan jarak"
        >

        <em>
          Å
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        Jarak O−N lain yang dekat
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case4-on-other"
          placeholder="Masukkan jarak"
        >

        <em>
          Å
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        E<sub>kompleks</sub>
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case4-energy-complex"
          placeholder="Masukkan energi"
        >

        <em>
          Hartree
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        E<sub>ibuprofenat</sub>
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case4-energy-ibuprofenate"
          placeholder="Masukkan energi"
        >

        <em>
          Hartree
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        E<sub>guanidinium</sub>
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case4-energy-guanidinium"
          placeholder="Masukkan energi"
        >

        <em>
          Hartree
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        ΔE<sub>int</sub>
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case4-interaction-energy"
          placeholder="Hitung dari tiga energi"
        >

        <em>
          kcal/mol
        </em>

      </div>

    </label>

  </div>


  <div class="worksheet-calculation">

    <strong>
      Periksa perhitungan
    </strong>

    <p>
      Kurangi energi tiga berkas secara manual dan bandingkan dengan
      keluaran skrip. Satuan konversi yang dipakai adalah
      1 Hartree = 627,509 kcal/mol.
    </p>

    <label class="worksheet-field full">

      <span>
        Hasil perhitungan manual
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case4-manual-energy"
          placeholder="Masukkan hasil perhitungan"
        >

        <em>
          kcal/mol
        </em>

      </div>

    </label>


    <label class="worksheet-field full">

      <span>
        Hasil skrip
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case4-script-energy"
          placeholder="Masukkan hasil dari kontak.csv"
        >

        <em>
          kcal/mol
        </em>

      </div>

    </label>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Tafsirkan hasil
    </strong>

    <p>
      Apakah tanda dan besarnya masuk akal untuk pasangan bermuatan
      berlawanan dalam vakum?
    </p>

    <textarea
      id="case4-interpretation"
      rows="5"
      placeholder="Tuliskan interpretasi hasil..."
    ></textarea>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Batas model
    </strong>

    <p>
      Tuliskan tiga hal yang belum dicakup oleh energi interaksi
      vertikal ini. Jelaskan mengapa nilai tersebut tidak boleh
      dilaporkan sebagai entalpi adsorpsi proton.
    </p>

    <textarea
      id="case4-model-limit"
      rows="6"
      placeholder="Tuliskan batas model dan alasan..."
    ></textarea>

  </div>

</div>
<!-- =========================================================
     C.6 KASUS 5 · RESPONS KISI LiF
     ========================================================= -->

<div class="worksheet-section">

  <div class="worksheet-section-title">

    <span>
      C.6
    </span>

    <div>
      <strong>
        Kasus 5 · respons kisi LiF
      </strong>

      <small>
        Perbandingan DFTB dan MACE
      </small>
    </div>

  </div>


  <div class="worksheet-question">

    <strong>
      Pertanyaan utama.
    </strong>

    <p>
      Bagaimana respons kisi LiF berubah terhadap lima faktor skala?
      Pisahkan perubahan akibat ukuran sistem, metode, suhu, dan
      kondisi simulasi sebelum menarik kesimpulan.
    </p>

  </div>


  <div class="worksheet-table">

    <div class="worksheet-table-header">

      <span>
        Faktor / besaran
      </span>

      <span>
        Isian peserta
      </span>

    </div>


    <label class="worksheet-table-row">

      <span>
        Ukuran sistem LiF
      </span>

      <input
        type="text"
        id="case5-system-size"
        placeholder="Masukkan ukuran sistem"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Metode yang digunakan
      </span>

      <input
        type="text"
        id="case5-method"
        placeholder="DFTB / MACE"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Suhu simulasi
      </span>

      <div class="input-unit">

        <input
          type="text"
          id="case5-temperature"
          placeholder="Masukkan suhu"
        >

        <em>
          K
        </em>

      </div>

    </label>


    <label class="worksheet-table-row">

      <span>
        Lama simulasi
      </span>

      <input
        type="text"
        id="case5-md-duration"
        placeholder="Masukkan lama simulasi"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Jumlah frame yang dianalisis
      </span>

      <input
        type="text"
        id="case5-frame-count"
        placeholder="Masukkan jumlah frame"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Parameter tekanan / kondisi kisi
      </span>

      <input
        type="text"
        id="case5-pressure-condition"
        placeholder="Masukkan kondisi"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Nama berkas hasil DFTB
      </span>

      <input
        type="text"
        id="case5-dftb-file"
        placeholder="Nama file"
      >

    </label>


    <label class="worksheet-table-row">

      <span>
        Nama checkpoint / model MACE
      </span>

      <input
        type="text"
        id="case5-mace-model"
        placeholder="Nama checkpoint / model"
      >

    </label>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Hasil pengamatan
    </strong>

    <p>
      Catat perubahan utama pada parameter kisi yang diperoleh dari
      masing-masing metode.
    </p>

    <textarea
      id="case5-lattice-change"
      rows="5"
      placeholder="Tuliskan hasil pengamatan..."
    ></textarea>

  </div>


  <div class="worksheet-table">

    <div class="worksheet-table-header">

      <span>
        Perbandingan
      </span>

      <span>
        Hasil
      </span>

    </div>


    <label class="worksheet-table-row">

      <span>
        Perbedaan kurva DFTB dan MACE
      </span>

      <textarea
        id="case5-dftb-mace-difference"
        rows="4"
        placeholder="Tuliskan perbedaan yang terlihat..."
      ></textarea>

    </label>


    <label class="worksheet-table-row">

      <span>
        Perubahan terhadap suhu
      </span>

      <textarea
        id="case5-temperature-response"
        rows="4"
        placeholder="Tuliskan hasil pengamatan..."
      ></textarea>

    </label>


    <label class="worksheet-table-row">

      <span>
        Perubahan terhadap ukuran sistem
      </span>

      <textarea
        id="case5-size-response"
        rows="4"
        placeholder="Tuliskan hasil pengamatan..."
      ></textarea>

    </label>


    <label class="worksheet-table-row">

      <span>
        Perubahan terhadap kondisi simulasi
      </span>

      <textarea
        id="case5-condition-response"
        rows="4"
        placeholder="Tuliskan hasil pengamatan..."
      ></textarea>

    </label>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Tafsirkan
    </strong>

    <p>
      Apakah perbedaan antara DFTB dan MACE dapat langsung dianggap
      sebagai perbedaan fisik? Jelaskan faktor lain yang harus
      dibandingkan sebelum membuat klaim.
    </p>

    <textarea
      id="case5-interpretation"
      rows="6"
      placeholder="Tuliskan interpretasi Anda..."
    ></textarea>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Syarat klaim
    </strong>

    <p>
      Tuliskan syarat yang harus dipenuhi sebelum menyatakan bahwa
      satu metode memberikan respons kisi yang berbeda secara fisik
      dari metode lainnya.
    </p>

    <textarea
      id="case5-claim-condition"
      rows="6"
      placeholder="Tuliskan syarat klaim..."
    ></textarea>

  </div>

</div>
<!-- =========================================================
     C.7 LAPORAN SINGKAT DAN DISKUSI KELOMPOK
     PART 6
     ========================================================= -->

<div class="worksheet-section">

  <div class="worksheet-section-title">

    <span>
      C.7
    </span>

    <div>
      <strong>
        Laporan singkat dan diskusi kelompok
      </strong>

      <small>
        Sintesis hasil praktikum
      </small>
    </div>

  </div>


  <div class="worksheet-question">

    <strong>
      Ringkas hasil utama dari setiap kasus.
    </strong>

    <p>
      Gunakan hasil yang telah Anda catat pada Kasus 1 sampai Kasus 5.
      Bedakan hasil yang berasal dari perhitungan, pengamatan visual,
      dan interpretasi.
    </p>

  </div>


  <div class="worksheet-table">

    <div class="worksheet-table-header">

      <span>
        Kasus
      </span>

      <span>
        Ringkasan hasil
      </span>

    </div>


    <label class="worksheet-table-row">

      <span>
        Kasus 1 · elektrolit LiPF<sub>6</sub>/EC
      </span>

      <textarea
        id="case7-summary-1"
        rows="4"
        placeholder="Ringkas hasil utama Kasus 1..."
      ></textarea>

    </label>


    <label class="worksheet-table-row">

      <span>
        Kasus 2 · antarmuka LiF–EC
      </span>

      <textarea
        id="case7-summary-2"
        rows="4"
        placeholder="Ringkas hasil utama Kasus 2..."
      ></textarea>

    </label>


    <label class="worksheet-table-row">

      <span>
        Kasus 3 · NEB CO pada Pt(111)
      </span>

      <textarea
        id="case7-summary-3"
        rows="4"
        placeholder="Ringkas hasil utama Kasus 3..."
      ></textarea>

    </label>


    <label class="worksheet-table-row">

      <span>
        Kasus 4 · ibuprofenat dan motif arginina
      </span>

      <textarea
        id="case7-summary-4"
        rows="4"
        placeholder="Ringkas hasil utama Kasus 4..."
      ></textarea>

    </label>


    <label class="worksheet-table-row">

      <span>
        Kasus 5 · respons kisi LiF
      </span>

      <textarea
        id="case7-summary-5"
        rows="4"
        placeholder="Ringkas hasil utama Kasus 5..."
      ></textarea>

    </label>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Pertanyaan diskusi
    </strong>

    <p>
      Besaran apa yang paling kuat mendukung kesimpulan Anda?
      Jelaskan alasan Anda berdasarkan hasil simulasi yang diperoleh.
    </p>

    <textarea
      id="case7-discussion-evidence"
      rows="5"
      placeholder="Tuliskan jawaban Anda..."
    ></textarea>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Ketidakpastian dan keterbatasan
    </strong>

    <p>
      Sebutkan hasil yang masih membutuhkan lintasan lebih panjang,
      perubahan parameter, ukuran sistem yang berbeda, atau pengujian
      metode lain sebelum kesimpulan yang lebih kuat dapat dibuat.
    </p>

    <textarea
      id="case7-uncertainty"
      rows="5"
      placeholder="Tuliskan ketidakpastian dan keterbatasan..."
    ></textarea>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Kesimpulan akhir
    </strong>

    <p>
      Tuliskan kesimpulan singkat berdasarkan seluruh kasus yang
      dianalisis. Batasi kesimpulan pada model, metode, parameter,
      dan lintasan yang benar-benar Anda analisis.
    </p>

    <textarea
      id="case7-final-conclusion"
      rows="7"
      placeholder="Tuliskan kesimpulan akhir..."
    ></textarea>

  </div>


  <div class="worksheet-reflection">

    <strong>
      Catatan kelompok
    </strong>

    <p>
      Catat pertanyaan, hasil diskusi, atau hal yang perlu diperiksa
      kembali setelah workshop.
    </p>

    <textarea
      id="case7-group-notes"
      rows="6"
      placeholder="Catatan kelompok..."
    ></textarea>

  </div>

</div>
<!-- =========================================================
     WORKSHEET COMPLETION
     ========================================================= -->

<div class="worksheet-completion-final">

  <div class="worksheet-completion-final-header">

    <strong>
      Worksheet selesai
    </strong>

    <span id="worksheet-final-completion">
      0 / 0 fields
    </span>

  </div>

  <p>
    Pastikan seluruh hasil telah diperiksa sebelum mengunduh
    atau menyimpan worksheet ke Google Drive.
  </p>

</div>
