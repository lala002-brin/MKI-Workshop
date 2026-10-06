---
title: "Sesi 1 · Dari first principles ke molecular dynamics"
hide:
  - toc
---

<div class="s1-page">

  <section class="s1-hero">
    <div class="s1-session-badge">SESI 1</div>

    <h1>
      Dari <em>first principles</em> ke <em>molecular dynamics</em>
    </h1>

    <div class="s1-hero-line"></div>
  </section>


  <section class="s1-card">

    <div class="s1-heading">
      <div class="s1-heading-number">2</div>

      <div class="s1-heading-content">
        <span class="s1-kicker">HASIL BELAJAR</span>

        <h2>
          Hasil belajar dan rangkaian kegiatan
        </h2>
      </div>
    </div>


    <div class="s1-outcomes">

      <div class="s1-outcome">
        <span class="s1-check">✓</span>
        <p>
          Membaca dan menyusun <code>dftb_in.hsd</code> dengan format HSD.
        </p>
      </div>

      <div class="s1-outcome">
        <span class="s1-check">✓</span>
        <p>
          Menjelaskan hubungan DFT, DFTB, SCC, dan parameter Slater-Koster.
        </p>
      </div>

      <div class="s1-outcome">
        <span class="s1-check">✓</span>
        <p>
          Menjalankan energi satu titik, optimasi sederhana, dan MD NVT dengan DFTB+.
        </p>
      </div>

      <div class="s1-outcome">
        <span class="s1-check">✓</span>
        <p>
          Menganalisis RDF, koordinasi, MSD, tren muatan, dan struktur antarmuka.
        </p>
      </div>

      <div class="s1-outcome">
        <span class="s1-check">✓</span>
        <p>
          Membandingkan respons energi serta struktur dari DFTB+ dan MACE secara hati-hati.
        </p>
      </div>

    </div>


    <div class="s1-schedule">

      <div class="s1-small-label">
        RANGKAIAN KEGIATAN
      </div>

      <div class="s1-table-wrap">

        <table class="s1-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Durasi</th>
              <th>Topik</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>08.45–09.30</td>
              <td>45 menit</td>
              <td>Pengantar DFT, DFTB, SCC, MD, dan alur DFTB+</td>
            </tr>

            <tr>
              <td>10.30–12.00</td>
              <td>90 menit</td>
              <td>
                Praktik menyusun file input DFTB+ dan MD untuk sistem elektrolit
                LiPF<sub>6</sub>/EC
              </td>
            </tr>

            <tr>
              <td>13.00–14.30</td>
              <td>90 menit</td>
              <td>
                Analisis RDF, koordinasi, MSD, muatan, dan antarmuka LiF–EC
              </td>
            </tr>

            <tr>
              <td>14.30–15.15</td>
              <td>45 menit</td>
              <td>MACE dan persamaan keadaan LiF</td>
            </tr>

            <tr>
              <td>15.45–16.30</td>
              <td>45 menit</td>
              <td>Diskusi aplikasi baterai, katalisis, dan biomedis</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>

  </section>


  <section class="s1-card">

    <div class="s1-heading">
      <div class="s1-heading-number">3</div>

      <div class="s1-heading-content">
        <span class="s1-kicker">SISTEM ATOMISTIK</span>

        <h2>
          Struktur atom dan pertanyaan ilmiah
        </h2>
      </div>
    </div>


    <div class="s1-body">
      <p>
        Satu konfigurasi atom adalah daftar spesies dan posisi atom.
        Untuk sistem periodik, geometri juga memuat vektor kisi.
        DFTB+ dapat membaca format GEN secara langsung melalui blok Geometry.
        Pada antarmuka, ruang vakum dan orientasi slab harus didefinisikan secara eksplisit.
      </p>
    </div>


    <div class="s1-map">

      <div class="s1-map-head">
        <div>SISTEM</div>
        <div>PERTANYAAN</div>
        <div>BESARAN</div>
      </div>


      <div class="s1-map-row">
        <div class="s1-system s1-yellow">
          LiPF<sub>6</sub>/EC
        </div>

        <div class="s1-connector"></div>

        <div class="s1-question s1-question-blue">
          Bagaimana lingkungan koordinasi Li<sup>+</sup>?
        </div>

        <div class="s1-connector"></div>

        <div class="s1-measure s1-measure-blue">
          RDF Li-O/Li-F, koordinasi, MSD, dan muatan
        </div>
      </div>


      <div class="s1-map-row">
        <div class="s1-system s1-cyan">
          LiF-EC
        </div>

        <div class="s1-connector"></div>

        <div class="s1-question s1-question-green">
          Bagaimana EC berinteraksi dengan permukaan?
        </div>

        <div class="s1-connector"></div>

        <div class="s1-measure s1-measure-green">
          Jarak O-Li, muatan, dan energi relatif
        </div>
      </div>


      <div class="s1-map-row">
        <div class="s1-system s1-yellow">
          CO/Pt(111)
        </div>

        <div class="s1-connector"></div>

        <div class="s1-question s1-question-blue">
          Bagaimana jalur migrasi?
        </div>

        <div class="s1-connector"></div>

        <div class="s1-measure s1-measure-blue">
          Profil energi/barrier
        </div>
      </div>


      <div class="s1-map-row">
        <div class="s1-system s1-cyan">
          Ibuprofena-Arginina
        </div>

        <div class="s1-connector"></div>

        <div class="s1-question s1-question-green">
          Bagaimana motif interaksi terbentuk?
        </div>

        <div class="s1-connector"></div>

        <div class="s1-measure s1-measure-green">
          Jarak O-N dan energi interaksi
        </div>
      </div>


      <div class="s1-map-row">
        <div class="s1-system s1-lime">
          LiF padatan
        </div>

        <div class="s1-connector"></div>

        <div class="s1-question s1-question-blue">
          Bagaimana respons terhadap volume?
        </div>

        <div class="s1-connector"></div>

        <div class="s1-measure s1-measure-blue">
          E(V), energi minimum, dan gaya/tekanan
        </div>
      </div>

    </div>

  </section>


  <section class="s1-card">

    <div class="s1-heading">
      <div class="s1-heading-number">4</div>

      <div class="s1-heading-content">
        <span class="s1-kicker">KERANGKA METODE</span>

        <h2>
          Hubungan DFT, DFTB, dan MD
        </h2>
      </div>
    </div>


    <div class="s1-body">

      <p>
        DFT menyelesaikan masalah struktur elektron berbasis kerapatan elektron.
        DFTB merupakan pendekatan yang diturunkan dari DFT dan memakai parameterisasi
        pasangan atom sehingga jauh lebih hemat biaya.
        MD kemudian menggunakan gaya pada atom untuk memperbarui posisi dan kecepatan
        secara bertahap.
      </p>

      <p>
        Pada DFTB+, perhitungan SCC diaktifkan melalui
        <code>Hamiltonian = DFTB { Scc = Yes }</code>.
        Integrasi MD Born-Oppenheimer dilakukan dengan
        <code>Driver = VelocityVerlet</code>.
        Untuk NVT, thermostat, misalnya Nose-Hoover, ditempatkan di dalam blok driver.
      </p>

    </div>


    <div class="s1-subsection">

      <div class="s1-subheading">
        <span class="s1-subnumber">4.1</span>

        <h3>
          Mengapa simulasi atom diperlukan?
        </h3>
      </div>


      <div class="s1-body">

        <p>
          Sifat material, seperti konduktivitas ion, kestabilan antarmuka,
          kekuatan ikatan, dan reaktivitas permukaan, berawal dari interaksi
          antaratom dan elektron. Percobaan memberikan informasi mengenai perilaku
          material secara makroskopik, sedangkan simulasi atomistik membantu
          menghubungkan pengamatan tersebut dengan struktur dan proses pada skala
          ångström (1 Å = 10<sup>−10</sup> m) serta femtosekon
          (1 fs = 10<sup>−15</sup> s).
        </p>

        <p>
          Setiap pendekatan pemodelan menjawab pertanyaan yang berbeda.
          Perhitungan struktur elektronik digunakan untuk memperoleh energi,
          distribusi elektron, dan gaya pada konfigurasi atom tertentu.
          Optimasi geometri mencari konfigurasi dengan gaya kecil.
          <em>Molecular dynamics</em> (MD) mempelajari perubahan konfigurasi terhadap
          waktu akibat gaya antaratom.
          Analisis lintasan mengubah ribuan konfigurasi menjadi besaran seperti
          fungsi distribusi radial (RDF) dan mean squared displacement (MSD).
        </p>

      </div>


      <div class="s1-example">

        <div class="s1-small-label">
          CONTOH PERTANYAAN ILMIAH
        </div>

        <ul>
          <li>
            Contoh elektrolit LiPF<sub>6</sub>/EC: bagaimana ion Li<sup>+</sup>
            dikelilingi atom O pada molekul pelarut, dan apakah lingkungan
            koordinasinya berubah selama MD?
          </li>

          <li>
            Contoh antarmuka LiF-EC: bagaimana orientasi molekul EC memengaruhi
            kontak atom O dengan atom Li di permukaan?
          </li>

          <li>
            Contoh padatan LiF: bagaimana energi total berubah saat ukuran kisi
            diperbesar atau diperkecil?
          </li>
        </ul>

      </div>

    </div>


    <div class="s1-subsection">

      <div class="s1-subheading">
        <span class="s1-subnumber">4.2</span>

        <h3>
          Landasan mekanika kuantum dan DFT
        </h3>
      </div>


      <div class="s1-body">

        <p>
          Dalam pendekatan Born-Oppenheimer, inti atom dipandang bergerak lebih
          lambat daripada elektron. Untuk satu konfigurasi posisi inti R,
          struktur elektron dihitung terlebih dahulu untuk menghasilkan energi
          potensial E(R). Perubahan energi terhadap posisi inti menentukan gaya
          yang kemudian dapat digunakan oleh algoritma optimasi atau MD.
        </p>

      </div>


      <div class="s1-equation">
        \[
        \mathbf{F}_i = -\nabla_i E(\mathbf{R})
        \]
      </div>


      <div class="s1-body">

        <p>
          Density Functional Theory (DFT) adalah metode mekanika kuantum yang
          menyatakan energi keadaan dasar sebagai fungsional dari kerapatan
          elektron n(r), bukan sebagai fungsi gelombang banyak-elektron secara
          langsung. Dalam formulasi Kohn-Sham, persoalan elektron saling
          berinteraksi dipetakan menjadi sistem orbital efektif yang diselesaikan
          secara iteratif hingga kerapatan elektron konsisten.
        </p>

      </div>


      <div class="s1-equation">
        \[
        E[n]
        =
        T_s[n]
        +
        E_{\mathrm{ext}}[n]
        +
        E^{H}[n]
        +
        E_{\mathrm{xc}}[n]
        +
        E_{\mathrm{II}}
        \]
      </div>


      <div class="s1-body">

        <p>
          Pada persamaan ringkas tersebut, T<sub>s</sub> adalah energi kinetik
          elektron noninteraksi, E<sub>ext</sub> interaksi elektron dengan inti,
          E<sup>H</sup> interaksi Coulomb klasik antarelektron,
          E<sub>xc</sub> kontribusi pertukaran-korelasi, dan
          E<sub>II</sub> repulsi antarinti.
          Fungsi pertukaran-korelasi harus didekati; karenanya hasil DFT sendiri
          bukan solusi eksak untuk semua material.
        </p>

        <p>
          DFT dapat memberikan gambaran elektronik yang rinci, tetapi pengulangan
          perhitungan elektron pada setiap langkah MD memerlukan komputasi besar.
          DFTB dikembangkan untuk mempertahankan sebagian deskripsi kuantum dengan
          biaya yang lebih rendah, sehingga lebih praktis untuk demonstrasi lintasan
          dan sistem dengan lebih banyak atom.
        </p>

      </div>

    </div>


    <div class="s1-subsection">

      <div class="s1-subheading">
        <span class="s1-subnumber">4.3</span>

        <h3>
          Density Functional Tight Binding (DFTB)
        </h3>
      </div>


      <div class="s1-body">

        <p>
          Density Functional Tight Binding (DFTB) adalah pendekatan struktur
          elektronik yang diturunkan dari ekspansi energi DFT di sekitar kerapatan
          referensi. Metode ini menggunakan basis orbital atom lokal yang ringkas
          dan menyimpan banyak integral elektronik dalam tabel parameter pasangan
          unsur, yang dikenal sebagai Slater-Koster. Dengan demikian, integral tidak
          perlu dievaluasi sepenuhnya dari awal pada setiap langkah gerak atom.
        </p>

        <p>
          Dalam representasi orbital lokal, orbital molekul ditulis sebagai kombinasi
          linear orbital atom. Matriks Hamiltonian H dan overlap S kemudian membentuk
          persoalan nilai eigen umum. Bentuk ini merupakan inti perhitungan energi pita
          (<em>band-structure energy</em>) pada DFTB.
        </p>

      </div>


      <div class="s1-equation s1-equation-red">
        \[
        \psi_a(\mathbf{r})
        =
        \sum_{\mu}
        c_{\mu a}\phi_{\mu}(\mathbf{r}),
        \qquad
        Hc_a
        =
        \varepsilon_a S c_a
        \]
      </div>


      <div class="s1-body">

        <p>
          Energi total dalam SCC-DFTB secara konseptual dapat dipisahkan menjadi
          kontribusi energi pita, repulsi pasangan atom, dan koreksi fluktuasi muatan.
          Penulisan skematik yang umum digunakan adalah:
        </p>

        <p>
          E<sub>band</sub> berasal dari keadaan elektronik terisi,
          E<sub>rep</sub> adalah kontribusi repulsif yang diparameterkan,
          Δq<sub>α</sub> merupakan deviasi muatan atom dari referensinya,
          dan γ<sub>αβ</sub> menggambarkan interaksi fluktuasi muatan.
        </p>

      </div>


      <div class="s1-equation s1-equation-red">
        \[
        E_{\mathrm{DFTB}}
        \approx
        E_{\mathrm{band}}
        +
        E_{\mathrm{rep}}
        +
        \frac{1}{2}
        \sum_{\alpha\beta}
        \gamma_{\alpha\beta}
        \Delta q_{\alpha}
        \Delta q_{\beta}
        \]
      </div>


      <div class="s1-body">

        <p>
          Persamaan tersebut bersifat pengantar: bentuk dan suku tambahan bergantung
          pada tingkat pendekatan DFTB serta parameter yang digunakan.
        </p>

      </div>


      <div class="s1-feature">

        <div class="s1-feature-title">
          <div class="s1-feature-icon">⚡</div>

          <h4>
            Apa yang membuat DFTB cepat?
          </h4>
        </div>

        <ul>
          <li>
            Basis orbital atom lebih kecil dibanding banyak pendekatan DFT berbasis
            basis yang lebih lengkap.
          </li>

          <li>
            Elemen matriks Hamiltonian dan overlap diperoleh dari interpolasi tabel
            Slater-Koster, bukan menghitung semua integral secara eksplisit pada setiap
            konfigurasi.
          </li>

          <li>
            Bentuk energi repulsif dan pendekatan muatan memungkinkan evaluasi energi
            serta gaya yang lebih ekonomis, tetapi tetap memerlukan solusi masalah elektronik.
          </li>
        </ul>

      </div>


      <div class="s1-learning-note">

        <strong>
          CATATAN PEMBELAJARAN!
        </strong>

        <p>
          Lebih cepat tidak berarti selalu lebih akurat.
          DFTB merupakan metode aproksimasi yang bergantung pada parameterisasi;
          kesesuaian parameter dan validasi terhadap referensi atau eksperimen
          merupakan bagian dari interpretasi ilmiah.
        </p>

      </div>

    </div>


    <div class="s1-subsection">

      <div class="s1-subheading">
        <span class="s1-subnumber">4.4</span>

        <h3>
          Self-Consistent Charge (SCC) dan parameter Slater-Koster
        </h3>
      </div>


      <div class="s1-body">

        <p>
          Pada DFTB non-SCC, redistribusi muatan tidak diumpanbalikkan secara penuh
          ke Hamiltonian. Dalam SCC-DFTB, populasi elektron pada atom dihitung,
          perubahan muatan Δq digunakan untuk memperbarui Hamiltonian, kemudian
          keadaan elektronik dihitung kembali. Siklus ini diulang sampai perubahan
          muatan/energi memenuhi kriteria konvergensi.
        </p>

      </div>


      <h4 class="s1-mini-heading">
        Urutan iterasi SCC
      </h4>


      <div class="s1-process">

        <div class="s1-process-item">
          <span>01</span>
          <p>Mulai dari geometri, basis orbital, dan tebakan muatan awal.</p>
        </div>

        <div class="s1-process-item">
          <span>02</span>
          <p>Bangun Hamiltonian dari parameter Slater-Koster dan muatan saat ini.</p>
        </div>

        <div class="s1-process-item">
          <span>03</span>
          <p>Selesaikan keadaan elektronik serta perbarui populasi/muatan atom.</p>
        </div>

        <div class="s1-process-item">
          <span>04</span>
          <p>
            Periksa kriteria konvergensi; jika belum tercapai, lakukan pembaruan/mixing
            muatan dan ulangi.
          </p>
        </div>

        <div class="s1-process-item">
          <span>05</span>
          <p>
            Setelah konvergen, evaluasi energi dan gaya yang digunakan oleh driver
            optimasi atau MD.
          </p>
        </div>

      </div>


      <div class="s1-body s1-after-process">

        <p>
          Berkas Slater-Koster (<code>*.skf</code>) bukan sekadar daftar konstanta
          unsur. Parameter tersebut menjelaskan interaksi orbital untuk pasangan
          spesies pada jarak yang berbeda dan umumnya terkait dengan keluarga
          parameterisasi serta domain kimia tertentu. Sistem dengan unsur H, C, O,
          F, P, dan Li membutuhkan pasangan unsur yang relevan dan kompatibel.
          Keberadaan satu berkas Li-O saja tidak cukup untuk menjalankan campuran
          LiPF<sub>6</sub>/EC.
        </p>

        <p>
          Dalam DFTB+, SCC pada Hamiltonian DFTB diaktifkan melalui
          <code>Scc = Yes</code>. Kegagalan konvergensi SCC dapat berhubungan dengan
          geometri yang tidak realistis, pemilihan parameter, muatan/spin, ataupun
          pengaturan iterasi. Karena itu, log konvergensi harus diperiksa sebelum
          energi, muatan, atau lintasan diinterpretasikan.
        </p>

      </div>

    </div>


    <div class="s1-subsection">

      <div class="s1-subheading">
        <span class="s1-subnumber">4.5</span>

        <h3>
          Dari energi potensial menuju Molecular Dynamics (MD)
        </h3>
      </div>


      <div class="s1-body">

        <p>
          Molecular dynamics adalah teknik menghitung perubahan posisi dan kecepatan
          atom sebagai fungsi waktu. Dalam MD klasik, gerak inti mengikuti hukum II
          Newton. Besaran gaya berasal dari turunan negatif energi potensial terhadap
          posisi. Hal yang membedakan jenis MD terutama adalah sumber fungsi energi
          potensial atau gaya tersebut.
        </p>

      </div>


      <div class="s1-equation s1-equation-red">
        \[
        m_i
        \frac{d^2\mathbf{r}_i}{dt^2}
        =
        \mathbf{F}_i
        =
        -\nabla_i U(\mathbf{R})
        \]
      </div>


      <div class="s1-body">

        <p>
          Pada force-field MD, gaya berasal dari model potensial empiris.
          Pada DFTB-based Born-Oppenheimer MD, untuk setiap konfigurasi inti,
          struktur elektron DFTB dihitung dahulu, kemudian gaya atom digunakan
          untuk memperbarui posisi. Pada machine-learning MD, gaya dapat diprediksi
          oleh model seperti MACE jika konfigurasi berada dalam domain model yang sesuai.
        </p>

      </div>


      <div class="s1-feature">

        <div class="s1-feature-title">
          <div class="s1-feature-icon">MD</div>

          <h4>
            Siklus MD berbasis DFTB+
          </h4>
        </div>


        <div class="s1-cycle">

          <div class="s1-cycle-item">
            <span>01</span>
            <p>
              Baca geometri awal, sel simulasi, kecepatan awal, dan kondisi ensemble.
            </p>
          </div>

          <div class="s1-cycle-arrow">↓</div>

          <div class="s1-cycle-item">
            <span>02</span>
            <p>
              Hitung keadaan elektronik, termasuk SCC apabila aktif,
              energi potensial, dan gaya atom.
            </p>
          </div>

          <div class="s1-cycle-arrow">↓</div>

          <div class="s1-cycle-item">
            <span>03</span>
            <p>
              Perbarui posisi dan kecepatan menggunakan integrator numerik,
              misalnya velocity Verlet.
            </p>
          </div>

          <div class="s1-cycle-arrow">↓</div>

          <div class="s1-cycle-item">
            <span>04</span>
            <p>
              Jika menggunakan thermostat atau barostat, perbarui variabel kontrol
              sesuai metode terpilih.
            </p>
          </div>

          <div class="s1-cycle-arrow">↓</div>

          <div class="s1-cycle-item">
            <span>05</span>
            <p>
              Simpan energi, temperatur, dan konfigurasi lintasan;
              ulangi sampai langkah MD selesai.
            </p>
          </div>

        </div>

      </div>


      <div class="s1-info">

        <p>
          Simulasi tidak “melihat” waktu secara kontinu.
          Gerak diperkirakan pada interval diskret Δt.
          Semakin besar Δt, semakin cepat simulasi menjangkau waktu fisik tertentu,
          tetapi risiko kesalahan integrasi dan ketidakstabilan juga meningkat.
        </p>

      </div>

    </div>


    <div class="s1-subsection s1-subsection-last">

      <div class="s1-subheading">
        <span class="s1-subnumber">4.6</span>

        <h3>
          Integrator velocity Verlet, time step, dan stabilitas
        </h3>
      </div>


      <div class="s1-body">

        <p>
          Integrator velocity Verlet memanfaatkan posisi, kecepatan,
          serta percepatan pada waktu t untuk menghitung keadaan pada t + Δt.
          Metode ini banyak digunakan karena sederhana, reversibel
        </p>

      </div>

    </div>

  </section>

