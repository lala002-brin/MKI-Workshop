<div class="mahameru-page">

<div class="mahameru-tabs">

<a class="mahameru-tab active" href="./index.md">
Day 1
</a>

<a class="mahameru-tab" href="./foundations.md">
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
Hari pertama workshop membawa peserta dari pertanyaan ilmiah dan
struktur atom menuju simulasi DCDFTBMD, molecular dynamics, analisis
hasil, antarmuka LiF–EC, dan pengenalan MACE.
</p>


<div class="mahameru-workflow-intro">

<div>

<strong>
Day 1 · Dari Atom ke Antarmuka
</strong>

<p>
Gunakan halaman ini sebagai peta kegiatan. Mulai dari fondasi,
kemudian ikuti latihan secara berurutan. Setiap latihan mencatat
struktur, metode, prosedur, dan hasil agar pekerjaan dapat diperiksa
dan diulang.
</p>

</div>

</div>


<div class="workflow-roadmap">

<div class="workflow-step">

<span>
01
</span>

<strong>
Foundations
</strong>

<small>
DFT · DFTB · MD
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
LiPF6 / EC
</strong>

<small>
DCDFTBMD + MD
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
MD Analysis
</strong>

<small>
RDF · MSD · Charge
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
LiF / EC
</strong>

<small>
Interface
</small>

</div>


<div class="workflow-arrow">
→
</div>


<div class="workflow-step">

<span>
05
</span>

<strong>
MACE
</strong>

<small>
LiF response
</small>

</div>

</div>


<hr>


<h2 id="learning-outcomes" class="mahameru-section-title">
Learning Outcomes
</h2>

<p>
Setelah mengikuti kegiatan hari pertama, peserta diarahkan untuk
membangun kemampuan dari input hingga interpretasi hasil.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Prepare input</strong>

<p>
Membaca dan menyusun <code>dftb.inp</code> untuk kebutuhan latihan.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Understand SCC-DFTB</strong>

<p>
Menjelaskan SCC-DFTB dan parameter Slater–Koster yang digunakan.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Run MD</strong>

<p>
Menyiapkan simulasi molecular dynamics untuk sistem elektrolit.
</p>

</div>


<div class="workflow-card">

<span>
04
</span>

<strong>
Analyze</strong>

<p>
Menganalisis RDF, koordinasi, MSD, transport, dan muatan.
</p>

</div>


<div class="workflow-card">

<span>
05
</span>

<strong>
Study interfaces</strong>

<p>
Menganalisis interaksi EC dengan permukaan LiF.
</p>

</div>


<div class="workflow-card">

<span>
06
</span>

<strong>
Compare models</strong>

<p>
Membandingkan respons LiF menggunakan DFTB dan MACE.
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Prasyarat
</strong>

<p>
Pemahaman sederhana mengenai atom dan molekul sudah cukup untuk
memulai. Perintah Terminal dan pustaka Python yang digunakan dalam
latihan akan diperkenalkan secara bertahap.
</p>

</div>


<hr>


<h2 id="day-1-flow" class="mahameru-section-title">
Day 1 Flow
</h2>

<p>
Ikuti kegiatan sesuai urutan berikut. Tidak semua bagian memerlukan
perhitungan yang panjang. Beberapa tahap digunakan untuk memahami
input, memeriksa keluaran, dan menghubungkan hasil dengan pertanyaan
ilmiah.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Foundations</strong>

<p>
Hubungan DFT, DFTB, dan MD serta cara merumuskan pertanyaan ilmiah
dari model atomistik.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
LiPF6 / EC</strong>

<p>
Menyusun input DCDFTBMD dan menjalankan MD elektrolit
LiPF6/ethylene carbonate.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
MD Analysis</strong>

<p>
Membaca trajectory untuk RDF, koordinasi, MSD, transport, dan
muatan Mulliken.
</p>

</div>


<div class="workflow-card">

<span>
04
</span>

<strong>
LiF / EC Interface</strong>

<p>
Mengikuti kontak EC dengan permukaan LiF dan redistribusi muatan.
</p>

</div>


<div class="workflow-card">

<span>
05
</span>

<strong>
MACE</strong>

<p>
Mengenal pendekatan berbasis machine learning melalui respons kisi
LiF terhadap perubahan volume.
</p>

</div>


<div class="workflow-card">

<span>
06
</span>

<strong>
Discussion</strong>

<p>
Memeriksa hasil, batas model, konvergensi, dan hubungan antara
hasil komputasi dengan pertanyaan ilmiah.
</p>

</div>

</div>


<hr>


<h2 id="scientific-question" class="mahameru-section-title">
Start from a Scientific Question
</h2>

<p>
Sebelum memilih program atau menjalankan simulasi, tentukan terlebih
dahulu pertanyaan yang dapat dijawab oleh model atomistik.
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
Li⁺–F
</strong>

<span>
Ion pairing
</span>

<p>
Apakah Li⁺ berpasangan dengan anion melalui interaksi Li–F?
</p>

