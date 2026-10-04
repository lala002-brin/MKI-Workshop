<!-- =========================================================
     MACE
     PART 1
     SESI 5 · PEMODELAN MATERIAL DENGAN MACE
     ========================================================= -->

<div class="mace-part mace-part-1">

  <!-- SESSION HEADER -->
  <header class="mace-session-header">

    <div class="mace-session-meta">
      SESI 5 · PEMODELAN MATERIAL DENGAN MACE
    </div>

    <h1>pemodelan material dengan MACE</h1>

    <div class="mace-session-date">
      14.30–15.15 <span>|</span> 6 Oktober 2026
    </div>

  </header>


  <!-- SECTION 15 -->
  <section class="mace-section mace-section-intro">

    <div class="mace-section-number">
      15
    </div>

    <div class="mace-section-title">
      <h2>MACE: potensial gaya dari data</h2>
    </div>

  </section>


  <!-- WORKFLOW -->
  <section class="mace-workflow-section">

    <h3 class="mace-workflow-title">
      ALUR KERJA MACE
    </h3>


    <div class="mace-workflow">

      <div class="mace-workflow-step">
        <div class="mace-workflow-text">
          Data acuan<br>
          E dan F
        </div>
      </div>


      <div class="mace-workflow-arrow">
        →
      </div>


      <div class="mace-workflow-step">
        <div class="mace-workflow-text">
          Pisah data<br>
          latih/validasi/uji
        </div>
      </div>


      <div class="mace-workflow-arrow">
        →
      </div>


      <div class="mace-workflow-step">
        <div class="mace-workflow-text">
          Latih atau<br>
          pilih model
        </div>
      </div>


      <div class="mace-workflow-arrow">
        →
      </div>


      <div class="mace-workflow-step">
        <div class="mace-workflow-text">
          Hitung E, F<br>
          melalui ASE
        </div>
      </div>


      <div class="mace-workflow-arrow">
        →
      </div>


      <div class="mace-workflow-step">
        <div class="mace-workflow-text">
          Cek galat<br>
          + stabilitas
        </div>
      </div>

    </div>


    <div class="mace-figure-caption">
      Gambar 8: Alur kerja MACE
    </div>

  </section>


  <!-- EXPLANATION -->
  <section class="mace-explanation">

    <p>
      <strong>Potensial gaya pembelajaran mesin</strong>
      mempelajari hubungan antara lingkungan atom dan energi
      serta gaya dari data acuan. MACE membangun representasi
      lokal yang memperhatikan arah/rotasi dan interaksi banyak
      atom. Energi total dijumlahkan dari kontribusi lokal,
      <em>E<sub>ML</sub> = ∑<sub>i</sub> E<sub>i</sub>(N<sub>i</sub>)</em>,
      kemudian gaya diperoleh sebagai turunan energi,
      <em>F<sub>i</sub> = −∇<sub>i</sub>E<sub>ML</sub></em>.
      Radius potong, banyak lapisan, dan isi data menentukan
      lingkungan yang dapat dipelajari. Lihat dokumentasi
      pelatihan MACE dan artikel MACE.
    </p>


    <p>
      MACE sendiri <strong>tidak menyelesaikan elektron secara
      eksplisit</strong> pada setiap langkah MD. Mutunya bergantung
      pada nilai energi dan gaya acuan (<em>label</em>) serta cakupan
      struktur pelatihan. Model pralatih MACE-MP adalah titik awal
      praktis untuk material padat, tetapi akurasi pada cairan,
      ion, reaksi, dan antarmuka perlu diuji khusus. Dokumentasi
      MACE mencatat pilihan model, unsur tercakup, serta perubahan
      model baku antarsversi. Agar hasil latihan dapat diulang,
      perintah latihan memakai checkpoint lokal MACE-MP-0 small
      secara eksplisit. Daftar model resmi.
    </p>

  </section>

</div>
<!-- =========================================================
     MACE
     PART 2
     15.1 · MACE PADA PERSAMAAN KEADAAN LiF
     ========================================================= -->

