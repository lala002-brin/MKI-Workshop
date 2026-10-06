---
title: Persiapan Peserta
hide:
  - toc
---

<div class="dftb-workshop-page">

  <!-- =========================================================
       TENTANG VERSI DFTB+
       ========================================================= -->

  <section class="dftb-panel dftb-version-section">

    <div class="dftb-heading-block">
      <div class="dftb-eyebrow">DFTB+ WORKSHOP</div>
      <h1>Tentang versi DFTB+</h1>
      <div class="dftb-heading-accent"></div>
    </div>

    <div class="dftb-version-box">
      <div class="dftb-version-mark">i</div>

      <div class="dftb-version-text">
        <strong>Acuan versi.</strong>
        Contoh disusun untuk DFTB+ 24.1 (rilis stabil) dan format input HSD.
        Nama opsi dapat berubah pada versi pengembangan; untuk pelatihan gunakan
        satu versi yang sama pada seluruh peserta.
      </div>
    </div>


    <div class="dftb-content-block">

      <div class="dftb-subheading">
        <span>RINGKASAN WORKSHOP</span>
        <h2>Daftar isi ringkas</h2>
      </div>

      <div class="dftb-outline">

        <div class="dftb-outline-item">
          <span class="dftb-outline-dot"></span>

          <div>
            <strong>Persiapan peserta</strong>
            <span class="dftb-dash">—</span>
            Windows, Termius, SFTP, dan HPC Mahameru
          </div>
        </div>


        <div class="dftb-outline-item">
          <span class="dftb-outline-dot"></span>

          <div>
            <strong>Sesi 1</strong>
            <span class="dftb-dash">—</span>
            Teori dasar DFT, DFTB/SCC, MD, ensemble, dan analisis lintasan
          </div>
        </div>


        <div class="dftb-outline-item">
          <span class="dftb-outline-dot"></span>

          <div>
            <strong>Sesi 3</strong>
            <span class="dftb-dash">—</span>
            Membangun <code>dftb_in.hsd</code> dan menjalankan DFTB+
          </div>
        </div>


        <div class="dftb-outline-item">
          <span class="dftb-outline-dot"></span>

          <div>
            <strong>Sesi 4</strong>
            <span class="dftb-dash">—</span>
            Menganalisis lintasan, muatan, dan antarmuka
          </div>
        </div>


        <div class="dftb-outline-item">
          <span class="dftb-outline-dot"></span>

          <div>
            <strong>Sesi 5</strong>
            <span class="dftb-dash">—</span>
            Pemodelan material dengan MACE
          </div>
        </div>


        <div class="dftb-outline-item">
          <span class="dftb-outline-dot"></span>

          <div>
            <strong>Sesi 6</strong>
            <span class="dftb-dash">—</span>
            Diskusi hasil riset dan hubungan metode
          </div>
        </div>


        <div class="dftb-outline-item">
          <span class="dftb-outline-dot"></span>

          <div>
            <strong>Bahan pendalaman</strong>
            <span class="dftb-dash">—</span>
            troubleshooting, lembar kerja, glosarium, dan contoh input file
          </div>
        </div>

      </div>

    </div>

  </section>



  <!-- =========================================================
       PERSIAPAN PESERTA
       ========================================================= -->

  <section class="dftb-panel dftb-preparation-section">

    <div class="dftb-heading-block">
      <div class="dftb-eyebrow">PERSIAPAN PESERTA</div>

      <h1>Persiapan peserta</h1>

      <div class="dftb-heading-accent"></div>
    </div>


    <div class="dftb-chapter-intro">

      <div class="dftb-chapter-number">1</div>

      <div class="dftb-chapter-content">

        <h2>Dari Windows ke HPC Mahameru</h2>

        <p>
          Tujuan bagian ini adalah memastikan peserta dapat masuk ke HPC,
          memindahkan paket latihan, memeriksa DFTB+ dan Python, mengirim job
          Slurm, lalu memindahkan hasil yang diperoleh ke komputer pribadi.
        </p>

      </div>

    </div>



    <!-- =====================================================
         LANGKAH 1
         ===================================================== -->

    <article class="dftb-step">

      <div class="dftb-step-heading">

        <div class="dftb-step-number">
          1.1
        </div>

        <div class="dftb-step-title">
          <span>LANGKAH 1</span>
          <h2>Menjalankan Termius dan login ke HPC</h2>
        </div>

      </div>


      <div class="dftb-step-content">

        <ul class="dftb-list">

          <li>
            Buka Termius dan buat host sesuai akun HPC yang diberikan fasilitator.
          </li>

          <li>
            Login dengan username dan metode autentikasi yang berlaku.
          </li>

          <li>
            Setelah terminal terbuka, jalankan <code>pwd</code> dan
            <code>hostname</code> untuk memastikan lokasi dan mesin yang sedang
            digunakan.
          </li>

          <li>
            Membuat folder untuk latihan simulasi dengan perintah
            <code>mkdir</code>.
          </li>

        </ul>


        <div class="dftb-terminal">

          <div class="dftb-terminal-top">

            <div class="dftb-terminal-title">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span>Terminal</span>
            </div>

            <button
              type="button"
              class="dftb-copy"
              aria-label="Salin perintah"
            >
              Copy
            </button>

          </div>

          <pre><code>pwd
