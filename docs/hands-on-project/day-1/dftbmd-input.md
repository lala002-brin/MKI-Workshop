# Sesi 3: membangun input dan menjalankan DCDFTBMD

## 9. Menyusun `dftb.inp` dari direktori kosong

Kasus elektrolit mempunyai 136 atom, sehingga inputnya lebih masuk akal jika dibuat oleh skrip. Sebelum membuat input, susun satu input LiF dengan delapan atom secara manual. Sistem ini juga dipakai dalam kasus respons kisi, sehingga latihan input langsung terhubung dengan analisis volume.

Susunan empat blok merujuk pada manual DCDFTBMD 2.0, yaitu keyword, judul, parameter, dan geometri. Keempat blok dipisahkan oleh baris kosong. Pada berkas latihan ini, baris geometri menggunakan simbol unsur tanpa angka setelahnya.

### 9.1 Langkah I1: buat direktori dan struktur dengan Python

```bash
cd ~/latihan_simulasi/workshop_material
```

Buat direktori proyek:

```bash
mkdir -p proyek_pribadi
```

Jalankan skrip untuk membuat struktur LiF:

```bash
python skrip/scan_dftb.py --kasus lif --mode siapkan --output proyek_pribadi/scan_lif_latihan
```

Buat direktori untuk latihan input manual:

```bash
mkdir -p proyek_pribadi/input_lif_manual
```

Masuk ke direktori tersebut:

```bash
cd proyek_pribadi/input_lif_manual
```

Periksa direktori kerja:

```bash
pwd
```

Periksa beberapa baris awal struktur XYZ:

```bash
head -n 10 ../../scan_lif_latihan/titik_02/struktur.xyz
```

`pwd` memastikan Anda berada di direktori yang baru dibuat. Skrip membuat lima skala kisi. Titik 02 mempunyai faktor skala 1,00 dan sisi 4,02 Å.

Struktur XYZ yang dibuat memuat delapan lambang atom dan koordinat. Dalam `dftb.inp`, kita juga harus menuliskan muatan total, multiplisitas, parameter setiap pasangan unsur, dan vektor sel.
## 9.2 Langkah I2: tulis berkas input

Perintah `cat` di bawah membuat berkas. Ketik semua baris hingga `EOF`, termasuk baris kosong di antara blok. Huruf `EOF` terakhir berdiri sendiri pada awal baris.

```bash
cat > dftb.inp <<'EOF'
SCC=TRUE
DC=FALSE
PBC=TRUE
LiF delapan atom; latihan input manual

2
Li 1
../../parameter/lili.spl ../../parameter/lif.spl
F 2
../../parameter/fli.spl ../../parameter/ff.spl

8 0 1
Li0 0.00000000 0.00000000 0.00000000
F0 0.00000000 0.00000000 2.01000000
F0 0.00000000 2.01000000 0.00000000
Li0 0.00000000 2.01000000 2.01000000
F0 2.01000000 0.00000000 0.00000000
Li0 2.01000000 0.00000000 2.01000000
Li0 2.01000000 2.01000000 0.00000000
F0 2.01000000 2.01000000 2.01000000
TV 4.02000000 0.00000000 0.00000000
TV 0.00000000 4.02000000 0.00000000
TV 0.00000000 0.00000000 4.02000000

EOF
```

Mengapa urutannya demikian? `SCC=TRUE` meminta iterasi muatan, sedangkan `DC=FALSE` memakai sistem utuh. `PBC=TRUE` meminta periodisitas.

Setelah judul, angka `2` berarti dua jenis atom. `Li 1` dan `F 2` menyatakan momentum sudut maksimum basis.

Masing-masing unsur diikuti satu baris berisi dua berkas Slater–Koster dalam urutan unsur yang ditulis: Li–Li, Li–F; kemudian F–Li, F–F. Empat berkas itu belum tersedia dalam paket dan harus berasal dari satu set yang kompatibel.

`8 0 1` berarti 8 atom, muatan total 0, dan multiplisitas 1. Nama `Li0` atau `F0` adalah label geometri yang dituliskan pada contoh resmi DCDFTBMD 2.0.

