<div class="mahameru-page">

<div class="mahameru-tabs">

<a class="mahameru-tab" href="./index.md">
Day 1
</a>

<a class="mahameru-tab active" href="./foundations.md">
Foundations
</a>

<a class="mahameru-tab" href="./lipf6-ec.md">
LiPF6 / EC
</a>

<a class="mahameru-tab" href="./md-analysis.md">
MD Analysis
</a>

<a class="mahameru-tab" href="./lif-ec-interface.md">
LiF / EC
</a>

<a class="mahameru-tab" href="./mace.md">
MACE
</a>

</div>


<p class="mahameru-intro">
Bagian ini memperkenalkan hubungan antara struktur atom, energi,
gaya, DFT, DFTB, dan molecular dynamics. Tujuannya bukan menghafal
persamaan, tetapi memahami apa yang dihitung dan bagaimana hasilnya
digunakan pada latihan berikutnya.
</p>


<div class="mahameru-workflow-intro">

<div>

<strong>
Foundations · From Atoms to Dynamics
</strong>

<p>
Mulai dari struktur atom dan pertanyaan ilmiah. Kemudian hubungkan
metode elektronik dengan energi dan gaya, lalu pahami bagaimana
gaya digunakan untuk menjalankan molecular dynamics.
</p>

</div>

</div>


<div class="workflow-roadmap">

<div class="workflow-step">

<span>
01
</span>

<strong>
Structure
</strong>

<small>
Atoms + coordinates
</small>

</div>


<div class="workflow-arrow">
→
</div>


<div class="workflow-step">

<span>
02
</span>

<strong>
Energy</strong>

<small>
Electronic structure
</small>

</div>


<div class="workflow-arrow">
→
</div>


<div class="workflow-step">

<span>
03
</span>

<strong>
Force</strong>

<small>
Atomic motion
</small>

</div>


<div class="workflow-arrow">
→
</div>


<div class="workflow-step">

<span>
04
</span>

<strong>
MD</strong>

<small>
Trajectory
</small>

</div>

</div>


<hr>


<h2 id="atomic-structure" class="mahameru-section-title">
01 · Atomic Structure
</h2>

<p>
Satu konfigurasi atom terdiri dari jenis atom dan posisi kartesiusnya.
Pada latihan workshop, posisi dinyatakan dalam ångström (Å).
Untuk sistem periodik, konfigurasi juga memerlukan informasi sel.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Atomic species
</strong>

<p>
Jenis dan jumlah atom yang membentuk sistem.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Cartesian positions
</strong>

<p>
Posisi setiap atom dalam koordinat kartesius.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Periodic cell
</strong>

<p>
Vektor translasi yang mendefinisikan sel untuk sistem periodik.
</p>

</div>

</div>


<details>

<summary>
<strong>Periodic system</strong>
</summary>

<p>
Pada sistem kristal atau elektrolit periodik, sel diulang di ruang.
Karena itu, ukuran sel dan kondisi batas periodik menjadi bagian
dari model, bukan sekadar informasi tambahan.
</p>

</details>


<details>

<summary>
<strong>Interface system</strong>
</summary>

<p>
Pada antarmuka, model dapat menggunakan slab sebagai representasi
permukaan padatan dan ruang di atasnya untuk molekul atau elektrolit.
</p>

<p>
Pada latihan LiF–EC, model menggunakan slab LiF dan satu molekul
ethylene carbonate dalam ruang vakum. Struktur tersebut merupakan
geometri awal dan belum merupakan keadaan antarmuka baterai yang
setimbang.
</p>

</details>


<div class="workflow-check">

<strong>
STRUCTURE CHECK
</strong>

<ul>

<li>Jenis atom sudah benar.</li>

<li>Jumlah atom sudah benar.</li>

<li>Koordinat menggunakan satuan yang sesuai.</li>

<li>Sel periodik sudah dicatat jika diperlukan.</li>

<li>Muatan total sistem sudah diketahui.</li>

