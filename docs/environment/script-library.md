<div class="script-library">

<!-- =========================================================
     HERO
     ========================================================= -->

<div class="script-hero">

    <div class="script-kicker">
        HPC SCRIPT LIBRARY
    </div>

    <h1>Script Library</h1>

    <p>
        Kumpulan template job script yang dapat digunakan sebagai
        titik awal untuk menjalankan berbagai workload komputasi
        pada HPC. Setiap template menunjukkan struktur dasar
        submission menggunakan SLURM dan dapat disesuaikan dengan
        kebutuhan calculation.
    </p>

    <p>
        Sebelum melakukan submission, periksa kembali partition,
        jumlah CPU atau GPU, memory, wall time, lokasi input,
        lokasi output, software environment, serta kebutuhan
        calculation Anda.
    </p>

</div>


<!-- =========================================================
     IMPORTANT
     ========================================================= -->

<div class="script-important">

    <div class="script-important-icon">
        !
    </div>

    <div>

        <strong>
            Cara menggunakan Script Library
        </strong>

        <p>
            Pilih template yang paling dekat dengan jenis calculation
            Anda. Baca fungsi setiap parameter sebelum mengubah nilainya.
            Salin script ke directory project, sesuaikan bagian yang
            diperlukan, kemudian lakukan pemeriksaan sebelum menjalankan
            <code>sbatch</code>.
        </p>

        <p>
            Template di halaman ini bukan konfigurasi universal.
            Setiap cluster dapat memiliki partition, software,
            compiler, resource limit, dan aturan penggunaan yang
            berbeda.
        </p>

    </div>

</div>


<!-- =========================================================
     TEMPLATE NAVIGATION
     ========================================================= -->

<div class="script-navigation">

    <a href="#cpu-job" class="script-navigation-item">

        <span class="script-navigation-number">
            01
        </span>

        <div>
            <strong>CPU Job</strong>

            <small>
                Calculation umum berbasis CPU.
            </small>
        </div>

    </a>


    <a href="#gpu-job" class="script-navigation-item">

        <span class="script-navigation-number">
            02
        </span>

        <div>
            <strong>GPU Job</strong>

            <small>
                Calculation yang membutuhkan GPU.
            </small>
        </div>

    </a>


    <a href="#dft-job" class="script-navigation-item">

        <span class="script-navigation-number">
            03
        </span>

        <div>
            <strong>DFT Job</strong>

            <small>
                Workflow first-principles dengan Quantum ESPRESSO.
            </small>
        </div>

    </a>


    <a href="#md-job" class="script-navigation-item">

        <span class="script-navigation-number">
            04
        </span>

        <div>
            <strong>Molecular Dynamics</strong>

            <small>
                Workflow MD dengan LAMMPS.
            </small>
        </div>

    </a>

</div>


<!-- =========================================================
     WORKFLOW
     ========================================================= -->

<div class="script-workflow">

    <div class="script-workflow-heading">

        <span>
            WORKFLOW
        </span>

        <h2>
            Dari template hingga submission
        </h2>

        <p>
            Gunakan urutan berikut agar perubahan pada job script
            tetap terkontrol.
        </p>

    </div>


    <div class="script-steps">

        <div class="script-step">

            <span class="script-step-number">
                01
            </span>

            <strong>
                Pilih template
            </strong>

            <small>
                Tentukan template berdasarkan jenis calculation.
            </small>

        </div>


        <div class="script-step">

            <span class="script-step-number">
                02
            </span>

            <strong>
                Edit parameter
            </strong>

            <small>
                Sesuaikan partition, resource, waktu, dan path.
            </small>

        </div>


        <div class="script-step">

            <span class="script-step-number">
                03
            </span>

            <strong>
                Periksa script
            </strong>

            <small>
                Pastikan input, software, executable, dan resource benar.
            </small>

        </div>


        <div class="script-step">

            <span class="script-step-number">
                04
            </span>

            <strong>
                Submit job
            </strong>

            <small>
                Simpan sebagai file <code>.slurm</code> lalu gunakan
                <code>sbatch</code>.
            </small>

        </div>

    </div>

