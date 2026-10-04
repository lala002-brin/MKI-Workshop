/* =========================================================
   MD ANALYSIS WORKSHEET
   JAVASCRIPT PART 1
   C.1 + C.2
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const MD_WORKSHEET_STORAGE_KEY =
  "md-analysis-worksheet-v1";


/* =========================================================
   FIELD C.1 + C.2
   TOTAL: 33 FIELDS
   ========================================================= */

const MD_WORKSHEET_FIELDS = [

  /* -------------------------------------------------------
     IDENTITAS
     ------------------------------------------------------- */

  "participant-name",
  "computer-account",


  /* -------------------------------------------------------
     C.1
     ------------------------------------------------------- */

  "initial-date-computer",
  "initial-working-directory",
  "initial-dcdftbmd",
  "initial-slater-koster",
  "initial-software-version",
  "initial-mace-checkpoint",


  /* -------------------------------------------------------
     C.2
     HIPOTESIS
     ------------------------------------------------------- */

  "case1-hypothesis-atom",
  "case1-hypothesis-contact",


  /* -------------------------------------------------------
     C.2
     DATA AWAL
     ------------------------------------------------------- */

  "case1-seed-directory",
  "case1-atom-count",
  "case1-cell-volume",
  "case1-md-parameters",
  "case1-md-duration",
  "case1-frame-count",
  "case1-frame-range",
  "case1-cutoff-reason",
  "case1-graph-name",


  /* -------------------------------------------------------
     C.2
     LATIHAN
     ------------------------------------------------------- */

  "case1-hand-calculation",


  /* -------------------------------------------------------
     C.2
     HASIL CSV / GRAFIK
     ------------------------------------------------------- */

  "case1-rdf-li-o-peak",
  "case1-rdf-li-o-minimum",
  "case1-cn-li-o-average",
  "case1-cn-li-o-mode",
  "case1-rdf-li-f-peak",
  "case1-cn-li-f-positive",
  "case1-mulliken-li",
  "case1-charge-o-trend",
  "case1-msd-li",
  "case1-msd-fit",
  "case1-diffusion",
  "case1-sigma-ne",
  "case1-fit-window-change",


  /* -------------------------------------------------------
     C.2
     TAFSIRAN
     ------------------------------------------------------- */

  "case1-interpretation"

];


/* =========================================================
   GET DATA
   ========================================================= */

function getMDWorksheetData() {

  const data = {};

  MD_WORKSHEET_FIELDS.forEach(function(id) {

    const element =
      document.getElementById(id);

    if (!element) {
      return;
    }

    data[id] =
      element.value;

  });

  return data;
}


/* =========================================================
   SET DATA
   ========================================================= */

function setMDWorksheetData(data) {

  if (
    !data ||
    typeof data !== "object"
  ) {
    return;
  }


  MD_WORKSHEET_FIELDS.forEach(function(id) {

    const element =
      document.getElementById(id);

    if (!element) {
      return;
    }


    if (
      Object.prototype.hasOwnProperty.call(
        data,
        id
      )
    ) {

      element.value =
        data[id] ?? "";

    }

  });


  updateMDWorksheetProgress();

}


/* =========================================================
   COMPLETION
   ========================================================= */

function getMDWorksheetCompletion() {

  let completed = 0;


  MD_WORKSHEET_FIELDS.forEach(function(id) {

    const element =
      document.getElementById(id);

    if (!element) {
      return;
    }


    if (
      String(element.value || "")
        .trim()
        .length > 0
    ) {

      completed++;

    }

  });


  return {

    completed: completed,

    total: MD_WORKSHEET_FIELDS.length

  };

}


/* =========================================================
   PROGRESS
   ========================================================= */

function updateMDWorksheetProgress() {

  const result =
    getMDWorksheetCompletion();


  const completed =
    result.completed;

  const total =
    result.total;


  const percentage =
    total > 0
      ? Math.round(
          (completed / total) * 100
        )
      : 0;


  const counter =
    document.getElementById(
      "worksheet-completion"
    );


  const bar =
    document.getElementById(
      "worksheet-progress-bar"
    );


  const label =
    document.getElementById(
      "worksheet-progress-label"
    );


  if (counter) {

    counter.textContent =
      completed +
      " / " +
      total +
      " fields";

  }


  if (bar) {

    bar.style.width =
      percentage + "%";

  }


  if (label) {

    label.textContent =
      percentage +
      "% complete";

  }

}


/* =========================================================
   STATUS
   ========================================================= */

function setMDWorksheetStatus(message) {

  const status =
    document.getElementById(
      "worksheet-status"
    );


  if (!status) {
    return;
  }


  status.textContent =
    message;

}


