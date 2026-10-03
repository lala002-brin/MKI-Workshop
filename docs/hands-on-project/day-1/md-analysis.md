<div class="mahameru-page">

<div class="mahameru-tabs">

<a class="mahameru-tab" href="./index.md">
Day 1
</a>

<a class="mahameru-tab" href="./foundations.md">
Foundations
</a>

<a class="mahameru-tab" href="./lipf6-ec.md">
LiPF6 / EC
</a>

<a class="mahameru-tab active" href="./md-analysis.md">
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
Bagian ini menganalisis trajectory dari simulasi LiPF6/EC.
Kita mulai dari pemeriksaan output, kemudian menghitung RDF,
bilangan koordinasi, MSD, estimasi transport, dan muatan Mulliken.
</p>


<div class="mahameru-workflow-intro">

<div>

<strong>
MD Analysis · From Trajectory to Physical Quantities
</strong>

<p>
Jangan langsung membaca angka sebagai hasil akhir. Periksa terlebih
dahulu trajectory, jumlah frame, kondisi periodik, cutoff, jendela
fit, dan file muatan. Setelah itu baru interpretasikan besaran yang
dihasilkan.
</p>

</div>

</div>


<div class="workflow-roadmap">

<div class="workflow-step">

<span>
01
</span>

<strong>
Output
</strong>

<small>
Trajectory
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
RDF</strong>

<small>
Li–O / Li–F
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
Coordination
</strong>

<small>
Neighbors
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
MSD</strong>

<small>
Dynamics
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
Charge
</strong>

<small>
Mulliken
</small>

</div>

</div>


<hr>


<h2 id="analysis-question" class="mahameru-section-title">
01 · Analysis Question
</h2>

<p>
Kasus LiPF6/EC memiliki beberapa besaran yang dapat diperiksa dari
trajectory. Pertanyaan analisis harus tetap mengikuti pertanyaan
ilmiah yang telah ditentukan pada awal latihan.
</p>


<div class="analysis-grid">

<div class="analysis-card">

<strong>
Li–O RDF
</strong>

<span>
Solvation
</span>

<p>
Di mana distribusi jarak Li⁺ terhadap O dari ethylene carbonate
memiliki puncak pertama?
</p>

</div>


<div class="analysis-card">

<strong>
Li–F RDF
</strong>

<span>
Ion pairing
</span>

<p>
Apakah terdapat distribusi kontak Li–F yang menunjukkan kedekatan
kation dan anion?
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
Berapa jumlah tetangga O atau F di sekitar setiap Li pada cutoff
yang dipilih?
</p>

</div>


<div class="analysis-card">

<strong>
MSD</strong>

<span>
Dynamics
</span>

<p>
Bagaimana perpindahan Li dan P berubah terhadap waktu?
</p>

</div>


<div class="analysis-card">

<strong>
Mulliken</strong>

<span>
Charge
</span>

<p>
Apakah muatan atom menunjukkan tren perubahan selama MD?
</p>

</div>

</div>


<hr>


<h2 id="output-check" class="mahameru-section-title">
02 · Check the Output
</h2>

<p>
Pastikan simulasi telah selesai dan keluaran utama tersedia sebelum
melakukan analisis.
</p>


Jalankan:

```
cd ~/latihan_simulasi/workshop_material

ls -lh proyek_pribadi/lipf6_ec/traject

ls -lh proyek_pribadi/lipf6_ec/mulliken

tail -n 12 proyek_pribadi/lipf6_ec/hasil.log
```


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
traject</strong>

<p>
Deret frame koordinat XYZ yang dihasilkan selama MD.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
mulliken</strong>

<p>
Muatan bersih tiap atom pada frame yang sama.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
hasil.log</strong>

<p>
Log Terminal yang membantu memeriksa jalannya perhitungan.
</p>

</div>

</div>


<details>

<summary>
<strong>
Check the first trajectory frame
</strong>
</summary>

<p>
Periksa beberapa baris pertama trajectory:
</p>

```
head -n 5 proyek_pribadi/lipf6_ec/traject
```

<p>
Trajectory merupakan deret frame koordinat XYZ. Jangan menganggap
satu frame sebagai representasi seluruh dinamika.
</p>

</details>


<div class="workflow-warning">