</ul>

</div>


<hr>


<h2 id="scientific-question" class="mahameru-section-title">
02 · From Structure to Scientific Question
</h2>

<p>
Sebelum memilih program atau menjalankan simulasi, tentukan
pertanyaan yang dapat dijawab oleh model atomistik.
</p>

<p>
Pada skala atom, kita dapat menghitung geometri, energi, gaya,
dan perubahan posisi terhadap waktu. Besaran pada skala yang lebih
besar memerlukan informasi tambahan dan tidak otomatis dapat
diturunkan dari satu model kecil.
</p>


<div class="analysis-grid">

<div class="analysis-card">

<strong>
Li⁺ in EC
</strong>

<span>
Electrolyte
</span>

<p>
Bagaimana Li⁺ tersolvasi dalam ethylene carbonate?
</p>

</div>


<div class="analysis-card">

<strong>
Li⁺–F</strong>

<span>
Ion pairing
</span>

<p>
Apakah Li⁺ berpasangan dengan anion melalui interaksi Li–F?
</p>

</div>


<div class="analysis-card">

<strong>
LiF–EC</strong>

<span>
Interface
</span>

<p>
Bagaimana EC berinteraksi dengan permukaan LiF?
</p>

</div>


<div class="analysis-card">

<strong>
CO / Pt</strong>

<span>
Catalysis
</span>

<p>
Bagaimana CO berpindah pada permukaan Pt?
</p>

</div>


<div class="analysis-card">

<strong>
MACE / LiF</strong>

<span>
AI model
</span>

<p>
Apakah MACE mereproduksi respons LiF?
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Model defines the question</strong>

<p>
Pertanyaan ilmiah menentukan besaran pertama yang perlu diperiksa.
Jangan memilih analisis hanya karena file output tersedia.
Mulailah dari pertanyaan, kemudian tentukan ukuran analisis yang sesuai.
</p>

</div>


<hr>


<h2 id="dft-dftb-md" class="mahameru-section-title">
03 · DFT, DFTB, and MD
</h2>

<p>
Dalam simulasi atom, kita memerlukan energi dan gaya untuk suatu
susunan atom. DFT menghitung besaran tersebut melalui model
elektronik. DFTB menggunakan penyederhanaan dan parameterisasi
yang diturunkan dari DFT agar perhitungan dapat dilakukan dengan
biaya komputasi yang lebih rendah.
</p>

<p>
Pada molecular dynamics, gaya dihitung kembali ketika atom bergerak.
Gaya tersebut dapat diperoleh dari DFT, DFTB, atau model yang
dilatih dengan data, seperti MACE.
</p>


<div class="workflow-flow">

<div>

<strong>
Structure
</strong>

<small>
Atomic positions
</small>

</div>


<span>
→
</span>


<div>

<strong>
Electronic method
</strong>

<small>
DFT / DFTB / MACE
</small>

</div>


<span>
→
</span>


<div>

<strong>
Energy & force
</strong>

<small>
Potential surface
</small>

</div>


<span>
→
</span>


<div>

<strong>
Molecular dynamics
</strong>

<small>
Atomic trajectory
</small>

</div>

</div>


<details>

<summary>
<strong>DFT</strong>
</summary>

<p>
Density Functional Theory merupakan metode struktur elektronik
berbasis kerapatan elektron. Pada pendekatan Born–Oppenheimer,
posisi inti dianggap tetap ketika keadaan elektronik dihitung.
Hasilnya memberikan energi potensial untuk konfigurasi atom tersebut.
</p>

</details>


<details>

<summary>
<strong>DFTB</strong>
</summary>

<p>
Density Functional Tight Binding merupakan pendekatan yang diturunkan
dari DFT dan diparameterkan. Penyederhanaan tersebut membuat
perhitungan lebih hemat biaya dibandingkan perhitungan DFT penuh
untuk banyak aplikasi atomistik.
</p>

</details>


