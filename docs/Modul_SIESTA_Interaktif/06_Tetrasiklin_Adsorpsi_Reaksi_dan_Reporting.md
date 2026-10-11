---
level: research_toolkit
---

# Part 06. Tetrasiklin: dari konformer hingga mekanisme reaksi

## 1. Definisikan endpoint penelitian

**Adsorpsi/penghilangan TC** berbeda dari **degradasi TC** dan berbeda dari **mineralisasi**. DFT pada keadaan dasar dapat mendukung mekanisme adsorpsi dan energi reaksi elementer; tidak secara otomatis memprediksi laju degradasi fotokatalitik.

## 2. Siapkan TC dengan benar

1. Tetapkan identitas kimia: tetracycline base atau bentuk garam tertentu.
2. Buat beberapa konformer molekul (rotasi gugus, ikatan hidrogen intramolekul).
3. Pilih bentuk protonasi dominan sesuai pH eksperimen. TC dapat berubah spesiasinya karena gugus yang dapat terprotonasi/deprotonasi.
4. Optimasi tiap spesies dan periksa muatan total serta multiplicity/spin.
5. Pertimbangkan solvation, ion countercharge, dan artefak elektrostatik sistem bermuatan periodik.

Untuk skrining awal, Anda dapat menggunakan molekul TC terisolasi di sel vakum yang cukup besar, tetapi laporkan bahwa ini bukan model larutan air yang lengkap.

## 3. Pilih situs adsorpsi

| Sistem | Situs kandidat | Interaksi diuji |
|---|---|---|
| Cu₂O surface | Cu terkoordinasi rendah | koordinasi O karbonil/hidroksil TC |
| Fe₃O₄ surface | Fe pada permukaan | kompleksasi gugus beroksigen TC |
| ZIF-67 | ligan permukaan, Co terbuka pada cacat realistis | H-bond, dispersi, koordinasi Co |
| ZIF-67/Cu₂O | atom pada interface dan permukaan luar | perubahan situs akibat kontak |
| Triple composite | situs yang benar-benar dapat dicapai TC | pengaruh heterointerface terhadap adsorpsi |

Jangan menguji hanya satu orientasi. Mulai setidaknya beberapa orientasi karbonil, hidroksil, sejajar, dan miring, kemudian optimasi.

## 4. Membangun geometri trial TC/surface

`place_tc_trial.py` dalam paket hanyalah penempatan **awal** ke pusat permukaan pada ketinggian yang dipilih. Sebelum DFT, inspeksi tumbukan dan replika periodik; lakukan rotasi molekul dan sampling situs. Jangan langsung menganggap konformasi pertama sebagai minimum global.

```bash
python scripts/place_tc_trial.py Cu2O_111_trial.vasp TC_optimized.xyz \
  --height 3.0 -o Cu2O_TC_trial.vasp
```

## 5. Energi adsorpsi

$$E_{ads}=E_{slab+TC}-E_{slab}-E_{TC}$$

Semua bagian harus memakai functional, basis, pseudopotential, pengaturan numerik, spin, dan referensi atom yang konsisten.

- Nilai negatif berarti keadaan adsorpsi lebih rendah energi daripada referensi yang dipilih.
- Energi lebih negatif **tidak selalu** berarti fotodegradasi lebih cepat.
- Basis orbital lokal SIESTA dapat mengalami **basis-set superposition error**. Evaluasi koreksi counterpoise/ghost basis.
- Adsorpsi dari larutan memerlukan kontribusi hidrasi, keadaan protonasi, entropi dan pH untuk memperoleh energi bebas yang relevan.

## 6. Analisis struktural dan elektronik

Simpan dan bandingkan:

1. Panjang kontak Cu–O(TC), Fe–O(TC), Co–O(TC) jika terbentuk.
2. Perubahan ikatan C=O atau O–H yang relevan pada TC.
3. Δρ(permukaan+TC) dengan tiga densitas pada geometri yang sama.
4. PDOS orbital yang berinteraksi; charge partitioning dengan metode disebut eksplisit.
5. Beberapa minimum adsorpsi, bukan hanya satu nilai E_ads.

## 7. Jika tujuannya fotodegradasi