Pada `struktur.xyz`, unsur yang sama ditulis `Li` atau `F`. Kedua format berkas mempunyai aturan berbeda. Manual resmi mencontohkan `O0`, `H0`, dan `C0` di blok geometri `dftb.inp`. Karena itu, jangan menghapus angka `0` hanya berdasarkan aturan XYZ.

Angka `0` pada `Li0` dan `F0` juga bukan muatan atom. Muatan total berada pada baris `8 0 1`.

Tiga baris `TV` ditempatkan sesudah seluruh atom dan mendefinisikan sel kubik 4,02 Å. Baris kosong terakhir diperlukan untuk menutup blok geometri.
## 9.3 Langkah I3: cek isi tanpa menghitung

Periksa berkas yang baru dibuat:

```bash
wc -l dftb.inp
head -n 12 dftb.inp
tail -n 6 dftb.inp
cd ../..
python skrip/periksa_dcdftbmd.py \
proyek_pribadi/input_lif_manual
```

Pemeriksa harus mengenali struktur empat blok dan 8 baris atom. Jika muncul daftar `.spl` yang belum ada, itu berarti formatnya sudah terbaca tetapi parameter belum ditempatkan.

Jika muncul pesan `Jumlah atom tidak sesuai`, hitung ulang baris antara header `8 0 1` dan tiga `TV`.
## 9.4 Langkah I4: jalankan dan baca energi akhir

Setelah biner dan seluruh berkas parameter tersedia, jalankan:

```bash
python skrip/periksa_dcdftbmd.py \
proyek_pribadi/input_lif_manual --jalankan
```

Periksa keluaran:

```bash
ls proyek_pribadi/input_lif_manual/dftb.out
```

Baca energi akhir dan status perhitungan:

```bash
grep -E 'Final SCC-DFTB Energy|terminated normally' \
proyek_pribadi/input_lif_manual/dftb.out
```

Satu baris `Final SCC-DFTB Energy` dalam satuan Hartree dan pesan `terminated normally` menandai keluaran yang dapat dipakai untuk energi satu titik.

Skrip `skrip/baca_energi_dcdftbmd.py` memeriksa kedua hal itu. Energi satu titik sendiri belum menjelaskan kestabilan terhadap perubahan volume; lakukan scan pada kasus 5 untuk mendapatkan kurva.
## 9.5 Kesalahan input yang paling sering terjadi

| Pesan / gejala | Periksa dan perbaiki |
|---|---|
| Empat blok tidak terbaca | Pastikan hanya ada tiga pemisah blok berupa baris kosong, serta satu baris kosong di akhir berkas. |
| Jumlah parameter kurang | Untuk n unsur, tiap baris pasangan wajib memuat tepat n path; jumlah pasangan terurut adalah n². |
| `.spl` tidak ditemukan | Jalur relatif dihitung dari folder tempat `dftb.inp` dijalankan, bukan dari folder skrip. |
| Jumlah atom tidak cocok | Cocokkan angka pertama header geometri dengan jumlah baris atom. Tiga baris `TV` tidak dihitung sebagai atom. |
| Tidak ada `dftb.out` | Periksa kode keluar program dan `hasil.log`; jangan menjalankan parser energi sebelum perhitungan selesai. |
| Energi tidak konvergen | Periksa pesan SCC, parameter, geometri yang terlalu rapat, dan pengaturan perhitungan. |

### Hubungan ke kasus lebih besar

Generator elektrolit dan kompleks biomedis menulis keempat blok yang sama secara otomatis. Setelah menjalankan generator, buka bagian awal input dan cocokkan fungsi setiap blok dengan latihan manual ini.

Pada input MD terdapat tambahan `MD=(...)`; pada optimasi terdapat `OPT=(...)`.
# 10 · Membangun struktur sendiri dengan skrip Python

Pada kelima kasus, Anda menjalankan skrip Python untuk membuat struktur.xyz dan dftb.inp di folder `proyek_pribadi`. Folder tersebut berisi contoh pembanding, perhitungan, dan keluaran yang dihasilkan.

Skrip membentuk geometri awal, bukan struktur yang telah mencapai keadaan setimbang. Periksa koordinat di VMD sebelum menjalankan perhitungan.

