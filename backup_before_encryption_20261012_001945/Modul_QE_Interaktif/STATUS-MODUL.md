# Status modul — QE Toolkit Pro Foundation

| Modul | Tersedia sekarang | Pengembangan untuk paket final |
|---|---|---|
| Output Explorer | Pembacaan energi, SCF marker, Fermi, total magnetization dari pola pw.x | parsing semua variasi QE 7.x, XML save |
| SCF Convergence | Grafik dari iteration dan total energy | spin mixing diagnostics, full cycles |
| Geometry Optimization | Energi ionic marker dan grafik | forces, pressure, variable-cell path, explicit step verification |
| Bond Analysis | XYZ distances tanpa PBC | full PBC POSCAR/CIF/XSF, angle & 3D viewer |
| Cutoff/k-points | tabel antar run, tren energi | pairing `.in`/`.out`, energy per atom, residual convergence |
| DOS/PDOS | Grafik CSV yang dinormalisasi | raw dos.x/projwfc.x multiple projections/spin |
| Band Structure | Multi-band CSV plot | native bands.x, occupation-resolved band gap |
| Magnetism | total/absolute magnetization pada pw.x | atom-resolved Löwdin data dari projwfc.x |
| Surface Work Function | φ=Evac−EF | average potential ingestion dari pp.x/average.x |
| Heterojunction | VBM/CBM offset pada common reference | potential lineup, vacuum alignment validation |
| Charge Density | selisih 3 CUBE cocok, planar profile | coordinate-based plotting, CUBE atom geometry validation, isosurfaces |
| Adsorption | Eads + koreksi manual, Ry → eV/kJ/mol | file pairing, BSSE/ZPE workflows, multi-config ranking |
| Multi-run | pembandingan log dan plot SCF | auto pair pw.x input and output, controlled audit |
| Quality checker | pemeriksaan parameter dari QE input dan log | full pseudopotential and convergence metadata |
| Report generator | form report HTML/JSON | cross-tool schema and automatic result import |

Semua contoh hasil simulasi adalah data sintetis. Toolkit foundation dimaksudkan sebagai dasar pengembangan terstruktur, bukan pengganti software QE dan verifikasi hasil DFT.
