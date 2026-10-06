<div class="access-linux">

<!-- =====================================================
     HERO
     ===================================================== -->

<section class="access-hero">

  <div class="access-kicker">
    MODUL 01 · GETTING STARTED
  </div>

  <h1>
    Memulai Bekerja di HPC
  </h1>

  <p class="access-hero-lead">
    Sebelum menjalankan simulasi, Anda perlu memahami bagaimana
    komputer lokal terhubung dengan HPC, bagaimana autentikasi SSH
    bekerja, bagaimana sistem Linux mengorganisasi file, dan bagaimana
    memilih lokasi penyimpanan yang sesuai.
  </p>

  <p class="access-hero-lead">
    Modul ini memandu Anda dari koneksi pertama hingga workspace
    penelitian siap digunakan. Fokusnya bukan sekadar menghafal
    command, tetapi memahami apa yang dilakukan setiap langkah
    dan mengapa langkah tersebut diperlukan.
  </p>

  <div class="access-hero-info">

    <div>
      <strong>Yang akan dipelajari</strong>
      <span>
        SSH, Termius, SSH key, terminal, Linux,
        filesystem, storage, dan workspace.
      </span>
    </div>

    <div>
      <strong>Untuk siapa?</strong>
      <span>
        Peserta yang baru mulai bekerja dengan HPC
        dan lingkungan Linux.
      </span>
    </div>

    <div>
      <strong>Target akhir</strong>
      <span>
        Mampu masuk ke HPC, memeriksa lingkungan kerja,
        dan menyiapkan workspace untuk calculation.
      </span>
    </div>

  </div>

</section>


<!-- =====================================================
     BIG PICTURE
     ===================================================== -->

<section class="access-introduction">

  <div class="access-section-label">
    BIG PICTURE
  </div>

  <h2>
    Apa sebenarnya yang terjadi ketika Anda menggunakan HPC?
  </h2>

  <p>
    HPC bukan sekadar komputer dengan prosesor yang lebih cepat.
    HPC merupakan lingkungan komputasi bersama yang digunakan oleh
    banyak pengguna. Di dalamnya terdapat login node, filesystem,
    storage, software environment, scheduler, dan compute node.
  </p>

  <p>
    Komputer atau laptop Anda berfungsi sebagai titik akses.
    Anda terhubung ke HPC melalui jaringan, kemudian bekerja pada
    lingkungan Linux yang disediakan oleh cluster. Calculation
    selanjutnya berjalan pada resource HPC sesuai mekanisme yang
    ditetapkan oleh sistem.
  </p>

  <p>
    Karena itu, memahami cara mengakses HPC menjadi bagian penting
    dari computational workflow. Peserta tidak hanya perlu mengetahui
    command, tetapi juga memahami di mana command tersebut dijalankan,
    file apa yang digunakan, dan resource apa yang akan digunakan.
  </p>

  <div class="access-principle">

    <strong>
      Cara berpikir yang perlu dibangun
    </strong>

    <span>
      Laptop → SSH → Login HPC → Workspace →
      Software → Scheduler → Compute Node →
      Calculation → Output → Analisis
    </span>

  </div>

</section>


<!-- =====================================================
     CONNECTION OPTIONS
     ===================================================== -->

