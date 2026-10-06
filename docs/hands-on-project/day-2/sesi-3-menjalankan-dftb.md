<div class="workshop-content">

<section class="workshop-section">

<h1>
Sesi 3: membangun input dan menjalankan DFTB+
</h1>


<h2>
8. Menyusun dftb_in.hsd dari direktori kosong
</h2>


<p>
Latihan pertama memakai LiF delapan atom. Geometri ditulis dalam format GEN agar blok Hamiltonian tetap ringkas.
</p>


<h3>
8.1 Langkah I1 — siapkan struktur
</h3>


<p>
Buat direktori kerja dan siapkan file struktur <code>geo.gen</code>.
</p>


<pre><code class="language-bash">
cd ~/latihan_simulasi/workshop_material

mkdir -p proyek_pribadi/input_lif_manual

cd proyek_pribadi/input_lif_manual

nano geo.gen
</code></pre>


<p>
Isi file <code>geo.gen</code>:
</p>


<pre><code class="language-text">
8 S

Li F

1 1 0.000000
2 2 0.000000
3 2 0.000000
4 1 0.000000
5 2 2.010000
6 1 2.010000
7 1 2.010000
8 2 2.010000

0.0 0.0 0.0
4.020000 0.0 0.0
0.0 4.020000
0.0 0.0 4.020000

0.000000 0.000000 0.000000
2.010000 2.010000 0.000000
2.010000 0.000000 2.010000
0.000000 2.010000 2.010000
2.010000 2.010000 2.010000
0.000000 0.000000 2.010000
2.010000 0.000000 0.000000
0.000000 2.010000 0.000000

0.0 0.0
</code></pre>



<h3>
8.2 Langkah I2 — buat input HSD
</h3>


<p>
Buat file input DFTB+ dengan nama <code>dftb_in.hsd</code>.
</p>


<pre><code class="language-bash">
nano dftb_in.hsd
</code></pre>


<p>
Isi file <code>dftb_in.hsd</code>:
</p>


<pre><code class="language-hsd">
Geometry = GenFormat {

<<< "geo.gen"

}


