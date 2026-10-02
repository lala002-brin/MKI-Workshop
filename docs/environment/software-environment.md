<div class="software-environment">

<div class="software-hero">

<div class="software-kicker">
COMPUTATIONAL ENVIRONMENT
</div>

<h1>Software Environment</h1>

<p>
Siapkan compiler, library, dan aplikasi komputasi yang diperlukan
sebelum menjalankan calculation pada HPC.
</p>

</div>


<div class="software-flow">

<div class="software-flow-item active">
<span>01</span>
<strong>Understand</strong>
<small>Environment</small>
</div>

<div class="software-flow-line"></div>

<div class="software-flow-item">
<span>02</span>
<strong>Load</strong>
<small>Software</small>
</div>

<div class="software-flow-line"></div>

<div class="software-flow-item">
<span>03</span>
<strong>Check</strong>
<small>Installation</small>
</div>

<div class="software-flow-line"></div>

<div class="software-flow-item">
<span>04</span>
<strong>Run</strong>
<small>Calculation</small>
</div>

</div>


<div class="software-overview">

<div class="software-overview-main">

<span class="software-label">
CORE CONCEPT
</span>

<h2>
Environment menentukan software yang tersedia
</h2>

<p>
HPC biasanya menyediakan software melalui environment module.
Anda dapat memilih versi compiler, library, dan aplikasi sesuai
kebutuhan calculation.
</p>

</div>

<div class="software-overview-code">

<span>CHECK MODULE</span>

<pre><code>module avail</code></pre>

</div>

</div>


<div class="software-grid">


<div class="software-card">

<div class="software-card-top">

<span class="software-number">01</span>

<div>

<h2>Melihat Software</h2>

<p>
Cari aplikasi dan versi yang tersedia pada cluster.
</p>

</div>

</div>

<div class="software-command">

<span>LIST AVAILABLE SOFTWARE</span>

<pre><code>module avail</code></pre>

</div>

<div class="software-command">

<span>SEARCH</span>

<pre><code>module avail 2&gt;&amp;1 | grep -i quantum</code></pre>

</div>

</div>


<div class="software-card">

<div class="software-card-top">

<span class="software-number">02</span>

<div>

<h2>Memuat Software</h2>

<p>
Aktifkan software yang diperlukan sebelum menjalankan program.
</p>

</div>

</div>

<div class="software-command">

<span>LOAD</span>

<pre><code>module load software</code></pre>

</div>

<div class="software-command">

<span>EXAMPLE</span>

<pre><code>module load quantum-espresso</code></pre>

</div>

<div class="software-note">
Nama module berbeda pada setiap cluster. Gunakan nama yang
ditampilkan oleh <code>module avail</code>.
</div>

</div>


<div class="software-card">

<div class="software-card-top">

<span class="software-number">03</span>

<div>

<h2>Memeriksa Environment</h2>

<p>
Pastikan software sudah aktif dan executable dapat ditemukan.
</p>

</div>

</div>

<div class="software-command">

<span>LOADED MODULES</span>

<pre><code>module list</code></pre>

</div>

<div class="software-command">

<span>CHECK EXECUTABLE</span>

<pre><code>which pw.x</code></pre>

</div>

</div>


<div class="software-card">

<div class="software-card-top">

<span class="software-number">04</span>

<div>

<h2>Mengganti Versi</h2>

<p>
Gunakan versi yang sesuai dengan calculation dan script.
</p>

</div>

</div>

<div class="software-command">

<span>UNLOAD</span>

<pre><code>module unload software</code></pre>

</div>

<div class="software-command">

<span>LOAD VERSION</span>

<pre><code>module load software/version</code></pre>

</div>

</div>


</div>


<div class="software-reference">

<div class="software-reference-head">

<div>

<span>COMMON TOOLS</span>

<h2>Software dalam Workflow</h2>

</div>

<p>
Contoh peran software dalam workflow komputasi.
</p>

</div>


<table>

<thead>

<tr>
<th>Software</th>
<th>Peran</th>
<th>Digunakan pada</th>
</tr>

</thead>

<tbody>

<tr>
<td><strong>Quantum ESPRESSO</strong></td>
<td>Perhitungan struktur elektronik dan optimasi</td>
<td>First-principles</td>
</tr>

<tr>
<td><strong>LAMMPS</strong></td>
<td>Molecular dynamics</td>
<td>Atomistic simulation</td>
</tr>

<tr>
<td><strong>Python</strong></td>
<td>Analisis dan post-processing</td>
<td>Data analysis</td>
</tr>

<tr>
<td><strong>MPI</strong></td>
<td>Komunikasi proses paralel</td>
<td>Parallel computing</td>
</tr>

<tr>
<td><strong>Compiler</strong></td>
<td>Membangun atau menjalankan aplikasi yang membutuhkan compiler</td>
<td>Software environment</td>
</tr>

</tbody>

</table>

</div>


<div class="software-check">

<div>

<span>ENVIRONMENT CHECK</span>

<h2>Periksa sebelum submit job</h2>

<p>
Jalankan pemeriksaan sederhana untuk memastikan environment
sesuai dengan calculation yang akan dijalankan.
</p>

</div>

<pre><code>module list
which executable
executable --version</code></pre>

</div>


<div class="software-warning">

<strong>Perhatian</strong>

<span>
Jangan langsung menggunakan nama module dari cluster lain.
Setiap HPC dapat memiliki struktur module, versi software,
compiler, dan dependency yang berbeda.
</span>

</div>


<div class="software-next">

<div>

<span>NEXT STEP</span>

<h2>
Environment siap. Jalankan calculation.
</h2>

<p>
Setelah software dan environment terverifikasi,
lanjutkan ke Running Calculations untuk menyiapkan dan
mengirim job ke scheduler.
</p>

</div>

<div class="software-actions">

<a href="../running-calculations/">
Running Calculations →
</a>

<a href="../script-library/">
Script Library →
</a>

</div>

</div>

</div>