/* =========================================================
   SAVE
   ========================================================= */

function saveMDWorksheet() {

  const payload = {

    version: 1,

    worksheet:
      "MD Analysis Worksheet",

    savedAt:
      new Date().toISOString(),

    data:
      getMDWorksheetData()

  };


  try {

    localStorage.setItem(
      MD_WORKSHEET_STORAGE_KEY,
      JSON.stringify(payload)
    );


    setMDWorksheetStatus(
      "Worksheet berhasil disimpan di browser."
    );


  } catch (error) {

    console.error(error);


    setMDWorksheetStatus(
      "Worksheet gagal disimpan."
    );

  }

}


/* =========================================================
   LOAD FROM LOCAL STORAGE
   ========================================================= */

function loadMDWorksheetFromStorage() {

  try {

    const raw =
      localStorage.getItem(
        MD_WORKSHEET_STORAGE_KEY
      );


    if (!raw) {
      return false;
    }


    const payload =
      JSON.parse(raw);


    if (
      !payload ||
      !payload.data
    ) {
      return false;
    }


    setMDWorksheetData(
      payload.data
    );


    setMDWorksheetStatus(
      "Worksheet sebelumnya berhasil dipulihkan."
    );


    return true;


  } catch (error) {

    console.error(error);

    return false;

  }

}


/* =========================================================
   DOWNLOAD
   ========================================================= */

function downloadMDWorksheet() {

  const payload = {

    version: 1,

    worksheet:
      "MD Analysis Worksheet",

    exportedAt:
      new Date().toISOString(),

    data:
      getMDWorksheetData()

  };


  const json =
    JSON.stringify(
      payload,
      null,
      2
    );


  const blob =
    new Blob(
      [json],
      {
        type: "application/json"
      }
    );


  const url =
    URL.createObjectURL(blob);


  const link =
    document.createElement("a");


  link.href =
    url;


  link.download =
    "MD_Analysis_Worksheet.json";


  document.body.appendChild(link);


  link.click();


  link.remove();


  URL.revokeObjectURL(url);


  setMDWorksheetStatus(
    "Worksheet berhasil diunduh."
  );

}


/* =========================================================
   LOAD JSON
   ========================================================= */

function loadMDWorksheet(event) {

  const file =
    event.target.files &&
    event.target.files[0];


  if (!file) {
    return;
  }


  const reader =
    new FileReader();


  reader.onload =
    function(eventResult) {

      try {

        const payload =
          JSON.parse(
            eventResult.target.result
          );


        if (
          !payload ||
          !payload.data
        ) {

          throw new Error(
            "Format worksheet tidak valid."
          );

        }


        setMDWorksheetData(
          payload.data
        );


        localStorage.setItem(
          MD_WORKSHEET_STORAGE_KEY,
          JSON.stringify(payload)
        );


        setMDWorksheetStatus(
          "Worksheet berhasil dimuat."
        );


      } catch (error) {

        console.error(error);


        setMDWorksheetStatus(
          "File worksheet tidak dapat dibaca."
        );

      }


      event.target.value =
        "";

    };


  reader.readAsText(file);

}


/* =========================================================
   RESET
   ========================================================= */

function clearMDWorksheet() {

  const confirmed =
    window.confirm(
      "Hapus seluruh isian worksheet?"
    );


  if (!confirmed) {
    return;
  }


  MD_WORKSHEET_FIELDS.forEach(function(id) {

    const element =
      document.getElementById(id);


    if (!element) {
      return;
    }


    element.value =
      "";

  });


  localStorage.removeItem(
    MD_WORKSHEET_STORAGE_KEY
  );


  updateMDWorksheetProgress();


  setMDWorksheetStatus(
    "Worksheet telah direset."
  );

}


/* =========================================================
   INPUT LISTENER
   ========================================================= */

function initializeMDWorksheet() {

  MD_WORKSHEET_FIELDS.forEach(function(id) {

    const element =
      document.getElementById(id);


    if (!element) {
      return;
    }


    element.addEventListener(
      "input",
      updateMDWorksheetProgress
    );


    element.addEventListener(
      "change",
      updateMDWorksheetProgress
    );

  });


  updateMDWorksheetProgress();


  loadMDWorksheetFromStorage();

}


/* =========================================================
   GOOGLE DRIVE
   ========================================================= */

