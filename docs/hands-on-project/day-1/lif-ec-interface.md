<div class="mahameru-page">

<div class="mahameru-hero">

<div class="mahameru-hero-kicker">
HANDS-ON PROJECT · CASE 02
</div>

<div class="mahameru-hero-title">
Antarmuka LiF–EC
</div>

<p class="mahameru-hero-lead">
Mempelajari kontak antara ethylene carbonate (EC) dan permukaan LiF
menggunakan molecular dynamics serta analisis jarak O–Li dan muatan Mulliken.
</p>

<div class="mahameru-hero-meta">

<span>LiF–EC</span>
<span>•</span>
<span>DCDFTBMD</span>
<span>•</span>
<span>MOLECULAR DYNAMICS</span>

</div>

</div>


<div class="analysis-grid">

<div class="analysis-card">

<div class="analysis-card-number">
01
</div>

<div class="analysis-card-label">
STRUCTURE
</div>

<h3>LiF Slab + EC</h3>

<p>
Model terdiri dari slab LiF dan satu molekul ethylene carbonate (EC)
pada permukaan dengan ruang vakum.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
02
</div>

<div class="analysis-card-label">
CONTACT
</div>

<h3>O–Li Distance</h3>

<p>
Jarak O karbonil EC terhadap Li terdekat pada permukaan digunakan untuk
mengikuti kontak antarmuka.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
03
</div>

<div class="analysis-card-label">
CHARGE
</div>

<h3>Mulliken Charge</h3>

<p>
Muatan EC dan slab diperiksa untuk melihat perubahan distribusi muatan
selama trajectory.
</p>

</div>

</div>


<div class="mahameru-workflow">

<div class="mahameru-workflow-step active">

<span>01</span>

<strong>Question</strong>

<small>Pertanyaan analisis</small>

</div>

<div class="mahameru-workflow-arrow">
→
</div>

<div class="mahameru-workflow-step">

<span>02</span>

<strong>System</strong>

<small>Memahami model</small>

</div>

<div class="mahameru-workflow-arrow">
→
</div>

<div class="mahameru-workflow-step">

<span>03</span>

<strong>Prepare</strong>

<small>Menyiapkan kasus</small>

</div>

<div class="mahameru-workflow-arrow">
→
</div>

<div class="mahameru-workflow-step">

<span>04</span>

<strong>Run</strong>

<small>Menjalankan MD</small>

</div>

<div class="mahameru-workflow-arrow">
→
</div>

<div class="mahameru-workflow-step">

<span>05</span>

<strong>Analyze</strong>

<small>Menganalisis hasil</small>

</div>

</div>


<div class="mahameru-section-title">

<span class="mahameru-section-number">
01
</span>

<div>

<h2>Pertanyaan Analisis</h2>

<p>
Mulai dari pertanyaan ilmiah sebelum membaca hasil simulasi.
</p>

</div>

</div>


<p>
Kasus LiF–EC digunakan untuk mempelajari kontak antara molekul
ethylene carbonate (EC) dan permukaan LiF selama molecular dynamics.
</p>


<div class="question-card">

<div class="question-card-number">
Q1
</div>

<div>

<h3>
Apakah O karbonil EC tetap dekat dengan Li pada permukaan?
</h3>

<p>
Pertanyaan ini dijawab dengan mengikuti jarak antara O karbonil EC
dan Li terdekat pada permukaan selama trajectory.
</p>

</div>

</div>


<div class="question-card">

<div class="question-card-number">
Q2
</div>

<div>

<h3>
Apakah muatan kelompok EC dan slab berubah selama MD?
</h3>

<p>
Pertanyaan ini dijawab dengan memeriksa muatan Mulliken kelompok EC
dan seluruh slab LiF sepanjang trajectory.
</p>

</div>

</div>


<div class="mahameru-note">

<strong>Fokus kasus</strong>

<p>
Kasus ini berfokus pada dua besaran utama, yaitu kontak geometrik
O–Li dan perubahan muatan Mulliken.
Keduanya perlu dibaca bersama trajectory dan struktur antarmuka.
</p>

</div>


<div class="mahameru-section-title">

<span class="mahameru-section-number">
02
</span>

<div>

<h2>Memahami Sistem</h2>

<p>
Kenali komponen model sebelum menjalankan simulasi.
</p>

</div>

</div>


<p>
Model antarmuka LiF–EC terdiri dari slab LiF, satu molekul
ethylene carbonate, dan ruang vakum pada arah z.
</p>


<div class="analysis-grid">

<div class="analysis-card">

<div class="analysis-card-number">
32
</div>

<div class="analysis-card-label">
ATOM
</div>

<h3>Slab LiF</h3>

<p>
Slab LiF terdiri dari 32 atom dan berfungsi sebagai permukaan padat
dalam model antarmuka.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
10
</div>

<div class="analysis-card-label">
ATOM
</div>

<h3>Ethylene Carbonate</h3>

<p>
Molekul EC terdiri dari 10 atom dan ditempatkan pada permukaan LiF.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
33
</div>

<div class="analysis-card-label">
ATOM INDEX
</div>

<h3>O Karbonil</h3>

<p>
Atom O karbonil pertama setelah slab menggunakan nomor atom 33
pada struktur kasus yang digunakan.
</p>

</div>

</div>

<div class="mahameru-subtitle">
02.1 · Struktur Sel
</div>

<div class="mahameru-info-card">

<h3>Parameter Sel</h3>

<table class="mahameru-table">

<thead>

<tr>

<th>Parameter</th>

<th>Nilai</th>

<th>Keterangan</th>

</tr>

</thead>

<tbody>
<tr>

<td>Panjang x</td>

<td>8,04 Å</td>

<td>Ukuran sel lateral</td>

</tr>

<tr>

<td>Panjang y</td>

<td>8,04 Å</td>

<td>Ukuran sel lateral</td>

</tr>

<tr>

<td>Panjang z</td>

<td>16 Å</td>

<td>Arah normal permukaan</td>

</tr>

<tr>

<td>Vakum</td>

<td>Arah z</td>

<td>Memisahkan permukaan dari citra periodik</td>

</tr>

</tbody>

</table>

</div>


<div class="mahameru-warning">

<strong>Perhatikan arah z</strong>

