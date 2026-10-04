<div class="foundation-sk-main">

<h2>Sesi 4: menganalisis lintasan dan antarmuka</h2>

<p class="session-meta">
  13.00–14.30 | 6 Oktober 2026
</p>

<h3>12 · Sesi 4: membaca lintasan dan antarmuka</h3>

<h4>12.1 · Lanjutan kasus 1 — analisis elektrolit</h4>

<p>
<strong>Langkah 5. Hitung RDF dan bilangan koordinasi.</strong>
Untuk sel kubik 12,3 Å, radius RDF tidak boleh melebihi L/2 = 6,15 Å.
Cutoff 3,2 Å (Li–O) dan 3,0 Å (Li–F) adalah nilai latihan; setelah
melihat minimum pertama RDF, catat pilihan cutoff yang sebenarnya Anda gunakan.
</p>

<div class="command-box">
<pre><code>python skrip/analisis_elektron_lintasan.py proyek_pribadi/lipf6_ec --pusat Li --tetangga O
→ --sel 12.3 --selang 5.0 --cutoff 3.2 --rmax 6.0</code></pre>
</div>

<div class="command-box">
<pre><code>python skrip/analisis_elektron_lintasan.py proyek_pribadi/lipf6_ec --pusat Li --tetangga F
→ --sel 12.3 --selang 5.0 --cutoff 3.0 --rmax 6.0</code></pre>
</div>

