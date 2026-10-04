<section class="session-header">

  <h1>Sesi 5: pemodelan material dengan MACE</h1>

  <p>14.30–15.15 | 6 Oktober 2026</p>

</section>


<section class="analysis-section">

  <h2>15 MACE: potential gaya dari data</h2>

  <div class="analysis-figure">

<div class="mace-workflow">

  <div class="mace-workflow-step">
    <span class="mace-workflow-number">01</span>
    <strong>Data acuan<br>E dan F</strong>
  </div>

  <div class="mace-workflow-arrow">→</div>

  <div class="mace-workflow-step">
    <span class="mace-workflow-number">02</span>
    <strong>Pisah data<br>latih/validasi/uji</strong>
  </div>

  <div class="mace-workflow-arrow">→</div>

  <div class="mace-workflow-step">
    <span class="mace-workflow-number">03</span>
    <strong>Latih atau<br>pilih model</strong>
  </div>

  <div class="mace-workflow-arrow">→</div>

  <div class="mace-workflow-step">
    <span class="mace-workflow-number">04</span>
    <strong>Hitung E, F<br>melalui ASE</strong>
  </div>

  <div class="mace-workflow-arrow">→</div>

  <div class="mace-workflow-step">
    <span class="mace-workflow-number">05</span>
    <strong>Cek galat<br>+ stabilitas</strong>
  </div>

</div>

    <p class="analysis-figure-caption">
      Gambar 8: Alur kerja MACE
    </p>

  </div>

  <p>
    <strong>Potential gaya</strong> pembelajaran mesin mempelajari hubungan
    antara lingkungan atom dan energi serta gaya dari data acuan. MACE
    membangun representasi lokal yang memperhatikan arah/rotasi dan interaksi
    banyak atom. Energi total dijumlahkan dari kontribusi lokal,
    E<sub>i</sub> = Σ<sub>i</sub>E<sub>i</sub>(r), kemudian gaya diperoleh
    sebagai turunan energi,
    F<sub>i</sub> = −∇<sub>i</sub>E<sub>ML</sub>. Radius potong,
    banyak lapisan, dan isi data menentukan lingkungan yang dapat dipelajari.
    Lihat dokumentasi pelatihan MACE dan artikel MACE.
  </p>

  <p>
    MACE sendiri tidak menyelesaikan elektron secara eksplisit pada setiap
    langkah MD. Mutunya bergantung pada nilai energi dan gaya acuan
    (<em>label</em>) serta cakupan struktur pelatihan. Model pralatih
    MACE-MP adalah titik awal praktis untuk material padat, tetapi akurasi
    pada cairan, ion, reaksi, dan antarmuka perlu diuji khusus. Dokumentasi
    MACE mencatat pilihan model, unsur tercakup, serta perubahan model baku
    antarversi. Agar hasil latihan dapat diulang, perintah latihan memakai
    checkpoint lokal MACE-MP-0 small secara eksplisit.
    <a href="#" class="analysis-link">Daftar model resmi.</a>
  </p>

</section>


<section class="analysis-section">

  <h3>15.1 MACE pada persamaan keadaan LiF</h3>

  <p>
    Model MACE-MP-0 small tersedia di
    <code>model_pralatih/mace_mp_0_small.model</code>. Contoh utama
    menghitung energi dan tekanan untuk lima ukuran sel LiF:
  </p>

  <div class="analysis-command">
    <pre><code>python skrip/kurva_mace_lif.py</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat kasus/05_baterai_lif_eos/kurva_lif_mace.csv</code></pre>
  </div>

  <p>
    Bandingkan energi relatif dan tekanan terhadap skala kisi. Pada geometri
    simetris gaya atom dapat mendekati nol walaupun tekanan sel belum nol.
    Cocokkan geometri dan satuan bila dibandingkan dengan scan DFTB.
    MACE-MP adalah model pralatih; hasilnya perlu diuji terhadap metode acuan
    dan struktur target sebelum dipakai untuk prediksi baru. ASE menyediakan
    kalkulator yang sama untuk energi, gaya, optimasi, dan MD; lihat panduan
    kalkulator MACE.
  </p>

</section>
<!-- =========================================================
     SESI 5 · PART 3
     Halaman 34–35
     ========================================================= -->

<section class="analysis-section">

  <h3>15.2 · Menyiapkan data untuk MACE</h3>

  <p>
    Untuk melatih model bagi elektrolit atau antarmuka, kumpulkan konfigurasi
    dari lintasan dan geometri yang relevan, lalu hitung energi serta gaya
    dengan metode acuan yang konsisten. Pisahkan data menurut lintasan induk
    agar frame yang hampir sama tidak bocor ke data uji. Pantau galat energi
    dan gaya serta uji sifat target seperti RDF, koordinasi, dan kestabilan MD.
    Model yang dilatih pada kristal LiF tidak otomatis akurat untuk ion,
    pelarut, reaksi, atau antarmuka. Lihat
    <a href="#" class="analysis-link">panduan pelatihan MACE</a>.
  </p>

</section>