Hamiltonian = DFTB {

Scc = Yes


SlaterKosterFiles = Type2FileNames {

Prefix = "../../parameter/SK/"

Separator = "-"

Suffix = ".skf"

}


MaxAngularMomentum {

Li = "p"

F = "p"

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


<p>
MaxAngularMomentum harus mengikuti basis yang didukung parameter yang digunakan. Contoh Li="p" dan F="p" harus diverifikasi terhadap set SK workshop; jangan menyalin nilai ini ke set parameter lain tanpa pemeriksaan.
</p>


</section>

</div>
<div class="workshop-content">

<section class="workshop-section">


<h3>
8.3 Langkah I3 — cek dan jalankan
</h3>


<p>
Periksa file input sebelum menjalankan simulasi DFTB+.
</p>


<pre><code class="language-bash">
ls -lh geo.gen dftb_in.hsd

dftb+ > run.log 2>&1

tail -n 40 run.log

grep -i "Total energy" detailed.out | tail
</code></pre>



<h3>
8.4 Kesalahan input yang sering terjadi
</h3>



<table>

<thead>

<tr>

<th>
Jenis Error
</th>

<th>
Penyebab umum
</th>

<th>
Tindakan
</th>

</tr>

</thead>


<tbody>


<tr>

<td>
File .skf tidak ditemukan
</td>

<td>
Kesalahan pada prefix atau path
</td>

<td>
Memeriksa pwd dan jalur relatif
</td>

</tr>


<tr>

<td>
Unknown species / l-shell
</td>

<td>
MaxAngularMomentum tidak cocok
</td>

<td>
Memeriksa dokumentasi parameter
</td>

</tr>


<tr>

<td>
SCC tidak konvergen
</td>

<td>
Geometri buruk/toleransi/model
</td>

<td>
Relaksasi awal, cek parameter, baca log
</td>

</tr>


<tr>

<td>
Periodic geometry salah
</td>

<td>
GEN lattice vectors salah
</td>

<td>
Visualisasikan sel sebelum run
</td>

</tr>


<tr>

<td>
dftb+ tidak ditemukan
</td>

<td>
Environment belum aktif
</td>

<td>
Module load/conda sesuai HPC
</td>

</tr>


</tbody>

</table>




<h2>
9. Contoh perhitungan yang menggunakan DFTB
</h2>



<h3>
9.1 Kasus 1 — MD larutan elektrolit LiPF<sub>6</sub>/EC
</h3>



<p>
Untuk sistem besar, struktur dan input sebaiknya dibuat oleh script.
</p>


<ul>

<li>
Script harus menghasilkan <code>geo.gen</code>
</li>

</ul>



<pre><code class="language-python">
python electrolyte.py
</code></pre>



<ul>

<li>
Script membangun molekul EC dengan RDKit, mengepaknya ke sel kubik, menempatkan Li<sup>+</sup> dekat O, lalu menambahkan PF<sub>6</sub><sup>−</sup>.
</li>


<li>
Jumlah LiPF<sub>6</sub> adalah jumlah EC dibagi enam.
</li>


<li>
Hasil meliputi <code>struktur.xyz</code>, <code>dftb_in.hsd</code>, <code>kelompok_atom.csv</code>, dan <code>ringkasan.txt</code>.
</li>


</ul>



<figure>

<img src="assets/images/lipf6-ec.png"
alt="Contoh struktur awal LiPF6 EC">


<figcaption>
Gambar 1. Contoh struktur awal LiPF<sub>6</sub>/EC
</figcaption>


</figure>




<h3>
9.2 Kasus 2 — antarmuka LiF/EC
</h3>



<pre><code class="language-python">
python interface.py
</code></pre>



<p>
Skrip membangun kisi papan catur Li/F sebanyak dua lapis, masing-masing 16 atom, lalu membuat satu molekul EC dengan RDKit. O karbonil ditempatkan di atas Li permukaan.
</p>



<p>
Urutan atom dijaga: atom 1–32 adalah slab, atom 33 adalah O karbonil, dan atom 33–42 membentuk EC.
</p>



<p>
Hasilnya struktur.xyz, dftb.inp, dan ringkasan.txt.
</p>



</section>

</div>
<div class="workshop-content">

<section class="workshop-section">


<figure>

<img src="assets/images/lif-ec-interface.png"
alt="Struktur awal antarmuka LiF/EC">


<figcaption>
Gambar 2. Struktur awal antarmuka LiF/EC
</figcaption>


</figure>



<h3>
9.3 Kasus 3 — Graphene/Asam Amino/Air
</h3>



<p>
Sistem ini dibuat dengan menggunakan packmol.
</p>



<h4>
Langkah 1
</h4>


<p>
Persiapkan file pelarut dan zat terlarut.
</p>



<p>
<strong>water.xyz</strong>
</p>



<pre><code class="language-text">
H    9.625597    6.787278    12.673000
H    9.625597    8.420323    12.673000
O    10.203012   7.603800    12.673000
</code></pre>



<p>
<strong>graphene_HU.xyz</strong>
</p>



<pre><code class="language-text">
163

Energy: -3275.875580135

C    1.32615   -0.67557   -0.94912
C    0.02714   -1.24617   -0.95339
C    1.48079    0.73455   -0.91872
C   -1.11773   -0.40777   -0.96762
C    0.33665    1.57333   -0.90866
C   -0.96383    1.00158   -0.92681
C    2.45994   -1.50735   -0.94161
C   -0.12683   -2.64379   -0.95593
C    2.76845    1.30076   -0.88510
...
</code></pre>




<h4>
Langkah 2
</h4>



<p>
Persiapkan file input packmol.
</p>



<p>
<strong>graphene_dds.in</strong>
</p>



<pre><code class="language-text">
tolerance 2.0

filetype xyz

output graphene-water.xyz


structure trp-complex.xyz

centerofmass

fixed 10.1 10.1 10.1 0.0 0.0 0.0

end structure


structure water.xyz

number 200

inside box 0.0 0.0 20.5 20.5 20.5

end structure
</code></pre>



<pre><code class="language-bash">
packmol &lt; graphene_dds.in
</code></pre>



<p>
Jika berhasil, file <code>graphene-water.xyz</code> akan terbentuk.
</p>




<h4>
Langkah 3
</h4>



<p>
Persiapkan file lattice parameter sesuai ukuran box.
</p>



<pre><code class="language-text">
lattice

20.5 0 0

0 20.5 0

0 0 20.5
</code></pre>




<h4>
Langkah 4
</h4>



<p>
Konversi menjadi .gen format.
</p>



<pre><code class="language-bash">
/xyz2gen graphene_water

lattice
</code></pre>



<p>
File .gen yang dihasilkan bisa menjadi input geometri.
</p>



</section>

</div>
<div class="workshop-content">

<section class="workshop-section">


<figure>

<img src="assets/images/graphene-amino-water.png"
alt="Struktur awal sistem graphene asam amino air">


<figcaption>
Gambar 3. Struktur awal sistem graphene/asam amino/air
</figcaption>


</figure>




<h3>
9.4 Kasus 4 — Interaksi ibuprofen–guanidin
</h3>



<p>
RDKit membangun ibuprofenat dan model gugus guanidinium arginina, menempatkannya berdekatan, dan melakukan praoptimasi MMFF94s. Skrip membuat tiga folder DFTB dengan koordinat fragmen yang sama seperti dalam kompleks agar energi interaksi dapat dihitung secara konsisten.
</p>



<pre><code class="language-python">
python interaction.py
</code></pre>



<p>
Skrip ini memerlukan RDKit dan NumPy. Ketika energi akhir tetap harus dihitung dengan DFTB-TBMD; praoptimasi MMFF94s hanya menyiapkan koordinat awal. Gunakan folder <code>--output</code> lain untuk seed lain. Berbeda dengan kasus sebelumnya, kasus ini perhitungan optimasi geometri statik serta sistem tidak bersifat periodik.
</p>





<h3>
9.5 Kerangka input MD
</h3>



<pre><code class="language-hsd">
Geometry = GenFormat {

&lt;&lt;&lt; "geo.gen"

}



Driver = VelocityVerlet {


TimeStep [fs] = 0.5


Steps = 1000


MovedAtoms = 1:-1



Thermostat = NoseHoover {


Temperature [Kelvin] = 350


CouplingStrength [cm^-1] = 3200


}



MDRestartFrequency = 100


}




Hamiltonian = DFTB {


Scc = Yes



SlaterKosterFiles = Type2FileNames {


Prefix = "../../parameter/SK/"


Separator = "-"


Suffix = ".skf"


}



MaxAngularMomentum {


H = "s"


C = "p"


O = "p"


F = "p"


P = "p"


Li = "p"


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



</section>

</div>
<div class="workshop-content">

<section class="workshop-section">


<h3>
VERIFIKASI PARAMETER
</h3>


<p>
Daftar momentum sudut di atas adalah template. Nilai final harus disesuaikan dengan set Slater–Koster yang benar-benar digunakan pada workshop. Sistem Li/P/F/C/H/O hanya boleh dijalankan bila seluruh pasangan yang diperlukan tersedia dan berasal dari parameterisasi yang kompatibel.
</p>




<h2>
10. Menjalankan melalui Slurm
</h2>



<p>
Berkas keluaran utama yang digunakan dalam proses analisis:
</p>



<table>

<thead>

<tr>

<th>
Berkas
</th>

<th>
Fungsi praktis
</th>

</tr>

</thead>



<tbody>


<tr>

<td>
<code>run.log</code>
</td>

<td>
stdout/stderr eksekusi
</td>

</tr>



<tr>

<td>
<code>detailed.out</code>
</td>

<td>
Energi, gaya, informasi rinci langkah/perhitungan
</td>

</tr>



<tr>

<td>
<code>geo_end.gen / geo_end.xyz</code>
</td>

<td>
Geometri akhir
</td>

</tr>



<tr>

<td>
<code>md.out</code>
</td>

<td>
Informasi dinamika/thermostat bila dihasilkan driver
</td>

</tr>



<tr>

<td>
<code>charges.bin</code>
</td>

<td>
Muatan SCC untuk restart
</td>

</tr>



<tr>

<td>
<code>trajectory XYZ</code>
</td>

<td>
Lintasan yang disiapkan oleh output/skrip workshop
</td>

</tr>


</tbody>

</table>




<h3>
Script Slurm
</h3>



<pre><code class="language-bash">
#!/bin/bash

#SBATCH --job-name=dftbplus_md
#SBATCH --time=01:00:00
#SBATCH --cpus-per-task=4


set -e


case_dir="$1"


cd "$case_dir"


export OMP_NUM_THREADS=${SLURM_CPUS_PER_TASK:-1}


dftb+ &gt; run.log 2&gt;&amp;1
</code></pre>




<p>
Partisi, account, jumlah CPU, dan batas waktu belum tentu persis seperti di atas, tetapi mengikuti kebijakan Mahameru pada saat workshop.
</p>



</section>

</div>
