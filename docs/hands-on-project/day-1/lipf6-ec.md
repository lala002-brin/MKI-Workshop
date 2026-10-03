<div class="mahameru-page">

<div class="mahameru-tabs">

<a class="mahameru-tab" href="./index.md">
Day 1
</a>

<a class="mahameru-tab" href="./foundations.md">
Foundations
</a>

<a class="mahameru-tab active" href="./lipf6-ec.md">
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
Kasus pertama mempelajari koordinasi Li⁺ dalam elektrolit
LiPF6/ethylene carbonate menggunakan DCDFTBMD dan molecular dynamics.
Kita mulai dari struktur dan input, kemudian memeriksa parameter,
menjalankan simulasi, dan menyiapkan keluaran untuk analisis.
</p>


<div class="mahameru-workflow-intro">

<div>

<strong>
Case 1 · LiPF6 / Ethylene Carbonate
</strong>

<p>
Pertanyaan utama: berapa jumlah O dari ethylene carbonate yang dekat
dengan Li⁺, bagaimana distribusinya selama MD, dan apakah terdapat
kontak Li–F yang mengindikasikan pasangan ion?
</p>

</div>

</div>


<div class="workflow-roadmap">

<div class="workflow-step">

<span>
01
</span>

<strong>
Question
</strong>

<small>
Li⁺ coordination
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
Prepare</strong>

<small>
Structure + input
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
Check</strong>

<small>
Parameters
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
Run</strong>

<small>
MD NVT
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
Analyze</strong>

<small>
Next section
</small>

</div>

</div>


<hr>


<h2 id="scientific-question" class="mahameru-section-title">
01 · Scientific Question
</h2>

<p>
Kasus ini digunakan untuk mempelajari lingkungan lokal Li⁺ dalam
elektrolit karbonat.
</p>


<div class="analysis-grid">

<div class="analysis-card">

<strong>
Li–O
</strong>

<span>
Solvation</span>

<p>
Bagaimana distribusi O dari ethylene carbonate di sekitar Li⁺?
</p>

</div>


<div class="analysis-card">

<strong>
Coordination
</strong>

<span>
Local structure
</span>

<p>
Berapa jumlah atom O yang berada di sekitar Li⁺ pada cutoff tertentu?
</p>

</div>


<div class="analysis-card">

<strong>
Li–F
</strong>

<span>
Ion pairing
</span>

<p>
Apakah RDF Li–F menunjukkan kontak kation–anion?
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
What we measure first
</strong>

<p>
RDF Li–O, RDF Li–F, bilangan koordinasi, MSD, estimasi transport,
dan tren muatan. Besaran tersebut membantu menghubungkan trajectory
dengan pertanyaan ilmiah.
</p>

</div>


<hr>


<h2 id="system" class="mahameru-section-title">
02 · System
</h2>

<p>
Model awal berisi 12 molekul ethylene carbonate dan 2 molekul LiPF6
dalam sel kubik dengan panjang sisi 12,3 Å. Jumlah total atom adalah
136.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
12
</span>

<strong>
Ethylene Carbonate</strong>

<p>
Molekul EC membentuk lingkungan pelarut karbonat untuk Li⁺.
</p>

</div>


<div class="workflow-card">

<span>
2
</span>

<strong>
LiPF6</strong>

<p>
Garam menyediakan Li⁺ dan anion PF6⁻ dalam model elektrolit.
</p>

</div>


<div class="workflow-card">

<span>
136
</span>

<strong>
Total atoms</strong>

<p>
Jumlah atom keseluruhan pada konfigurasi awal.
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Periodic cell
</strong>

<p>
Model menggunakan kondisi batas periodik. Sel kubik memiliki panjang
12,3 Å pada masing-masing arah.
</p>

</div>


<hr>


<h2 id="workspace" class="mahameru-section-title">
03 · Prepare the Workspace
</h2>

