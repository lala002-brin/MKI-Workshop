## SLURM & Computing

Setelah memahami lingkungan kerja Mahameru, langkah berikutnya adalah
menjalankan pekerjaan komputasi melalui **SLURM**.

SLURM membantu mengatur pekerjaan yang dikirim ke cluster, termasuk
resource, partition, antrean, dan status job.

<div class="mahameru-workflow">

<div class="mahameru-workflow-step">
<span>01</span>
<strong>Prepare</strong>
<p>Siapkan file dan script.</p>
</div>

<div class="mahameru-workflow-arrow">→</div>

<div class="mahameru-workflow-step">
<span>02</span>
<strong>Submit</strong>
<p>Kirim job ke SLURM.</p>
</div>

<div class="mahameru-workflow-arrow">→</div>

<div class="mahameru-workflow-step">
<span>03</span>
<strong>Queue</strong>
<p>Job menunggu resource.</p>
</div>

<div class="mahameru-workflow-arrow">→</div>

<div class="mahameru-workflow-step">
<span>04</span>
<strong>Run</strong>
<p>Job berjalan di cluster.</p>
</div>

</div>

---

## Cara Kerja SLURM

SLURM menerima pekerjaan dari pengguna dan mengatur kapan serta di mana
job tersebut dijalankan berdasarkan resource dan partition yang tersedia.

<details open>
<summary><strong>01 · Prepare</strong></summary>

Siapkan script yang berisi instruksi pekerjaan dan kebutuhan resource.

Contoh sederhana:

    #!/bin/bash

    #SBATCH --job-name=my_job
    #SBATCH --output=output_%j.out

    echo "Job started"
    hostname
    date

Simpan sebagai:

`your_script.sh`

</details>

<details>
<summary><strong>02 · Submit</strong></summary>

Kirim script ke SLURM menggunakan:

    sbatch your_script.sh

Jika berhasil, SLURM akan memberikan **Job ID**.

Job tidak langsung harus berjalan. SLURM akan memasukkannya ke dalam
antrean sesuai resource dan kondisi cluster.

</details>

<details>
<summary><strong>03 · Monitor</strong></summary>

Periksa status job menggunakan:

    squeue

Perintah ini membantu melihat pekerjaan yang sedang berada dalam sistem
SLURM.

Perhatikan informasi seperti:

- JOBID
- PARTITION
- NAME
- USER
- ST
- TIME
- NODES
- NODELIST

</details>

<details>
<summary><strong>04 · Running</strong></summary>

Ketika job mendapatkan resource dan mulai bekerja, statusnya akan berubah
menjadi **R (Running)**.

Contoh:

    JOBID     PARTITION   NAME      USER     ST
    552995    medium-1a   addition  lala002  R

Status `R` menunjukkan pekerjaan sedang berjalan.

</details>

---

## Submit vs Interactive Job

Mahameru juga mendukung **interactive job**.

Gunakan interactive job ketika Anda ingin memperoleh shell pada compute
resource dan bekerja secara langsung.

### Batch Job

Untuk pekerjaan yang berjalan melalui script:

    sbatch your_script.sh

Alurnya:

<div class="mahameru-mini-flow">

<span>Script</span>
→
<span>sbatch</span>
→
<span>Queue</span>
→
<span>Running</span>
→
<span>Output</span>

</div>

### Interactive Job

Untuk membuka sesi interaktif:

    srun --partition=interactive --pty /bin/bash

Setelah resource tersedia, Anda akan memperoleh shell pada environment
komputasi yang diberikan.

<div class="mahameru-tip">

<strong>💡 Kapan menggunakan interactive job?</strong>

<p>
Gunakan interactive job ketika Anda perlu menguji command, mengecek
environment, atau melakukan percobaan singkat secara langsung.
</p>

</div>

---

## Memahami Status Job

<div class="mahameru-status-grid">

<div class="mahameru-status-card">

<strong>PD</strong>

<span>Pending</span>

<p>
Job masih menunggu resource atau kondisi tertentu.
</p>

</div>

<div class="mahameru-status-card">

<strong>R</strong>

<span>Running</span>

<p>
Job sedang berjalan pada compute node.
</p>

</div>

<div class="mahameru-status-card">

<strong>CG</strong>

<span>Completing</span>

<p>
Job sedang menyelesaikan proses akhir.
</p>

</div>

<div class="mahameru-status-card">

<strong>CD</strong>

<span>Completed</span>

<p>
Job telah selesai.
</p>

</div>

</div>

---

## Partition

**Partition** menentukan kelompok resource yang dapat digunakan oleh job.

Nama partition yang tersedia dapat berbeda sesuai konfigurasi Mahameru
dan akses pengguna.

Karena itu, jangan menebak nama partition.

Periksa informasi partition yang tersedia pada sistem sebelum membuat
script.

Gunakan:

    sinfo

Untuk melihat detail pekerjaan pengguna:

    squeue

<div class="mahameru-tip">

<strong>⚠️ Perhatikan resource</strong>

<p>
Gunakan resource sesuai kebutuhan pekerjaan. Jangan meminta resource
secara berlebihan karena hal tersebut dapat memengaruhi antrean dan
efisiensi penggunaan cluster.
</p>

</div>

---

## Job Monitoring

Setelah submit, gunakan `squeue` untuk memantau pekerjaan.

Contoh:

    squeue

Informasi yang perlu diperhatikan:

<div class="mahameru-job-grid">

<div class="mahameru-job-card">
<strong>JOBID</strong>
<p>ID unik pekerjaan.</p>
</div>

<div class="mahameru-job-card">
<strong>PARTITION</strong>
<p>Resource group yang digunakan.</p>
</div>

<div class="mahameru-job-card">
<strong>ST</strong>
<p>Status pekerjaan.</p>
</div>

<div class="mahameru-job-card">
<strong>TIME</strong>
<p>Waktu job berjalan.</p>
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

---

## Mini Practice

Coba lakukan alur berikut setelah login ke Mahameru.

<div class="mahameru-practice">

<div>
<span>01</span>
<strong>Check environment</strong>

    pwd
    ls

</div>

<div>
<span>02</span>
<strong>Check partition</strong>

    sinfo

</div>

<div>
<span>03</span>
<strong>Create script</strong>

    nano your_script.sh

</div>

<div>
<span>04</span>
<strong>Submit job</strong>

    sbatch your_script.sh

</div>

<div>
<span>05</span>
<strong>Monitor job</strong>

    squeue

</div>

</div>

---

## Quick Reference

<div class="mahameru-command-grid">

<div>
<strong>Submit</strong>
<code>sbatch your_script.sh</code>
</div>

<div>
<strong>Monitor</strong>
<code>squeue</code>
</div>

<div>
<strong>Partitions</strong>
<code>sinfo</code>
</div>

<div>
<strong>Interactive</strong>
<code>srun --partition=interactive --pty /bin/bash</code>
</div>

</div>

---

## Sebelum Lanjut

Pastikan Anda sudah memahami:

- cara menyiapkan script
- cara mengirim job dengan `sbatch`
- cara melihat antrean dengan `squeue`
- cara melihat partition dengan `sinfo`
- perbedaan batch job dan interactive job
- arti status dasar SLURM

<div class="mahameru-next">

<strong>Next · Workshop Workflow</strong>

<p>
Setelah memahami cara kerja SLURM, kita akan menghubungkan proses ini
dengan workflow workshop, mulai dari menyiapkan model, menjalankan
simulasi, sampai menganalisis hasil.
</p>

</div>