<section class="access-section">

  <div class="access-section-label">
    PILIHAN AKSES
  </div>

  <h2>
    Bagaimana cara terhubung ke HPC?
  </h2>

  <p>
    SSH merupakan mekanisme utama untuk mengakses sistem Linux
    secara remote. Namun, SSH dapat digunakan melalui beberapa
    aplikasi. Anda dapat menggunakan terminal bawaan sistem operasi,
    Termius, atau editor yang mendukung koneksi SSH seperti
    VS Code Remote SSH.
  </p>

  <p>
    Perbedaan utama terletak pada cara aplikasi mengelola koneksi,
    SSH key, transfer file, dan pengeditan file. Prinsip HPC tetap
    sama. Apa pun aplikasi yang digunakan, peserta tetap perlu
    memahami Linux, filesystem, scheduler, dan workflow calculation.
  </p>


  <div class="access-option-grid">

    <div class="access-option">

      <div class="access-option-icon">
        01
      </div>

      <h3>
        Terminal bawaan
      </h3>

      <p>
        macOS dan sebagian besar distribusi Linux sudah menyediakan
        SSH melalui terminal. Windows modern juga menyediakan OpenSSH
        melalui PowerShell atau Windows Terminal.
      </p>

      <div class="access-pros">
        <strong>Kelebihan</strong>
        <span>
          Ringan, sederhana, gratis, mudah digunakan untuk scripting,
          automation, dan workflow HPC.
        </span>
      </div>

      <div class="access-cons">
        <strong>Keterbatasan</strong>
        <span>
          Pengelolaan banyak koneksi dan transfer file membutuhkan
          command tambahan atau aplikasi pendukung.
        </span>
      </div>

      <div class="access-best">
        <strong>Cocok untuk</strong>
        <span>
          Peserta yang ingin memahami Linux dan workflow HPC
          secara langsung melalui terminal.
        </span>
      </div>

    </div>


    <div class="access-option access-option-featured">

      <div class="access-option-icon">
        02
      </div>

      <h3>
        Termius
      </h3>

      <p>
        Termius merupakan SSH client dengan antarmuka grafis.
        Aplikasi ini dapat membantu pengelolaan host, koneksi SSH,
        SSH key, dan transfer file melalui SFTP.
      </p>

      <div class="access-pros">
        <strong>Kelebihan</strong>
        <span>
          Lebih mudah untuk menyimpan konfigurasi host, mengelola
          koneksi, dan melakukan transfer file.
        </span>
      </div>

      <div class="access-cons">
        <strong>Keterbatasan</strong>
        <span>
          Termius tidak menggantikan pemahaman terhadap Linux,
          filesystem, command, scheduler, dan workflow HPC.
        </span>
      </div>

      <div class="access-best">
        <strong>Cocok untuk</strong>
        <span>
          Peserta yang ingin menggunakan antarmuka lebih mudah
          untuk mengelola koneksi HPC.
        </span>
      </div>

    </div>


    <div class="access-option">

      <div class="access-option-icon">
        03
      </div>

      <h3>
        VS Code Remote SSH
      </h3>

      <p>
        VS Code Remote SSH memungkinkan pengguna bekerja pada
        environment remote melalui editor yang familiar. Pendekatan
        ini berguna ketika project memiliki banyak script dan file input.
      </p>

      <div class="access-pros">
        <strong>Kelebihan</strong>
        <span>
          Editing script, input, dan konfigurasi menjadi lebih nyaman.
        </span>
      </div>

      <div class="access-cons">
        <strong>Keterbatasan</strong>
        <span>
          Setup awal lebih kompleks dan tetap membutuhkan pemahaman
          SSH serta Linux.
        </span>
      </div>

      <div class="access-best">
        <strong>Cocok untuk</strong>
        <span>
          Pengguna yang sudah nyaman dengan Linux dan ingin
          menggabungkan terminal dengan code editor.
        </span>
      </div>

    </div>

  </div>

</section>


<!-- =====================================================
     DECISION GUIDE
     ===================================================== -->

<section class="access-decision">

  <div class="access-section-label">
    PILIHAN PRAKTIS
  </div>

  <h2>
    Alat mana yang sebaiknya digunakan?
  </h2>

  <p>
    Tidak ada satu aplikasi yang selalu paling baik. Pilihan
    bergantung pada sistem operasi, pengalaman pengguna, kebutuhan
    transfer file, dan kenyamanan bekerja melalui terminal.
  </p>

  <div class="access-decision-grid">

    <div>
      <strong>
        Jika baru belajar HPC
      </strong>
      <span>
        Termius dapat membantu mempermudah koneksi. Namun, tetap
        ikuti latihan command Linux agar Anda memahami apa yang
        terjadi di balik antarmuka aplikasi.
      </span>
    </div>

    <div>
      <strong>
        Jika menggunakan macOS atau Linux
      </strong>
      <span>
        Terminal bawaan sudah cukup untuk sebagian besar
        workflow HPC.
      </span>
    </div>

    <div>
      <strong>
        Jika menggunakan Windows
      </strong>
      <span>
        Windows Terminal atau PowerShell dengan OpenSSH dapat
        digunakan. Termius menjadi alternatif dengan antarmuka grafis.
      </span>
    </div>

    <div>
      <strong>
        Jika sering mengedit script
      </strong>
      <span>
        VS Code Remote SSH dapat dipertimbangkan setelah Anda
        memahami SSH dan Linux.
      </span>
    </div>

  </div>

  <div class="access-rule">

    <strong>
      Prinsip workshop
    </strong>

    <span>
      Gunakan aplikasi yang membuat Anda nyaman, tetapi pastikan
      Anda tetap memahami workflow yang sama melalui terminal.
    </span>

  </div>