<strong>
If the files are missing</strong>

<p>
Jangan langsung menjalankan ulang simulasi. Periksa
<code>hasil.log</code> dan <code>dftb.out</code> terlebih dahulu.
Pastikan MD aktif dan pekerjaan berakhir secara normal.
</p>

</div>


<hr>


<h2 id="rdf" class="mahameru-section-title">
03 · RDF
</h2>

<p>
Radial Distribution Function atau RDF, <code>g(r)</code>, digunakan
untuk melihat distribusi pasangan atom terhadap jarak.
Pada kasus ini kita memeriksa Li–O dan Li–F.
</p>


<div class="workflow-flow">

<div>

<strong>
Trajectory
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
Pair distance
</strong>

<small>
Li–O / Li–F
</small>

</div>


<span>
→
</span>


<div>

<strong>
g(r)
</strong>

<small>
Distance distribution
</small>

</div>


<span>
→
</span>


<div>

<strong>
Peak / minimum
</strong>

<small>
Local structure
</small>

</div>

</div>


<h3>
03.1 · RDF Li–O
</h3>

<p>
Untuk sel kubik 12,3 Å, gunakan radius RDF yang tidak melebihi
setengah panjang sel. Modul menggunakan <code>rmax=6.0 Å</code>
sebagai nilai latihan.
</p>


Jalankan:

```
python skrip/analisis_elektron_lintasan.py \
proyek_pribadi/lipf6_ec \
--pusat Li \
--tetangga O \
--sel 12.3 \
--selang 5.0 \
--cutoff 3.2 \
--rmax 6.0
```


<h3>
03.2 · RDF Li–F
</h3>

<p>
Untuk pasangan Li–F, modul menggunakan cutoff awal 3,0 Å.
</p>


Jalankan:

```
python skrip/analisis_elektron_lintasan.py \
proyek_pribadi/lipf6_ec \
--pusat Li \
--tetangga F \
--sel 12.3 \
--selang 5.0 \
--cutoff 3.0 \
--rmax 6.0
```


<div class="workflow-check">

<strong>
RDF CHECK</strong>

<ul>

<li>Catat posisi puncak pertama Li–O.</li>

<li>Catat minimum pertama setelah puncak Li–O.</li>

<li>Catat posisi puncak pertama Li–F.</li>

<li>Catat cutoff yang digunakan.</li>

<li>Pastikan <code>rmax</code> sesuai dengan ukuran sel.</li>

</ul>

</div>


<div class="workflow-warning">

<strong>
Why rmax matters</strong>

<p>
Untuk sel kubik 12,3 Å, setengah panjang sel adalah 6,15 Å.
Jangan memilih radius RDF yang melampaui batas ini tanpa perlakuan
periodik yang sesuai.
</p>

</div>


<hr>


<h2 id="coordination" class="mahameru-section-title">
04 · Coordination Number
</h2>

<p>
Bilangan koordinasi menunjukkan jumlah tetangga yang berada dalam
radius cutoff tertentu. Dalam latihan ini, kita menghitung
koordinasi Li–O dan Li–F pada setiap frame.
</p>


Jalankan analisis Li–O:

```
python skrip/analisis_elektron_lintasan.py \
proyek_pribadi/lipf6_ec \
--pusat Li \
--tetangga O \
--sel 12.3 \
--selang 5.0 \
--cutoff 3.2 \
--rmax 6.0
```


Jalankan analisis Li–F:

```
python skrip/analisis_elektron_lintasan.py \
proyek_pribadi/lipf6_ec \
--pusat Li \
--tetangga F \
--sel 12.3 \
--selang 5.0 \
--cutoff 3.0 \
--rmax 6.0
```


<p>
Keluaran utama:
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
koordinasi_li_o.csv</strong>

<p>
Jumlah tetangga O per Li pada setiap frame.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
koordinasi_li_f.csv</strong>

<p>
Jumlah tetangga F per Li pada setiap frame.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
RDF</strong>

<p>
Distribusi pasangan Li–O dan Li–F terhadap jarak.
</p>

</div>

</div>


<details>

<summary>
<strong>
Simple example
</strong>
</summary>

<p>
Misalnya satu Li memiliki jarak terhadap empat O:
</p>

```text
1.9 Å
2.1 Å
2.4 Å
3.8 Å
```

