---
level: research_toolkit
---

# Quantum ESPRESSO Toolkit Pro — Instalasi

Paket ini mencakup dashboard dan 15 halaman toolkit, stylesheet bersama, JavaScript bersama, dan contoh input/output sintetis. Ini versi **foundation / functional beta**: alat inti dapat diuji, tetapi beberapa pipeline lanjutan memerlukan normalisasi hasil program QE dan validasi output asli.

## Instalasi

Buka Terminal setelah ZIP diunduh ke `~/Downloads`:

```bash
cd ~/Documents/MKI-Workshop
mkdir -p docs/Modul_QE_Interaktif/assets
# Sesuaikan path ZIP jika Chrome memberi akhiran (1) / (2)
mkdir -p /tmp/qe_toolkit_pro
unzip -o ~/Downloads/QE_Toolkit_Pro_MkDocs.zip -d /tmp/qe_toolkit_pro
cp /tmp/qe_toolkit_pro/QE_Toolkit_Pro_MkDocs/*.md docs/Modul_QE_Interaktif/
cp /tmp/qe_toolkit_pro/QE_Toolkit_Pro_MkDocs/assets/* docs/Modul_QE_Interaktif/assets/
```

Di `mkdocs.yml`, tambahkan potongan `NAV_SNIPPET.yml` di dalam daftar `nav:` dengan indentasi seperti yang disediakan. Dalam daftar `extra_css:` tambahkan:

```yaml
  - Modul_QE_Interaktif/assets/qe-toolkit-pro.css
```

Dalam daftar `extra_javascript:` tambahkan:

```yaml
  - Modul_QE_Interaktif/assets/qe-toolkit-pro.js
```

Jangan menduplikasi kunci YAML (`extra_css`, `extra_javascript`, `nav`).

```bash
mkdocs build --clean
```

Jika `mkdocs serve` berjalan, akses `/Modul_QE_Interaktif/` lalu hard refresh `Cmd + Shift + R`.

## Pengujian

- Buka QE Output Explorer → unggah `examples/qe_sample.out` → baca energi akhir dan marker konvergensi.
- Buka SCF Analyzer → unggah file sama → periksa grafik energi tiga iterasi.
- DOS/PDOS dan Band Structure: gunakan CSV example yang headernya sesuai contoh.
- Adsorption: nilai form bawaan bersifat ilustrasi, bukan hasil riset.
- Charge density: gunakan tiga CUBE yang memiliki dimensi, origin, dan voxel vectors identik. Batas sementara 200.000 voxel.
- Report Generator: belum otomatis mengimpor JSON semua modul; laporan berbasis input pengguna dan ekspor HTML/JSON.

## Batasan ilmiah

1. Format native `dos.x`, `projwfc.x`, `bands.x`, dan keluaran `pp.x` perlu dikonversi/ditata menjadi CSV atau CUBE yang diterima modul tertentu. Tidak ada klaim bahwa format native semuanya terbaca otomatis.
2. Uji cutoff dan k-point harus menggunakan rangkaian perhitungan terkontrol dengan sistem dan metode setara; audit hanya pemeriksaan kelengkapan data.
3. Hasil SCF, geometri, spin dan adsorpsi harus dibuktikan dari perhitungan nyata sebelum publikasi.
4. Pembuatan band gap membutuhkan informasi okupansi atau Fermi dan seluruh titik-k; versi ini menyediakan visualisasi pita CSV, bukan gap otomatis yang tervalidasi.
5. Selisih kerapatan mensyaratkan geometri fragmen, pseudopotensial, dan satuan yang konsisten di luar pemeriksaan grid.
6. Modul struktur XYZ tidak memakai PBC (minimum image), dan versi ini belum menyediakan viewer 3D interaktif.
7. Tidak ada hasil simulasi yang dihasilkan otomatis oleh situs ini; QE tetap harus dijalankan terpisah.
