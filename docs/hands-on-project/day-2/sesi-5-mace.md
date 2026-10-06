<div class="workshop-content">

<section class="workshop-section">


<h1>
Sesi 5: pemodelan material dengan MACE
</h1>


<h2>
15. MACE: potensial gaya dari data
</h2>


<p>
MACE memprediksi energi dan gaya menggunakan model
<em>machine learning</em> berbasis lingkungan atom.
Dalam workshop, MACE dipakai sebagai pembanding cepat terhadap kurva respons kisi LiF yang juga dihitung dengan DFTB+.
</p>


<h3>
15.1 Persamaan keadaan LiF
</h3>


<pre><code class="language-bash">
python skrip/scan_dftbplus.py --kasus lif --mode siapkan --output proyek_pribadi/scan_lif_dftbplus

python skrip/scan_mace.py --kasus lif --output proyek_pribadi/scan_lif_mace
</code></pre>


<ul>

<li>
Bandingkan bentuk kurva E(V), posisi minimum, dan gaya/tekanan relatif.
</li>


<li>
Jangan mengharapkan nilai energi absolut yang sama antara DFTB+ dan MACE.
</li>


<li>
Gunakan energi relatif terhadap minimum masing-masing model.
</li>


</ul>


<h2>
16. Menafsirkan perbandingan
</h2>


<ul>

<li>
Apakah kedua model memprediksi keadaan minimum pada volume yang serupa?
</li>


<li>
Apakah kelengkungan kurva serupa di sekitar daerah minimum?
</li>


<li>
Pada rentang volume manakah mulai terdapat perbedaan model?
</li>


<li>
Apakah konfigurasi yang diuji berada pada domain yang masuk akal untuk parameter/model yang digunakan?
</li>


</ul>


</section>

</div>
<div class="workshop-content">

<section class="workshop-section">


<h1>
Sesi 6: diskusi aplikasi dan hasil riset
</h1>


<h2>
17. Metode dan pertanyaan riset
</h2>


<p>
Metode komputasi dipilih berdasarkan pertanyaan, skala sistem, kebutuhan akurasi, dan biaya.
</p>


<p>
<strong>DFTB+</strong> cocok ketika diperlukan deskripsi kuantum yang lebih murah daripada DFT, sedangkan <strong>MACE</strong> dapat memberi percepatan lebih besar setelah model yang sesuai tersedia.
</p>



<table>

<thead>
<tr>
<th>
Aplikasi
</th>

<th>
Lingkup analisis
</th>

<th>
Metode latihan
</th>
</tr>
</thead>


<tbody>

<tr>

<td>
Elektrolit
</td>

<td>
Koordinasi dan mobilitas ion
</td>

<td>

<ul>
<li>DFTB+</li>
<li>MD</li>
<li>RDF/MSD</li>
</ul>

</td>

</tr>


<tr>

<td>
Antarmuka
</td>

<td>
Kontak pelarut-permukaan
</td>

<td>

<ul>
<li>DFTB+</li>
<li>Analisis geometri dan muatan</li>
</ul>

</td>

</tr>


<tr>

<td>
Katalisis
</td>

<td>
Jalur migrasi dan reaksi
</td>

<td>

<ul>
<li>DFTB+</li>
<li>Metode lintasan eksternal/ASE</li>
</ul>

</td>

</tr>


<tr>

<td>
Biomedis
</td>

<td>
Motif interaksi ionik dan ikatan hidrogen
</td>

<td>

<ul>
<li>DFTB+</li>
<li>Energi dan geometri</li>
</ul>

</td>

</tr>


<tr>

<td>
Padatan baterai
</td>

<td>
Respons kisi
</td>

<td>

<ul>
<li>DFTB+</li>
<li>MACE</li>
</ul>

</td>

</tr>


</tbody>

</table>



<div class="info-box">

<h3>
CATATAN NEB
</h3>

<p>
Untuk workshop DFTB+, NEB sebaiknya dijalankan melalui ASE atau workflow eksternal yang memakai DFTB+ sebagai kalkulator, bukan mengasumsikan sintaks NEB DFTB-MD dapat dipindahkan langsung.
</p>

</div>


</section>

</div>