hostname
whoami
mkdir -p ~/latihan_simulasi</code></pre>

        </div>

      </div>

    </article>



    <!-- =====================================================
         LANGKAH 2
         ===================================================== -->

    <article class="dftb-step">

      <div class="dftb-step-heading">

        <div class="dftb-step-number">
          1.2
        </div>

        <div class="dftb-step-title">
          <span>LANGKAH 2</span>
          <h2>Mengunggah paket dengan SFTP</h2>
        </div>

      </div>


      <div class="dftb-step-content">

        <p>
          Unggah paket workshop ke <code>~/latihan_simulasi</code>, ekstrak,
          lalu masuk ke direktori kerja.
        </p>


        <div class="dftb-terminal">

          <div class="dftb-terminal-top">

            <div class="dftb-terminal-title">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span>Terminal</span>
            </div>

            <button
              type="button"
              class="dftb-copy"
              aria-label="Salin perintah"
            >
              Copy
            </button>

          </div>

          <pre><code>cd ~/latihan_simulasi
unzip -q Paket_Workshop_DFTBplus.zip
cd workshop_material
pwd
ls</code></pre>

        </div>

      </div>

    </article>



    <!-- =====================================================
         LANGKAH 3
         ===================================================== -->

    <article class="dftb-step">

      <div class="dftb-step-heading">

        <div class="dftb-step-number">
          1.3
        </div>

        <div class="dftb-step-title">
          <span>LANGKAH 3</span>
          <h2>Memeriksa lingkungan Linux</h2>
        </div>

      </div>


      <div class="dftb-step-content">

        <div class="dftb-terminal">

          <div class="dftb-terminal-top">

            <div class="dftb-terminal-title">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span>Environment Check</span>
            </div>

            <button
              type="button"
              class="dftb-copy"
              aria-label="Salin perintah"
            >
              Copy
            </button>

          </div>

          <pre><code>python --version
command -v dftb+
dftb+ --version
command -v sbatch
ls parameter/SK</code></pre>

        </div>


        <div class="dftb-explanation">

          <div class="dftb-explanation-icon">
            SK
          </div>

          <p>
            DFTB+ membutuhkan berkas parameterisasi Slater–Koster untuk
            Hamiltonian DFTB. Parameter tidak dibundel bersama program DFTB+
            secara umum sehingga paket workshop harus menyediakan set yang
            telah dipilih fasilitator dan lengkap untuk seluruh pasangan unsur
            yang dipakai.
          </p>

        </div>

      </div>

    </article>



    <!-- =====================================================
         LANGKAH 4
         ===================================================== -->

    <article class="dftb-step">

      <div class="dftb-step-heading">

        <div class="dftb-step-number">
          1.4
        </div>

        <div class="dftb-step-title">
          <span>LANGKAH 4</span>
          <h2>Mengirim perhitungan ke node komputasi</h2>
        </div>

      </div>


      <div class="dftb-step-content">

        <div class="dftb-terminal">

          <div class="dftb-terminal-top">

            <div class="dftb-terminal-title">
              <span class="terminal-dot red"></span>
              <span class="terminal-dot yellow"></span>
              <span class="terminal-dot green"></span>
              <span>Slurm</span>
            </div>

            <button
              type="button"
              class="dftb-copy"
              aria-label="Salin perintah"
            >
              Copy
            </button>

          </div>

          <pre><code>cd ~/latihan_simulasi/workshop_material
sbatch skripjob_dftbplus_slurm.sh
squeue -u $(whoami)</code></pre>

        </div>


        <p class="dftb-job-description">
          Job script harus masuk ke folder kasus, menjalankan
          <code>dftb+</code>, dan mengarahkan stdout ke log yang mudah dilacak.
          <strong>Jangan menjalankan MD panjang di login node.</strong>
        </p>

      </div>

    </article>

  </section>

</div>
<!-- =====================================================
     LANGKAH 5
     ===================================================== -->

<article class="dftb-step">

  <div class="dftb-step-heading">

    <div class="dftb-step-number">
      1.5
    </div>

    <div class="dftb-step-title">
      <span>LANGKAH 5</span>
      <h2>Mengunduh file output</h2>
    </div>

  </div>


  <div class="dftb-step-content">

    <ul class="dftb-list">

      <li>
        Unduh <code>dftb_in.hsd</code>, <code>detailed.out</code>,
        <code>geo_end.xyz/gen</code>, <code>md.out</code>,
        trajectory/XYZ yang dibuat, CSV analisis, dan PNG.
      </li>

      <li>
        Simpan juga <code>charges.bin</code> bila simulasi SCC akan direstart.
      </li>

    </ul>


    <div class="dftb-output-box">

      <div class="dftb-output-icon">
        ↓
      </div>

      <div class="dftb-output-content">

        <span class="dftb-output-label">
          OUTPUT SIMULASI
        </span>

        <div class="dftb-output-files">

          <code>dftb_in.hsd</code>

          <code>detailed.out</code>

          <code>geo_end.xyz/gen</code>

          <code>md.out</code>

          <code>trajectory/XYZ</code>

          <code>CSV analisis</code>

          <code>PNG</code>

          <code>charges.bin</code>

        </div>

      </div>

    </div>


    <div class="dftb-note-box">

      <div class="dftb-note-symbol">
        i
      </div>

      <div>

        <strong>
          Catatan
        </strong>

        <p>
          Simpan <code>charges.bin</code> apabila simulasi SCC
          akan dilanjutkan atau direstart.
        </p>

      </div>

    </div>

  </div>

</article>
