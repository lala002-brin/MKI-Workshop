document.addEventListener("DOMContentLoaded", () => {

  /*
   * =====================================================
   * LiF–EC STRUCTURE VIEWER
   * PART 2C — JAVASCRIPT
   * =====================================================
   */

  const viewers = document.querySelectorAll(".lifec-viewer");

  if (!viewers.length) {
    return;
  }


  viewers.forEach((viewer) => {

    const image =
      viewer.querySelector("#lifec-main-image");

    const captionTitle =
      viewer.querySelector("#lifec-caption-title");

    const captionText =
      viewer.querySelector("#lifec-caption-text");

    const buttons =
      viewer.querySelectorAll(".lifec-view-btn");


    /*
     * Pastikan komponen lengkap.
     */

    if (
      !image ||
      !captionTitle ||
      !captionText ||
      !buttons.length
    ) {
      return;
    }


    /*
     * =================================================
     * GANTI TAMPILAN
     * =================================================
     */

    buttons.forEach((button) => {

      button.addEventListener("click", () => {

        const newImage =
          button.dataset.image;

        const newTitle =
          button.dataset.title;

        const newText =
          button.dataset.text;


        if (!newImage) {
          return;
        }


        /*
         * Active state
         */

        buttons.forEach((item) => {
          item.classList.remove("active");
        });

        button.classList.add("active");


        /*
         * Animasi gambar
         */

        image.style.opacity = "0";


        window.setTimeout(() => {

          image.src = newImage;

          image.alt =
            newTitle || "LiF–EC structure";

          captionTitle.textContent =
            newTitle || "";

          captionText.textContent =
            newText || "";


          /*
           * Pastikan gambar sudah selesai dimuat
           * sebelum ditampilkan kembali.
           */

          image.onload = () => {
            image.style.opacity = "1";
          };


          /*
           * Jika browser menggunakan cache,
           * onload dapat sudah selesai sebelum handler
           * terpasang. Karena itu cek complete.
           */

          if (image.complete) {
            image.style.opacity = "1";
          }


        }, 150);

      });

    });


    /*
     * =================================================
     * KEYBOARD NAVIGATION
     * =================================================
     *
     * ← sebelumnya
     * → berikutnya
     */

    document.addEventListener("keydown", (event) => {

      const activeElement =
        document.activeElement;

      /*
       * Jangan mengambil alih tombol atau input.
       */

      if (
        activeElement &&
        (
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.tagName === "BUTTON"
        )
      ) {
        return;
      }


      const activeIndex =
        Array.from(buttons).findIndex((button) =>
          button.classList.contains("active")
        );


      if (activeIndex === -1) {
        return;
      }


      let nextIndex =
        activeIndex;


      if (event.key === "ArrowRight") {

        nextIndex =
          (activeIndex + 1) % buttons.length;

      }


      if (event.key === "ArrowLeft") {

        nextIndex =
          (
            activeIndex - 1 + buttons.length
          ) % buttons.length;

      }


      if (nextIndex !== activeIndex) {

        buttons[nextIndex].click();

      }

    });


    /*
     * =================================================
     * IMAGE LIGHTBOX
     * =================================================
     */

    const imageWrap =
      viewer.querySelector(".lifec-image-wrap");


    if (!imageWrap) {
      return;
    }


    imageWrap.addEventListener("click", (event) => {

      /*
       * Hanya gambar yang bisa membuka lightbox.
       */

      if (event.target !== image) {
        return;
      }


      if (!image.src) {
        return;
      }


      /*
       * Hindari membuat lightbox lebih dari satu.
       */

      if (
        document.querySelector(".lifec-lightbox")
      ) {
        return;
      }


      const lightbox =
        document.createElement("div");

      lightbox.className =
        "lifec-lightbox";


      lightbox.innerHTML = `
        <div
          class="lifec-lightbox-backdrop"
          aria-hidden="true"
        ></div>

        <div
          class="lifec-lightbox-content"
          role="dialog"
          aria-modal="true"
          aria-label="LiF–EC structure viewer"
        >

          <button
            class="lifec-lightbox-close"
            type="button"
            aria-label="Tutup gambar"
          >
            ×
          </button>

          <img
            src="${image.src}"
            alt="${image.alt || "LiF–EC structure"}"
          >

          <div class="lifec-lightbox-caption">
            ${captionTitle.textContent}
          </div>

        </div>
      `;


      document.body.appendChild(lightbox);

      document.body.classList.add(
        "lifec-lightbox-open"
      );


      /*
       * =================================================
       * TUTUP LIGHTBOX
       * =================================================
       */

      const closeButton =
        lightbox.querySelector(
          ".lifec-lightbox-close"
        );

      const backdrop =
        lightbox.querySelector(
          ".lifec-lightbox-backdrop"
        );


      const closeLightbox = () => {

        lightbox.remove();

        document.body.classList.remove(
          "lifec-lightbox-open"
        );

        document.removeEventListener(
          "keydown",
          handleEscape
        );

      };


      closeButton.addEventListener(
        "click",
        closeLightbox
      );


      backdrop.addEventListener(
        "click",
        closeLightbox
      );


      /*
       * ESC untuk menutup.
       */

      const handleEscape = (event) => {

        if (event.key === "Escape") {

          closeLightbox();

        }

      };


      document.addEventListener(
        "keydown",
        handleEscape
      );

    });

  });

});
/* =========================================================
 * LiF–EC · O–Li RESULT WORKSHEET
 * PART 3 — INTERACTIVE RESULTS
 * ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const worksheets =
    document.querySelectorAll(".lifec-result-panel");

  if (!worksheets.length) {
    return;
  }


  worksheets.forEach((worksheet) => {

    /*
     * Hindari inisialisasi dua kali.
     */

    if (
      worksheet.dataset.resultInitialized === "true"
    ) {
      return;
    }

    worksheet.dataset.resultInitialized = "true";


    /*
     * -----------------------------------------------------
     * ELEMENTS
     * -----------------------------------------------------
     */

    const fields =
      Array.from(
        worksheet.querySelectorAll(
          "[data-lifec-result]"
        )
      );

    const count =
      worksheet.querySelector(
        "#lifec-result-count"
      );

    const progress =
      worksheet.querySelector(
        "#lifec-result-progress"
      );

    const percent =
      worksheet.querySelector(
        "#lifec-result-percent"
      );

    const status =
      worksheet.querySelector(
        "#lifec-result-status"
      );

    const saveButton =
      worksheet.querySelector(
        "#lifec-result-save"
      );

    const downloadButton =
      worksheet.querySelector(
        "#lifec-result-download"
      );

    const resetButton =
      worksheet.querySelector(
        "#lifec-result-reset"
      );


    /*
     * -----------------------------------------------------
     * STORAGE
     * -----------------------------------------------------
     */

    const storageKey =
      "lifec-o-li-results";


    /*
     * -----------------------------------------------------
     * LABEL
     * -----------------------------------------------------
     */

    const labels = {

      "lifec-o-li-initial":
        "Jarak O–Li awal",

      "lifec-o-li-final":
        "Jarak O–Li akhir",

      "lifec-o-li-average":
        "Jarak O–Li rata-rata",

      "lifec-o-li-minimum":
        "Jarak O–Li minimum",

      "lifec-o-li-maximum":
        "Jarak O–Li maksimum",

      "lifec-o-li-std":
        "Simpangan"

    };


    /*
     * -----------------------------------------------------
     * STATUS
     * -----------------------------------------------------
     */

    function setStatus(message) {

      if (status) {
        status.textContent = message;
      }

    }


    /*
     * -----------------------------------------------------
     * UPDATE PROGRESS
     * -----------------------------------------------------
     */

    function updateProgress() {

      const total =
        fields.length;

      const filled =
        fields.filter(
          (field) =>
            field.value.trim() !== ""
        ).length;

      const percentage =
        total > 0
          ? Math.round(
              (filled / total) * 100
            )
          : 0;


      if (count) {
        count.textContent =
          filled;
      }


      if (progress) {
        progress.style.width =
          `${percentage}%`;
      }


      if (percent) {
        percent.textContent =
          `${percentage}% complete`;
      }


      return {
        total,
        filled,
        percentage
      };

    }


    /*
     * -----------------------------------------------------
     * GET VALUES
     * -----------------------------------------------------
     */

    function getValues() {

      const values = {};

      fields.forEach((field) => {

        values[field.id] =
          field.value.trim();

      });

      return values;

    }


    /*
     * -----------------------------------------------------
     * SAVE
     * -----------------------------------------------------
     */

    function saveResults() {

      const values =
        getValues();


      try {

        localStorage.setItem(
          storageKey,
          JSON.stringify(values)
        );

        setStatus(
          "✓ Hasil berhasil disimpan"
        );

      } catch (error) {

        setStatus(
          "Data tidak dapat disimpan di browser"
        );

      }

    }


    /*
     * -----------------------------------------------------
     * LOAD
     * -----------------------------------------------------
     */

    function loadResults() {

      try {

        const saved =
          localStorage.getItem(
            storageKey
          );


        if (!saved) {

          updateProgress();

          return;

        }


        const values =
          JSON.parse(saved);


        fields.forEach((field) => {

          if (
            Object.prototype.hasOwnProperty.call(
              values,
              field.id
            )
          ) {

            field.value =
              values[field.id] || "";

          }

        });


        updateProgress();

        setStatus(
          "✓ Saved results restored"
        );


      } catch (error) {

        updateProgress();

        setStatus(
          "Ready"
        );

      }

    }


    /*
     * -----------------------------------------------------
     * DOWNLOAD CSV
     * -----------------------------------------------------
     */

    function downloadResults() {

      const values =
        getValues();


      const rows = [
        [
          "Parameter",
          "Hasil",
          "Satuan"
        ]
      ];


      fields.forEach((field) => {

        rows.push([
          labels[field.id] ||
            field.id,

          values[field.id] ||
            "",

          "Å"
        ]);

      });


      const csv =
        rows
          .map((row) =>
            row
              .map((value) => {

                const text =
                  String(
                    value ?? ""
                  );

                return `"${text.replace(
                  /"/g,
                  '""'
                )}"`;

              })
              .join(",")
          )
          .join("\n");


      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv;charset=utf-8;"
          }
        );


      const url =
        URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );


      link.href =
        url;

      link.download =
        "lif-ec-o-li-results.csv";


      document.body.appendChild(
        link
      );


      link.click();


      link.remove();


      URL.revokeObjectURL(
        url
      );


      setStatus(
        "✓ Hasil berhasil diunduh"
      );

    }


    /*
     * -----------------------------------------------------
     * RESET
     * -----------------------------------------------------
     */

    function resetResults() {

      const confirmed =
        window.confirm(
          "Hapus seluruh hasil O–Li?"
        );


      if (!confirmed) {
        return;
      }


      fields.forEach((field) => {

        field.value =
          "";

      });


      try {

        localStorage.removeItem(
          storageKey
        );

      } catch (error) {

        // Abaikan error storage.

      }


      updateProgress();


      setStatus(
        "Worksheet telah direset"
      );

    }


    /*
     * -----------------------------------------------------
     * INPUT EVENTS
     * -----------------------------------------------------
     */

    fields.forEach((field) => {

      field.addEventListener(
        "input",
        () => {

          updateProgress();

          setStatus(
            "Perubahan belum disimpan"
          );

        }
      );

    });


    /*
     * -----------------------------------------------------
     * BUTTON EVENTS
     * -----------------------------------------------------
     */

    if (saveButton) {

      saveButton.addEventListener(
        "click",
        saveResults
      );

    }


    if (downloadButton) {

      downloadButton.addEventListener(
        "click",
        downloadResults
      );

    }


    if (resetButton) {

      resetButton.addEventListener(
        "click",
        resetResults
      );

    }


    /*
     * -----------------------------------------------------
     * INITIAL STATE
     * -----------------------------------------------------
     */

    loadResults();

  });

});
document.addEventListener("DOMContentLoaded", () => {

  const fields =
    document.querySelectorAll(
      ".lifec-result-panel input"
    );

  const count =
    document.querySelector(
      "#lifec-result-count"
    );

  const percent =
    document.querySelector(
      "#lifec-result-percent"
    );

  if (!fields.length || !count) {
    return;
  }

  function updateResultProgress() {

    let filled = 0;

    fields.forEach((field) => {

      if (field.value.trim() !== "") {
        filled++;
      }

    });

    const total = fields.length;

    const percentage =
      total > 0
        ? Math.round(
            (filled / total) * 100
          )
        : 0;

    count.textContent = filled;

    if (percent) {
      percent.textContent =
        `${percentage}% complete`;
    }

  }


  fields.forEach((field) => {

    field.addEventListener(
      "input",
      updateResultProgress
    );

  });


  updateResultProgress();

});
