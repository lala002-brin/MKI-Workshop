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



<!-- SOAL 01 -->

<div
  class="posttest-question"
  data-answer="B"
  data-explanation="Perintah ls digunakan untuk menampilkan isi direktori.">

  <div class="posttest-question-header">

    <div class="posttest-question-number">
      Soal 01
    </div>

    <div class="posttest-question-text">
      Perintah Linux apa yang digunakan untuk melihat isi
      direktori saat ini?
    </div>

  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q1" value="A">
      <span>A. pwd</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q1" value="B">
      <span>B. ls</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q1" value="C">
      <span>C. cd</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q1" value="D">
      <span>D. mkdir</span>
    </label>

  </div>

</div>


<!-- SOAL 02 -->

<div
  class="posttest-question"
  data-answer="A"
  data-explanation="Perintah pwd menampilkan path direktori kerja saat ini.">

  <div class="posttest-question-header">

    <div class="posttest-question-number">
      Soal 02
    </div>

    <div class="posttest-question-text">
      Perintah apa yang digunakan untuk mengetahui lokasi
      direktori kerja saat ini?
    </div>

  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q2" value="A">
      <span>A. pwd</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q2" value="B">
      <span>B. ls</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q2" value="C">
      <span>C. cd</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q2" value="D">
      <span>D. whoami</span>
    </label>

  </div>

</div>


<!-- SOAL 03 -->

<div
  class="posttest-question"
  data-answer="C"
  data-explanation="Perintah cd digunakan untuk berpindah direktori.">

  <div class="posttest-question-header">

    <div class="posttest-question-number">
      Soal 03
    </div>

    <div class="posttest-question-text">
      Perintah apa yang digunakan untuk berpindah ke direktori
      lain di Linux?
    </div>

  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q3" value="A">
      <span>A. ls</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q3" value="B">
      <span>B. pwd</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q3" value="C">
      <span>C. cd</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q3" value="D">
      <span>D. cat</span>
    </label>

  </div>

</div>


<!-- SOAL 04 -->

<div
  class="posttest-question"
  data-answer="D"
  data-explanation="Perintah mkdir digunakan untuk membuat direktori baru.">

  <div class="posttest-question-header">

    <div class="posttest-question-number">
      Soal 04
    </div>

    <div class="posttest-question-text">
      Perintah apa yang digunakan untuk membuat direktori baru?
    </div>

  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q4" value="A">
      <span>A. touch</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q4" value="B">
      <span>B. cd</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q4" value="C">
      <span>C. rm</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q4" value="D">
      <span>D. mkdir</span>
    </label>

  </div>

</div>


<!-- SOAL 05 -->

<div
  class="posttest-question"
  data-answer="A"
  data-explanation="Perintah cat dapat digunakan untuk menampilkan isi file teks di terminal.">

  <div class="posttest-question-header">

    <div class="posttest-question-number">
      Soal 05
    </div>

    <div class="posttest-question-text">
      Perintah apa yang dapat digunakan untuk menampilkan isi
      file teks di terminal?
    </div>

  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q5" value="A">
      <span>A. cat</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q5" value="B">
      <span>B. cd</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q5" value="C">
      <span>C. mkdir</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q5" value="D">
      <span>D. clear</span>
    </label>

  </div>

</div>


<!-- SOAL 06 -->

<div
  class="posttest-question"
  data-answer="C"
  data-explanation="Perintah cp digunakan untuk menyalin file atau direktori.">

  <div class="posttest-question-header">

    <div class="posttest-question-number">
      Soal 06
    </div>

    <div class="posttest-question-text">
      Perintah apa yang digunakan untuk menyalin file
      di Linux?
    </div>

  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q6" value="A">
      <span>A. mv</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q6" value="B">
      <span>B. rm</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q6" value="C">
      <span>C. cp</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q6" value="D">
      <span>D. grep</span>
    </label>

  </div>

</div>


<!-- SOAL 07 -->

