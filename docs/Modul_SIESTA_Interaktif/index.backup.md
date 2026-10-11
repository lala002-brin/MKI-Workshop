# Modul teknis DFT SIESTA: Fe₃O₄, ZIF-67, Cu₂O, heterojunction, dan TC

**Enam part:** dirancang untuk mahasiswa dan peneliti pemula hingga menengah. Gunakan urutan Part 01–06. Tiap part memiliki halaman HTML interaktif dan file Markdown yang dapat diedit.

> Status: ini modul kerja dan template. Tidak ada energi, band gap, atau struktur interface yang diklaim berasal dari running SIESTA sungguhan.

- [01 · Peta penelitian dan persiapan](01_Fondasi_dan_Persiapan.md) | [Versi HTML](01_Fondasi_dan_Persiapan.html)
- [02 · Bulk Cu₂O, Fe₃O₄ dan ZIF-67](02_Model_Bulk_dan_Input_FDF.md) | [Versi HTML](02_Model_Bulk_dan_Input_FDF.html)
- [03 · Konvergensi, optimasi, SCF dan pita](03_Convergence_OPT_SCF_DOS_Bands.md) | [Versi HTML](03_Convergence_OPT_SCF_DOS_Bands.html)
- [04 · Surface dan slab atomistik](04_Surface_Slab_dan_WorkFunction.md) | [Versi HTML](04_Surface_Slab_dan_WorkFunction.html)
- [05 · Interface dan heterojunction](05_Heterojunction_BandAlignment_Charge.md) | [Versi HTML](05_Heterojunction_BandAlignment_Charge.html)
- [06 · Tetrasiklin, reaksi dan proyek mahasiswa](06_Tetrasiklin_Adsorpsi_Reaksi_dan_Reporting.md) | [Versi HTML](06_Tetrasiklin_Adsorpsi_Reaksi_dan_Reporting.html)

## File teknis pendamping

- `scripts/cif_to_structure_fdf.py`: konversi informasi struktur ke FDF.
- `scripts/build_slab_trial.py`: membuat kandidat slab.
- `scripts/place_tc_trial.py`: kandidat geometri TC di atas slab.
- `scripts/submit_example.slurm`: job template SLURM.

**Lihat versi HTML:** buka `index.html` dengan browser setelah ekstraksi ZIP. Navigasi antarbab tidak memerlukan koneksi internet.
