<div class="access-linux">

<div class="access-hero">

<div class="access-kicker">
GETTING STARTED
</div>

<h1>
Access & Linux
</h1>

<p>
Mulai bekerja pada HPC melalui koneksi SSH, navigasi filesystem,
dan command Linux dasar yang diperlukan untuk workflow komputasi.
</p>

</div>


<div class="access-flow">

<div class="access-flow-item active">
<span>01</span>
<strong>Connect</strong>
<small>SSH to HPC</small>
</div>

<div class="access-flow-line"></div>

<div class="access-flow-item">
<span>02</span>
<strong>Navigate</strong>
<small>Move directories</small>
</div>

<div class="access-flow-line"></div>

<div class="access-flow-item">
<span>03</span>
<strong>Manage</strong>
<small>Work with files</small>
</div>

<div class="access-flow-line"></div>

<div class="access-flow-item">
<span>04</span>
<strong>Work</strong>
<small>Prepare your project</small>
</div>

</div>


<div class="access-grid">


<div class="access-panel">

<div class="access-panel-head">

<div>
<span>01</span>
<h2>Connect to HPC</h2>
</div>

<span class="access-badge">
SSH
</span>

</div>

<p>
Gunakan SSH untuk membuka terminal pada login node HPC.
</p>

<div class="access-command">

<span>CONNECT</span>

<pre><code>ssh username@hostname</code></pre>

</div>

<div class="access-command">

<span>EXAMPLE</span>

<pre><code>ssh user@hpc.example.ac.id</code></pre>

</div>

<div class="access-note">
Gunakan username dan hostname yang diberikan oleh administrator
HPC. Jangan membagikan password atau credential.
</div>

</div>


<div class="access-panel">

<div class="access-panel-head">

<div>
<span>02</span>
<h2>Navigate</h2>
</div>

<span class="access-badge">
FILESYSTEM
</span>

</div>

<p>
Kenali lokasi Anda sebelum membuat atau menjalankan file.
</p>

<div class="access-command">

<span>WHERE AM I?</span>

<pre><code>pwd</code></pre>

</div>

<div class="access-command">

<span>LIST FILES</span>

<pre><code>ls -lh</code></pre>

</div>

<div class="access-command">

<span>CHANGE DIRECTORY</span>

<pre><code>cd project/</code></pre>

</div>

<div class="access-command">

<span>GO HOME</span>

<pre><code>cd ~</code></pre>

</div>

</div>


<div class="access-panel">

<div class="access-panel-head">

<div>
<span>03</span>
<h2>Manage Files</h2>
</div>

<span class="access-badge">
LINUX
</span>

</div>

<p>
Gunakan command dasar untuk menyiapkan struktur calculation.
</p>

<div class="access-command">

<span>CREATE DIRECTORY</span>

<pre><code>mkdir -p input output scripts</code></pre>

</div>

<div class="access-command">

<span>COPY</span>

<pre><code>cp input.in backup.in</code></pre>

</div>

<div class="access-command">

<span>MOVE / RENAME</span>

<pre><code>mv old.in new.in</code></pre>

</div>

<div class="access-command">

<span>REMOVE</span>

<pre><code>rm file.out</code></pre>

</div>

</div>


<div class="access-panel">

<div class="access-panel-head">

<div>
<span>04</span>
<h2>Prepare Your Workspace</h2>
</div>

<span class="access-badge">
PROJECT
</span>

</div>

<p>
Gunakan struktur sederhana agar input, script, output,
dan analisis tetap terorganisasi.
</p>

<div class="access-tree">

<code>project/</code>

<div>├── input/</div>
<div>├── scripts/</div>
<div>├── output/</div>
<div>└── analysis/</div>

</div>

<div class="access-command">

<span>START</span>

<pre><code>cd project/
pwd
ls -lh</code></pre>

</div>

</div>


</div>


<div class="access-reference">

<div class="access-reference-head">

<div>

<span>QUICK REFERENCE</span>

<h2>
Essential Linux Commands
</h2>

</div>

<p>
Gunakan halaman Command Line untuk referensi yang lebih lengkap.
</p>

</div>


<div class="access-table">

<table>

<thead>

<tr>
<th>Command</th>
<th>Function</th>
<th>Example</th>
</tr>

</thead>

<tbody>

<tr>
<td><code>pwd</code></td>
<td>Melihat lokasi saat ini</td>
<td><code>pwd</code></td>
</tr>

<tr>
<td><code>ls</code></td>
<td>Melihat isi directory</td>
<td><code>ls -lh</code></td>
</tr>

<tr>
<td><code>cd</code></td>
<td>Berpindah directory</td>
<td><code>cd project/</code></td>
</tr>

<tr>
<td><code>mkdir</code></td>
<td>Membuat directory</td>
<td><code>mkdir output</code></td>
</tr>

<tr>
<td><code>cp</code></td>
<td>Menyalin file</td>
<td><code>cp a.in b.in</code></td>
</tr>

<tr>
<td><code>mv</code></td>
<td>Memindahkan atau mengganti nama</td>
<td><code>mv old.in new.in</code></td>
</tr>

</tbody>

</table>

</div>

</div>


<div class="access-safety">

<div>

<span>SAFE WORKFLOW</span>

<h2>
Check before you change
</h2>

<p>
Biasakan menjalankan <code>pwd</code> dan <code>ls</code> sebelum
mengubah atau menghapus file. Pastikan lokasi dan nama file sudah benar.
</p>

</div>

<pre><code>pwd
ls -lh</code></pre>

</div>


<div class="access-next">

<div>

<span>NEXT STEP</span>

<h2>
Ready for the terminal?
</h2>

<p>
Pelajari command yang lebih lengkap sebelum menyiapkan
software dan menjalankan calculation.
</p>

</div>

<div class="access-actions">

<a href="../command-line/">
Command Line →
</a>

<a href="../software-environment/">
Software Environment →
</a>

</div>

</div>

</div>