<div
  class="posttest-question"
  data-answer="B"
  data-explanation="Perintah mv digunakan untuk memindahkan atau mengganti nama file dan direktori.">

  <div class="posttest-question-header">

    <div class="posttest-question-number">
      Soal 07
    </div>

    <div class="posttest-question-text">
      Perintah apa yang dapat digunakan untuk memindahkan
      file dari satu direktori ke direktori lain?
    </div>

  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q7" value="A">
      <span>A. cp</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q7" value="B">
      <span>B. mv</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q7" value="C">
      <span>C. cat</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q7" value="D">
      <span>D. pwd</span>
    </label>

  </div>

</div>


<!-- SOAL 08 -->

<div
  class="posttest-question"
  data-answer="D"
  data-explanation="Perintah rm digunakan untuk menghapus file. Pengguna perlu berhati-hati karena penghapusan dapat bersifat permanen.">

  <div class="posttest-question-header">

    <div class="posttest-question-number">
      Soal 08
    </div>

    <div class="posttest-question-text">
      Perintah apa yang digunakan untuk menghapus sebuah file
      di Linux?
    </div>

  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q8" value="A">
      <span>A. cp</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q8" value="B">
      <span>B. mv</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q8" value="C">
      <span>C. cat</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q8" value="D">
      <span>D. rm</span>
    </label>

  </div>

</div>
<!-- SOAL 09 -->

<div
  class="posttest-question"
  data-answer="B"
  data-explanation="Working directory menentukan lokasi tempat perintah dijalankan dan membantu program menemukan file input serta menghasilkan output pada lokasi yang benar.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 09</div>

    <div class="posttest-question-text">
      Mengapa working directory penting ketika menjalankan
      program komputasi?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q9" value="A">
      <span>A. Untuk menentukan warna terminal</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q9" value="B">
      <span>
        B. Untuk menentukan lokasi kerja dan akses terhadap
        file input serta output
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q9" value="C">
      <span>C. Untuk mengubah jumlah CPU secara otomatis</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q9" value="D">
      <span>D. Untuk mengganti sistem operasi</span>
    </label>

  </div>

</div>


<!-- SOAL 10 -->

<div
  class="posttest-question"
  data-answer="C"
  data-explanation="File input berisi parameter dan informasi yang dibutuhkan program untuk menjalankan suatu perhitungan.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 10</div>

    <div class="posttest-question-text">
      Apa fungsi utama input file dalam sebuah simulasi komputasi?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q10" value="A">
      <span>A. Menampilkan grafik secara otomatis</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q10" value="B">
      <span>B. Menghapus output sebelumnya</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q10" value="C">
      <span>
        C. Menentukan parameter dan informasi yang diperlukan
        oleh program
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q10" value="D">
      <span>D. Mengatur resolusi monitor</span>
    </label>

  </div>

</div>


<!-- SOAL 11 -->

<div
  class="posttest-question"
  data-answer="A"
  data-explanation="Output perlu diperiksa untuk memastikan pekerjaan berjalan sesuai konfigurasi dan tidak mengalami error.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 11</div>

    <div class="posttest-question-text">
      Setelah sebuah simulasi selesai, mengapa output perlu diperiksa?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q11" value="A">
      <span>
        A. Untuk memastikan perhitungan selesai dengan benar
        dan tidak menghasilkan error
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q11" value="B">
      <span>B. Untuk mengganti nama pengguna</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q11" value="C">
      <span>C. Untuk mengubah sistem operasi</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q11" value="D">
      <span>D. Untuk menghapus input file</span>
    </label>

  </div>

</div>


<!-- SOAL 12 -->

<div
  class="posttest-question"
  data-answer="D"
  data-explanation="Environment memastikan executable, library, dan dependency yang diperlukan tersedia ketika program dijalankan.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 12</div>

    <div class="posttest-question-text">
      Mengapa environment perangkat lunak perlu diperiksa
      sebelum menjalankan simulasi?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q12" value="A">
      <span>A. Untuk memilih wallpaper</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q12" value="B">
      <span>B. Untuk mengubah struktur atom</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q12" value="C">
      <span>C. Untuk memperbesar ukuran file</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q12" value="D">
      <span>
        D. Untuk memastikan program dan dependency yang diperlukan
        tersedia
      </span>
    </label>

  </div>