</div>
<!-- =========================================================
     LANJUTAN 4.6
     VELOCITY VERLET, TIME STEP, DAN STABILITAS
     ========================================================= -->

<div class="s1-subsection">

  <div class="s1-body">

    <p>
      Secara waktu pada kasus konservatif, dan memiliki perilaku konservasi
      energi yang baik bila dipakai dengan time step yang cukup kecil.
    </p>

  </div>


  <div class="s1-equation s1-equation-red">
    \[
    \mathbf{r}_i(t+\Delta t)
    =
    \mathbf{r}_i(t)
    +
    \mathbf{v}_i(t)\Delta t
    +
    \frac{1}{2}
    \mathbf{a}_i(t)(\Delta t)^2
    \]
  </div>


  <div class="s1-equation s1-equation-red">
    \[
    \mathbf{v}_i(t+\Delta t)
    =
    \mathbf{v}_i(t)
    +
    \frac{1}{2}
    \left[
    \mathbf{a}_i(t)
    +
    \mathbf{a}_i(t+\Delta t)
    \right]
    \Delta t
    \]
  </div>


  <div class="s1-body">

    <p>
      Percepatan baru diperoleh setelah gaya dihitung pada posisi yang telah
      diperbarui. Pada DFTB+, alur tersebut dilakukan oleh
      <code>Driver = VelocityVerlet</code>.
      TimeStep [fs] = 0.5 menyatakan selang waktu 0,5 fs;
      Steps = 1000 menghasilkan durasi nominal 500 fs atau 0,5 ps,
      belum termasuk tahapan lain bila ada.
    </p>

    <p>
      Pemilihan time step mengikuti skala vibrasi tercepat di sistem.
      Ikatan yang melibatkan H dapat berosilasi sangat cepat; akibatnya,
      nilai 0,5–1,0 fs yang lazim dipakai sebagai titik awal tetap harus
      diuji dengan energi, temperatur, dan kestabilan geometri.
      Pada ensemble NVE, drift energi yang sistematik merupakan tanda
      perlunya pemeriksaan integrator, SCC, time step, atau parameter.
    </p>

  </div>