<div class="command-box">
<pre><code>ls proyek_pribadi/lipf6_ec/*li_*.csv</code></pre>
</div>

<div class="command-box">
<pre><code>head -n 6 proyek_pribadi/lipf6_ec/koordinasi_li_o.csv</code></pre>
</div>

<p>
Keluaran <code>rdf_li_o.csv</code> dan <code>rdf_li_f.csv</code> memuat
<em>g(r)</em>. Berkas <code>koordinasi_li_o.csv</code> dan
<code>koordinasi_li_f.csv</code> memuat jumlah tetangga per Li per frame.
<code>muatan_li_o.csv</code> memuat rata-rata muatan Mulliken Li dan O.
Nama berkas sengaja berbeda agar analisis Li–F tidak menimpa analisis Li–O.
</p>

<p>
<strong>Langkah 6. Buat grafik dan tulis kesimpulan.</strong>
</p>

<div class="command-box">
<pre><code>python skrip/grafik_hasil.py elektrolit proyek_pribadi/lipf6_ec</code></pre>
</div>

<div class="command-box">
<pre><code>ls -lh proyek_pribadi/lipf6_ec/analisis_elektron.png</code></pre>
</div>

<p>
Pada grafik RDF, cari posisi puncak Li–O pertama dan minimum setelahnya.
Pada histogram koordinasi, bandingkan angka yang paling sering muncul dengan
rata-rata yang dicetak skrip. Periksa apakah muatan rata-rata melandai atau
masih berubah sistematis. Keluarkan kesimpulan hanya untuk lintasan dan model
ini. Ulangi dengan seed atau durasi berbeda sebelum membahas ketidakpastian
sampling.
</p>

<p>
<strong>Langkah 7. Hitung MSD dan estimasi transport.</strong>
MSD memakai koordinat yang dibuka kembali melewati batas sel periodik
(<em>unwrapped trajectory</em>). Skrip menghitung rata-rata dari banyak waktu
awal untuk Li dan atom P sebagai bagian posisi LiPF<sub>6</sub>. Gunakan
jendela fit yang tampak mendekati linear pada kurva MSD; angka berikut adalah
latihan membaca keluaran, bukan jendela yang selalu benar.
</p>

<div class="command-box">
<pre><code>python skrip/analisis_transport.py proyek_pribadi/lipf6_ec --sel 12.3 --selang 5.0 --suhu 350
→ --fit-mulai 50 --fit-akhir 200</code></pre>
</div>

<div class="command-box">
<pre><code>python skrip/grafik_hasil.py transport proyek_pribadi/lipf6_ec</code></pre>
</div>

<div class="command-box">
<pre><code>head -n 6 proyek_pribadi/lipf6_ec/msd_li_p.csv</code></pre>
</div>

<div class="command-box">
<pre><code>cat proyek_pribadi/lipf6_ec/ringkasan_transport.txt</code></pre>
</div>

<p>
Dari kemiringan MSD pada tiga dimensi,
<em>D = ⅙ dMSD/dt</em>. Skrip juga menghitung perkiraan konduktivitas ion ideal
menurut Nernst–Einstein,
<em>σ<sub>NE</sub> = e²(N<sub>Li</sub>D<sub>Li</sub> + N<sub>P</sub>D<sub>P</sub>)/(k<sub>B</sub>TV)</em>,
untuk ion monovalen.
</p>

<p>
Hanya panjang gerak ion dan bukan muatan yang dinamis. Model Nernst–Einstein
mengabaikan korelasi gerak antarkation dan anion. Lihat
<code>msd_li_p.png</code> untuk membandingkan kurva Li dan P.
</p>

<p>
Satu lintasan 0,5 ps belum memberi rezim difusi yang dapat dipercaya; jangan
menafsirkan angka yang keluar sebagai estimasi latihan dan bandingkan fit
50–150 fs dengan 100–200 fs. Jika slope negatif, jangan menafsirkan nilai
<em>D</em> atau σ sebagai sifat material.
</p>

<h4>Langkah 8. Unduh lalu visualisasikan di Windows.</h4>

<p>
Di SFTP Termius, buka folder remote
<code>latihan_simulasi/workshop_material/proyek_pribadi/lipf6_ec</code>.
Di panel lokal, buat folder <code>Downloads/hasil_workshop/lipf6_ec</code>.
Unduh <code>dftb.inp</code>, <code>dftb.out</code>, <code>struktur.xyz</code>,
<code>traject</code>, <code>mulliken</code>, CSV, dan PNG. Setelah transfer
selesai, buka traject dengan VMD di Windows: pilih
<em>File → New Molecule → Browse</em>, tetapkan tipe XYZ, tekan
<em>Load</em>, lalu <em>Play</em>. Bandingkan frame awal dan akhir dengan
grafik RDF serta MSD yang sudah dibuat.
</p>

</div>
<div class="analysis-step">

  <div class="analysis-step-number">7</div>

  <div class="analysis-step-body">

    <h4>Hitung MSD dan estimasi transport</h4>

    <p>
      MSD memakai koordinat yang dibuka kembali melewati batas sel periodik
      (<em>unwrapped trajectory</em>). Skrip menghitung rata-rata dari banyak
      waktu awal untuk Li dan atom P sebagai bagian posisi LiPF<sub>6</sub>.
      Gunakan jendela fit yang tampak mendekati linear pada kurva MSD; angka
      berikut adalah latihan membaca keluaran, bukan jendela yang selalu benar.
    </p>

    <div class="analysis-command">
      <pre><code>python skrip/analisis_transport.py proyek_pribadi/lipf6_ec --sel 12.3 --selang 5.0 --suhu 350
→ --fit-mulai 50 --fit-akhir 200</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>python skrip/grafik_hasil.py transport proyek_pribadi/lipf6_ec</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>head -n 6 proyek_pribadi/lipf6_ec/msd_li_p.csv</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>cat proyek_pribadi/lipf6_ec/ringkasan_transport.txt</code></pre>
    </div>

    <p>
      Dari kemiringan MSD pada tiga dimensi,
      <em>D = 1/6 dMSD/dt</em>. Skrip juga menghitung perkiraan konduktivitas
      ion ideal menurut Nernst–Einstein,
      <em>
        σ<sub>NE</sub> =
        e²(N<sub>Li</sub>D<sub>Li</sub> + N<sub>P</sub>D<sub>P</sub>) /
        (k<sub>B</sub>TV)
      </em>,
      untuk ion monovalen.
    </p>

    <p>
      Hanya panjang gerak ion dan bukan muatan dinamis yang dipakai.
      Hubungan Nernst–Einstein mengabaikan korelasi gerak antarkation dan anion.
      Lihat <code>msd_li_p.png</code> untuk membandingkan kurva Li dan P.
    </p>

    <p>
      Satu lintasan 0,5 ps belum memberi rezim difusi yang dapat dipercaya;
      jangan bandingkan angka yang keluar sebagai estimasi latihan dan
      bandingkan fit 50–150 fs dengan 100–200 fs. Jika slope negatif,
      jangan menafsirkan nilai D atau σ sebagai sifat material.
    </p>

  </div>

</div>


<div class="analysis-step">

  <div class="analysis-step-number">8</div>

  <div class="analysis-step-body">

    <h4>Unduh lalu visualisasikan di Windows</h4>

    <p>
      Di SFTP Termius, buka folder remote
      <code>latihan_simulasi/workshop_material/proyek_pribadi/lipf6_ec</code>.
      Di panel lokal, buat folder
      <code>Downloads/hasil_workshop/lipf6_ec</code>.
      Unduh <code>dftb.inp</code>, <code>dftb.out</code>,
      <code>struktur.xyz</code>, <code>traject</code>,
      <code>mulliken</code>, CSV, dan PNG.
    </p>

    <p>
      Setelah transfer selesai, buka traject dengan VMD di Windows:
      pilih <em>File → New Molecule → Browse</em>, tetapkan tipe XYZ,
      tekan <em>Load</em>, lalu <em>Play</em>.
      Bandingkan frame awal dan akhir dengan grafik RDF serta MSD
      yang sudah dibuat.
    </p>

  </div>

</div>
<div class="analysis-case">

  <span>12.2</span>

  <h4>Kasus 2 · kontak EC pada permukaan LiF</h4>

</div>

<div class="analysis-question">

  <strong>Pertanyaan.</strong>

  <p>
    Apakah O karbonil EC tetap dekat dengan Li pada permukaan, dan apakah
    muatan kelompok EC/slab berubah selama MD? Model memuat 32 atom slab LiF
    dan 10 atom EC dalam sel yang memiliki vakum arah <em>z</em>. Karena vakum,
    RDF tiga dimensi untuk seluruh sel tidak mewakili cairan massal.
  </p>

</div>

<figure class="analysis-figure">

  <img
    src="../images/interface_overview.png"
    alt="Antarmuka LiF-EC"
  >

  <figcaption>
    Gambar 5: Antarmuka LiF–EC. Li biru dan F hijau; O karbonil yang dianalisis
    ditonjolkan merah.
  </figcaption>

</figure>


<div class="analysis-step">

  <div class="analysis-step-number">1</div>

  <div class="analysis-step-body">

    <h4>Buat slab dan molekul EC dengan Python.</h4>

    <div class="analysis-command">
      <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>mkdir -p proyek_pribadi</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>python skrip/buat_antarmuka_lif_ec.py --help</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>python skrip/buat_antarmuka_lif_ec.py --a 4.02 --tinggi 16 --jarak-o-li 2.8 --sudut 0 --seed 27
→ --langkah 1000 --dt-fs 0.5 --suhu 350 --output proyek_pribadi/02_antarmuka_lif_ec</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>cd proyek_pribadi/02_antarmuka_lif_ec</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>pwd</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>cat ringkasan.txt</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>head -n 5 struktur.xyz</code></pre>
    </div>

  </div>

</div>
<div class="analysis-step">

  <div class="analysis-step-body">

    <p>
      Tiga baris terakhir berawalan TV: panjang sel lateral 8,04 Å dan tinggi
      sel 16 Å. Skrip menyusun 32 atom slab, lalu 10 atom EC. O karbonil pertama
      sesudah slab adalah atom nomor 33. Nomor ini dipakai analisis; jika Anda
      mengubah urutan atom, ubah opsi <code>--oxygen</code>.
    </p>

    <h4>Langkah 2. Jalankan dan periksa.</h4>

    <div class="analysis-command">
      <pre><code>python skrip/periksa_dcdftbmd.py proyek_pribadi/02_antarmuka_lif_ec</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>sbatch skrip/job_dftb_slurm.sh proyek_pribadi/02_antarmuka_lif_ec</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>squeue -u $(whoami)</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>ls proyek_pribadi/02_antarmuka_lif_ec/dftb.out</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>ls proyek_pribadi/02_antarmuka_lif_ec/traject</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>ls proyek_pribadi/02_antarmuka_lif_ec/mulliken</code></pre>
    </div>

    <h4>Langkah 3. Ukur kontak dan muatan.</h4>

    <div class="analysis-command">
      <pre><code>python skrip/analisis_antarmuka.py proyek_pribadi/02_antarmuka_lif_ec --slab-atom 32 --oxygen
→ 33 --sel-xy 8.04 --selang 5.0</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>head -n 6 proyek_pribadi/02_antarmuka_lif_ec/antarmuka.csv</code></pre>
    </div>

    <div class="analysis-command">
      <pre><code>python skrip/grafik_hasil.py antarmuka proyek_pribadi/02_antarmuka_lif_ec</code></pre>
    </div>

    <p>
      Kolom jarak menunjukkan O karbonil ke Li terdekat pada lapisan atas, dengan
      citra periodik terdekat pada <em>x</em> dan <em>y</em>. Dua kolom muatan
      menjumlahkan muatan Mulliken muatan EC dan seluruh slab. Catat rata-rata,
      rentang jarak, dan apakah tren kedua muatan konsisten dengan perpindahan
      muatan antarkelompok. Jumlah muatan harus mendekati muatan sistem;
      penyimpangan besar menandakan masalah pembacaan.
    </p>

  </div>

</div>
<div class="analysis-step">

  <div class="analysis-step-body">

    <h4>Langkah 4. Cek geometri di VMD.</h4>

    <p>
      Bandingkan gambar awal dengan frame akhir <code>traject</code>. Gambar
      statis tidak membuktikan EC tetap teradsorpsi. Perubahan jarak selama
      0,5 ps juga belum menjadi energi adsorpsi atau konstanta laju desorpsi.
    </p>

    <p>
      Di SFTP Termius, buka remote
      <code>latihan_simulasi/workshop_material/proyek_pribadi/02_antarmuka_lif_ec</code>;
      buat folder local
      <code>Downloads/hasil_workshop/antarmuka</code>. Unduh
      <code>dftb.inp</code>, <code>dftb.out</code>, <code>struktur.xyz</code>,
      <code>traject</code>, <code>mulliken</code>, <code>antarmuka.csv</code>,
      dan <code>analisis_antarmuka.png</code>. Sesudah unduhan selesai, buka
      <code>traject</code> di VMD Windows sebagai XYZ, tekan <em>Play</em>,
      dan bandingkan orientasi EC dengan grafik jarak O–Li.
    </p>

  </div>

</div>


<div class="analysis-section">

  <h3>13 · Dari tabel ke kesimpulan: membaca hasil bertahap</h3>

  <p>
    Analisis dimulai dari berkas mentah, dilanjutkan pemeriksaan satuan,
    grafik, lalu kesimpulan yang sesuai dengan ukuran model. Urutan ini
    penting karena gambar yang mulus dapat berasal dari sampel yang terlalu
    pendek atau perhitungan yang belum konvergen.
  </p>

</div>


<div class="analysis-section">

  <h4>13.1 · Baca CSV sebelum menilai grafik</h4>

  <p>
    CSV mempunyai satu baris nama kolom. Sebelum membuka gambar, lihat
    beberapa baris awal dan jumlah baris tabel. Contoh untuk elektrolit:
  </p>

  <div class="analysis-command">
    <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 6 proyek_pribadi/lipf6_ec/rdf_li_o.csv</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 6 proyek_pribadi/lipf6_ec/koordinasi_li_o.csv</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>head -n 6 proyek_pribadi/lipf6_ec/muatan_li_o.csv</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>wc -l proyek_pribadi/lipf6_ec/koordinasi_li_o.csv</code></pre>
  </div>

  <p>
    <code>r_A</code> adalah pusat bin jarak dalam Å, <code>g_r</code> adalah
    nilai RDF tanpa satuan. Pada tabel koordinasi, satu baris adalah satu Li
    pada satu frame. Jika ada dua Li dan 100 frame, jumlah baris data idealnya
    200 ditambah satu header. Pada tabel muatan, satu baris mewakili satu
    frame. Perbedaan jumlah baris dari yang diharapkan perlu diselidiki
    sebelum membuat rata-rata.
  </p>

</div>


<div class="analysis-section">

  <h4>13.2 · Apa yang dihitung oleh RDF dan koordinasi?</h4>

  <p>
    Untuk pusat Li dan tetangga O, skrip menghitung jarak dengan konvensi
    citra periodik terdekat di sel kubik. Jumlah pasangan dalam kulit radius
    <em>r</em> hingga <em>r + Δr</em> dinormalisasi dengan jumlah pusat,
    jumlah frame, densitas O, dan volume kulit:
  </p>

  <div class="analysis-equation">
    <em>
      g<sub>LiO</sub>(r)
      ≈
      N<sub>pasangan</sub>(r, r + Δr)
      /
      [N<sub>frame</sub>N<sub>Li</sub>ρ<sub>O</sub>
      (4π/3)((r + Δr)<sup>3</sup> − r<sup>3</sup>)]
    </em>
  </div>

  <p>
    RDF yang besar pada jarak pendek menunjukkan jarak tersebut lebih sering
    muncul daripada distribusi acak pada densitas yang sama. Skrip menghitung
    bilangan koordinasi langsung dari jumlah O dalam cutoff <em>r<sub>c</sub></em>
    pada tiap Li dan tiap frame:
  </p>

  <div class="analysis-equation">
    <em>
      CN<sub>LiO</sub>(t, i)
      =
      ∑<sub>j∈O</sub>
      1[r<sub>ij</sub>(t) ≤ r<sub>c</sub>]
    </em>
  </div>

</div>
<div class="analysis-section">

  <p>
    Karena itu, pemilihan <em>r<sub>c</sub></em> harus dilaporkan. Minimum
    pertama sesudah puncak RDF adalah panduan awal, bukan aturan yang selalu
    sempurna. Ulangi analisis dengan dua cutoff yang berdekatan untuk melihat
    apakah kesimpulan berubah.
  </p>

  <p>
    <strong>Contoh pemeriksaan.</strong> Jika sel 12,3 Å, radius maksimum citra
    terdekat adalah 6,15 Å. Memakai <code>--rmax 8.0</code> tidak sah untuk
    normalisasi RDF ini. Nilai cutoff tidak boleh melebihi radius maksimum
    tersebut. Jika sebagian molekul terlibat melalui citra kotak VMD, jarak
    periodik di skrip tetap dihitung dengan citra terdekat.
  </p>

</div>


<div class="analysis-section">

  <h4>13.3 · Membandingkan grafik dan statistik</h4>

  <p>
    Untuk elektrolit, periksa empat hubungan berikut secara berurutan.
    Pertama, puncak Li–O harus berada pada radius yang sejalan dengan koordinasi
    dari frame. Kedua, histogram CN memberi variasi yang terserum yang biasa
    hanya rata-rata dilaporkan. Ketiga, kontak Li–F memberi petunjuk pasangan
    ion, tetapi identitas F yang sama perlu ditelusuri bila ingin membedakan
    pasangan kontak dan konfigurasi sementara. Keempat, perubahan muatan
    Mulliken hendaknya dilihat bersama perubahan geometri; fluktuasi muatan
    sendiri tidak cukup untuk menyimpulkan reaksi.
  </p>

  <p>
    Pada antarmuka, bandingkan jarak O–Li dan jumlah muatan EC di waktu yang
    sama. Jika jarak bertambah tetapi muatan tidak berubah, itu satu pola; jika
    keduanya berubah bersama, itu pola lain. Keduanya tetap memerlukan uji
    terhadap lebih banyak frame, konfigurasi paralel, dan lintasan lebih
    panjang. Periodisitas yang dipakai untuk jarak adalah <em>x/y</em>; arah
    <em>z</em> menjadi vakum.
  </p>

</div>


<div class="analysis-section">

  <h4>13.4 · Kontoh kurva MACE yang valid dihitung</h4>

  <p>
    Berkas
    <code>kasus/05_baterai_lif_eos/kurva_lif_mace.csv</code>
    memuat lima evaluasi MACE-MP pada sel LiF yang diskalakan. Kurva berikut
    dibuat langsung dari CSV tersebut. Energi digeser agar minimum dari lima
    titik menjadi nol; tekanan tidak digeser.
  </p>

  <figure class="analysis-figure">

    <img
      src="../images/kurva-lif-mace.png"
      alt="Kurva energi relatif LiF dari model MACE-MP"
    >

    <figcaption>
      Gambar 6: Energi relatif LiF dari model MACE-MP lokal pada lima skala kisi.
      Garis menghubungkan titik, bukan fit persamaan keadaan.
    </figcaption>

  </figure>

  <p>
    Minimum pada grid lima titik berada di skala 1,020. Tekanan berubah dari
    positif di skala 1,000 menjadi negatif di 1,020, sehingga nol tekanan
    berada di antara dua titik itu menurut interpolasi sederhana. Kedua
    petunjuk tersebut belum menentukan parameter kisi setimbang yang presisi.
    Tambahkan titik, periksa relaksasi internal, dan bandingkan dengan acuan
    yang sesuai.
  </p>

</div>
<!-- PART 1 · SESI 4 · HALAMAN 30 -->
<section class="analysis-section">

  <h3>13.5 Cek status sebelum melaporkan angka</h3>

  <div class="analysis-table-wrap">
    <table class="analysis-table">
      <thead>
        <tr>
          <th>Kasus</th>
          <th>Bukti keluaran sah</th>
          <th>Klaim yang dapat ditulis</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MD elektrolit</td>
          <td>traject dan mulliken selaras; jumlah frame dicatat</td>
          <td>Distribusi pada lintasan yang dianalisis</td>
        </tr>
        <tr>
          <td>Antarmuka</td>
          <td>antar muka.csv punya jarak dan muatan setiap frame</td>
          <td>Tren kontak pada model slab yang dipakai</td>
        </tr>
        <tr>
          <td>NEB</td>
          <td>Optimasi ujung dan status_neb.txt menyatakan konvergen</td>
          <td>Estimasi barrier untuk model Pt/CO ini</td>
        </tr>
        <tr>
          <td>Interaksi obat</td>
          <td>Tiga dftb.out selesai normal dan muatan sesuai</td>
          <td>Energi interaksi vertikal pada posisi ini</td>
        </tr>
        <tr>
          <td>LiF</td>
          <td>Setiap titik scan selesai; checkpoint MACE dan geometri sama dicatat</td>
          <td>Perbandingan bentuk kurva dan tren tekanan</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    Jika salah satu bukti belum ada, tulis status yang sebenarnya di lembar kerja.
    Rencana perhitungan dan geometri awal tetap bermanfaat untuk diskusi, tetapi tidak
    menggantikan keluaran simulasi.
  </p>

  <h2>14 Visualisasi molekul dan padatan dengan VMD</h2>

  <p>
    VMD membantu kita memeriksa posisi atom sebelum menghitung dan menafsirkan
    lintasan sesudah menghitung. Gambar yang menarik tetap harus menunjukkan objek
    ilmiah yang benar: komposisi, arah permukaan, posisi ion, serta atom yang dipakai
    dalam analisis. Gambar dalam bab ini dibuat dari struktur.xyz dengan VMD dan
    renderer TachyonInternal. Mode <code>-dispdev text</code> menjalankan VMD tanpa
    jendela grafis; panduan resmi VMD menjelaskan bahwa perintah tersebut dapat dipakai
    pada mode ini.
  </p>

  <h3>14.1 Langkah V1 — periksa program dan berkas</h3>

  <p>
    Sesudah membuat struktur kasus 1 dengan skrip Python pada bab praktikum, kembali
    ke langkah ini. Mulai dari direktori paket yang telah disalin ke akun Anda.
    Jalankan satu baris demi satu baris:
  </p>

  <div class="analysis-command">
    <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>pwd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>command -v vmd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls skrip/visualisasi.vmd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/lipf6_ec/struktur.xyz</code></pre>
  </div>

  <p>
    <code>command -v vmd</code> semestinya mengembalikan lokasi program di Mahameru.
    Jika kosong, minta lokasi executable atau perintah <code>module load</code> kepada
    fasilitator. Skrip memakai <code>vmd</code> dari PATH pada Linux.
  </p>

</section>
<!-- PART 2 · SESI 4 · HALAMAN 31 -->

<section class="analysis-section">

  <div class="analysis-command">
    <pre><code>command -v vmd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls skrip/visualisasi.vmd</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls proyek_pribadi/lipf6_ec/struktur.xyz</code></pre>
  </div>

  <p>
    <code>command -v vmd</code> semestinya mengembalikan lokasi program di Mahameru.
    Jika kosong, minta lokasi executable atau perintah <code>module load</code>
    kepada fasilitator. Skrip memakai <code>vmd</code> dari PATH pada Linux.
  </p>


  <h3>14.2 Langkah V2 — buat gambar struktur pribadi tanpa GUI</h3>

  <div class="analysis-command">
    <pre><code>mkdir -p proyek_pribadi/gambar_saya</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>vmd -dispdev text -e skrip/visualisasi.vmd -args proyek_pribadi/lipf6_ec/struktur.xyz
→ proyek_pribadi/gambar_saya/elektrolit.tga</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>ls -lh proyek_pribadi/gambar_saya/elektrolit.tga</code></pre>
  </div>

  <p>
    VMD membuat berkas TGA dari struktur yang Anda bangun sendiri. Jika gambar belum
    muncul, periksa pesan yang tercetak di terminal. Untuk mengubah gambar melalui
    SFTP Termius, Anda dapat mengubahnya menjadi PNG dengan penampil gambar yang
    mendukung TGA Windows.
  </p>


  <h3>14.3 Langkah V3 — pahami satu perintah dan ubah tampilan</h3>

  <p>
    Contoh untuk antarmuka LiF–EC:
  </p>

  <div class="analysis-command">
    <pre><code>vmd -dispdev text -e skrip/visualisasi.vmd -args proyek_pribadi/02_antarmuka_lif_ec/struktur.xyz
→ proyek_pribadi/gambar_saya/antarmuka.tga antarmuka</code></pre>
  </div>

  <p>
    Argumen pertama menunjuk struktur, kedua nama gambar, dan ketiga memilih gaya
    antarmuka. Gaya ini menampilkan ion slab sebagai bola/ribut, EC sebagai ikatan
    dan atom, serta O karbonil sebagai atom merah yang lebih besar. Pilihan lain
    adalah elektrolit, antarmuka_atas, katalis, biomolekul, dan kristal. Untuk
    mengubah sudut pandang, salin skrip/visualisasi.vmd ke direktori pribadi,
    ubah baris rotate, lalu jalankan salinannya.
  </p>


  <h3>14.4 Langkah V4 — buka lintasan MD dan image NEB</h3>

  <p>
    Urutannya untuk peserta Windows adalah: pastikan job selesai, unduh
    <code>traject</code> atau <code>struktur.xyz</code> dengan SFTP, periksa berkas
    sudah ada di Downloads, kemudian buka VMD di laptop. Jangan membuka VMD pada
    laptop saat koneksi masih bermasalah. Untuk gambar analisis .png, cukup buka
    berkas yang sudah diunduh dengan penampil gambar Windows; VMD dipakai untuk
    struktur dan lintasan atom.
  </p>

  <p>
    Setelah MD selesai, <code>traject</code> berisi banyak frame XYZ. Untuk melihat
    satu frame pada mode tanpa display, VMD dapat memuat lintasan tersebut dengan
    tipe xyz; skrip di atas merender konfigurasi.
  </p>

</section>
<!-- PART 1 · SESI 5 · HALAMAN 32–33 -->

<section class="analysis-section">

  <p>
    Untuk memutar semua frame dengan GUI, unduh <code>traject</code> ke Windows
    lewat SFTP dan buka dengan VMD pada laptop Windows. Di VMD, pilih
    <em>File → New Molecule → Browse</em>, pilih berkas <code>traject</code>,
    tetapkan jenis berkas XYZ jika tidak terdeteksi, lalu tekan <em>Load</em>.
    Berkas itu sudah berisi urutan frame, jadi tidak perlu memilih satu XYZ untuk
    setiap waktu. Di jendela VMD, pilih representasi <em>Licorice</em> untuk EC,
    <em>VDW</em> untuk Li, lalu tekan <em>Play</em>. Atom dapat tampak berpindah
    mendadak saat melewati batas sel periodik; itu merupakan efek wrapping, bukan
    loncatan fisik. Untuk NEB, render image awal, tengah, dan akhir secara
    terpisah; urutan image mewakili jalur geometri, bukan frame waktu MD.
  </p>

  <div class="analysis-command">
    <pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>vmd -dispdev text -e skrip/visualisasi.vmd -args
→ proyek_pribadi/neb_pt_co_awal/image_03/struktur.xyz proyek_pribadi/gambar_saya/neb_tengah.tga
→ katalis</code></pre>
  </div>

  <p>
    Untuk dua kasus lain, gunakan struktur hasil skrip Python Anda:
  </p>

  <div class="analysis-command">
    <pre><code>vmd -dispdev text -e skrip/visualisasi.vmd -args
→ proyek_pribadi/ibuprofen_arginin/kompleks/struktur.xyz
→ proyek_pribadi/gambar_saya/kompleks.tga biomedis</code></pre>
  </div>

  <div class="analysis-command">
    <pre><code>vmd -dispdev text -e skrip/visualisasi.vmd -args
→ proyek_pribadi/scan_lif_awal/titik_02/struktur.xyz proyek_pribadi/gambar_saya/lif.tga kristal</code></pre>
  </div>

  <p>
    <strong>Catatan pengamatan.</strong> Dalam buku kerja, tulis atom mana yang
    diberi warna khusus, lokasi situs awal/akhir CO, orientasi EC terhadap slab,
    dan apakah visual menunjukkan masalah geometri seperti kontak terlalu dekat.
    Gambar struktur awal belum menjadi bukti dinamika, adsorpsi, atau penghalang
    energi.
  </p>

</section>


