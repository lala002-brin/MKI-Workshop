---
title: Surface & Slab Foundation Beta
level: research_toolkit
---
# KITCAT Surface & Slab Builder — Foundation Beta

**Scientific scope:** Kandidat slab kubik konvensional pada orientasi `(001)`, `(110)`, dan `(111)`. Contoh NaCl konvensional. **Belum** mendukung Miller umum untuk sel nonkubik, pilihan terminasi atau kalkulasi energi permukaan.

!!! warning "Status prototipe"
    Hanya untuk eksplorasi model dan pengujian geometri. File yang diekspor adalah *geometry draft*, bukan input `pw.x` lengkap dan tidak siap untuk perhitungan DFT tanpa konfigurasi serta pemeriksaan tambahan. Kode aplikasi dan berkas aset statis dapat diakses langsung meskipun Markdown memakai KITCAT Gateway; jangan memuat model rahasia.

<iframe title="KITCAT Surface & Slab Foundation" src="../assets/kitcat-bulk-studio-beta/surface-foundation/" style="width:100%;min-height:1060px;border:1px solid #c8d5e5;border-radius:14px;background:#eef5fb" loading="lazy"></iframe>

[Buka workspace di tab terpisah](../assets/kitcat-bulk-studio-beta/surface-foundation/)

## Status v0.2 dan kriteria pengembangan berikutnya

Orientasi baru dibuat melalui basis kisi integer ortogonal khusus kubik. **Jumlah pengulangan bukan jumlah lapisan atom.** Atom yang muncul pada dua sisi slab tidak otomatis membuktikan pilihan terminasi sudah benar.

## Kriteria pengembangan berikutnya

1. Audit metode orientasi kisi dan dukungan Miller `(hkl)` umum melalui algoritme kristalografi teruji.
2. Enumerasi dan pemeriksaan terminasi secara eksplisit, termasuk stoikiometri serta polaritas.
3. Constraints lapisan, inspeksi geometrik interlayer, dan ekspor QE dengan validasi.
4. Pengujian pembanding dengan struktur referensi sebelum promosi ke Production.