<details>

<summary>
<strong>Molecular Dynamics</strong>
</summary>

<p>
Dalam MD, posisi atom diperbarui langkah demi langkah menggunakan
gaya yang diperoleh dari metode energi. Hasilnya berupa lintasan
yang dapat digunakan untuk mempelajari perubahan struktur dan
pergerakan atom terhadap waktu.
</p>

</details>


<div class="workflow-warning">

<strong>
Method choice matters</strong>

<p>
Pilihan metode memengaruhi biaya komputasi dan ketelitian hasil.
Hasil DFT dengan pengaturan yang sebanding dapat digunakan sebagai
acuan untuk memeriksa hasil DFTB pada studi yang sesuai.
</p>

</div>


<hr>


<h2 id="energy-force" class="mahameru-section-title">
04 · From Energy to Force
</h2>

<p>
Ketika posisi atom ditetapkan, keadaan elektronik menghasilkan
energi potensial untuk konfigurasi tersebut. Gaya pada atom diperoleh
dari turunan negatif energi terhadap posisi atom.
</p>


<div class="mahameru-info-card">

<strong>
Force from energy</strong>

<p>
Gaya menentukan bagaimana atom bergerak pada simulasi molecular
dynamics. Karena itu, kualitas energi dan gaya menjadi dasar dari
trajectory yang dihasilkan.
</p>

</div>


<details>

<summary>
<strong>Born–Oppenheimer picture</strong>
</summary>

<p>
Dalam pendekatan Born–Oppenheimer, pergerakan inti dan perhitungan
elektronik dipisahkan. Untuk konfigurasi posisi inti tertentu,
perhitungan elektronik menghasilkan energi potensial. Gaya kemudian
digunakan untuk memperbarui posisi atom.
</p>

</details>


<div class="workflow-flow">

<div>

<strong>
Atomic positions
</strong>

<small>
R
</small>

</div>


<span>
→
</span>


<div>

<strong>
Energy</strong>

<small>
E(R)
</small>

</div>


<span>
→
</span>


<div>

<strong>
Force</strong>

<small>
−∇E
</small>

</div>


<span>
→
</span>


<div>

<strong>
New positions
</strong>

<small>
Next step
</small>

</div>

</div>


<hr>


<h2 id="dftb-scc" class="mahameru-section-title">
05 · SCC-DFTB
</h2>

<p>
SCC atau Self-Consistent Charge merupakan bagian penting dalam
perhitungan DFTB. Muatan diperbarui melalui proses iteratif sampai
muatan dan Hamiltonian mencapai kondisi yang konsisten.
</p>


<div class="workflow-roadmap">

<div class="workflow-step">

<span>
01
</span>

<strong>
Initial charge
</strong>

<small>
Starting state
</small>

</div>


<div class="workflow-arrow">
→
</div>


<div class="workflow-step">

<span>
02
</span>

<strong>
Hamiltonian
</strong>

<small>
Electronic state
</small>

</div>


<div class="workflow-arrow">
→
</div>


<div class="workflow-step">

<span>
03
</span>

<strong>
Update charge
</strong>

<small>
Charge redistribution
</small>

</div>


<div class="workflow-arrow">
→
</div>


<div class="workflow-step">

<span>
04
</span>

<strong>
Converged?</strong>

<small>
SCC check
</small>

</div>

</div>


<div class="workflow-check">

<strong>
SCC CHECK</strong>

<ul>

<li>Apakah proses SCC selesai?</li>

<li>Apakah output menunjukkan kondisi normal?</li>

<li>Apakah energi dan gaya dapat digunakan?</li>

<li>Apakah terdapat indikasi konvergensi bermasalah?</li>

</ul>

</div>


<div class="workflow-warning">

<strong>
Do not skip convergence</strong>

<p>
Jika SCC tidak konvergen, jangan langsung menggunakan energi atau
gaya pada langkah tersebut untuk interpretasi ilmiah.
Periksa pesan output, parameter, dan geometri sistem.
</p>

