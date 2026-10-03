<div class="mahameru-page">

<div class="mahameru-tabs">

<a class="mahameru-tab" href="../getting-started.md">
Getting Started
</a>

<a class="mahameru-tab" href="./working-on-mahameru.md">
Working on Mahameru
</a>

<a class="mahameru-tab" href="./slurm-computing.md">
SLURM & Computing
</a>

<a class="mahameru-tab active" href="./workshop-workflow.md">
Workshop Workflow
</a>

</div>


<p class="mahameru-intro">
Halaman ini menghubungkan materi simulasi dengan lingkungan komputasi
Mahameru. Ikuti workflow dari pertanyaan ilmiah, persiapan struktur,
input DCDFTBMD, simulasi, analisis, visualisasi, hingga validasi.
</p>


<div class="mahameru-workflow-intro">

<div>

<strong>
From Scientific Question to Analysis
</strong>

<p>
Setiap latihan dimulai dari pertanyaan ilmiah dan berakhir pada
hasil yang dapat diperiksa. Simpan struktur, pengaturan metode,
prosedur, dan hasil agar pekerjaan dapat ditelusuri kembali.
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
Scientific target
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
Structure
</strong>

<small>
Atomic model
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
Input
</strong>

<small>
DCDFTBMD
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
Compute
</strong>

<small>
Mahameru
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
Analyze
</strong>

<small>
Results
</small>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Workshop principle
</strong>

<p>
Jangan menganggap job yang selesai sebagai hasil yang otomatis benar.
Periksa input, status komputasi, output, kualitas sampling, dan
batas model sebelum menarik kesimpulan.
</p>

</div>


<hr>


<h2 id="scientific-question" class="mahameru-section-title">
01 · Start with a Scientific Question
</h2>

<p>
Sebelum memilih program atau menjalankan simulasi, tentukan terlebih
dahulu besaran yang ingin diamati. Modul menggunakan pertanyaan ilmiah
sebagai titik awal untuk menentukan sistem, metode, prosedur, dan analisis.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Li⁺ in EC
</strong>

<p>
Bagaimana Li⁺ tersolvasi dalam ethylene carbonate?
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Li⁺–F contact
</strong>

<p>
Apakah Li⁺ membentuk pasangan dengan anion melalui interaksi Li–F?
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
LiF–EC interface
</strong>

<p>
Bagaimana EC berinteraksi dengan permukaan LiF?
</p>

</div>


<div class="workflow-card">

<span>
04
</span>

<strong>
CO on Pt
</strong>

<p>
Bagaimana CO berpindah pada permukaan Pt melalui lintasan NEB?
</p>

</div>


<div class="workflow-card">

<span>
05
</span>

<strong>
MACE vs DFTB
</strong>

<p>
Apakah MACE mereproduksi respons energi dan tekanan pada LiF?
</p>

</div>


</div>


<div class="workflow-check">

<strong>
WHAT TO RECORD
</strong>

<ul>

<li>Pertanyaan ilmiah</li>

<li>Besaran yang akan diamati</li>

<li>Sistem dan ukuran model</li>

<li>Metode yang digunakan</li>

<li>Prosedur komputasi</li>

</ul>

</div>


<hr>


<h2 id="structure" class="mahameru-section-title">
02 · Prepare the Atomic Structure
</h2>

<p>
Satu konfigurasi atom terdiri dari jenis atom dan posisi kartesius.
Untuk sistem periodik, konfigurasi juga memerlukan informasi sel.
Model antarmuka dapat menggunakan slab dan ruang vakum untuk molekul
atau elektrolit.
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
Tentukan jenis dan jumlah atom dalam sistem.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Coordinates
</strong>

<p>
Periksa posisi atom dan satuan koordinat.
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
Tentukan vektor sel jika sistem menggunakan PBC.
</p>

</div>


</div>


<details>

<summary>
<strong>Case: LiPF6 / EC</strong>
</summary>

<p>
Kasus LiPF6/EC digunakan untuk mempelajari lingkungan elektrolit,
termasuk distribusi Li–O, Li–F, koordinasi, MSD, transport,
dan muatan.
</p>

<p>
Hasil analisis bergantung pada komposisi, ukuran sel, cutoff,
dan waktu sampling.
</p>

</details>


<details>

<summary>
<strong>Case: LiF–EC interface</strong>
</summary>

<p>
Model latihan terdiri dari slab LiF dan satu molekul EC dalam sel
dengan ruang vakum. Model ini merupakan geometri awal untuk mempelajari
interaksi antarmuka.
</p>