<p>
Sistem ini memiliki vakum pada arah z.
Karena itu, sistem tidak merepresentasikan elektrolit cair massal
dalam sel periodik tiga dimensi.
</p>

</div>


<div class="mahameru-subtitle">
02.2 · Mengapa Menggunakan Jarak O–Li?
</div>

<p>
Pada sistem dengan slab dan vakum, analisis kontak lokal lebih sesuai
dengan pertanyaan kasus dibandingkan memperlakukan seluruh sel sebagai
cairan massal.
</p>


<div class="analysis-grid">

<div class="analysis-card">

<div class="analysis-card-number">
01
</div>

<h3>
O Karbonil
</h3>

<p>
Atom O karbonil EC menjadi atom yang diamati dalam analisis kontak.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
02
</div>

<h3>
Li Permukaan
</h3>

<p>
Jarak dihitung terhadap Li terdekat pada lapisan atas permukaan.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
03
</div>

<h3>
Trajectory
</h3>

<p>
Nilai jarak diperiksa sepanjang frame trajectory, bukan hanya pada struktur awal.
</p>

</div>

</div>


<div class="mahameru-note">

<strong>Catatan interpretasi</strong>

<p>
Kontak geometrik O–Li menunjukkan hubungan posisi antara EC dan permukaan
dalam model.
Kontak tersebut sendiri tidak cukup untuk membuktikan mekanisme adsorpsi
atau energi adsorpsi.
</p>

</div>


<div class="mahameru-subtitle">
02.3 · Atom Penting
</div>

<div class="analysis-grid">

<div class="analysis-card">

<div class="analysis-card-number">
01
</div>

<h3>
Jarak O–Li
</h3>

<p>
Jarak O karbonil EC ke Li terdekat pada permukaan.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
02
</div>

<h3>
Muatan EC
</h3>

<p>
Jumlah muatan Mulliken seluruh atom EC.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
03
</div>

<h3>
Muatan Slab
</h3>

<p>
Jumlah muatan Mulliken seluruh atom slab LiF.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
04
</div>

<h3>
Struktur
</h3>

<p>
Perubahan konfigurasi antarmuka diperiksa melalui trajectory dan VMD.
</p>

</div>

</div>


<div class="mahameru-section-title">

<span class="mahameru-section-number">
03
</span>

<div>

<h2>Menyiapkan Kasus</h2>

<p>
Siapkan direktori kerja dan periksa struktur sebelum menjalankan MD.
</p>

</div>

</div>


<div class="mahameru-subtitle">
03.1 · Masuk ke Direktori Workshop
</div>

<div class="workflow-check">

<div class="workflow-check-number">
STEP 01
</div>

<div class="workflow-check-content">

<h3>
Masuk ke direktori workshop
</h3>

<p>
Mulai dari direktori utama workshop.
</p>

<pre class="terminal-block"><code>cd ~/latihan_simulasi/workshop_material</code></pre>

<p>
Periksa lokasi aktif:
</p>

<pre class="terminal-block"><code>pwd</code></pre>

</div>

</div>


<div class="mahameru-subtitle">
03.2 · Membuat Direktori Pribadi
</div>

<div class="workflow-check">

<div class="workflow-check-number">
STEP 02
</div>

<div class="workflow-check-content">

<h3>
Buat direktori hasil peserta
</h3>

<p>
Gunakan direktori pribadi agar hasil latihan tidak bercampur dengan
berkas kasus asli.
</p>

<pre class="terminal-block"><code>mkdir -p proyek_pribadi</code></pre>

</div>

</div>

<div class="mahameru-subtitle">
03.3 · Menyalin Kasus
</div>

<div class="workflow-check">

<div class="workflow-check-number">
STEP 03
</div>

<div class="workflow-check-content">

<h3>
Salin kasus LiF–EC
</h3>

<p>
Salin direktori kasus yang disediakan ke direktori pribadi.
</p>

<pre class="terminal-block"><code>cp -R kasus/02_antarmuka_lif_ec proyek_pribadi/</code></pre>

</div>

</div>


<div class="mahameru-subtitle">
03.4 · Masuk ke Direktori Kasus
</div>

<div class="workflow-check">

<div class="workflow-check-number">
STEP 04
</div>

<div class="workflow-check-content">

<h3>
Masuk ke kasus LiF–EC
</h3>

<pre class="terminal-block"><code>cd proyek_pribadi/02_antarmuka_lif_ec</code></pre>

<p>
Periksa kembali lokasi:
</p>

<pre class="terminal-block"><code>pwd</code></pre>

<div class="validation-card">

<div class="validation-card-title">
Target direktori
</div>

<pre class="path-display"><code>proyek_pribadi/02_antarmuka_lif_ec</code></pre>

</div>

</div>

</div>


<div class="mahameru-subtitle">
03.5 · Memeriksa Input
</div>

<div class="workflow-check">

<div class="workflow-check-number">
STEP 05
</div>

<div class="workflow-check-content">

<h3>
Periksa file input
</h3>

<p>
Lihat bagian awal input:
</p>

<pre class="terminal-block"><code>head -n 9 dftb.inp</code></pre>

<p>
Kemudian lihat bagian akhir input:
</p>

<pre class="terminal-block"><code>tail -n 4 dftb.inp</code></pre>

</div>

</div>


<div class="mahameru-note">

<strong>Yang perlu diperhatikan</strong>

<p>
Tiga baris terakhir yang menggunakan <code>TV</code> menunjukkan vektor sel.
Gunakan informasi tersebut untuk memastikan ukuran sel sesuai dengan
kasus yang sedang dikerjakan.
</p>

</div>


<div class="mahameru-subtitle">
03.6 · Kembali ke Direktori Workshop
</div>

<div class="workflow-check">

<div class="workflow-check-number">
STEP 06
</div>

<div class="workflow-check-content">

<h3>
Kembali ke direktori utama
</h3>

<pre class="terminal-block"><code>cd ../..</code></pre>

</div>

</div>


<div class="mahameru-warning">

<strong>Jangan mengubah struktur atom sebelum pemeriksaan.</strong>

<p>
Nomor atom O karbonil digunakan oleh analisis berikutnya.
Pada struktur kasus yang disediakan, atom tersebut menggunakan nomor 33.
Jika struktur atau urutan atom diubah, nomor atom harus diperiksa kembali.
</p>

</div>


<div class="workflow-next">

<div>