<p>
Jika cutoff yang digunakan adalah 3,2 Å, tiga O pertama masuk ke
dalam cutoff. Bilangan koordinasi pada contoh tersebut adalah 3.
</p>

<p>
Gunakan jarak dan cutoff dari hasil simulasi Anda sendiri untuk
mengisi lembar kerja.
</p>

</details>


<div class="workflow-check">

<strong>
COORDINATION CHECK</strong>

<ul>

<li>CN Li–O rata-rata ± simpangan.</li>

<li>CN Li–O yang paling sering muncul.</li>

<li>CN Li–F rata-rata atau fraksi frame dengan CN Li–F &gt; 0.</li>

<li>Cutoff yang digunakan.</li>

<li>Perubahan CN antarframe.</li>

</ul>

</div>


<hr>


<h2 id="graph" class="mahameru-section-title">
05 · Create the Analysis Graph
</h2>

<p>
Setelah RDF dan koordinasi dihitung, buat grafik hasil.
</p>


Jalankan:

```
python skrip/grafik_hasil.py elektrolit proyek_pribadi/lipf6_ec
```


Kemudian periksa:

```
ls -lh proyek_pribadi/lipf6_ec/analisis_elektron.png
```


<div class="mahameru-info-card">

<strong>
What to inspect</strong>

<p>
Pada grafik RDF, cari posisi puncak Li–O pertama dan minimum setelahnya.
Pada histogram koordinasi, bandingkan nilai yang paling sering muncul
dengan nilai rata-rata yang dicetak oleh script.
</p>

</div>


<details>

<summary>
<strong>
Mulliken trend
</strong>
</summary>

<p>
Periksa apakah muatan rata-rata mendatar atau masih berubah secara
sistematis sepanjang trajectory.
</p>

<p>
Jangan langsung menghubungkan perubahan muatan dengan satu mekanisme
tanpa memeriksa struktur dan kondisi simulasi.
</p>

</details>


<hr>


<h2 id="msd" class="mahameru-section-title">
06 · Mean Squared Displacement
</h2>

<p>
Mean Squared Displacement atau MSD digunakan untuk mempelajari
perpindahan partikel terhadap waktu.
</p>


<div class="workflow-flow">

<div>

<strong>
Trajectory</strong>

<small>
Position
</small>

</div>


<span>
→
</span>


<div>

<strong>
Unwrap PBC</strong>

<small>
Continuous motion
</small>

</div>


<span>
→
</span>


<div>

<strong>
MSD</strong>

<small>
Distance² vs time
</small>

</div>


<span>
→
</span>


<div>

<strong>
Fit</strong>

<small>
Transport estimate
</small>

</div>

</div>


<p>
Untuk transport, trajectory perlu dibuka kembali melewati batas sel
periodik atau menggunakan <em>unwrapped trajectory</em>. Skrip
menggunakan banyak waktu awal untuk menghitung MSD Li dan P sebagai
penanda gerak anion PF<sub>6</sub><sup>−</sup>.
</p>


Jalankan:

```
python skrip/analisis_transport.py \
proyek_pribadi/lipf6_ec \
--sel 12.3 \
--selang 5.0 \
--suhu 350 \
--fit-mulai 50 \
--fit-akhir 200
```


Kemudian buat grafik:

```
python skrip/grafik_hasil.py transport proyek_pribadi/lipf6_ec
```


Periksa hasil:

```
head -n 6 proyek_pribadi/lipf6_ec/msd_li_p.csv

cat proyek_pribadi/lipf6_ec/ringkasan_transport.txt
```


<div class="workflow-check">

<strong>
MSD CHECK</strong>

<ul>

<li>Periksa bentuk kurva MSD.</li>

<li>Tentukan bagian yang tampak mendekati linear.</li>

<li>Catat jendela fit.</li>

<li>Catat jumlah titik yang digunakan.</li>

<li>Periksa apakah hasil berubah ketika jendela fit diubah.</li>

</ul>

</div>


<hr>


<h2 id="diffusion" class="mahameru-section-title">
07 · Diffusion Estimate
</h2>

<p>
Untuk gerak difusif tiga dimensi, koefisien difusi diperoleh dari
kemiringan MSD terhadap waktu:
</p>


