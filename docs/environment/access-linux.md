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
    komputer lokal terhubung dengan HPC, bagaimana sistem Linux
    mengorganisasi file, bagaimana autentikasi SSH bekerja, dan
    bagaimana memilih lokasi penyimpanan yang sesuai.
  </p>

  <p class="access-hero-lead">
    Modul ini memandu Anda dari koneksi pertama hingga workspace
    penelitian siap digunakan. Fokusnya bukan hanya menghafal
    command, tetapi membangun kebiasaan kerja yang aman,
    terstruktur, dan reproducible.
  </p>

  <div class="access-hero-info">

    <div>
      <strong>Yang akan dipelajari</strong>
      <span>
        SSH, Termius, terminal, SSH key, Linux,
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
        Mampu masuk ke HPC dan menyiapkan
        workspace untuk calculation.
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
    HPC bukan komputer lokal yang hanya memiliki prosesor lebih cepat.
    HPC merupakan lingkungan komputasi yang digunakan bersama oleh
    banyak pengguna. Anda bekerja melalui sistem login, filesystem,
    software environment, scheduler, compute node, dan storage.
  </p>

  <p>
    Komputer atau laptop Anda berfungsi sebagai titik akses.
    Calculation berjalan pada resource HPC sesuai mekanisme yang
    ditetapkan oleh sistem. Karena itu, memahami cara mengakses
    sistem menjadi bagian pertama dari computational workflow.
  </p>

  <div class="access-principle">

    <strong>
      Cara berpikir yang perlu dibangun
    </strong>

    <span>
      Laptop → koneksi SSH → login HPC → workspace →
      software → scheduler → calculation → output → analisis
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
    SSH merupakan protokol utama untuk mengakses sistem Linux
    secara remote. Namun, SSH tidak selalu harus digunakan melalui
    aplikasi yang sama. Anda dapat menggunakan terminal bawaan
    sistem operasi atau aplikasi SSH client seperti Termius.
  </p>

  <p>
    Pilihan alat tidak mengubah prinsip dasar koneksi. Yang berubah
    adalah cara Anda mengelola koneksi, credential, transfer file,
    dan beberapa fitur tambahan.
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
        SSH melalui terminal. Windows modern juga menyediakan
        OpenSSH melalui PowerShell atau Windows Terminal.
      </p>

      <div class="access-pros">
        <strong>Kelebihan</strong>
        <span>
          Ringan, sederhana, gratis, mudah digunakan melalui
          script, dan sangat dekat dengan lingkungan Linux.
        </span>
      </div>

      <div class="access-cons">
        <strong>Keterbatasan</strong>
        <span>
          Pengelolaan banyak koneksi dan transfer file membutuhkan
          command tambahan atau aplikasi lain.
        </span>
      </div>

      <div class="access-best">
        <strong>Cocok untuk</strong>
        <span>
          Belajar Linux, automation, scripting, dan workflow HPC.
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
        Termius merupakan SSH client dengan antarmuka grafis yang
        menyediakan pengelolaan host, SSH, SFTP, key management,
        workspace, dan fitur pendukung lainnya. Termius tersedia
        untuk macOS, Windows, Linux, iOS, dan Android. 
      </p>

      <div class="access-pros">
        <strong>Kelebihan</strong>
        <span>
          Lebih mudah untuk menyimpan konfigurasi host, membuka
          beberapa koneksi, melakukan transfer file melalui SFTP,
          dan mengelola SSH key.
        </span>
      </div>

      <div class="access-cons">
        <strong>Keterbatasan</strong>
        <span>
          Anda tetap perlu memahami Linux dan SSH. Aplikasi grafis
          tidak menggantikan pemahaman terhadap filesystem,
          scheduler, command, atau workflow HPC.
        </span>
      </div>

      <div class="access-best">
        <strong>Cocok untuk</strong>
        <span>
          Peserta workshop yang ingin memulai dengan antarmuka
          yang lebih mudah sebelum terbiasa dengan terminal.
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
        Pendekatan ini memungkinkan pengguna bekerja dengan
        environment remote menggunakan editor yang familiar.
        Cara ini berguna ketika workflow membutuhkan banyak
        pengeditan file konfigurasi atau script.
      </p>

      <div class="access-pros">
        <strong>Kelebihan</strong>
        <span>
          Editing script dan file input menjadi lebih nyaman,
          terutama untuk proyek dengan banyak file.
        </span>
      </div>

      <div class="access-cons">
        <strong>Keterbatasan</strong>
        <span>
          Tetap membutuhkan SSH dan konfigurasi remote yang benar.
          Untuk peserta pemula, setup awal dapat lebih kompleks.
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
    Tidak ada satu alat yang selalu paling baik. Pilihan bergantung
    pada sistem operasi, pengalaman pengguna, kebutuhan transfer
    file, jumlah server yang digunakan, dan tingkat kenyamanan
    bekerja melalui terminal.
  </p>

  <div class="access-decision-grid">

    <div>
      <strong>
        Jika baru belajar HPC
      </strong>
      <span>
        Gunakan Termius untuk mempermudah koneksi,
        tetapi tetap ikuti latihan command Linux.
      </span>
    </div>

    <div>
      <strong>
        Jika menggunakan macOS/Linux
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
        Windows Terminal atau PowerShell dengan OpenSSH
        dapat digunakan. Termius menjadi alternatif dengan
        antarmuka grafis.
      </span>
    </div>

    <div>
      <strong>
        Jika sering mengedit script
      </strong>
      <span>
        VS Code Remote SSH dapat dipertimbangkan setelah
        Anda memahami SSH dan Linux.
      </span>
    </div>

  </div>

  <div class="access-rule">

    <strong>
      Prinsip workshop
    </strong>

    <span>
      Gunakan aplikasi yang membuat Anda nyaman, tetapi pastikan
      Anda tetap mampu menjalankan workflow yang sama melalui
      terminal.
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
    mengakses HPC. Aplikasi ini menyediakan pengelolaan host,
    terminal SSH, SFTP, SSH key, workspace, dan port forwarding.
    Fitur tersebut dapat membantu peserta mengurangi pekerjaan
    konfigurasi berulang. 
  </p>


  <div class="access-step-grid">

    <div>
      <span>01</span>
      <strong>Buat Host</strong>
      <p>
        Masukkan alamat HPC dan informasi koneksi yang diberikan
        administrator.
      </p>
    </div>

    <div>
      <span>02</span>
      <strong>Atur Username</strong>
      <p>
        Gunakan username HPC yang telah diberikan kepada Anda.
      </p>
    </div>

    <div>
      <span>03</span>
      <strong>Atur SSH Key</strong>
      <p>
        Gunakan private key sesuai mekanisme autentikasi
        yang ditetapkan administrator.
      </p>
    </div>

    <div>
      <span>04</span>
      <strong>Connect</strong>
      <p>
        Uji koneksi dan pastikan Anda mendapatkan shell
        pada sistem HPC.
      </p>
    </div>

  </div>


  <div class="access-command">

    <span>KONSEP YANG TETAP SAMA</span>

    <pre><code>ssh username@hostname</code></pre>

    <p>
      Walaupun Anda menggunakan Termius, koneksi yang dibuat
      tetap menggunakan mekanisme SSH. Karena itu, memahami
      command ini tetap penting.
    </p>

  </div>


  <div class="access-note">

    <strong>
      Jangan menganggap aplikasi sebagai pengganti pengetahuan Linux
    </strong>

    <p>
      Termius mempermudah akses, tetapi command seperti
      <code>pwd</code>, <code>ls</code>, <code>cd</code>,
      <code>mkdir</code>, <code>cp</code>, dan <code>mv</code>
      tetap harus dipahami.
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
    SSH key menggunakan pasangan kunci yang terdiri dari
    private key dan public key. Public key ditempatkan pada
    sistem yang memberikan akses, sedangkan private key tetap
    berada pada perangkat pengguna.
  </p>

  <p class="access-panel-description">
    Untuk HPC Mahameru, dokumentasi layanan mencantumkan
    penggunaan autentikasi passwordless dengan SSH key.
    Artinya, peserta perlu memahami pengelolaan key sebelum
    melakukan koneksi. 
  </p>


  <div class="access-key-grid">

    <div>

      <strong>
        Public Key
      </strong>

      <span>
        Dapat diberikan kepada administrator atau sistem
        yang membutuhkan autentikasi.
      </span>

    </div>

    <div class="access-key-private">

      <strong>
        Private Key
      </strong>

      <span>
        Harus tetap rahasia dan tidak boleh dibagikan.
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
      Hal yang harus diingat
    </strong>

    <p>
      Jangan mengunggah private key ke repository Git,
      mengirimkannya melalui chat, atau memasukkannya ke
      file dokumentasi. Jika key hilang atau terindikasi
      bocor, ikuti prosedur keamanan administrator HPC.
    </p>

  </div>