</section>


<!-- =====================================================
     TERMIUS
     ===================================================== -->

<section class="access-panel">

  <div class="access-panel-head">

    <div class="access-panel-title">

      <span class="access-number">
        01
      </span>

      <div>

        <div class="access-panel-kicker">
          OPSI GUI
        </div>

        <h2>
          Menggunakan Termius
        </h2>

      </div>

    </div>

    <span class="access-badge">
      SSH + SFTP
    </span>

  </div>


  <p class="access-panel-description">
    Termius dapat digunakan sebagai alternatif antarmuka untuk
    mengakses HPC. Aplikasi ini membantu mengelola host, terminal SSH,
    SSH key, dan transfer file melalui SFTP.
  </p>

  <div class="access-step-grid">

    <div>
      <span>01</span>

      <strong>
        Buat Host
      </strong>

      <p>
        Masukkan hostname HPC dan informasi koneksi yang diberikan
        administrator.
      </p>
    </div>

    <div>
      <span>02</span>

      <strong>
        Atur Username
      </strong>

      <p>
        Gunakan username HPC yang telah diberikan kepada Anda.
      </p>
    </div>

    <div>
      <span>03</span>

      <strong>
        Atur SSH Key
      </strong>

      <p>
        Pilih private key sesuai mekanisme autentikasi yang
        ditetapkan administrator.
      </p>
    </div>

    <div>
      <span>04</span>

      <strong>
        Connect
      </strong>

      <p>
        Uji koneksi dan pastikan Anda mendapatkan shell
        pada sistem HPC.
      </p>
    </div>

  </div>


  <div class="access-command">

    <span>
      KONSEP YANG TETAP SAMA
    </span>

    <pre><code>ssh username@hostname</code></pre>

    <p>
      Walaupun Anda menggunakan Termius, koneksi tetap menggunakan
      mekanisme SSH. Karena itu, memahami command SSH tetap penting.
    </p>

  </div>


  <div class="access-note">

    <strong>
      Aplikasi membantu akses, tetapi tidak menggantikan Linux
    </strong>

    <p>
      Termius dapat mempermudah koneksi dan transfer file.
      Namun, command seperti <code>pwd</code>, <code>ls</code>,
      <code>cd</code>, <code>mkdir</code>, <code>cp</code>,
      dan <code>mv</code> tetap perlu dipahami.
    </p>

  </div>

</section>


<!-- =====================================================
     SSH KEY
     ===================================================== -->

