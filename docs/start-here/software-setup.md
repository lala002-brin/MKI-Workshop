# Software Setup

Sebelum mengikuti hands-on project, pastikan perangkat lunak yang diperlukan
sudah tersedia pada perangkat atau lingkungan komputasi yang digunakan.

Perangkat lunak workshop dibagi menjadi tiga tahap utama:

<div class="software-workflow">

<div class="software-workflow-item">
  <span class="software-workflow-number">01</span>
  <div>
    <strong>Preprocessing</strong>
    <p>Menyiapkan struktur sistem dan akses ke lingkungan komputasi.</p>
  </div>
</div>

<div class="software-workflow-arrow">↓</div>

<div class="software-workflow-item">
  <span class="software-workflow-number">02</span>
  <div>
    <strong>Process</strong>
    <p>Menjalankan perhitungan dan simulasi.</p>
  </div>
</div>

<div class="software-workflow-arrow">↓</div>

<div class="software-workflow-item">
  <span class="software-workflow-number">03</span>
  <div>
    <strong>Post-processing</strong>
    <p>Memvisualisasikan dan memeriksa hasil perhitungan.</p>
  </div>
</div>

</div>

---

## 01 · Preprocessing

Perangkat lunak pada tahap preprocessing digunakan untuk mempersiapkan
sistem sebelum proses simulasi dan perhitungan.

### Packmol

**Packmol** digunakan untuk menyusun dan menyiapkan konfigurasi awal sistem
molekuler sebelum simulasi.

<div class="software-card">

<div class="software-card-header">
  <span class="software-badge">PREPROCESSING</span>
  <h3>Packmol</h3>
</div>

<p>
Digunakan untuk menyiapkan konfigurasi awal sistem molekuler.
</p>

<a class="software-download"
   href="https://m3g.github.io/packmol/download.shtml"
   target="_blank">
  Download Packmol ↗
</a>

</div>

### Termius

**Termius** digunakan untuk melakukan koneksi ke lingkungan HPC melalui SSH.

<div class="software-card">

<div class="software-card-header">
  <span class="software-badge">PREPROCESSING</span>
  <h3>Termius</h3>
</div>

<p>
Digunakan untuk mengakses lingkungan HPC melalui koneksi SSH.
</p>

<a class="software-download"
   href="https://docs.termius.com/getting-started/download-termius"
   target="_blank">
  Download Termius ↗
</a>

</div>

---

## 02 · Process

Perangkat lunak pada tahap process digunakan untuk menjalankan
perhitungan computational materials science dan simulasi.

### Quantum ESPRESSO

**Quantum ESPRESSO** digunakan untuk melakukan perhitungan
berbasis first-principles.

<div class="software-card">

<div class="software-card-header">
  <span class="software-badge">PROCESS</span>
  <h3>Quantum ESPRESSO</h3>
</div>

<p>
Digunakan untuk menjalankan perhitungan berbasis first-principles.
</p>

<a class="software-download"
   href="https://www.quantum-espresso.org/login/?redirect_to=https://www.quantum-espresso.org/download-page"
   target="_blank">
  Download Quantum ESPRESSO ↗
</a>

</div>

### DC-DFTB-MD

**DC-DFTB-MD** digunakan untuk menjalankan simulasi
molecular dynamics berbasis DFTB.

<div class="software-card">

<div class="software-card-header">
  <span class="software-badge">PROCESS</span>
  <h3>DC-DFTB-MD</h3>
</div>

<p>
Digunakan untuk menjalankan simulasi molecular dynamics
berbasis Density-Functional Tight-Binding.
</p>

<a class="software-download"
   href="https://www.chem.waseda.ac.jp/dcdftbmd/?page_id=37&lang=en"
   target="_blank">
  Download DC-DFTB-MD ↗
</a>

</div>

---

## 03 · Post-processing

Perangkat lunak pada tahap post-processing digunakan untuk
memvisualisasikan dan memeriksa hasil perhitungan.

### XCrySDen

**XCrySDen** digunakan untuk visualisasi struktur dan hasil
perhitungan material.

<div class="software-card">

<div class="software-card-header">
  <span class="software-badge">POST-PROCESSING</span>
  <h3>XCrySDen</h3>
</div>

<p>
Digunakan untuk memvisualisasikan struktur dan hasil perhitungan.
</p>

<a class="software-download"
   href="http://www.xcrysden.org/Download.html"
   target="_blank">
  Download XCrySDen ↗
</a>

</div>

### VMD

**VMD** digunakan untuk visualisasi dan analisis sistem
molekuler serta trajectory hasil simulasi.

<div class="software-card">

<div class="software-card-header">
  <span class="software-badge">POST-PROCESSING</span>
  <h3>VMD</h3>
</div>

<p>
Digunakan untuk visualisasi dan analisis sistem molekuler
serta trajectory simulasi.
</p>

<a class="software-download"
   href="https://www.ks.uiuc.edu/Development/Download/download.cgi?PackageName=VMD"
   target="_blank">
  Download VMD ↗
</a>

</div>

### VESTA

**VESTA** digunakan untuk visualisasi struktur dan data kristal.

<div class="software-card">

<div class="software-card-header">
  <span class="software-badge">POST-PROCESSING</span>
  <h3>VESTA</h3>
</div>

<p>
Digunakan untuk memvisualisasikan struktur dan data kristal.
</p>

<a class="software-download"
   href="https://jp-minerals.org/vesta/en/download.html"
   target="_blank">
  Download VESTA ↗
</a>

</div>

---

## Software Workflow

Secara ringkas, software digunakan mengikuti alur:

<div class="software-flow">

<span>Packmol</span>
<span>→</span>
<span>Termius</span>
<span>→</span>
<span>Quantum ESPRESSO</span>
<span>→</span>
<span>DC-DFTB-MD</span>
<span>→</span>
<span>XCrySDen / VMD / VESTA</span>

</div>

> **Tip:** Instalasi software tidak selalu diperlukan pada perangkat peserta
> jika software tersebut sudah tersedia pada HPC workshop. Ikuti instruksi
> fasilitator mengenai software yang perlu dipasang secara lokal.
