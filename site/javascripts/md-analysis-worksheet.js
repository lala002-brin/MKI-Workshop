/* =========================================================
   MKI WORKSHOP
   WORKSHEET ENGINE
   Bahan Pendalaman · Case 1–5
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     CONFIGURATION
     ======================================================= */

  const STORAGE_KEY = "mki-bahan-pendalaman-worksheet";

  const WORKSHOP_NAME =
    "MKI Computational Materials Science Workshop";

  const MODULE_NAME =
    "Bahan Pendalaman";

d/* =======================================================
   WORKSHEET FIELD DISCOVERY
   CASE 1 - CASE 5
   ======================================================= */

function getWorksheetFields() {

  const fields = [];

  /*
   * Ambil SEMUA form control di halaman.
   *
   * Dengan cara ini Case 1 sampai Case 5
   * tidak bergantung pada class tertentu.
   */

  document
    .querySelectorAll(
      "input, select, textarea"
    )
    .forEach(field => {

      /*
       * Jangan ambil file uploader.
       */

      if (
        field.type === "file"
      ) {
        return;
      }


      /*
       * Jangan ambil tombol.
       */

      if (
        field.type === "button" ||
        field.type === "submit" ||
        field.type === "reset"
      ) {
        return;
      }


      /*
       * Jangan ambil field yang disabled.
       */

      if (
        field.disabled
      ) {
        return;
      }


      /*
       * Hindari field sistem.
       */

      const id =
        field.id || "";


      if (
        id === "participant" ||
        id === "participant-name" ||
        id === "analysis-date" ||
        id === "worksheet-date"
      ) {
        return;
      }


      /*
       * Hindari duplikasi.
       */

      if (
        !fields.includes(field)
      ) {

        fields.push(field);

      }

    });


  return fields;

}
/* =======================================================
   COLLECT VALUES
   CASE 1 - CASE 5
   ======================================================= */