</div>


<!-- =========================================================
     4.7 ENSEMBLE TERMODINAMIKA DAN THERMOSTAT
     ========================================================= -->

<div class="s1-subsection">

  <div class="s1-subheading">

    <span class="s1-subnumber">
      4.7
    </span>

    <h3>
      Ensemble termodinamika dan thermostat
    </h3>

  </div>


  <div class="s1-body">

    <p>
      Ensemble menyatakan besaran makroskopik yang dijaga atau dikendalikan
      selama simulasi. Pemilihan ensemble perlu disesuaikan dengan tujuan
      ilmiah: ekuilibrasi pada temperatur tertentu tidak identik dengan
      pengambilan data dinamika tanpa thermostat.
    </p>

  </div>


  <div class="s1-ensemble-block">

    <div class="s1-ensemble-item">

      <h4>
        NVE — jumlah partikel, volume, dan energi tetap
      </h4>

      <p>
        NVE menggambarkan sistem terisolasi ideal pada volume tetap.
        Pada integrasi numerik, energi total diharapkan berfluktuasi kecil
        tanpa drift sistematik yang besar. Ensemble ini berguna untuk
        mengevaluasi kualitas konservasi energi dan dinamika tanpa
        pengendalian temperatur eksternal.
      </p>

    </div>


    <div class="s1-ensemble-item">

      <h4>
        NVT — jumlah partikel, volume, dan temperatur dikendalikan
      </h4>

      <p>
        Pada NVT, thermostat memodifikasi dinamika untuk mempertahankan
        distribusi temperatur target. Nose-Hoover adalah salah satu
        pendekatan yang diperkenalkan dalam modul ini.
        Parameter coupling memengaruhi seberapa kuat respons thermostat;
        pemilihan yang terlalu agresif dapat mengubah dinamika dan
        hasil transport.
      </p>

    </div>


    <div class="s1-ensemble-item">

      <h4>
        NPT — jumlah partikel, tekanan, dan temperatur dikendalikan
      </h4>

      <p>
        Pada NPT, ukuran atau bentuk sel dapat berubah melalui mekanisme
        barostat. Pendekatan ini sering dipakai saat densitas atau parameter
        kisi perlu menyesuaikan kondisi tekanan, tetapi kelayakannya
        bergantung pada sistem dan fitur driver yang tersedia.
      </p>

    </div>

  </div>


  <div class="s1-equation s1-equation-red">
    \[
    T
    =
    \frac{2\langle K\rangle}
    {f\,k^{\mathrm{B}}}
    \qquad ; \qquad
    K
    =
    \frac{1}{2}
    \sum_i
    m_i
    \left|\mathbf{v}_i\right|^2
    \]
  </div>


  <div class="s1-body">

    <p>
      T adalah temperatur kinetik, K energi kinetik,
      k<sup>B</sup> konstanta Boltzmann, dan f jumlah derajat kebebasan efektif
      setelah pembatasan gerak/kendala diperhitungkan.
      Temperatur sesaat berfluktuasi; satu frame tidak boleh dianggap
      mewakili distribusi temperatur keseluruhan.
    </p>

  </div>


  <div class="s1-learning-note">

    <strong>
      CATATAN PEMBELAJARAN!
    </strong>

    <p>
      Tahap praktik menggunakan NVT dengan thermostat Nose-Hoover sebagai
      ilustrasi. Untuk sifat transport, lakukan evaluasi dampak thermostat,
      ekuilibrasi, dan sampling terhadap hasil.
    </p>

  </div>