<section class="mace-part mace-part-2">

  <!-- SECTION HEADER -->

  <div class="mace-section-heading">

    <div class="mace-section-number">
      15.1
    </div>

    <div class="mace-section-title">
      <span class="mace-section-label">
        MACE PADA PERSAMAAN KEADAAN
      </span>

      <h2>MACE pada persamaan keadaan LiF</h2>
    </div>

  </div>


  <!-- INTRODUCTION -->

  <div class="mace-text-block">

    <p>
      Model MACE-MP-0 small tersedia di
      <code>model_pralatih/mace_mp_0_small.model</code>.
      Contoh utama menghitung energi dan tekanan untuk lima
      ukuran sel LiF:
    </p>

  </div>


  <!-- COMMAND 01 -->

  <div class="mace-command-card">

    <div class="mace-command-index">
      01
    </div>

    <div class="mace-command-content">

      <div class="mace-command-label">
        COMMAND
      </div>

      <code>python skrip/kurva_mace_lif.py</code>

    </div>

    <button
      class="mace-copy-button"
      type="button"
      onclick="copyMaceCommand(this)"
    >
      Copy
    </button>

  </div>


  <!-- COMMAND 02 -->

  <div class="mace-command-card">

    <div class="mace-command-index">
      02
    </div>

    <div class="mace-command-content">

      <div class="mace-command-label">
        COMMAND
      </div>

      <code>cat kasus/05_baterai_lif_eos/kurva_lif_mace.csv</code>

    </div>

    <button
      class="mace-copy-button"
      type="button"
      onclick="copyMaceCommand(this)"
    >
      Copy
    </button>

  </div>


  <!-- EXPLANATION -->

  <div class="mace-note">

    <p>
      Bandingkan energi relatif dan tekanan terhadap skala kisi.
      Pada geometri simetris gaya atom dapat mendekati nol walaupun
      tekanan sel belum nol. Cocokkan geometri dan satuan bila
      dibandingkan dengan scan DFTB. MACE-MP adalah model pralatih;
      hasilnya perlu diuji terhadap metode acuan dan struktur target
      sebelum dipakai untuk prediksi baru. ASE menyediakan kalkulator
      yang sama untuk energi, gaya, optimasi, dan MD; lihat panduan
      kalkulator MACE.
    </p>

  </div>

</section>
<!-- =========================================================
     MACE
     PART 3
     PDF PAGE 38
     ========================================================= -->


<!-- =========================================================
     15.2 MENYIAPKAN DATA UNTUK MACE
     ========================================================= -->