function collectWorksheetValues() {

  const values = {};

  document
    .querySelectorAll(
      "input[id], textarea[id], select[id]"
    )
    .forEach(field => {

      const key = field.id;

      if (!key) return;

      if (field.type === "checkbox") {

        if (!values[key]) {
          values[key] = [];
        }

        if (field.checked) {
          values[key].push(
            field.value || true
          );
        }

        return;
      }

      if (field.type === "radio") {

        if (field.checked) {
          values[key] =
            field.value || "";
        }

        return;
      }

      values[key] =
        field.value || "";

    });

  return values;
}
  /* =======================================================
     PARTICIPANT
     ======================================================= */

  function getParticipant() {

    const selectors = [
      "#participant",
      "#participant-name",
      "[name='participant']"
    ];

    for (const selector of selectors) {

      const element =
        document.querySelector(selector);

      if (element) {
        return element.value || "";
      }

    }

    return "";

  }


  /* =======================================================
     DATE
     ======================================================= */

  function getWorksheetDate() {

    const selectors = [
      "#analysis-date",
      "#worksheet-date",
      "#date",
      "[name='date']"
    ];

    for (const selector of selectors) {

      const element =
        document.querySelector(selector);

      if (element) {
        return element.value || "";
      }

    }

    return "";

  }


  /* =======================================================
     BUILD DATA
     ======================================================= */

  function buildWorksheetData() {

    return {

      workshop: WORKSHOP_NAME,

      module: MODULE_NAME,

      participant: getParticipant(),

      date: getWorksheetDate(),

      saved_at: new Date().toISOString(),

      values: collectWorksheetValues()

    };

  }


  /* =======================================================
     SAVE
     ======================================================= */

  window.saveMDWorksheet = function () {

    try {

      const data =
        buildWorksheetData();


      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );


      updateWorksheetStatus(
        "Worksheet saved locally."
      );


      updateWorksheetProgress();


      console.log(
        "Worksheet saved:",
        data
      );


    } catch (error) {

      console.error(
        "Worksheet save error:",
        error
      );


      updateWorksheetStatus(
        "Failed to save worksheet."
      );

    }

  };


  /* =======================================================
     DOWNLOAD
     ======================================================= */

  window.downloadMDWorksheet = function () {

    try {

      const data =
        buildWorksheetData();


      const json =
        JSON.stringify(data, null, 2);


      const blob =
        new Blob(
          [json],
          {
            type: "application/json"
          }
        );


      const url =
        URL.createObjectURL(blob);


      const participant =
        getParticipant()
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_-]/g, "");


      const date =
        getWorksheetDate()
        .replace(/[^0-9-]/g, "");


      const filename =
        "MKI_Bahan_Pendalaman_" +
        (participant || "Unknown_Participant") +
        "_" +
        (date || new Date().toISOString().slice(0, 10)) +
        ".json";


      const link =
        document.createElement("a");


      link.href = url;

      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();


      URL.revokeObjectURL(url);


      updateWorksheetStatus(
        "Worksheet downloaded."
      );


    } catch (error) {

      console.error(
        "Download error:",
        error
      );

      updateWorksheetStatus(
        "Failed to download worksheet."
      );

    }

  };


  /* =======================================================
     LOAD
     ======================================================= */

  window.loadMDWorksheet = function (event) {

    const file =
      event?.target?.files?.[0];


    if (!file) return;


    const reader =
      new FileReader();


    reader.onload = function (e) {

      try {

        const data =
          JSON.parse(e.target.result);


        restoreWorksheetData(data);


        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        );


        updateWorksheetProgress();


        updateWorksheetStatus(
          "Worksheet loaded successfully."
        );


      } catch (error) {

        console.error(
          "Load error:",
          error
        );


        updateWorksheetStatus(
          "Invalid worksheet JSON."
        );

      }

    };


    reader.readAsText(file);

  };


  /* =======================================================
     RESTORE
     ======================================================= */

  function restoreWorksheetData(data) {

    if (!data || typeof data !== "object") {
      return;
    }


    /*
     * Participant
     */

    const participant =
      document.querySelector("#participant");


    if (participant) {

      participant.value =
        data.participant || "";

    }


    /*
     * Date
     */

    const date =
      document.querySelector("#analysis-date");


    if (date) {

      date.value =
        data.date || "";

    }


    /*
     * Main worksheet fields
     */

    const values =
      data.values || {};


    Object.keys(values).forEach(id => {

      const element =
        document.getElementById(id);


      if (!element) return;


      if (element.type === "checkbox") {

        element.checked =
          Boolean(values[id]);

        return;

      }


      if (element.type === "radio") {

        element.checked =
          element.value === values[id];

        return;

      }


      element.value =
        values[id];

    });


    /*
     * Trigger change/input events
     * supaya progress dan komponen lain
     * ikut memperbarui.
     */

    getWorksheetFields()
      .forEach(field => {

        field.dispatchEvent(
          new Event(
            "input",
            {
              bubbles: true
            }
          )
        );

        field.dispatchEvent(
          new Event(
            "change",
            {
              bubbles: true
            }
          )
        );

      });

  }


  /* =======================================================
     RESTORE LOCAL STORAGE
     ======================================================= */

  function restoreLocalWorksheet() {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );


      if (!saved) return;


      const data =
        JSON.parse(saved);


      restoreWorksheetData(data);


      updateWorksheetStatus(
        "Previous worksheet restored."
      );


    } catch (error) {

      console.warn(
        "No valid local worksheet found.",
        error
      );

    }

  }


  /* =======================================================
     RESET
     ======================================================= */

  window.clearMDWorksheet = function () {

    const fields =
      getWorksheetFields();


    fields.forEach(field => {

      if (field.type === "checkbox") {

        field.checked = false;

      } else if (field.type === "radio") {

        field.checked = false;

      } else {

        field.value = "";

      }

    });


    const participant =
      document.querySelector("#participant");


    if (participant) {
      participant.value = "";
    }


    const date =
      document.querySelector("#analysis-date");


    if (date) {
      date.value = "";
    }


    localStorage.removeItem(
      STORAGE_KEY
    );


    updateWorksheetProgress();


    updateWorksheetStatus(
      "Worksheet reset."
    );

  };


  /* =======================================================
     PROGRESS
     ======================================================= */

  function updateWorksheetProgress() {

    const fields =
      getWorksheetFields();


    if (!fields.length) return;


    let completed = 0;


    fields.forEach(field => {

      let value = "";


      if (field.type === "checkbox") {

        value =
          field.checked
            ? "checked"
            : "";

      } else if (field.type === "radio") {

        value =
          field.checked
            ? field.value
            : "";

      } else {

        value =
          String(field.value || "")
            .trim();

      }


      if (value !== "") {
        completed++;
      }

    });


    const total =
      fields.length;


    const percentage =
      total
        ? Math.round(
            (completed / total) * 100
          )
        : 0;


    /*
     * Progress counter
     */

    document
      .querySelectorAll(
        "#worksheet-completion"
      )
      .forEach(element => {

        element.textContent =
          `${completed} / ${total} fields`;

      });


    /*
     * Progress bar
     */

    const bar =
      document.querySelector(
        "#worksheet-progress-bar"
      );


    if (bar) {

      bar.style.width =
        `${percentage}%`;

    }


    /*
     * Progress label
     */

    const label =
      document.querySelector(
        "#worksheet-progress-label"
      );


    if (label) {

      label.textContent =
        `${percentage}% complete`;

    }


    /*
     * Optional result counter
     */

    document
      .querySelectorAll(
        "#worksheet-result-count"
      )
      .forEach(element => {

        element.textContent =
          completed;

      });

  }


  /* =======================================================
     STATUS
     ======================================================= */

  function updateWorksheetStatus(message) {

    const status =
      document.querySelector(
        "#worksheet-status"
      );


    if (!status) return;


    status.textContent =
      message;

  }


  /* =======================================================
     AUTO SAVE
     ======================================================= */

  let saveTimer = null;


  function scheduleAutoSave() {

    clearTimeout(
      saveTimer
    );


   ALL_WORKSHEET_FIELDS saveTimer =
      setTimeout(() => {

        const data =
          buildWorksheetData();


        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        );


        updateWorksheetProgress();

      }, 400);

  }


  /* =======================================================
     INPUT LISTENER
     ======================================================= */

  function attachFieldListeners() {

    getWorksheetFields()
      .forEach(field => {

        field.addEventListener(
          "input",
          scheduleAutoSave
        );


        field.addEventListener(
          "change",
          scheduleAutoSave
        );

      });

  }