</div>


<!-- =========================================================
     4.8 KONDISI BATAS PERIODIK, SEL SIMULASI, DAN TAHAPAN MD
     ========================================================= -->

<div class="s1-subsection">

  <div class="s1-subheading">

    <span class="s1-subnumber">
      4.8
    </span>

    <h3>
      Kondisi batas periodik, sel simulasi, dan tahapan MD
    </h3>

  </div>


  <div class="s1-body">

    <p>
      Periodic boundary conditions (PBC) merepresentasikan sistem besar
      dengan mengulang sel simulasi secara spasial.
      Saat partikel melewati batas sel, bayangan periodiknya memasuki
      sisi lain. PBC mengurangi pengaruh permukaan artifisial pada material
      bulk, tetapi ukuran sel yang terlalu kecil dapat menyebabkan korelasi
      tidak realistis antarbayangan periodik.
    </p>

    <p>
      Sistem elektrolit cair umumnya memerlukan sel periodik tiga dimensi
      dengan komposisi dan densitas awal yang masuk akal.
      Pada antarmuka slab, dimensi lateral biasanya periodik, sedangkan arah
      normal memerlukan penanganan ruang vakum dan interaksi antarlayang
      yang hati-hati. Visualisasikan vektor kisi dan posisi molekul sebelum
      menjalankan simulasi.
    </p>

  </div>


  <h4 class="s1-mini-heading">
    Tahap simulasi yang perlu dibedakan
  </h4>


  <div class="s1-process">

    <div class="s1-process-item">
      <span>01</span>

      <p>
        Persiapan: susun struktur, jumlah atom, muatan total,
        parameter SK, dan kondisi batas.
      </p>
    </div>

    <div class="s1-process-item">
      <span>02</span>

      <p>
        Relaksasi awal: singkirkan kontak terlalu dekat atau geometri
        berenergi sangat tinggi.
      </p>
    </div>

    <div class="s1-process-item">
      <span>03</span>

      <p>
        Ekuilibrasi: biarkan sistem beradaptasi terhadap temperatur
        dan kondisi ensemble target.
      </p>
    </div>

    <div class="s1-process-item">
      <span>04</span>

      <p>
        Produksi: kumpulkan lintasan untuk analisis setelah sifat yang
        relevan cukup stabil.
      </p>
    </div>

    <div class="s1-process-item">
      <span>05</span>

      <p>
        Validasi: uji pengaruh ukuran sel, time step, panjang simulasi,
        dan pilihan parameter.
      </p>
    </div>

  </div>


  <div class="s1-body s1-after-process">

    <p>
      Keadaan awal yang dihasilkan secara acak bukan otomatis keadaan
      setimbang. MD singkat selama ratusan femtosekon dalam workshop
      ditujukan untuk memahami alur komputasi dan analisis, bukan untuk
      mengklaim nilai difusi atau sifat termodinamika yang telah konvergen.
    </p>

  </div>