- Kaitkan band alignment dengan kemampuan oksidasi/reduksi **hanya setelah** memvalidasi referensi energi dan sifat permukaan.
- Gunakan uji scavenger/EPR untuk mengidentifikasi kemungkinan `·OH`, `O₂·−`, hole, atau spesies lain.
- Pakai LC-MS untuk memilih produk antara yang masuk akal.
- Hitung reaktan, intermediat, produk, dan transition state untuk reaksi tertentu.
- Gunakan NEB untuk reaksi pada permukaan yang bisa dijelaskan oleh lintasan reaksi keadaan dasar. Photochemistry dapat memerlukan metode excited-state.

$$E_a=E_{TS}-E_{reactant}$$

Dari data energi total saja jangan menyatakan konstanta laju tanpa kontribusi entropi dan teori kinetika yang sesuai.

## 8. Alur praktikum mahasiswa dan deliverables

| Minggu | Fokus | Luaran |
|---|---|---|
| 1 | Validasi CIF, pseudopotential, smoke test Cu₂O | laporan struktur, output SCF pertama |
| 2 | Konvergensi Cu₂O, optimasi | grafik konvergensi, Cu₂O optimal |
| 3 | DOS/PDOS dan pita Cu₂O | gap KS dan interpretasi orbital |
| 4 | Bulk Fe₃O₄ dan spin | perbandingan keadaan magnetik dan DOS spin |
| 5 | ZIF-67 dan dispersi | struktur MOF, spin Co dan PDOS |
| 6 | Surface Cu₂O dan Fe₃O₄ | geometri slab, energi dan work function |
| 7 | Surface/klaster ZIF-67, konstruksi interface | kandidat kontak tervalidasi |
| 8 | Interface dan Δρ | binding energy, PDOS, peta beda muatan |
| 9 | TC: konformer, protonasi, adsorpsi | geometri dan energi adsorpsi |
| 10 | Sintesis hasil dan interpretasi | laporan teknis + gambar + batas metode |

Timeline di atas adalah **contoh pengajaran**, bukan estimasi pasti waktu HPC.

## 9. Struktur laporan ilmiah

1. Detail struktur dan sumber CIF (DOI/identifier).
2. Versi SIESTA, compiler/MPI, XC, pseudopotential beserta file hash.
3. Spin dan DFT+U, parameter dispersi serta alasan pemilihannya.
4. Hasil convergence (mesh, k-point, basis, slab).
5. Geometri akhir (parameter kisi, gaya dan tegangan).
6. DOS/PDOS, pita dan gap (jelaskan referensi energi dan batas PBE).
7. Surface/interface: terminasi, strain, energi, work function, Δρ.
8. TC: spesies/protonasi, orientasi, E_ads, koreksi, interaksi.
9. Interpretasi dibanding eksperimen dengan pembatasan kesimpulan yang jelas.

## 10. Kesalahan yang harus dihindari

- Mengganti nama XYZ menjadi CIF atau FDF tanpa mengisi informasi struktur.
- Menggunakan k-grid 1×1×1 untuk semua bulk tanpa uji.
- Menggunakan satu nilai U untuk semua logam tanpa validasi.
- Menyatakan optimasi berhasil karena job berhenti, padahal SCF/forces gagal.
- Menumpuk tiga CIF sebagai interface tanpa terminasi dan strain yang benar.
- Membandingkan Fermi level dari perhitungan terpisah tanpa acuan energi bersama.
- Mengklaim S-scheme dari perubahan DOS/Δρ saja.
- Mengklaim degradasi hanya dari energi adsorpsi TC.

## 11. Sumber teknis dan catatan reproduksibilitas

- [Dokumentasi SIESTA](https://docs.siesta-project.org/projects/siesta/en/5.4/reference/siesta.html)
- [Tutorial optimasi SIESTA](https://docs.siesta-project.org/projects/siesta/en/latest/tutorials/basic/structure-optimization/index.html)
- [ASE crystal surfaces](https://ase-lib.org/ase/build/surface.html)
- [spglib](https://spglib.readthedocs.io/)
- [SeeK-path](https://seekpath.readthedocs.io/)

**Penanda akhir:** Seluruh struktur interface dan parameter numerik harus diuji pada HPC serta dibandingkan terhadap data eksperimen sebelum menjadi hasil publikasi.
