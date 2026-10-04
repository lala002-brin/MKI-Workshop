<div class="mahameru-page session-1-page">

  <div class="mahameru-tabs">

    <a class="mahameru-tab" href="./index.md">
      Day 1
    </a>

    <a class="mahameru-tab active" href="./foundations.md">
      Foundations
    </a>

    <a class="mahameru-tab" href="./lipf6-ec.md">
      LiPF6 / EC
    </a>

    <a class="mahameru-tab" href="./md-analysis.md">
      MD Analysis
    </a>

    <a class="mahameru-tab" href="./lif-ec-interface.md">
      LiF / EC
    </a>

    <a class="mahameru-tab" href="./mace.md">
      MACE
    </a>

  </div>


  <header class="session-1-header">

    <div class="session-1-kicker">
      Persiapan peserta
    </div>

    <h1>
      Persiapan peserta
    </h1>

  </header>


  <section class="session-1-section">

    <div class="session-1-section-heading">

      <span class="session-1-number">
        1
      </span>

      <h2>
        Dari Windows ke HPC Mahameru
      </h2>

    </div>


    <div class="session-1-text">

      <p>
        Anda bekerja pada laptop Windows, tetapi perhitungan berlangsung di Linux HPC Mahameru.
        Termius menyediakan Terminal SSH untuk mengetik perintah Linux dan SFTP untuk memindahkan
        berkas. Unduh aplikasi dari laman resmi Termius untuk Windows. Siapkan nama pengguna,
        alamat host, port, serta kunci SSH atau cara autentikasi yang diberikan panitia.
        Alamat dan kredensial setiap peserta mengikuti informasi panitia; contoh ini tidak
        memakai alamat server rekaan. Tata letak tombol Termius dapat berubah menurut versi.
      </p>

    </div>


    <div class="session-1-subsection">

      <div class="session-1-subheading">

        <span>
          1.1
        </span>

        <h3>
          Langkah 1 — masuk dengan Termius
        </h3>

      </div>


      <ol class="session-1-instructions">

        <li>
          Pasang dan buka Termius di Windows. Pilih <em>New Host</em>.
        </li>

        <li>
          Isi <strong>Address</strong> dengan alamat Mahameru dari panitia,
          <strong>Username</strong> dengan akun pribadi, dan <strong>Port</strong>
          sesuai instruksi. Jika port tidak disebut, konfirmasikan ke fasilitator
          sebelum mengubah nilai bawaan SSH.
        </li>

        <li>
          Pada bagian autentikasi, pilih SSH key atau kata sandi sesuai kredensial
          yang benar-benar diberikan. Jika memakai kunci privat, impor kunci itu ke
          <strong>Keychain</strong> Termius lalu pilih untuk host ini. Jangan gunakan
          kunci privat di direktori HPC atau membagikannya.
        </li>

        <li>
          Simpan host, buka koneksi Terminal, dan cocokkan sidik jari host dengan
          informasi panitia saat koneksi pertama. Setelah masuk, ketik satu kotak
          perintah, lalu tekan Enter satu kali sebelum berpindah ke kotak perintah
          berikutnya.
        </li>

      </ol>


      <div class="session-1-command-list">

        <div class="session-1-command-card">

          <span class="session-1-command-number">
            01
          </span>

          <code>
            whoami
          </code>

          <button
            class="session-1-copy"
            type="button"
            onclick="copySession1Command(this)"
          >
            Copy
          </button>

        </div>


        <div class="session-1-command-card">

          <span class="session-1-command-number">
            02
          </span>

          <code>
            hostname
          </code>

          <button
            class="session-1-copy"
            type="button"
            onclick="copySession1Command(this)"
          >
            Copy
          </button>

        </div>


        <div class="session-1-command-card">

          <span class="session-1-command-number">
            03
          </span>

          <code>
            pwd
          </code>

          <button
            class="session-1-copy"
            type="button"
            onclick="copySession1Command(this)"
          >
            Copy
          </button>

        </div>


        <div class="session-1-command-card">

          <span class="session-1-command-number">
            04
          </span>

          <code>
            cd ~
          </code>

          <button
            class="session-1-copy"
            type="button"
            onclick="copySession1Command(this)"
          >
            Copy
          </button>

        </div>


        <div class="session-1-command-card">

          <span class="session-1-command-number">
            05
          </span>

          <code>
            pwd
          </code>

          <button
            class="session-1-copy"
            type="button"
            onclick="copySession1Command(this)"
          >
            Copy
          </button>

        </div>


        <div class="session-1-command-card">

          <span class="session-1-command-number">
            06
          </span>

          <code>
            ls
          </code>

          <button
            class="session-1-copy"
            type="button"
            onclick="copySession1Command(this)"
          >
            Copy
          </button>

        </div>

      </div>

    </div>

  </section>

