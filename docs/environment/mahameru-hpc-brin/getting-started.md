<div class="mahameru-page">

<div class="mahameru-tabs">

<a class="mahameru-tab active" href="./">
Getting Started
</a>

<a class="mahameru-tab" href="../working-on-mahameru/">
Working on Mahameru
</a>

<a class="mahameru-tab" href="../slurm-computing/">
SLURM & Computing
</a>

<a class="mahameru-tab" href="../workshop-workflow/">
Workshop Workflow
</a>

</div>


<p class="mahameru-intro">
Mulai dari credential yang diberikan administrator hingga berhasil masuk ke
<strong>login node Mahameru HPC BRIN</strong>.
</p>


<div class="mahameru-hero">

<div class="mahameru-hero-content">

<span class="mahameru-label">
START HERE
</span>

<h2>
Build your HPC workflow
</h2>

<p>
Ikuti alur dari persiapan credential hingga berhasil terhubung ke
lingkungan Mahameru. Setiap langkah memiliki fungsi yang berbeda sehingga
Anda dapat mengikuti dokumentasi sesuai kebutuhan.
</p>

</div>

<div class="mahameru-hero-status">

<span class="mahameru-label">
YOUR FIRST CONNECTION
</span>

<strong>Prepare → Protect → Connect → Verify</strong>

<div class="mahameru-access">
<strong>SSH ACCESS</strong>
<code>login2.hpc.brin.go.id</code>
</div>

</div>

</div>


<hr>


<h2 id="access-check" class="mahameru-section-title">
Access Check
</h2>

<p class="mahameru-section-intro">
Sebelum membuka Terminal, pastikan credential yang diberikan administrator
sudah tersedia.
</p>


<div class="mahameru-grid mahameru-grid-3">

<div class="mahameru-card">

<span class="mahameru-card-number">
01
</span>

<h3>
User ID
</h3>

<p>
Identitas akun yang digunakan untuk masuk ke Mahameru.
</p>

<p>
Contoh:
<code>w001</code>
</p>

</div>


<div class="mahameru-card">

<span class="mahameru-card-number">
02
</span>

<h3>
Private Key
</h3>

<p>
Kunci rahasia yang digunakan untuk autentikasi SSH.
</p>

<p>
Contoh:
<code>ws001_user_id</code>
</p>

</div>


<div class="mahameru-card">

<span class="mahameru-card-number">
03
</span>

<h3>
Public Key
</h3>

<p>
Pasangan dari private key yang digunakan pada proses autentikasi.
</p>

<p>
Contoh:
<code>ws001_user_id.pub</code>
</p>

</div>

</div>


<div class="mahameru-note">

<strong>Restricted Access</strong>

<p>
Credential bersifat individual. Jangan membagikan private key, User ID,
atau informasi akses kepada pengguna lain.
</p>

</div>


<hr>


<h2 id="01-prepare-your-ssh-key" class="mahameru-section-title">
01 · Prepare Your SSH Key
</h2>

<p>
Siapkan file SSH key yang diberikan administrator sebelum melakukan
koneksi ke Mahameru.
</p>


<h3>
Periksa file SSH key
</h3>

<p>
Masuk ke folder tempat SSH key disimpan.
</p>

<div class="mahameru-code-label">
Terminal
</div>

```bash
cd ~/HPC
```

<p>
Periksa isi direktori:
</p>

```bash
ls
```

<p>
Contoh struktur file:
</p>

```text
HPC/
├── ws001_user_id
└── ws001_user_id.pub
```

<div class="mahameru-note">

<strong>Perhatikan nama file</strong>

<p>
Nama file sudah disiapkan oleh administrator.
</p>

<p>
<strong>Tidak perlu melakukan rename.</strong>
</p>

</div>


<div class="mahameru-grid mahameru-grid-2">

<div class="mahameru-card">

<h3>
Private key
</h3>

<p>
File tanpa <code>.pub</code>. Kunci ini harus tetap berada pada komputer
Anda dan tidak boleh dibagikan.
</p>

</div>


<div class="mahameru-card">

<h3>
Public key
</h3>

<p>
File dengan <code>.pub</code>. Public key merupakan pasangan dari
private key.
</p>

</div>

</div>


<hr>


<h2 id="02-protect-your-private-key" class="mahameru-section-title">
02 · Protect Your Private Key
</h2>

<p>
Buka Terminal dan masuk ke folder tempat SSH key disimpan.
</p>

```bash
cd ~/HPC
```

<p>
Pastikan private key menggunakan permission yang sesuai.
</p>

```bash
chmod 600 ws001_user_id
```

<p>
Periksa permission file:
</p>

```bash
ls -l
```

<p>
Private key seharusnya hanya dapat dibaca oleh pemilik file.
</p>


<div class="mahameru-note">

<strong>Why 600?</strong>

<p>
Permission <code>600</code> membatasi akses file sehingga private key
tidak terbuka untuk pengguna lain pada komputer Anda.
</p>

