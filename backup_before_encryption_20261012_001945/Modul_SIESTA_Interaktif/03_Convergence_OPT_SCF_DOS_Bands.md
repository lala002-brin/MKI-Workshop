# Part 03. Dari konvergensi hingga band gap

## 1. Urutan perhitungan numerik

1. *Smoke test* single-point SCF dengan pseudopotential dan basis awal.
2. **Konvergensi MeshCutoff** dengan struktur tetap dan k-grid yang sama.
3. **Konvergensi k-point** pada cutoff terpilih; untuk bulk kecil uji bertahap.
4. **Basis convergence** dengan orbital SZ/DZP/TZP atau parameter radius bila tersedia. DZP adalah baseline, bukan jaminan.
5. **Fixed-cell relaxation**, kemudian **variable-cell** jika ingin kisi kesetimbangan teoritis.
6. **Final SCF** di struktur akhir.
7. **DOS/PDOS**, lalu **band structure**.

## 2. Matriks convergence yang dapat direproduksi

| Uji | Contoh seri | Variabel lain |
|---|---|---|
| MeshCutoff | 200, 250, 300, 400, 500 Ry | Geometri, basis, XC, spin, k-grid tetap |
| k-point Cu₂O | 2³, 4³, 6³, 8³, 10³ | Cutoff terpilih, geometri dan basis tetap |
| Basis | DZP vs TZP serta radius orbital | Geometri/k-point/cutoff tetap |
| Force consistency | bandingkan gaya dengan cutoff lebih rapat | Posisi tetap |
| Struktur slab | ketebalan, luas lateral, vakum | Identitas terminasi dan model fisik sama |

Target kerja yang bisa digunakan sebagai **kriteria awal**, bukan hukum universal: perubahan energi relatif sekitar 1 sampai 5 meV/atom; perubahan energi adsorpsi sekitar 0.03 sampai 0.05 eV; gaya akhir sekitar 0.02 eV/Å. Gunakan ambang lebih ketat bila beda energi antar kandidat sangat kecil.

Energi relatif per atom:

$$\Delta E=\frac{|E(p)-E(p_{ref})|}{N_{atom}}$$

**Jangan** memakai energi akhir dari job yang SCF-nya gagal untuk memilih parameter.

## 3. Template single-point / konvergensi

Tambahkan ke struktur FDF yang valid:

```fdf
XC.functional GGA
XC.authors PBE
PAO.BasisSize DZP
MeshCutoff 300 Ry
%block kgrid_Monkhorst_Pack
6 0 0 0.0
0 6 0 0.0
0 0 6 0.0
%endblock kgrid_Monkhorst_Pack
MaxSCFIterations 300
DM.Tolerance 1.d-5
DM.MixingWeight 0.10
DM.NumberPulay 5
SolutionMethod diagon
MD.TypeOfRun CG
MD.Steps 0
DM.UseSaveDM F
MD.UseSaveXV F
```

Nilai untuk Cu₂O, Fe₃O₄ dan ZIF-67 **tidak harus identik**. Untuk Fe₃O₄, sertakan spin site-resolved; untuk ZIF-67 sertakan koreksi dispersi yang benar-benar didukung versi.

## 4. Geometry optimization

```fdf
MD.TypeOfRun CG
MD.Steps 200
MD.VariableCell F
MD.MaxForceTol 0.02 eV/Ang
WriteForces T
WriteMDHistory T
```

Setelah posisi atom konvergen, jika ingin mengoptimasi sel bulk:

```fdf
MD.TypeOfRun CG
MD.Steps 250
MD.VariableCell T
MD.MaxForceTol 0.02 eV/Ang
MD.MaxStressTol 0.1 GPa
MD.TargetPressure 0.0 GPa
```

Untuk slab adsorpsi, umumnya **pertahankan sel tetap** dan gunakan constraints lapisan bawah bila relevan. Variasi `MD.VariableCell T` pada slab dapat mengubah vakum secara tidak fisik.

## 5. Final SCF setelah optimasi

- Salin koordinat **dan vektor sel dari geometri final**, bukan sekadar struktur CIF awal.
- Gunakan pseudopotential/XC/basis yang konsisten.
- Gunakan `MD.Steps 0`, `DM.Tolerance 1.d-5` atau hasil pengujian yang lebih ketat.
- Periksa eigenvalue, density matrix, energi total, dan konvergensi. Jangan percaya output yang terpotong.

