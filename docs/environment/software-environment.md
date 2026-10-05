<div class="software-environment">

  <!-- =====================================================
       HERO
       ===================================================== -->

  <section class="software-hero">

    <div class="software-kicker">
      LINGKUNGAN PERANGKAT LUNAK HPC
    </div>

    <h1>
      Software Environment
    </h1>

    <p>
      Halaman ini membantu Anda memahami bagaimana software ilmiah
      disediakan, dipilih, dimuat, dan diverifikasi pada lingkungan HPC.
      Sebelum menjalankan simulasi, pastikan aplikasi, versi, compiler,
      library, dan dependency yang digunakan sudah sesuai dengan kebutuhan
      calculation.
    </p>

    <p>
      Pada HPC, Anda tidak selalu perlu memasang software sendiri.
      Banyak aplikasi telah disediakan oleh administrator melalui
      <strong>environment module</strong>. Anda cukup menemukan versi yang
      tersedia, memuat module yang sesuai, kemudian memeriksa apakah
      executable dapat digunakan dengan benar.
    </p>

  </section>


  <!-- =====================================================
       LEARNING FLOW
       ===================================================== -->

  <section class="software-flow">

    <div class="software-flow-item active">

      <span>01</span>

      <strong>
        Kenali
      </strong>

      <small>
        Environment
      </small>

    </div>


    <div class="software-flow-line"></div>


    <div class="software-flow-item">

      <span>02</span>

      <strong>
        Cari
      </strong>

      <small>
        Software
      </small>

    </div>


    <div class="software-flow-line"></div>


    <div class="software-flow-item">

      <span>03</span>

      <strong>
        Muat
      </strong>

      <small>
        Module
      </small>

    </div>


    <div class="software-flow-line"></div>


    <div class="software-flow-item">

      <span>04</span>

      <strong>
        Verifikasi
      </strong>

      <small>
        Environment
      </small>

    </div>


    <div class="software-flow-line"></div>


    <div class="software-flow-item">

      <span>05</span>

      <strong>
        Gunakan
      </strong>

      <small>
        Calculation
      </small>

    </div>

  </section>


  <!-- =====================================================
       INTRODUCTION
       ===================================================== -->

  <section class="software-intro">

    <div class="software-intro-main">

      <span class="software-label">
        KONSEP UTAMA
      </span>

      <h2>
        Software pada HPC tidak berdiri sendiri
      </h2>

      <p>
        Sebuah aplikasi ilmiah biasanya bergantung pada beberapa komponen
        lain. Komponen tersebut dapat berupa compiler, MPI, library numerik,
        library matematika, Python, atau dependency khusus dari aplikasi.
      </p>

      <p>
        Karena itu, memilih software tidak cukup hanya dengan mengetahui
        nama aplikasinya. Anda juga perlu memperhatikan versi, compiler,
        dependency, dan cara aplikasi tersebut dibangun pada cluster.
      </p>

    </div>


    <div class="software-intro-highlight">

      <span>
        POLA DASAR
      </span>

      <strong>
        Cari → Muat → Periksa → Gunakan
      </strong>

      <small>
        Jangan langsung menjalankan aplikasi sebelum environment
        diverifikasi.
      </small>

    </div>

  </section>


  <!-- =====================================================
       WHAT IS MODULE
       ===================================================== -->

  <section class="software-section">

    <div class="software-section-head">

      <div>

        <span>
          01
        </span>

        <div>

          <small>
            ENVIRONMENT MODULE
          </small>

          <h2>
            Apa itu environment module?
          </h2>

        </div>

      </div>

      <p>
        Environment module membantu pengguna memilih software dan versi
        tertentu tanpa harus mengubah konfigurasi sistem secara manual.
      </p>

    </div>


    <div class="software-explanation">

      <div class="software-explanation-card">

        <h3>
          Tanpa module
        </h3>

        <p>
          Pengguna harus mengetahui lokasi instalasi software dan mengatur
          sendiri variabel environment seperti PATH atau library path.
          Cara ini dapat menjadi rumit ketika banyak versi software tersedia.
        </p>

      </div>


      <div class="software-explanation-card featured">

        <h3>
          Dengan module
        </h3>

        <p>
          Pengguna dapat memuat konfigurasi software yang sudah disiapkan
          administrator. Sistem kemudian menyesuaikan environment agar
          executable dan dependency yang diperlukan dapat ditemukan.
        </p>

      </div>

    </div>


    <div class="software-command">

      <span>
        MELIHAT MODULE YANG TERSEDIA
      </span>

      <pre><code>module avail</code></pre>

      <p>
        Perintah ini menampilkan daftar module yang tersedia pada sistem
        yang sedang Anda gunakan.
      </p>

    </div>

  </section>


  <!-- =====================================================
       SEARCH SOFTWARE
       ===================================================== -->

  <section class="software-section">

    <div class="software-section-head">

      <div>

        <span>
          02
        </span>

        <div>

          <small>
            SEARCH
          </small>

          <h2>
            Mencari software yang tersedia
          </h2>

        </div>

      </div>

      <p>
        Jangan menebak nama module. Mulailah dengan melihat module yang
        tersedia atau gunakan pencarian berdasarkan nama aplikasi.
      </p>

    </div>


    <div class="software-command-grid">

      <div class="software-command-card">

        <span>
          LIHAT SEMUA MODULE
        </span>

        <pre><code>module avail</code></pre>

        <p>
          Gunakan ketika Anda ingin mengetahui kelompok software yang
          tersedia pada cluster.
        </p>

      </div>


      <div class="software-command-card">

        <span>
          CARI BERDASARKAN NAMA
        </span>

        <pre><code>module spider quantum</code></pre>

        <p>
          Gunakan pencarian ketika Anda mengetahui nama aplikasi,
          tetapi belum mengetahui versi atau lokasi module yang tersedia.
        </p>

      </div>


      <div class="software-command-card">

        <span>
          MELIHAT INFORMASI MODULE
        </span>

        <pre><code>module show quantum-espresso</code></pre>

        <p>
          Informasi module dapat membantu Anda melihat konfigurasi yang
          akan diterapkan ketika module dimuat.
        </p>

      </div>

    </div>


    <div class="software-note">

      <strong>
        Catatan:
      </strong>

      <span>
        Nama dan struktur module berbeda antar-HPC. Contoh command pada
        halaman ini bersifat umum. Selalu gunakan nama module yang benar-benar
        tersedia pada cluster tempat Anda bekerja.
      </span>

    </div>

  </section>


  <!-- =====================================================
       LOAD SOFTWARE
       ===================================================== -->

  <section class="software-section">

    <div class="software-section-head">

      <div>

        <span>
          03
        </span>

        <div>

          <small>
            LOAD SOFTWARE
          </small>

          <h2>
            Memuat software ke environment
          </h2>

        </div>

      </div>

      <p>
        Setelah menemukan software yang diperlukan, muat module yang sesuai
        sebelum menjalankan executable.
      </p>

    </div>


    <div class="software-command-grid">

      <div class="software-command-card">

        <span>
          FORMAT UMUM
        </span>

        <pre><code>module load nama-software</code></pre>

        <p>
          Gunakan nama module sesuai daftar yang tersedia pada HPC.
        </p>

      </div>


      <div class="software-command-card">

        <span>
          CONTOH
        </span>

        <pre><code>module load quantum-espresso</code></pre>

        <p>
          Contoh ini menunjukkan pola pemuatan Quantum ESPRESSO.
          Nama module aktual dapat berbeda pada setiap sistem.
        </p>

      </div>


      <div class="software-command-card">

        <span>
          VERSI TERTENTU
        </span>

        <pre><code>module load software/version</code></pre>

        <p>
          Gunakan versi tertentu ketika workflow atau penelitian
          membutuhkan versi yang konsisten.
        </p>

      </div>

    </div>


    <div class="software-warning">

      <strong>
        Jangan langsung menggunakan contoh nama module.
      </strong>

      <p>
        Cluster yang berbeda dapat menggunakan nama, versi, compiler,
        dan struktur dependency yang berbeda. Periksa terlebih dahulu
        dengan <code>module avail</code> atau mekanisme pencarian module
        yang disediakan oleh HPC.
      </p>

    </div>

  </section>


  <!-- =====================================================
       CHECK LOADED MODULE
       ===================================================== -->

  <section class="software-section">

    <div class="software-section-head">

      <div>

        <span>
          04
        </span>

        <div>

          <small>
            VERIFICATION
          </small>

          <h2>
            Memeriksa environment yang aktif
          </h2>

        </div>

      </div>

      <p>
        Setelah memuat module, jangan langsung menjalankan calculation.
        Pastikan environment yang aktif benar-benar sesuai dengan kebutuhan.
      </p>

    </div>


    <div class="software-check-grid">

      <div class="software-check-card">

        <span>
          01
        </span>

        <h3>
          Module yang aktif
        </h3>

        <p>
          Periksa software apa saja yang saat ini telah dimuat.
        </p>

        <pre><code>module list</code></pre>

      </div>


      <div class="software-check-card">

        <span>
          02
        </span>

        <h3>
          Lokasi executable
        </h3>

        <p>
          Pastikan sistem menemukan executable yang Anda maksud.
        </p>

        <pre><code>which pw.x</code></pre>

      </div>


      <div class="software-check-card">

        <span>
          03
        </span>

        <h3>
          Versi aplikasi
        </h3>

        <p>
          Periksa versi aplikasi jika executable mendukung opsi tersebut.
        </p>

        <pre><code>pw.x --version</code></pre>

      </div>

    </div>

  </section>


  <!-- =====================================================
       REAL HPC EXAMPLE
       ===================================================== -->

  <section class="software-real-example">

    <div class="software-real-head">

      <span>
        CONTOH WORKFLOW
      </span>

      <h2>
        Dari login hingga software siap digunakan
      </h2>

      <p>
        Berikut contoh alur sederhana yang dapat Anda lakukan setelah
        masuk ke HPC. Contoh ini menunjukkan proses pemeriksaan environment,
        bukan instruksi untuk menjalankan calculation tertentu.
      </p>

    </div>


    <div class="software-terminal">

      <div class="software-terminal-title">
        <span></span>
        <span></span>
        <span></span>
        <strong>
          HPC Terminal
        </strong>
      </div>


      <pre><code>(base) [lala002@login2 ~]$ module avail