<p>
Model satu adsorbat belum merepresentasikan antarmuka elektrokimia
secara penuh.
</p>

</details>


<div class="workflow-warning">

<strong>
Periodic boundary condition</strong>

<p>
Untuk sistem periodik, jarak yang relevan dapat melibatkan citra
terdekat. Skrip sederhana yang menghitung jarak Kartesius langsung
tidak otomatis menerapkan periodic boundary condition.
</p>

</div>


<hr>


<h2 id="dcdftbmd-input" class="mahameru-section-title">
03 · Prepare the DCDFTBMD Input
</h2>

<p>
Setelah struktur siap, siapkan input DCDFTBMD. Modul memperkenalkan
format <code>dftb.inp</code>, parameter Slater–Koster, SCC-DFTB,
dan prosedur MD atau optimasi.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Method</strong>

<p>
Tentukan pendekatan energi dan pengaturan perhitungannya.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Parameters</strong>

<p>
Pastikan parameter Slater–Koster sesuai dengan pasangan unsur.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Geometry</strong>

<p>
Masukkan struktur atom dan informasi sel yang diperlukan.
</p>

</div>


</div>


<details>

<summary>
<strong>Why Slater–Koster files matter</strong>
</summary>

<p>
Berkas Slater–Koster menyimpan informasi interaksi untuk pasangan
unsur yang terurut. Jangan menggabungkan parameterisasi berbeda
hanya karena nama unsurnya sama.
</p>

</details>


<details>

<summary>
<strong>SCC-DFTB check</strong>
</summary>

<p>
SCC menghitung muatan, memperbarui Hamiltonian, kemudian mengulangi
proses sampai kondisi konvergensi tercapai.
</p>

<p>
Jika SCC tidak konvergen, energi dan gaya pada langkah tersebut
tidak boleh langsung digunakan tanpa pemeriksaan.
</p>

</details>


<div class="workflow-check">

<strong>
INPUT CHECK</strong>

<ul>

<li>Jumlah atom sesuai dengan geometri.</li>

<li>Parameter tersedia untuk semua pasangan unsur yang diperlukan.</li>

<li>Path parameter benar.</li>

<li>Pengaturan metode sesuai dengan tujuan latihan.</li>

<li>File input dapat dibaca sebelum menjalankan workflow yang lebih besar.</li>

</ul>

</div>


<hr>


<h2 id="mahameru" class="mahameru-section-title">
04 · Run the Calculation on Mahameru
</h2>

<p>
Setelah input siap, pekerjaan komputasi dapat dijalankan melalui
lingkungan HPC. Pada workflow workshop, Mahameru menyediakan lingkungan
untuk menjalankan pekerjaan melalui SLURM.
</p>


<div class="workflow-flow">

<div>

<strong>
Working Directory
</strong>

<small>
Input + parameters
</small>

</div>


<span>
→
</span>


<div>

<strong>
SLURM Script
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
Submit
</strong>

<small>
sbatch
</small>

</div>


<span>
→
</span>


<div>

<strong>
Monitor
</strong>

<small>
Job status
</small>

</div>

</div>


<div class="mahameru-info-card">

<strong>
HPC reminder
</strong>

<p>
Gunakan login node untuk persiapan dan pengelolaan pekerjaan.
Perhitungan komputasi dijalankan melalui resource yang dialokasikan
oleh scheduler.
</p>

</div>


<p>
Untuk detail mengenai partition, resource, script SLURM, submission,
monitoring, dan interactive job, gunakan halaman:
</p>


<a href="./slurm-computing.md">
<strong>
→ SLURM & Computing
</strong>
</a>


<hr>


<h2 id="md" class="mahameru-section-title">
05 · Molecular Dynamics
</h2>

<p>
Workflow MD digunakan untuk mengikuti perubahan posisi atom terhadap
waktu. DCDFTBMD menyediakan integrator velocity Verlet dan mendukung
NVE serta NVT.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Setup MD
</strong>

<p>
Tentukan timestep, jumlah langkah, temperatur, dan kondisi ensemble.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Run</strong>

<p>
Jalankan pekerjaan melalui workflow HPC yang telah disiapkan.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Trajectory</strong>

<p>
Periksa lintasan dan file output setelah pekerjaan selesai.
</p>

</div>

</div>


<details>

<summary>
<strong>LiPF6 / EC practice</strong>
</summary>