<section class="mace-part mace-part-3">

  <div class="mace-section-heading">

    <div class="mace-section-number">
      15.2
    </div>

    <div class="mace-section-title">
      <span class="mace-section-label">
        MENYIAPKAN DATA UNTUK MACE
      </span>

      <h2>Menyiapkan data untuk MACE</h2>
    </div>

  </div>


  <div class="mace-text-block">

    <p>
      Untuk melatih model bagi elektrolit atau antarmuka,
      kumpulkan konfigurasi dari lintasan dan geometri yang
      relevan, lalu hitung energi serta gaya dengan metode acuan
      yang konsisten. Pisahkan data menurut lintasan induk agar
      frame yang hampir sama tidak bocor ke data uji. Pantau galat
      energi dan gaya serta uji sifat target seperti RDF,
      koordinasi, dan kestabilan MD. Model yang dilatih pada kristal
      LiF tidak otomatis akurat untuk ion, pelarut, reaksi, atau
      antarmuka. Lihat panduan pelatihan MACE.
    </p>

  </div>


  <!-- =======================================================
       16. MENAFSIRKAN KELUARAN STUDI KASUS
       ======================================================= -->

  <div class="mace-section-heading mace-section-heading-next">

    <div class="mace-section-number">
      16
    </div>

    <div class="mace-section-title">
      <span class="mace-section-label">
        INTERPRETASI HASIL
      </span>

      <h2>Menafsirkan keluaran studi kasus</h2>
    </div>

  </div>


  <div class="mace-text-block">

    <p>
      Untuk RDF dan bilangan koordinasi, laporkan jumlah frame,
      waktu equilibration, cutoff, ukuran sel, serta variasi antar
      lintasan. Untuk muatan Mulliken, jelaskan bahwa nilainya
      bergantung pada basis dan cara populasi dibagi. Untuk NEB
      dan kompleks obat, laporkan konvergensi, persamaan energi,
      serta data acuan. Struktur awal dan energi yang belum dihitung
      tidak boleh disajikan sebagai hasil simulasi.
    </p>

  </div>


  <!-- =======================================================
       16.1 PERTANYAAN DISKUSI
       ======================================================= -->

  <div class="mace-discussion">

    <div class="mace-discussion-header">

      <div class="mace-discussion-number">
        16.1
      </div>

      <div>
        <span class="mace-section-label">
          PERTANYAAN DISKUSI
        </span>

        <h3>Pertanyaan diskusi</h3>
      </div>

    </div>


    <!-- QUESTION 01 -->

    <div class="mace-question">

      <div class="mace-question-number">
        01
      </div>

      <div class="mace-question-content">

        <p>
          Apakah puncak RDF dan bilangan koordinasi Li–O berubah
          ketika suhu atau komposisi garam diubah?
        </p>

        <textarea
          class="mace-answer"
          placeholder="Tuliskan jawaban Anda..."
          rows="3"
        ></textarea>

      </div>

    </div>


    <!-- QUESTION 02 -->

    <div class="mace-question">

      <div class="mace-question-number">
        02
      </div>

      <div class="mace-question-content">

        <p>
          Bagaimana perbedaan antara kontak ion dalam elektrolit
          periodik dan kontak EC pada slab LiF yang memiliki vakum?
        </p>

        <textarea
          class="mace-answer"
          placeholder="Tuliskan jawaban Anda..."
          rows="3"
        ></textarea>

      </div>

    </div>


    <!-- QUESTION 03 -->

    <div class="mace-question">

      <div class="mace-question-number">
        03
      </div>

      <div class="mace-question-content">

        <p>
          Parameter struktur mana yang paling memengaruhi barrier
          NEB CO/Pt?
        </p>

        <textarea
          class="mace-answer"
          placeholder="Tuliskan jawaban Anda..."
          rows="3"
        ></textarea>

      </div>

    </div>


    <!-- QUESTION 04 -->

    <div class="mace-question">

      <div class="mace-question-number">
        04
      </div>

      <div class="mace-question-content">

        <p>
          Apakah energi interaksi ibuprofenat–guanidinium tetap sama
          setelah pelarut dan orientasi lain ditambahkan?
        </p>

        <textarea
          class="mace-answer"
          placeholder="Tuliskan jawaban Anda..."
          rows="3"
        ></textarea>

      </div>

    </div>


    <!-- QUESTION 05 -->

    <div class="mace-question">

      <div class="mace-question-number">
        05
      </div>

      <div class="mace-question-content">

        <p>
          Seberapa baik MACE mereproduksi tren energi dan tekanan
          DFTB pada geometri LiF yang sama?
        </p>

        <textarea
          class="mace-answer"
          placeholder="Tuliskan jawaban Anda..."
          rows="3"
        ></textarea>

      </div>

    </div>

  </div>


  <!-- =======================================================
       17. PERBANDINGAN DFTB DAN MACE PADA LiF
       ======================================================= -->

  <div class="mace-section-heading mace-section-heading-next">

    <div class="mace-section-number">
      17
    </div>

    <div class="mace-section-title">
      <span class="mace-section-label">
        PERBANDINGAN METODE
      </span>

      <h2>Perbandingan DFTB dan MACE pada LiF</h2>
    </div>

  </div>


  <!-- =======================================================
       17.1 KASUS 5
       ======================================================= -->

  <div class="mace-case-card">

    <div class="mace-case-label">
      17.1 · KASUS 5
    </div>

    <h3>
      Kasus 5 — respons kisi LiF menurut DFTB dan MACE
    </h3>


    <div class="mace-question-highlight">

      <div class="mace-question-highlight-label">
        PERTANYAAN
      </div>

      <p>
        Bagaimana energi dan tekanan berubah ketika sel LiF
        diperbesar atau diperkecil? Lima faktor skala 0,96–1,04
        tersedia. Bandingkan bentuk kurva DFTB dan MACE-MP pada
        geometri yang sama, serta periksa lokasi energi minimum dan
        perubahan tanda tekanan.
      </p>

    </div>


    <textarea
      class="mace-answer mace-answer-large"
      placeholder="Tuliskan hasil perbandingan dan analisis Anda..."
      rows="5"
    ></textarea>

  </div>