<span class="workflow-next-label">
NEXT
</span>

<h3>
04 · Pemeriksaan dan Simulasi
</h3>

<p>
Setelah struktur siap, lanjutkan dengan pemeriksaan input dan
menjalankan molecular dynamics.
</p>

</div>

<div class="workflow-next-arrow">
→
</div>

</div>


</div>

<div class="mahameru-section-title">

<span class="mahameru-section-number">
04
</span>

<div>

<h2>Pemeriksaan dan Simulasi</h2>

<p>
Periksa kasus terlebih dahulu, kemudian jalankan molecular dynamics dan
pastikan keluaran simulasi tersedia sebelum melakukan analisis.
</p>

</div>

</div>


<div class="mahameru-hero mahameru-hero-small">

<div class="mahameru-hero-kicker">
SIMULATION WORKFLOW
</div>

<h2>
Check → Run → Inspect
</h2>

<p class="mahameru-hero-lead">
Ikuti urutan kerja secara bertahap. Jangan melakukan analisis sebelum
trajectory dan keluaran simulasi tersedia.
</p>

</div>


<div class="mahameru-workflow">

<div class="mahameru-workflow-step active">

<span>01</span>

<strong>Check</strong>

<small>Periksa kasus</small>

</div>

<div class="mahameru-workflow-arrow">
→
</div>

<div class="mahameru-workflow-step">

<span>02</span>

<strong>Run</strong>

<small>Jalankan MD</small>

</div>

<div class="mahameru-workflow-arrow">
→
</div>

<div class="mahameru-workflow-step">

<span>03</span>

<strong>Inspect</strong>

<small>Periksa output</small>

</div>

</div>


### 04.1 · Periksa Kasus

<div class="workflow-check">

<div class="workflow-check-number">
STEP 01
</div>

<div class="workflow-check-content">

<h3>
Jalankan pemeriksaan DCDFTBMD
</h3>

<p>
Sebelum menjalankan simulasi, periksa terlebih dahulu kasus LiF–EC yang
telah disiapkan.
</p>

<pre class="terminal-block"><code>python skrip/periksa_dcdftbmd.py proyek_pribadi/02_antarmuka_lif_ec</code></pre>

</div>

</div>


<div class="validation-card">

<div class="validation-card-title">
Apa yang diperiksa?
</div>

<p>
Pemeriksaan digunakan untuk memastikan kasus berada pada lokasi yang benar
dan kebutuhan dasar simulasi dapat ditemukan sebelum proses MD dijalankan.
</p>

</div>


<div class="mahameru-note">

<strong>Checkpoint</strong>

<p>
Jika pemeriksaan memberikan pesan kesalahan, selesaikan masalah tersebut
terlebih dahulu. Jangan langsung menjalankan simulasi.
</p>

</div>


### 04.2 · Jalankan Molecular Dynamics

<div class="workflow-check">

<div class="workflow-check-number">
STEP 02
</div>

<div class="workflow-check-content">

<h3>
Jalankan DCDFTBMD
</h3>

<p>
Jika pemeriksaan sudah sesuai, jalankan simulasi molecular dynamics.
</p>

<pre class="terminal-block"><code>python skrip/periksa_dcdftbmd.py proyek_pribadi/02_antarmuka_lif_ec --jalankan</code></pre>

</div>

</div>


<div class="validation-card">

<div class="validation-card-title">
Saat simulasi berjalan
</div>

<ul class="mahameru-checklist">

<li>
Biarkan proses berjalan sampai selesai.
</li>

<li>
Perhatikan pesan yang muncul pada terminal.
</li>

<li>
Catat jika simulasi berhenti sebelum langkah yang direncanakan.
</li>

<li>
Jangan mencampurkan keluaran dari beberapa run yang berbeda.
</li>

</ul>

</div>


<div class="mahameru-warning">

<strong>Simulasi selesai bukan berarti analisis selesai.</strong>

<p>
Setelah proses berakhir, kita tetap harus memastikan bahwa trajectory,
data Mulliken, dan log tersedia.
</p>

</div>


### 04.3 · Periksa Trajectory

<div class="workflow-check">

<div class="workflow-check-number">
STEP 03
</div>

<div class="workflow-check-content">

<h3>
Pastikan trajectory tersedia
</h3>

<p>
Periksa direktori trajectory hasil molecular dynamics.
</p>

<pre class="terminal-block"><code>ls proyek_pribadi/02_antarmuka_lif_ec/traject</code></pre>

</div>

</div>


<div class="analysis-grid">

<div class="analysis-card">

<div class="analysis-card-number">
01
</div>

<div class="analysis-card-label">
STRUCTURE
</div>

<h3>
Konfigurasi Atom
</h3>

<p>
Trajectory menyimpan konfigurasi atom pada berbagai langkah simulasi.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
02
</div>

<div class="analysis-card-label">
CONTACT
</div>

<h3>
Jarak O–Li
</h3>

<p>
Trajectory menjadi dasar untuk mengikuti perubahan jarak antara O karbonil
dan Li permukaan.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
03
</div>

<div class="analysis-card-label">
VISUAL
</div>

<h3>
VMD
</h3>

<p>
Trajectory juga dapat digunakan untuk memeriksa perubahan struktur secara
visual.
</p>

</div>

</div>


<div class="mahameru-warning">

<strong>Trajectory tidak tersedia?</strong>

<p>
Jangan lanjut ke analisis. Periksa kembali keluaran simulasi dan log untuk
mengetahui penyebabnya.
</p>

</div>

### 04.4 · Periksa Data Mulliken

<div class="workflow-check">

<div class="workflow-check-number">
STEP 04
</div>

<div class="workflow-check-content">

<h3>
Periksa keluaran Mulliken
</h3>

<p>
Pastikan data muatan Mulliken tersedia sebelum melakukan analisis muatan.
</p>

<pre class="terminal-block"><code>ls proyek_pribadi/02_antarmuka_lif_ec/mulliken</code></pre>

</div>

</div>


<div class="validation-card">

<div class="validation-card-title">
Mengapa data ini diperlukan?
</div>

<p>
Data Mulliken digunakan untuk memperoleh jumlah muatan pada kelompok EC
dan slab LiF selama trajectory.
</p>

</div>


### 04.5 · Periksa Log Simulasi

<div class="workflow-check">

<div class="workflow-check-number">
STEP 05
</div>

