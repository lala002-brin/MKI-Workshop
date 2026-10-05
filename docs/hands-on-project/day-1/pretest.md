<div class="posttest-page">

  <!-- =====================================================
       HERO
       ===================================================== -->

  <section class="posttest-hero">

    <div class="posttest-hero-content">

      <div class="posttest-eyebrow">
        MKI COMPUTATIONAL MATERIALS SCIENCE WORKSHOP
      </div>

      <h1>
        Postest: Linux & Computational Environment
      </h1>

      <p class="posttest-description">
        Evaluasi pemahaman peserta mengenai Linux, lingkungan komputasi,
        DCDFTBMD, Quantum ESPRESSO, MACE, dan HPC Mahameru BRIN.
      </p>

    </div>


    <div class="posttest-count">

      <span class="posttest-count-number">
        25
      </span>

      <span class="posttest-count-label">
        SOAL
      </span>

    </div>

  </section>



  <!-- =====================================================
       ACTION BUTTON
       ===================================================== -->

  <div class="posttest-actions">

    <button
      type="button"
      id="posttest-save"
      class="posttest-btn posttest-btn-save">

      💾 Simpan

    </button>


    <button
      type="button"
      id="posttest-reset"
      class="posttest-btn posttest-btn-reset">

      ↻ Reset

    </button>


    <button
      type="button"
      id="posttest-submit"
      class="posttest-btn posttest-btn-submit">

      ✓ Submit & Score

    </button>

  </div>



  <!-- =====================================================
       STATUS
       ===================================================== -->

  <div
    id="posttest-status"
    class="posttest-status">

    Siap mengerjakan postest.

  </div>



  <!-- =====================================================
       PARTICIPANT INFORMATION
       ===================================================== -->

  <section class="posttest-card">

    <div class="posttest-section-header">

      <div class="posttest-section-number">
        01
      </div>


      <div>

        <h2 class="posttest-section-title">
          Informasi Peserta
        </h2>

        <p class="posttest-section-subtitle">
          Lengkapi identitas sebelum mengerjakan postest.
        </p>

      </div>

    </div>


    <div class="posttest-participant-grid">


      <!-- NAMA -->

      <div class="posttest-field">

        <label for="participant-name">
          Nama Peserta
        </label>

        <input
          type="text"
          id="participant-name"
          placeholder="Masukkan nama lengkap"
          autocomplete="name"
        >

      </div>


      <!-- TANGGAL -->

      <div class="posttest-field">

        <label for="participant-date">
          Tanggal
        </label>

        <input
          type="date"
          id="participant-date"
        >

      </div>


      <!-- PENGALAMAN -->

      <div class="posttest-field">

        <label for="linux-experience">
          Pengalaman Linux
        </label>

        <select id="linux-experience">

          <option value="">
            Pilih pengalaman
          </option>

          <option value="belum">
            Belum pernah menggunakan Linux
          </option>

          <option value="dasar">
            Dasar
          </option>

          <option value="menengah">
            Menengah
          </option>

          <option value="mahir">
            Mahir
          </option>

        </select>

      </div>

    </div>

  </section>



  <!-- =====================================================
       PROGRESS
       ===================================================== -->

  <section class="posttest-progress-card">

    <div class="posttest-progress-top">

      <div>

        <div class="posttest-progress-title">
          Progress Postest
        </div>

        <div
          id="posttest-progress-percent"
          class="posttest-progress-percent">

          0% selesai

        </div>

      </div>


      <strong
        id="posttest-progress-text"
        class="posttest-progress-value">

        0 / 25 terjawab

      </strong>

    </div>


    <div class="posttest-progress-track">

      <div
        id="posttest-progress-bar"
        class="posttest-progress-fill">

      </div>

    </div>

  </section>



  <!-- =====================================================
       INSTRUCTION
       ===================================================== -->

  <section class="posttest-instruction">

    <div class="posttest-instruction-icon">
      ℹ
    </div>

    <div>

      <strong>
        Petunjuk Pengerjaan
      </strong>

      <p>
        Pilih satu jawaban yang paling tepat pada setiap soal.
        Jawaban dapat disimpan terlebih dahulu dan dapat dilanjutkan
        kembali sebelum tombol Submit & Score digunakan.
      </p>

    </div>

  </section>



  <!-- =====================================================
       SECTION 02
       LINUX
       ===================================================== -->

  <section class="posttest-topic">

    <div class="posttest-topic-header">

      <span class="posttest-topic-number">
        02
      </span>

      <div>

        <h2>
          Linux dan Command Line
        </h2>

        <p>
          Dasar penggunaan terminal dan pengelolaan lingkungan kerja Linux.
        </p>

      </div>

    </div>



    <!-- ===================================================
         SOAL 01
         =================================================== -->

    <div class="posttest-question">

      <div class="posttest-question-header">

        <div class="posttest-question-number">
          Soal 01
        </div>

        <div class="posttest-question-text">
          Perintah Linux apa yang digunakan untuk menampilkan
          isi direktori saat ini?
        </div>

      </div>


      <div class="posttest-options">

        <label class="posttest-option">

          <input
            type="radio"
            name="q1"
            value="A"
          >

          <span>
            A. cd
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q1"
            value="B"
          >

          <span>
            B. ls
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q1"
            value="C"
          >

          <span>
            C. pwd
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q1"
            value="D"
          >

          <span>
            D. mkdir
          </span>

        </label>

      </div>

    </div>



    <!-- ===================================================
         SOAL 02
         =================================================== -->

    <div class="posttest-question">

      <div class="posttest-question-header">

        <div class="posttest-question-number">
          Soal 02
        </div>

        <div class="posttest-question-text">
          Apa yang ditampilkan oleh perintah pwd?
        </div>

      </div>


      <div class="posttest-options">

        <label class="posttest-option">

          <input
            type="radio"
            name="q2"
            value="A"
          >

          <span>
            A. Direktori kerja saat ini
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q2"
            value="B"
          >

          <span>
            B. Isi direktori
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q2"
            value="C"
          >

          <span>
            C. Kata sandi pengguna
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q2"
            value="D"
          >

          <span>
            D. Daftar proses yang berjalan
          </span>

        </label>

      </div>

    </div>



    <!-- ===================================================
         SOAL 03
         =================================================== -->

    <div class="posttest-question">

      <div class="posttest-question-header">

        <div class="posttest-question-number">
          Soal 03
        </div>

        <div class="posttest-question-text">
          Perintah apa yang digunakan untuk membuat direktori baru
          di Linux?
        </div>

      </div>


      <div class="posttest-options">

        <label class="posttest-option">

          <input
            type="radio"
            name="q3"
            value="A"
          >

          <span>
            A. touch
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q3"
            value="B"
          >

          <span>
            B. mkdir
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q3"
            value="C"
          >

          <span>
            C. grep
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q3"
            value="D"
          >

          <span>
            D. pwd
          </span>

        </label>

      </div>

    </div>



    <!-- ===================================================
         SOAL 04
         =================================================== -->

    <div class="posttest-question">

      <div class="posttest-question-header">

        <div class="posttest-question-number">
          Soal 04
        </div>

        <div class="posttest-question-text">
          Perintah apa yang digunakan untuk berpindah dari satu
          direktori ke direktori lainnya?
        </div>

      </div>


      <div class="posttest-options">

        <label class="posttest-option">

          <input
            type="radio"
            name="q4"
            value="A"
          >

          <span>
            A. ls
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q4"
            value="B"
          >

          <span>
            B. cat
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q4"
            value="C"
          >

          <span>
            C. cd
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q4"
            value="D"
          >

          <span>
            D. mv
          </span>

        </label>

      </div>

    </div>



    <!-- ===================================================
         SOAL 05
         =================================================== -->

    <div class="posttest-question">

      <div class="posttest-question-header">

        <div class="posttest-question-number">
          Soal 05
        </div>

        <div class="posttest-question-text">
          Perintah apa yang umum digunakan untuk menampilkan
          isi sebuah berkas teks di terminal Linux?
        </div>

      </div>


      <div class="posttest-options">

        <label class="posttest-option">

          <input
            type="radio"
            name="q5"
            value="A"
          >

          <span>
            A. cat
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q5"
            value="B"
          >

          <span>
            B. cd
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q5"
            value="C"
          >

          <span>
            C. mkdir
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q5"
            value="D"
          >

          <span>
            D. rm
          </span>

        </label>

      </div>

    </div>



    <!-- ===================================================
         SOAL 06
         =================================================== -->

    <div class="posttest-question">

      <div class="posttest-question-header">

        <div class="posttest-question-number">
          Soal 06
        </div>

        <div class="posttest-question-text">
          Perintah mana yang digunakan untuk mengetahui lokasi
          lengkap direktori kerja saat ini?
        </div>

      </div>


      <div class="posttest-options">

        <label class="posttest-option">

          <input
            type="radio"
            name="q6"
            value="A"
          >

          <span>
            A. ls
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q6"
            value="B"
          >

          <span>
            B. pwd
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q6"
            value="C"
          >

          <span>
            C. cd
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q6"
            value="D"
          >

          <span>
            D. clear
          </span>

        </label>

      </div>

    </div>



    <!-- ===================================================
         SOAL 07
         =================================================== -->

    <div class="posttest-question">

      <div class="posttest-question-header">

        <div class="posttest-question-number">
          Soal 07
        </div>

        <div class="posttest-question-text">
          Mengapa struktur direktori dan working directory penting
          dalam pekerjaan komputasi di Linux?
        </div>

      </div>


      <div class="posttest-options">

        <label class="posttest-option">

          <input
            type="radio"
            name="q7"
            value="A"
          >

          <span>
            A. Karena lokasi berkas menentukan bagaimana perintah
            dan program menemukan input serta output
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q7"
            value="B"
          >

          <span>
            B. Karena direktori menentukan warna terminal
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q7"
            value="C"
          >

          <span>
            C. Karena direktori mengubah jumlah atom dalam simulasi
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q7"
            value="D"
          >

          <span>
            D. Karena direktori menggantikan perangkat keras HPC
          </span>

        </label>

      </div>

    </div>



    <!-- ===================================================
         SOAL 08
         =================================================== -->

    <div class="posttest-question">

      <div class="posttest-question-header">

        <div class="posttest-question-number">
          Soal 08
        </div>

        <div class="posttest-question-text">
          Apa fungsi environment dalam lingkungan komputasi Linux?
        </div>

      </div>


      <div class="posttest-options">

        <label class="posttest-option">

          <input
            type="radio"
            name="q8"
            value="A"
          >

          <span>
            A. Mengatur kondisi dan konfigurasi yang digunakan
            oleh program saat dijalankan
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q8"
            value="B"
          >

          <span>
            B. Menghapus semua dependency program
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q8"
            value="C"
          >

          <span>
            C. Mengubah struktur kristal secara otomatis
          </span>

        </label>


        <label class="posttest-option">

          <input
            type="radio"
            name="q8"
            value="D"
          >

          <span>
            D. Menggantikan sistem operasi Linux
          </span>

        </label>

      </div>

    </div>

  </section>
  <!-- =====================================================
       SOAL 09
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 09
      </div>

      <div class="posttest-question-text">
        Apa fungsi SSH ketika peserta bekerja dengan komputer
        atau server HPC secara jarak jauh?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q9"
          value="A"
        >

        <span>
          A. Mengubah struktur atom menjadi gambar
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q9"
          value="B"
        >

        <span>
          B. Menyediakan koneksi terminal yang aman ke sistem jarak jauh
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q9"
          value="C"
        >

        <span>
          C. Menggantikan seluruh perangkat lunak simulasi
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q9"
          value="D"
        >

        <span>
          D. Mengubah massa atom
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 10
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 10
      </div>

      <div class="posttest-question-text">
        Mengapa pemeriksaan versi perangkat lunak penting sebelum
        menjalankan simulasi komputasi?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q10"
          value="A"
        >

        <span>
          A. Untuk memastikan perangkat lunak dan fitur yang digunakan
          sesuai dengan kebutuhan perhitungan
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q10"
          value="B"
        >

        <span>
          B. Untuk mengubah jumlah atom dalam sistem
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q10"
          value="C"
        >

        <span>
          C. Untuk menghapus seluruh output simulasi
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q10"
          value="D"
        >

        <span>
          D. Untuk mengubah resolusi layar
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 11
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 11
      </div>

      <div class="posttest-question-text">
        Apa tujuan utama perhitungan SCF dalam Quantum ESPRESSO?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q11"
          value="A"
        >

        <span>
          A. Membuat direktori baru di Linux
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q11"
          value="B"
        >

        <span>
          B. Mengompresi hasil simulasi
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q11"
          value="C"
        >

        <span>
          C. Memperoleh struktur elektronik yang konsisten
          melalui proses self-consistent field
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q11"
          value="D"
        >

        <span>
          D. Melatih model machine learning
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 12
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 12
      </div>

      <div class="posttest-question-text">
        Apa yang dimaksud dengan pseudopotential dalam perhitungan
        DFT menggunakan Quantum ESPRESSO?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q12"
          value="A"
        >

        <span>
          A. File yang digunakan untuk menyimpan trajectory
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q12"
          value="B"
        >

        <span>
          B. Pendekatan efektif untuk merepresentasikan interaksi
          elektron valensi dengan inti atom
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q12"
          value="C"
        >

        <span>
          C. Perintah untuk menjalankan program Linux
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q12"
          value="D"
        >

        <span>
          D. Format khusus untuk menyimpan gambar
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 13
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 13
      </div>

      <div class="posttest-question-text">
        Mengapa konvergensi perlu diperhatikan dalam perhitungan
        struktur elektronik?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q13"
          value="A"
        >

        <span>
          A. Konvergensi menunjukkan bahwa proses iteratif telah
          mencapai kriteria numerik yang ditentukan
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q13"
          value="B"
        >

        <span>
          B. Konvergensi menghilangkan kebutuhan terhadap input
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q13"
          value="C"
        >

        <span>
          C. Konvergensi secara otomatis menambah jumlah atom
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q13"
          value="D"
        >

        <span>
          D. Konvergensi menggantikan pseudopotential
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 14
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 14
      </div>

      <div class="posttest-question-text">
        Faktor mana yang dapat meningkatkan biaya komputasi
        perhitungan DFT?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q14"
          value="A"
        >

        <span>
          A. Warna font terminal
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q14"
          value="B"
        >

        <span>
          B. Tema browser
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q14"
          value="C"
        >

        <span>
          C. Ukuran sistem dan parameter cutoff yang digunakan
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q14"
          value="D"
        >

        <span>
          D. Nama pengguna Linux
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 15
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 15
      </div>

      <div class="posttest-question-text">
        Dalam workflow computational materials, mengapa hasil
        perhitungan Quantum ESPRESSO perlu diperiksa sebelum
        digunakan untuk analisis lebih lanjut?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q15"
          value="A"
        >

        <span>
          A. Untuk memastikan perhitungan berjalan dengan benar
          dan memenuhi kriteria yang diperlukan
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q15"
          value="B"
        >

        <span>
          B. Untuk mengubah nama sistem
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q15"
          value="C"
        >

        <span>
          C. Untuk menghapus semua file input
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q15"
          value="D"
        >

        <span>
          D. Untuk mengganti sistem operasi
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 16
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 16
      </div>

      <div class="posttest-question-text">
        Apa fungsi utama MACE dalam pemodelan material berbasis
        machine learning?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q16"
          value="A"
        >

        <span>
          A. Mengelola akun pengguna HPC
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q16"
          value="B"
        >

        <span>
          B. Melakukan pemodelan atomistik menggunakan model
          machine learning untuk memprediksi energi dan gaya
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q16"
          value="C"
        >

        <span>
          C. Membuat direktori Linux
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q16"
          value="D"
        >

        <span>
          D. Membuat dokumen Markdown
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 17
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 17
      </div>

      <div class="posttest-question-text">
        Apa fungsi checkpoint pada model MACE?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q17"
          value="A"
        >

        <span>
          A. Menyimpan kondisi model yang telah dilatih sehingga
          dapat digunakan kembali
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q17"
          value="B"
        >

        <span>
          B. Menyimpan password pengguna
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q17"
          value="C"
        >

        <span>
          C. Menyimpan kernel Linux
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q17"
          value="D"
        >

        <span>
          D. Menggantikan struktur atom
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 18
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 18
      </div>

      <div class="posttest-question-text">
        Mengapa model machine learning seperti MACE perlu
        divalidasi menggunakan data yang tidak digunakan
        selama proses training?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q18"
          value="A"
        >

        <span>
          A. Untuk membuat model menghafal seluruh data training
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q18"
          value="B"
        >

        <span>
          B. Untuk menghapus data training
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q18"
          value="C"
        >

        <span>
          C. Untuk mengevaluasi kemampuan model dalam melakukan
          generalisasi terhadap data yang belum pernah dilihat
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q18"
          value="D"
        >

        <span>
          D. Untuk meningkatkan kapasitas hard disk
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 19
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 19
      </div>

      <div class="posttest-question-text">
        Hubungan apa yang digunakan untuk menentukan gaya atom
        dari energi potensial dalam model interatomic potential?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q19"
          value="A"
        >

        <span>
          A. Gaya berkaitan dengan gradien negatif energi potensial
          terhadap posisi atom
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q19"
          value="B"
        >

        <span>
          B. Gaya ditentukan oleh nama file
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q19"
          value="C"
        >

        <span>
          C. Gaya ditentukan oleh nama pengguna Linux
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q19"
          value="D"
        >

        <span>
          D. Gaya ditentukan oleh jumlah tab browser
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 20
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 20
      </div>

      <div class="posttest-question-text">
        Mengapa MACE dapat membantu mempercepat simulasi
        atomistik tertentu?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q20"
          value="A"
        >

        <span>
          A. Karena MACE menghilangkan semua perhitungan numerik
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q20"
          value="B"
        >

        <span>
          B. Karena MACE menggunakan model machine learning yang
          telah dilatih untuk memprediksi interaksi atom
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q20"
          value="C"
        >

        <span>
          C. Karena MACE menghilangkan kebutuhan terhadap koordinat atom
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q20"
          value="D"
        >

        <span>
          D. Karena MACE selalu menghasilkan hasil kuantum yang eksak
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 21
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 21
      </div>

      <div class="posttest-question-text">
        Apa keuntungan utama menggunakan HPC seperti Mahameru
        untuk penelitian computational materials?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q21"
          value="A"
        >

        <span>
          A. Menyediakan sumber daya komputasi untuk menjalankan
          perhitungan yang lebih besar atau lebih kompleks
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q21"
          value="B"
        >

        <span>
          B. Menghilangkan kebutuhan terhadap input file
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q21"
          value="C"
        >

        <span>
          C. Menjamin seluruh hasil simulasi pasti benar
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q21"
          value="D"
        >

        <span>
          D. Menulis laporan penelitian secara otomatis
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 22
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 22
      </div>

      <div class="posttest-question-text">
        Ketika menjalankan simulasi di HPC Mahameru, mengapa
        penggunaan resource perlu diperhatikan?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q22"
          value="A"
        >

        <span>
          A. Karena resource seperti CPU, GPU, memori, dan waktu
          komputasi memengaruhi pelaksanaan pekerjaan
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q22"
          value="B"
        >

        <span>
          B. Karena resource menentukan warna terminal
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q22"
          value="C"
        >

        <span>
          C. Karena resource mengubah nomor atom
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q22"
          value="D"
        >

        <span>
          D. Karena resource menggantikan software simulasi
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 23
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 23
      </div>

      <div class="posttest-question-text">
        Apa yang perlu diperiksa sebelum menjalankan job
        komputasi di HPC?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q23"
          value="A"
        >

        <span>
          A. Hanya warna terminal
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q23"
          value="B"
        >

        <span>
          B. Direktori kerja, input file, environment,
          resource, dan konfigurasi job
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q23"
          value="C"
        >

        <span>
          C. Hanya wallpaper komputer
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q23"
          value="D"
        >

        <span>
          D. Hanya nama pengguna
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 24
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 24
      </div>

      <div class="posttest-question-text">
        Urutan workflow mana yang paling tepat dalam penelitian
        computational materials?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q24"
          value="A"
        >

        <span>
          A. Menjalankan simulasi terlebih dahulu lalu menentukan
          sistem dan parameter
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q24"
          value="B"
        >

        <span>
          B. Mengubah parameter secara acak sampai menghasilkan grafik
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q24"
          value="C"
        >

        <span>
          C. Menyiapkan sistem, memeriksa input dan environment,
          menjalankan simulasi, menganalisis output, dan memvalidasi hasil
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q24"
          value="D"
        >

        <span>
          D. Menganalisis screenshot tanpa memeriksa output
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       SOAL 25
       ===================================================== -->

  <div class="posttest-question">

    <div class="posttest-question-header">

      <div class="posttest-question-number">
        Soal 25
      </div>

      <div class="posttest-question-text">
        Pernyataan mana yang paling tepat menggambarkan hubungan
        antara Linux, DCDFTBMD, Quantum ESPRESSO, MACE, dan HPC
        dalam workflow workshop ini?
      </div>

    </div>


    <div class="posttest-options">

      <label class="posttest-option">

        <input
          type="radio"
          name="q25"
          value="A"
        >

        <span>
          A. Semua perangkat tersebut merupakan perintah Linux
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q25"
          value="B"
        >

        <span>
          B. Semua perangkat tersebut hanya digunakan untuk visualisasi
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q25"
          value="C"
        >

        <span>
          C. Linux menyediakan lingkungan kerja, perangkat lunak
          seperti DCDFTBMD, Quantum ESPRESSO, dan MACE menjalankan
          tahapan komputasi tertentu, sedangkan HPC menyediakan
          sumber daya komputasi untuk menjalankan pekerjaan tersebut
        </span>

      </label>


      <label class="posttest-option">

        <input
          type="radio"
          name="q25"
          value="D"
        >

        <span>
          D. Semua perangkat tersebut tidak dapat digunakan
          dalam satu workflow
        </span>

      </label>

    </div>

  </div>



  <!-- =====================================================
       HASIL POSTEST
       ===================================================== -->

  <section
    id="posttest-result"
    class="posttest-result"
    style="display: none;">

    <div class="posttest-result-header">

      <div>

        <div class="posttest-result-kicker">
          HASIL POSTEST
        </div>

        <h2>
          Hasil Evaluasi
        </h2>

      </div>

    </div>


    <div class="posttest-result-score">

      <div class="posttest-score-main">

        <span>
          Skor
        </span>

        <strong id="posttest-score">
          0 / 25
        </strong>

      </div>


      <div class="posttest-score-percent">

        <strong id="posttest-percentage">
          0%
        </strong>

        <span>
          Persentase
        </span>

      </div>

    </div>


    <div class="posttest-result-stat">

      <div>

        <span>
          Benar
        </span>

        <strong id="posttest-correct">
          0
        </strong>

      </div>


      <div>

        <span>
          Salah
        </span>

        <strong id="posttest-incorrect">
          0
        </strong>

      </div>


      <div>

        <span>
          Belum Dijawab
        </span>

        <strong id="posttest-unanswered">
          25
        </strong>

      </div>

    </div>


    <div class="posttest-result-message">

      <strong>
        Evaluasi selesai.
      </strong>

      <p>
        Periksa kembali jawaban yang salah dan gunakan hasil
        postest sebagai bahan evaluasi pemahaman materi workshop.
      </p>

    </div>

  </section>



  <!-- =====================================================
       IMPORTANT NOTE
       ===================================================== -->

  <section class="posttest-important">

    <strong>
      Catatan
    </strong>

    <p>
      Postest digunakan untuk mengevaluasi pemahaman peserta
      setelah mengikuti rangkaian workshop. Hasil skor dapat
      digunakan sebagai bahan refleksi terhadap materi Linux,
      DCDFTBMD, Quantum ESPRESSO, MACE, dan HPC.
    </p>

  </section>


</div>
