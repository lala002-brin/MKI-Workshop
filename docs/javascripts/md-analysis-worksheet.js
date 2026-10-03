(function () {

  const STORAGE_KEY = "mki_day1_md_analysis";

  const fields = [
    "participant",
    "analysis-date",
    "rdf-li-o-peak",
    "rdf-li-o-min",
    "cn-li-o",
    "cn-li-o-mode",
    "rdf-li-f-peak",
    "cn-li-f-positive",
    "charge-li",
    "charge-o",
    "charge-trend",
    "msd-li-100",
    "msd-li-200",
    "fit-start",
    "fit-end",
    "fit-points",
    "d-li",
    "d-p",
    "sigma-ne",
    "sensitivity-rdf",
    "sensitivity-msd",
    "longer-trajectory",
    "conclusion"
  ];


  function getData() {

    const data = {
      workshop: "MKI Computational Materials Science Workshop",
      module: "Day 1 · MD Analysis",
      system: "LiPF6 / EC",
      saved_at: new Date().toISOString(),
      values: {}
    };

    fields.forEach(id => {

      const element = document.getElementById(id);

      if (element) {
        data.values[id] = element.value;
      }

    });

    return data;
  }


  function setData(data) {

    if (!data || !data.values) return;

    fields.forEach(id => {

      const element = document.getElementById(id);

      if (
        element &&
        Object.prototype.hasOwnProperty.call(data.values, id)
      ) {
        element.value = data.values[id];
      }

    });

    updateCompletion();

    setStatus("Worksheet loaded");

  }


  window.saveMDWorksheet = function () {

    const data = getData();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

    document.getElementById("last-saved").textContent =
      new Date().toLocaleTimeString();

    setStatus("Saved locally");

  };


  window.downloadMDWorksheet = function () {

    const data = getData();

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    const participant =
      data.values.participant
        ? data.values.participant.replace(/\s+/g, "_")
        : "participant";

    a.href = url;

    a.download =
      `MKI_Day1_MD_Analysis_${participant}.json`;

    a.click();

    URL.revokeObjectURL(url);

    setStatus("Downloaded");

  };


  window.loadMDWorksheet = function (event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

      try {

        const data = JSON.parse(e.target.result);

        setData(data);

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        );

      } catch (error) {

        setStatus("Invalid worksheet file");

      }

    };

    reader.readAsText(file);

  };


  window.clearMDWorksheet = function () {

    const confirmed =
      confirm(
        "Reset semua isian worksheet?"
      );

    if (!confirmed) return;

    fields.forEach(id => {

      const element = document.getElementById(id);

      if (element) {
        element.value = "";
      }

    });

    localStorage.removeItem(STORAGE_KEY);

    document.getElementById("last-saved").textContent =
      "Not saved";

    updateCompletion();

    setStatus("Worksheet reset");

  };


  function setStatus(message) {

    const status =
      document.getElementById("worksheet-status");

    if (status) {
      status.textContent = message;
    }

  }


function updateCompletion() {

  let filled = 0;

  fields.forEach(id => {

    const element =
      document.getElementById(id);

    if (
      element &&
      element.value.trim() !== ""
    ) {
      filled++;
    }

  });

  const total = fields.length;

  const percentage =
    Math.round(
      (filled / total) * 100
    );


  /*
   * Existing completion indicator
   */

  const completion =
    document.getElementById(
      "worksheet-completion"
    );

  if (completion) {

    completion.textContent =
      `${filled} / ${total} fields`;

  }


  /*
   * Interactive progress indicator
   */

  const progressCount =
    document.getElementById(
      "worksheet-progress-count"
    );

  if (progressCount) {

    progressCount.textContent =
      `${filled} / ${total} fields`;

  }


  const progressBar =
    document.getElementById(
      "worksheet-progress-bar"
    );

  if (progressBar) {

    progressBar.style.width =
      `${percentage}%`;

  }


  const progressLabel =
    document.getElementById(
      "worksheet-progress-label"
    );

  if (progressLabel) {

    progressLabel.textContent =
      `${percentage}% complete`;

  }

}

  function restoreLocalData() {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {

      setData(JSON.parse(saved));

      setStatus(
        "Previous worksheet restored"
      );

    } catch (error) {

      localStorage.removeItem(STORAGE_KEY);

    }

  }


function enableAutoSave() {

  let saveTimer = null;

  fields.forEach(id => {

    const element =
      document.getElementById(id);

    if (!element) return;

    function handleChange() {

      updateCompletion();

      clearTimeout(saveTimer);

      saveTimer = setTimeout(() => {

        const data = getData();

        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(data)
        );

        const lastSaved =
          document.getElementById("last-saved");

        if (lastSaved) {
          lastSaved.textContent =
            new Date().toLocaleTimeString();
        }

        setStatus(
          "Auto-saved locally"
        );

      }, 700);

    }

    element.addEventListener(
      "input",
      handleChange
    );

    element.addEventListener(
      "change",
      handleChange
    );

  });

}

  window.uploadMDWorksheet = async function () {

    const data = getData();

    /*
     * Replace this URL with the deployed
     * Google Apps Script Web App URL.
     */

const GOOGLE_DRIVE_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxy4DezY1LQm6_gTGl7Rctgj4Bvt_sfniXKH4qANQ9smcxONdu5ATVn4xFqjij5UPVK/exec";
if (
      GOOGLE_DRIVE_ENDPOINT ===
      "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
    ) {

      setStatus(
        "Google Drive endpoint belum dikonfigurasi"
      );

      alert(
        "Endpoint Google Drive belum dikonfigurasi."
      );

      return;

    }


    setStatus(
      "Uploading to Google Drive..."
    );


    try {

      const response =
        await fetch(
          GOOGLE_DRIVE_ENDPOINT,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "text/plain;charset=utf-8"
            },

            body:
              JSON.stringify(data)
          }
        );


      const result =
        await response.json();


      if (result.success) {

        setStatus(
          "Saved to Google Drive"
        );

        alert(
          "Worksheet berhasil disimpan ke Google Drive Admin."
        );

      } else {

        throw new Error(
          result.message ||
          "Upload failed"
        );

      }

    } catch (error) {

      console.error(error);

      setStatus(
        "Upload failed"
      );

      alert(
        "Upload gagal. Periksa koneksi dan konfigurasi Google Drive."
      );

    }

  };


  document.addEventListener(
    "DOMContentLoaded",
    function () {

      restoreLocalData();

      enableAutoSave();

      updateCompletion();

    }
  );

})();