<section class="access-panel">

  <div class="access-panel-head">

    <div class="access-panel-title">

      <span class="access-number">
        02
      </span>

      <div>

        <div class="access-panel-kicker">
          AUTHENTICATION
        </div>

        <h2>
          Memahami SSH Key
        </h2>

      </div>

    </div>

    <span class="access-badge">
      SECURITY
    </span>

  </div>


  <p class="access-panel-description">
    SSH key menggunakan pasangan kunci yang terdiri dari public key
    dan private key. Public key dapat ditempatkan pada sistem yang
    memberikan akses, sedangkan private key tetap berada pada perangkat
    pengguna.
  </p>

  <p class="access-panel-description">
    Dalam workflow yang menggunakan SSH key, private key berfungsi
    sebagai credential. Karena itu, peserta harus memperlakukannya
    seperti informasi autentikasi yang bersifat pribadi.
  </p>


  <div class="access-key-grid">

    <div>

      <strong>
        Public Key
      </strong>

      <span>
        Dapat diberikan kepada administrator atau sistem sesuai
        prosedur akses yang berlaku.
      </span>

    </div>

    <div class="access-key-private">

      <strong>
        Private Key
      </strong>

      <span>
        Harus tetap rahasia dan tidak boleh dibagikan kepada
        peserta lain.
      </span>

    </div>

  </div>


  <div class="access-command">

    <span>
      MEMERIKSA KEY YANG TERSEDIA
    </span>

    <pre><code>ls -la ~/.ssh/</code></pre>

  </div>


  <div class="access-note access-note-warning">

    <strong>
      Lindungi private key
    </strong>

    <p>
      Jangan mengunggah private key ke repository Git, mengirimkannya
      melalui chat, atau memasukkannya ke dokumentasi. Jika key hilang
      atau terindikasi bocor, ikuti prosedur keamanan administrator HPC.
    </p>

  </div>

</section>


<!-- =====================================================
     BEFORE CONNECTING
     ===================================================== -->

<section class="access-section">

  <div class="access-section-label">
    SEBELUM CONNECT
  </div>

  <h2>
    Periksa koneksi sebelum login
  </h2>

  <p>
    Koneksi SSH tidak hanya bergantung pada username dan hostname.
    Akses juga dapat dipengaruhi oleh jaringan, VPN, firewall,
    port, autentikasi, dan kebijakan akses institusi.
  </p>

  <p>
    Karena itu, ketika koneksi gagal, jangan langsung mengubah
    command secara acak. Periksa informasi koneksi yang diberikan
    administrator dan identifikasi bagian mana yang bermasalah.
  </p>


  <div class="access-check-grid">

    <div>
      <span>01</span>

      <strong>
        Network
      </strong>

      <p>
        Pastikan perangkat memiliki koneksi internet atau jaringan
        institusi yang diperlukan.
      </p>
    </div>

    <div>
      <span>02</span>

      <strong>
        VPN
      </strong>

      <p>
        Jika akses membutuhkan jaringan tertentu, aktifkan VPN
        sesuai instruksi administrator.
      </p>
    </div>

    <div>
      <span>03</span>

      <strong>
        Hostname
      </strong>

      <p>
        Pastikan alamat server benar. Jangan menebak hostname.
      </p>
    </div>

    <div>
      <span>04</span>

      <strong>
        SSH Key
      </strong>

      <p>
        Pastikan private key tersedia dan path menuju key benar.
      </p>
    </div>

    <div>
      <span>05</span>

      <strong>
        Username
      </strong>

      <p>
        Pastikan username sesuai dengan akun HPC yang diberikan.
      </p>
    </div>

    <div>
      <span>06</span>

      <strong>
        Kebijakan akses
      </strong>

      <p>
        Ikuti aturan koneksi dan penggunaan resource yang diberikan
        administrator.
      </p>
    </div>

  </div>

</section>


<!-- =====================================================
     CONNECT TO HPC
     ===================================================== -->