</section>


<!-- =====================================================
     NETWORK CONSIDERATIONS
     ===================================================== -->

<section class="access-section">

  <div class="access-section-label">
    SEBELUM CONNECT
  </div>

  <h2>
    Apa yang perlu diperiksa sebelum menghubungkan HPC?
  </h2>

  <p>
    Koneksi SSH tidak hanya bergantung pada username dan hostname.
    Akses dapat dipengaruhi oleh jaringan, VPN, firewall, port,
    autentikasi, dan kebijakan akses institusi. Karena itu,
    kegagalan koneksi tidak selalu berarti username atau password
    Anda salah.
  </p>


  <div class="access-check-grid">

    <div>
      <span>01</span>
      <strong>Network</strong>
      <p>
        Pastikan perangkat memiliki koneksi internet atau jaringan
        institusi yang diperlukan.
      </p>
    </div>

    <div>
      <span>02</span>
      <strong>VPN</strong>
      <p>
        Jika sistem HPC hanya dapat diakses melalui jaringan
        tertentu, aktifkan VPN sesuai instruksi administrator.
      </p>
    </div>

    <div>
      <span>03</span>
      <strong>Hostname</strong>
      <p>
        Pastikan alamat server yang digunakan benar.
        Jangan menebak hostname.
      </p>
    </div>

    <div>
      <span>04</span>
      <strong>Port</strong>
      <p>
        SSH umumnya menggunakan port tertentu, tetapi HPC dapat
        menggunakan konfigurasi yang berbeda.
      </p>
    </div>

    <div>
      <span>05</span>
      <strong>Credential</strong>
      <p>
        Pastikan username dan metode autentikasi sesuai dengan
        akun HPC Anda.
      </p>
    </div>

    <div>
      <span>06</span>
      <strong>Kebijakan akses</strong>
      <p>
        Ikuti aturan penggunaan resource dan keamanan yang
        ditetapkan administrator.
      </p>
    </div>

  </div>