<p>
Semua perintah pada latihan dimulai dari direktori
<code>~/latihan_simulasi/workshop_material</code>, kecuali jika
disebutkan berbeda.
</p>


<div class="workflow-check">

<strong>
WORKING DIRECTORY</strong>

<ul>

<li>Pastikan direktori aktif sebelum menjalankan script.</li>

<li>Gunakan <code>pwd</code> untuk memeriksa lokasi.</li>

<li>Simpan hasil pribadi di dalam <code>proyek_pribadi</code>.</li>

<li>Jangan mencampurkan hasil simulasi dengan salinan awal kasus.</li>

</ul>

</div>


<p>
Mulai dengan:
</p>


```
cd ~/latihan_simulasi/workshop_material
pwd
mkdir -p proyek_pribadi
ls kasus/01_elektrolit_lipf6_ec
```


<p>
Perintah tersebut memastikan Anda berada di direktori workshop,
membuat tempat untuk hasil pribadi, dan melihat berkas yang tersedia
untuk kasus pertama.
</p>


<details>

<summary>
<strong>
Mengapa menggunakan proyek_pribadi?
</strong>
</summary>

<p>
Berkas contoh dalam direktori <code>kasus</code> berfungsi sebagai
acuan. Hasil pekerjaan peserta disimpan di <code>proyek_pribadi</code>
agar hasil simulasi tidak bercampur dengan salinan awal.
</p>

</details>


<hr>


<h2 id="generate-structure" class="mahameru-section-title">
04 · Generate the Structure and Input
</h2>

<p>
Untuk kasus elektrolit yang memiliki 136 atom, modul menggunakan
generator untuk membuat struktur dan input secara konsisten.
Seed digunakan agar proses pembuatan struktur dapat diulang.
</p>


<p>
Jalankan:
</p>


```
python skrip/buat_elektron_lipf6_ec.py --seed 27 --langkah 1000 \
--output proyek_pribadi/lipf6_ec
```


<p>
Kemudian periksa ringkasan dan bagian awal file:
</p>


```
cat proyek_pribadi/lipf6_ec/ringkasan.txt

head -n 6 proyek_pribadi/lipf6_ec/struktur.xyz

head -n 12 proyek_pribadi/lipf6_ec/dftb.inp
```


<div class="workflow-check">

<strong>
EXPECTED FILES</strong>

<ul>

<li><code>ringkasan.txt</code></li>

<li><code>struktur.xyz</code></li>

<li><code>dftb.inp</code></li>

</ul>

</div>


<details>

<summary>
<strong>
Apa yang perlu diperiksa?
</strong>
</summary>

<p>
Baris pertama file XYZ menyatakan jumlah atom. Baris berikutnya
merupakan judul. Pada input DCDFTBMD, periksa blok keyword,
parameter, dan geometri.
</p>

</details>


<hr>


<h2 id="md-input" class="mahameru-section-title">
05 · Read the MD Input
</h2>

<p>
Input MD untuk latihan ini menggunakan SCC, sistem utuh tanpa
dekomposisi, periodisitas, dan pengaturan NVT.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
SCC
</span>

<strong>
Charge consistency</strong>

<p>
Iterasi muatan digunakan dalam perhitungan SCC-DFTB.
</p>

</div>


<div class="workflow-card">

<span>
PBC
</span>

<strong>
Periodic system</strong>

<p>
Sistem elektrolit menggunakan kondisi batas periodik.
</p>

</div>


<div class="workflow-card">

<span>
NVT
</span>

<strong>
MD ensemble</strong>

<p>
Temperatur dijaga pada kondisi yang ditentukan untuk latihan.
</p>

</div>

</div>


Input utama yang digunakan modul:

```
SCC=TRUE
DC=FALSE
PBC=TRUE
MD=(NSTEP=1000 DELTAT=5.0e-16 PRINT=10 NVT=TRUE BATHTEMP=350.0 INITTEMP=350.0)
```