<div class="mahameru-info-card">

<strong>
Einstein relation</strong>

<p>
Untuk tiga dimensi:
</p>

<p>
<strong>
D = 1/6 · dMSD/dt
</strong>
</p>

</div>


<p>
Skrip juga menghasilkan estimasi transport untuk Li dan P.
Catat hasil dalam satuan yang diberikan oleh output.
</p>


<div class="analysis-grid">

<div class="analysis-card">

<strong>
D<sub>Li</sub>
</strong>

<span>
cm²/s
</span>

<p>
Koefisien difusi Li berdasarkan jendela fit yang dipilih.
</p>

</div>


<div class="analysis-card">

<strong>
D<sub>P</sub>
</strong>

<span>
cm²/s
</span>

<p>
P digunakan sebagai penanda gerak anion PF6⁻.
</p>

</div>


<div class="analysis-card">

<strong>
σ<sub>NE</sub>
</strong>

<span>
S/cm
</span>

<p>
Perkiraan konduktivitas ion ideal menurut Nernst–Einstein.
</p>

</div>

</div>


<div class="workflow-warning">

<strong>
Important limitation</strong>

<p>
Nilai difusi dan konduktivitas dari lintasan pendek ini merupakan
estimasi latihan. Modul secara eksplisit menggunakan lintasan pendek
untuk memeriksa prosedur dan tren, bukan untuk mengklaim koefisien
difusi atau konduktivitas yang telah konvergen.
</p>

</div>


<hr>


<h2 id="nernst-einstein" class="mahameru-section-title">
08 · Ideal Ionic Conductivity
</h2>

<p>
Untuk ion monovalen, skrip menggunakan bentuk konduktivitas ion ideal
menurut Nernst–Einstein:
</p>


<div class="mahameru-info-card">

<strong>
Nernst–Einstein</strong>

<p>
<strong>
σ<sub>NE</sub> =
e² (N<sub>Li</sub>D<sub>Li</sub> + N<sub>P</sub>D<sub>P</sub>)
/
(k<sub>B</sub>T V)
</strong>
</p>

</div>


<p>
Nilai tersebut merupakan konduktivitas ideal. Model tersebut tidak
secara otomatis memasukkan korelasi gerak ion yang dapat membuat
konduktivitas aktual berbeda.
</p>


<details>

<summary>
<strong>
Why P is used?
</strong>
</summary>

<p>
Pada latihan ini P digunakan sebagai penanda gerak anion
PF6<sup>−</sup>. P bukan pusat massa anion secara keseluruhan.
</p>

</details>


<hr>


<h2 id="mulliken" class="mahameru-section-title">
09 · Mulliken Charge
</h2>

<p>
Keluaran Mulliken memberikan muatan bersih tiap atom pada frame yang
sama dengan trajectory. Analisis muatan membantu melihat perubahan
distribusi muatan selama simulasi.
</p>


Periksa hasil yang dihasilkan oleh analisis:

```
head -n 6 proyek_pribadi/lipf6_ec/muatan_li_o.csv
```


<div class="analysis-grid">

<div class="analysis-card">

<strong>
Li charge</strong>

<span>
Average
</span>

<p>
Catat muatan Mulliken Li rata-rata.
</p>

</div>


<div class="analysis-card">

<strong>
O charge</strong>

<span>
Trend
</span>

<p>
Periksa apakah muatan O mendatar atau berubah sistematis.
</p>

</div>


<div class="analysis-card">

<strong>
Total charge</strong>

<span>
Consistency
</span>

<p>
Jumlah muatan sistem harus tetap konsisten dengan muatan total model.
</p>

</div>

</div>


<div class="workflow-warning">

<strong>
Charge consistency</strong>

<p>
Penyimpangan besar pada jumlah muatan total dapat menunjukkan masalah
dalam pembacaan output atau proses analisis. Periksa file sumber
sebelum menarik kesimpulan.
</p>

</div>


<hr>


<h2 id="sensitivity" class="mahameru-section-title">
10 · Sampling and Sensitivity
</h2>

<p>
Satu hasil analisis tidak cukup untuk menilai ketidakpastian sampling.
Gunakan perubahan pada pilihan analisis sebagai pemeriksaan awal.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Discard initial frames</strong>