## 10.1 · Cara membaca satu perintah Python

Pada Termius, masuk ke folder paket dan pastikan lokasinya benar:

```bash
cd ~/latihan_simulasi/workshop_material
pwd
mkdir -p proyek_pribadi
```

Kata `python` menjalankan interpreter. Nama setelahnya adalah jalur skrip di dalam folder `skrip`.

Opsi dimulai dengan dua tanda minus, seperti `--seed`. Nilai setelahnya berlaku hanya untuk opsi itu.

Opsi `--output` menentukan lokasi berkas baru. Ketika seluruh baris dalam satu kotak sudah selesai, tekan Enter sekali.

Sebelum membuat struktur, lihat daftar opsi yang diterima skrip. Contoh:

```bash
python skrip/buat_elektron_lipf6_ec.py --help
```

Opsi `--help` hanya menampilkan panduan. Opsi ini tidak membuat berkas.

Setelah menjalankan generator, periksa isi folder dengan `ls`, baca `ringkasan.txt`, lalu lihat beberapa baris awal `struktur.xyz` dan `dftb.inp`.

Baca geometri sebelum menjalankan perhitungan. Pastikan jumlah atom, simbol unsur, dan ukuran sel sesuai dengan kasus yang dikerjakan.
<h3>10.2 · Kasus elektrolit: <code>buat_elektron_lipf6_ec.py</code></h3>

<div class="foundation-sk-main">

<p>
Skrip membangun molekul EC dengan RDKit, mengepaknya ke sel kubik, menempatkan Li<sup>+</sup> dekat O, lalu menambahkan PF<sub>6</sub><sup>−</sup>. Jumlah LiPF<sub>6</sub> adalah jumlah EC dibagi enam. Hasil meliputi <code>struktur.xyz</code>, <code>dftb.inp</code>, <code>kelompok_atom.csv</code>, dan <code>ringkasan.txt</code>.
</p>

<div class="foundation-table-wrap">

<table>
<thead>
<tr>
<th>Opsi</th>
<th>Arti dan nilai contoh</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--ec</code></td>
<td>Jumlah molekul EC; harus kelipatan enam. Nilai baku 12 menghasilkan 2 LiPF<sub>6</sub>.</td>
</tr>
<tr>
<td><code>--sel</code></td>
<td>Sisi sel kubik dalam Å; baku 12,3. Sel terlalu kecil dapat menggagalkan pengepakan.</td>
</tr>
<tr>
<td><code>--seed</code></td>
<td>Bilangan bulat untuk mengulang susunan awal acak; baku 27. Seed lain memberi konfigurasi awal berbeda.</td>
</tr>
<tr>
<td><code>--langkah</code></td>
<td>Banyak langkah MD dalam <code>dftb.inp</code>; baku 1000.</td>
</tr>
<tr>
<td><code>--dt-fs</code></td>
<td>Durasi satu langkah MD dalam femtosekon; baku 0,5 fs. Skrip mengubahnya menjadi detik untuk <code>DELTAT</code>.</td>
</tr>
<tr>
<td><code>--suhu</code></td>
<td>Temperatur awal dan termostat NVT dalam kelvin; baku 350 K.</td>
</tr>
<tr>
<td><code>--output</code></td>
<td>Folder baru bagi input dan struktur. Selalu gunakan jalur di <code>proyek_pribadi</code>.</td>
</tr>
</tbody>
</table>

</div>

<p>
Untuk perintah pada praktikum, <code>--langkah 1000</code> dan <code>--dt-fs 0.5</code> memberi waktu input 500 fs. Mengubah <code>--ec</code> atau <code>--sel</code> juga mengubah densitas; perbarui nilai <code>--sel</code> dalam skrip analisis RDF/MSD agar sesuai dengan sel yang benar-benar digunakan.
</p>

</div>
<h3>10.3 · Kasus antarmuka: <code>buat_antarmuka_lif_ec.py</code></h3>

<div class="foundation-sk-main">

<p>
Skrip membangun kisi padat LiF sebanyak dua lapis, masing-masing 16 atom, lalu membuat satu molekul EC dan menempatkannya di atas permukaan. O karbonil ditempatkan di atas Li permukaan. Urutan atom dijaga: atom 1–32 adalah slab, atom 33 adalah O karbonil, dan atom 33–42 membentuk EC.
</p>