## 6. DOS / PDOS

DOS menyatakan distribusi keadaan elektronik; PDOS memisahkan kontribusi orbital atau atom.

```fdf
%block PDOS.kgrid_Monkhorst_Pack
12 0 0 0.0
0 12 0 0.0
0 0 12 0.0
%endblock PDOS.kgrid_Monkhorst_Pack
%block ProjectedDensityOfStates
-15.0 10.0 0.05 1000 eV
%endblock ProjectedDensityOfStates
```

Plot Cu 3d/4s dan O 2p untuk Cu₂O, Fe 3d/O 2p untuk Fe₃O₄, Co 3d/N 2p/C 2p untuk ZIF-67. Untuk material magnetik periksa kanal spin terpisah.

## 7. Band structure dan penentuan gap

```fdf
BandLinesScale ReciprocalLatticeVectors
%block BandLines
 1  0.0 0.0 0.0 Gamma
40  0.5 0.0 0.0 X
40  0.5 0.5 0.0 M
40  0.0 0.0 0.0 Gamma
40  0.5 0.5 0.5 R
%endblock BandLines
```

**Hanya gunakan lintasan ini bila cocok dengan representasi sel dan simetri Brillouin zone Anda.** Untuk sel non-ortogonal/primitive yang berbeda, buat lintasan baru memakai Seekpath.

$$E_g=\min_{n\in CB,\mathbf k}E_{n\mathbf k}-\max_{m\in VB,\mathbf k}E_{m\mathbf k}$$

- Direct: VBM dan CBM berada di titik k yang sama.
- Indirect: berada pada titik berbeda.
- Band gap sepanjang jalur berlabel dapat melewatkan ekstremum di luar lintasan; verifikasi pada k-mesh rapat.
- PBE sering meremehkan gap; bedakan Kohn-Sham, quasiparticle, dan optical gap.

## 8. SLURM: template aman sebagai contoh

```bash
#!/bin/bash
#SBATCH --job-name=Cu2O_SCF
#SBATCH --nodes=1
#SBATCH --ntasks=8
#SBATCH --time=04:00:00
#SBATCH --output=slurm-%j.log
set -euo pipefail
# module load <modul-siesta-yang-tersedia>  # sesuaikan HPC
# cd "$SLURM_SUBMIT_DIR"  # default SLURM biasanya sudah di folder submit
srun siesta < run.fdf > run.out
```

Job MPI harus sesuai executable dan konfigurasi cluster. Jika `siesta` belum ditemukan, jangan menyelesaikan dengan mengasumsikan path executable.

## 9. Perintah memeriksa output

```bash
squeue -u "$USER"
tail -n 80 run.out
grep -Ei 'conver|SCF|force|stress|E_KS|warning|error' run.out | tail -n 50
ls -lh *.XV *.EIG *.DM *.PDOS* *.bands 2>/dev/null || true
```

Interpretasi: periksa **(a) pekerjaan selesai**, **(b) SCF terakhir konvergen**, **(c) optimasi berhenti karena toleransi gaya/stress, bukan kehabisan langkah**, dan **(d) hasil tidak berubah berarti saat parameter numerik ditingkatkan**.

## 10. Tabel hasil laporan

| Model | Mesh Ry | Grid k | Basis | a/b/c (Å) | Fmax (eV/Å) | Momen magnetik | Gap KS (eV) | Catatan |
|---|---:|---|---|---|---:|---|---:|---|
| Cu₂O | isi hasil | isi hasil | isi hasil | isi hasil | isi hasil | nonmagnetik | isi hasil | ... |
| Fe₃O₄ | isi hasil | isi hasil | isi hasil | isi hasil | isi hasil | ferrimagnetik | jika terdefinisi | ... |
| ZIF-67 | isi hasil | isi hasil | isi hasil | isi hasil | isi hasil | per Co | isi hasil | ... |

**Rujukan:** [SIESTA struktur optimasi](https://docs.siesta-project.org/projects/siesta/en/latest/tutorials/basic/structure-optimization/index.html), [Manual SIESTA](https://docs.siesta-project.org/projects/siesta/en/5.4/reference/siesta.html).
