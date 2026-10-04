/* =========================================================
   SESSION 1
   PERSIAPAN PESERTA
   Copy command interaction
   ========================================================= */

(function () {

  "use strict";


  window.copySession1Command = async function (button) {

    if (!button) return;


    const commandCard =
      button.closest(".session-1-command-card");

    if (!commandCard) return;


    const code =
      commandCard.querySelector("code");

    if (!code) return;


    const command =
      code.textContent.trim();


    try {

      await navigator.clipboard.writeText(command);

      const originalText =
        button.textContent;

      button.textContent =
        "Copied";

      button.classList.add("copied");


      setTimeout(function () {

        button.textContent =
          originalText;

        button.classList.remove("copied");

      }, 1200);


    } catch (error) {

      /* Fallback untuk browser yang
         tidak mengizinkan Clipboard API */

      const textarea =
        document.createElement("textarea");

      textarea.value =
        command;

      textarea.style.position =
        "fixed";

      textarea.style.left =
        "-9999px";

      textarea.style.top =
        "-9999px";

      document.body.appendChild(textarea);

      textarea.focus();

      textarea.select();


      try {

        document.execCommand("copy");

        const originalText =
          button.textContent;

        button.textContent =
          "Copied";

        button.classList.add("copied");


        setTimeout(function () {

          button.textContent =
            originalText;

          button.classList.remove("copied");

        }, 1200);


      } catch (fallbackError) {

        button.textContent =
          "Copy failed";


        setTimeout(function () {

          button.textContent =
            "Copy";

        }, 1200);

      }


      document.body.removeChild(textarea);

    }

  };


})();