<section class="access-panel access-login-panel">

  <div class="access-panel-head">

    <div class="access-panel-title">

      <span class="access-number">
        03
      </span>

      <div>

        <div class="access-panel-kicker">
          FIRST CONNECTION
        </div>

        <h2>
          Login ke HPC melalui SSH
        </h2>

      </div>

    </div>

    <span class="access-badge">
      SSH
    </span>

  </div>


  <p class="access-panel-description">
    Setelah perangkat, username, hostname, dan private key siap,
    Anda dapat membuat koneksi ke login node HPC melalui SSH.
    Command berikut dijalankan pada terminal komputer Anda,
    bukan setelah Anda berada di dalam HPC.
  </p>


  <div class="access-command">

    <span>
      FORMAT LOGIN
    </span>

    <pre><code>ssh -i ~/path-to-folder/wsxxx_user_id wxxx@login2.hpc.brin.go.id</code></pre>

  </div>


  <div class="access-command">

    <span>
      CONTOH · PESERTA ws012
    </span>

    <pre><code>ssh -i ~/path-to-folder/ws012_user_id ws012@login2.hpc.brin.go.id</code></pre>

  </div>


  <div class="access-step-grid">

    <div>

      <span>01</span>

      <strong>
        ssh
      </strong>

      <p>
        Menjalankan koneksi remote menggunakan protokol SSH.
      </p>

    </div>

    <div>

      <span>02</span>

      <strong>
        -i
      </strong>

      <p>
        Menentukan private key yang digunakan untuk autentikasi.
      </p>

    </div>

    <div>

      <span>03</span>

      <strong>
        ws012
      </strong>

      <p>
        Username HPC. Ganti dengan username yang diberikan
        kepada Anda.
      </p>

    </div>

    <div>

      <span>04</span>

      <strong>
        login2.hpc.brin.go.id
      </strong>

      <p>
        Hostname login node yang digunakan dalam koneksi workshop.
      </p>

    </div>

  </div>


  <div class="access-principle">

    <strong>
      Perhatikan lokasi private key
    </strong>

    <span>
      Bagian <code>~/path-to-folder/</code> merupakan contoh.
      Ganti dengan lokasi private key yang sebenarnya pada komputer Anda.
    </span>

  </div>


  <div class="access-note access-note-warning">

    <strong>
      Jangan membagikan private key
    </strong>

    <p>
      Private key merupakan credential pribadi. Jangan mengirimkan
      file tersebut kepada peserta lain atau mengunggahnya ke
      repository dan layanan publik.
    </p>

  </div>


  <div class="access-command">

    <span>
      CONTOH TAMPILAN SETELAH LOGIN
    </span>

    <pre><code>(base) [ws012@login2 ~]$</code></pre>

  </div>


  <p class="access-panel-description">
    Jika prompt terminal sudah menunjukkan username dan login node,
    berarti Anda telah memperoleh shell pada sistem HPC.
  </p>

</section>


<!-- =====================================================
     FIRST LOGIN CHECK
     ===================================================== -->

<section class="access-panel">

  <div class="access-panel-head">

    <div class="access-panel-title">

      <span class="access-number">
        04
      </span>

      <div>

        <div class="access-panel-kicker">
          FIRST LOGIN
        </div>

        <h2>
          Verifikasi lingkungan setelah login
        </h2>

      </div>

    </div>

    <span class="access-badge">
      CHECK
    </span>

  </div>


  <p class="access-panel-description">
    Berhasil mendapatkan prompt HPC belum berarti Anda siap menjalankan
    calculation. Lakukan pemeriksaan awal untuk memastikan username,
    hostname, dan lokasi kerja sudah benar.
  </p>


  <div class="access-command">

    <span>
      01 · SIAPA PENGGUNA SAYA?
    </span>

    <pre><code>whoami</code></pre>

  </div>

  <p>
    Command <code>whoami</code> menunjukkan username yang sedang
    aktif. Hasilnya harus sesuai dengan akun HPC yang diberikan
    kepada Anda.
  </p>


  <div class="access-command">

    <span>
      02 · PADA MESIN MANA SAYA?
    </span>

    <pre><code>hostname</code></pre>

  </div>

  <p>
    Command <code>hostname</code> menunjukkan nama mesin tempat
    sesi terminal sedang berjalan.
  </p>


  <div class="access-command">

    <span>
      03 · DI MANA SAYA?
    </span>

    <pre><code>pwd</code></pre>

  </div>

  <p>
    Command <code>pwd</code> menunjukkan lokasi directory saat ini.
    Informasi ini penting sebelum membuat atau mengubah file.
  </p>


  <div class="access-command">

    <span>
      04 · APA YANG ADA DI SINI?
    </span>

    <pre><code>ls -lah</code></pre>

  </div>

  <p>
    Command <code>ls -lah</code> menampilkan isi directory secara
    lebih lengkap, termasuk file tersembunyi dan informasi file.
  </p>


  <div class="access-example">

    <strong>
      Contoh pemeriksaan
    </strong>

    <pre><code>whoami