<div class="workflow-check-content">

<h3>
Periksa bagian akhir log
</h3>

<pre class="terminal-block"><code>tail -n 20 proyek_pribadi/02_antarmuka_lif_ec/hasil.log</code></pre>

</div>

</div>


<div class="mahameru-note">

<strong>Gunakan log ketika ada masalah.</strong>

<p>
Jika trajectory atau keluaran Mulliken tidak sesuai, gunakan log untuk
menelusuri proses simulasi.
</p>

</div>

<div class="mahameru-section-title">

<span class="mahameru-section-number">
05
</span>

<div>

<h2>Analisis Kontak O–Li</h2>

<p>
Gunakan trajectory untuk mengukur hubungan geometrik antara O karbonil EC
dan Li pada permukaan LiF.
</p>

</div>

</div>


<div class="mahameru-hero mahameru-hero-small">

<div class="mahameru-hero-kicker">
INTERFACE ANALYSIS · 01
</div>

<h2>
O–Li Contact
</h2>

<p class="mahameru-hero-lead">
Pertanyaan pertama adalah apakah O karbonil EC tetap dekat dengan Li pada
permukaan selama molecular dynamics.
</p>

</div>


<div class="analysis-grid">

<div class="analysis-card">

<div class="analysis-card-number">
01
</div>

<div class="analysis-card-label">
OXYGEN
</div>

<h3>
O Karbonil
</h3>

<p>
Atom O karbonil EC yang dianalisis menggunakan nomor atom 33 pada struktur
kasus yang disediakan.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
02
</div>

<div class="analysis-card-label">
SURFACE
</div>

<h3>
Li Permukaan
</h3>

<p>
Jarak dihitung terhadap Li terdekat pada permukaan.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
03
</div>

<div class="analysis-card-label">
TRAJECTORY
</div>

<h3>
Perubahan Waktu
</h3>

<p>
Nilai jarak diperiksa sepanjang frame trajectory.
</p>

</div>

</div>


### 05.1 · Jalankan Analisis Antarmuka

<div class="workflow-check">

<div class="workflow-check-number">
ANALYSIS 01
</div>

<div class="workflow-check-content">

<h3>
Hitung jarak O–Li
</h3>

<p>
Gunakan parameter sesuai dengan struktur LiF–EC yang disediakan.
</p>

<pre class="terminal-block"><code>python skrip/analisis_antarmuka.py \
proyek_pribadi/02_antarmuka_lif_ec \
--slab-atom 32 \
--oxygen 33 \
--sel-xy 8.04 \
--selang 5.0</code></pre>

</div>

</div>


<div class="validation-card">

<div class="validation-card-title">
Parameter analisis
</div>

<table class="mahameru-table">

<thead>

<tr>

<th>Parameter</th>

<th>Nilai</th>

<th>Fungsi</th>

</tr>

</thead>

<tbody>

<tr>

<td>
<code>--slab-atom</code>
</td>

<td>
32
</td>

<td>
Jumlah atom slab LiF
</td>

</tr>

<tr>

<td>
<code>--oxygen</code>
</td>

<td>
33
</td>

<td>
Nomor atom O karbonil
</td>

</tr>

<tr>

<td>
<code>--sel-xy</code>
</td>

<td>
8.04 Å
</td>

<td>
Panjang sel lateral
</td>

</tr>

<tr>

<td>
<code>--selang</code>
</td>

<td>
5.0
</td>

<td>
Interval frame yang dianalisis
</td>

</tr>

</tbody>

</table>

</div>


<div class="mahameru-warning">

<strong>Periksa atom index sebelum menjalankan.</strong>

<p>
Nomor atom 33 berlaku untuk struktur kasus yang disediakan.
Jika Anda mengubah urutan atom atau membuat struktur baru, identifikasi
kembali O karbonil sebelum menggunakan parameter tersebut.
</p>

</div>


### 05.2 · Periksa Hasil Analisis

<div class="workflow-check">

<div class="workflow-check-number">
ANALYSIS 02
</div>

<div class="workflow-check-content">

<h3>
Buka hasil analisis
</h3>

<p>
Periksa beberapa baris pertama file hasil.
</p>

<pre class="terminal-block"><code>head -n 6 proyek_pribadi/02_antarmuka_lif_ec/antarmuka.csv</code></pre>

</div>

</div>


<div class="validation-card">

<div class="validation-card-title">
Pastikan data tersedia
</div>

<div class="analysis-grid">

<div class="analysis-card">

<div class="analysis-card-number">
01
</div>

<h3>
Frame
</h3>

<p>
Data memiliki frame trajectory yang dapat dianalisis.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
02
</div>

<h3>
Distance
</h3>

<p>
Kolom jarak O–Li tersedia.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
03
</div>

<h3>
Charge
</h3>

<p>
Data muatan kelompok tersedia untuk analisis berikutnya.
</p>

</div>

</div>

</div>


### 05.3 · Memahami Nilai Jarak

<div class="analysis-grid">

<div class="analysis-card">

<div class="analysis-card-number">
01
</div>

<h3>
Jarak Awal
</h3>

<p>
Menunjukkan kontak pada konfigurasi awal yang dianalisis.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
02
</div>

<h3>
Jarak Akhir
</h3>

<p>
Menunjukkan kontak pada frame akhir yang dianalisis.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
03
</div>

<h3>
Rata-rata
</h3>

<p>
Merangkum nilai jarak sepanjang frame yang digunakan.
</p>

</div>


<div class="analysis-card">

<div class="analysis-card-number">
04
</div>

<h3>
Rentang
</h3>

<p>
Menunjukkan perbedaan antara nilai minimum dan maksimum.
</p>

</div>

</div>


<div class="mahameru-note">

<strong>Yang dicari bukan hanya satu angka.</strong>

<p>
Perhatikan pola jarak sepanjang trajectory.
Nilai rata-rata, minimum, maksimum, dan perubahan dari awal sampai akhir
membantu menggambarkan perilaku kontak O–Li.
</p>

</div>


### 05.4 · Buat Grafik

<div class="workflow-check">

<div class="workflow-check-number">
ANALYSIS 03
</div>

<div class="workflow-check-content">

<h3>
Visualisasikan hasil analisis
</h3>

<p>
Gunakan skrip grafik yang tersedia untuk melihat pola hasil.
</p>