</section>


<!-- =====================================================
     MAHAMERU STORAGE
     ===================================================== -->

<section class="access-mahameru">

  <div class="access-section-label">
    KHUSUS HPC MAHAMERU BRIN
  </div>

  <h2>
    Pahami lokasi penyimpanan sebelum menyimpan data
  </h2>

  <p>
    Pada HPC, tidak semua storage memiliki fungsi dan kebijakan
    yang sama. Anda perlu mengetahui apakah sebuah file merupakan
    input penting, output sementara, data besar, atau hasil yang
    perlu dipertahankan untuk penelitian.
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
        Dokumentasi Mahameru mencantumkan kuota /home sebesar
        50 GB untuk kelompok pengguna yang dijelaskan dalam
        kebijakan tersebut. Data /home disebut mendapat backup
        berkala.
      </p>

      <strong>
        Gunakan untuk:
      </strong>

      <small>
        file konfigurasi, script, input penting,
        environment, dan data kerja yang perlu dipertahankan.
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
        Dokumentasi Mahameru menyebut /scratch sebagai lokasi
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
        Dokumentasi Mahameru mencantumkan shared storage
        dengan format /shared/&lt;nama grup riset&gt;/
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
      Jika sebuah file penting dan hanya tersimpan di lokasi
      yang tidak memiliki backup, Anda berisiko kehilangan data.
      Selalu pahami kebijakan storage sebelum memindahkan data
      penelitian dalam jumlah besar. 
    </p>

  </div>

</section>


<!-- =====================================================
     FIRST LOGIN
     ===================================================== -->