(base) [lala002@login2 ~]$ module spider quantum

(base) [lala002@login2 ~]$ module load quantum-espresso

(base) [lala002@login2 ~]$ module list

(base) [lala002@login2 ~]$ which pw.x

(base) [lala002@login2 ~]$ pw.x --version</code></pre>

    </div>


    <div class="software-real-explanation">

      <div>

        <strong>
          Apa yang sedang diperiksa?
        </strong>

        <p>
          Pertama, Anda mencari software yang tersedia. Setelah menemukan
          module yang sesuai, Anda memuatnya ke environment. Selanjutnya,
          Anda memeriksa module yang aktif dan memastikan executable
          <code>pw.x</code> dapat ditemukan oleh sistem.
        </p>

      </div>


      <div>

        <strong>
          Mengapa langkah ini penting?
        </strong>

        <p>
          Jika executable tidak ditemukan atau versi yang aktif tidak sesuai,
          masalah sebaiknya diselesaikan pada tahap environment sebelum
          calculation dikirim ke scheduler.
        </p>

      </div>

    </div>

  </section>


  <!-- =====================================================
       COMPILER AND MPI
       ===================================================== -->

  <section class="software-section">

    <div class="software-section-head">

      <div>

        <span>
          05
        </span>

        <div>

          <small>
            DEPENDENCY
          </small>

          <h2>
            Perhatikan compiler, MPI, dan dependency
          </h2>

        </div>

      </div>

      <p>
        Beberapa aplikasi ilmiah membutuhkan lebih dari satu module.
        Kesesuaian antar-komponen dapat menentukan apakah aplikasi
        berjalan dengan benar.
      </p>

    </div>


    <div class="software-dependency-grid">

      <div class="software-dependency-card">

        <span>
          COMPILER
        </span>

        <h3>
          GNU, Intel, atau compiler lainnya
        </h3>

        <p>
          Compiler digunakan untuk membangun software atau menyediakan
          runtime tertentu. Jangan mengganti compiler secara sembarangan
          jika aplikasi sudah dibangun menggunakan compiler tertentu.
        </p>

      </div>


      <div class="software-dependency-card">

        <span>
          MPI
        </span>

        <h3>
          Parallel computing
        </h3>

        <p>
          MPI memungkinkan aplikasi menjalankan proses paralel pada
          beberapa CPU atau node. Pastikan MPI yang digunakan kompatibel
          dengan aplikasi.
        </p>

      </div>


      <div class="software-dependency-card">

        <span>
          LIBRARY
        </span>

        <h3>
          Komponen pendukung
        </h3>

        <p>
          Aplikasi dapat bergantung pada library matematika, komunikasi,
          atau komponen lain. Module system biasanya membantu mengatur
          dependency tersebut.
        </p>

      </div>

    </div>


    <div class="software-important">

      <strong>
        Prinsip penting
      </strong>

      <p>
        Jangan mencampur environment secara acak. Jika sebuah software
        membutuhkan compiler atau MPI tertentu, ikuti kombinasi yang
        disediakan oleh cluster atau dokumentasi aplikasi.
      </p>

    </div>

  </section>


  <!-- =====================================================
       MODULE MANAGEMENT
       ===================================================== -->

  <section class="software-section">

    <div class="software-section-head">

      <div>

        <span>
          06
        </span>

        <div>

          <small>
            ENVIRONMENT MANAGEMENT
          </small>

          <h2>
            Mengelola module dengan aman
          </h2>

        </div>

      </div>

      <p>
        Anda dapat memuat, menghapus, atau mengganti module sesuai
        kebutuhan. Namun, perubahan environment harus dilakukan
        dengan memahami dampaknya terhadap workflow.
      </p>

    </div>


    <div class="software-command-grid">

      <div class="software-command-card">

        <span>
          MELIHAT MODULE AKTIF
        </span>

        <pre><code>module list</code></pre>

      </div>


      <div class="software-command-card">

        <span>
          MENGHAPUS MODULE
        </span>

        <pre><code>module unload nama-module</code></pre>

      </div>


      <div class="software-command-card">

        <span>
          MEMUAT MODULE LAIN
        </span>

        <pre><code>module load nama-module</code></pre>

      </div>


      <div class="software-command-card">

        <span>
          MEMBERSIHKAN ENVIRONMENT
        </span>

        <pre><code>module purge</code></pre>

        <p>
          Gunakan dengan hati-hati. Perintah ini menghapus module yang
          sedang aktif sehingga environment dapat berubah secara signifikan.
        </p>

      </div>

    </div>

  </section>


  <!-- =====================================================
       PYTHON
       ===================================================== -->

  <section class="software-section">

    <div class="software-section-head">

      <div>

        <span>
          07
        </span>

        <div>

          <small>
            PYTHON ENVIRONMENT
          </small>

          <h2>
            Python untuk analisis dan post-processing
          </h2>

        </div>

      </div>

      <p>
        Banyak workflow computational materials menggunakan Python untuk
        membaca output, melakukan analisis, membuat visualisasi, atau
        menjalankan workflow tambahan.
      </p>

    </div>


    <div class="software-python">

      <div class="software-python-card">

        <h3>
          Periksa Python
        </h3>

        <pre><code>python --version</code></pre>

      </div>


      <div class="software-python-card">

        <h3>
          Periksa lokasi Python
        </h3>

        <pre><code>which python</code></pre>

      </div>


      <div class="software-python-card">

        <h3>
          Periksa package
        </h3>

        <pre><code>python -c "import numpy; print(numpy.__version__)"</code></pre>

      </div>

    </div>


    <div class="software-note">

      <strong>
        Perhatikan environment Python.
      </strong>

      <span>
        Package yang tersedia pada satu environment belum tentu tersedia
        pada environment lainnya. Pastikan Python dan package yang digunakan
        tercatat jika workflow perlu direproduksi.
      </span>

    </div>

  </section>


  <!-- =====================================================
       SOFTWARE IN WORKFLOW
       ===================================================== -->

  <section class="software-reference">

    <div class="software-reference-head">

      <div>

        <span>
          CONTOH SOFTWARE
        </span>

        <h2>
          Software dalam workflow computational materials
        </h2>

      </div>

      <p>
        Setiap aplikasi memiliki fungsi yang berbeda. Pemilihan software
        harus mengikuti jenis masalah ilmiah dan metode yang digunakan.
      </p>

    </div>


    <div class="software-table-wrap">

      <table>

        <thead>

          <tr>
            <th>Software / Tool</th>
            <th>Fungsi utama</th>
            <th>Contoh penggunaan</th>
          </tr>

        </thead>

        <tbody>

          <tr>

            <td>
              <strong>Quantum ESPRESSO</strong>
            </td>

            <td>
              Perhitungan berbasis first-principles dan struktur elektronik
            </td>

            <td>
              SCF, relaksasi, dan analisis struktur elektronik
            </td>

          </tr>


          <tr>

            <td>
              <strong>LAMMPS</strong>
            </td>

            <td>
              Molecular dynamics berbasis model atomistik
            </td>

            <td>
              Simulasi temperatur, tekanan, dan dinamika atom
            </td>

          </tr>


          <tr>

            <td>
              <strong>Python</strong>
            </td>

            <td>
              Analisis data dan post-processing
            </td>

            <td>
              Membaca output, menghitung statistik, dan membuat visualisasi
            </td>

          </tr>


          <tr>

            <td>
              <strong>MPI</strong>
            </td>

            <td>
              Komunikasi proses paralel
            </td>

            <td>
              Menjalankan aplikasi pada banyak CPU atau node
            </td>

          </tr>


          <tr>

            <td>
              <strong>Compiler</strong>
            </td>

            <td>
              Membangun dan mendukung aplikasi komputasi
            </td>

            <td>
              Kompilasi kode dan penyediaan runtime tertentu
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </section>


  <!-- =====================================================
       ENVIRONMENT CHECKLIST
       ===================================================== -->

  <section class="software-checklist">

    <div class="software-checklist-head">

      <span>
        CHECKLIST
      </span>

      <h2>
        Sebelum menggunakan software
      </h2>

      <p>
        Gunakan checklist berikut agar Anda tidak langsung menjalankan
        calculation dengan environment yang belum terverifikasi.
      </p>

    </div>


    <div class="software-checklist-grid">

      <div>
        <span>01</span>
        <strong>Software tersedia</strong>
        <p>
          Pastikan aplikasi memang tersedia pada cluster.
        </p>
      </div>


      <div>
        <span>02</span>
        <strong>Versi sesuai</strong>
        <p>
          Periksa versi yang digunakan oleh workflow atau penelitian.
        </p>
      </div>


      <div>
        <span>03</span>
        <strong>Dependency sesuai</strong>
        <p>
          Perhatikan compiler, MPI, dan library yang diperlukan.
        </p>
      </div>


      <div>
        <span>04</span>
        <strong>Executable ditemukan</strong>
        <p>
          Pastikan command seperti <code>which</code> menemukan executable.
        </p>
      </div>


      <div>
        <span>05</span>
        <strong>Versi terverifikasi</strong>
        <p>
          Catat versi software yang digunakan dalam workflow.
        </p>
      </div>


      <div>
        <span>06</span>
        <strong>Environment konsisten</strong>
        <p>
          Gunakan environment yang sama ketika workflow perlu diulang.
        </p>
      </div>

    </div>

  </section>


  <!-- =====================================================
       REPRODUCIBILITY
       ===================================================== -->

  <section class="software-reproducibility">

    <div>

      <span>
        REPRODUCIBLE WORKFLOW
      </span>

      <h2>
        Catat environment yang digunakan
      </h2>

      <p>
        Hasil computational research tidak hanya bergantung pada input.
        Software dan environment juga dapat memengaruhi proses komputasi.
        Karena itu, biasakan mencatat nama aplikasi, versi, compiler,
        MPI, dan konfigurasi penting yang digunakan.
      </p>

      <p>
        Dokumentasi ini akan membantu ketika calculation perlu dijalankan
        kembali, dibandingkan dengan hasil lain, atau dipindahkan ke
        environment yang berbeda.
      </p>

    </div>


    <div class="software-reproducibility-code">

      <span>
        BASIC RECORD
      </span>

      <pre><code>module list