<pre class="terminal-block"><code>python skrip/grafik_hasil.py antarmuka \
proyek_pribadi/02_antarmuka_lif_ec</code></pre>

</div>

</div>


<div class="validation-card">

<div class="validation-card-title">
Cara membaca grafik
</div>

<ol>

<li>
Lihat perubahan jarak sepanjang trajectory.
</li>

<li>
Perhatikan apakah jarak relatif stabil.
</li>

<li>
Perhatikan apakah terdapat fluktuasi.
</li>

<li>
Bandingkan nilai awal dan akhir.
</li>

<li>
Gunakan data numerik untuk memeriksa nilai yang terlihat pada grafik.
</li>

</ol>

</div>


<div class="mahameru-section-title">

<span class="mahameru-section-number">
06
</span>

<div>

<h2>Menafsirkan Kontak O–Li</h2>

<p>
Gunakan hasil jarak untuk menjawab pertanyaan pertama dari studi kasus.
</p>

</div>

</div>


<div class="question-card">

<div class="question-card-number">
Q1
</div>

<div>

<h3>
Apakah O karbonil EC tetap dekat dengan permukaan?
</h3>

<p>
Gunakan pola jarak O–Li sepanjang trajectory sebagai dasar jawaban.
</p>

<div class="answer-line"></div>

<div class="answer-line"></div>

<div class="answer-line"></div>

</div>

</div>


<div class="question-card">

<div class="question-card-number">
Q2
</div>

<div>

<h3>
Apakah jarak O–Li relatif stabil atau berfluktuasi?
</h3>

<p>
Bandingkan nilai awal, akhir, rata-rata, minimum, dan maksimum.
</p>

<div class="answer-line"></div>

<div class="answer-line"></div>

</div>

</div>


<div class="mahameru-analysis-box">

<strong>Gunakan bukti berikut:</strong>

<ul class="mahameru-checklist">

<li>
Jarak O–Li rata-rata.
</li>

<li>
Jarak O–Li minimum.
</li>

<li>
Jarak O–Li maksimum.
</li>

<li>
Perubahan jarak sepanjang trajectory.
</li>

<li>
Pengamatan visual pada struktur.
</li>

</ul>

</div>


<div class="mahameru-warning">

<strong>Jangan menarik kesimpulan terlalu jauh.</strong>

<p>
Jarak O–Li yang kecil menunjukkan kontak geometrik dalam model.
Nilai tersebut tidak dengan sendirinya membuktikan energi adsorpsi,
mekanisme reaksi, atau kestabilan antarmuka dalam kondisi yang lebih luas.
</p>

</div>


### 06.1 · Catat Hasil O–Li

<div class="result-table-wrapper">

<table class="mahameru-table">

<thead>

<tr>

<th>Besaran</th>

<th>Hasil</th>

<th>Satuan</th>

</tr>

</thead>

<tbody>

<tr>

<td>
Jarak O–Li awal
</td>

<td>
____________________
</td>

<td>
Å
</td>

</tr>

<tr>

<td>
Jarak O–Li akhir
</td>

<td>
____________________
</td>

<td>
Å
</td>

</tr>

<tr>

<td>
Jarak O–Li rata-rata
</td>

<td>
____________________
</td>

<td>
Å
</td>

</tr>

<tr>

<td>
Jarak O–Li minimum
</td>

<td>
____________________
</td>

<td>
Å
</td>

</tr>

<tr>

<td>
Jarak O–Li maksimum
</td>

<td>
____________________
</td>

<td>
Å
</td>

</tr>

<tr>

<td>
Simpangan
</td>

<td>
____________________
</td>

<td>
Å
</td>

</tr>

</tbody>

</table>

</div>


<div class="mahameru-note">

<strong>Catatan peserta</strong>

<p>
Isi tabel menggunakan hasil simulasi Anda sendiri.
Jika simulasi belum berhasil, tuliskan
<strong>belum dihitung</strong> daripada menggunakan angka perkiraan.
</p>

</div>

<!--
PART 3A
LiF / EC Interface
Mulai setelah Section 05 yang sudah ada.
Jangan masukkan MACE di bagian ini.
-->

<hr>

<h2 id="06-o-li-contact" class="mahameru-section-title">
06 · Analisis Kontak O–Li
</h2>

<p>
Setelah output simulasi dan berkas analisis diperiksa, tahap berikutnya
adalah mengukur kontak antara O karbonil pada EC dan Li terdekat pada
permukaan slab LiF.
</p>


<div class="mahameru-info-card">

<strong>
Pertanyaan utama
</strong>

<p>
Apakah O karbonil EC tetap dekat dengan Li pada permukaan selama
molecular dynamics?
</p>

<p>
Analisis ini menggunakan jarak O karbonil terhadap Li permukaan
terdekat pada setiap frame trajectory.
</p>

</div>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
O Karbonil
</strong>

<p>
Atom O yang digunakan dalam kasus ini adalah atom nomor 33 pada
struktur yang disediakan.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Li Permukaan
</strong>

<p>
Analisis mencari atom Li pada lapisan permukaan teratas slab LiF.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Jarak O–Li
</strong>

<p>
Jarak terdekat dihitung pada setiap frame trajectory.
</p>

</div>

</div>


<h3>
06.1 · Periksa Nomor Atom
</h3>

<p>
Sebelum menjalankan analisis, pastikan urutan atom pada struktur masih
sama dengan kasus yang disediakan.
</p>


<div class="workflow-warning">

<strong>
Perhatikan urutan atom
</strong>

<p>
Pada struktur kasus yang disediakan, O karbonil pertama setelah slab
merupakan atom nomor 33. Nomor ini digunakan oleh skrip analisis.
</p>

<p>
Jika struktur atau urutan atom diubah, nomor atom O harus diperiksa
kembali sebelum analisis dijalankan.
</p>

</div>


<div class="mahameru-info-card">

<strong>
Struktur yang digunakan
</strong>

<p>
32 atom pertama merupakan slab LiF. Atom nomor 33 merupakan O karbonil
yang digunakan untuk analisis O–Li.
</p>

</div>


<h3>
06.2 · Jalankan Analisis Kontak
</h3>

<p>
Gunakan skrip analisis antarmuka pada direktori kasus pribadi.
</p>