<p>
Modul menggunakan contoh 1000 langkah dengan timestep 0,5 fs,
sehingga total waktu simulasi menjadi 500 fs.
</p>

<p>
Durasi tersebut digunakan untuk latihan analisis awal. Lintasan pendek
tidak cukup untuk mengklaim koefisien difusi atau konduktivitas yang
telah konvergen.
</p>

</details>


<div class="workflow-warning">

<strong>
Sampling matters</strong>

<p>
Untuk analisis transport, pertimbangkan panjang lintasan, jendela
fit, dan pengaruh pembuangan frame awal. Jangan menganggap satu
lintasan pendek sebagai hasil transport yang final.
</p>

</div>


<hr>


<h2 id="analysis" class="mahameru-section-title">
06 · Analyze the Results
</h2>

<p>
Setelah simulasi selesai, gunakan output yang tersedia untuk menjawab
pertanyaan ilmiah yang telah ditentukan pada awal workflow.
</p>


<div class="analysis-grid">

<div class="analysis-card">

<strong>
RDF
</strong>

<span>
Radial Distribution Function
</span>

<p>
Gunakan RDF untuk memeriksa distribusi pasangan atom, seperti Li–O
dan Li–F.
</p>

</div>


<div class="analysis-card">

<strong>
Coordination
</strong>

<span>
Coordination Number
</span>

<p>
Integrasikan RDF atau hitung tetangga sampai minimum pertama untuk
memperoleh bilangan koordinasi.
</p>

</div>


<div class="analysis-card">

<strong>
MSD
</strong>

<span>
Mean Squared Displacement
</span>

<p>
Gunakan perubahan posisi terhadap waktu untuk mempelajari dinamika
dan estimasi transport.
</p>

</div>


<div class="analysis-card">

<strong>
Transport
</strong>

<span>
Diffusion / conductivity
</span>

<p>
Gunakan lintasan yang memadai dan periksa sensitivitas terhadap
jendela fit sebelum melakukan interpretasi.
</p>

</div>


<div class="analysis-card">

<strong>
Mulliken</strong>

<span>
Charge analysis
</span>

<p>
Gunakan muatan untuk membantu memahami redistribusi muatan
selama simulasi.
</p>

</div>


</div>


<details>

<summary>
<strong>Li–O and Li–F analysis</strong>
</summary>

<p>
RDF Li–O memberikan informasi mengenai jarak interaksi Li dengan
pelarut. RDF Li–F membantu melihat indikasi kontak kation-anion.
</p>

<p>
Hasil koordinasi bergantung pada komposisi, ukuran sel, cutoff,
dan waktu sampling.
</p>

</details>


<div class="workflow-check">

<strong>
ANALYSIS CHECK</strong>

<ul>

<li>File CSV atau hasil analisis tersedia.</li>

<li>Grafik memiliki satuan yang jelas.</li>

<li>Cutoff dan jendela analisis tercatat.</li>

<li>Frame yang digunakan diketahui.</li>

<li>Kesimpulan tidak melampaui kualitas sampling.</li>

</ul>

</div>


<hr>


<h2 id="interface" class="mahameru-section-title">
07 · LiF–EC Interface & Visualization
</h2>

<p>
Setelah latihan elektrolit, workflow berlanjut ke antarmuka LiF–EC.
Visualisasi membantu memeriksa posisi slab, molekul EC, dan atom yang
digunakan dalam analisis.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Inspect with VMD
</strong>

<p>
Periksa orientasi slab, posisi EC, dan atom permukaan.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Measure contact
</strong>

<p>
Ikuti jarak O karbonil EC terhadap Li permukaan.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Check charge
</strong>

<p>
Periksa perubahan muatan Mulliken pada molekul dan slab.
</p>

</div>

</div>


<div class="workflow-warning">

<strong>
Do not use 3D RDF blindly</strong>

<p>
Model LiF–EC memiliki ruang vakum sehingga isotropi cairan tidak
berlaku. Untuk model slab tersebut, jarak O karbonil–Li permukaan
lebih relevan daripada RDF 3D seluruh sel.
</p>

</div>


<details>

<summary>
<strong>What the model does not represent</strong>
</summary>

<ul>

<li>Potensial elektroda.</li>

<li>Reaksi reduksi.</li>

<li>Kestabilan siklus.</li>

<li>Seluruh kompleksitas SEI nyata.</li>

</ul>

<p>
Model satu adsorbat digunakan sebagai latihan untuk memahami workflow
dan analisis antarmuka.
</p>

</details>


<hr>