</div>


<!-- =========================================================
     4.9 MENGHUBUNGKAN LINTASAN MD DENGAN BESARAN MATERIAL
     ========================================================= -->

<div class="s1-subsection s1-subsection-last">

  <div class="s1-subheading">

    <span class="s1-subnumber">
      4.9
    </span>

    <h3>
      Menghubungkan lintasan MD dengan besaran material
    </h3>

  </div>


  <div class="s1-body">

    <h4 class="s1-mini-heading">
      RDF: struktur lokal dan lingkungan koordinasi
    </h4>

    <p>
      Radial distribution function g(r) menggambarkan peluang relatif
      menemukan atom jenis B pada jarak r dari atom acuan A,
      dibandingkan distribusi homogen pada kerapatan sama.
      Puncak pertama RDF Li-O dapat mengindikasikan jarak koordinasi
      yang paling sering muncul antara Li dan oksigen pelarut.
      Integral hingga batas minimum pertama dapat digunakan untuk
      memperkirakan bilangan koordinasi.
    </p>

  </div>


  <div class="s1-equation s1-equation-red">
    \[
    N_{AB}(r_c)
    =
    4\pi \rho_B
    \int_0^{r_c}
    g_{AB}(r)\,r^2\,dr
    \]
  </div>

</div>
<!-- =========================================================
     LANJUTAN 4.9
     RDF, MSD, ENERGI, GAYA, DAN MUATAN
     ========================================================= -->

