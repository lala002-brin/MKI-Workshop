# Part 05. Heterojunction: kontak ZIF-67/Cu₂O dan Fe₃O₄/ZIF-67

## 1. Pertanyaan yang tidak dapat dijawab hanya dari bulk

Dari bulk, kita mengetahui gap elektronik masing-masing material. Tetapi dua material dengan gap serupa dapat memiliki posisi pita berbeda terhadap vakum. Karena itu **perbandingan gap bulk saja tidak menentukan arah transfer muatan maupun jenis heterojunction**.

## 2. Urutan interface yang lebih efisien

1. Optimasi bulk masing-masing material.
2. Pilih facet dan terminasi surface dari data morfologi dan energi permukaan.
3. Hitung properti permukaan terpisah: DOS, PDOS, potensial dan fungsi kerja.
4. Bangun **ZIF-67/Cu₂O** dan **Fe₃O₄/ZIF-67** secara terpisah.
5. Uji orientasi, jarak kontak, dan strain. Pilih beberapa struktur awal.
6. Optimasi interface dengan kondisi magnetik yang konsisten.
7. Bandingkan energi ikatan, PDOS, beda muatan, potensial dan band offsets.
8. Baru usulkan model tiga komponen yang mengikuti morfologi eksperimental.

## 3. Cara membuat interface fisik

Untuk interface periodik, vektor lateral kedua permukaan harus dapat dicocokkan lewat pengulangan integer dengan strain rendah. Secara konseptual:

$$\mathbf L_{A}^{matched}\approx \mathbf L_{B}^{matched}$$

Strain satu arah:

$$\varepsilon=(L_{matched}-L_0)/L_0\times 100\%$$

**Jangan mengejar sel <5% strain dengan mengabaikan ukuran model:** interface MOF/oksida mungkin inkoheren atau lokal. Dalam kondisi itu, gunakan fragmen/klaster berjangkar yang sesuai dan laporkan keterbatasan model.

## 4. Kapan memakai komposit triple?

Setelah hasil kedua interface bilayer tersedia. Model Fe₃O₄/ZIF-67/Cu₂O sebaiknya membentuk kontak yang realistis, misalnya inti Fe₃O₄, MOF yang tumbuh pada inti, dan Cu₂O di permukaan luar. Jangan menumpuk tiga sel kubik secara arbitrer.

## 5. Binding energy

$$E_{bind}=E_{AB}-E_A-E_B$$

Tentukan apakah komponen A dan B dihitung pada geometri **terdeformasi di interface** atau geometri **relaksasi terpisah**. Perbedaan definisi mengubah apakah energi strain masuk ke nilai ikatan. Untuk antarmuka luas, laporkan eV per interface area dan, bila relevan, koreksi BSSE.

## 6. Charge density difference

$$\Delta\rho(\mathbf r)=\rho_{AB}(\mathbf r)-\rho_A(\mathbf r)-\rho_B(\mathbf r)$$

Lakukan tiga SCF dengan **grid, sel, posisi atom, basis, dan referensi konsisten**. Untuk A dan B, gunakan koordinat yang sama seperti dalam interface AB, dengan atom komponen lain dihilangkan. Pastikan penyelarasan grid sebelum mengurangkan cube/rho; jika tidak, file 3D tidak dapat dikurangkan begitu saja.

## 7. PDOS yang diproyeksikan per komponen

- Fe₃O₄: Fe(A) dan Fe(B) 3d serta O 2p, pisah spin.
- ZIF-67: Co 3d, N 2p, C 2p.
- Cu₂O: Cu 3d dan O 2p.
- Interface: bandingkan orbital pada atom dekat kontak dan atom jauh dari kontak.

Fokuskan analisis pada perubahan posisi fitur PDOS, hibridisasi, dan keadaan antarmuka. Jangan hanya membandingkan total DOS seluruh komposit.

## 8. Band alignment dan work function

Dari slab terpisah, tentukan level vakum dan fungsi kerja. Untuk semikonduktor yang mempunyai bulk-like region, gunakan **potential lineup** untuk membandingkan VBM/CBM. Surface state, keadaan Fermi pinned, dipol antarmuka, dan sifat konduktif Fe₃O₄ dapat mengaburkan konsep band offset sederhana.

Untuk skema type-II/Z-scheme/S-scheme:

- **DFT ground state:** memberi struktur, redistribusi muatan kesetimbangan, band alignment dan potensial.
- **Eksperimen/teori eksitasi:** diperlukan untuk menilai arah aliran pembawa muatan akibat cahaya, kinetika rekombinasi, dan spesies reaktif.
- Jangan menggunakan Δρ keadaan dasar sebagai bukti tunggal S-scheme.

## 9. Tabel yang mahasiswa harus buat

| Konfigurasi | Jumlah atom | Strain x/y (%) | E_bind (eV) | Δq (e) | ΔΦ (eV) | Status relaksasi |
|---|---:|---:|---:|---:|---:|---|
| ZIF-67/Cu₂O posisi 1 | ... | ... | ... | ... | ... | ... |
| ZIF-67/Cu₂O posisi 2 | ... | ... | ... | ... | ... | ... |
| Fe₃O₄/ZIF-67 posisi 1 | ... | ... | ... | ... | ... | ... |

## 10. Checkpoint

- [ ] Ada alasan fisik untuk facet, terminasi, orientasi kontak.
- [ ] Lattice match/strain dan biaya model diketahui.
- [ ] Semua struktur interface memenuhi toleransi gaya dan spin.
- [ ] Analisis Δρ memakai grid identik dan geometri referensi sesuai.
- [ ] Klaim heterojunction sesuai bukti, bukan hanya perbedaan gap.