<h2 id="mace" class="mahameru-section-title">
08 · MACE Analysis
</h2>

<p>
Workflow kemudian memperkenalkan pendekatan pemodelan berbasis AI
melalui MACE. Modul menggunakan studi respons kisi LiF untuk
membandingkan energi relatif dan tekanan terhadap volume.
</p>


<div class="analysis-grid">

<div class="analysis-card">

<strong>
Energy
</strong>

<span>
Relative energy
</span>

<p>
Bandingkan bentuk respons energi terhadap volume.
</p>

</div>


<div class="analysis-card">

<strong>
Pressure
</strong>

<span>
Equation of state
</span>

<p>
Periksa respons tekanan terhadap perubahan volume.
</p>

</div>


<div class="analysis-card">

<strong>
DFTB vs MACE
</strong>

<span>
Model comparison
</span>

<p>
Bandingkan respons kedua pendekatan dengan referensi yang konsisten.
</p>

</div>

</div>


<div class="workflow-warning">

<strong>
Interpretation limit</strong>

<p>
Kesamaan bentuk kurva energi tidak otomatis membuktikan bahwa MACE
akurat untuk semua sistem. Modul juga membatasi interpretasi studi
LiF ini dan tidak menganggapnya sebagai validasi seluruh interphase
baterai atau larutan elektrolit.
</p>

</div>


<hr>


<h2 id="quality" class="mahameru-section-title">
09 · Validate Before You Conclude
</h2>

<p>
Tahap akhir bukan sekadar menulis hasil. Periksa apakah data,
parameter, dan model cukup untuk mendukung kesimpulan.
</p>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
Input</h3>

<p>
Pastikan struktur, parameter, muatan, PBC, dan pengaturan metode
sudah tercatat.
</p>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
Computation</h3>

<p>
Pastikan job selesai normal dan output utama tersedia.
</p>

</div>


<div class="validation-card">

<strong>
03
</strong>

<h3>
Sampling</h3>

<p>
Periksa panjang lintasan, frame yang digunakan, dan sensitivitas
hasil terhadap pilihan analisis.
</p>

</div>


<div class="validation-card">

<strong>
04
</strong>

<h3>
Interpretation</h3>

<p>
Tuliskan kesimpulan terbatas yang benar-benar didukung oleh data.
</p>

</div>

</div>


<div class="workflow-check">

<strong>
FOUR OBJECTS TO RECORD</strong>

<ul>

<li><strong>Structure</strong> — jenis atom, posisi, muatan, dan sel bila diperlukan.</li>

<li><strong>Method</strong> — pendekatan energi, parameter, dan pengaturan konvergensi.</li>

<li><strong>Procedure</strong> — single point, optimasi, atau dinamika.</li>

<li><strong>Results</strong> — energi, gaya, geometri, trajectory, dan status komputasi.</li>

</ul>

</div>


<hr>


<h2 id="report" class="mahameru-section-title">
Workshop Report
</h2>

<p>
Untuk laporan singkat, gunakan satu kasus dan susun hasil secara
berurutan agar peserta lain dapat memahami dan mengulang analisis.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Scientific question
</strong>

<p>
Apa pertanyaan yang ingin dijawab?
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
System & method
</strong>

<p>
Apa sistem, ukuran, kondisi, dan metode yang digunakan?
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Files & results
</strong>

<p>
Input dan output apa yang benar-benar tersedia?
</p>

</div>


<div class="workflow-card">

<span>
04
</span>

<strong>
Main evidence
</strong>

<p>
Grafik atau tabel apa yang mendukung hasil?
</p>

</div>


<div class="workflow-card">

<span>
05
</span>

<strong>
Quality check
</strong>

<p>
Apa pemeriksaan kewajaran atau uji sensitivitas yang dilakukan?
</p>

</div>


<div class="workflow-card">

<span>
06
</span>

<strong>
Conclusion
</strong>

<p>
Apa kesimpulan terbatas dan langkah berikutnya?
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Reproducibility check
</strong>

<p>
Tanyakan kepada peserta lain: “Dari berkas dan parameter yang disebut,
apakah saya dapat mengulang angka utama?” Jika belum, tambahkan
informasi yang masih hilang.
</p>

</div>


<hr>


<div class="workflow-next">

<div>

<span>
PREVIOUS
</span>

<strong>
SLURM & Computing
</strong>

</div>


<div>

<span>
NEXT
</span>

<strong>
Research Cases
</strong>

</div>

</div>

</div>