</div>


<hr>


<h2 id="03-connect-to-mahameru" class="mahameru-section-title">
03 · Connect to Mahameru
</h2>

<p>
Setelah private key siap, gunakan private key tersebut untuk melakukan
autentikasi SSH ke login node Mahameru.
</p>


<h3>
SSH command
</h3>

```bash
ssh -i ~/HPC/ws001_user_id w001@login2.hpc.brin.go.id
```

<p>
Tekan <kbd>Enter</kbd> untuk menjalankan command.
</p>


<div class="mahameru-note">

<strong>Remember</strong>

<p>
Gunakan <strong>private key</strong> ketika menjalankan SSH.
Jangan menggunakan file <code>.pub</code> sebagai identity file.
</p>

</div>


<h3>
Jika diminta konfirmasi koneksi
</h3>

<p>
Ikuti pesan yang muncul pada Terminal sesuai konfigurasi akses yang
diberikan administrator.
</p>


<hr>


<h2 id="04-verify-your-login" class="mahameru-section-title">
04 · Verify Your Login
</h2>

<p>
Jika autentikasi berhasil, Terminal akan berpindah ke lingkungan login
node Mahameru.
</p>

<p>
Prompt akan menunjukkan bahwa Anda sudah berada pada server HPC.
</p>


<h3>
Periksa lokasi saat ini
</h3>

```bash
pwd
```

<h3>
Lihat isi direktori
</h3>

```bash
ls
```

<p>
Jika kedua command dapat dijalankan, koneksi SSH sudah berhasil.
</p>


<div class="mahameru-note">

<strong>Connected</strong>

<p>
<strong>SSH → login2 → Login Node</strong>
</p>

<p>
Anda sudah berada di lingkungan Mahameru dan siap menyiapkan pekerjaan
komputasi.
</p>

</div>


<hr>


<section class="access-flow-section">

<h2 id="access-flow" class="mahameru-section-title">
Access Flow
</h2>

<div class="access-flow">

<div class="access-flow-card">
<span class="access-flow-number">01</span>
<h3>Credential</h3>
<p>User ID + SSH key</p>
</div>

<div class="access-flow-arrow">→</div>

<div class="access-flow-card">
<span class="access-flow-number">02</span>
<h3>Protect</h3>
<p>chmod 600</p>
</div>

<div class="access-flow-arrow">→</div>

<div class="access-flow-card">
<span class="access-flow-number">03</span>
<h3>Connect</h3>
<p>SSH login</p>
</div>

<div class="access-flow-arrow">→</div>

<div class="access-flow-card">
<span class="access-flow-number">04</span>
<h3>Verify</h3>
<p>pwd + ls</p>
</div>

</div>

</section>

<hr>

<h2 id="quick-start" class="mahameru-section-title">
Quick Start
</h2>

<p>
Jika credential sudah tersedia, gunakan empat command berikut untuk
melakukan koneksi pertama ke Mahameru.
</p>

<div class="mahameru-quickstart">

<div class="mahameru-quickstep">

<span>01</span>

<div>
<strong>Check key</strong>
<code>ls ~/HPC</code>
</div>

</div>

<div class="mahameru-quickstep">

<span>02</span>

<div>
<strong>Protect key</strong>
<code>chmod 600 ~/HPC/ws001_user_id</code>
</div>

</div>

<div class="mahameru-quickstep">

<span>03</span>

<div>
<strong>Connect</strong>
<code>ssh -i ~/HPC/ws001_user_id w001@login2.hpc.brin.go.id</code>
</div>

</div>

<div class="mahameru-quickstep">

<span>04</span>

<div>
<strong>Verify</strong>

<div class="mahameru-inline-code">
<code>pwd</code>
<code>ls</code>
</div>

</div>

</div>

</div>
<hr>


<h2 id="before-you-move-on" class="mahameru-section-title">
Before You Move On
</h2>


<div class="mahameru-checklist">

<p>
☑ User ID sudah tersedia
</p>

<p>
☑ Private key sudah tersedia
</p>

<p>
☑ Public key sudah tersedia
</p>

<p>
☑ Kedua key berada dalam satu folder
</p>

<p>
☑ Private key sudah menggunakan permission <code>600</code>
</p>

<p>
☑ SSH berhasil terhubung ke <code>login2.hpc.brin.go.id</code>
</p>

<p>
☑ <code>pwd</code> dapat dijalankan
</p>

<p>
☑ <code>ls</code> dapat dijalankan
</p>

</div>


<div class="mahameru-next">

<strong>
Next
</strong>

<p>
Login sudah berhasil. Selanjutnya kita belajar bagaimana bekerja di
dalam lingkungan Mahameru, mulai dari filesystem, workspace, command
Linux, hingga software environment.
</p>

<a href="../working-on-mahameru/">
02 · Working on Mahameru →
</a>

</div>

</div>