</div>


<hr>


<h2 id="slater-koster" class="mahameru-section-title">
06 · Slater–Koster Parameters
</h2>

<p>
Perhitungan DFTB memerlukan parameter Slater–Koster yang sesuai
dengan pasangan unsur dalam sistem. Berkas tersebut menyimpan
informasi interaksi orbital untuk pasangan unsur yang digunakan
dalam perhitungan.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Elements</strong>

<p>
Identifikasi semua unsur yang terdapat dalam sistem.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Pairs</strong>

<p>
Pastikan pasangan unsur yang diperlukan memiliki parameter.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Compatibility</strong>

<p>
Gunakan satu set parameter yang kompatibel untuk sistem yang dihitung.
</p>

</div>

</div>


<details>

<summary>
<strong>Why the pair files matter</strong>
</summary>

<p>
Untuk sistem dengan beberapa unsur, input membutuhkan parameter
interaksi untuk pasangan unsur yang diperlukan. Nama unsur saja
tidak menjamin bahwa dua berkas parameter berasal dari parameterisasi
yang kompatibel.
</p>

</details>


<div class="workflow-warning">

<strong>
Parameterization matters</strong>

<p>
Jangan menggabungkan berkas Slater–Koster dari parameterisasi berbeda
hanya karena nama unsurnya sama. Periksa sumber dan kompatibilitas
parameter sebelum menjalankan perhitungan.
</p>

</div>


<hr>


<h2 id="four-objects" class="mahameru-section-title">
07 · Four Objects to Record
</h2>

<p>
Setiap latihan harus memiliki catatan yang cukup untuk menjelaskan
apa yang dihitung dan bagaimana hasilnya diperoleh.
</p>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
Structure</h3>

<p>
Jenis atom, posisi, muatan, dan sel bila diperlukan.
</p>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
Method</h3>

<p>
Pendekatan energi, parameter, dan pengaturan konvergensi.
</p>

</div>


<div class="validation-card">

<strong>
03
</strong>

<h3>
Procedure</h3>

<p>
Single point, optimasi, atau molecular dynamics.
</p>

</div>


<div class="validation-card">

<strong>
04
</strong>

<h3>
Results</h3>

<p>
Energi, gaya, geometri, trajectory, dan status komputasi.
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Why record all four?</strong>

<p>
Jika salah satu dari empat objek tersebut tidak dicatat, hasil akan
lebih sulit diulang atau dibandingkan. Catatan seperti “simulasi
berhasil” tidak cukup untuk menjelaskan sebuah hasil komputasi.
</p>

</div>


<details>

<summary>
<strong>Example · LiPF6 / EC</strong>
</summary>

<p>
Contoh catatan awal dapat ditulis sebagai berikut:
</p>

<ul>

<li>
<strong>Structure:</strong> sistem periodik dengan muatan total netral.
</li>

<li>
<strong>Method:</strong> SCC-DFTB dengan parameter untuk Li/P/F/C/H/O.
</li>

<li>
<strong>Procedure:</strong> MD NVT pada 350 K.
</li>

<li>
<strong>Results:</strong> trajectory, energi, muatan, dan status SCC.
</li>

</ul>

</details>


<hr>


<h2 id="units" class="mahameru-section-title">
08 · Units and Time Scale
</h2>

<p>
Satuan perlu dicatat bersama hasil. Jangan memisahkan angka dari
satuan dan pengaturan simulasi yang menghasilkan angka tersebut.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
Å
</span>

<strong>
Position</strong>

<p>
Koordinat struktur pada latihan menggunakan ångström.
</p>

</div>


<div class="workflow-card">

<span>
eV
</span>

<strong>
Energy</strong>

<p>
Energi dari workflow berbasis ASE dapat dibaca dalam eV.
</p>

</div>


<div class="workflow-card">

<span>
eV/Å
</span>

<strong>
Force</strong>