</div>


<!-- =========================================================
     CPU JOB
     ========================================================= -->

<div class="script-card" id="cpu-job">

    <div class="script-card-header">

        <div class="script-card-title">

            <span class="script-number">
                01
            </span>

            <div>

                <div class="script-section-label">
                    BASIC CPU WORKLOAD
                </div>

                <h2>
                    CPU Job
                </h2>

                <p>
                    Template dasar untuk calculation yang berjalan
                    menggunakan CPU.
                </p>

            </div>

        </div>

        <span class="script-badge cpu">
            CPU
        </span>

    </div>


    <div class="script-description">

        <p>
            Gunakan template ini untuk calculation yang tidak membutuhkan
            GPU. Jumlah task, CPU per task, memory, dan wall time harus
            mengikuti kebutuhan aplikasi yang digunakan.
        </p>

        <p>
            Untuk workshop, gunakan partition yang memang diberikan
            kepada peserta. Jangan mengganti partition berdasarkan
            contoh dari cluster lain tanpa memeriksa konfigurasi HPC
            yang sedang digunakan.
        </p>

    </div>


    <div class="script-workspace">

        <div class="script-code-toolbar">

            <span class="script-code-language">
                JOB SCRIPT
            </span>

            <button
                class="script-copy-button"
                type="button">
                Salin Script
            </button>

        </div>


        <pre><code>#!/bin/bash

#SBATCH --job-name=lala002-cpu
#SBATCH --partition=workshop
#SBATCH --nodes=1
#SBATCH --ntasks=4
#SBATCH --time=01:00:00

echo "Job started"
echo "Hostname: $(hostname)"
echo "Date: $(date)"

# Jalankan calculation di bawah ini
# ./your_program input.in

echo "Job finished"
echo "Date: $(date)"</code></pre>

    </div>


    <div class="script-parameters">

        <div class="script-parameter">
            <code>--job-name</code>

            <span>
                Nama job yang akan muncul pada scheduler.
                Gunakan nama yang singkat dan mudah dikenali.
            </span>
        </div>


        <div class="script-parameter">
            <code>--partition</code>

            <span>
                Menentukan partition tempat job dikirim.
                Gunakan partition yang tersedia untuk akun Anda.
            </span>
        </div>


        <div class="script-parameter">
            <code>--nodes</code>

            <span>
                Menentukan jumlah node yang diminta oleh job.
            </span>
        </div>


        <div class="script-parameter">
            <code>--ntasks</code>

            <span>
                Menentukan jumlah task. Nilainya harus sesuai dengan
                kebutuhan aplikasi dan strategi paralelisasi.
            </span>
        </div>


        <div class="script-parameter">
            <code>--time</code>

            <span>
                Menentukan batas waktu maksimum job.
                Jangan meminta waktu jauh lebih besar dari kebutuhan
                calculation.
            </span>
        </div>

    </div>


    <div class="script-note">

        <strong>
            Catatan
        </strong>

        <p>
            Template ini hanya menunjukkan struktur dasar.
            Resource yang sama tidak otomatis cocok untuk semua
            calculation.
        </p>

    </div>

</div>


<!-- =========================================================
     GPU JOB
     ========================================================= -->