<p>
Periksa apakah RDF berubah ketika sebagian frame awal dibuang.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Change fit window</strong>

<p>
Bandingkan hasil MSD ketika jendela fit diganti.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Repeat trajectory</strong>

<p>
Gunakan seed atau durasi berbeda untuk menilai sensitivitas hasil.
</p>

</div>

</div>


<div class="workflow-check">

<strong>
QUESTIONS TO ANSWER</strong>

<ul>

<li>Apakah koordinasi Li berubah antarframe?</li>

<li>Apakah RDF tetap serupa setelah 20% frame awal dibuang?</li>

<li>Apakah MSD memiliki bagian yang cukup linear?</li>

<li>Apakah D berubah ketika jendela fit diganti?</li>

<li>Apakah lintasan perlu diperpanjang?</li>

<li>Apakah seed baru diperlukan?</li>

</ul>

</div>


<hr>

<h2 id="worksheet" class="mahameru-section-title">
11 · Analysis Worksheet
</h2>

<p class="worksheet-intro">
Isi worksheet menggunakan hasil simulasi Anda sendiri. Data dapat
disimpan sementara di browser, diunduh sebagai file, atau dikirim
ke Google Drive Admin.
</p>


<div class="worksheet-toolbar">

<button
class="worksheet-btn primary"
onclick="saveMDWorksheet()">
💾 Save
</button>

<button
class="worksheet-btn"
onclick="downloadMDWorksheet()">
⬇ Download
</button>

<button
class="worksheet-btn"
onclick="document.getElementById('worksheet-file').click()">
📂 Load
</button>

<button
class="worksheet-btn"
onclick="clearMDWorksheet()">
↻ Reset
</button>

<button
class="worksheet-btn drive"
onclick="uploadMDWorksheet()">
☁ Save to Google Drive
</button>

<input
type="file"
id="worksheet-file"
accept=".json"
style="display:none"
onchange="loadMDWorksheet(event)"
>

</div>


<div
id="worksheet-status"
class="worksheet-status">
Ready
</div>


<div class="worksheet-card">


<div class="worksheet-header">

<div>
<span class="worksheet-label">
MD ANALYSIS
</span>

<h3>
LiPF6 / EC
</h3>

<p>
Record the numerical results from your own calculation.
</p>
</div>

<div class="worksheet-meta">

<label>
Participant
<input
type="text"
id="participant"
placeholder="Nama peserta">
</label>

<label>
Date
<input
type="date"
id="analysis-date">
</label>

</div>

</div>


<div class="worksheet-section">

<div class="worksheet-section-title">

<span>
01
</span>

<div>
<strong>
RDF & Coordination
</strong>

<small>
Local structure
</small>
</div>

</div>


<div class="worksheet-grid">


<label class="worksheet-field">

<span>
First RDF peak · Li–O
</span>

<div class="input-unit">

<input
type="text"
id="rdf-li-o-peak"
placeholder="contoh: 2.1">

<em>
Å
</em>

</div>

</label>


<label class="worksheet-field">

<span>
First RDF minimum · Li–O
</span>

<div class="input-unit">

<input
type="text"
id="rdf-li-o-min"
placeholder="contoh: 3.2">

<em>
Å
</em>

</div>

</label>


<label class="worksheet-field">

<span>
Average CN · Li–O
</span>

<div class="input-unit">

<input
type="text"
id="cn-li-o"
placeholder="contoh: 4.2">

<em>
CN
</em>

</div>

</label>


<label class="worksheet-field">

<span>
Most frequent CN · Li–O
</span>

<div class="input-unit">

<input
type="text"
id="cn-li-o-mode"
placeholder="contoh: 4">

<em>
CN
</em>

</div>

</label>


<label class="worksheet-field">

<span>
First RDF peak · Li–F
</span>

<div class="input-unit">

<input
type="text"
id="rdf-li-f-peak"
placeholder="contoh: 3.0">

<em>
Å
</em>

</div>

</label>


<label class="worksheet-field">

<span>
Frames with CN Li–F &gt; 0
</span>

<div class="input-unit">

<input
type="text"
id="cn-li-f-positive"
placeholder="contoh: 18">

<em>
%
</em>

</div>

</label>

</div>

</div>


<div class="worksheet-section">