which pw.x
pw.x --version
python --version</code></pre>

    </div>

  </section>


  <!-- =====================================================
       COMMON MISTAKES
       ===================================================== -->

  <section class="software-mistakes">

    <div class="software-mistakes-head">

      <span>
        COMMON MISTAKES
      </span>

      <h2>
        Kesalahan yang sering terjadi
      </h2>

    </div>


    <div class="software-mistakes-grid">

      <div>

        <span>01</span>

        <h3>
          Menebak nama module
        </h3>

        <p>
          Nama software yang dikenal pengguna belum tentu sama dengan
          nama module pada HPC.
        </p>

      </div>


      <div>

        <span>02</span>

        <h3>
          Mengabaikan versi
        </h3>

        <p>
          Dua versi aplikasi dapat memiliki fitur, dependency, atau
          perilaku yang berbeda.
        </p>

      </div>


      <div>

        <span>03</span>

        <h3>
          Mencampur dependency
        </h3>

        <p>
          Kombinasi compiler, MPI, dan library yang tidak sesuai dapat
          menyebabkan aplikasi gagal dijalankan.
        </p>

      </div>


      <div>

        <span>04</span>

        <h3>
          Tidak memeriksa executable
        </h3>

        <p>
          Software yang berhasil di-load tetap perlu diverifikasi
          sebelum digunakan untuk calculation.
        </p>

      </div>

    </div>

  </section>


  <!-- =====================================================
       FINAL CHECK
       ===================================================== -->

  <section class="software-final-check">

    <div>

      <span>
        FINAL ENVIRONMENT CHECK
      </span>

      <h2>
        Environment sudah siap?
      </h2>

      <p>
        Sebelum berpindah ke tahap berikutnya, pastikan Anda mengetahui
        aplikasi yang digunakan, versinya, module yang aktif, dependency
        penting, dan lokasi executable.
      </p>

    </div>


    <div class="software-final-code">

      <pre><code>module list
which executable
executable --version</code></pre>

    </div>

  </section>


  <!-- =====================================================
       NEXT STEP
       ===================================================== -->

  <section class="software-next">

    <div>

      <span>
        LANGKAH BERIKUTNYA
      </span>

      <h2>
        Environment sudah terverifikasi. Siapkan calculation.
      </h2>

      <p>
        Setelah software dan environment siap, tahap berikutnya adalah
        menyiapkan input, resource, job script, dan scheduler sebelum
        calculation dijalankan pada HPC.
      </p>

    </div>


    <div class="software-actions">

      <a href="../running-calculations/">
        Running Calculations →
      </a>

      <a href="../script-library/">
        Script Library →
      </a>

    </div>

  </section>

</div>