<pre><code>python skrip/analisis_antarmuka.py \
proyek_pribadi/02_antarmuka_lif_ec \
--slab-atom 32 \
--oxygen 33 \
--sel-xy 8.04 \
--selang 5.0</code></pre>


<p>
Perintah tersebut menggunakan 32 atom pertama sebagai slab,
atom 33 sebagai O karbonil, panjang sel lateral 8,04 Å,
dan interval waktu antarframe 5 fs.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
slab-atom
</strong>

<p>
Menentukan jumlah atom slab LiF yang berada di awal urutan atom.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
oxygen
</strong>

<p>
Menentukan nomor atom O karbonil yang digunakan dalam analisis.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
sel-xy
</strong>

<p>
Menentukan panjang sel pada arah x dan y untuk periodic minimum image.
</p>

</div>


<div class="workflow-card">

<span>
04
</span>

<strong>
selang
</strong>

<p>
Menentukan interval waktu antarframe dalam satuan femtosecond.
</p>

</div>

</div>


<h3>
06.3 · Periksa File antarmuka.csv
</h3>

<p>
Setelah analisis selesai, periksa file hasil yang dibuat oleh skrip.
</p>


<pre><code>head -n 6 proyek_pribadi/02_antarmuka_lif_ec/antarmuka.csv</code></pre>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
bingkai
</h3>

<p>
Nomor frame trajectory yang dianalisis.
</p>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
waktu_fs
</h3>

<p>
Waktu frame dalam femtosecond.
</p>

</div>


<div class="validation-card">

<strong>
03
</strong>

<h3>
jarak_Okarbonil_Lisurface_A
</h3>

<p>
Jarak O karbonil ke Li permukaan terdekat dalam Å.
</p>

</div>


<div class="validation-card">

<strong>
04
</strong>

<h3>
muatan_EC_e
</h3>

<p>
Jumlah muatan Mulliken seluruh atom EC dalam e.
</p>

</div>


<div class="validation-card">

<strong>
05
</strong>

<h3>
muatan_slab_e
</h3>

<p>
Jumlah muatan Mulliken seluruh atom slab dalam e.
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Lima kolom utama
</strong>

<p>
File antarmuka.csv menjadi sumber utama untuk analisis numerik pada
tahap berikutnya. Pastikan kelima kolom tersedia sebelum melanjutkan.
</p>

</div>


<h3>
06.4 · Periksa Nilai Jarak O–Li
</h3>

<p>
Catat nilai jarak pada frame awal dan frame akhir. Kemudian periksa
rata-rata, simpangan, nilai minimum, dan nilai maksimum.
</p>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
Frame Awal
</h3>

<p>
Jarak O–Li pada frame pertama.
</p>

<input
type="text"
placeholder="Masukkan nilai Å"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
Frame Akhir
</h3>

<p>
Jarak O–Li pada frame terakhir.
</p>

<input
type="text"
placeholder="Masukkan nilai Å"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
03
</strong>

<h3>
Rata-rata
</h3>

<p>
Nilai rata-rata jarak O–Li sepanjang trajectory.
</p>

<input
type="text"
placeholder="Masukkan nilai Å"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
04
</strong>

<h3>
Simpangan
</h3>

<p>
Simpangan jarak O–Li sepanjang trajectory.
</p>

<input
type="text"
placeholder="Masukkan nilai Å"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
05
</strong>

<h3>
Minimum
</h3>

<p>
Jarak O–Li paling kecil yang ditemukan.
</p>

<input
type="text"
placeholder="Masukkan nilai Å"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
06
</strong>

<h3>
Maksimum
</h3>

<p>
Jarak O–Li paling besar yang ditemukan.
</p>

<input
type="text"
placeholder="Masukkan nilai Å"
class="lifec-input"
>

</div>

</div>


<h3>
06.5 · Baca Pola Jarak
</h3>

<p>
Jangan hanya mencatat satu angka. Perhatikan bagaimana jarak O–Li
berubah sepanjang trajectory.
</p>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Menetap
</strong>

<p>
Nilai jarak berada pada rentang yang relatif sempit sepanjang trajectory.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Membesar
</strong>

<p>
Jarak menunjukkan kecenderungan meningkat dari waktu ke waktu.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Berfluktuasi
</strong>

<p>
Jarak berubah naik dan turun selama molecular dynamics.
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Catatan interpretasi
</strong>

<p>
Perubahan jarak selama trajectory 0,5 ps belum dapat digunakan sebagai
energi adsorpsi atau konstanta laju desorpsi.
</p>

<p>
Gunakan hasil ini sebagai pengamatan terhadap kontak O–Li pada model
dan lintasan yang digunakan.
</p>

</div>


<h3>
06.6 · Evaluasi Kontak O–Li
</h3>

<div class="workflow-warning">

<strong>
Pertanyaan analisis
</strong>

<p>
Apakah O karbonil EC tetap dekat dengan Li pada permukaan?
</p>

</div>


<div class="mahameru-info-card">

<strong>
Pilihan pengamatan
</strong>

<p>
☐ Jarak relatif menetap</p>

<p>
☐ Jarak cenderung membesar</p>

<p>
☐ Jarak berfluktuasi</p>

<p>
☐ Belum dapat ditentukan dari data yang tersedia</p>

</div>


<div class="mahameru-info-card">

<strong>
Bukti numerik
</strong>

<p>
Tuliskan nilai atau pola data yang mendukung pilihan Anda.
</p>

<textarea
rows="5"
placeholder="Tuliskan bukti numerik dari antarmuka.csv..."
class="lifec-input"
></textarea>

</div>


<h3>
06.7 · Catatan Peserta
</h3>

<div class="mahameru-info-card">

<strong>
Apa yang Anda temukan?
</strong>

<p>
Gunakan data hasil simulasi Anda sendiri. Jangan menggunakan angka contoh
sebagai hasil penelitian.
</p>

<textarea
rows="7"
placeholder="Tuliskan hasil pengamatan Anda..."
class="lifec-input"
></textarea>

</div>


<div class="workflow-warning">

<strong>
Sebelum lanjut
</strong>

<p>
Pastikan jarak O–Li awal, akhir, rata-rata, simpangan, minimum,
dan maksimum sudah dicatat.
</p>

<p>
Setelah bagian ini selesai, analisis dilanjutkan ke perubahan muatan
kelompok EC dan slab LiF.
</p>

</div>
<hr>

