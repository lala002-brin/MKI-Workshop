## Working on Mahameru

Setelah berhasil login, Anda akan berada di **login node Mahameru HPC BRIN**.  
Terminal akan menampilkan informasi singkat mengenai sistem, resource, storage, dan pekerjaan SLURM yang sedang berjalan.

<div class="mahameru-screenshot">

<img
src="../../../assets/images/Mahamerulogin.png"
alt="Tampilan login node Mahameru HPC BRIN"
loading="lazy"
>

<p class="mahameru-caption">
Contoh informasi yang ditampilkan setelah berhasil login ke Mahameru HPC BRIN.
</p>

</div>

<div class="mahameru-info-grid">

<div class="mahameru-info-card">

<span class="mahameru-info-icon">01</span>

<strong>System</strong>

<p>
Hostname, waktu sistem, uptime, dan load average.
</p>

</div>

<div class="mahameru-info-card">

<span class="mahameru-info-icon">02</span>

<strong>Resource</strong>

<p>
Penggunaan memory, disk, dan kapasitas komputasi.
</p>

</div>

<div class="mahameru-info-card">

<span class="mahameru-info-icon">03</span>

<strong>Cluster</strong>

<p>
CPU usage serta jumlah job yang running dan queued.
</p>

</div>

<div class="mahameru-info-card">

<span class="mahameru-info-icon">04</span>

<strong>Storage</strong>

<p>
Home directory, scratch directory, dan quota storage.
</p>

</div>

</div>

---

### Memahami Informasi Login Node

Informasi yang muncul di Terminal membantu Anda mengetahui kondisi lingkungan kerja sebelum menjalankan pekerjaan komputasi.

<details>
<summary><strong>System Information</strong></summary>

Bagian ini menunjukkan informasi dasar mengenai login node.

- **Hostname** menunjukkan server yang sedang digunakan.
- **Date & Time** menunjukkan waktu sistem.
- **Uptime** menunjukkan berapa lama server telah aktif.
- **Load Average** menunjukkan beban sistem.

Contoh:

`Hostname : login2.hpc.brin.go.id`

</details>

<details>
<summary><strong>Resource Usage</strong></summary>

Bagian ini menunjukkan penggunaan resource pada sistem.

- **Memory** menunjukkan penggunaan RAM.
- **Disk (home)** menunjukkan penggunaan storage pada home directory.

Gunakan informasi ini untuk memahami kondisi resource sebelum bekerja.

</details>

<details>
<summary><strong>Cluster Utilization</strong></summary>

Bagian ini memberikan gambaran penggunaan cluster.

Informasi yang ditampilkan meliputi:

- **CPU Usage**
- jumlah core yang digunakan
- jumlah job yang sedang **running**
- jumlah job yang sedang **queued**
- total job pada sistem

Contoh dari login node:

`CPU Usage : 46.8%`

`Jobs : 106 (running) | 47 (queued) | 153 (total)`

</details>

<details>
<summary><strong>Storage Information</strong></summary>

Mahameru menampilkan lokasi directory yang digunakan oleh akun.

**Home directory**

`/mgpfs/home/lala002`

**Scratch directory**

`/mgpfs/home/lala002/_scratch`

Scratch dapat digunakan sebagai area kerja sementara untuk pekerjaan komputasi.

</details>

<details>
<summary><strong>Storage Quota</strong></summary>

Bagian ini menunjukkan penggunaan quota storage.

Contoh:

`root : 7190.83 GB used`

`home_old : 0.00 GB / 0.00 GB`

`scratch : 0.00 GB / 1024.00 GB`

Periksa quota sebelum menjalankan pekerjaan yang menghasilkan file berukuran besar.

</details>

---

## Active SLURM Jobs

Jika Anda memiliki pekerjaan yang sedang berjalan, login node juga dapat menampilkan daftar **active SLURM jobs**.

Informasi penting yang perlu diperhatikan:

<div class="mahameru-job-grid">

<div class="mahameru-job-card">

<strong>JOBID</strong>

<p>Identitas pekerjaan.</p>

</div>

<div class="mahameru-job-card">

<strong>PARTITION</strong>

<p>Partition yang digunakan.</p>

</div>

<div class="mahameru-job-card">

<strong>ST</strong>

<p>Status pekerjaan.</p>

</div>

<div class="mahameru-job-card">

<strong>TIME</strong>

<p>Durasi pekerjaan.</p>

</div>

<div class="mahameru-job-card">

<strong>NODES</strong>

<p>Jumlah node yang digunakan.</p>

</div>

<div class="mahameru-job-card">

<strong>NODELIST</strong>

<p>Node tempat job berjalan.</p>

</div>

</div>

### Contoh

`JOBID    PARTITION    NAME       USER    ST`

`552995   medium-1a    addition   lala002  R`

`554133   short        R0-W10.s   lala002  R`

`554134   short        R0-W30.s   lala002  R`

**Status `R` menunjukkan job sedang running.**

---

## Quick Check

Sebelum mulai menyiapkan pekerjaan komputasi, lakukan pengecekan sederhana:

<div class="mahameru-checklist">

<div>
<span>01</span>
<strong>Check location</strong>
<code>pwd</code>
</div>

<div>
<span>02</span>
<strong>Check files</strong>
<code>ls</code>
</div>

<div>
<span>03</span>
<strong>Check storage</strong>
<code>df -h</code>
</div>

<div>
<span>04</span>
<strong>Check jobs</strong>
<code>squeue</code>
</div>

</div>

---

<div class="mahameru-tip">

<strong>💡 Yang perlu diingat</strong>

<p>
Login node digunakan untuk akses, persiapan pekerjaan, pengelolaan file,
dan pengiriman job. Pekerjaan komputasi sebaiknya dijalankan melalui
mekanisme <strong>SLURM</strong> sesuai resource dan partition yang tersedia.
</p>

</div>

---

## Next Step

Setelah memahami lingkungan kerja Mahameru, lanjutkan ke:

**03 · SLURM & Computing**

Di bagian berikutnya kita akan membahas bagaimana memilih partition,
menyiapkan resource, membuat job, mengirim pekerjaan, dan memantau statusnya.