<div class="script-card" id="gpu-job">

    <div class="script-card-header">

        <div class="script-card-title">

            <span class="script-number">
                02
            </span>

            <div>

                <div class="script-section-label">
                    ACCELERATED WORKLOAD
                </div>

                <h2>
                    GPU Job
                </h2>

                <p>
                    Template untuk calculation yang memanfaatkan GPU.
                </p>

            </div>

        </div>

        <span class="script-badge gpu">
            GPU
        </span>

    </div>


    <div class="script-description">

        <p>
            Gunakan template ini hanya jika aplikasi yang digunakan
            memang mendukung GPU. Meminta GPU tidak otomatis membuat
            calculation menjadi lebih cepat.
        </p>

        <p>
            Pastikan akun memiliki akses GPU, partition yang digunakan
            menyediakan GPU, dan software sudah dikompilasi atau
            dikonfigurasi untuk memanfaatkan GPU.
        </p>

    </div>


    <div class="script-workspace">

        <div class="script-code-toolbar">

            <span class="script-code-language">
                GPU JOB SCRIPT
            </span>

            <button
                class="script-copy-button"
                type="button">
                Salin Script
            </button>

        </div>


        <pre><code>#!/bin/bash

#SBATCH --job-name=lala002-gpu
#SBATCH --partition=workshop
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --gres=gpu:1
#SBATCH --time=01:00:00

echo "GPU job started"
echo "Hostname: $(hostname)"
echo "Date: $(date)"

# Periksa GPU yang diberikan kepada job
nvidia-smi

# Load software yang diperlukan
# module load your-software

# Jalankan calculation
# your_gpu_program input.in

echo "GPU job finished"
echo "Date: $(date)"</code></pre>

    </div>


    <div class="script-parameters">

        <div class="script-parameter">
            <code>--gres=gpu:1</code>

            <span>
                Contoh permintaan satu GPU.
                Format resource GPU dapat berbeda pada setiap cluster.
            </span>
        </div>


        <div class="script-parameter">
            <code>nvidia-smi</code>

            <span>
                Memeriksa GPU yang tersedia dari dalam job.
            </span>
        </div>


        <div class="script-parameter">
            <code>--ntasks=1</code>

            <span>
                Contoh menggunakan satu task.
                Konfigurasi aktual harus mengikuti kebutuhan aplikasi.
            </span>
        </div>


        <div class="script-parameter">
            <code>--time</code>

            <span>
                Menentukan batas waktu maksimum calculation.
            </span>
        </div>

    </div>


    <div class="script-note warning">

        <strong>
            Perhatikan resource GPU
        </strong>

        <p>
            Jangan meminta GPU hanya karena node memiliki GPU.
            Pastikan aplikasi yang digunakan memang mendukung GPU
            dan konfigurasi software sudah benar.
        </p>

    </div>

</div>


<!-- =========================================================
     DFT JOB
     ========================================================= -->

<div class="script-card" id="dft-job">

    <div class="script-card-header">

        <div class="script-card-title">

            <span class="script-number">
                03
            </span>

            <div>

                <div class="script-section-label">
                    FIRST-PRINCIPLES
                </div>

                <h2>
                    DFT Job
                </h2>

                <p>
                    Contoh workflow sederhana menggunakan Quantum ESPRESSO.
                </p>

            </div>

        </div>

        <span class="script-badge dft">
            DFT
        </span>

    </div>


    <div class="script-description">

        <p>
            Template ini menunjukkan pola umum menjalankan calculation
            first-principles menggunakan Quantum ESPRESSO.
        </p>

        <p>
            Nama module, executable, partition, dan parameter SLURM
            harus disesuaikan dengan instalasi HPC yang digunakan.
        </p>

    </div>


    <div class="script-workspace">

        <div class="script-code-toolbar">

            <span class="script-code-language">
                QUANTUM ESPRESSO
            </span>

            <button
                class="script-copy-button"
                type="button">
                Salin Script
            </button>

        </div>


        <pre><code>#!/bin/bash

#SBATCH --job-name=lala002-qe
#SBATCH --partition=workshop
#SBATCH --nodes=1
#SBATCH --ntasks=4
#SBATCH --time=01:00:00

echo "Quantum ESPRESSO calculation"
echo "Hostname: $(hostname)"
echo "Date: $(date)"

# Sesuaikan dengan module yang tersedia
# module load quantum-espresso

mkdir -p output

pw.x \
    -in input/scf.in \
    > output/scf.out