<div class="foundation-table-wrap">

<table>
<thead>
<tr>
<th>Opsi</th>
<th>Arti dan nilai contoh</th>
</tr>
</thead>

<tbody>

<tr>
<td><code>--a</code></td>
<td>Parameter kisi LiF awal dalam Å; baku 4,02. Sisi lateral slab adalah 2a = 8,04 Å.</td>
</tr>

<tr>
<td><code>--tinggi</code></td>
<td>Tinggi sel arah z, termasuk ruang vakum; baku 16 Å.</td>
</tr>

<tr>
<td><code>--jarak-o-li</code></td>
<td>Jarak awal O karbonil ke Li tepat di bawahnya; baku 2,8 Å.</td>
</tr>

<tr>
<td><code>--sudut</code></td>
<td>Sudut rotasi EC mengitari sumbu z dalam derajat; baku 0. Mengubahnya memberi orientasi awal lain.</td>
</tr>

<tr>
<td><code>--seed</code></td>
<td>Seed pembuat konformer awal EC oleh RDKit; baku 27.</td>
</tr>

<tr>
<td><code>--langkah</code></td>
<td>Jumlah langkah MD; baku 1000.</td>
</tr>

<tr>
<td><code>--dt-fs</code></td>
<td>Durasi satu langkah MD; baku 0,5 fs.</td>
</tr>

<tr>
<td><code>--suhu</code></td>
<td>Temperatur NVT dalam kelvin; baku 350 K.</td>
</tr>

<tr>
<td><code>--output</code></td>
<td>Folder baru untuk hasil input dan struktur; praktikum memakai <code>proyek_pribadi/02_antarmuka_lif_ec</code>.</td>
</tr>

</tbody>
</table>

</div>

<p>
Saat <code>--a</code> diubah, masukkan 2a pada opsi <code>--sel-xy</code> ketika analisis antarmuka. Saat jumlah langkah, <code>--dt-fs</code>, atau <code>--suhu</code> diubah, gunakan nilai yang sama ketika membaca dan menganalisis trajectory.
</p>

</div>
<h3>10.4 · Kasus katalisis: <code>neb_dftb.py</code></h3>

<p>
ASE membangun slab Pt(111) berukuran 3 × 3 dan dua posisi ujung CO. Dalam mode siapkan, skrip membuat tujuh image interpolasi tanpa menjalankan DFTB. Dalam mode jalankan, skrip membangun struktur lagi di folder hasil baru, kemudian melakukan kedua ujung lalu menjalankan NEB menggunakan energi DCDFTBMD dan gaya beda hingga.
</p>

<div class="foundation-table-wrap">

<table>
<thead>
<tr>
<th>Opsi</th>
<th>Arti dan nilai contoh</th>
</tr>
</thead>

<tbody>

<tr>
<td><code>--mode</code></td>
<td>Siapkan: tulis geometri saja; jalankan: optimasi dan NEB; kumpulkan: baca energi sudah ada.</td>
</tr>

<tr>
<td><code>--images</code></td>
<td>Jumlah image termasuk dua ujung; baku 7. Minimum 3.</td>
</tr>

<tr>
<td><code>--langkah</code></td>
<td>Batas langkah optimasi NEB; baku 30.</td>
</tr>

<tr>
<td><code>--langkah-ujung</code></td>
<td>Batas langkah optimasi masing-masing struktur ujung; baku 30.</td>
</tr>

<tr>
<td><code>--fmax</code></td>
<td>Ambang gaya maksimum untuk menyatakan konvergensi, eV/Å; baku 0,12.</td>
</tr>

<tr>
<td><code>--delta</code></td>
<td>Pergeseran koordinat untuk beda hingga gaya; baku 0,01.</td>
</tr>

<tr>
<td><code>--program</code></td>
<td>Nama program DFTB yang dieksekusi; baku <code>dftb</code>.</td>
</tr>

<tr>
<td><code>--parameter-dir</code></td>
<td>Folder parameter Slater–Koster Pt/C/O; baku folder <code>parameter/PtC/O</code> dalam paket.</td>
</tr>