<div class="s1-subsection">

  <div class="s1-body">

    <p>
      ρ<sub>B</sub> adalah densitas jumlah spesies B.
      Hubungan integral tiga dimensi di atas relevan bagi sistem bulk isotropik;
      pada permukaan, geometri terkungkung, atau slab dengan vakum,
      interpretasi dan normalisasinya perlu disesuaikan.
    </p>

  </div>


  <div class="s1-analysis-block">

    <h4>
      MSD: mobilitas dan difusi
    </h4>

    <div class="s1-body">

      <p>
        Mean squared displacement adalah rerata kuadrat perubahan posisi partikel
        terhadap posisi awalnya sepanjang suatu interval waktu.
        Untuk difusi normal isotropik dalam tiga dimensi, konstanta difusi dapat
        diestimasi dari gradien MSD pada rezim waktu panjang melalui relasi Einstein.
      </p>

    </div>


    <div class="s1-equation s1-equation-red">
      \[
      \mathrm{MSD}(t)
      =
      \left\langle
      \left|
      \mathbf{r}_i(t_0+t)
      -
      \mathbf{r}_i(t_0)
      \right|^2
      \right\rangle_{i,t_0}
      \]
    </div>


    <div class="s1-equation s1-equation-red">
      \[
      D
      =
      \frac{1}{6}
      \lim_{t\rightarrow\infty}
      \frac{d[\mathrm{MSD}(t)]}{dt}
      \]
    </div>


    <div class="s1-body">

      <p>
        Penghitungan MSD memerlukan koordinat unwrapped sehingga perpindahan
        melintasi batas periodik tidak keliru dianggap lompatan balik.
        Regresi pada bagian awal lintasan yang masih balistik atau lintasan yang
        terlalu pendek dapat menghasilkan estimasi D yang menyesatkan.
      </p>

    </div>

  </div>


  <div class="s1-analysis-block">

    <h4>
      Energi, gaya, dan muatan
    </h4>

    <div class="s1-body">

      <p>
        Energi total membantu menilai stabilitas simulasi, membandingkan struktur
        pada komposisi serta parameter yang sama, dan membuat kurva energi-volume.
        Gaya digunakan oleh integrator dan indikator relaksasi.
        Muatan Mulliken memberi gambaran distribusi populasi basis yang berguna
        untuk melihat tren dalam satu skema perhitungan, tetapi bukan besaran
        muatan atom yang unik dan bebas metode.
      </p>

    </div>

  </div>

