# Part 02. Bulk nyata: Cu₂O, Fe₃O₄, dan ZIF-67

> Tujuan: membuat struktur awal teruji dan file `.fdf` untuk **single-point SCF** serta optimasi. Jangan menjalankan geometri yang belum lolos pemeriksaan ikatan atau spin.

## 1. Cu₂O: sel kubik enam atom

Cuprite (struktur ideal) mempunyai 4 Cu dan 2 O dalam sel kubik konvensional. Salah satu representasi fraksional, **sebagai contoh model ideal yang harus diperiksa**, adalah:

```fdf
SystemName Cu2O bulk example
SystemLabel Cu2O_TEST
NumberOfSpecies 2
NumberOfAtoms 6
%block ChemicalSpeciesLabel
1 29 Cu
2  8 O
%endblock ChemicalSpeciesLabel
LatticeConstant 1.0 Ang
%block LatticeVectors
4.27 0.00 0.00
0.00 4.27 0.00
0.00 0.00 4.27
%endblock LatticeVectors
AtomicCoordinatesFormat Fractional
%block AtomicCoordinatesAndAtomicSpecies
0.25 0.25 0.25 1
0.25 0.75 0.75 1
0.75 0.25 0.75 1
0.75 0.75 0.25 1
0.00 0.00 0.00 2
0.50 0.50 0.50 2
%endblock AtomicCoordinatesAndAtomicSpecies
XC.functional GGA
XC.authors PBE
Spin non-polarized
PAO.BasisSize DZP
PAO.EnergyShift 0.02 Ry
MeshCutoff 300 Ry
%block kgrid_Monkhorst_Pack
4 0 0 0.0
0 4 0 0.0
0 0 4 0.0
%endblock kgrid_Monkhorst_Pack
SolutionMethod diagon
MaxSCFIterations 200
DM.Tolerance 1.d-5
DM.MixingWeight 0.10
DM.NumberPulay 5
ElectronicTemperature 25 meV
MD.TypeOfRun CG
MD.Steps 0
DM.UseSaveDM false
MD.UseSaveXV false
WriteForces true
```

**Pseudopotential:** sediakan `Cu.psml` dan `O.psml` (atau format `.psf` yang sesuai) dengan label yang tepat. SIESTA tidak membuat pseudopotential dari CIF. File di atas adalah input awal *single-point*, bukan hasil parameter konvergen.

## 2. Skrip ASE generik untuk memeriksa CIF dan menghasilkan FDF struktur

Lihat `scripts/cif_to_structure_fdf.py`. Script tersebut menyimpan vektor kisi, koordinat Cartesian, jumlah atom, dan species map. Untuk membuat Cu₂O:

```bash
python scripts/cif_to_structure_fdf.py inputs/Cu2O.cif \
    -o 01_bulk/Cu2O/structure.fdf
```

Konten dapat dipanggil dari input utama menggunakan `%include structure.fdf` jika file berada dalam direktori yang sesuai.

## 3. Fe₃O₄: konfigurasi ferrimagnetik lebih penting daripada sekadar CIF

- Mulai dari struktur inverse spinel (56 atom konvensional sering praktis), bukan sembarang struktur Fe:O = 3:4.
- Identifikasi **Fe(A) tetrahedral** dan **Fe(B) oktahedral** melalui koordinasi terhadap O dan informasi kristalografi.
- Tetapkan spin awal berlawanan pada subkisi Fe(A) dan Fe(B). Uji lebih dari satu susunan awal.
- Periksa momen lokal dan keadaan akhir, jangan mengandalkan total magnetisasi saja.
- Terapkan DFT+U Fe 3d hanya setelah memeriksa implementasi dan sensitivitas nilai U pada metode yang dipakai.

Contoh fragmen pengaturan (nomor atom **harus diganti** menurut struktur Fe₃O₄ aktual):

```fdf
Spin polarized
%block DM.InitSpin
  1  4.0  # hanya ilustrasi: Fe(B)
  2 -4.0  # hanya ilustrasi: Fe(A)
%endblock DM.InitSpin
```

**Peringatan:** jangan gunakan dua baris tersebut sebagai konfigurasi Fe₃O₄ 56 atom. Semua Fe harus diklasifikasikan dan dipetakan. Nomor atom dalam FDF mengikuti urutan atom struktur yang dipakai.

## 4. ZIF-67: pilihan sel dan kondisi magnetik

- Periksa formula Co(2-methylimidazolate)₂ dan hitung Co, C, N, H pada CIF.
- Tentukan apakah CIF mengandung pelarut, okupansi parsial, hidrogen yang tidak dicantumkan, atau disorder.
- Gunakan sel primitive yang valid untuk sifat bulk; jangan langsung membuat 2×2×2 jika sel sudah ratusan atom.
- Uji inisialisasi spin Co, beberapa keadaan magnetik bila masuk akal, dan koreksi dispersi yang didukung SIESTA yang terpasang.
- Jangan menyimpulkan TC dapat masuk ke pori ZIF-67 hanya karena ukuran rongga lebih besar daripada molekul. Jendela pori, fleksibilitas, dan cacat perlu diperiksa.

## 5. Generasi input akhir dari dua bagian

Jika Anda menyimpan parameter pada `parameters.fdf` dan struktur pada `structure.fdf`, buat `run.fdf`:

```fdf
%include structure.fdf
%include parameters.fdf
```

**Periksa direktori eksekusi.** `%include` harus menemukan file yang benar dan seluruh pseudopotential harus tersedia di job working directory.

## 6. Pengujian struktur menggunakan ASE

```python
from ase.io import read
from collections import Counter
for p in ['Cu2O.cif', 'Fe3O4.cif', 'ZIF67.cif']:
    atoms = read(p)
    print(p, len(atoms), Counter(atoms.get_chemical_symbols()))
    print('cell Å:', atoms.cell.lengths(), 'angles °:', atoms.cell.angles())
    print('volume Å³:', atoms.get_volume(), 'PBC:', atoms.pbc)
```

**Checkpoint:** masing-masing struktur menunjukkan formula, koordinasi, dan sel yang tepat. Untuk Cu₂O ideal, koordinasi Cu:O mendekati 2:1 secara tetangga pertama (setiap Cu dua O, setiap O empat Cu).
