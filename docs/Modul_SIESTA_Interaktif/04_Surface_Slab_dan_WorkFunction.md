---
level: research_toolkit
---

# Part 04. Surface/slab: dari bulk ke permukaan aktif

## 1. Kapan permukaan wajib dibuat?

- Adsorpsi TC pada permukaan luar Cu₂O, Fe₃O₄, atau ZIF-67.
- Work function dan dipol permukaan.
- Rekonstruksi/terminasi serta energi permukaan.
- Persiapan kontak interface.

**Bulk 3D tidak memiliki daerah vakum**, sehingga tidak dapat langsung menghasilkan work function permukaan yang benar.

## 2. Pilihan permukaan awal

| Material | Kandidat | Pemeriksaan wajib |
|---|---|---|
| Cu₂O | (111), (100), opsional (110) | Cu-rich/O-rich, nonstoikiometri, kemungkinan polar |
| Fe₃O₄ | (001), (111) | rekonstruksi, Fe(A)/Fe(B), polaritas dan spin |
| ZIF-67 | facet berdasarkan morfologi eksperimen | pemutusan Co-N, ligan terminal, passivation, stabilitas pori |

Indeks Miller **bukan penetapan terminasi**. Permukaan (111) dapat memiliki beberapa susunan atom terluar. Jangan menyimpulkan permukaan paling stabil hanya dengan melihat satu slab.

## 3. Contoh pembuatan Cu₂O(111) dengan ASE

Gunakan `scripts/build_slab_trial.py` dalam paket. Contoh:

```bash
python scripts/build_slab_trial.py inputs/Cu2O.cif \
  --hkl 1 1 1 --layers 6 --repeat 2 2 \
  --vacuum 18 -o Cu2O_111_trial.vasp
```

**Periksa visualisasi**: koordinasi atom, polaritas, terminasi atas/bawah, jarak antaratom, serta apakah pemotongan struktur menghasilkan ikatan/stoikiometri yang wajar. Generator ini hanya kandidat geometri.

## 4. Konvergensi slab

| Parameter | Uji awal | Target |
|---|---|---|
| Ketebalan | 4, 6, 8 lapisan struktural | energi permukaan/adsorpsi stabil |
| Vakum | 15, 18, 22 Å | potensial vakum datar dan energi stabil |
| Sel lateral | 1×1, 2×2, 3×3 jika memungkinkan | interaksi antar salinan TC kecil |
| Grid k | Nx × Ny × 1 | energi adsorpsi/work function stabil |
| Constraint | fiksasi bawah jika sesuai bulk | bagian atas bebas berelaksasi |

Satu lapisan struktural tidak sama pada setiap orientasi atau bahan. Permukaan polar/asimetris dapat memerlukan koreksi dipol dan strategi terminasi khusus.

## 5. Surface energy

Untuk slab simetris stoikiometrik dengan dua permukaan identik:

$$\gamma=\frac{E_{slab}-nE_{bulk}}{2A}$$

Untuk slab asimetris atau nonstoikiometrik, formula sederhana ini umumnya tidak cukup. Gunakan pendekatan potensial kimia dan perhatikan dua permukaan yang berbeda.

## 6. Work function dan acuan energi

$$\Phi=E_{vac}-E_F$$

Gunakan profil potensial rata-rata bidang (planar average) sepanjang normal slab. Tentukan level vakum dari daerah plateau yang tidak terganggu. Untuk semikonduktor, hati-hati menyamakan energi Fermi dengan band edge. Bila ingin vacuum-referenced VBM/CBM, lakukan penyelarasan potensial bulk dan slab secara konsisten.

## 7. SIESTA untuk slab

Sebagian parameter:

```fdf
MD.TypeOfRun CG
MD.Steps 250
MD.VariableCell F
MD.MaxForceTol 0.02 eV/Ang
%block kgrid_Monkhorst_Pack
4 0 0 0.0
0 4 0 0.0
0 0 1 0.0
%endblock kgrid_Monkhorst_Pack
SaveRho T
SaveElectrostaticPotential T
```

**Catatan versi:** nama/dukungan output tertentu perlu dikonfirmasi terhadap manual SIESTA yang terinstal. Untuk work function pastikan file potensial benar-benar dihasilkan dan dapat dibaca utilitas yang sesuai.

## 8. Checkpoint surface

- [ ] Permukaan berasal dari bulk yang sudah optimal.
- [ ] Semua kandidat terminasi dipertimbangkan secara kimia.
- [ ] Energi permukaan dan sifat elektronik konvergen terhadap ketebalan/vakum.
- [ ] Slab asimetris dianalisis untuk dipol.
- [ ] Sel cukup besar untuk adsorpsi TC.
- [ ] Sel lateral disimpan untuk perhitungan interface berikutnya.
