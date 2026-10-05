/* =========================================================
   MKI WORKSHOP
   POSTEST JAVASCRIPT
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     CONFIGURATION
     ======================================================= */

  const STORAGE_KEY =
    "mki-workshop-posttest-v3";


  const GOOGLE_SCRIPT_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbxmmq7V7mqXDSx8njezf6nRRnMv9XtSA1NRxg6NE_eumqJVChhHtFtl29p3yB6eLbi1/exec";


  /* =======================================================
     BASIC HELPER
     ======================================================= */

  function getElement(id) {

    return document.getElementById(id);

  }


  function getQuestions() {

    return Array.from(
      document.querySelectorAll(
        ".posttest-question"
      )
    );

  }


  function getParticipantData() {

    return {

      name:
        getValue("participant-name"),

      date:
        getValue("participant-date"),

      linuxExperience:
        getValue("linux-experience"),

      reflection:
        getValue("posttest-reflection")

    };

  }


  function getValue(id) {

    const element =
      getElement(id);


    if (!element) {

      return "";

    }


    return element.value || "";

  }


  function setValue(id, value) {

    const element =
      getElement(id);


    if (!element) {

      return;

    }


    element.value =
      value || "";

  }


  /* =======================================================
     STATUS
     ======================================================= */

  function setStatus(message) {

    const status =
      getElement(
        "posttest-status"
      );


    if (status) {

      status.textContent =
        message;

    }

  }


  /* =======================================================
     ANSWERS
     ======================================================= */

  function getAnswers() {

    const answers = {};

    const questions =
      getQuestions();


    questions.forEach(
      function (question, index) {

        const questionNumber =
          index + 1;


        const selected =
          question.querySelector(
            'input[type="radio"]:checked'
          );


        answers[
          "q" + questionNumber
        ] =
          selected
            ? selected.value
            : "";

      }
    );


    return answers;

  }


  /* =======================================================
     SCORE
     ======================================================= */

  function calculateScore() {

    const questions =
      getQuestions();


    let correct = 0;

    let incorrect = 0;

    let unanswered = 0;


    questions.forEach(
      function (question) {

        const correctAnswer =
          question.dataset.answer;


        const selected =
          question.querySelector(
            'input[type="radio"]:checked'
          );


        if (!selected) {

          unanswered++;

          return;

        }


        if (
          selected.value ===
          correctAnswer
        ) {

          correct++;

        }

        else {

          incorrect++;

        }

      }
    );


    const total =
      questions.length;


    const percentage =
      total > 0
        ? Math.round(
            (correct / total) * 100
          )
        : 0;


    return {

      total: total,

      correct: correct,

      incorrect: incorrect,

      unanswered: unanswered,

      percentage: percentage

    };

  }


  /* =======================================================
     PROGRESS
     ======================================================= */

  function updateProgress() {

    const questions =
      getQuestions();


    const total =
      questions.length;


    let answered = 0;


    questions.forEach(
      function (question) {

        const selected =
          question.querySelector(
            'input[type="radio"]:checked'
          );


        if (selected) {

          answered++;

        }

      }
    );


    const percentage =
      total > 0
        ? Math.round(
            (answered / total) * 100
          )
        : 0;


    const progressText =
      getElement(
        "posttest-progress-text"
      );


    const progressPercent =
      getElement(
        "posttest-progress-percent"
      );


    const progressBar =
      getElement(
        "posttest-progress-bar"
      );


    if (progressText) {

      progressText.textContent =
        answered +
        " / " +
        total +
        " terjawab";

    }


    if (progressPercent) {

      progressPercent.textContent =
        percentage +
        "% selesai";

    }


    if (progressBar) {

      progressBar.style.width =
        percentage + "%";

    }

  }


  /* =======================================================
     BUILD DATA
     ======================================================= */

  function buildPosttestData() {

    const participant =
      getParticipantData();


    const score =
      calculateScore();


    return {

      workshop:
        "Computational Materials Science Workshop",

      assessment:
        "Postest",

      participant:
        participant,

      score:
        score,

      answers:
        getAnswers(),

      submittedAt:
        new Date().toISOString()

    };

  }


  /* =======================================================
     SAVE LOCAL
     ======================================================= */

  function savePosttest() {

    const data =
      buildPosttestData();


    try {

      localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

      );


      setStatus(
        "✓ Jawaban berhasil disimpan di browser."
      );


      return true;

    }

    catch (error) {

      console.error(
        "Local storage error:",
        error
      );


      setStatus(
        "✕ Jawaban tidak dapat disimpan di browser."
      );


      return false;

    }

  }


  /* =======================================================
     RESTORE LOCAL
     ======================================================= */

  function restorePosttest() {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (!saved) {

      return;

    }


    try {

      const data =
        JSON.parse(saved);


      if (
        data.participant
      ) {

        setValue(
          "participant-name",
          data.participant.name
        );


        setValue(
          "participant-date",
          data.participant.date
        );


        setValue(
          "linux-experience",
          data.participant.linuxExperience
        );


        setValue(
          "posttest-reflection",
          data.participant.reflection
        );

      }


      if (
        data.answers
      ) {

        Object.keys(
          data.answers
        ).forEach(
          function (questionName) {

            const value =
              data.answers[
                questionName
              ];


            if (!value) {

              return;

            }


            const radio =
              document.querySelector(
                'input[name="' +
                questionName +
                '"][value="' +
                value +
                '"]'
              );


            if (radio) {

              radio.checked =
                true;

            }

          }
        );

      }


      updateProgress();


      setStatus(
        "✓ Jawaban sebelumnya berhasil dipulihkan."
      );

    }

    catch (error) {

      console.error(
        "Restore error:",
        error
      );

    }

  }


  /* =======================================================
     SHOW RESULT
     ======================================================= */

  function showResult() {

    const result =
      calculateScore();


    const resultBox =
      getElement(
        "posttest-result"
      );


    if (!resultBox) {

      return;

    }


    resultBox.style.display =
      "block";


    const score =
      getElement(
        "posttest-score"
      );


    const percentage =
      getElement(
        "posttest-percentage"
      );


    const correct =
      getElement(
        "posttest-correct"
      );


    const incorrect =
      getElement(
        "posttest-incorrect"
      );


    const unanswered =
      getElement(
        "posttest-unanswered"
      );


    if (score) {

      score.textContent =
        result.correct +
        " / " +
        result.total;

    }


    if (percentage) {

      percentage.textContent =
        result.percentage +
        "%";

    }


    if (correct) {

      correct.textContent =
        result.correct;

    }


    if (incorrect) {

      incorrect.textContent =
        result.incorrect;

    }


    if (unanswered) {

      unanswered.textContent =
        result.unanswered;

    }


    showExplanations();


    resultBox.scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

  }


  /* =======================================================
     SHOW EXPLANATIONS
     ======================================================= */

  function showExplanations() {

    const resultBox =
      getElement(
        "posttest-result"
      );


    if (!resultBox) {

      return;

    }


    const old =
      getElement(
        "posttest-explanations"
      );


    if (old) {

      old.remove();

    }


    const questions =
      getQuestions();


    const wrapper =
      document.createElement(
        "div"
      );


    wrapper.id =
      "posttest-explanations";


    wrapper.className =
      "posttest-explanations";


    const heading =
      document.createElement(
        "h3"
      );


    heading.textContent =
      "Pembahasan Jawaban";


    wrapper.appendChild(
      heading
    );


    questions.forEach(
      function (question, index) {

        const number =
          index + 1;


        const correctAnswer =
          question.dataset.answer;


        const explanation =
          question.dataset.explanation ||
          "Pembahasan belum tersedia.";


        const selected =
          question.querySelector(
            'input[type="radio"]:checked'
          );


        const item =
          document.createElement(
            "div"
          );


        item.className =
          "posttest-explanation-item";


        const title =
          document.createElement(
            "strong"
          );


        title.textContent =
          "Soal " +
          String(number).padStart(
            2,
            "0"
          );


        const answer =
          document.createElement(
            "div"
          );


        answer.className =
          "posttest-explanation-answer";


        const description =
          document.createElement(
            "p"
          );


        description.textContent =
          explanation;


        if (!selected) {

          item.classList.add(
            "is-wrong"
          );


          answer.textContent =
            "Tidak dijawab. " +
            "Jawaban benar: " +
            correctAnswer;

        }

        else if (
          selected.value ===
          correctAnswer
        ) {

          item.classList.add(
            "is-correct"
          );


          answer.textContent =
            "Jawaban Anda: " +
            selected.value +
            ". Benar.";

        }

        else {

          item.classList.add(
            "is-wrong"
          );


          answer.textContent =
            "Jawaban Anda: " +
            selected.value +
            ". Jawaban benar: " +
            correctAnswer;

        }


        item.appendChild(
          title
        );


        item.appendChild(
          answer
        );


        item.appendChild(
          description
        );


        wrapper.appendChild(
          item
        );

      }
    );


    resultBox.appendChild(
      wrapper
    );

  }
