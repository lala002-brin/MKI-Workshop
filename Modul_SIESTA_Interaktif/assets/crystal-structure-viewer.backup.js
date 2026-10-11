
/* MKI Crystal Structure Viewer
   Menggunakan 3Dmol.js
   Warna atom disesuaikan agar mendekati VESTA
*/

(() => {
  "use strict";

  const root = document.getElementById("mki-crystal");

  if (!root || root.dataset.ready === "yes") return;

  root.dataset.ready = "yes";

  const $ = id => root.querySelector("#" + id);

  // ==========================================
  // DATA CONTOH: Cu2O DAN H2O
  // ==========================================

  const CU = `data_Cu2O_cuprite_ideal
_chemical_formula_sum 'Cu4 O2'
_cell_length_a 4.2696
_cell_length_b 4.2696
_cell_length_c 4.2696
_cell_angle_alpha 90
_cell_angle_beta 90
_cell_angle_gamma 90
_symmetry_space_group_name_H-M 'P 1'
loop_
_atom_site_label
_atom_site_type_symbol
_atom_site_fract_x
_atom_site_fract_y
_atom_site_fract_z
O1 O 0.0 0.0 0.0
O2 O 0.5 0.5 0.5
Cu1 Cu 0.25 0.25 0.25
Cu2 Cu 0.25 0.75 0.75
Cu3 Cu 0.75 0.25 0.75
Cu4 Cu 0.75 0.75 0.25
`;

  const H2O = `3
H2O educational XYZ in angstrom
O 0.000000 0.000000 0.000000
H 0.758602 0.000000 0.504284
H -0.758602 0.000000 0.504284
`;

  // ==========================================
  // VARIABEL UTAMA
  // ==========================================

  let viewer = null;
  let model = null;
  let selection = [];
  let labels = [];

  let current = {
    name: "Cu₂O cuprite ideal",
    text: CU,
    format: "cif"
  };

  // ==========================================
  // STATUS
  // ==========================================

  function msg(text, error = false) {
    $("cv-status").textContent = text;

    $("cv-status").classList.toggle(
      "cv-error",
      error
    );
  }

  // ==========================================
  // MEMUAT 3DMOL.JS
  // ==========================================

  function loadLibrary() {
    return new Promise((resolve, reject) => {

      if (window.$3Dmol) {
        resolve();
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://3Dmol.org/build/3Dmol-min.js";

      script.async = true;

      script.onload = () => {
        if (window.$3Dmol) {
          resolve();
        } else {
          reject(
            new Error("Pustaka 3Dmol.js tidak tersedia")
          );
        }
      };

      script.onerror = () => {
        reject(
          new Error(
            "Gagal memuat 3Dmol.js. Periksa koneksi internet."
          )
        );
      };

      document.head.appendChild(script);
    });
  }

  // ==========================================
  // WARNA BACKGROUND
  // ==========================================

  function bg() {
    const backgrounds = {
      white: "#ffffff",
      dark: "#0f182c",
      blue: "#e8f3ff"
    };

    return backgrounds[$("cv-bg").value] || "#ffffff";
  }

  // ==========================================
  // WARNA ATOM SEPERTI VESTA
  // ==========================================

  const atomColors = {
    Cu: "#2854B8",
    O: "#FF2020",
    Fe: "#D68A28",
    Co: "#A855F7",
    N: "#3058E8",
    C: "#555555",
    H: "#FFFFFF",
    Zn: "#80B3FF",
    S: "#FFD700"
  };

  // ==========================================
  // FUNGSI VISUALISASI
  // ==========================================

  function recolor() {

    if (!viewer || !model) return;

    viewer.setBackgroundColor(bg());

    viewer.removeAllLabels();

    labels = [];

    const scale =
      Number($("cv-scale").value) / 100;

    $("cv-scale-val").textContent =
      Math.round(scale * 100) + "%";

    const type = $("cv-style").value;

    // Pilihan gaya atom
    function atomStyle(color) {

      // Space-filling
      if (type === "sphere") {
        return {
          sphere: {
            scale: scale * 0.9,
            color: color
          }
        };
      }

      // Sticks
      if (type === "stick") {
        return {
          stick: {
            radius: Math.max(
              0.06,
              scale * 0.23
            ),
            color: color
          }
        };
      }

      // Wireframe
      if (type === "line") {
        return {
          line: {
            linewidth: 1.8,
            color: color
          }
        };
      }

      // Default: Ball & Stick
      return {
        sphere: {
          scale: scale * 0.46,
          color: color
        },

        stick: {
          radius: Math.max(
            0.08,
            scale * 0.22
          ),
          color: color
        }
      };
    }

    // Warna default
    viewer.setStyle(
      {},
      atomStyle("#8996A6")
    );

    // Warna berdasarkan unsur
    for (const [element, color]
      of Object.entries(atomColors)) {

      viewer.setStyle(
        { elem: element },
        atomStyle(color)
      );
    }

    // ======================================
    // LABEL ATOM
    // ======================================

    const atoms = model.selectedAtoms({});

    if ($("cv-label").checked) {

      if (atoms.length > 180) {

        msg(
          "Label dinonaktifkan untuk struktur dengan lebih dari 180 atom."
        );

      } else {

        for (const atom of atoms) {

          const label = viewer.addLabel(
            atom.elem || "?",
            {
              position: {
                x: atom.x,
                y: atom.y,
                z: atom.z
              },

              backgroundOpacity: 0.62,

              backgroundColor:
                bg() === "#0f182c"
                  ? "#112844"
                  : "#ffffff",

              fontColor:
                bg() === "#0f182c"
                  ? "#ffffff"
                  : "#111827",

              fontSize: 11,
              showBackground: true,
              inFront: true
            }
          );

          labels.push(label);
        }
      }
    }

    viewer.render();
  }

  // ==========================================
  // INFORMASI STRUKTUR
  // ==========================================

  function updateSummary() {

    const atoms = model.selectedAtoms({});

    const count = {};

    atoms.forEach(atom => {
      count[atom.elem] =
        (count[atom.elem] || 0) + 1;
    });

    $("cv-name").textContent =
      current.name;

    $("cv-summary").textContent =
      atoms.length + " atom · " +
      Object.entries(count)
        .map(([element, total]) =>
          element + ": " + total
        )
        .join(" · ");

    $("cv-elements").textContent =
      "Komposisi atom: " +
      Object.entries(count)
        .map(([element, total]) =>
          element + " (" + total + ")"
        )
        .join(", ");
  }

  // ==========================================
  // MEMUAT STRUKTUR 3D
  // ==========================================

  function activate(text, format, name) {

    if (!viewer) return;

    if (viewer.stopAnimate) {
      viewer.stopAnimate();
    }

    viewer.removeAllModels();
    viewer.removeAllShapes();
    viewer.removeAllLabels();

    selection = [];

    $("cv-distance").textContent =
      "Klik atom pertama, lalu atom kedua.";

    model = viewer.addModel(
      text,
      format
    );

    const atoms = model.selectedAtoms({});

    if (!atoms.length) {
      throw new Error(
        "Tidak ditemukan atom dalam file CIF/XYZ."
      );
    }

    current = {
      text,
      format,
      name
    };

    // ======================================
    // PENGUKURAN JARAK ATOM
    // ======================================

    model.setClickable(
      {},
      true,
      atom => {

        if (selection.length === 2) {

          selection = [];

          viewer.removeAllShapes();
        }

        selection.push(atom);

        if (selection.length === 1) {

          $("cv-distance").textContent =
            "Atom 1: " +
            atom.elem +
            " #" +
            (atom.index ?? "?") +
            "; pilih atom kedua.";

        } else {

          const [a, b] = selection;

          const distance = Math.hypot(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z
          );

          viewer.addLine({
            start: {
              x: a.x,
              y: a.y,
              z: a.z
            },

            end: {
              x: b.x,
              y: b.y,
              z: b.z
            },

            color: "#ed8b2c",
            dashed: true,
            radius: 0.055
          });

          $("cv-distance").textContent =
            a.elem +
            "–" +
            b.elem +
            ": " +
            distance.toFixed(3) +
            " Å";

          viewer.render();
        }
      }
    );

    recolor();

    viewer.zoomTo();
    viewer.render();

    updateSummary();

    msg(
      name +
      " berhasil dimuat. Klik dua atom untuk mengukur jarak."
    );
  }

  // ==========================================
  // EKSPOR XYZ
  // ==========================================

  function readXYZ(atoms) {

    const coordinates = atoms.map(atom =>
      atom.elem + " " +
      atom.x.toFixed(7) + " " +
      atom.y.toFixed(7) + " " +
      atom.z.toFixed(7)
    );

    return (
      atoms.length + "\n" +
      "Exported from MKI Viewer; Angstrom\n" +
      coordinates.join("\n") +
      "\n"
    );
  }

  function download(name, body, type) {

    const url = URL.createObjectURL(
      new Blob([body], { type })
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = name;

    document.body.appendChild(link);

    link.click();
    link.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1500);
  }

  // ==========================================
  // INISIALISASI VIEWER
  // ==========================================

  async function init() {

    try {

      await loadLibrary();

      viewer = window.$3Dmol.createViewer(
        $("cv-canvas"),
        {
          backgroundColor: "#ffffff",
          antialias: true
        }
      );

      $("cv-loading").classList.add(
        "cv-hidden"
      );

      activate(
        CU,
        "cif",
        "Cu₂O cuprite ideal"
      );

      if (typeof ResizeObserver !== "undefined") {

        new ResizeObserver(() => {
          viewer.resize();
        }).observe($("cv-canvas"));
      }

    } catch (error) {

      $("cv-loading").textContent =
        error.message;

      msg(error.message, true);
    }
  }

  // ==========================================
  // TOMBOL DATA CONTOH
  // ==========================================

  $("cv-cu").addEventListener(
    "click",
    () => {
      try {
        activate(
          CU,
          "cif",
          "Cu₂O cuprite ideal"
        );
      } catch (error) {
        msg(error.message, true);
      }
    }
  );

  $("cv-water").addEventListener(
    "click",
    () => {
      try {
        activate(
          H2O,
          "xyz",
          "H₂O molekul"
        );
      } catch (error) {
        msg(error.message, true);
      }
    }
  );

  // ==========================================
  // UPLOAD CIF / XYZ
  // ==========================================

  $("cv-upload").addEventListener(
    "change",
    async event => {

      const file = event.target.files?.[0];

      if (!file) return;

      try {

        const extension =
          file.name.toLowerCase()
            .split(".")
            .pop();

        if (!["cif", "xyz"].includes(extension)) {
          throw new Error(
            "Format hanya CIF atau XYZ."
          );
        }

        if (file.size > 8 * 1024 * 1024) {
          throw new Error(
            "Maksimum file 8 MB."
          );
        }

        const text = await file.text();

        activate(
          text,
          extension,
          file.name
        );

      } catch (error) {

        msg(error.message, true);
      }

      event.target.value = "";
    }
  );

  // ==========================================
  // PERUBAHAN GAYA VISUALISASI
  // ==========================================

  for (const id of [
    "cv-style",
    "cv-bg",
    "cv-label"
  ]) {

    $(id).addEventListener(
      "change",
      recolor
    );
  }

  $("cv-scale").addEventListener(
    "input",
    recolor
  );

  // ==========================================
  // RESET KAMERA
  // ==========================================

  $("cv-reset").addEventListener(
    "click",
    () => {

      if (!viewer) return;

      viewer.zoomTo();
      viewer.render();
    }
  );

  // ==========================================
  // ROTASI OTOMATIS
  // ==========================================

  $("cv-spin").addEventListener(
    "click",
    () => {

      if (viewer) {
        viewer.spin("y", 1);
      }
    }
  );

  $("cv-stop").addEventListener(
    "click",
    () => {

      if (viewer) {
        viewer.spin(false);
      }
    }
  );

  // ==========================================
  // DOWNLOAD XYZ
  // ==========================================

  $("cv-download-xyz").addEventListener(
    "click",
    () => {

      if (!model) return;

      const atoms = model.selectedAtoms({});

      download(
        "structure_export.xyz",
        readXYZ(atoms),
        "text/plain;charset=utf-8"
      );

      msg(
        "XYZ berhasil diekspor. File XYZ tidak menyimpan sel kristal."
      );
    }
  );

  // ==========================================
  // DOWNLOAD PNG
  // ==========================================

  $("cv-png").addEventListener(
    "click",
    () => {

      if (!viewer) return;

      try {

        const uri = viewer.pngURI();

        const link =
          document.createElement("a");

        link.href = uri;
        link.download =
          "crystal-structure-view.png";

        document.body.appendChild(link);

        link.click();
        link.remove();

      } catch (error) {

        msg(
          "Ekspor PNG gagal: " +
          error.message,
          true
        );
      }
    }
  );

  // ==========================================
  // MULAI VIEWER
  // ==========================================

  init();

})();