</div>
<!-- =========================================================
     SESI 1
     HALAMAN PDF 6
     LANGKAH 2 — UNGGAH PAKET DENGAN SFTP
     ========================================================= -->

<div class="session-1-continuation">

  <div class="session-1-note-text">

    <p>
      <strong>whoami</strong> harus menunjukkan akun Anda.
      <strong>hostname</strong> menunjukkan komputer tempat Terminal berada.
      <strong>cd</strong> berpindah ke direktori pribadi di Linux;
      <strong>pwd</strong> mencetak lokasinya.
      Perintah dalam kotak berbningkai hijau selalu diketik di Terminal Linux,
      kecuali langkah yang secara khusus menyebut SFTP Windows.
      Jangan mengetik tanda prompt seperti <code>$</code>.
      Jika perintah panjang tampak terbungkus menjadi dua baris oleh tata letak PDF,
      keduanya tetap satu perintah: ketik sampai akhir lalu tekan Enter setelah lengkap.
    </p>

  </div>


  <section class="session-1-section">

    <div class="session-1-subheading">

      <span>
        1.2
      </span>

      <h3>
        Langkah 2 — unggah paket dengan SFTP
      </h3>

    </div>


    <div class="session-1-text">

      <p>
        Simpan <strong>Paket_Workshop_BRIN_2026.zip</strong> pada folder
        <strong>Downloads</strong> di Windows. Pada Terminal Linux,
        buat tempat kerja:
      </p>

    </div>


    <div class="session-1-command-list">

      <div class="session-1-command-card">

        <span class="session-1-command-number">
          01
        </span>

        <code>cd ~</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>


      <div class="session-1-command-card">

        <span class="session-1-command-number">
          02
        </span>

        <code>mkdir -p latihan_simulasi</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>


      <div class="session-1-command-card">

        <span class="session-1-command-number">
          03
        </span>

        <code>pwd</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>

    </div>


    <div class="session-1-text session-1-text-spaced">

      <p>
        Di Termius, buka <em>SFTP/file transfer</em> untuk host Mahameru yang sama.
        Panel local menunjuk ke laptop Windows; buka
        <code>C:\Users\NAMA_ANDA\Downloads</code>.
        Panel remote menunjuk ke Linux; buka direktori pribadi yang ditampilkan
        <code>pwd</code>, lalu <code>latihan_simulasi</code>.
        Seret berkas ZIP dari panel local ke remote atau gunakan perintah
        <em>Upload</em>. Tunggu sampai transfer selesai. Pada Terminal Linux,
        periksa ukuran lalu ekstrak:
      </p>

    </div>


    <div class="session-1-command-list">

      <div class="session-1-command-card">

        <span class="session-1-command-number">
          04
        </span>

        <code>cd ~/latihan_simulasi</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>


      <div class="session-1-command-card">

        <span class="session-1-command-number">
          05
        </span>

        <code>ls -lh Paket_Workshop_BRIN_2026.zip</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>


      <div class="session-1-command-card">

        <span class="session-1-command-number">
          06
        </span>

        <code>unzip -q Paket_Workshop_BRIN_2026.zip</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>


      <div class="session-1-command-card">

        <span class="session-1-command-number">
          07
        </span>

        <code>cd workshop_material</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>


      <div class="session-1-command-card">

        <span class="session-1-command-number">
          08
        </span>

        <code>pwd</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>


      <div class="session-1-command-card">

        <span class="session-1-command-number">
          09
        </span>

        <code>ls</code>

        <button
          class="session-1-copy"
          type="button"
          onclick="copySession1Command(this)"
        >
          Copy
        </button>

      </div>

    </div>


    <div class="session-1-note">

      <p>
        Hasil <code>pwd</code> harus berakhir dengan
        <code>latihan_simulasi/workshop_material</code>.
        <code>ls</code> seharusnya menunjukkan
        <code>katalog</code>, <code>skrip</code>, <code>parameter</code>,
        dan <code>PDF</code> jika belum tersedia.
        Panitia menyediakan program tersebut atau unggah folder
        <code>workshop_material</code> langsung dengan SFTP.
        Jika panitia telah menaruh folder itu di akun Anda,
        jalankan <code>cp -R /workshop_material ~/latihan_simulasi/</code>
        sebagai ganti langkah unggah dan ekstrak.
      </p>

    </div>

  </section>