<h2 id="07-mulliken-charge" class="mahameru-section-title">
07 · Analisis Muatan Mulliken
</h2>

<p>
Setelah jarak O–Li diperiksa, gunakan data Mulliken untuk melihat perubahan
muatan pada dua kelompok utama, yaitu EC dan slab LiF.
</p>


<div class="mahameru-info-card">

<strong>
Pertanyaan utama
</strong>

<p>
Apakah muatan kelompok EC dan slab berubah selama molecular dynamics,
dan apakah perubahan keduanya menunjukkan pola yang konsisten?
</p>

</div>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Muatan EC
</strong>

<p>
Jumlah muatan Mulliken seluruh atom EC pada setiap frame.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Muatan Slab
</strong>

<p>
Jumlah muatan Mulliken seluruh atom slab LiF pada setiap frame.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Muatan Total
</strong>

<p>
Jumlah muatan EC dan slab digunakan untuk pemeriksaan konsistensi.
</p>

</div>

</div>


<h3>
07.1 · Sumber Data Muatan
</h3>

<p>
Data muatan berasal dari keluaran Mulliken yang dibaca oleh skrip
analisis antarmuka.
</p>


<pre><code>ls proyek_pribadi/02_antarmuka_lif_ec/mulliken</code></pre>


<div class="mahameru-info-card">

<strong>
Hubungan dengan antarmuka.csv
</strong>

<p>
Skrip analisis memasukkan jumlah muatan seluruh EC dan seluruh slab
ke dalam kolom <code>muatan_EC_e</code> dan <code>muatan_slab_e</code>.
</p>

</div>


<h3>
07.2 · Periksa Hasil Muatan
</h3>

<p>
Buka kembali hasil analisis untuk melihat nilai muatan pada setiap frame.
</p>


<pre><code>head -n 6 proyek_pribadi/02_antarmuka_lif_ec/antarmuka.csv</code></pre>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
muatan_EC_e
</h3>

<p>
Jumlah muatan Mulliken seluruh atom EC pada frame tersebut.
</p>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
muatan_slab_e
</h3>

<p>
Jumlah muatan Mulliken seluruh atom slab LiF pada frame tersebut.
</p>

</div>

</div>


<div class="workflow-warning">

<strong>
Perhatikan jenis muatan
</strong>

<p>
Muatan Mulliken merupakan hasil partisi populasi elektron.
Muatan ini bukan muatan formal atom.
</p>

</div>


<h3>
07.3 · Catat Muatan EC
</h3>

<p>
Catat nilai awal, akhir, dan rata-rata muatan kelompok EC.
</p>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
EC Awal
</h3>

<p>
Muatan EC pada frame pertama.
</p>

<input
type="text"
placeholder="Masukkan nilai e"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
EC Akhir
</h3>

<p>
Muatan EC pada frame terakhir.
</p>

<input
type="text"
placeholder="Masukkan nilai e"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
03
</strong>

<h3>
EC Rata-rata
</h3>

<p>
Rata-rata muatan EC sepanjang trajectory.
</p>

<input
type="text"
placeholder="Masukkan nilai e"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
04
</strong>

<h3>
Perubahan EC
</h3>

<p>
Perubahan muatan antara frame awal dan frame akhir.
</p>

<input
type="text"
placeholder="Masukkan nilai e"
class="lifec-input"
>

</div>

</div>


<h3>
07.4 · Catat Muatan Slab
</h3>

<p>
Catat nilai awal, akhir, dan rata-rata muatan kelompok slab LiF.
</p>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
Slab Awal
</h3>

<p>
Muatan slab pada frame pertama.
</p>

<input
type="text"
placeholder="Masukkan nilai e"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
Slab Akhir
</h3>

<p>
Muatan slab pada frame terakhir.
</p>

<input
type="text"
placeholder="Masukkan nilai e"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
03
</strong>

<h3>
Slab Rata-rata
</h3>

<p>
Rata-rata muatan slab sepanjang trajectory.
</p>

<input
type="text"
placeholder="Masukkan nilai e"
class="lifec-input"
>

</div>


<div class="validation-card">

<strong>
04
</strong>

<h3>
Perubahan Slab
</h3>

<p>
Perubahan muatan antara frame awal dan frame akhir.
</p>

<input
type="text"
placeholder="Masukkan nilai e"
class="lifec-input"
>

</div>

</div>


<h3>
07.5 · Periksa Jumlah Muatan
</h3>

<p>
Pada setiap frame, jumlahkan muatan kelompok EC dan slab.
</p>


<div class="mahameru-info-card">

<strong>
Persamaan pemeriksaan
</strong>

<p>
Q<sub>total</sub> = Q<sub>EC</sub> + Q<sub>slab</sub>
</p>

</div>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Frame Awal
</strong>

<p>
Jumlahkan muatan EC dan slab pada frame pertama.
</p>

<input
type="text"
placeholder="Q total awal"
class="lifec-input"
>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Frame Akhir
</strong>

<p>
Jumlahkan muatan EC dan slab pada frame terakhir.
</p>

<input
type="text"
placeholder="Q total akhir"
class="lifec-input"
>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Perubahan Total
</strong>

<p>
Bandingkan jumlah muatan total pada frame yang diperiksa.
</p>

<input
type="text"
placeholder="Perubahan"
class="lifec-input"
>

</div>

</div>


<div class="workflow-warning">

<strong>
Pemeriksaan konsistensi
</strong>

<p>
Jumlah muatan total harus mendekati muatan sistem.
Penyimpangan besar dapat menunjukkan masalah pada pembacaan data
atau pengelompokan atom.
</p>

</div>


<h3>
07.6 · Bandingkan Tren EC dan Slab
</h3>

<p>
Perhatikan apakah perubahan muatan EC dan slab menunjukkan pola yang
berlawanan selama trajectory.
</p>


<div class="mahameru-info-card">

<strong>
Pertanyaan analisis
</strong>

<p>
Apakah perubahan muatan EC diikuti perubahan berlawanan pada slab?
</p>

</div>


<div class="validation-grid">

<div class="validation-card">

<strong>
A
</strong>

<h3>
Berubah Berlawanan
</h3>

<p>
Muatan EC meningkat ketika muatan slab menurun, atau sebaliknya.
</p>

<input
type="checkbox"
>
&nbsp; Pilih
</div>


