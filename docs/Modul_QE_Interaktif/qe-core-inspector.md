---
level: research_toolkit
---

# QE Core Inspector · Research Suite v3

Pemeriksaan awal output **Quantum ESPRESSO `pw.x`** dan input `.in`, dengan jejak sumber, siklus SCF, dan pemisahan status proses dari konvergensi.

<div id="qev3-app" class="qev3-app">
  <header class="qev3-hero">
    <span class="qev3-kicker">KITCAT · QUANTUM ESPRESSO RESEARCH SUITE</span>
    <h2>QE Core Inspector</h2>
    <p>Read · Validate · Trace · Export</p>
    <span class="qev3-pill">Local-first · PWscf · No server upload</span>
  </header>
  <section class="qev3-panel" aria-label="Input files">
    <h3>01 / Input & provenance</h3>
    <p>Masukkan output <code>pw.x</code> dan, bila ada, input <code>.in</code> yang sesuai. Modul membaca file secara lokal di browser.</p>
    <div class="qev3-fields">
      <label>Output <code>pw.x</code> (.out/.log/.txt)<input id="qev3-out" type="file" accept=".out,.log,.txt" /></label>
      <label>Input QE (.in/.pwi/.txt, opsional)<input id="qev3-in" type="file" accept=".in,.pwi,.txt" /></label>
    </div>
    <div class="qev3-actions"><button id="qev3-read" type="button">Analisis file</button><button id="qev3-demo" type="button" class="secondary">Muat demo sintetis</button><button id="qev3-reset" type="button" class="secondary">Reset</button></div>
    <div id="qev3-message" class="qev3-message" role="status" aria-live="polite">Belum ada file dianalisis.</div>
  </section>
  <section class="qev3-panel"><h3>02 / Calculation status</h3><div id="qev3-summary" class="qev3-summary">Belum ada hasil.</div></section>
  <section class="qev3-panel"><h3>03 / SCF history</h3><p>Energi per iterasi yang dikenali ditampilkan terpisah dari final ionic energy. Konvergensi hanya dinyatakan jika penanda eksplisit ditemukan pada log.</p><div id="qev3-chart" class="qev3-plot">Belum ada grafik.</div><div id="qev3-table" class="qev3-table"></div></section>
  <section class="qev3-panel"><h3>04 / Input parameters & audit</h3><div id="qev3-params"></div><div id="qev3-audit"></div></section>
  <section class="qev3-panel"><h3>05 / Research export</h3><div class="qev3-actions"><button id="qev3-json" type="button" disabled>Unduh JSON</button><button id="qev3-csv" type="button" class="secondary" disabled>Unduh SCF CSV</button><button id="qev3-svg" type="button" class="secondary" disabled>Unduh grafik SVG</button></div><p class="qev3-small">Ekspor membawa status data demo, nama berkas, dan keterbatasan. Modul tidak menjalankan DFT dan tidak menggantikan validasi output lengkap.</p></section>
</div>

!!! warning "Batas interpretasi ilmiah"
    `JOB DONE.` hanya menunjukkan program selesai; hal itu tidak membuktikan seluruh tahapan SCF atau optimasi geometri telah konvergen. Nilai `! total energy` dilaporkan dalam Ry. Hasil ini tidak membuktikan konvergensi cutoff/k-point dan tidak secara otomatis memverifikasi pseudopotensial.