<div class="worksheet-section-title">

<span>
02
</span>

<div>
<strong>
Charge Analysis
</strong>

<small>
Mulliken population
</small>
</div>

</div>


<div class="worksheet-grid">


<label class="worksheet-field">

<span>
Average Mulliken charge · Li
</span>

<input
type="text"
id="charge-li"
placeholder="Masukkan hasil">

</label>


<label class="worksheet-field">

<span>
Average Mulliken charge · O
</span>

<input
type="text"
id="charge-o"
placeholder="Masukkan hasil">

</label>


<label class="worksheet-field full">

<span>
Charge trend during MD
</span>

<select id="charge-trend">

<option value="">
Pilih hasil pengamatan
</option>

<option>
Relatively stable
</option>

<option>
Gradually increasing
</option>

<option>
Gradually decreasing
</option>

<option>
Strong fluctuation
</option>

</select>

</label>


</div>

</div>


<div class="worksheet-section">

<div class="worksheet-section-title">

<span>
03
</span>

<div>
<strong>
MSD & Transport
</strong>

<small>
Ion dynamics
</small>
</div>

</div>


<div class="worksheet-grid">


<label class="worksheet-field">

<span>
MSD Li · 100 fs
</span>

<div class="input-unit">

<input
type="text"
id="msd-li-100"
placeholder="Masukkan hasil">

<em>
Å²
</em>

</div>

</label>


<label class="worksheet-field">

<span>
MSD Li · 200 fs
</span>

<div class="input-unit">

<input
type="text"
id="msd-li-200"
placeholder="Masukkan hasil">

<em>
Å²
</em>

</div>

</label>


<label class="worksheet-field">

<span>
Fit start
</span>

<div class="input-unit">

<input
type="text"
id="fit-start"
placeholder="50">

<em>
fs
</em>

</div>

</label>


<label class="worksheet-field">

<span>
Fit end
</span>

<div class="input-unit">

<input
type="text"
id="fit-end"
placeholder="200">

<em>
fs
</em>

</div>

</label>


<label class="worksheet-field">

<span>
Number of fit points
</span>

<input
type="text"
id="fit-points"
placeholder="Masukkan hasil">

</label>


<label class="worksheet-field">

<span>
D<sub>Li</sub>
</span>

<div class="input-unit">

<input
type="text"
id="d-li"
placeholder="Masukkan hasil">

<em>
cm²/s
</em>

</div>

</label>


<label class="worksheet-field">

<span>
D<sub>P</sub>
</span>

<div class="input-unit">

<input
type="text"
id="d-p"
placeholder="Masukkan hasil">

<em>
cm²/s
</em>

</div>

</label>


<label class="worksheet-field">

<span>
σ<sub>NE</sub>
</span>

<div class="input-unit">

<input
type="text"
id="sigma-ne"
placeholder="Masukkan hasil">

<em>
S/cm
</em>

</div>

</label>

</div>

</div>


<div class="worksheet-section">

<div class="worksheet-section-title">

<span>
04
</span>

<div>
<strong>
Sensitivity Check
</strong>

<small>
Sampling and fitting
</small>
</div>

</div>


<div class="worksheet-grid">


<label class="worksheet-field full">

<span>
What changed after removing the initial 20% frames?
</span>

<textarea
id="sensitivity-rdf"
rows="3"
placeholder="Tuliskan pengamatan Anda..."></textarea>

</label>


<label class="worksheet-field full">

<span>
What changed when the MSD fit window was modified?
</span>

<textarea
id="sensitivity-msd"
rows="3"
placeholder="Tuliskan pengamatan Anda..."></textarea>

</label>


<label class="worksheet-field full">

<span>
Is a longer trajectory needed?
</span>

<select id="longer-trajectory">

<option value="">
Pilih
</option>

<option>
Yes
</option>

<option>
No
</option>

<option>
Cannot determine yet
</option>

</select>

</label>

</div>

</div>


<div class="worksheet-section">

<div class="worksheet-section-title">

<span>
05
</span>

<div>
<strong>
Interpretation
</strong>

<small>
Write the scientific conclusion
</small>
</div>

</div>


<label class="worksheet-field full">

<span>
Your conclusion
</span>