</div>


<!-- =========================================================
     4.10 PERAN DFTB+ DAN MACE SERTA KETERBATASAN METODE
     ========================================================= -->

<div class="s1-subsection">

  <div class="s1-subheading">

    <span class="s1-subnumber">
      4.10
    </span>

    <h3>
      Peran DFTB+ dan MACE serta keterbatasan metode
    </h3>

  </div>


  <div class="s1-body">

    <p>
      DFTB+ merupakan perangkat lunak untuk menghitung energi, gaya,
      dan berbagai sifat atomistik dengan pendekatan DFTB.
      Input utama berbentuk hierarkis (HSD); blok Geometry mendefinisikan
      struktur, Hamiltonian mengatur pendekatan elektronik dan parameter,
      sementara Driver mengatur optimasi atau dinamika.
      Dengan demikian, DFTB adalah metodenya, sedangkan DFTB+ adalah
      implementasi perangkat lunaknya.
    </p>

    <p>
      MACE merupakan model machine-learning interatomic potential yang
      mempelajari hubungan struktur dengan energi dan gaya dari data pelatihan.
      MACE dapat melakukan prediksi gaya dengan cepat, tetapi reliabilitasnya
      bergantung pada mutu data dan kedekatan konfigurasi uji terhadap domain
      pelatihan. Ketika membandingkan kurva energi-volume LiF dari DFTB+ dan MACE,
      bandingkan posisi minimum, bentuk kurva, dan energi relatif; nol energi
      absolutnya tidak harus sama.
    </p>

    <p>
      Tidak ada satu metode yang unggul untuk semua pertanyaan.
      DFT umumnya memberi kerangka struktur elektronik yang lebih terperinci
      dengan biaya lebih tinggi; DFTB mengompromikan ketelitian dan biaya lewat
      parameterisasi; force field dan machine-learning potentials dapat lebih cepat
      pada domain yang tepat, namun validitasnya harus dibuktikan untuk spesies,
      fase, reaksi, dan kondisi yang diteliti.
    </p>

  </div>


  <div class="s1-reflection">

    <h4>
      Pertanyaan refleksi sebelum praktikum
    </h4>

    <ul>

      <li>
        Mengapa satu perhitungan energi satu titik belum cukup untuk mempelajari
        difusi Li<sup>+</sup>?
      </li>

      <li>
        Apa konsekuensinya jika SCC tidak konvergen pada sebagian frame MD?
      </li>

      <li>
        Mengapa file Slater-Koster untuk tiap unsur tidak boleh dicampur
        sembarangan?
      </li>

      <li>
        Mengapa hasil MSD dari trajectory terlipat (wrapped) dapat salah?
      </li>

      <li>
        Mengapa dua model dapat memiliki volume kesetimbangan serupa,
        namun memberikan energi absolut yang berbeda?
      </li>

    </ul>

  </div>

</div>


<!-- =========================================================
     5. PETA KONSEP: DARI PERTANYAAN KE PERHITUNGAN
     ========================================================= -->