echo "Calculation finished"
echo "Date: $(date)"</code></pre>

    </div>


    <div class="script-parameters">

        <div class="script-parameter">
            <code>pw.x</code>

            <span>
                Executable Quantum ESPRESSO untuk calculation
                yang menggunakan input SCF.
            </span>
        </div>


        <div class="script-parameter">
            <code>input/scf.in</code>

            <span>
                File input calculation. Pastikan file tersedia
                pada path yang digunakan.
            </span>
        </div>


        <div class="script-parameter">
            <code>output/scf.out</code>

            <span>
                File output yang menyimpan informasi calculation.
            </span>
        </div>


        <div class="script-parameter">
            <code>module load</code>

            <span>
                Mengaktifkan environment Quantum ESPRESSO sesuai
                nama module yang tersedia pada cluster.
            </span>
        </div>

    </div>


    <div class="script-note">

        <strong>
            Pemeriksaan DFT
        </strong>

        <p>
            Sebelum submission, periksa structure, pseudopotential,
            cutoff, k-point, parameter SCF, convergence criteria,
            dan software environment.
        </p>

    </div>

</div>


<!-- =========================================================
     MOLECULAR DYNAMICS
     ========================================================= -->

<div class="script-card" id="md-job">

    <div class="script-card-header">

        <div class="script-card-title">

            <span class="script-number">
                04
            </span>

            <div>

                <div class="script-section-label">
                    ATOMISTIC SIMULATION
                </div>

                <h2>
                    Molecular Dynamics
                </h2>

                <p>
                    Contoh template untuk calculation berbasis LAMMPS.
                </p>

            </div>

        </div>

        <span class="script-badge md">
            MD
        </span>

    </div>


    <div class="script-description">

        <p>
            Template berikut menunjukkan struktur umum job Molecular
            Dynamics menggunakan LAMMPS. File input LAMMPS menentukan
            system, force field, timestep, ensemble, temperature,
            pressure, dan jumlah langkah simulasi.
        </p>

    </div>


    <div class="script-workspace">

        <div class="script-code-toolbar">

            <span class="script-code-language">
                LAMMPS
            </span>

            <button
                class="script-copy-button"
                type="button">
                Salin Script
            </button>

        </div>


        <pre><code>#!/bin/bash

#SBATCH --job-name=lala002-md
#SBATCH --partition=workshop
#SBATCH --nodes=1
#SBATCH --ntasks=4
#SBATCH --time=02:00:00

echo "LAMMPS MD started"
echo "Hostname: $(hostname)"
echo "Date: $(date)"

# Sesuaikan dengan module yang tersedia
# module load lammps

mkdir -p output

lmp \
    -in input/md.in \
    -log output/md.log

echo "MD calculation finished"
echo "Date: $(date)"</code></pre>

    </div>


    <div class="script-parameters">

        <div class="script-parameter">
            <code>lmp</code>

            <span>
                Executable LAMMPS. Nama executable dapat berbeda
                pada setiap cluster.
            </span>
        </div>


        <div class="script-parameter">
            <code>input/md.in</code>

            <span>
                File input yang berisi konfigurasi Molecular Dynamics.
            </span>
        </div>


        <div class="script-parameter">
            <code>-log</code>

            <span>
                Menentukan file log untuk menyimpan informasi calculation.
            </span>
        </div>


        <div class="script-parameter">
            <code>--ntasks</code>

            <span>
                Menentukan jumlah task yang digunakan calculation.
                Sesuaikan dengan konfigurasi paralel LAMMPS.
            </span>
        </div>

    </div>


    <div class="script-note">

        <strong>
            Pemeriksaan workflow MD
        </strong>

        <p>
            Sebelum menjalankan simulasi, periksa system preparation,
            potential atau force field, timestep, ensemble,
            temperature, pressure, equilibration, dan production run.
        </p>

    </div>

</div>


<!-- =========================================================
     INTERACTIVE SCRIPT EDITOR
     ========================================================= -->

