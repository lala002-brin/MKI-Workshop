<!-- =========================================================
     SESI 6 · PART 2
     Halaman 37
     ========================================================= -->

<section class="session-header">

  <h1>Sesi 6: hasil riset terbit Sakti Lab</h1>

  <p>15.45–16.30 | 6 Oktober 2026</p>

</section>


<section class="analysis-section">

  <h2>18 Riset Sakti Lab yang telah terbit</h2>

  <p>
    Sesi ini adalah presentasi hasil penelitian, bukan sesi praktik di Terminal.
    Contoh berikut berasal dari artikel jurnal yang sudah terbit. Setiap studi
    menjawab pertanyaan yang berbeda; metode yang dipakai pada artikel tidak
    selalu sama dengan model latihan berukuran kecil pada sesi sebelumnya.
    Tautan DOI membawa pembaca ke naskah sumber.
  </p>


  <h3>18.1 Elektrolit polimer: ke mana Li<sup>+</sup> berpindah?</h3>

  <p>
    Ishida, Sakti, Ndruru, dan Nakai meneliti campuran methyl cellulose (MC),
    carboxymethyl cellulose (CMC), ionic liquid [EMIM][CH<sub>3</sub>COO],
    dan LiClO<sub>4</sub> dengan molecular dynamics. Ketika fraksi ionic liquid
    meningkat, bilangan koordinasi asetat di sekitar Li<sup>+</sup> bertambah;
    interaksi Li<sup>+</sup> dengan polimer dan ClO<sub>4</sub><sup>−</sup>
    berkurang. Pesan desainnya adalah bahwa penambahan komponen untuk mempercepat
    transport juga mengubah lingkungan koordinasi ion. Besaran yang relevan
    adalah bilangan koordinasi, pergantian tetangga, dan perpindahan ion
    sepanjang lintasan, bukan satu jarak pada gambar awal.
  </p>

  <p class="analysis-reference">
    <em>J. Phys. Chem. B 129, 11522–11529 (2025).</em>
    <br>
    <a
      class="analysis-link"
      href="https://doi.org/10.1021/acs.jpcb.5c04146"
      target="_blank"
      rel="noopener"
    >
      DOI: 10.1021/acs.jpcb.5c04146
    </a>
  </p>


  <h3>18.2 Antarmuka baterai natrium: kimia permukaan menentukan respons</h3>

  <p>
    Maahury, Sakti, dan Nakai memakai DC-DFTB-MD dengan koreksi dispersi untuk
    antarmuka graphene oxide (GO) dengan elektrolit NaFSA/[C<sub>3</sub>C<sub>1</sub>Pyr]FSA.
    Artikel membandingkan gugus epoxide dan hydroxyl pada GO serta konsentrasi
    elektrolit. RDF, difusi Na, dan fluktuasi muatan menunjukkan bahwa identitas
    gugus permukaan dan komposisi elektrolit memengaruhi susunan ion dekat
    elektroda. Ini contoh langsung bagaimana kasus antarmuka perlu memeriksa
    struktur, muatan, dan dinamika secara bersama.
  </p>

  <p class="analysis-reference">
    <em>J. Phys. Chem. C 130, 4524–4537 (2026).</em>
    <br>
    <a
      class="analysis-link"
      href="https://doi.org/10.1021/acs.jpcc.5c07064"
      target="_blank"
      rel="noopener"
    >
      DOI: 10.1021/acs.jpcc.5c07064
    </a>
  </p>


  <h3>18.3 Katalisis: jalur reaksi menentukan rancangan ligan</h3>

  <p>
    Natawardaja, Indriyani, dan Sakti membandingkan jalur transfer hidrogen
    pada konversi furfural menjadi furfuryl alcohol oleh katalis cobalt(II)
    phenoxyimine, dengan isopropanol sebagai donor hidrogen. Perbandingan energi
    reaksi mendukung mekanisme yang analog dengan Meerwein–Ponndorf–Verley.
    Dalam studi katalisis, energi molekul reaktan saja tidak cukup: posisi dan
    energi keadaan peralihan serta jalur alternatif harus dibandingkan secara
    konsisten. Studi ini memakai DFT untuk mekanisme reaksi; jangan menyamakan
    hasilnya dengan latihan NEB CO/Pt pada lampiran.
  </p>

  <p class="analysis-reference">
    <em>Molecular Catalysis 587, 115469 (2025).</em>
    <br>
    <a
      class="analysis-link"
      href="https://doi.org/10.1016/j.mcat.2025.115469"
      target="_blank"
      rel="noopener"
    >
      DOI: 10.1016/j.mcat.2025.115469
    </a>
  </p>


  <h3>18.4 Biomedis: air memediasi perpindahan proton</h3>

  <p>
    Tang dan rekan, termasuk Sakti, meneliti tautomer histidine pada
    amyloid-β (1–40) dengan DC-DFTB-MD dan metadynamics. Simulasi melacak
    perubahan jarak ikatan, RDF dari air di dekat HIS13/HIS14, serta muatan
    Mulliken. Artikel melaporkan perpindahan proton yang dimediasi air dan
    hambatan energi bebas sekitar 3,51 kcal/mol dari 2D well-tempered
    metadynamics. Angka tersebut berasal dari sistem dan koordinat kolektif
    pada artikel; jangan menerapkannya langsung pada model ibuprofen–guanidinium
    dalam latihan lanjutan.
  </p>

  <p class="analysis-reference">
    <em>Communications Chemistry 8, 408 (2025).</em>
    <br>
    <a
      class="analysis-link"
      href="https://doi.org/10.1038/s42004-025-01790-x"
      target="_blank"
      rel="noopener"
    >
      DOI: 10.1038/s42004-025-01790-x
    </a>
  </p>