<div class="s1-subsection">

  <div class="s1-subheading">

    <span class="s1-subnumber">
      5
    </span>

    <h3>
      Peta konsep: dari pertanyaan ke perhitungan
    </h3>

  </div>


  <div class="s1-concept-map">

    <div class="s1-concept-head">

      <div>
        OBJEK
      </div>

      <div>
        POIN PENTING
      </div>

    </div>


    <div class="s1-concept-row">

      <div class="s1-concept-object">
        Struktur
      </div>

      <div class="s1-concept-points">

        <div class="s1-concept-box">
          <ul>
            <li>Komposisi</li>
            <li>Koordinat</li>
            <li>Sel</li>
          </ul>
        </div>

        <div class="s1-concept-box">
          <ul>
            <li>PBC</li>
            <li>Kondisi awal</li>
          </ul>
        </div>

      </div>

    </div>


    <div class="s1-concept-row">

      <div class="s1-concept-object">
        Metode
      </div>

      <div class="s1-concept-points">

        <div class="s1-concept-box">
          <ul>
            <li>Jenis Hamiltonian</li>
            <li>SCC</li>
            <li>Parameter SK</li>
          </ul>
        </div>

        <div class="s1-concept-box">
          <ul>
            <li>Muatan</li>
            <li>Spin</li>
            <li>K-point</li>
          </ul>
        </div>

      </div>

    </div>


    <div class="s1-concept-row">

      <div class="s1-concept-object">
        Dinamika
      </div>

      <div class="s1-concept-points">

        <div class="s1-concept-box">
          <ul>
            <li>Time step</li>
            <li>Jumlah langkah</li>
            <li>Ensemble</li>
          </ul>
        </div>

        <div class="s1-concept-box">
          <ul>
            <li>Thermostat</li>
            <li>Temperatur</li>
          </ul>
        </div>

      </div>

    </div>


    <div class="s1-concept-row">

      <div class="s1-concept-object">
        Output
      </div>

      <div class="s1-concept-points">

        <div class="s1-concept-box">
          <ul>
            <li>Energi</li>
            <li>Gaya</li>
            <li>Geometri</li>
            <li>Muatan</li>
          </ul>
        </div>

        <div class="s1-concept-box">
          <ul>
            <li>Trajectory</li>
            <li>Log konvergensi</li>
          </ul>
        </div>

      </div>

    </div>

  </div>

</div>


<!-- =========================================================
     5.1 SATUAN DAN SKALA WAKTU
     ========================================================= -->

<div class="s1-subsection s1-subsection-last">

  <div class="s1-subheading">

    <span class="s1-subnumber">
      5.1
    </span>

    <h3>
      Satuan dan skala waktu
    </h3>

  </div>


  <div class="s1-body">

    <p>
      Gunakan satuan eksplisit pada input HSD bila tersedia,
      misalnya TimeStep [fs] dan Temperature [Kelvin].
      Untuk sistem dengan vibrasi cepat, time step harus diuji kestabilannya;
      0,5–1,0 fs adalah titik awal umum, bukan jaminan untuk semua sistem.
    </p>

  </div>

</div>
<!-- =========================================================
     6. DASAR DFTB DAN MENGAPA DFTB+ EFISIEN
     ========================================================= -->

<div class="s1-subsection">

  <div class="s1-subheading">

    <span class="s1-subnumber">
      6
    </span>

    <h3>
      Dasar DFTB dan mengapa DFTB+ efisien
    </h3>

  </div>


  <!-- =====================================================
       6.1
       ===================================================== -->

  <div class="s1-analysis-block">

    <h4>
      6.1 SCC sebagai lingkaran umpan balik
    </h4>

    <div class="s1-body">

      <p>
        Pada SCC-DFTB, muatan atom diperbarui secara iteratif hingga
        konsisten dengan Hamiltonian. Periksa konvergensi SCC;
        energi dari langkah yang tidak konvergen tidak boleh diperlakukan
        sama dengan hasil yang konvergen.
      </p>

    </div>

  </div>


  <!-- =====================================================
       6.2
       ===================================================== -->

  <div class="s1-analysis-block">

    <h4>
      6.2 Berkas Slater-Koster
    </h4>

    <div class="s1-body">

      <p>
        Berkas <code>.skf</code> menyimpan informasi parameterisasi
        pasangan unsur. Gunakan satu keluarga parameter yang konsisten
        dan lengkap. Kecocokan nama unsur saja tidak cukup untuk
        membenarkan pencampuran parameter dari set berbeda.
      </p>

    </div>

  </div>


  <!-- =====================================================
       6.3
       ===================================================== -->

  <div class="s1-analysis-block">

    <h4>
      6.3 Perbedaan penting terhadap modul DC-DFTB-MD
    </h4>

  </div>

</div>


<!-- =========================================================
     7. OPTIMASI, DINAMIKA, DAN PEMBACAAN LINTASAN
     ========================================================= -->

<div class="s1-subsection s1-subsection-last">

  <div class="s1-subheading">

    <span class="s1-subnumber">
      7
    </span>

    <h3>
      Optimasi, dinamika, dan pembacaan lintasan
    </h3>

  </div>


  <div class="s1-body">

    <p>
      DFTB+ menyediakan driver untuk optimasi geometri dan
      VelocityVerlet untuk MD. Pada MD, posisi diperbarui,
      gaya dihitung dari struktur elektronik, lalu kecepatan diperbarui.
      NVT menambahkan thermostat untuk mengendalikan distribusi temperatur.
    </p>

  </div>


  <div class="s1-code-block">

    <pre><code>Driver = VelocityVerlet {
  TimeStep [fs] = 0.5
  Steps = 1000
  MovedAtoms = 1:-1

  Thermostat = NoseHoover {
    Temperature [Kelvin] = 350
    CouplingStrength [cm^-1] = 3200
  }

  MDRestartFrequency = 100
}</code></pre>

  </div>


  <div class="s1-body">

    <p>
      Nilai CouplingStrength di atas adalah contoh pelatihan.
      Peserta harus melakukan uji sensitivitas terhadap time step,
      thermostat, ukuran sistem, dan panjang sampling sebelum menarik
      kesimpulan kuantitatif.
    </p>

  </div>

</div>