<tr>
<td><code>--output</code></td>
<td>Folder hasil baru. Gunakan nama berlainan untuk tahap siapkan dan jalankan.</td>
</tr>

</tbody>
</table>

</div>

<p>
<code>image_00</code> dan <code>image_06</code> adalah ujung untuk tujuh image. Pada tahap siapkan, tidak ada <code>profil_neb.csv</code> atau status terhubung. Bacalah <code>status_neb.txt</code> pada tahap jalankan; barrier dari lintasan yang belum konvergen harus ditandai sebagai sementara.
</p>
<h3>10.5 · Kasus biomedis: <code>buat_model_ibuprofen_arginin.py</code></h3>

<div class="foundation-sk-main">

<p>
RDKit membangun ibuprofenat dan model gugus guanidinium arginina, menempatkannya berdekatan, dan melakukan proptimasi MMFF94s. Skrip membuat tiga folder DFTB dengan koordinat fragmen yang sama seperti dalam kompleks agar energi interaksi dapat dihitung secara konsisten.
</p>

<div class="foundation-table-wrap">

<table>
<thead>
<tr>
<th>Opsi</th>
<th>Arti dan nilai contoh</th>
</tr>
</thead>

<tbody>

<tr>
<td><code>--seed</code></td>
<td>Seed konformer awal RDKit; baku 17. Mengubah seed dapat menghasilkan pose awal berbeda.</td>
</tr>

<tr>
<td><code>--output</code></td>
<td>Folder baru yang berisi kompleks, ibuprofenat, guanidinium, <code>kontak.csv</code>, dan <code>ringkasan.txt</code>.</td>
</tr>

</tbody>
</table>

</div>

<p>
Skrip ini memerlukan RDKit dan NumPy. Ketiga energi akhir tetap harus dihitung dengan DCDFTBMD; proptimasi MMFF94s hanya menyiapkan koordinat awal. Gunakan folder <code>--output</code> lain untuk seed lain.
</p>

</div>
<h3>10.6 · Kasus respons kisi: <code>scan_dftb.py</code></h3>

<div class="foundation-sk-main">

<p>
Skrip membuat lima struktur LiF pada faktor skala 0,96; 0,98; 1,00; 1,02; dan 1,04. Setiap faktor mengubah posisi atom sekaligus tiga vektor sel. Skrip menulis <code>parameter.csv</code> yang menghubungkan nilai skala ke folder <code>titik_00</code> sampai <code>titik_04</code>.
</p>

<div class="foundation-table-wrap">

<table>
<thead>
<tr>
<th>Opsi</th>
<th>Arti dan nilai contoh</th>
</tr>
</thead>

<tbody>

<tr>
<td><code>--kasus</code></td>
<td>Pilihan struktur; saat ini hanya LiF. Opsi ini wajib.</td>
</tr>

<tr>
<td><code>--mode</code></td>
<td>Siapkan: buat lima input; jalankan: buat dan hitung kelimanya; kumpulkan: baca energi pada folder hasil yang sudah ada. Baku siapkan.</td>
</tr>

<tr>
<td><code>--program</code></td>
<td>Program perhitungan pada mode jalankan; baku <code>dcdftbmd</code>.</td>
</tr>

<tr>
<td><code>--output</code></td>
<td>Folder baru untuk scan; praktikum memakai nama berbeda untuk persiapan dan hasil perhitungan.</td>
</tr>

</tbody>
</table>

</div>

<p>
Setiap <code>titik_XX</code> berisi <code>struktur.xyz</code> dan <code>dftb.inp</code>. Hanya mode jalankan yang menghasilkan <code>dftb.out</code>; <code>profil.csv</code> disusun dari titik yang selesai dengan energi sah. Model MACE dibahas sesudah seri geometri ini.
</p>

</div>
<div class="foundation-sk-title">

<h1>11 Sesi 3: menyiapkan dan menjalankan DCDFTBMD</h1>

</div>

<div class="foundation-sk-main">

<p>
Semua perintah dalam bab ini dimulai dari
<code>~/latihan_simulasi/workshop_material</code>, kecuali jika ada perintah
<code>cd</code> lain.
</p>

