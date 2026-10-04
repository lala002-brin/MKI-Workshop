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
<section class="analysis-section">

  <h3>15.2 Menggunakan MACE melalui ASE</h3>

  <p>
    ASE menyediakan antarmuka kalkulator untuk menghitung energi dan gaya dari
    model MACE. Pada latihan ini, gunakan model yang sudah disediakan dan
    terapkan pada struktur LiF yang sama dengan perhitungan sebelumnya.
  </p>

  <div class="analysis-command">
    <pre><code>python -c "import ase, mace; print('ASE dan MACE tersedia')"</code></pre>
  </div>

  <p>
    Periksa kembali model yang digunakan sebelum menjalankan perhitungan.
    Pastikan checkpoint yang dipakai sama dengan yang dicatat pada hasil
    sebelumnya agar perbandingan tetap konsisten.
  </p>

  <div class="analysis-command">
    <pre><code>ls -lh model_pralatih/mace_mp_0_small.model</code></pre>
  </div>

  <p>
    Jalankan perhitungan energi dan gaya pada struktur LiF:
  </p>

  <div class="analysis-command">
    <pre><code>python skrip/energi_mace.py \
--struktur kasus/05_baterai_lif_eos/titik_02/struktur.xyz \
--model model_pralatih/mace_mp_0_small.model</code></pre>
  </div>

  <p>
    Periksa keluaran energi dan gaya yang dihasilkan:
  </p>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/hasil_mace.txt</code></pre>
  </div>

</section>


<section class="analysis-section">

  <h3>15.3 Membandingkan MACE dan DFTB</h3>

  <p>
    Gunakan geometri yang sama untuk kedua metode. Jangan membandingkan hasil
    dari struktur yang berbeda karena perubahan geometri dapat memengaruhi
    energi dan gaya.
  </p>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/scan_lif_hasil/profil.csv</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>cat proyek_pribadi/kurva_lif_mace.csv</code></pre>
  </div>

  <p>
    Bandingkan lokasi minimum energi relatif dan perubahan tekanan terhadap
    faktor skala kisi. Perhatikan apakah kedua metode memberikan bentuk kurva
    yang serupa atau menunjukkan perbedaan pada ukuran sel tertentu.
  </p>

  <div class="analysis-command">
    <pre><code>python skrip/grafik_hasil.py lif \
proyek_pribadi/scan_lif_hasil \
--mace proyek_pribadi/kurva_lif_mace.csv</code></pre>
  </div>

  <p>
    Catat faktor skala dengan energi minimum untuk masing-masing metode.
    Kemudian catat tanda tekanan pada titik yang sama. Gunakan hasil tersebut
    untuk menjelaskan apakah MACE mereproduksi tren respons kisi LiF yang
    diperoleh dari DFTB.
  </p>

</section>
