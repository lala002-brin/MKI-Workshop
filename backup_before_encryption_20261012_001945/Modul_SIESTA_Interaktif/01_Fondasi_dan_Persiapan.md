# Part 01. Fondasi DFT dan desain penelitian

> **Sistem penelitian:** Fe₃O₄ / ZIF-67 / Cu₂O untuk adsorpsi dan potensi fotodegradasi tetrasiklin (TC). **Software utama:** SIESTA + ASE + HPC SLURM. Semua angka parameter dalam modul adalah titik awal pengujian, **bukan hasil perhitungan**.

## 1. Pertanyaan ilmiah sebelum memilih model

| Pertanyaan | Model atomistik | Analisis | Batas kesimpulan |
|---|---|---|---|
| Sifat intrinsik Cu₂O, Fe₃O₄, ZIF-67? | Bulk periodik | Konstruksi kisi, DOS/PDOS, pita, spin | Tidak membuktikan transfer elektron antarmuka |
| Permukaan mana yang stabil? | Slab dan berbagai terminasi | Energi permukaan, struktur, fungsi kerja | Permukaan ideal tidak selalu mewakili sampel basah |
| Apa yang terjadi ketika komponen berkontak? | Interface dua/tiga komponen | Binding, PDOS berlapis, Δρ, potensial | Δρ keadaan dasar bukan bukti aliran elektron akibat cahaya |
| Bagaimana TC menempel? | Slab/klaster + berbagai konformer TC | Energi adsorpsi, jarak, muatan, PDOS | E_ads dalam vakum bukan energi bebas adsorpsi air |
| Bagaimana TC terdegradasi? | Intermediat reaksi, keadaan transisi | Energi reaksi, NEB jika sesuai | Butuh data reaksi dan, untuk fotokimia, model tereksitasi/bukti eksperimen |

## 2. Pilih bulk, supercell, slab atau klaster?

- **Bulk satu sel**: perhitungan kisi, DOS, band structure, sifat intrinsik. Untuk Cu₂O cuprite gunakan sel kubik 6 atom; bukan 2×2×2 secara otomatis.
- **Bulk supercell**: cacat, dopan, tatanan spin yang tidak muat pada sel kecil, atau pengujian interaksi cacat periodik.
- **Slab**: situs adsorpsi dan fungsi kerja. Tetapkan indeks Miller, terminasi, ketebalan, luas lateral, vakum dan relaksasi lapisan.
- **Interface**: kontak ZIF-67/Cu₂O dan Fe₃O₄/ZIF-67. Pilih geometri dari karakterisasi. MOF berpori tidak otomatis menjadi lapisan kristal datar.
- **Klaster**: skrining kimia lokal jika slab ZIF-67/interface periodik terlalu mahal. Jangan gunakan band structure klaster untuk menyimpulkan pita bulk.

## 3. Matriks keputusan material

| Material | Sel awal | Metode awal | Masalah khusus |
|---|---|---|---|
| Cu₂O | Cuprite 6 atom, Pn-3m | PBE, non-polarized sebagai baseline | PBE sering meremehkan gap; cek transisi optik vs gap fundamental |
| Fe₃O₄ | Inverse spinel, sel konvensional 56 atom yang memungkinkan spin ferrimagnetik | Spin-polarized, lalu +U tervalidasi | Situs Fe tetrahedral dan oktahedral, keteraturan muatan, rekonstruksi |
| ZIF-67 | Sel primitive penuh yang benar, Co(2-methylimidazolate)₂ | Spin-polarized, dispersi yang didukung versi | Hidrogen, disorder, spin Co, fleksibilitas MOF, pori |

## 4. Struktur proyek yang konsisten

```text
DFT_TC/
├── inputs/                         # CIF dan pseudopotential asli
├── scripts/                        # generator dan analisis
├── 01_bulk/{Cu2O,Fe3O4,ZIF67}/
│   ├── convergence/
│   ├── optimization/
│   ├── scf/
│   ├── dos/
│   └── bands/
├── 02_surface/{Cu2O,Fe3O4,ZIF67}/
├── 03_interface/{ZIF67_Cu2O,Fe3O4_ZIF67,triple}/
├── 04_TC/{conformers,protonation,adsorption}/
├── 05_reaction/
└── reports/{tables,figures,logs}/
```

## 5. Persiapan HPC

```bash
# Aktivasi Python untuk ASE (sesuaikan lokasi conda)
source ~/miniconda3/etc/profile.d/conda.sh
conda activate base
python -c 'import ase,numpy; print("ASE/NumPy OK")'
which siesta || module avail siesta
which sbatch && which srun
```

**Jangan menyamakan Python dan SIESTA.** Python/ASE membuat struktur serta file input; executable SIESTA menjalankan DFT; SLURM mengelola job.

## 6. Checkpoint sebelum simulasi

- [ ] File CIF mempunyai komposisi benar dan atom H lengkap pada ZIF-67.
- [ ] Tidak ada okupansi parsial yang belum dimodelkan.
- [ ] Sel dan koordinat memiliki satuan serta periodic boundary conditions yang benar.
- [ ] Pseudopotential semua unsur sesuai XC, versi SIESTA, valensi, dan format file.
- [ ] Parameter k-point, spin, dan dispersi dipilih sesuai model.
- [ ] Tersedia catatan versi SIESTA, compiler, pseudopotential, parameter U, dan sumber CIF.

**Bacaan utama:** [Manual SIESTA 5.4](https://docs.siesta-project.org/projects/siesta/en/5.4/reference/siesta.html), [ASE](https://ase-lib.org/).