/* =======================================================
   RESET
   ======================================================= */

function resetPosttest() {

  const confirmed =
    window.confirm(
      "Apakah Anda yakin ingin menghapus seluruh jawaban?"
    );


  if (!confirmed) {

    return;

  }


  /* Reset radio */

  document
    .querySelectorAll(
      ".posttest-page input[type='radio']"
    )
    .forEach(
      function (radio) {

        radio.checked =
          false;

      }
    );


  /* Reset participant */

  setValue(
    "participant-name",
    ""
  );


  setValue(
    "participant-date",
    ""
  );


  setValue(
    "linux-experience",
    ""
  );


  setValue(
    "posttest-reflection",
    ""
  );


  /* Remove local storage */

  localStorage.removeItem(
    STORAGE_KEY
  );


  /* Hide result */

  const result =
    getElement(
      "posttest-result"
    );


  if (result) {

    result.style.display =
      "none";

  }


  /* Remove explanation */

  const explanation =
    getElement(
      "posttest-explanations"
    );


  if (explanation) {

    explanation.remove();

  }


  updateProgress();


  setStatus(
    "Postest berhasil direset."
  );

}


/* =======================================================
   DOWNLOAD RESULT
   ======================================================= */

function downloadPosttest() {

  const data =
    buildPosttestData();


  const json =
    JSON.stringify(
      data,
      null,
      2
    );


  const blob =
    new Blob(
      [json],
      {
        type:
          "application/json"
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


  const participant =
    data.participant.name
      .trim()
      .replace(
        /\s+/g,
        "_"
      )
      .replace(
        /[^a-zA-Z0-9_-]/g,
        ""
      );


  const filename =
    participant
      ? "postest_" +
        participant +
        ".json"
      : "postest_result.json";


  link.href =
    url;


  link.download =
    filename;


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  URL.revokeObjectURL(
    url
  );


  setStatus(
    "✓ Hasil postest berhasil diunduh."
  );

}


/* =======================================================
   GOOGLE DRIVE
   ======================================================= */

async function uploadPosttest() {

  const participant =
    getParticipantData();


  if (
    !participant.name.trim()
  ) {

    alert(
      "Silakan isi nama peserta terlebih dahulu."
    );


    const name =
      getElement(
        "participant-name"
      );


    if (name) {

      name.focus();

    }


    return;

  }


  const data =
    buildPosttestData();


  setStatus(
    "Mengirim hasil postest ke Google Drive..."
  );


  try {

    await fetch(

      GOOGLE_SCRIPT_ENDPOINT,

      {

        method:
          "POST",

        mode:
          "no-cors",

        headers: {

          "Content-Type":
            "text/plain;charset=utf-8"

        },

        body:
          JSON.stringify(data)

      }

    );


    setStatus(
      "✓ Hasil postest berhasil dikirim."
    );


  }

  catch (error) {

    console.error(
      "Google Drive upload error:",
      error
    );


    setStatus(
      "✕ Pengiriman ke Google Drive gagal."
    );

  }

}


/* =======================================================
   SUBMIT
   ======================================================= */

function submitPosttest() {

  const participant =
    getParticipantData();


  if (
    !participant.name.trim()
  ) {

    alert(
      "Silakan isi nama peserta terlebih dahulu."
    );


    const name =
      getElement(
        "participant-name"
      );


    if (name) {

      name.focus();

    }


    return;

  }


  const result =
    calculateScore();


  if (
    result.unanswered > 0
  ) {

    const confirmed =
      window.confirm(

        "Masih ada " +
        result.unanswered +
        " soal yang belum dijawab.\n\n" +

        "Apakah Anda tetap ingin mengirim postest?"

      );


    if (!confirmed) {

      return;

    }

  }


  /* Save locally */

  savePosttest();


  /* Show result */

  showResult();


  /* Status */

  setStatus(
    "✓ Postest selesai. Skor berhasil dihitung."
  );

}


/* =======================================================
   EVENT LISTENERS
   ======================================================= */

function attachPosttestListeners() {

  const questions =
    getQuestions();


  /* -----------------------------------------------
     Radio buttons
     ----------------------------------------------- */

  questions.forEach(
    function (question) {

      const radios =
        question.querySelectorAll(
          'input[type="radio"]'
        );


      radios.forEach(
        function (radio) {

          radio.addEventListener(
            "change",
            function () {

              updateProgress();

              savePosttest();

            }
          );

        }
      );

    }
  );


  /* -----------------------------------------------
     Save
     ----------------------------------------------- */

  const saveButton =
    getElement(
      "posttest-save"
    );


  if (
    saveButton &&
    !saveButton.dataset.bound
  ) {

    saveButton.addEventListener(
      "click",
      savePosttest
    );


    saveButton.dataset.bound =
      "true";

  }


  /* -----------------------------------------------
     Reset
     ----------------------------------------------- */

  const resetButton =
    getElement(
      "posttest-reset"
    );


  if (
    resetButton &&
    !resetButton.dataset.bound
  ) {

    resetButton.addEventListener(
      "click",
      resetPosttest
    );


    resetButton.dataset.bound =
      "true";

  }


  /* -----------------------------------------------
     Submit
     ----------------------------------------------- */

  const submitButton =
    getElement(
      "posttest-submit"
    );


  if (
    submitButton &&
    !submitButton.dataset.bound
  ) {

    submitButton.addEventListener(
      "click",
      submitPosttest
    );


    submitButton.dataset.bound =
      "true";

  }


  /* -----------------------------------------------
     Optional download button
     ----------------------------------------------- */

  const downloadButton =
    getElement(
      "posttest-download"
    );


  if (
    downloadButton &&
    !downloadButton.dataset.bound
  ) {

    downloadButton.addEventListener(
      "click",
      downloadPosttest
    );


    downloadButton.dataset.bound =
      "true";

  }


  /* -----------------------------------------------
     Optional Google Drive button
     ----------------------------------------------- */

  const uploadButton =
    getElement(
      "posttest-upload"
    );


  if (
    uploadButton &&
    !uploadButton.dataset.bound
  ) {

    uploadButton.addEventListener(
      "click",
      uploadPosttest
    );


    uploadButton.dataset.bound =
      "true";

  }

}


/* =======================================================
   INITIALIZE
   ======================================================= */

function initializePosttest() {

  const page =
    document.querySelector(
      ".posttest-page"
    );


  if (!page) {

    return;

  }


  attachPosttestListeners();

  restorePosttest();

  updateProgress();

}


/* =======================================================
   INITIAL PAGE LOAD
   ======================================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(

    "DOMContentLoaded",

    initializePosttest

  );

}

else {

  initializePosttest();

}


/* =======================================================
   MKDOCS MATERIAL INSTANT NAVIGATION
   ======================================================= */

if (
  typeof document$ !==
  "undefined"
) {

  document$.subscribe(
    function () {

      setTimeout(
        initializePosttest,
        100
      );

    }
  );

}


/* =======================================================
   PUBLIC FUNCTIONS
   ======================================================= */

window.MKI_Posttest = {

  calculateScore:
    calculateScore,

  save:
    savePosttest,

  reset:
    resetPosttest,

  submit:
    submitPosttest,

  download:
    downloadPosttest,

  upload:
    uploadPosttest

};

})();