<h3>
Parameter penting
</h3>


<div class="analysis-grid">

<div class="analysis-card">

<strong>
NSTEP</strong>

<span>
1000 steps
</span>

<p>
Jumlah langkah MD pada latihan awal.
</p>

</div>


<div class="analysis-card">

<strong>
DELTAT</strong>

<span>
5.0e-16 s
</span>

<p>
Setara dengan 0,5 fs per langkah.
</p>

</div>


<div class="analysis-card">

<strong>
PRINT</strong>

<span>
10 steps
</span>

<p>
Output trajectory dicetak setiap 10 langkah.
</p>

</div>


<div class="analysis-card">

<strong>
NVT</strong>

<span>
350 K
</span>

<p>
MD dijalankan dengan kondisi NVT pada temperatur 350 K.
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Simulation time
</strong>

<p>
Dengan 1000 langkah dan timestep 0,5 fs, waktu simulasi nominal
adalah 500 fs atau 0,5 ps.
</p>

</div>


<details>

<summary>
<strong>
Output interval
</strong>
</summary>

<p>
Dengan <code>PRINT=10</code>, satu frame tersimpan setiap 10 langkah.
Jarak waktu nominal antar-frame adalah:
</p>

```
10 × 0,5 fs = 5 fs
```

<p>
Jumlah frame aktual tetap perlu diperiksa dari file output.
</p>

</details>


<div class="workflow-warning">

<strong>
Important limitation</strong>

<p>
Lintasan 0,5 ps pada latihan ini digunakan untuk memeriksa prosedur
dan tren awal. Lintasan tersebut belum cukup untuk mengambil sifat
transport seperti koefisien difusi atau konduktivitas yang telah
konvergen.
</p>

</div>


<hr>


<h2 id="parameter-check" class="mahameru-section-title">
06 · Check the Parameters
</h2>

<p>
Sebelum menghitung, pastikan seluruh pasangan unsur yang diperlukan
memiliki berkas Slater–Koster yang konsisten.
</p>


<p>
Jalankan pemeriksa:
</p>


```
python skrip/periksa_dcdftbmd.py proyek_pribadi/lipf6_ec
```


<div class="workflow-check">

<strong>
PARAMETER CHECK</strong>

<ul>

<li>C</li>

<li>H</li>

<li>O</li>

<li>Li</li>

<li>P</li>

<li>F</li>

</ul>

<p>
Semua pasangan unsur yang diperlukan harus memiliki parameter
Slater–Koster yang sesuai.
</p>

</div>


<details>

<summary>
<strong>
Jika pemeriksa menampilkan berkas .spl yang belum tersedia
</strong>
</summary>

<p>
Artinya format input telah terbaca, tetapi parameter yang diperlukan
belum ditempatkan pada lokasi yang sesuai. Jangan menjalankan
simulasi sebelum parameter tersedia.
</p>

</details>


<div class="workflow-warning">

<strong>
Do not mix parameter sets</strong>

<p>
Gunakan parameter Slater–Koster yang kompatibel. Jangan menggabungkan
berkas dari parameterisasi berbeda hanya berdasarkan nama unsur.
</p>

</div>


<hr>


<h2 id="submit" class="mahameru-section-title">
07 · Submit the MD Job
</h2>

<p>
Setelah struktur, input, dan parameter diperiksa, pekerjaan dapat
dijalankan pada environment HPC melalui SLURM.
</p>


<div class="workflow-flow">

<div>

<strong>
Input ready
</strong>

<small>
dftb.inp + structure
</small>

</div>


<span>
→
</span>


<div>

<strong>
SLURM script
</strong>

<small>
Resource request
</small>

</div>


<span>
→
</span>


<div>

<strong>
Submit</strong>

<small>
sbatch
</small>

</div>


<span>
→
</span>


<div>

<strong>
Monitor</strong>