</div>


<!-- SOAL 13 -->

<div
  class="posttest-question"
  data-answer="B"
  data-explanation="Reproduksibilitas membutuhkan dokumentasi input, versi software, parameter, environment, dan kondisi perhitungan.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 13</div>

    <div class="posttest-question-text">
      Informasi apa yang penting dicatat agar sebuah simulasi
      komputasi dapat direproduksi?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q13" value="A">
      <span>A. Warna terminal dan wallpaper</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q13" value="B">
      <span>
        B. Input, parameter, versi software, environment,
        dan konfigurasi komputasi
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q13" value="C">
      <span>C. Nama browser</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q13" value="D">
      <span>D. Ukuran layar</span>
    </label>

  </div>

</div>
<!-- SOAL 14 -->

<div
  class="posttest-question"
  data-answer="C"
  data-explanation="HPC menyediakan sumber daya komputasi seperti CPU, GPU, memori, penyimpanan, dan jaringan untuk pekerjaan komputasi berskala besar.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 14</div>

    <div class="posttest-question-text">
      Apa tujuan utama penggunaan HPC dalam penelitian
      computational materials?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q14" value="A">
      <span>A. Menggantikan seluruh software penelitian</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q14" value="B">
      <span>B. Menghilangkan kebutuhan terhadap input</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q14" value="C">
      <span>
        C. Menyediakan sumber daya komputasi untuk pekerjaan
        yang membutuhkan kemampuan komputasi tinggi
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q14" value="D">
      <span>D. Mengubah hasil simulasi secara otomatis</span>
    </label>

  </div>

</div>


<!-- SOAL 15 -->

<div
  class="posttest-question"
  data-answer="A"
  data-explanation="Cluster HPC membagi pekerjaan dan menyediakan resource komputasi melalui sistem pengelolaan job.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 15</div>

    <div class="posttest-question-text">
      Mengapa pekerjaan komputasi pada HPC biasanya dijalankan
      sebagai job?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q15" value="A">
      <span>
        A. Agar sistem dapat mengatur resource dan menjalankan
        pekerjaan sesuai konfigurasi yang diminta
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q15" value="B">
      <span>B. Agar file otomatis berubah menjadi gambar</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q15" value="C">
      <span>C. Agar semua user menggunakan CPU yang sama</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q15" value="D">
      <span>D. Agar input file tidak diperlukan</span>
    </label>

  </div>

</div>


<!-- SOAL 16 -->

<div
  class="posttest-question"
  data-answer="D"
  data-explanation="Resource seperti CPU, GPU, memori, dan waktu dapat memengaruhi keberhasilan serta lama eksekusi sebuah job.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 16</div>

    <div class="posttest-question-text">
      Resource apa yang perlu dipertimbangkan ketika menjalankan
      job pada HPC?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q16" value="A">
      <span>A. Warna terminal</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q16" value="B">
      <span>B. Nama browser</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q16" value="C">
      <span>C. Wallpaper komputer</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q16" value="D">
      <span>
        D. CPU, GPU, memori, dan waktu komputasi
      </span>
    </label>

  </div>

</div>


<!-- SOAL 17 -->

<div
  class="posttest-question"
  data-answer="B"
  data-explanation="Scheduler mengatur antrean dan alokasi resource untuk pekerjaan yang diajukan pengguna.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 17</div>

    <div class="posttest-question-text">
      Apa fungsi scheduler pada sistem HPC?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q17" value="A">
      <span>A. Mengedit file input secara manual</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q17" value="B">
      <span>
        B. Mengatur antrean dan penggunaan resource untuk job
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q17" value="C">
      <span>C. Mengubah struktur material</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q17" value="D">
      <span>D. Membuat grafik hasil simulasi</span>
    </label>

  </div>

</div>


<!-- SOAL 18 -->

