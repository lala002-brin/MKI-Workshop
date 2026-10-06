(function () {

  function initDFTBWorkshop() {

    const copyButtons =
      document.querySelectorAll(
        ".dftb-copy"
      );


    copyButtons.forEach(function (button) {

      /*
       * MkDocs Material dapat menjalankan script kembali
       * ketika instant navigation digunakan.
       *
       * Attribute ini mencegah event listener dipasang
       * lebih dari satu kali.
       */

      if (
        button.dataset.dftbCopyReady ===
        "true"
      ) {

        return;

      }


      button.dataset.dftbCopyReady =
        "true";


      button.addEventListener(
        "click",
        async function () {

          const terminal =
            button.closest(
              ".dftb-terminal"
            );


          if (!terminal) {

            return;

          }


          const code =
            terminal.querySelector(
              "pre code"
            );


          if (!code) {

            return;

          }


          const text =
            code.innerText;


          const originalText =
            button.textContent;


          try {

            await navigator.clipboard
              .writeText(text);


            button.textContent =
              "Copied";


            button.classList.add(
              "is-copied"
            );


            window.setTimeout(
              function () {

                button.textContent =
                  originalText;


                button.classList.remove(
                  "is-copied"
                );

              },
              1400
            );

          }

          catch (error) {

            /*
             * Fallback untuk browser yang tidak mengizinkan
             * navigator.clipboard.
             */

            const temporary =
              document.createElement(
                "textarea"
              );


            temporary.value =
              text;


            temporary.setAttribute(
              "readonly",
              ""
            );


            temporary.style.position =
              "fixed";


            temporary.style.opacity =
              "0";


            document.body.appendChild(
              temporary
            );


            temporary.select();


            try {

              document.execCommand(
                "copy"
              );


              button.textContent =
                "Copied";


              window.setTimeout(
                function () {

                  button.textContent =
                    originalText;

                },
                1400
              );

            }

            catch (fallbackError) {

              console.warn(
                "Perintah tidak dapat disalin.",
                fallbackError
              );

            }


            document.body.removeChild(
              temporary
            );

          }

        }
      );

    });

  }


  /*
   * Normal browser load
   */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initDFTBWorkshop
    );

  }

  else {

    initDFTBWorkshop();

  }


  /*
   * MkDocs Material Instant Navigation
   */

  if (
    typeof document$ !==
    "undefined"
  ) {

    document$.subscribe(
      function () {

        initDFTBWorkshop();

      }
    );

  }

})();
(function () {

  function initSessionOne() {

    /*
     * ========================================================
     * TABLE ROW INTERACTION
     * ========================================================
     */

    const rows =
      document.querySelectorAll(
        ".session1-table tbody tr"
      );


    rows.forEach(function (row) {

      if (
        row.dataset.sessionReady ===
        "true"
      ) {

        return;

      }


      row.dataset.sessionReady =
        "true";


      row.addEventListener(
        "click",
        function () {

          rows.forEach(
            function (item) {

              item.classList.remove(
                "is-selected"
              );

            }
          );


          row.classList.add(
            "is-selected"
          );

        }
      );

    });

  }


  /*
   * ========================================================
   * STANDARD PAGE LOAD
   * ========================================================
   */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initSessionOne
    );

  }

  else {

    initSessionOne();

  }


  /*
   * ========================================================
   * MKDOCS MATERIAL INSTANT NAVIGATION
   * ========================================================
   */

  if (
    typeof document$ !==
    "undefined"
  ) {

    document$.subscribe(
      function () {

        initSessionOne();

      }
    );

  }

})();
(function () {

  function initSessionOne() {

    /*
     * ========================================================
     * SCHEDULE TABLE
     * ========================================================
     */

    const rows =
      document.querySelectorAll(
        ".session1-table tbody tr"
      );


    rows.forEach(
      function (row) {

        if (
          row.dataset.sessionReady ===
          "true"
        ) {

          return;

        }


        row.dataset.sessionReady =
          "true";


        row.addEventListener(
          "click",
          function () {

            rows.forEach(
              function (item) {

                item.classList.remove(
                  "is-selected"
                );

              }
            );


            row.classList.add(
              "is-selected"
            );

          }
        );

      }
    );


    /*
     * ========================================================
     * SCIENTIFIC MAP
     * ========================================================
     */

    const mapRows =
      document.querySelectorAll(
        ".session1-map-row"
      );


    mapRows.forEach(
      function (row) {

        if (
          row.dataset.mapReady ===
          "true"
        ) {

          return;

        }


        row.dataset.mapReady =
          "true";


        row.addEventListener(
          "mouseenter",
          function () {

            row.classList.add(
              "is-highlighted"
            );

          }
        );


        row.addEventListener(
          "mouseleave",
          function () {

            row.classList.remove(
              "is-highlighted"
            );

          }
        );

      }
    );

  }


  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initSessionOne
    );

  }

  else {

    initSessionOne();

  }


  /*
   * MkDocs Material Instant Navigation
   */

  if (
    typeof document$ !==
    "undefined"
  ) {

    document$.subscribe(
      function () {

        initSessionOne();

      }
    );

  }

})();
(function () {

  function initPremiumWorkshop() {

    /* ========================================================
       SMOOTH REVEAL
       ======================================================== */

    const revealTargets = document.querySelectorAll(
      [
        ".s1-card",
        ".s1-subsection",
        ".s1-analysis-block",
        ".s1-feature",
        ".s1-learning-note",
        ".s1-concept-map",
        ".s3-card",
        ".s3-subsection",
        ".s3-code-block"
      ].join(",")
    );


    if ("IntersectionObserver" in window) {

      const observer = new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add("premium-visible");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          root: null,
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.08
        }
      );


      revealTargets.forEach(function (item) {

        if (
          item.dataset.revealReady ===
          "true"
        ) {
          return;
        }

        item.dataset.revealReady =
          "true";

        item.classList.add(
          "premium-reveal"
        );

        observer.observe(item);

      });

    }


    /* ========================================================
       CLICK HIGHLIGHT TABLE
       ======================================================== */

    document
      .querySelectorAll(".s1-table tbody tr")
      .forEach(function (row) {

        if (
          row.dataset.clickReady ===
          "true"
        ) {
          return;
        }

        row.dataset.clickReady =
          "true";

        row.addEventListener(
          "click",
          function () {

            document
              .querySelectorAll(".s1-table tbody tr")
              .forEach(function (item) {

                item.classList.remove(
                  "premium-selected"
                );

              });


            row.classList.add(
              "premium-selected"
            );

          }
        );

      });


    /* ========================================================
       COPY CODE
       Otomatis menambahkan tombol copy pada code block
       ======================================================== */

    const codeBlocks = document.querySelectorAll(
      ".s1-code-block, .s3-code-block"
    );


    codeBlocks.forEach(function (block) {

      if (
        block.dataset.copyReady ===
        "true"
      ) {
        return;
      }

      block.dataset.copyReady =
        "true";


      const pre =
        block.querySelector("pre");


      if (!pre) {
        return;
      }


      const button =
        document.createElement("button");


      button.type =
        "button";


      button.className =
        "premium-copy-button";


      button.textContent =
        "Copy";


      button.setAttribute(
        "aria-label",
        "Salin kode"
      );


      block.appendChild(button);


      button.addEventListener(
        "click",
        async function () {

          const code =
            pre.innerText;


          try {

            await navigator.clipboard
              .writeText(code);


            button.textContent =
              "Copied";


            button.classList.add(
              "is-copied"
            );


            window.setTimeout(
              function () {

                button.textContent =
                  "Copy";

                button.classList.remove(
                  "is-copied"
                );

              },
              1400
            );

          }

          catch (error) {

            console.warn(
              "Tidak dapat menyalin kode.",
              error
            );

          }

        }
      );

    });


    /* ========================================================
       SCIENTIFIC MAP HIGHLIGHT
       ======================================================== */

    document
      .querySelectorAll(".s1-map-row")
      .forEach(function (row) {

        if (
          row.dataset.mapReady ===
          "true"
        ) {
          return;
        }

        row.dataset.mapReady =
          "true";


        row.addEventListener(
          "click",
          function () {

            document
              .querySelectorAll(".s1-map-row")
              .forEach(function (item) {

                item.classList.remove(
                  "premium-map-selected"
                );

              });


            row.classList.add(
              "premium-map-selected"
            );

          }
        );

      });

  }


  /* ==========================================================
     NORMAL LOAD
     ========================================================== */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initPremiumWorkshop
    );

  }

  else {

    initPremiumWorkshop();

  }


  /* ==========================================================
     MKDOCS MATERIAL INSTANT NAVIGATION
     ========================================================== */

  if (
    typeof document$ !==
    "undefined"
  ) {

    document$.subscribe(
      function () {

        initPremiumWorkshop();

      }
    );

  }

})();
