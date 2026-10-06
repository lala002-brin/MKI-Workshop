<div class="workshop-content">


<section class="workshop-section">


<h1>
Sesi 4: Analisis Lintasan dan Antarmuka
</h1>


<h2>
11. Memahami output DFTB+
</h2>


<p>
Setelah simulasi selesai dijalankan, DFTB+ menghasilkan beberapa berkas keluaran yang digunakan untuk pemeriksaan hasil, analisis energi, struktur akhir, serta pengolahan data lintasan.
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


<p>
Nama file trajectory yang dipakai dalam analisis workshop harus distandarkan oleh skrip paket. Tujuannya agar skrip RDF/MSD tidak bergantung pada nama keluaran program yang berubah antarversi.
</p>



<h3>
11.1 RDF dan koordinasi
</h3>


<ul>

<li>
RDF g(r) mengukur distribusi jarak relatif terhadap distribusi acak pada kerapatan yang sama.
</li>

<li>
Bilangan koordinasi diperoleh dari integral RDF sampai minimum pertama yang dipilih secara fisik.
</li>

<li>
Untuk slab dengan vakum, RDF 3D isotropik dapat menyesatkan.
</li>

</ul>



<h3>
11.2 MSD, difusi, dan transport
</h3>


<ul>

<li>
MSD memerlukan lintasan yang menangani perpindahan melintasi batas periodik.
</li>

<li>
Gunakan unwrapped coordinates sebelum fitting bagian linear.
</li>

<li>
Estimasi difusi dari lintasan singkat adalah latihan metodologis, bukan nilai konvergen.
</li>

</ul>



<h3>
11.3 Muatan
</h3>


<ul>

<li>
Muatan Mulliken adalah pembagian populasi basis, bukan observable unik.
</li>

<li>
Gunakan untuk tren internal dengan metode/parameter yang sama, dan hindari membandingkan nilai absolut antarparameter tanpa validasi.
</li>

</ul>



<h2>
12. Kasus 2 — antarmuka LiF-EC
</h2>


<ul>

<li>
Visualisasikan slab dan vakum sebelum perhitungan.
</li>

<li>
Pantau jarak O karbonil EC ke Li permukaan.
</li>

<li>
Bandingkan muatan kelompok dengan referensi yang konsisten.
</li>

<li>
Jangan menyebut selisih energi sebagai energi adsorpsi tanpa perhitungan slab, molekul, dan sistem gabungan pada kondisi komputasi yang konsisten.
</li>

</ul>



<h2>
13. Dari tabel ke kesimpulan
</h2>


<div class="important-box">


<h3>
IMPORTANT QUESTIONS!
</h3>


<ol>

<li>
Apakah job selesai tanpa error?
</li>

<li>
Apakah perhitungan SCC konvergen pada frame yang dipakai?
</li>

<li>
Apakah struktur yang dihasilkan masuk akal?
</li>

<li>
Apakah sampling cukup untuk besaran yang dihitung?
</li>

<li>
Apakah perbandingan memakai komposisi dan referensi yang konsisten?
</li>

<li>
Apakah kesimpulan dibatasi oleh ukuran sistem dan panjang simulasi?
</li>

</ol>


</div>



<h2>
14. Visualisasi dengan VMD
</h2>


<p>
VMD dapat dipakai untuk struktur XYZ dan lintasan yang diekspor. Untuk struktur periodik, pastikan informasi sel tidak hilang saat konversi. Gunakan visualisasi sebagai pemeriksaan mutu sebelum analisis numerik.
</p>


</section>


</div>