<div class="script-editor-section">

    <div class="script-editor-intro">

        <div>

            <span class="script-section-label">
                INTERACTIVE TOOL
            </span>

            <h2>
                Job Script Editor
            </h2>

            <p>
                Gunakan editor berikut untuk mencoba mengubah
                parameter job script sebelum menyimpannya sebagai
                file <code>.slurm</code>.
            </p>

        </div>

        <div class="script-editor-status">
            PRACTICE MODE
        </div>

    </div>


    <div class="script-editor-help">

        <strong>
            Cara menggunakan editor
        </strong>

        <p>
            Klik <strong>Edit Script</strong>, ubah parameter yang
            diperlukan, kemudian gunakan <strong>Validasi Script</strong>
            untuk memeriksa struktur dasar SLURM. Tombol validasi
            tidak menjalankan job dan tidak mengirim script ke HPC.
        </p>

    </div>


    <div class="script-editor">

        <div class="script-editor-header">

            <div>

                <span class="script-editor-label">
                    JOB SCRIPT EDITOR
                </span>

                <span class="script-editor-help-inline">
                    Edit script pada area putih di bawah
                </span>

            </div>

            <span
                class="script-line-counter"
                data-line-count>
                0 baris
            </span>

        </div>


        <textarea
            id="job-script-editor"
            spellcheck="false">#!/bin/bash

#SBATCH --job-name=lala002-test
#SBATCH --partition=workshop
#SBATCH --nodes=1
#SBATCH --ntasks=4
#SBATCH --time=01:00:00

echo "Job started"
echo "Hostname: $(hostname)"
echo "Date: $(date)"

# Tambahkan module dan executable sesuai kebutuhan calculation.
# module load your-software
# your_program input.in</textarea>


        <div class="script-editor-actions">

            <button
                type="button"
                class="script-editor-button primary"
                data-action="edit">
                Edit Script
            </button>

            <button
                type="button"
                class="script-editor-button"
                data-action="copy">
                Salin
            </button>

            <button
                type="button"
                class="script-editor-button validate"
                data-action="validate">
                Validasi Script
            </button>

            <button
                type="button"
                class="script-editor-button reset"
                data-action="reset">
                Reset
            </button>

        </div>


        <div
            class="script-validation">
        </div>

    </div>


    <div class="script-editor-warning">

        <strong>
            Penting
        </strong>

        <p>
            Editor ini hanya membantu latihan dan pemeriksaan
            struktur dasar. Validasi tidak menjamin job dapat
            berjalan pada HPC. Sebelum submission, tetap periksa
            partition, resource, module, executable, input,
            output path, dan aturan cluster.
        </p>

    </div>

</div>


<!-- =========================================================
     SBATCH REFERENCE
     ========================================================= -->