<textarea
id="conclusion"
rows="7"
placeholder="Tuliskan kesimpulan berdasarkan RDF, koordinasi, MSD, transport, dan muatan Mulliken. Batasi kesimpulan pada model dan trajectory yang dianalisis."></textarea>

</label>


</div>


<div class="worksheet-footer">

<div>

<strong>
Worksheet status
</strong>

<span id="worksheet-completion">
0 / 20 fields
</span>

</div>

<div>

<span>
Last saved:
</span>

<strong id="last-saved">
Not saved
</strong>

</div>

</div>

</div>


<div class="worksheet-note">

<strong>
Important
</strong>

<p>
Hasil worksheet harus berasal dari komputer Anda sendiri.
Lintasan pendek digunakan untuk latihan prosedur dan pembacaan tren.
Jangan menyatakan nilai difusi atau konduktivitas sebagai hasil yang
sudah konvergen hanya berdasarkan lintasan pendek.
</p>

</div>

<hr>


<h2 id="interpretation" class="mahameru-section-title">
12 · Interpretation
</h2>

<p>
Gunakan hasil analisis untuk menjawab pertanyaan awal. Kesimpulan
harus tetap terbatas pada model, trajectory, dan prosedur yang
digunakan.
</p>


<div class="workflow-check">

<strong>
WRITE YOUR CONCLUSION</strong>

<ul>

<li>
Jelaskan posisi puncak pertama RDF Li–O.
</li>

<li>
Jelaskan bilangan koordinasi Li–O yang paling sering muncul.
</li>

<li>
Jelaskan apakah terdapat kontak Li–F dalam trajectory.
</li>

<li>
Jelaskan apakah koordinasi berubah selama MD.
</li>

<li>
Jelaskan bentuk MSD dan jendela fit yang digunakan.
</li>

<li>
Jelaskan estimasi D<sub>Li</sub> dan D<sub>P</sub> dengan menyebut
jendela fit.
</li>

<li>
Jelaskan σ<sub>NE</sub> sebagai estimasi konduktivitas ion ideal.
</li>

<li>
Sebutkan keterbatasan sampling dari lintasan 0,5 ps.
</li>

</ul>

</div>


<div class="mahameru-info-card">

<strong>
Example of a useful conclusion</strong>

<p>
Tuliskan kesimpulan dalam bentuk hubungan antara data dan pertanyaan.
Hindari hanya menulis “hasil sesuai teori” atau “simulasi berhasil”.
Sebutkan besaran, kondisi analisis, dan batas interpretasinya.
</p>

</div>


<hr>


<h2 id="download" class="mahameru-section-title">
13 · Save the Results
</h2>

<p>
Setelah analisis selesai, simpan hasil utama sebelum keluar dari
environment HPC.
</p>


Periksa:

```
cd ~/latihan_simulasi/workshop_material

ls -lh proyek_pribadi/lipf6_ec/*.csv

ls -lh proyek_pribadi/lipf6_ec/*.png

ls -lh proyek_pribadi/lipf6_ec/hasil.log
```


<div class="workflow-grid">

<div class="workflow-card">

<span>
CSV
</span>

<strong>
Numerical results</strong>

<p>
RDF, koordinasi, MSD, transport, dan data muatan.
</p>

</div>


<div class="workflow-card">

<span>
PNG
</span>

<strong>
Analysis graphs</strong>

<p>
Grafik hasil yang digunakan untuk membaca tren.
</p>

</div>


<div class="workflow-card">

<span>
LOG
</span>

<strong>
Reproducibility</strong>

<p>
Log membantu melacak proses komputasi dan pemeriksaan hasil.
</p>

</div>

</div>


<div class="workflow-check">

<strong>
SAVE THESE FILES</strong>

<ul>

<li><code>dftb.inp</code></li>

<li><code>hasil.log</code></li>

<li>CSV hasil analisis</li>

<li>PNG hasil analisis</li>

<li><code>traject</code> jika diperlukan</li>

<li><code>mulliken</code> jika diperlukan</li>

</ul>

</div>


<hr>


<div class="workflow-next">

<div>

<span>
PREVIOUS
</span>

<strong>
LiPF6 / EC</strong>

</div>


<div>

<span>
NEXT
</span>

<strong>
LiF / EC Interface</strong>

</div>

</div>

</div>