hostname
pwd
ls -lah</code></pre>

  </div>


  <div class="access-principle">

    <strong>
      Kebiasaan yang perlu dibangun
    </strong>

    <span>
      Sebelum bekerja, ketahui siapa Anda, berada di mesin mana,
      berada di directory mana, dan file apa yang ada di lokasi tersebut.
    </span>

  </div>

</section>


<!-- =====================================================
     INSPECT HOME
     ===================================================== -->

<section class="access-panel">

  <div class="access-panel-head">

    <div class="access-panel-title">

      <span class="access-number">
        05
      </span>

      <div>

        <div class="access-panel-kicker">
          INSPECT HOME
        </div>

        <h2>
          Periksa Home Directory
        </h2>

      </div>

    </div>

    <span class="access-badge">
      READ ONLY
    </span>

  </div>


  <p class="access-panel-description">
    Setelah memastikan lokasi kerja, periksa isi home directory
    sebelum membuat workspace. Pada tahap ini kita hanya membaca
    informasi. Command yang digunakan tidak membuat, memindahkan,
    atau menghapus file.
  </p>


  <div class="access-command">

    <span>
      MELIHAT ISI DIRECTORY
    </span>

    <pre><code>ls
ls -lah</code></pre>

  </div>


  <p>
    Gunakan <code>ls</code> untuk melihat isi directory secara sederhana.
    Gunakan <code>ls -lah</code> jika Anda membutuhkan informasi lebih
    lengkap seperti permission, owner, ukuran file, dan file tersembunyi.
  </p>


  <div class="access-example">

    <strong>
      Contoh
    </strong>

    <pre><code>(base) [ws012@login2 ~]$ ls -lah

total 40K
drwx------  7 ws012 users 4.0K Oct  5 13:20 .
drwxr-xr-x  5 root  root  4.0K Oct  5 10:00 ..
drwx------  2 ws012 users 4.0K Oct  5 12:10 .ssh
drwx------  3 ws012 users 4.0K Oct  5 12:30 project</code></pre>

  </div>


  <div class="access-note">

    <strong>
      Jangan mengharapkan output yang sama persis
    </strong>

    <p>
      Isi home directory setiap peserta dapat berbeda. Nama file,
      permission, ukuran, dan waktu modifikasi juga dapat berbeda.
      Gunakan contoh hanya sebagai panduan membaca output.
    </p>

  </div>


  <div class="access-principle">

    <strong>
      Lihat sebelum bekerja
    </strong>

    <span>
      Biasakan memeriksa kondisi directory sebelum membuat,
      memindahkan, mengganti nama, atau menghapus file.
    </span>

  </div>

</section>


<!-- =====================================================
     STORAGE
     ===================================================== -->

<section class="access-mahameru">

  <div class="access-section-label">
    STORAGE
  </div>

  <h2>
    Pahami lokasi penyimpanan sebelum menyimpan data
  </h2>

  <p>
    Pada HPC, setiap lokasi penyimpanan dapat memiliki fungsi,
    kapasitas, performa, dan kebijakan yang berbeda. Anda perlu
    mengetahui apakah sebuah file merupakan input penting,
    output sementara, data besar, atau hasil yang perlu dipertahankan.
  </p>


  <div class="access-storage-grid">

    <div>

      <span class="storage-path">
        /home
      </span>

      <h3>
        Workspace utama
      </h3>

      <p>
        Dokumentasi yang digunakan pada modul ini mencantumkan
        kuota <code>/home</code> sebesar 50 GB untuk kelompok pengguna
        yang dijelaskan dalam kebijakan tersebut. Data <code>/home</code>
        disebut mendapat backup berkala.
      </p>

      <strong>
        Gunakan untuk:
      </strong>

      <small>
        file konfigurasi, script, input penting, environment,
        dan data kerja yang perlu dipertahankan.
      </small>

    </div>


    <div>

      <span class="storage-path">
        /scratch
      </span>

      <h3>
        Data besar dan temporary workload
      </h3>

      <p>
        Dokumentasi menyebut <code>/scratch</code> sebagai lokasi
        untuk data besar. Data pada lokasi ini tidak dijamin
        mendapat backup.
      </p>

      <strong>
        Gunakan dengan pertimbangan:
      </strong>

      <small>
        output besar, file temporary, intermediate data,
        atau data yang dapat dibuat ulang.
      </small>

    </div>


    <div>

      <span class="storage-path">
        /shared
      </span>

      <h3>
        Data bersama
      </h3>

      <p>
        Dokumentasi mencantumkan shared storage dengan format
        <code>/shared/&lt;nama grup riset&gt;/</code>
        berdasarkan permintaan.
      </p>

      <strong>
        Gunakan untuk:
      </strong>

      <small>
        data yang memang perlu digunakan bersama anggota
        research group sesuai kebijakan akses.
      </small>

    </div>

  </div>


  <div class="access-storage-warning">

    <strong>
      Jangan menyamakan /home dan /scratch
    </strong>

    <p>
      Jika file penting hanya tersimpan pada lokasi yang tidak
      memiliki backup, Anda berisiko kehilangan data. Selalu pahami
      kebijakan storage sebelum memindahkan data penelitian dalam
      jumlah besar.
    </p>

  </div>