</section>
<!-- =========================================================
     MACE
     PART 4
     PDF PAGE 39
     ========================================================= -->


<section class="mace-part mace-part-4">

  <!-- =======================================================
       STRUCTURE LiF
       ======================================================= -->

  <div class="mace-structure-card">

    <div class="mace-structure-image">

      <img
        src="../../../assets/images/lif-structure.png"
        alt="Susunan LiF yang divisualkan sebagai supercell 2 × 2 × 2"
      >

    </div>

    <p class="mace-image-caption">
      Gambar 9: Susunan LiF yang divisualkan sebagai supercell
      2 × 2 × 2; Li biru dan F hijau. Perhitungan energi memakai
      sel 8 atom.
    </p>

  </div>


  <!-- =======================================================
       LANGKAH 1
       ======================================================= -->

  <div class="mace-step-card">

    <div class="mace-step-header">

      <div class="mace-step-number">
        01
      </div>

      <div class="mace-step-title">

        <span>
          LANGKAH 1
        </span>

        <h2>
          Buat seri geometri.
        </h2>

      </div>

    </div>


    <!-- COMMAND 01 -->

    <div class="mace-command">

      <div class="mace-command-number">
        01
      </div>

      <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>

    </div>


    <!-- COMMAND 02 -->

    <div class="mace-command">

      <div class="mace-command-number">
        02
      </div>

      <pre><code>mkdir -p proyek_pribadi</code></pre>

    </div>


    <!-- COMMAND 03 -->

    <div class="mace-command">

      <div class="mace-command-number">
        03
      </div>

      <pre><code>python skrip/scan_dftb.py --help</code></pre>

    </div>


    <!-- COMMAND 04 -->

    <div class="mace-command">

      <div class="mace-command-number">
        04
      </div>

      <pre><code>python skrip/scan_dftb.py --kasus lif --mode siapkan --output proyek_pribadi/scan_lif_awal</code></pre>

    </div>


    <!-- COMMAND 05 -->

    <div class="mace-command">

      <div class="mace-command-number">
        05
      </div>

      <pre><code>cat proyek_pribadi/scan_lif_awal/parameter.csv</code></pre>

    </div>


    <!-- COMMAND 06 -->

    <div class="mace-command">

      <div class="mace-command-number">
        06
      </div>

      <pre><code>head -n 8 proyek_pribadi/scan_lif_awal/titik_02/dftb.inp</code></pre>

    </div>


    <!-- COMMAND 07 -->

    <div class="mace-command">

      <div class="mace-command-number">
        07
      </div>

      <pre><code>cd proyek_pribadi/scan_lif_awal/titik_02</code></pre>

    </div>


    <!-- COMMAND 08 -->

    <div class="mace-command">

      <div class="mace-command-number">
        08
      </div>

      <pre><code>pwd</code></pre>

    </div>


    <!-- COMMAND 09 -->

    <div class="mace-command">

      <div class="mace-command-number">
        09
      </div>

      <pre><code>cd ../../../..</code></pre>

    </div>

  </div>

</section>
<!-- =========================================================
     MACE
     PART 5
     PDF PAGE 40
     ========================================================= -->


