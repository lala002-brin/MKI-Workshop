---
title: Bulk Crystal Studio Beta 1.6
level: research_toolkit
---

# KITCAT Bulk Crystal Studio — Beta

**Structure Core · Bulk Crystal · Guided Foundation**

Workspace pemodelan kristal berbasis browser. Coba demo silikon, impor format struktur yang didukung, ubah kisi, buat supercell, periksa geometri, lalu ekspor proyek.

!!! warning "Status: Beta / scientific prototype"
    Belum merupakan editor atom 3D penuh atau bukti bahwa model telah konvergen secara DFT. **Jangan mengunggah berkas rahasia** ke halaman ini. Aplikasi statis di bawah memiliki URL langsung yang tidak dilindungi enkripsi halaman MkDocs.

<div class="kitcat-beta-frame">
  <iframe title="KITCAT Bulk Crystal Studio Beta" src="../assets/kitcat-bulk-studio-beta/studio/" loading="lazy" referrerpolicy="no-referrer" allow="fullscreen" allowfullscreen style="width:100%;min-height:920px;border:1px solid var(--md-default-fg-color--lightest);border-radius:12px;background:#f6f9ff"></iframe>
</div>

Jika panel tidak tampil, buka [aplikasi Beta di tab terpisah](../assets/kitcat-bulk-studio-beta/studio/).

## Yang sudah tersedia

- Visualisasi atom dan unit cell (Canvas), orbit, zoom, pemilihan atom, fit otomatis berdasarkan proyeksi, mode fullscreen (jika diizinkan browser), ukuran atom dan transparansi citra periodik, petunjuk ikatan perkiraan, dan citra periodik terbatas.
- Edit posisi atom dalam koordinat fraksional; undo/redo hingga 50 langkah.
- Pengukuran jarak minimum periodik untuk pasangan atom yang dipilih.
- Edit matriks kisi dengan **koordinat fraksional tetap**.
- Supercell diagonal berbasis Structure Core.
- Impor CIF subset yang didukung, POSCAR, XYZ, dan JSON.
- Pemeriksaan geometri dasar; ekspor JSON/POSCAR/Extended XYZ sesuai batasan format.

## Catatan ilmiah dan keamanan

- CIF yang tidak menyertakan operasi simetri yang diperlukan mungkin ditolak. Struktur disorder dan okupansi parsial belum didukung lengkap.
- Nilai ``Pass`` dari validasi geometri **tidak** membuktikan stabilitas, konvergensi energi, atau kesiapan DFT.
- Sistem login melindungi **konten halaman Markdown**, bukan URL aset statis di ``assets/``.
- Hasil perhitungan QE nyata belum diverifikasi; versi Beta tidak menjalankan ``pw.x``.

> **Catatan 1.6:** Ikatan yang digambar adalah heuristik jarak (bukan analisis ikatan kimia); periodic images hanya tampilan visual terbatas, bukan pembentukan supercell.

> **Catatan 1.6:** Fullscreen menggunakan API browser; jika tidak diizinkan dalam iframe akan mencoba expanded view. Viewer tetap berbasis Canvas 2D dan bukan WebGL. Ikatan tetap heuristik.


### Tambahan 1.4

- Koordinat atom dapat diedit sebagai fraksional atau Kartesian (Å).
- Filter unsur pada tabel posisi atom.
- Sudut tiga atom dan dihedral empat atom dihitung dengan rantai minimum-image periodik (lokal), dengan indikasi jika citra minimum ambigu.
- Pengukuran jarak dua atom tetap memakai engine minimum-image.

### Tambahan 1.6

- Angle dan dihedral menggunakan rantai minimum-image periodik dengan peringatan untuk citra ekuivalen/ambigu. Tidak menggantikan molecular unwrapping menyeluruh.
- Pilihan penampakan 1×1×1, 2×2×2, atau 3×3×3 hanya **visualisasi**, tidak mengubah atom/supercell proyek.
- Label ID atom tersedia untuk struktur hingga 150 atom. Pemeriksaan referensi ilmiah dan QE runtime masih terpisah.