<div
  class="posttest-question"
  data-answer="C"
  data-explanation="Job yang meminta resource secara berlebihan dapat menggunakan kapasitas cluster secara tidak efisien dan memengaruhi waktu tunggu.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 18</div>

    <div class="posttest-question-text">
      Mengapa pengguna HPC perlu meminta resource sesuai kebutuhan
      pekerjaan?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q18" value="A">
      <span>A. Agar terminal terlihat lebih cepat</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q18" value="B">
      <span>B. Agar jumlah atom otomatis bertambah</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q18" value="C">
      <span>
        C. Agar penggunaan resource lebih efisien dan job
        dapat berjalan sesuai kebutuhan
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q18" value="D">
      <span>D. Agar software tidak membutuhkan input</span>
    </label>

  </div>

</div>


<!-- SOAL 19 -->

<div
  class="posttest-question"
  data-answer="A"
  data-explanation="Log file membantu pengguna memeriksa status, error, dan informasi yang dihasilkan selama job berjalan.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 19</div>

    <div class="posttest-question-text">
      Apa manfaat memeriksa log atau output job di HPC?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q19" value="A">
      <span>
        A. Untuk mengetahui status pekerjaan dan mendeteksi
        error selama eksekusi
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q19" value="B">
      <span>B. Untuk mengubah nama cluster</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q19" value="C">
      <span>C. Untuk menghapus scheduler</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q19" value="D">
      <span>D. Untuk mengganti sistem operasi</span>
    </label>

  </div>

</div>


<!-- SOAL 20 -->

<div
  class="posttest-question"
  data-answer="D"
  data-explanation="SSH, direktori kerja, environment, input file, job script, resource, dan output merupakan bagian penting dari workflow komputasi pada HPC.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 20</div>

    <div class="posttest-question-text">
      Manakah workflow yang paling tepat sebelum dan saat
      menjalankan simulasi di HPC?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q20" value="A">
      <span>
        A. Login lalu langsung menjalankan program tanpa memeriksa input
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q20" value="B">
      <span>
        B. Membuat grafik lalu menentukan parameter simulasi
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q20" value="C">
      <span>
        C. Menghapus output lalu menjalankan job secara acak
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q20" value="D">
      <span>
        D. Login, menyiapkan direktori dan environment, memeriksa
        input, menentukan resource, menjalankan job, lalu memeriksa output
      </span>
    </label>

  </div>

</div>
<!-- SOAL 21 -->

<div
  class="posttest-question"
  data-answer="B"
  data-explanation="DFT atau Density Functional Theory merupakan pendekatan mekanika kuantum yang digunakan untuk mempelajari sifat elektronik dan energi sistem banyak partikel.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 21</div>

    <div class="posttest-question-text">
      Apa yang dimaksud dengan DFT dalam computational materials?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q21" value="A">
      <span>A. Data File Transfer</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q21" value="B">
      <span>
        B. Density Functional Theory, yaitu pendekatan mekanika
        kuantum untuk mempelajari sistem material
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q21" value="C">
      <span>C. Direct File Terminal</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q21" value="D">
      <span>D. Digital Force Transfer</span>
    </label>

  </div>

</div>


<!-- SOAL 22 -->

<div
  class="posttest-question"
  data-answer="C"
  data-explanation="SCF mencari keadaan elektronik yang konsisten melalui proses iteratif sampai memenuhi kriteria konvergensi.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 22</div>

    <div class="posttest-question-text">
      Apa tujuan proses SCF dalam perhitungan DFT?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q22" value="A">
      <span>A. Membuat direktori Linux</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q22" value="B">
      <span>B. Menghapus output simulasi</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q22" value="C">
      <span>
        C. Mencapai keadaan elektronik yang konsisten
        melalui proses iteratif
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q22" value="D">
      <span>D. Mengatur scheduler HPC</span>
    </label>

  </div>

</div>


<!-- SOAL 23 -->

<div
  class="posttest-question"
  data-answer="A"
  data-explanation="Konvergensi menunjukkan bahwa perubahan nilai yang dihitung telah memenuhi kriteria toleransi yang ditentukan.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 23</div>

    <div class="posttest-question-text">
      Mengapa kriteria konvergensi penting dalam perhitungan DFT?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q23" value="A">
      <span>
        A. Untuk menentukan apakah proses iteratif telah mencapai
        toleransi yang ditetapkan
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q23" value="B">
      <span>B. Untuk menentukan warna terminal</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q23" value="C">
      <span>C. Untuk mengubah username</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q23" value="D">
      <span>D. Untuk membuat akun HPC</span>
    </label>

  </div>