</section>
<!-- =========================================================
     SESI 6 · PART 3
     Halaman 38
     File: sesi-6-hasil-riset-terbit-sakti-lab.md
     ========================================================= -->

<section class="analysis-section">

  <figure class="analysis-figure">

    <img
      src="../images/amyloid-tautomerisasi.png"
      alt="Peristiwa tautomerisasi amyloid-beta, perubahan jarak, dan muatan Mulliken"
    >

    <figcaption class="analysis-figure-caption">
      Gambar 10: Peristiwa tautomerisasi amyloid-β(1–40), perubahan jarak,
      dan muatan Mulliken. Gambar 4 dari Tang dkk.,
      <em>Communications Chemistry</em> 8, 408 (2025), direproduksi utuh
      dengan atribusi menurut lisensi CC BY-NC-ND 4.0.
    </figcaption>

  </figure>

<h3>18.5 · Potential berbasis machine learning: struktur Li di antarmuka</h3>

<p>
  Maahury dan rekan memakai machine-learned interatomic potentials untuk
  memodelkan perubahan struktur permukaan lithium metal dalam elektrolit
  Li–S yang mengandung S<sub>8</sub>, propylene carbonate, dan LiOTf.
  Artikel mengukur agregasi Li, tinggi lonjakan permukaan, dan keteraturan
  lokal. Penulis secara eksplisit membatasi sifat potensial metal tersebut
  belum menggambarkan tegangan elektroda, transfer elektron, dan evolusi
  keadaan muatan secara langsung. Karena itu, kesimpulan yang terlihat
  adalah hasil simulasi perubahan struktur, bukan simulasi lengkap proses
  plating elektrokimia.
</p>

<p class="analysis-reference">
  <em>Journal of Computational Chemistry, 47(19), e70466 (2026).</em>
  <br>
  <a
    class="analysis-link"
    href="https://doi.org/10.1002/jcc.70466"
    target="_blank"
    rel="noopener"
  >
    DOI: 10.1002/jcc.70466
  </a>
</p>
<h3>18.6 · Pertanyaan penutup</h3>

<p>
  Saat membaca suatu hasil simulasi, identifikasi (1) pertanyaan ilmiahnya,
  (2) struktur dan metode yang dipakai, (3) besaran yang benar-benar dihitung,
  dan (4) batas kesimpulannya. Hubungkan RDF, bilangan koordinasi, MSD,
  muatan, atau profil energi dari praktikum dengan publikasi hanya setelah
  skala waktu, komposisi, parameter, dan metode telah dibandingkan.
</p>