<section class="access-panel">

  <div class="access-panel-head">

    <div class="access-panel-title">

      <span class="access-number">
        03
      </span>

      <div>

        <div class="access-panel-kicker">
          FIRST LOGIN
        </div>

        <h2>
          Setelah berhasil masuk ke HPC
        </h2>

      </div>

    </div>

    <span class="access-badge">
      CHECK
    </span>

  </div>


  <p class="access-panel-description">
    Jangan langsung menjalankan calculation setelah login.
    Langkah pertama adalah memastikan identitas pengguna,
    lokasi kerja, isi direktori, dan kondisi environment.
  </p>


  <div class="access-command">

    <span>01 · SIAPA PENGGUNA SAYA?</span>

    <pre><code>whoami</code></pre>

  </div>


  <div class="access-command">

    <span>02 · DI MANA SAYA?</span>

    <pre><code>pwd</code></pre>

  </div>


  <div class="access-command">

    <span>03 · APA YANG ADA DI SINI?</span>

    <pre><code>ls -lah</code></pre>

  </div>


  <div class="access-command">

    <span>04 · INFORMASI SISTEM</span>

    <pre><code>hostname</code></pre>

  </div>


  <div class="access-principle">

    <strong>
      Gunakan command secara hati-hati dan pastikan Anda memahami hasil yang akan ditimbulkan.
    </strong>

    <span>
      Biasakan mengetahui siapa Anda, berada di mana,
      dan sedang bekerja dengan file apa.
    </span>

  </div>

</section>


<!-- =====================================================
     LINUX WORKSPACE
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
    membuat proyek lebih mudah dipahami oleh Anda sendiri
    maupun anggota tim lain.
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
          Script untuk menjalankan calculation atau
          melakukan preprocessing.
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
          Hasil post-processing, grafik, tabel,
          dan interpretasi data.
        </span>
      </div>

      <div>
        <strong>README.md</strong>
        <span>
          Catatan singkat mengenai sistem, software,
          parameter, dan cara menjalankan workflow.
        </span>
      </div>

    </div>

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
      Pastikan enam hal berikut sudah jelas
    </h2>

    <div class="access-safety-checks">

      <div>
        <span>01</span>
        <strong>Akun</strong>
        <small>
          Username dan akses HPC tersedia.
        </small>
      </div>

      <div>
        <span>02</span>
        <strong>Network</strong>
        <small>
          Internet, VPN, atau jaringan institusi sesuai.
        </small>
      </div>

      <div>
        <span>03</span>
        <strong>SSH Key</strong>
        <small>
          Key tersedia dan private key tetap aman.
        </small>
      </div>

      <div>
        <span>04</span>
        <strong>Storage</strong>
        <small>
          Lokasi penyimpanan sudah dipahami.
        </small>
      </div>

      <div>
        <span>05</span>
        <strong>Software</strong>
        <small>
          Software yang diperlukan sudah diketahui.
        </small>
      </div>

      <div>
        <span>06</span>
        <strong>Scheduler</strong>
        <small>
          Aturan job dan resource sudah dipahami.
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
    Setelah berhasil terhubung, jangan langsung menjalankan
    software simulasi. Jalankan rangkaian command berikut.
    Catat output yang diperoleh karena informasi tersebut
    membantu Anda memahami lingkungan kerja.
  </p>


  <div class="access-practice-steps">

    <div>
      <span>01</span>
      <strong>Identitas</strong>
      <code>whoami</code>
    </div>

    <div>
      <span>02</span>
      <strong>Hostname</strong>
      <code>hostname</code>
    </div>

    <div>
      <span>03</span>
      <strong>Lokasi</strong>
      <code>pwd</code>
    </div>

    <div>
      <span>04</span>
      <strong>Isi folder</strong>
      <code>ls -lah</code>
    </div>

    <div>
      <span>05</span>
      <strong>Folder latihan</strong>
      <code>mkdir latihan</code>
    </div>

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
      termasuk pencarian file, permission, proses, monitoring,
      environment variable, dan pengelolaan data.
    </p>

    <p>
      Setelah dasar tersebut dikuasai, Anda akan lebih siap
      mempelajari software environment dan scheduler sebelum
      menjalankan calculation.
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