</div>
<!-- =========================================================
     SESI 1
     LANGKAH 3 — PERIKSA LINGKUNGAN LINUX
     ========================================================= -->

<section class="session-1-section session-1-section-next">

  <div class="session-1-subheading">

    <span>
      1.3
    </span>

    <h3>
      Langkah 3 — periksa lingkungan Linux
    </h3>

  </div>


  <div class="session-1-command-list">

    <div class="session-1-command-card">

      <span class="session-1-command-number">
        01
      </span>

      <code>cd ~/latihan_simulasi/workshop_material</code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        02
      </span>

      <code>python --version</code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        03
      </span>

      <code>python skrip/cek_paket.py</code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        04
      </span>

      <code>command -v dftb_serial.00.x</code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        05
      </span>

      <code>command -v sbatch</code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        06
      </span>

      <code>ls parameter</code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>

  </div>


  <div class="session-1-note">

    <p>
      Skrip pemeriksa memeriksa kelengkapan paket, model MACE, dan pustaka Python.
      Jika <code>python</code> tidak ditemukan, coba <code>python3</code> dan gunakan
      nama itu untuk semua contoh berikutnya. Biner DCDFTBMD, set Slater–Koster,
      serta environment Python untuk MACE disediakan sesuai pengaturan panitia;
      catat pesan yang belum lengkap lalu tanyakan perintah
      <code>module load</code> atau aktivasi environment yang berlaku.
      Panduan kebijakan Mahameru tersedia pada dokumen resmi BRIN.
    </p>

  </div>


  <div class="session-1-info">

    <div class="session-1-info-title">
      Perintah dasar
    </div>

    <p>
      <code>cd</code> berpindah direktori,
      <code>ls</code> melihat berkas,
      <code>cat</code> membaca berkas pendek,
      <code>less</code> membaca berkas panjang
      (tekan <code>q</code> untuk keluar),
      <code>mkdir</code> membuat direktori,
      dan <code>cp</code> menyalin berkas.
    </p>

  </div>


  <div class="session-1-note">

    <p>
      Direktori
      <code>~/latihan_simulasi/workshop_material</code>
      menjadi titik awal semua perintah praktikum,
      kecuali bila disebut lain.
    </p>

  </div>

</section>
<!-- =========================================================
     SESI 1
     LANGKAH 4 — KIRIM PERHITUNGAN KE NODE KOMPUTASI
     ========================================================= -->