<section class="analysis-section">

  <h2>16 · Menafsirkan keluaran studi kasus</h2>

  <p>
    Untuk RDF dan bilangan koordinasi, laporkan jumlah frame, waktu
    ekuilibrasi, cutoff, ukuran sel, serta variasi antar lintasan. Untuk
    muatan Mulliken, jelaskan bahwa nilainya bergantung pada basis dan cara
    populasi dibagi. Untuk NEB dan kompleks obat, laporkan konvergensi,
    persamaan energi, serta keadaan referensi. Struktur awal dan energi yang
    belum dihitung tidak boleh disajikan sebagai hasil simulasi.
  </p>


  <h3>16.1 · Pertanyaan diskusi</h3>

  <ol class="analysis-discussion">

    <li>
      Apakah puncak RDF dan bilangan koordinasi Li–O berubah ketika suhu atau
      komposisi garam diubah?
    </li>

    <li>
      Bagaimana perbedaan antara kontak ion dalam elektrolit periodik dan
      kontak EC pada slab LiF yang memiliki vakum?
    </li>

    <li>
      Parameter struktur mana yang paling memengaruhi barrier NEB CO/Pt?
    </li>

    <li>
      Apakah energi interaksi ibuprofen–guanidinium tetap sama setelah pelarut
      dan orientasi lain ditambahkan?
    </li>

    <li>
      Seberapa baik MACE mereproduksi tren energi dan tekanan DFTB pada
      geometri LiF yang sama?
    </li>

  </ol>

</section>


<section class="analysis-section">

  <h2>17 · Perbandingan DFTB dan MACE pada LiF</h2>

  <h3>17.1 · Kasus 5 — respons kisi LiF menurut DFTB dan MACE</h3>

  <p>
    <strong>Pertanyaan.</strong>
    Bagaimana energi dan tekanan berubah ketika sel LiF diperbesar atau
    diperkecil? Lima faktor skala 0,96–1,04 tersedia. Bandingkan bentuk kurva
    DFTB dan MACE-MP pada geometri yang sama, serta periksa lokasi energi
    minimum dan perubahan tanda tekanan.
  </p>

</section>


<section class="analysis-section">

  <figure class="analysis-figure">

    <img
      src="../images/lif-supercell.png"
      alt="Susunan LiF yang divisualkan sebagai supercell 2 kali 2 kali 2"
    >

    <figcaption class="analysis-figure-caption">
      Gambar 9: Susunan LiF yang divisualkan sebagai supercell 2 × 2 × 2;
      Li biru dan F hijau. Perhitungan energi memakai sel 8 atom.
    </figcaption>

  </figure>


  <h3>Langkah 1. Buat seri geometri.</h3>

  <div class="analysis-command">
    <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>mkdir -p proyek_pribadi</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/scan_dftb.py --help</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/scan_dftb.py --kasus lif --mode siapkan --output proyek_pribadi/scan_lif_awal</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/scan_lif_awal/parameter.csv</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 8 proyek_pribadi/scan_lif_awal/titik_02/dftb.inp</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cd proyek_pribadi/scan_lif_awal/titik_02</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>pwd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cd ../../../</code></pre>
  </div>

</section>
<!-- =========================================================
     SESI 6 · PART 1
     Halaman 36
     File baru:
     sesi-6-hasil-riset-terbit-sakti-lab.md
     ========================================================= -->

<section class="analysis-section">

  <p>
    <code>parameter.csv</code> menghubungkan <code>titik_00</code>–<code>titik_04</code>
    dengan faktor skala. Posisi atom dan tiga vektor TV diselaraskan. Pada tahap
    ini dilihat energi DFTB.
  </p>

  <h3>Langkah 2. Hitung seri DFTB pada direktori baru.</h3>

  <div class="analysis-command">
    <pre><code>python skrip/periksa_dcdftbmd.py kasus/05_baterai_lif_eos</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>sbatch skrip/job_python_slurm.sh python skrip/scan_dftb.py --kasus lif --mode jalankan --output
→ proyek_pribadi/scan_lif_hasil</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>squeue -u $(whoami)</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/scan_lif_hasil/titik_02/dftb.out</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/scan_lif_hasil/profil.csv</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/gambar_scan_dftb.py proyek_pribadi/scan_lif_hasil</code></pre>
  </div>

  <p>
    <code>profil.csv</code> memuat energi relatif terhadap minimum dari titik yang
    benar-benar selesai. Jika satu titik gagal, periksa <code>dftb.out</code> di
    folder titik tersebut dan jangan menganggap kurva lengkap.
  </p>


  <h3>Langkah 3. Hitung MACE pada geometri yang sama.</h3>

  <div class="analysis-command">
    <pre><code>python -c "import ase, mace; print('ASE dan MACE tersedia')"</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>sbatch skrip/job_python_slurm.sh python skrip/kurva_mace_lif.py --output
→ proyek_pribadi/kurva_lif_mace.csv</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>squeue -u $(whoami)</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/kurva_lif_mace.csv</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>python skrip/grafik_hasil.py lif proyek_pribadi/scan_lif_hasil --mace
→ proyek_pribadi/kurva_lif_mace.csv</code></pre>
  </div>

  <p>
    Kolom <code>relatif_min_eV</code> menggunakan minimum masing-masing metode
    sehingga bentuk kurva dapat dibandingkan. Kolom tekanan pada adalah tekanan
    MACE; titik mendekati nol menunjukkan kandidat skala keseimbangan pada model
    ini. Lima titik terlalu sedikit untuk menentukan parameter persamaan keadaan
    secara presisi. Tambahkan titik di sekitar posisi minimum dan uji model MACE
    terhadap data acuan yang relevan.
  </p>

  <p>
    Unduh <code>profil.csv</code>, <code>parameter.csv</code>, dan grafik dari
    remote
    <code>latihan_simulasi/workshop_material/proyek_pribadi/scan_lif_hasil</code>,
    serta <code>kurva_lif_mace.csv</code> dari
    <code>latihan_simulasi/workshop_material/proyek_pribadi/</code>. Untuk
    pemeriksaan struktur, unduh <code>struktur.xyz</code> dan
    <code>dftb.out</code> dari <code>titik_00</code>, <code>titik_02</code>,
    dan <code>titik_04</code>; simpan dalam subfolder yang sama pada
    <code>Downloads\hasil_workshop\</code>. Buka ketiga XYZ di VMD Windows
    untuk membandingkan perubahan jarak atom ketika sel diubah.

</section>