</div>
<!-- SOAL 24 -->

<div
  class="posttest-question"
  data-answer="D"
  data-explanation="Molecular Dynamics atau MD mensimulasikan evolusi sistem atom terhadap waktu berdasarkan gaya yang bekerja pada atom.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 24</div>

    <div class="posttest-question-text">
      Apa tujuan utama simulasi Molecular Dynamics atau MD?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q24" value="A">
      <span>A. Membuat direktori Linux</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q24" value="B">
      <span>B. Mengatur akun pengguna HPC</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q24" value="C">
      <span>C. Menghapus file trajectory</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q24" value="D">
      <span>
        D. Mempelajari evolusi gerak atom terhadap waktu
        berdasarkan gaya yang bekerja pada sistem
      </span>
    </label>

  </div>

</div>


<!-- SOAL 25 -->

<div
  class="posttest-question"
  data-answer="B"
  data-explanation="Trajectory menyimpan informasi konfigurasi atom pada berbagai langkah waktu dan dapat digunakan untuk menganalisis perilaku sistem selama simulasi MD.">

  <div class="posttest-question-header">
    <div class="posttest-question-number">Soal 25</div>

    <div class="posttest-question-text">
      Apa yang dimaksud dengan trajectory dalam simulasi
      Molecular Dynamics?
    </div>
  </div>

  <div class="posttest-options">

    <label class="posttest-option">
      <input type="radio" name="q25" value="A">
      <span>A. File konfigurasi akun HPC</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q25" value="B">
      <span>
        B. Rekaman konfigurasi atau posisi atom pada berbagai
        langkah waktu selama simulasi
      </span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q25" value="C">
      <span>C. Daftar username Linux</span>
    </label>

    <label class="posttest-option">
      <input type="radio" name="q25" value="D">
      <span>D. File yang hanya berisi nama software</span>
    </label>

  </div>

</div>
<!-- =====================================================
     REFLEKSI
     ===================================================== -->

<section class="posttest-reflection">

  <div class="posttest-reflection-header">

    <span class="posttest-reflection-number">
      REFLEKSI
    </span>

    <h2>
      Refleksi Pembelajaran
    </h2>

  </div>

  <p>
    Setelah mengikuti workshop, tuliskan satu hal yang paling
    penting yang Anda pahami tentang workflow computational
    materials science menggunakan Linux dan HPC.
  </p>

  <textarea
    id="posttest-reflection"
    rows="4"
    placeholder="Tuliskan refleksi Anda..."></textarea>

</section>


<!-- =====================================================
     ACTION
     ===================================================== -->

<section class="posttest-submit-card">

  <div class="posttest-submit-content">

    <div>

      <h2>
        Selesaikan Postest
      </h2>

      <p>
        Periksa kembali jawaban Anda sebelum mengirim.
        Sistem akan menghitung skor secara otomatis.
      </p>

    </div>


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
        ✓ Submit &amp; Score
      </button>

    </div>

  </div>


  <div
    id="posttest-status"
    class="posttest-status">

    Siap mengerjakan postest.

  </div>

</section>


<!-- =====================================================
     HASIL
     ===================================================== -->

<section
  id="posttest-result"
  class="posttest-result"
  style="display: none;">

  <div class="posttest-result-header">

    <div>

      <span class="posttest-result-kicker">
        HASIL POSTEST
      </span>

      <h2>
        Hasil Evaluasi
      </h2>

      <p>
        Berikut hasil evaluasi berdasarkan jawaban yang Anda pilih.
      </p>

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
        Jawaban Benar
      </span>

      <strong id="posttest-correct">
        0
      </strong>

    </div>


    <div>

      <span>
        Jawaban Salah
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
      Gunakan hasil ini sebagai bahan refleksi terhadap pemahaman
      Anda mengenai Linux, komputasi, HPC, DFT, dan Molecular Dynamics.
    </p>

  </div>

</section>
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