<section class="session-1-section session-1-section-next">

  <div class="session-1-subheading">

    <span>
      1.4
    </span>

    <h3>
      Langkah 4 — kirim perhitungan ke node komputasi
    </h3>

  </div>


  <div class="session-1-text">

    <p>
      Terminal setelah login dipakai untuk menyiapkan dan memeriksa berkas.
      Perhitungan DFTB/MD atau MACE yang memakan waktu dikirim melalui
      job scheduler Slurm.
    </p>

    <p>
      Contoh berikut memakai partisi <code>short</code> sebagaimana tercantum
      dalam kebijakan Mahameru. Ikuti pengaturan terbaru dari fasilitator
      untuk partisi, waktu, dan kuota.
    </p>

    <p>
      Setelah membuat input kasus 1 pada bab praktikum, jalankan:
    </p>

  </div>


  <div class="session-1-command-list">

    <div class="session-1-command-card">

      <span class="session-1-command-number">
        01
      </span>

      <code>
        cd ~/latihan_simulasi/workshop_material
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        02
      </span>

      <code>
        sbatch skrip/job_dftb_slurm.sh proyek_pribadi/lipf6_ec
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        03
      </span>

      <code>
        squeue -u $(whoami)
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>

  </div>


  <div class="session-1-info">

    <div class="session-1-info-title">
      Memahami status job
    </div>

    <p>
      <code>sbatch</code> mencetak nomor job.
      <code>squeue</code> menampilkan status menunggu atau berjalan.
    </p>

  </div>


  <div class="session-1-text">

    <p>
      Ketika job hilang dari daftar, lihat log:
    </p>

  </div>


  <div class="session-1-command-list">

    <div class="session-1-command-card">

      <span class="session-1-command-number">
        04
      </span>

      <code>
        ls -lt slurm-*.out
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        05
      </span>

      <code>
        tail -n 30 slurm-NOMOR_JOB.out
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        06
      </span>

      <code>
        ls -lh proyek_pribadi/lipf6_ec/traject
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>

  </div>


  <div class="session-1-note">

    <p>
      Ganti <code>NOMOR_JOB</code> dengan angka dari <code>sbatch</code>.
      Jika job gagal, baca log dahulu. Jangan menganggap tidak muncul di
      <code>squeue</code> berarti berhasil.
    </p>

  </div>


  <div class="session-1-note">

    <p>
      Contoh <code>--jalankan</code> pada bab kasus dipakai di dalam job
      atau alokasi komputasi, bukan langsung di node login.
      Analisis CSV yang singkat dapat dilakukan sesudah keluaran MD tersedia.
    </p>

  </div>


  <div class="session-1-info">

    <div class="session-1-info-title">
      Catatan Slurm
    </div>

    <p>
      Contoh Slurm resmi dari kegiatan HPC Mahameru dapat dilihat pada
      repositori pelatihan Mahameru.
    </p>

  </div>

</section>
<!-- =========================================================
     SESI 1
     LANGKAH 5 — UNDUH KELUARAN KE WINDOWS
     ========================================================= -->