/* =======================================================
   GOOGLE DRIVE
   ======================================================= */

window.uploadMDWorksheet = async function () {

  try {

    const data =
      buildWorksheetData();

    const endpoint =
      "https://script.google.com/macros/s/AKfycbxmmq7V7mqXDSx8njezf6nRRnMv9XtSA1NRxg6NE_eumqJVChhHtFtl29p3yB6eLbi1/exec";


    updateWorksheetStatus(
      "Uploading to Google Drive..."
    );


    await fetch(
      endpoint,
      {
        method: "POST",

        mode: "no-cors",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify(data)
      }
    );


    updateWorksheetStatus(
      "✓ Worksheet berhasil dikirim ke Google Drive."
    );


    console.log(
      "Worksheet sent to Google Drive:",
      data
    );


  } catch (error) {

    console.error(
      "Google Drive upload error:",
      error
    );


    updateWorksheetStatus(
      "✕ Google Drive upload gagal."
    );

  }

};
  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initializeWorksheet() {

    attachFieldListeners();

    restoreLocalWorksheet();

    updateWorksheetProgress();

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initializeWorksheet
    );

  } else {

    initializeWorksheet();

  }


  /*
   * MkDocs Material instant navigation
   */

  if (
    typeof document$ !==
    "undefined"
  ) {

    document$.subscribe(() => {

      setTimeout(
        initializeWorksheet,
        100
      );

    });

  }


})();