<div class="script-card sbatch-reference">

    <div class="script-card-header">

        <div class="script-card-title">

            <span class="script-number">
                05
            </span>

            <div>

                <div class="script-section-label">
                    SLURM REFERENCE
                </div>

                <h2>
                    SBATCH Reference
                </h2>

                <p>
                    Parameter SLURM yang paling sering disesuaikan
                    dalam job script.
                </p>

            </div>

        </div>

        <span class="script-badge slurm">
            SLURM
        </span>

    </div>


    <div class="script-description">

        <p>
            Nilai parameter harus mengikuti kebijakan dan konfigurasi
            cluster. Jangan menyalin parameter dari cluster lain
            tanpa melakukan pemeriksaan terlebih dahulu.
        </p>

    </div>


    <div class="command-reference-table">

        <table>

            <thead>

                <tr>
                    <th>Parameter</th>
                    <th>Fungsi</th>
                    <th>Contoh</th>
                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>
                        <code>--job-name</code>
                    </td>

                    <td>
                        Memberikan nama pada job agar mudah dikenali
                        pada scheduler.
                    </td>

                    <td>
                        <code>--job-name=lala002</code>
                    </td>

                </tr>


                <tr>

                    <td>
                        <code>--partition</code>
                    </td>

                    <td>
                        Memilih partition yang digunakan oleh job.
                    </td>

                    <td>
                        <code>--partition=workshop</code>
                    </td>

                </tr>


                <tr>

                    <td>
                        <code>--nodes</code>
                    </td>

                    <td>
                        Menentukan jumlah node yang diminta.
                    </td>

                    <td>
                        <code>--nodes=1</code>
                    </td>

                </tr>


                <tr>

                    <td>
                        <code>--ntasks</code>
                    </td>

                    <td>
                        Menentukan jumlah task untuk job.
                    </td>

                    <td>
                        <code>--ntasks=4</code>
                    </td>

                </tr>


                <tr>

                    <td>
                        <code>--time</code>
                    </td>

                    <td>
                        Menentukan batas waktu maksimum job.
                    </td>

                    <td>
                        <code>--time=01:00:00</code>
                    </td>

                </tr>


                <tr>

                    <td>
                        <code>--gres</code>
                    </td>

                    <td>
                        Meminta resource tambahan seperti GPU,
                        jika cluster menggunakan konfigurasi tersebut.
                    </td>

                    <td>
                        <code>--gres=gpu:1</code>
                    </td>

                </tr>

            </tbody>

        </table>

    </div>

</div>


<!-- =========================================================
     CHECKLIST
     ========================================================= -->

<div class="script-checklist">

    <div class="script-checklist-heading">

        <span>
            BEFORE SUBMISSION
        </span>

        <h2>
            Checklist sebelum menjalankan sbatch
        </h2>

        <p>
            Gunakan checklist ini sebagai pemeriksaan akhir sebelum
            mengirim job ke scheduler.
        </p>

    </div>


    <div class="script-checklist-grid">

        <div>
            <span>01</span>
            <strong>Partition</strong>
            <small>
                Pastikan partition sesuai dengan akses pengguna.
            </small>
        </div>


        <div>
            <span>02</span>
            <strong>Input</strong>
            <small>
                Pastikan semua input file tersedia.
            </small>
        </div>


        <div>
            <span>03</span>
            <strong>Output</strong>
            <small>
                Pastikan lokasi output sudah benar.
            </small>
        </div>


        <div>
            <span>04</span>
            <strong>Software</strong>
            <small>
                Pastikan module dan environment tersedia.
            </small>
        </div>


        <div>
            <span>05</span>
            <strong>Executable</strong>
            <small>
                Pastikan program dapat ditemukan dan dijalankan.
            </small>
        </div>


        <div>
            <span>06</span>
            <strong>Resource</strong>
            <small>
                Sesuaikan CPU, GPU, memory, dan wall time.
            </small>
        </div>


        <div>
            <span>07</span>
            <strong>Path</strong>
            <small>
                Periksa kembali semua path input dan output.
            </small>
        </div>


        <div>
            <span>08</span>
            <strong>Script</strong>
            <small>
                Periksa script sebelum melakukan submission.
            </small>
        </div>

    </div>

</div>


<!-- =========================================================
     FINAL ACTION
     ========================================================= -->

<div class="environment-banner">

    <div>

        <span>
            READY TO SUBMIT?
        </span>

        <h2>
            Script sudah diperiksa?
        </h2>

        <p>
            Simpan script sebagai file dengan ekstensi
            <code>.slurm</code>, kemudian jalankan submission
            dari terminal HPC.
        </p>

    </div>


    <div class="environment-command">

        <code>
            sbatch scripts/run.slurm
        </code>

        <small>
            Setelah submission, gunakan squeue untuk memantau job.
        </small>

    </div>


    <div class="environment-next">

        <strong>
            Langkah berikutnya
        </strong>

        <p>
            Gunakan <code>squeue -u $USER</code> untuk melihat status
            job. Setelah job selesai, periksa output dan lanjutkan
            ke proses analisis.
        </p>

    </div>

</div>


</div>