<section class="mace-part mace-part-5">


  <!-- =======================================================
       PENJELASAN LANJUTAN
       ======================================================= -->

  <div class="mace-text-block">

    <p>
      <code>parameter.csv</code> menghubungkan
      <code>titik_00</code>–<code>titik_04</code> dengan faktor skala.
      Posisi atom dan tiga vektor TV diskalakan bersama. Pada tahap
      ini belum ada energi DFTB.
    </p>

  </div>


  <!-- =======================================================
       LANGKAH 2
       ======================================================= -->

  <div class="mace-step-card">

    <div class="mace-step-header">

      <div class="mace-step-number">
        02
      </div>

      <div class="mace-step-title">

        <span>
          LANGKAH 2
        </span>

        <h2>
          Hitung seri DFTB pada direktori baru.
        </h2>

      </div>

    </div>


    <!-- COMMAND 01 -->

    <div class="mace-command">

      <div class="mace-command-number">
        01
      </div>

      <pre><code>python skrip/periksa_dcdftbmd.py kasus/05_baterai_lif_eos</code></pre>

    </div>


    <!-- COMMAND 02 -->

    <div class="mace-command">

      <div class="mace-command-number">
        02
      </div>

      <pre><code>sbatch skrip/job_python_slurm.sh python skrip/scan_dftb.py --kasus lif --mode jalankan --output proyek_pribadi/scan_lif_hasil</code></pre>

    </div>


    <!-- COMMAND 03 -->

    <div class="mace-command">

      <div class="mace-command-number">
        03
      </div>

      <pre><code>squeue -u $(whoami)</code></pre>

    </div>


    <!-- COMMAND 04 -->

    <div class="mace-command">

      <div class="mace-command-number">
        04
      </div>

      <pre><code>ls proyek_pribadi/scan_lif_hasil/titik_02/dftb.out</code></pre>

    </div>


    <!-- COMMAND 05 -->

    <div class="mace-command">

      <div class="mace-command-number">
        05
      </div>

      <pre><code>cat proyek_pribadi/scan_lif_hasil/profil.csv</code></pre>

    </div>


    <!-- COMMAND 06 -->

    <div class="mace-command">

      <div class="mace-command-number">
        06
      </div>

      <pre><code>python skrip/gambar_scan_dftb.py proyek_pribadi/scan_lif_hasil</code></pre>

    </div>


    <div class="mace-info-block">

      <p>
        <code>profil.csv</code> memuat energi relatif terhadap minimum
        dari titik yang benar-benar selesai. Jika satu titik gagal,
        periksa <code>dftb.out</code> di folder titik tersebut dan
        jangan menganggap kurva lengkap.
      </p>

    </div>

  </div>


  <!-- =======================================================
       LANGKAH 3
       ======================================================= -->

  <div class="mace-step-card">

    <div class="mace-step-header">

      <div class="mace-step-number">
        03
      </div>

      <div class="mace-step-title">

        <span>
          LANGKAH 3
        </span>

        <h2>
          Hitung MACE pada geometri yang sama.
        </h2>

      </div>

    </div>


    <!-- COMMAND 01 -->

    <div class="mace-command">

      <div class="mace-command-number">
        01
      </div>

      <pre><code>python -c "import ase, mace; print('ASE dan MACE tersedia')"</code></pre>

    </div>


    <!-- COMMAND 02 -->

    <div class="mace-command">

      <div class="mace-command-number">
        02
      </div>

      <pre><code>sbatch skrip/job_python_slurm.sh python skrip/kurva_mace_lif.py --output proyek_pribadi/kurva_lif_mace.csv</code></pre>

    </div>


    <!-- COMMAND 03 -->

    <div class="mace-command">

      <div class="mace-command-number">
        03
      </div>

      <pre><code>squeue -u $(whoami)</code></pre>

    </div>


    <!-- COMMAND 04 -->

    <div class="mace-command">

      <div class="mace-command-number">
        04
      </div>

      <pre><code>cat proyek_pribadi/kurva_lif_mace.csv</code></pre>

    </div>


    <!-- COMMAND 05 -->

    <div class="mace-command">

      <div class="mace-command-number">
        05
      </div>

      <pre><code>python skrip/grafik_hasil.py lif proyek_pribadi/scan_lif_hasil --mace proyek_pribadi/kurva_lif_mace.csv</code></pre>

    </div>


    <div class="mace-info-block">

      <p>
        Kolom <code>relatif_min_ev</code> menggunakan minimum
        masing-masing metode sehingga bentuk kurva dapat
        dibandingkan. Kolom <code>tekanan_gpa</code> adalah tekanan
        MACE; titik mendekati nol menunjukkan kandidat skala
        keseimbangan pada model.
      </p>

      <p>
        Lima titik terlalu sedikit untuk menentukan parameter
        persamaan keadaan secara presisi. Tambahkan titik di sekitar
        minimum dan uji model MACE terhadap data acuan yang relevan.
      </p>

    </div>

  </div>


</section>