<p>
Periksa hasilnya sebelum lanjut. Setiap kotak berbagi hijau berisi satu
perintah yang diakhiri dengan satu kali Enter.
</p>

<p>
Setiap job harus dibuka sesudah selesai. Setiap job harus membuka sesi
Terminus baru, lalu kembali ke direktori paket dengan
<code>cd /latihan_simulasi/workshop_material</code>.
</p>

<p>
Sesudah perhitungan, unduh hasil dengan SFTP dan buka lintasan di VMD
Windows. Setelah <code>sbatch</code>, ulangi
<code>squeue -u $(whoami)</code> sampai job selesai. Kemudian periksa
<code>dftb.out</code> atau berkas status sebelum menjalankan analisis
berikutnya.
</p>

</div>

<div class="foundation-sk-note">

<h4>DIREKTORI KERJA</h4>

<p>
Direktori <code>proyek_pribadi</code> menjadi tempat keluaran Anda.
Gunakan direktori tersebut untuk menyimpan hasil perhitungan sehingga
berkas contoh dan hasil kerja tidak tercampur.
</p>

</div>

<div class="foundation-sk-main">

<p>
Berkas contoh dalam kasus berfungsi sebagai acuan pemeriksaan, sedangkan
struktur latihan dibuat dengan skrip Python.
</p>

<p>
Setiap kasus mempunyai tiga tahap utama:
<strong>siapkan model</strong>, <strong>hitung</strong>, dan
<strong>analisis</strong>.
</p>

</div>

<div class="foundation-sk-note">

<h4>ALUR KERJA</h4>

<div class="foundation-sk-steps">

<div class="foundation-sk-step">
<span>01</span>
<div>
<strong>Siapkan model</strong>
<p>Pastikan struktur dan berkas input sudah tersedia dan sesuai.</p>
</div>
</div>

<div class="foundation-sk-step">
<span>02</span>
<div>
<strong>Hitung</strong>
<p>Jalankan DCDFTBMD dan tunggu sampai perhitungan selesai.</p>
</div>
</div>

<div class="foundation-sk-step">
<span>03</span>
<div>
<strong>Analisis</strong>
<p>Periksa keluaran dan gunakan hasil perhitungan untuk analisis.</p>
</div>
</div>

</div>

</div>

<div class="foundation-sk-note">

<h4>PENTING</h4>

<p>
Jangan mengisi lembar kerja dengan angka dari geometri awal bila
pertanyaannya memerlukan hasil MD, NEB, atau energi SCC-DFTB.
</p>
</div>
<div class="foundation-sk-main">

<div class="foundation-section-heading">
  <span class="foundation-section-number">11.1</span>
  <h3>Kasus 1 · koordinasi Li⁺ dalam LiPF₆/EC</h3>
</div>

<p>
<strong>Pertanyaan.</strong> Berapa jumlah O dari ethylene carbonate yang dekat dengan Li⁺,
dan bagaimana distribusinya berubah selama MD? Apakah ada kontak Li–F yang mengindikasikan pasangan ion?
</p>

<p>
Model awal berisi 12 EC dan 2 LiPF₆ dalam sel kubik 12,3 Å (136 atom).
Lama lintasan awal hanya 0,5 ps; hasilnya latihan metode, bukan sifat elektrolit yang telah konvergen.
</p>

<div class="foundation-image">
  <img src="../images/lipf6-ec.png" alt="Struktur awal LiPF₆/EC">
  <p class="foundation-image-caption">
    Gambar 4: Struktur awal LiPF₆/EC. Li biru, P jingga, F hijau, O merah.
    Gambar dihasilkan dengan VMD tanpa display.
  </p>
</div>

<h4>Langkah 1 · Buat tempat kerja</h4>

<p>
Pastikan direktori aktif benar; <code>mkdir -p</code> aman bila direktori sudah ada.
</p>

<div class="foundation-code">

<pre><code>cd ~/latihan_simulasi/workshop_material</code></pre>

</div>

<div class="foundation-code">

<pre><code>pwd</code></pre>

</div>

<div class="foundation-code">

<pre><code>mkdir -p proyek_pribadi</code></pre>

</div>

<div class="foundation-code">

