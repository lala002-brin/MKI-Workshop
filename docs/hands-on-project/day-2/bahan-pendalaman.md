<div class="workshop-content">

<section class="workshop-section">


<h2>
Bahan pendalaman
</h2>


<h3>
A. Troubleshooting
</h3>


<table>

<thead>

<tr>

<th>
Masalah
</th>

<th>
Pemeriksaan cepat
</th>

</tr>

</thead>


<tbody>


<tr>

<td>
DFTB+ tidak ditemukan
</td>

<td>
command -v dftb+; module list; conda env
</td>

</tr>


<tr>

<td>
Parameter hilang
</td>

<td>
find parameter/SK -name "*.skf" | head
</td>

</tr>


<tr>

<td>
Gagal parsing input file
</td>

<td>
Cek kurung {}, nama blok, ParserVersion
</td>

</tr>


<tr>

<td>
Gagal melakukan SCC
</td>

<td>
Cek geometri, charge, parameter, SccTolerance/iterations
</td>

</tr>


<tr>

<td>
MD tidak stabil
</td>

<td>
Perkecil time step, relaksasi struktur awal, cek temperatur
</td>

</tr>


<tr>

<td>
Hasil analisis kosong
</td>

<td>
Pastikan trajectory benar-benar ditulis dan format cocok
</td>

</tr>


<tr>

<td>
Proses restart gagal
</td>

<td>
Gunakan geometri akhir, velocity, dan charges.bin yang konsisten
</td>

</tr>


</tbody>

</table>



<h3>
B. Lembar kerja peserta
</h3>


<h4>
B.1 Catatan awal
</h4>


<p>
Versi DFTB+: ______________________________
</p>


<p>
Set parameter Slater–Koster: ______________________________
</p>


<p>
Direktori kerja: ______________________________
</p>


<p>
Jumlah atom / muatan / PBC: ______________________________
</p>


<p>
Time step / temperatur / jumlah langkah: ______________________________
</p>



<h4>
B.2 Elektrolit LiPF6/EC
</h4>


<p>
Posisi puncak RDF Li–O: ______________________________
</p>


<p>
Posisi puncak RDF Li–F: ______________________________
</p>


<p>
Bilangan koordinasi: ______________________________
</p>


<p>
Rentang fitting MSD: ______________________________
</p>


<p>
Catatan konvergensi SCC: ______________________________
</p>



<h4>
B.3 Antarmuka LiF–EC
</h4>


<p>
Jarak Okarbonil–Li awal/akhir: ______________________________
</p>


<p>
Perubahan orientasi EC: ______________________________
</p>


<p>
Tren muatan kelompok: ______________________________
</p>


</section>

</div>
<div class="workshop-content">

<section class="workshop-section">


<h4>
B.4 LiF DFTB+ vs MACE
</h4>


<p>
Volume minimum DFTB+: ______________________________
</p>


<p>
Volume minimum MACE: ______________________________
</p>


<p>
Perbedaan bentuk kurva: ______________________________
</p>


<p>
Satu uji sensitivitas tambahan: ______________________________
</p>



<h3>
C. Glosarium ringkas
</h3>


<table>

<thead>

<tr>
<th>
Istilah
</th>

<th>
Arti
</th>

</tr>

</thead>


<tbody>


<tr>
<td>
DFT
</td>

<td>
Metode struktur elektron berbasis kerapatan
</td>

</tr>


<tr>
<td>
DFTB
</td>

<td>
Aproksimasi DFT yang diparameterkan
</td>

</tr>


<tr>
<td>
DFTB+
</td>

<td>
Implementasi open-source DFTB dengan input HSD dan berbagai fitur
</td>

</tr>


<tr>
<td>
SCC
</td>

<td>
Iterasi muatan self-consistent
</td>

</tr>


<tr>
<td>
Slater–Koster
</td>

<td>
Parameter interaksi orbital pasangan unsur
</td>

</tr>


<tr>
<td>
HSD
</td>

<td>
Format input hierarkis DFTB+
</td>

</tr>