async function uploadMDWorksheet() {

  const payload = {

    version: 1,

    worksheet:
      "MD Analysis Worksheet",

    exportedAt:
      new Date().toISOString(),

    data:
      getMDWorksheetData()

  };


  /*
   * Fungsi ini sengaja tidak membuat endpoint
   * Google Drive palsu.
   *
   * Jika project sebelumnya sudah memiliki fungsi:
   *
   * saveWorksheetToGoogleDrive(payload)
   *
   * fungsi tersebut akan digunakan.
   */

  if (
    typeof window.saveWorksheetToGoogleDrive ===
    "function"
  ) {

    try {

      await window.saveWorksheetToGoogleDrive(
        payload
      );


      setMDWorksheetStatus(
        "Worksheet berhasil dikirim ke Google Drive."
      );


    } catch (error) {

      console.error(error);


      setMDWorksheetStatus(
        "Gagal mengirim worksheet ke Google Drive."
      );

    }


    return;

  }


  setMDWorksheetStatus(
    "Google Drive belum terhubung. Save dan Download tetap dapat digunakan."
  );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeMDWorksheet
  );

} else {

  initializeMDWorksheet();

}
const CASE_2_FIELDS = [
  "case2-atom-count",
  "case2-carbonyl-o",
  "case2-cell-length",
  "case2-md-condition",
  "case2-interface-file",
  "case2-distance-initial-final",
  "case2-distance-average",
  "case2-distance-range",
  "case2-charge-ec",
  "case2-charge-slab",
  "case2-charge-total-change",
  "case2-preliminary-conclusion",
  "case2-next-test",
  "case2-next-test-analysis"
];
/* =========================================================
   CASE 3 · NEB CO PADA Pt(111)
   ========================================================= */

const CASE_3_FIELDS = [
  "case3-sites",
  "case3-images-fixed",
  "case3-force-criteria",
  "case3-initial-end-status",
  "case3-final-end-status",
  "case3-neb-status",
  "case3-energy-initial",
  "case3-energy-max",
  "case3-forward-barrier",
  "case3-final-energy-difference",
  "case3-profile-graph",
  "case3-hand-calculation",
  "case3-interpretation",
  "case3-claim-limit"
];
/* =========================================================
   COMBINE SEMUA FIELD WORKSHEET
   ========================================================= */

const ALL_WORKSHEET_FIELDS = [
  ...(typeof CASE_1_FIELDS !== "undefined" ? CASE_1_FIELDS : []),
  ...(typeof CASE_2_FIELDS !== "undefined" ? CASE_2_FIELDS : []),
  ...CASE_3_FIELDS
];
/* =========================================================
   CASE 4 · IBUPROFENAT DAN MOTIF ARGININA
   ========================================================= */

const CASE_4_FIELDS = [
  "case4-seed-geometry",
  "case4-complex-atoms-charge",
  "case4-ibuprofenate-atoms-charge",
  "case4-guanidinium-atoms-charge",
  "case4-on-shortest",
  "case4-on-other",
  "case4-energy-complex",
  "case4-energy-ibuprofenate",
  "case4-energy-guanidinium",
  "case4-interaction-energy",
  "case4-manual-energy",
  "case4-script-energy",
  "case4-interpretation",
  "case4-model-limit"
];
/* =========================================================
   CASE 5 · RESPONS KISI LiF
   ========================================================= */

const CASE_5_FIELDS = [

  "case5-system-size",

  "case5-method",

  "case5-temperature",

  "case5-md-duration",

  "case5-frame-count",

  "case5-pressure-condition",

  "case5-dftb-file",

  "case5-mace-model",

  "case5-lattice-change",

  "case5-dftb-mace-difference",

  "case5-temperature-response",

  "case5-size-response",

  "case5-condition-response",

  "case5-interpretation",

  "case5-claim-condition"

];
/* =========================================================
   C.7 · LAPORAN SINGKAT DAN DISKUSI KELOMPOK
   ========================================================= */

const CASE_7_FIELDS = [

  "case7-summary-1",

  "case7-summary-2",

  "case7-summary-3",

  "case7-summary-4",

  "case7-summary-5",

  "case7-discussion-evidence",

  "case7-uncertainty",

  "case7-final-conclusion",

  "case7-group-notes"

];
/* =========================================================
   FIELD GABUNGAN FINAL
   =========================================================
   Gunakan bagian ini untuk menggantikan array
   ALL_WORKSHEET_FIELDS yang lama setelah CASE_7_FIELDS
   sudah ditempatkan di worksheet.js.
   ========================================================= */

const ALL_WORKSHEET_FIELDS = [
  ...CASE_1_FIELDS,
  ...CASE_2_FIELDS,
  ...CASE_3_FIELDS,
  ...CASE_4_FIELDS,
  ...CASE_5_FIELDS,
  ...CASE_7_FIELDS
];