<small>
Job status
</small>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Before submission</strong>

<p>
Pastikan working directory, input, parameter, dan script submission
sudah benar. Jangan menggunakan compute resource sebelum input
berhasil melewati pemeriksaan dasar.
</p>

</div>


<p>
Untuk detail mengenai script SLURM, partition, resource, submission,
dan monitoring job, lanjutkan ke:
</p>


<a href="../../../environment/mahameru-hpc-brin/slurm-computing.md">
<strong>
→ Mahameru HPC BRIN · SLURM & Computing
</strong>
</a>


<hr>


<h2 id="output" class="mahameru-section-title">
08 · Check the Output
</h2>

<p>
Setelah job selesai, jangan langsung masuk ke analisis. Pastikan
output utama tersedia dan perhitungan berakhir secara normal.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Trajectory</strong>

<p>
Periksa apakah trajectory berhasil dibuat.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Mulliken</strong>

<p>
Periksa keluaran muatan yang diperlukan untuk analisis.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Status</strong>

<p>
Periksa apakah simulasi berakhir secara normal dan tidak berhenti
karena error.
</p>

</div>

</div>


Setelah pekerjaan selesai, periksa direktori output sesuai struktur
kasus yang digunakan.


```
ls proyek_pribadi/lipf6_ec
```


<p>
Untuk pemeriksaan lebih lanjut, gunakan file output yang dihasilkan
oleh DCDFTBMD. Jangan menjalankan parser analisis sebelum memastikan
perhitungan selesai.
</p>


<div class="workflow-warning">

<strong>
A completed job is not automatically a valid result</strong>

<p>
Job yang selesai hanya menunjukkan bahwa proses komputasi berakhir.
Tetap periksa trajectory, energi, muatan, status SCC, dan parameter
simulasi sebelum menafsirkan hasil.
</p>

</div>


<hr>


<h2 id="record" class="mahameru-section-title">
09 · Record the Simulation
</h2>

<p>
Sebelum masuk ke analisis, isi empat catatan utama untuk kasus ini.
</p>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
Structure</h3>

<p>
12 EC + 2 LiPF6, 136 atom, sel kubik 12,3 Å, sistem periodik.
</p>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
Method</h3>

<p>
SCC-DFTB dengan parameter Slater–Koster untuk unsur yang digunakan.
</p>

</div>


<div class="validation-card">

<strong>
03
</strong>

<h3>
Procedure</h3>

<p>
MD NVT, 350 K, 1000 langkah, timestep 0,5 fs.
</p>

</div>


<div class="validation-card">

<strong>
04
</strong>

<h3>
Results</h3>

<p>
Trajectory, energi, muatan, dan status SCC.
</p>

</div>

</div>


<div class="workflow-check">

<strong>
CASE 1 CHECKPOINT</strong>

<ul>

<li>Struktur LiPF6/EC sudah tersedia.</li>

<li><code>dftb.inp</code> sudah diperiksa.</li>

<li>Parameter Slater–Koster tersedia dan konsisten.</li>

<li>MD menggunakan NVT pada 350 K.</li>

<li>Trajectory dan output muatan tersedia.</li>

<li>Status pekerjaan sudah diperiksa.</li>

<li>Durasi 0,5 ps dipahami sebagai latihan awal.</li>

</ul>

</div>


<hr>


<h2 id="next" class="mahameru-section-title">
Next · MD Analysis
</h2>

<p>
Trajectory yang sudah diperiksa menjadi input untuk tahap berikutnya.
Kita akan menggunakan hasil tersebut untuk menjawab pertanyaan tentang
struktur lokal dan dinamika Li⁺.
</p>


<div class="workflow-next">

<div>

<span>
PREVIOUS
</span>

<strong>
Foundations
</strong>

</div>


<div>

<span>
NEXT
</span>

<strong>
MD Analysis</strong>

</div>

</div>

</div>