<div class="validation-card">

<strong>
B
</strong>

<h3>
Tidak Berlawanan
</h3>

<p>
Kedua kelompok tidak menunjukkan pola perubahan yang berlawanan.
</p>

<input
type="checkbox"
>
&nbsp; Pilih
</div>


<div class="validation-card">

<strong>
C
</strong>

<h3>
Tidak Jelas
</h3>

<p>
Data yang tersedia belum cukup untuk menentukan pola.
</p>

<input
type="checkbox"
>
&nbsp; Pilih
</div>

</div>


<div class="mahameru-info-card">

<strong>
Bukti dari data
</strong>

<p>
Tuliskan nilai atau pola muatan yang mendukung pilihan Anda.
</p>

<textarea
rows="6"
placeholder="Contoh: muatan EC berubah dari ... menjadi ... e, sedangkan muatan slab berubah dari ... menjadi ... e."
class="lifec-input"
></textarea>

</div>


<h3>
07.7 · Buat Grafik Hasil
</h3>

<p>
Gunakan skrip grafik untuk melihat hubungan hasil analisis antarmuka.
</p>


<pre><code>python skrip/grafik_hasil.py antarmuka \
proyek_pribadi/02_antarmuka_lif_ec</code></pre>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Jarak O–Li
</strong>

<p>
Perhatikan perubahan jarak O karbonil terhadap Li permukaan.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
Muatan EC
</strong>

<p>
Perhatikan perubahan muatan kelompok EC sepanjang trajectory.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Muatan Slab
</strong>

<p>
Perhatikan perubahan muatan kelompok slab sepanjang trajectory.
</p>

</div>

</div>


<div class="mahameru-info-card">

<strong>
Cara membaca grafik
</strong>

<p>
Bandingkan pola jarak O–Li dengan pola perubahan muatan EC dan slab.
Gunakan grafik sebagai alat bantu, lalu kembali ke nilai numerik
pada <code>antarmuka.csv</code>.
</p>

</div>


<hr>


<h2 id="08-vmd" class="mahameru-section-title">
08 · Pemeriksaan Geometri dengan VMD
</h2>

<p>
Setelah analisis numerik selesai, periksa kembali struktur secara visual.
Bandingkan konfigurasi awal dengan frame akhir trajectory.
</p>


<div class="mahameru-info-card">

<strong>
Tujuan pemeriksaan
</strong>

<p>
Tandai bidang slab, O karbonil, dan Li permukaan terdekat.
Gunakan pengamatan visual untuk membantu membaca hasil jarak O–Li.
</p>

</div>


<div class="workflow-grid">

<div class="workflow-card">

<span>
01
</span>

<strong>
Slab LiF
</strong>

<p>
Identifikasi bidang permukaan slab LiF.
</p>

</div>


<div class="workflow-card">

<span>
02
</span>

<strong>
O Karbonil
</strong>

<p>
Identifikasi O karbonil yang digunakan dalam analisis.
</p>

</div>


<div class="workflow-card">

<span>
03
</span>

<strong>
Li Permukaan
</strong>

<p>
Identifikasi Li permukaan yang menjadi pasangan kontak terdekat.
</p>

</div>

</div>


<h3>
08.1 · Bandingkan Struktur Awal dan Akhir
</h3>


<div class="validation-grid">

<div class="validation-card">

<strong>
01
</strong>

<h3>
Struktur Awal</h3>

<p>
Apa yang terlihat pada posisi awal EC terhadap permukaan LiF?
</p>

<textarea
rows="5"
placeholder="Catatan struktur awal..."
class="lifec-input"
></textarea>

</div>


<div class="validation-card">

<strong>
02
</strong>

<h3>
Frame Akhir</h3>

<p>
Apa yang terlihat pada posisi akhir EC terhadap permukaan LiF?
</p>

<textarea
rows="5"
placeholder="Catatan frame akhir..."
class="lifec-input"
></textarea>

</div>


<div class="validation-card">

<strong>
03
</strong>

<h3>
Perubahan Geometri</h3>

<p>
Apakah posisi atau orientasi EC berubah secara visual?
</p>

<textarea
rows="5"
placeholder="Catatan perubahan..."
class="lifec-input"
></textarea>

</div>

</div>


<div class="workflow-warning">

<strong>
Jangan menarik kesimpulan hanya dari gambar
</strong>

<p>
Gambar statis tidak membuktikan bahwa EC tetap teradsorpsi.
Gunakan gambar bersama data jarak O–Li dan data muatan Mulliken.
</p>

</div>


<h3>
08.2 · Mengapa Jarak O–Li?
</h3>

<div class="mahameru-info-card">

<strong>
Pertanyaan studi kasus
</strong>

<p>
Mengapa jarak antara O karbonil dan Li permukaan lebih tepat digunakan
daripada RDF 3D seluruh sel yang memiliki vakum?
</p>

<textarea
rows="7"
placeholder="Jelaskan berdasarkan struktur slab LiF, molekul EC, dan keberadaan vakum arah z..."
class="lifec-input"
></textarea>

</div>


<div class="workflow-warning">

<strong>
Petunjuk
</strong>

<p>
Model LiF–EC memiliki slab dan vakum pada arah z.
Pertanyaan analisis juga berfokus pada kontak lokal antara O karbonil
dan Li permukaan, bukan pada struktur cairan massal.
</p>

</div>


<div class="mahameru-info-card">

<strong>
Checkpoint Part 3B
</strong>

<p>
Sebelum melanjutkan, pastikan Anda sudah memiliki:
</p>

<p>
☐ Muatan EC awal dan akhir</p>

<p>
☐ Muatan slab awal dan akhir</p>

<p>
☐ Muatan EC rata-rata</p>

<p>
☐ Muatan slab rata-rata</p>

<p>
☐ Pemeriksaan jumlah muatan EC + slab</p>

<p>
☐ Grafik hasil analisis</p>

<p>
☐ Catatan struktur awal dan frame akhir</p>

<p>
☐ Jawaban mengenai alasan penggunaan jarak O–Li</p>

</div>


<div class="workflow-next">

<div>

<strong>
NEXT · PART 3C
</strong>

<p>
Menghubungkan jarak O–Li, muatan Mulliken, dan pengamatan VMD untuk
menyusun kesimpulan sementara.
</p>

</div>

<span>
→
</span>

</div>