<pre><code>python skrip/buat_elektron_lipf6_ec.py --help</code></pre>

</div>

</div>
<h4>Langkah 2 · Buat struktur dan input sendiri</h4>

<p>
Seed membuat pengepakan awal dapat diulang. Pilih nama direktori hasil yang belum ada; generator tidak menimpa hasil lama.
</p>

<div class="foundation-code">

<pre><code>python skrip/buat_elektron_lipf6_ec.py --seed 27 --langkah 1000 --output proyek_pribadi/lipf6_ec</code></pre>

</div>

<div class="foundation-code">

<pre><code>cd proyek_pribadi/lipf6_ec</code></pre>

</div>

<div class="foundation-code">

<pre><code>pwd</code></pre>

</div>

<div class="foundation-code">

<pre><code>cat ringkasan.txt</code></pre>

</div>

<div class="foundation-code">

<pre><code>head -n 6 struktur.xyz</code></pre>

</div>

<div class="foundation-code">

<pre><code>head -n 12 dftb.inp</code></pre>

</div>

<div class="foundation-code">

<pre><code>cd ../..</code></pre>

</div>

<p>
Baris pertama XYZ menyatakan jumlah atom; baris berikutnya judul. Pada input DCDFTBMD,
blok pertama memuat <code>SCC=TRUE</code>, <code>DC=FALSE</code>, <code>PBC=TRUE</code>,
dan <code>MD=(...)</code>. <code>NSTEP=1000</code> dengan
<code>DELTAT=5.0e-16 s</code> berarti 1000 × 0,5 fs = 500 fs.
<code>PRINT=10</code> menyimpan satu frame setiap 10 langkah, yaitu kira-kira setiap 5 fs.
</p>
<h4>Langkah 3 · Periksa parameter sebelum menghitung</h4>

<p>
Semua pasangan C, H, O, Li, P, dan F memerlukan berkas Slater–Koster yang konsisten.
Pemeriksa melaporkan berkas yang belum ada.
</p>

<div class="foundation-code">

<pre><code>python skrip/periksa_dcdftbmd.py proyek_pribadi/lipf6_ec</code></pre>

</div>

<div class="foundation-code">

<pre><code>ls parameter/*.spl</code></pre>

</div>

<div class="foundation-code">

<pre><code>command -v dftb_serial.00.x</code></pre>

</div>

<p>
Jika pemeriksa hanya menyatakan format input terbaca tetapi <code>.spl</code> belum lengkap,
tunggu set parameter dari fasilitator sebelum menjalankan DFTB. Jangan mencampur pasangan dari beberapa set.
</p>

<h4>Langkah 4 · Jalankan MD dan periksa keluaran</h4>

<p>
Kirim perhitungan ke Slurm. Skrip job memasuki folder kasus dan mengetik dcdftbmd; keluaran utamanya bernama dftb.out. Tunggu sampai job selesai sebelum membaca lintasan.
</p>

<div class="foundation-code">

<pre><code>sbatch skrip/job_dftb_slurm.sh proyek_pribadi/lipf6_ec</code></pre>

</div>

<div class="foundation-code">

<pre><code>squeue -u $(whoami)</code></pre>

</div>

<div class="foundation-code">

<pre><code>ls -lh proyek_pribadi/lipf6_ec/dftb.out</code></pre>

</div>

<div class="foundation-code">

<pre><code>ls -lh proyek_pribadi/lipf6_ec/traject</code></pre>

</div>

<div class="foundation-code">

<pre><code>ls -lh proyek_pribadi/lipf6_ec/mulliken</code></pre>

</div>

<div class="foundation-code">

<pre><code>tail -n 12 proyek_pribadi/lipf6_ec/dftb.out</code></pre>

</div>

<div class="foundation-code">

<pre><code>head -n 5 proyek_pribadi/lipf6_ec/traject</code></pre>

</div>

<p>
<code>traject</code> adalah deret frame koordinat XYZ. <code>mulliken</code> berisi muatan bersih tiap atom pada frame yang sama untuk versi serial dan OpenMP. Jika berkas tidak muncul, baca <code>dftb.out</code> dan catatan Slurm sebelum analisis.
</p>