<p>
Gaya dapat dinyatakan dalam eV/Å.
</p>

</div>


</div>


<div class="mahameru-info-card">

<strong>
Time step</strong>

<p>
DCDFTBMD menerima <code>DELTAT</code> dalam detik. Karena
1 fs = 10<sup>−15</sup> s, maka <code>5.0e-16 s</code> sama dengan
0,5 fs.
</p>

</div>


<details>

<summary>
<strong>Example · 1000 MD steps</strong>
</summary>

<p>
Untuk 1000 langkah dengan timestep 0,5 fs:
</p>

```text
1000 × 0,5 fs = 500 fs
```

<p>
Jika output dicetak setiap 10 langkah, jarak nominal antar-frame
yang tersimpan adalah:
</p>

```text
10 × 0,5 fs = 5 fs
```

<p>
Lintasan tersebut digunakan untuk latihan analisis awal. Modul
menegaskan bahwa lintasan 500 fs masih terlalu pendek untuk
mengambil koefisien transport secara andal.
</p>

</details>


<details>

<summary>
<strong>Practice · Time conversion</strong>
</summary>

<p>
Hitung waktu nominal untuk 80 langkah dengan:
</p>

```text
DELTAT = 5.0e-16 s
```

<p>
Hasilnya:
</p>

```text
80 × 0,5 fs = 40 fs
```

<p>
Jika <code>PRINT=5</code>, terdapat 16 interval output sepanjang
80 langkah. Jumlah frame aktual tetap perlu diperiksa dari file
keluaran.
</p>

</details>


<hr>


<h2 id="model-limit" class="mahameru-section-title">
09 · Know the Model Limit
</h2>

<p>
Model atomistik menjawab pertanyaan tertentu pada kondisi tertentu.
Hasil tidak boleh diperluas melebihi apa yang didukung oleh model.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Scale</strong>

<p>
Model kecil tidak otomatis mewakili perilaku pada skala sel atau
material nyata.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Sampling</strong>

<p>
Trajectory pendek dapat membatasi analisis dinamika dan transport.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Boundary</strong>

<p>
PBC, slab, dan vakum menentukan cara hasil harus dibaca.
</p>

</div>


</div>


<div class="workflow-warning">

<strong>
Example: LiF–EC</strong>

<p>
Model slab tipis dengan satu molekul EC dan ruang vakum belum
mewakili antarmuka elektrokimia penuh. Model tersebut digunakan
untuk mempelajari kontak adsorbat dan redistribusi muatan pada
latihan workshop.
</p>

</div>


<hr>


<h2 id="foundation-check" class="mahameru-section-title">
Foundation Check
</h2>

<p>
Sebelum masuk ke praktik LiPF6/EC, pastikan Anda dapat menjelaskan
alur dasar berikut.
</p>


<div class="workflow-check">

<strong>
CHECK YOUR UNDERSTANDING</strong>

<ul>

<li>
Apa yang dimaksud dengan konfigurasi atom?
</li>

<li>
Mengapa pertanyaan ilmiah perlu ditentukan sebelum memilih analisis?
</li>

<li>
Apa hubungan antara DFT, DFTB, dan molecular dynamics?
</li>

<li>
Mengapa energi diperlukan untuk memperoleh gaya?
</li>

<li>
Apa fungsi SCC dalam SCC-DFTB?
</li>

<li>
Mengapa parameter Slater–Koster harus kompatibel?
</li>

<li>
Apa empat objek yang harus dicatat pada setiap latihan?
</li>

<li>
Mengapa 500 fs cukup untuk latihan awal tetapi belum cukup untuk
klaim transport yang konvergen?
</li>

</ul>

</div>


<hr>


<div class="workflow-next">

<div>

<span>
PREVIOUS
</span>

<strong>
Day 1 Overview
</strong>

</div>


<div>

<span>
NEXT
</span>

<strong>
LiPF6 / EC</strong>

</div>

</div>

</div>