</div>


<div class="analysis-card">

<strong>
LiF–EC
</strong>

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
MACE / LiF
</strong>

<span>
AI acceleration
</span>

<p>
Apakah MACE mereproduksi respons LiF?
</p>

</div>

</div>


<div class="workflow-check">

<strong>
FOUR OBJECTS TO RECORD
</strong>

<ul>

<li>
<strong>Structure</strong> — jenis atom, posisi, muatan, dan sel bila diperlukan.
</li>

<li>
<strong>Method</strong> — pendekatan energi, parameter, dan pengaturan konvergensi.
</li>

<li>
<strong>Procedure</strong> — single point, optimasi, atau molecular dynamics.
</li>

<li>
<strong>Results</strong> — energi, gaya, geometri, trajectory, dan status komputasi.
</li>

</ul>

</div>


<hr>


<h2 id="workshop-cases" class="mahameru-section-title">
Day 1 Cases
</h2>

<p>
Hari pertama menggunakan beberapa sistem untuk menghubungkan struktur
awal dengan ukuran analisis yang spesifik. Setiap keluaran perlu
disertai catatan parameter, konvergensi, dan batas model sebelum
dibahas sebagai hasil ilmiah.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
CASE 1
</span>

<strong>
LiPF6 / EC</strong>

<p>
MD periodik, RDF, koordinasi, MSD, transport ideal, dan muatan.
</p>

</div>


<div class="workflow-card">

<span>
CASE 2
</span>

<strong>
LiF–EC</strong>

<p>
Kontak adsorbat dan redistribusi muatan pada model antarmuka.
</p>

</div>


<div class="workflow-card">

<span>
CASE 3
</span>

<strong>
CO / Pt(111)</strong>

<p>
Migrasi permukaan dan barrier energi menggunakan NEB.
</p>

</div>


<div class="workflow-card">

<span>
CASE 4
</span>

<strong>
Ibuprofenat</strong>

<p>
Kontak O–N dan energi interaksi dengan motif guanidinium.
</p>

</div>


<div class="workflow-card">

<span>
CASE 5
</span>

<strong>
LiF + MACE</strong>

<p>
Persamaan keadaan dan respons tekanan dari DFTB dan MACE.
</p>

</div>

</div>


<div class="workflow-warning">

<strong>
Case scope</strong>

<p>
Tidak semua kasus harus dijalankan sebagai simulasi panjang.
Setiap kasus memiliki tujuan analisis dan batas model yang berbeda.
Gunakan tujuan latihan sebagai dasar ketika membaca hasil.
</p>

</div>


<hr>


<h2 id="important-notes" class="mahameru-section-title">
Important Notes
</h2>


<details>

<summary>
<strong>
Tentang simulasi MD LiPF6/EC
</strong>
</summary>

<p>
Contoh latihan menggunakan 1000 langkah dengan timestep 0,5 fs,
sehingga total waktu simulasi menjadi 500 fs.
</p>

<p>
Waktu tersebut cukup untuk latihan analisis awal, tetapi belum cukup
untuk mengambil sifat transport seperti difusi sebagai hasil yang
telah konvergen.
</p>

</details>


<details>

<summary>
<strong>
Tentang model LiF–EC
</strong>
</summary>

<p>
Model antarmuka menggunakan slab LiF dan satu molekul ethylene
carbonate dalam ruang vakum. Struktur tersebut merupakan geometri
awal untuk latihan analisis antarmuka.
</p>

<p>
Model ini belum mewakili antarmuka elektrokimia penuh. Model tersebut
tidak secara langsung menyatakan potensial elektroda, reaksi reduksi,
atau kestabilan siklus.
</p>

</details>


<details>

<summary>
<strong>
Tentang interpretasi hasil
</strong>
</summary>

<p>
Ukuran sistem, komposisi, cutoff, panjang lintasan, sampling,
parameterisasi, dan kondisi komputasi dapat memengaruhi hasil.
Karena itu, angka hasil perlu dibaca bersama dengan pengaturan
simulasinya.
</p>

</details>


<hr>


<h2 id="before-start" class="mahameru-section-title">
Before You Start
</h2>


<div class="workflow-check">

<strong>
CHECKLIST</strong>

<ul>

<li>
Akun dan akses Mahameru sudah tersedia.
</li>

<li>
Peserta dapat masuk ke environment workshop.
</li>

<li>
Working directory sudah ditentukan.
</li>

<li>
Struktur dan file latihan sudah tersedia.
</li>

<li>
Peserta mengetahui pertanyaan ilmiah dari kasus yang dikerjakan.
</li>

<li>
Empat objek latihan siap dicatat: Structure, Method, Procedure, Results.
</li>

</ul>

</div>


<hr>


<div class="workflow-next">

<div>

<span>
START HERE
</span>

<strong>
01 · Foundations</strong>

</div>


<div>

<span>
NEXT</span>

<strong>
02 · LiPF6 / EC</strong>

</div>

</div>

</div>