<section class="session-1-section">

  <div class="session-1-subheading">

    <span>
      1.5
    </span>

    <h3>
      Langkah 5 — unduh keluaran ke Windows
    </h3>

  </div>


  <div class="session-1-text">

    <p>
      Setelah analisis kasus 1, periksa nama hasil di Terminal Linux:
    </p>

  </div>


  <div class="session-1-command-list">

    <div class="session-1-command-card">

      <span class="session-1-command-number">
        01
      </span>

      <code>
        cd ~/latihan_simulasi/workshop_material
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        02
      </span>

      <code>
        ls -lh proyek_pribadi/lipf6_ec/*.csv
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        03
      </span>

      <code>
        ls -lh proyek_pribadi/lipf6_ec/*.png
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>


    <div class="session-1-command-card">

      <span class="session-1-command-number">
        04
      </span>

      <code>
        ls -lh proyek_pribadi/lipf6_ec/hasil.log
      </code>

      <button
        class="session-1-copy"
        type="button"
        onclick="copySession1Command(this)"
      >
        Copy
      </button>

    </div>

  </div>


  <div class="session-1-info">

    <div class="session-1-info-title">
      Siapkan folder hasil di Windows
    </div>

    <p>
      Di Windows, buat folder
      <code>Downloads\hasil_workshop</code>.
    </p>

  </div>


  <div class="session-1-text">

    <p>
      Buka SFTP Termius untuk host yang sama.
      Pada panel remote, telusuri:
    </p>

  </div>


  <div class="session-1-path-box">

    <code>
      latihan_simulasi/workshop_material/proyek_pribadi/lipf6_ec
    </code>

  </div>


  <div class="session-1-text">

    <p>
      Pada panel local, buka:
    </p>

  </div>


  <div class="session-1-path-box">

    <code>
      Downloads\hasil_workshop
    </code>

  </div>


  <div class="session-1-text">

    <p>
      Pilih CSV, PNG, <code>dftb.inp</code>, dan
      <code>hasil.log</code>. Gunakan Download atau seret
      berkas ke panel local.
    </p>

    <p>
      Untuk menyimpan lintasan lengkap, unduh juga
      <code>traject</code> dan <code>mulliken</code>,
      yang dapat berukuran jauh lebih besar.
    </p>

  </div>


  <div class="session-1-info">

    <div class="session-1-info-title">
      Setelah transfer selesai
    </div>

    <p>
      Buka PNG atau CSV dengan aplikasi Windows setelah
      transfer selesai.
    </p>

    <p>
      Path <code>C:\Users</code> merupakan path Windows dan
      tidak diketik dalam Terminal Linux.
    </p>

    <p>
      Termius mendukung SFTP dan transfer berkas langsung.
    </p>

  </div>


  <div class="session-1-note">

    <p>
      Jika koneksi putus, sambungkan kembali host di Termius.
      Berkas dan job yang sudah dikirim tetap berada di Mahameru.
      Periksa <code>squeue</code> dan log sebelum mengirim ulang.
    </p>

  </div>


  <div class="session-1-note">

    <p>
      Simpan hasil penting pada direktori pribadi dan unduh
      salinannya setelah sesi.
    </p>

  </div>

</section>
<!-- =========================================================
     SESI 1
     BAGIAN 2 — HASIL BELAJAR DAN RANGKAIAN KEGIATAN
     ========================================================= -->

<section class="session-1-learning">

  <div class="session-1-section-heading">

    <div class="session-1-section-number">
      02
    </div>

    <div class="session-1-section-heading-text">

      <span>
        HASIL BELAJAR
      </span>

      <h2>
        Hasil belajar dan rangkaian kegiatan
      </h2>

    </div>

  </div>


  <div class="session-1-learning-intro">

    <p>
      Setelah mengikuti kegiatan ini, Anda dapat:
    </p>

  </div>


  <div class="session-1-learning-grid">

    <div class="session-1-learning-card">

      <div class="session-1-learning-number">
        01
      </div>

      <div>
        <strong>
          Membaca dan menyusun
        </strong>

        <p>
          <code>dftb.inp</code>
        </p>
      </div>

    </div>


    <div class="session-1-learning-card">

      <div class="session-1-learning-number">
        02
      </div>

      <div>
        <strong>
          Menjelaskan SCC-DFTB
        </strong>

        <p>
          serta parameter Slater–Koster.
        </p>
      </div>

    </div>


    <div class="session-1-learning-card">

      <div class="session-1-learning-number">
        03
      </div>

      <div>
        <strong>
          Menyiapkan simulasi MD
        </strong>

        <p>
          elektrolit.
        </p>

      </div>

    </div>


    <div class="session-1-learning-card">

      <div class="session-1-learning-number">
        04
      </div>

      <div>
        <strong>
          Menganalisis
        </strong>

        <p>
          RDF, koordinasi, MSD, dan muatan.
        </p>

      </div>

    </div>


    <div class="session-1-learning-card">

      <div class="session-1-learning-number">
        05
      </div>

      <div>
        <strong>
          Mengestimasi difusi
        </strong>

        <p>
          dan konduktivitas ion ideal serta
          menilai lintasan NEB dan energi
          interaksi molekul.
        </p>

      </div>

    </div>


    <div class="session-1-learning-card">

      <div class="session-1-learning-number">
        06
      </div>

      <div>
        <strong>
          Membandingkan respons LiF
        </strong>

        <p>
          dari DFTB dan MACE.
        </p>

      </div>

    </div>

  </div>


  <!-- =====================================================
       RANGKAIAN KEGIATAN
       ===================================================== -->

  <div class="session-1-activity">

    <div class="session-1-activity-heading">

      <span>
        06 OKTOBER 2026
      </span>

      <h3>
        Waktu dan rangkaian kegiatan
      </h3>

    </div>


    <div class="session-1-schedule">


      <div class="session-1-schedule-row">

        <div class="session-1-schedule-time">
          08.45–09.30
        </div>

        <div class="session-1-schedule-duration">
          45 menit
        </div>

        <div class="session-1-schedule-content">

          <strong>
            Sesi 1
          </strong>

          <p>
            Pengantar sains material komputasi,
            hubungan DFT, DFTB, dan MD
          </p>

        </div>

      </div>


      <div class="session-1-schedule-row">

        <div class="session-1-schedule-time">
          10.30–12.00
        </div>

        <div class="session-1-schedule-duration">
          90 menit
        </div>

        <div class="session-1-schedule-content">

          <strong>
            Sesi 3
          </strong>

          <p>
            Praktik input DCDFTBMD dan MD elektrolit
            LiPF6/ethylene carbonate
          </p>

        </div>

      </div>


      <div class="session-1-schedule-row">

        <div class="session-1-schedule-time">
          13.00–14.30
        </div>

        <div class="session-1-schedule-duration">
          90 menit
        </div>

        <div class="session-1-schedule-content">

          <strong>
            Sesi 4
          </strong>

          <p>
            Analisis RDF, koordinasi, MSD/transport,
            muatan, dan antarmuka LiF–EC
          </p>

        </div>

      </div>


      <div class="session-1-schedule-row">

        <div class="session-1-schedule-time">
          14.30–15.15
        </div>

        <div class="session-1-schedule-duration">
          45 menit
        </div>

        <div class="session-1-schedule-content">

          <strong>
            Sesi 5
          </strong>

          <p>
            Pendekatan pemodelan berbasis AI (MACE)
          </p>

        </div>

      </div>


      <div class="session-1-schedule-row">

        <div class="session-1-schedule-time">
          15.45–16.30
        </div>

        <div class="session-1-schedule-duration">
          45 menit
        </div>

        <div class="session-1-schedule-content">

          <strong>
            Sesi 6
          </strong>

          <p>
            Studi kasus material, katalisis, baterai,
            dan biomedis
          </p>

        </div>

      </div>


    </div>

  </div>


  <!-- =====================================================
       CARA MENGGUNAKAN BUKU KERJA
       ===================================================== -->

  <div class="session-1-guide">

    <div class="session-1-guide-label">
      CARA MENGGUNAKAN BUKU KERJA
    </div>


    <div class="session-1-guide-content">

      <p>
        Mulai dari persiapan akun dan pembuatan input MD
        elektrolit LiPF6/ethylene carbonate.
      </p>

      <p>
        Sesi praktik berikutnya menganalisis RDF,
        koordinasi Li–O/Li–F, MSD, estimasi transport,
        muatan Mulliken, dan interaksi EC dengan
        permukaan LiF.
      </p>

      <p>
        Studi lanjutan membahas migrasi CO pada Pt,
        interaksi ibuprofenat dengan motif arginina,
        serta respons kisi LiF menggunakan MACE.
      </p>

      <p>
        Lembar kerja membantu Anda mencatat angka dari
        komputer sendiri; lampiran berisi kode lengkap
        untuk dibaca kembali setelah kelas.
      </p>

    </div>

  </div>


  <!-- =====================================================
       CATATAN PESERTA
       ===================================================== -->

  <div class="session-1-save-note">

    <div class="session-1-save-icon">
      ✓
    </div>

    <div>

      <strong>
        Simpan hasil setiap latihan
      </strong>

      <p>
        Simpan struktur, pengaturan metode, energi,
        dan gaya dari setiap latihan.
      </p>

      <p>
        Catatan tersebut membantu Anda mengikuti diskusi
        komputasi HPC dan membandingkan hasilnya dengan
        perhitungan DFT menggunakan Quantum ESPRESSO
        pada sesi berikutnya.
      </p>

    </div>

  </div>


  <!-- =====================================================
       PRASYARAT
       ===================================================== -->

  <div class="session-1-prerequisite">

    <div class="session-1-prerequisite-label">
      PRASYARAT
    </div>


    <div class="session-1-prerequisite-content">

      <p>
        Pemahaman sederhana mengenai atom dan molekul.
        Perintah Terminal dan pustaka Python yang dipakai
        akan diperkenalkan selangkah demi selangkah.
      </p>

      <p>
        Untuk perhitungan DCDFTBMD diperlukan program dan
        parameter Slater–Koster yang sesuai.
      </p>

      <p>
        Halaman unduhan resmi DCDFTBMD menyebut biner
        siap pakai Linux x86_64 dan proses lisensi akademik.
      </p>

      <p>
        Untuk latihan MACE tersedia model MACE-MP-0 small
        dan studi persamaan keadaan LiF.
      </p>

    </div>

  </div>

</section>
