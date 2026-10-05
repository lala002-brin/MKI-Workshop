<div class="hpc-overview">

  <!-- =====================================================
       HERO
       ===================================================== -->

  <section class="hpc-overview-hero">

    <div class="hpc-overview-kicker">
      LINGKUNGAN KOMPUTASI
    </div>

    <h1>
      Komputasi HPC
    </h1>

    <p>
      Computational Environment merupakan lingkungan kerja utama
      untuk menjalankan perhitungan dan simulasi dalam workshop.
      Pada bagian ini, peserta akan mempelajari bagaimana komputer
      pribadi terhubung dengan sistem HPC, bagaimana file dikelola
      melalui Linux, bagaimana software disiapkan, dan bagaimana
      calculation dijalankan menggunakan sumber daya komputasi
      berperforma tinggi.
    </p>

    <p>
      Materi disusun sebagai alur kerja yang saling terhubung.
      Peserta tidak hanya mempelajari perintah Linux secara terpisah,
      tetapi juga memahami hubungan antara akses sistem, persiapan
      input, software environment, job submission, monitoring,
      hingga analisis hasil simulasi.
    </p>

  </section>


  <!-- =====================================================
       INTRODUCTION
       ===================================================== -->

  <section class="hpc-overview-intro">

    <div class="hpc-overview-intro-label">
      MENGAPA BAGIAN INI PENTING?
    </div>

    <h2>
      Memahami lingkungan kerja sebelum menjalankan simulasi
    </h2>

    <p>
      Simulasi computational materials science membutuhkan lebih dari
      sekadar software perhitungan. Peserta juga perlu memahami
      lingkungan tempat calculation dijalankan. Kesalahan pada lokasi
      file, konfigurasi software, environment, input, atau job submission
      dapat menyebabkan calculation gagal meskipun model ilmiahnya
      sudah benar.
    </p>

    <p>
      Karena itu, bagian Computational Environment memperkenalkan
      komponen dasar yang diperlukan sebelum peserta menjalankan
      Quantum ESPRESSO, DCDFTBMD, MACE, molecular dynamics,
      maupun workflow simulasi lainnya.
    </p>

    <p>
      Setelah menyelesaikan bagian ini, peserta diharapkan mampu
      mengenali struktur lingkungan HPC, bekerja melalui terminal Linux,
      menyiapkan software yang diperlukan, mengirim calculation ke
      scheduler, memantau status job, serta menemukan output yang
      dihasilkan oleh calculation.
    </p>

  </section>


  <!-- =====================================================
       START HERE
       ===================================================== -->

  <section class="hpc-overview-start">

    <div class="hpc-overview-start-main">

      <span>
        MULAI DI SINI
      </span>

      <h2>
        Bangun workflow HPC secara bertahap
      </h2>

      <p>
        Jika Anda baru pertama kali menggunakan HPC, mulai dari
        bagian Akses & Linux. Bagian ini menjelaskan cara masuk
        ke sistem, mengenali direktori kerja, memahami filesystem,
        dan menggunakan terminal untuk menjalankan perintah dasar.
      </p>

      <p>
        Setelah memahami Linux, lanjutkan ke Software Environment.
        Di sini Anda akan belajar bagaimana software, compiler,
        library, module, dan Python environment disiapkan sebelum
        calculation dijalankan.
      </p>

      <p>
        Tahap berikutnya adalah Running Calculations. Pada bagian
        tersebut, Anda akan mempelajari bagaimana input disiapkan,
        job dikirim melalui scheduler, proses calculation dipantau,
        dan output diperiksa setelah pekerjaan selesai.
      </p>

    </div>


    <div class="hpc-overview-start-next">

      <small>
        LANGKAH PERTAMA
      </small>

      <strong>
        Akses & Linux
      </strong>

      <p>
        Pelajari cara mengakses sistem HPC dan bekerja
        menggunakan lingkungan Linux.
      </p>

      <a href="access-linux/">
        Mulai Belajar →
      </a>

    </div>

  </section>


  <!-- =====================================================
       ENVIRONMENT
       ===================================================== -->

  <section class="hpc-overview-section-head">

    <span>
      KOMPONEN LINGKUNGAN KOMPUTASI
    </span>

    <h2>
      Apa saja yang perlu Anda kuasai?
    </h2>

    <p>
      Lingkungan komputasi terdiri dari beberapa komponen yang
      saling berhubungan. Anda tidak harus menguasai semuanya
      sekaligus. Pelajari setiap bagian sesuai tahapan workflow
      yang sedang Anda kerjakan.
    </p>

    <p>
      Keenam bagian berikut membentuk jalur dari penggunaan terminal
      hingga penerapan workflow komputasi pada research case.
    </p>

  </section>


  <!-- =====================================================
       MODULES
       ===================================================== -->

  <section class="hpc-overview-modules">


    <!-- 01 -->

    <a
      class="hpc-overview-module"
      href="access-linux/"
    >

      <div class="hpc-overview-module-top">

        <span>
          01
        </span>

        <small>
          FONDASI
        </small>

      </div>

      <h3>
        Akses & Linux
      </h3>

      <p>
        Bagian ini memperkenalkan cara mengakses sistem HPC
        dan bekerja melalui terminal Linux. Anda akan belajar
        mengenali home directory, membuat folder, berpindah
        direktori, melihat file, mengubah lokasi kerja, serta
        memahami struktur filesystem.
      </p>

      <p>
        Kemampuan ini menjadi dasar untuk seluruh aktivitas
        berikutnya karena sebagian besar workflow HPC dilakukan
        melalui command line.
      </p>

      <div class="hpc-overview-module-link">
        Buka Materi →
      </div>

    </a>


    <!-- 02 -->

    <a
      class="hpc-overview-module"
      href="command-line/"
    >

      <div class="hpc-overview-module-top">

        <span>
          02
        </span>

        <small>
          TERMINAL
        </small>

      </div>

      <h3>
        Command Line
      </h3>

      <p>
        Command Line digunakan untuk berinteraksi langsung
        dengan sistem komputasi. Anda akan mempelajari perintah
        untuk mengelola file dan directory, memeriksa lokasi kerja,
        membaca informasi sistem, mengelola process, dan melakukan
        monitoring pekerjaan.
      </p>

      <p>
        Penguasaan command line membantu Anda bekerja lebih cepat
        dan lebih terstruktur ketika menjalankan calculation
        pada sistem HPC.
      </p>

      <div class="hpc-overview-module-link">
        Buka Materi →
      </div>

    </a>


    <!-- 03 -->

    <a
      class="hpc-overview-module"
      href="software-environment/"
    >

      <div class="hpc-overview-module-top">

        <span>
          03
        </span>

        <small>
          SOFTWARE
        </small>

      </div>

      <h3>
        Software Environment
      </h3>

      <p>
        Calculation membutuhkan software dan dependency yang
        sesuai dengan sistem yang digunakan. Bagian ini membahas
        module, compiler, Python environment, library, serta
        software yang diperlukan untuk workflow simulasi.
      </p>

      <p>
        Anda akan belajar memeriksa software yang tersedia,
        memilih environment yang sesuai, dan memastikan bahwa
        program dapat dijalankan sebelum mengirim calculation
        ke compute resources.
      </p>

      <div class="hpc-overview-module-link">
        Buka Materi →
      </div>

    </a>


    <!-- 04 -->

    <a
      class="hpc-overview-module"
      href="running-calculations/"
    >

      <div class="hpc-overview-module-top">

        <span>
          04
        </span>

        <small>
          WORKFLOW
        </small>

      </div>

      <h3>
        Menjalankan Calculation
      </h3>

      <p>
        Setelah sistem dan software siap, calculation dapat
        dijalankan. Bagian ini menjelaskan tahapan mulai dari
        menyiapkan input, menentukan kebutuhan resource,
        membuat job script, hingga melakukan submission.
      </p>

      <p>
        Anda juga akan belajar membaca status job, memeriksa
        output, mengenali error dasar, dan memastikan bahwa
        calculation benar-benar berjalan sesuai tujuan.
      </p>

      <div class="hpc-overview-module-link">
        Buka Materi →
      </div>

    </a>


    <!-- 05 -->

    <a
      class="hpc-overview-module hpc-overview-module-featured"
      href="script-library/"
    >

      <div class="hpc-overview-module-top">

        <span>
          05
        </span>

        <small>
          TEMPLATE
        </small>

      </div>

      <h3>
        Script Library
      </h3>

      <p>
        Script Library menyediakan contoh job script yang dapat
        digunakan sebagai titik awal. Peserta tidak perlu selalu
        membuat script dari awal untuk setiap calculation.
      </p>

      <p>
        Gunakan template yang tersedia, pahami setiap bagian
        script, sesuaikan nama file, resource, waktu, software,
        dan parameter calculation sebelum digunakan.
      </p>

      <div class="hpc-overview-module-link">
        Buka Script Library →
      </div>

    </a>


    <!-- 06 -->

    <a
      class="hpc-overview-module"
      href="../../hands-on-project/"
    >

      <div class="hpc-overview-module-top">

        <span>
          06
        </span>

        <small>
          APLIKASI
        </small>

      </div>

      <h3>
        Research Cases
      </h3>

      <p>
        Research Cases menghubungkan konsep computational environment
        dengan permasalahan penelitian. Pada bagian ini, peserta dapat
        melihat bagaimana workflow HPC digunakan untuk menjalankan
        simulasi pada sistem material yang lebih nyata.
      </p>

      <p>
        Contoh workflow dapat mencakup Quantum ESPRESSO,
        DCDFTBMD, molecular dynamics, MACE, serta analisis
        hasil simulasi sesuai tujuan penelitian.
      </p>

      <div class="hpc-overview-module-link">
        Lihat Research Cases →
      </div>

    </a>


  </section>


  <!-- =====================================================
       WORKFLOW
       ===================================================== -->

  <section
    class="hpc-overview-section-head
           hpc-overview-section-head-tight"
  >

    <span>
      ALUR KERJA HPC
    </span>

    <h2>
      Dari terminal hingga hasil penelitian
    </h2>

    <p>
      Workflow HPC dapat dipahami sebagai rangkaian tahapan
      yang saling berhubungan. Setiap tahap memiliki tujuan
      yang berbeda dan perlu dilakukan secara berurutan.
    </p>

    <p>
      Memahami alur ini membantu peserta mengetahui posisi
      setiap aktivitas dalam keseluruhan proses simulasi.
    </p>

  </section>


  <section class="hpc-overview-flow">


    <!-- 01 -->

    <div class="hpc-overview-flow-step">

      <span>
        01
      </span>

      <strong>
        Akses
      </strong>

      <small>
        Hubungkan ke sistem HPC
      </small>

      <p>
        Masuk ke sistem dan pastikan
        lingkungan kerja tersedia.
      </p>

    </div>


    <div class="hpc-overview-flow-line"></div>


    <!-- 02 -->

    <div class="hpc-overview-flow-step">

      <span>
        02
      </span>

      <strong>
        Persiapan
      </strong>

      <small>
        Input dan software
      </small>

      <p>
        Siapkan struktur, input,
        software, dan dependency.
      </p>

    </div>


    <div class="hpc-overview-flow-line"></div>


    <!-- 03 -->

    <div class="hpc-overview-flow-step">

      <span>
        03
      </span>

      <strong>
        Submit
      </strong>

      <small>
        Kirim job ke scheduler
      </small>

      <p>
        Tentukan resource dan
        kirim calculation sebagai job.
      </p>

    </div>


    <div class="hpc-overview-flow-line"></div>


    <!-- 04 -->

    <div class="hpc-overview-flow-step">

      <span>
        04
      </span>

      <strong>
        Monitoring
      </strong>

      <small>
        Pantau status job
      </small>

      <p>
        Periksa status job dan
        pastikan calculation berjalan.
      </p>

    </div>


    <div class="hpc-overview-flow-line"></div>


    <!-- 05 -->

    <div class="hpc-overview-flow-step">

      <span>
        05
      </span>

      <strong>
        Analisis
      </strong>

      <small>
        Interpretasikan hasil
      </small>

      <p>
        Periksa output dan gunakan
        hasil untuk menjawab pertanyaan ilmiah.
      </p>

    </div>


  </section>


  <!-- =====================================================
       MAHAMERU BRIN
       ===================================================== -->

  <section class="hpc-overview-mahameru">

    <div class="hpc-overview-mahameru-label">
      HPC WORKSHOP
    </div>

    <h2>
      Bekerja pada HPC Mahameru BRIN
    </h2>

    <p>
      Dalam workshop ini, lingkungan HPC digunakan sebagai
      tempat menjalankan calculation yang membutuhkan sumber
      daya komputasi lebih besar daripada komputer pribadi.
      Peserta akan berinteraksi dengan sistem melalui terminal,
      mengelola file dan software, kemudian mengirim calculation
      ke resource komputasi yang tersedia.
    </p>

    <p>
      Fokus utama bukan hanya membuat calculation berjalan,
      tetapi memahami seluruh workflow. Peserta perlu mengetahui
      dari mana input berasal, software apa yang digunakan,
      resource apa yang diperlukan, bagaimana job dijalankan,
      dan di mana hasil calculation tersimpan.
    </p>

    <p>
      Prinsip ini penting ketika workflow dikembangkan menjadi
      penelitian yang lebih besar. Workflow yang terstruktur
      membuat proses komputasi lebih mudah diperiksa, diulang,
      didokumentasikan, dan dikembangkan.
    </p>

  </section>


  <!-- =====================================================
       QUICK START
       ===================================================== -->

  <section class="hpc-overview-quick">

    <div class="hpc-overview-quick-main">

      <span>
        MULAI CEPAT
      </span>

      <h2>
        Sudah terbiasa menggunakan Linux?
      </h2>

      <p>
        Jika Anda sudah memahami command dasar Linux,
        tidak perlu mengulang seluruh materi dari awal.
        Gunakan Script Library untuk melihat contoh job script,
        kemudian lanjutkan ke Running Calculations untuk
        memahami proses submission dan monitoring.
      </p>

      <p>
        Jika Anda belum terbiasa dengan HPC, tetap disarankan
        mengikuti urutan materi dari Akses & Linux agar setiap
        tahapan workflow dapat dipahami dengan baik.
      </p>

    </div>


    <div class="hpc-overview-quick-actions">

      <a href="script-library/">
        Buka Script Library
      </a>

      <a href="running-calculations/">
        Pelajari Running Calculations
      </a>

    </div>

  </section>


  <!-- =====================================================
       BEFORE RESEARCH
       ===================================================== -->

  <section class="hpc-overview-check">

    <div class="hpc-overview-check-label">
      SEBELUM MASUK KE SIMULASI
    </div>

    <h2>
      Pastikan Anda sudah memahami dasar berikut
    </h2>

    <p>
      Sebelum menjalankan research case, pastikan Anda sudah
      dapat mengakses sistem HPC, berpindah directory, membuat
      dan membaca file, memeriksa software, serta memahami
      konsep dasar job submission.
    </p>

    <div class="hpc-overview-check-list">

      <div>
        <span>✓</span>
        <p>
          Dapat mengakses HPC melalui terminal atau SSH.
        </p>
      </div>

      <div>
        <span>✓</span>
        <p>
          Dapat memahami home directory dan struktur filesystem.
        </p>
      </div>

      <div>
        <span>✓</span>
        <p>
          Dapat menggunakan command Linux dasar.
        </p>
      </div>

      <div>
        <span>✓</span>
        <p>
          Dapat memeriksa dan menyiapkan software environment.
        </p>
      </div>

      <div>
        <span>✓</span>
        <p>
          Memahami konsep dasar job, scheduler, dan compute resource.
        </p>
      </div>

      <div>
        <span>✓</span>
        <p>
          Mengetahui cara menemukan output dan memeriksa hasil calculation.
        </p>
      </div>

    </div>

  </section>


  <!-- =====================================================
       RESEARCH CONNECTION
       ===================================================== -->

  <section class="hpc-overview-footer">

    <div>

      <span>
        HUBUNGAN DENGAN PENELITIAN
      </span>

      <h2>
        Computational Environment → Research Cases
      </h2>

      <p>
        Computational Environment menyediakan fondasi teknis
        untuk menjalankan workflow komputasi. Peserta belajar
        bagaimana sistem diakses, software disiapkan, calculation
        dijalankan, dan output diperiksa.
      </p>

      <p>
        Setelah fondasi tersebut dikuasai, peserta dapat berpindah
        ke Research Cases untuk menerapkan workflow pada sistem
        material dan permasalahan ilmiah yang lebih spesifik.
      </p>

    </div>


    <a href="../../hands-on-project/">
      Jelajahi Research Cases →
    </a>

  </section>


</div>