<tr>
<td>
PBC
</td>

<td>
Syarat batas periodik
</td>

</tr>


<tr>
<td>
MD
</td>

<td>
Integrasi gerak atom dari gaya
</td>

</tr>


<tr>
<td>
RDF
</td>

<td>
Fungsi distribusi radial
</td>

</tr>


<tr>
<td>
MSD
</td>

<td>
Mean squared displacement
</td>

</tr>


<tr>
<td>
MACE
</td>

<td>
Potensial machine learning berbasis equivariant message passing
</td>

</tr>


</tbody>

</table>



<h3>
D. Peta paket yang disarankan
</h3>


<pre><code class="language-text">
workshop_material/

├── kasus/
│
├── 01_elektrrolit_lipf6_ec/
│
├── 02_antarmuka_lif_ec/
│
├── 03_katalisis_pt_co/
│
├── 04_biomedis_ibuprofen/
│
└── 05_baterai_lif_cos/

├── skrip/
│
├── job_dftbplus_slurm.sh
│
├── buat_elektrolit_lipf6_ec_dftbplus.py
│
├── buat_antarmuka_lif_ec_dftbplus.py
│
└── scan_dftbplus.py
</code></pre>


</section>

</div>
<div class="workshop-content">

<section class="workshop-section">


<h3>
E. Template input DFTB+ minimum
</h3>


<pre><code class="language-hsd">
Geometry = GenFormat {
  &lt;&lt;&lt; "geo.gen"
}


Hamiltonian = DFTB {

  Scc = Yes


  SlaterKosterFiles = Type2FileNames {

    Prefix = "../parameter/SK/"

    Separator = "-"

    Suffix = ".skf"

  }


  MaxAngularMomentum {

    # Isi sesuai spesies dan parameter yang digunakan

  }


  Charge = 0

}


Options {

  WriteDetailedOut = Yes

}


ParserOptions {

  ParserVersion = 14

}
</code></pre>



<h3>
F. Bacaan lanjutan
</h3>


<ul>

<li>
DFTB+ Developers Group. DFTB+ documentation and Reference Manual, versi stabil 25.1.
</li>


<li>
DFTB+ Recipes, bagian Basic Usage and Molecular Dynamics.
</li>


<li>
DFTB+ Developers Group. Recent Developments in DFTB+, J. Phys. Chem. (2025).
</li>


<li>
Dokumentasi Atomic Simulation Environment (ASE) untuk antarmuka DFTB+ dan workflow NEB.
</li>


<li>
Dokumentasi MACE untuk model pralatih, kalkulator ASE, dan evaluasi energi/gaya.
</li>


</ul>



<p>
Sumber daring utama:
</p>


<ul>

<li>
https://dftbplus.org/documentation.html
</li>


<li>
https://dftbplus-recipes.readthedocs.io/
</li>


</ul>



<h3>
G. Ringkasan migrasi dari modul lama
</h3>


<p>
Perubahan inti yang harus diterapkan pada seluruh paket workshop:
</p>


<ul>


<li>
Ganti executable dftbdmd menjadi dftb+.
</li>


<li>
Ganti dftb.in menjadi dftb_in.hsd dan ubah generator input ke format HSD.
</li>


<li>
Ganti blok MD lama menjadi Driver = VelocityVerlet dan thermostat DFTB+.
</li>


<li>
Hapus keyword DC karena tidak memiliki padanan langsung dalam workflow DFTB+ ini.
</li>


<li>
Ubah parser keluaran dari dftb.out/traject/mulliken ke keluaran DFTB+ yang dipilih dan distandarkan.
</li>


<li>
Audit ulang seluruh set Slater–Koster untuk kompatibilitas DFTB+ dan kelengkapan pasangan unsur.
</li>


<li>
Ubah job Slurm, skrip pemeriksa input, pembaca energi, pembuat trajectory, dan workflow restart.
</li>


<li>
Untuk NEB, gunakan ASE + DFTB+ atau workflow eksternal yang tervalidasi.
</li>


</ul>


</section>

</div>