</section>


<!-- =====================================================
     WORKSPACE
     ===================================================== -->

<section class="access-workspace">

  <div class="access-section-label">
    WORKSPACE
  </div>

  <h2>
    Siapkan struktur proyek sebelum menjalankan calculation
  </h2>

  <p>
    Workflow penelitian biasanya menghasilkan banyak file.
    Memisahkan input, script, output, dan analisis sejak awal
    membuat project lebih mudah dipahami, dipindahkan, diperiksa,
    dan direproduksi.
  </p>


  <div class="access-workspace-grid">

    <div>

      <h3>
        Contoh struktur
      </h3>

      <div class="access-tree">

        <code>graphene-project/</code>

        <div>├── input/</div>
        <div>├── scripts/</div>
        <div>├── output/</div>
        <div>├── analysis/</div>
        <div>└── README.md</div>

      </div>

    </div>


    <div class="access-workspace-explanation">

      <div>
        <strong>input/</strong>
        <span>
          File input calculation dan parameter simulasi.
        </span>
      </div>

      <div>
        <strong>scripts/</strong>
        <span>
          Script untuk preprocessing atau menjalankan calculation.
        </span>
      </div>

      <div>
        <strong>output/</strong>
        <span>
          Hasil calculation yang dihasilkan program.
        </span>
      </div>

      <div>
        <strong>analysis/</strong>
        <span>
          Hasil post-processing, grafik, tabel, dan interpretasi data.
        </span>
      </div>

      <div>
        <strong>README.md</strong>
        <span>
          Catatan mengenai sistem, software, parameter,
          dan cara menjalankan workflow.
        </span>
      </div>

    </div>

  </div>


  <div class="access-command">

    <span>
      MEMBUAT WORKSPACE
    </span>

    <pre><code>mkdir -p graphene-project
cd graphene-project
pwd
mkdir -p input scripts output analysis
ls -lah</code></pre>

  </div>


  <div class="access-principle">

    <strong>
      Struktur project bukan sekadar kerapian
    </strong>

    <span>
      Struktur yang konsisten membantu Anda membedakan file input,
      script, output, dan hasil analisis ketika project semakin besar.
    </span>

  </div>

</section>


<!-- =====================================================
     SAFETY CHECKLIST
     ===================================================== -->

<section class="access-safety">

  <div class="access-safety-main">

    <div class="access-section-label">
      CHECKLIST SEBELUM BEKERJA
    </div>

    <h2>
      Pastikan hal berikut sudah jelas
    </h2>

    <div class="access-safety-checks">

      <div>
        <span>01</span>

        <strong>
          Akun
        </strong>

        <small>
          Username HPC sudah diketahui.
        </small>
      </div>

      <div>
        <span>02</span>

        <strong>
          Network
        </strong>

        <small>
          Internet, VPN, atau jaringan institusi sesuai.
        </small>
      </div>

      <div>
        <span>03</span>

        <strong>
          SSH Key
        </strong>

        <small>
          Private key tersedia dan tetap aman.
        </small>
      </div>

      <div>
        <span>04</span>

        <strong>
          Hostname
        </strong>

        <small>
          Alamat login HPC sudah dikonfirmasi.
        </small>
      </div>

      <div>
        <span>05</span>

        <strong>
          Storage
        </strong>

        <small>
          Lokasi penyimpanan sudah dipahami.
        </small>
      </div>

      <div>
        <span>06</span>

        <strong>
          Workflow
        </strong>

        <small>
          Anda memahami langkah sebelum calculation.
        </small>
      </div>

    </div>

  </div>

</section>


<!-- =====================================================
     MINI PRACTICE
     ===================================================== -->

<section class="access-practice">

  <div class="access-section-label">
    LATIHAN PERTAMA
  </div>

  <h2>
    Kenali lingkungan HPC Anda
  </h2>

  <p>
    Setelah berhasil terhubung, jangan langsung menjalankan software
    simulasi. Lakukan pemeriksaan dasar terlebih dahulu. Catat hasil
    yang diperoleh karena informasi tersebut akan digunakan pada
    tahap berikutnya.
  </p>


  <div class="access-practice-steps">

    <div>
      <span>01</span>

      <strong>
        Identitas
      </strong>

      <code>whoami</code>
    </div>

    <div>
      <span>02</span>

      <strong>
        Hostname
      </strong>

      <code>hostname</code>
    </div>

    <div>
      <span>03</span>

      <strong>
        Lokasi
      </strong>

      <code>pwd</code>
    </div>

    <div>
      <span>04</span>

      <strong>
        Isi folder
      </strong>

      <code>ls -lah</code>
    </div>

    <div>
      <span>05</span>

      <strong>
        Workspace
      </strong>

      <code>mkdir latihan</code>
    </div>

  </div>


  <div class="access-command">

    <span>
      RANGKAIAN PEMERIKSAAN
    </span>

    <pre><code>whoami
hostname
pwd
ls -lah</code></pre>

  </div>


  <div class="access-note">

    <strong>
      Tujuan latihan
    </strong>

    <p>
      Latihan ini bukan untuk menghafalkan empat command.
      Tujuannya adalah membangun kebiasaan untuk memeriksa
      lingkungan sebelum melakukan pekerjaan yang lebih kompleks.
    </p>

  </div>

</section>


<!-- =====================================================
     WORKFLOW SUMMARY
     ===================================================== -->

<section class="access-introduction">

  <div class="access-section-label">
    WORKFLOW SUMMARY
  </div>

  <h2>
    Dari laptop hingga workspace siap digunakan
  </h2>

  <p>
    Pada tahap ini Anda sudah memahami bahwa pekerjaan pada HPC
    dimulai sebelum calculation dijalankan. Anda perlu memastikan
    koneksi, autentikasi, identitas, lokasi kerja, storage, dan
    struktur project terlebih dahulu.
  </p>

  <div class="access-principle">

    <strong>
      Urutan kerja yang disarankan
    </strong>

    <span>
      Periksa koneksi → Login SSH → whoami → hostname → pwd →
      ls -lah → pilih storage → siapkan workspace → periksa software
      → siapkan job → submit calculation
    </span>

  </div>

</section>


<!-- =====================================================
     NEXT
     ===================================================== -->

<section class="access-next">

  <div class="access-next-content">

    <div class="access-section-label">
      LANGKAH BERIKUTNYA
    </div>

    <h2>
      Setelah bisa masuk, pelajari cara bekerja di Linux
    </h2>

    <p>
      Koneksi ke HPC hanyalah langkah pertama. Tahap berikutnya
      adalah memahami command Linux secara lebih sistematis,
      termasuk navigasi directory, pencarian file, pengelolaan
      file, permission, monitoring, dan pembacaan output.
    </p>

    <p>
      Setelah dasar command line dikuasai, Anda akan lebih siap
      mempelajari software environment, scheduler, SLURM, dan
      workflow calculation.
    </p>

  </div>


  <div class="access-actions">

    <a href="../command-line/">
      Command Line
      <span>→</span>
    </a>

    <a href="../software-environment/">
      Software Environment
      <span>→</span>
    </a>

  </div>

</section>


</div>