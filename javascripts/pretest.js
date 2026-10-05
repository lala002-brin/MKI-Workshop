/* =========================================================
   MKI COMPUTATIONAL MATERIALS SCIENCE WORKSHOP
   POSTEST JAVASCRIPT
   ========================================================= */

(function () {

  "use strict";


  /* =======================================================
     CONFIGURATION
     ======================================================= */

  const STORAGE_KEY =
    "mki-workshop-posttest-v1";


  const TOTAL_QUESTIONS = 25;


  /*
   * Kunci jawaban
   *
   * q1  - q8   : Linux
   * q9  - q10  : Linux / computational environment
   * q11 - q15  : Quantum ESPRESSO
   * q16 - q20  : MACE
   * q21 - q25  : HPC / workflow
   */

  const ANSWERS = {

    q1: "B",
    q2: "A",
    q3: "B",
    q4: "C",
    q5: "A",
    q6: "B",
    q7: "A",
    q8: "A",

    q9: "B",
    q10: "A",

    q11: "C",
    q12: "B",
    q13: "A",
    q14: "C",
    q15: "A",

    q16: "B",
    q17: "A",
    q18: "C",
    q19: "A",
    q20: "B",

    q21: "A",
    q22: "A",
    q23: "B",
    q24: "C",
    q25: "C"

  };


  /* =======================================================
     PEMBAHASAN
     ======================================================= */

  const EXPLANATIONS = {

    q1:
      "Perintah ls digunakan untuk menampilkan isi direktori.",

    q2:
      "Perintah pwd menampilkan lokasi atau path direktori kerja saat ini.",

    q3:
      "Perintah mkdir digunakan untuk membuat direktori baru.",

    q4:
      "Perintah cd digunakan untuk berpindah dari satu direktori ke direktori lainnya.",

    q5:
      "Perintah cat dapat digunakan untuk menampilkan isi berkas teks melalui terminal.",

    q6:
      "Perintah pwd memberikan lokasi lengkap direktori kerja saat ini.",

    q7:
      "Working directory menentukan lokasi kerja sehingga program dapat menemukan input dan menyimpan output pada lokasi yang sesuai.",

    q8:
      "Environment menyediakan kondisi dan konfigurasi yang dibutuhkan program ketika dijalankan.",

    q9:
      "SSH memungkinkan pengguna membuat koneksi terminal yang aman ke sistem komputer jarak jauh.",

    q10:
      "Pemeriksaan versi perangkat lunak membantu memastikan program dan fitur yang digunakan sesuai dengan kebutuhan perhitungan.",

    q11:
      "SCF atau Self-Consistent Field digunakan untuk memperoleh struktur elektronik yang memenuhi kriteria konsistensi yang ditentukan.",

    q12:
      "Pseudopotential merupakan pendekatan efektif untuk merepresentasikan interaksi elektron valensi dengan inti atom.",

    q13:
      "Konvergensi menunjukkan bahwa proses iteratif telah mencapai kriteria numerik yang ditentukan.",

    q14:
      "Ukuran sistem dan parameter cutoff dapat memengaruhi jumlah pekerjaan komputasi dalam perhitungan DFT.",

    q15:
      "Output Quantum ESPRESSO perlu diperiksa untuk memastikan perhitungan berjalan sesuai konfigurasi dan kriteria yang diperlukan.",

    q16:
      "MACE digunakan untuk pemodelan atomistik berbasis machine learning, termasuk prediksi energi dan gaya.",

    q17:
      "Checkpoint menyimpan kondisi model yang telah dilatih sehingga model dapat digunakan kembali.",

    q18:
      "Data yang tidak digunakan dalam training membantu mengevaluasi kemampuan model melakukan generalisasi terhadap data baru.",

    q19:
      "Gaya berkaitan dengan gradien negatif energi potensial terhadap posisi atom.",

    q20:
      "MACE dapat mempercepat simulasi tertentu dengan menggunakan model machine learning yang telah dilatih untuk memprediksi interaksi atom.",

    q21:
      "HPC menyediakan sumber daya komputasi yang sesuai untuk pekerjaan komputasi berukuran besar atau kompleks.",

    q22:
      "CPU, GPU, memori, dan waktu komputasi merupakan resource yang perlu diperhatikan ketika menjalankan pekerjaan di HPC.",

    q23:
      "Direktori, input file, environment, resource, dan konfigurasi job perlu diperiksa sebelum pekerjaan dijalankan.",

    q24:
      "Workflow yang baik dimulai dari persiapan sistem, pemeriksaan input dan environment, simulasi, analisis output, kemudian validasi hasil.",

    q25:
      "Linux menyediakan lingkungan kerja. DCDFTBMD, Quantum ESPRESSO, dan MACE menjalankan tahapan komputasi tertentu, sedangkan HPC menyediakan sumber daya komputasi."
  };


  /* =======================================================
     HELPER
     ======================================================= */

  function $(id) {

    return document.getElementById(id);

  }


  function getValue(id) {

    const element = $(id);

    if (!element) {

      return "";

    }

    return element.value || "";

  }


  function setValue(id, value) {

    const element = $(id);

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
      $("posttest-status");

    if (status) {

      status.textContent =
        message;

    }

  }


  /* =======================================================
     GET ANSWERS
     ======================================================= */

  function getAnswers() {

    const answers = {};

    for (
      let i = 1;
      i <= TOTAL_QUESTIONS;
      i++
    ) {

      const selected =
        document.querySelector(
          `input[name="q${i}"]:checked`
        );


      answers[`q${i}`] =
        selected
          ? selected.value
          : "";

    }

    return answers;

  }


  /* =======================================================
     PROGRESS
     ======================================================= */

  function updateProgress() {

    const answers =
      getAnswers();


    let answered = 0;


    for (
      let i = 1;
      i <= TOTAL_QUESTIONS;
      i++
    ) {

      if (
        answers[`q${i}`]
      ) {

        answered++;

      }

    }


    const percentage =
      Math.round(
        (answered /
          TOTAL_QUESTIONS) *
        100
      );


    const text =
      $("posttest-progress-text");


    const percent =
      $("posttest-progress-percent");


    const bar =
      $("posttest-progress-bar");


    if (text) {

      text.textContent =
        `${answered} / ${TOTAL_QUESTIONS} terjawab`;

    }


    if (percent) {

      percent.textContent =
        `${percentage}% selesai`;

    }


    if (bar) {

      bar.style.width =
        `${percentage}%`;

    }

  }


  /* =======================================================
     CALCULATE SCORE
     ======================================================= */

  function calculateScore() {

    const answers =
      getAnswers();


    let correct = 0;

    let incorrect = 0;

    let unanswered = 0;


    for (
      let i = 1;
      i <= TOTAL_QUESTIONS;
      i++
    ) {

      const key =
        `q${i}`;


      const userAnswer =
        answers[key];


      if (!userAnswer) {

        unanswered++;

      }

      else if (
        userAnswer ===
        ANSWERS[key]
      ) {

        correct++;

      }

      else {

        incorrect++;

      }

    }


    const percentage =
      Math.round(
        (correct /
          TOTAL_QUESTIONS) *
        100
      );


    return {

      answers,

      correct,

      incorrect,

      unanswered,

      score: correct,

      percentage

    };

  }


  /* =======================================================
     SHOW RESULT
     ======================================================= */

  function showResult(result) {

    const resultBox =
      $("posttest-result");


    if (!resultBox) {

      return;

    }


    resultBox.style.display =
      "block";


    const score =
      $("posttest-score");


    const percentage =
      $("posttest-percentage");


    const correct =
      $("posttest-correct");


    const incorrect =
      $("posttest-incorrect");


    const unanswered =
      $("posttest-unanswered");


    if (score) {

      score.textContent =
        `${result.score} / ${TOTAL_QUESTIONS}`;

    }


    if (percentage) {

      percentage.textContent =
        `${result.percentage}%`;

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


    showExplanations(
      result.answers
    );


    resultBox.scrollIntoView({

      behavior: "smooth",

      block: "center"

    });

  }


  /* =======================================================
     SHOW EXPLANATIONS
     ======================================================= */

  function showExplanations(
    userAnswers
  ) {

    /*
     * Hapus pembahasan lama.
     */

    const oldBox =
      $("posttest-explanations");


    if (oldBox) {

      oldBox.remove();

    }


    const resultBox =
      $("posttest-result");


    if (!resultBox) {

      return;

    }


    const container =
      document.createElement(
        "div"
      );


    container.id =
      "posttest-explanations";


    container.className =
      "posttest-explanations";


    const title =
      document.createElement(
        "h3"
      );


    title.textContent =
      "Pembahasan Jawaban";


    container.appendChild(
      title
    );


    for (
      let i = 1;
      i <= TOTAL_QUESTIONS;
      i++
    ) {

      const key =
        `q${i}`;


      const userAnswer =
        userAnswers[key];


      const correctAnswer =
        ANSWERS[key];


      const item =
        document.createElement(
          "div"
        );


      item.className =
        "posttest-explanation-item";


      if (
        userAnswer ===
        correctAnswer
      ) {

        item.classList.add(
          "is-correct"
        );

      }

      else {

        item.classList.add(
          "is-wrong"
        );

      }


      const questionTitle =
        document.createElement(
          "strong"
        );


      questionTitle.textContent =
        `Soal ${String(i).padStart(2, "0")}`;


      const answerText =
        document.createElement(
          "div"
        );


      answerText.className =
        "posttest-explanation-answer";


      if (!userAnswer) {

        answerText.textContent =
          `Tidak dijawab. Jawaban benar: ${correctAnswer}`;

      }

      else if (
        userAnswer ===
        correctAnswer
      ) {

        answerText.textContent =
          `Jawaban Anda: ${userAnswer}. Benar.`;

      }

      else {

        answerText.textContent =
          `Jawaban Anda: ${userAnswer}. Jawaban benar: ${correctAnswer}`;

      }


      const explanation =
        document.createElement(
          "p"
        );


      explanation.textContent =
        EXPLANATIONS[key] ||
        "";


      item.appendChild(
        questionTitle
      );


      item.appendChild(
        answerText
      );


      item.appendChild(
        explanation
      );


      container.appendChild(
        item
      );

    }


    resultBox.appendChild(
      container
    );

  }


  /* =======================================================
     SAVE
     ======================================================= */

  function savePosttest() {

    const data = {

      workshop:
        "MKI Computational Materials Science Workshop",

      module:
        "Postest",

      participant:
        getValue(
          "participant-name"
        ),

      date:
        getValue(
          "participant-date"
        ),

      linuxExperience:
        getValue(
          "linux-experience"
        ),

      answers:
        getAnswers(),

      savedAt:
        new Date()
          .toISOString()

    };


    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(data)

    );


    setStatus(
      "✓ Jawaban berhasil disimpan di perangkat ini."
    );

  }


  /* =======================================================
     RESTORE
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


      setValue(
        "participant-name",
        data.participant
      );


      setValue(
        "participant-date",
        data.date
      );


      setValue(
        "linux-experience",
        data.linuxExperience
      );


      if (
        data.answers
      ) {

        Object.entries(
          data.answers
        ).forEach(
          ([question, value]) => {

            if (!value) {

              return;

            }


            const radio =
              document.querySelector(
                `input[name="${question}"][value="${value}"]`
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
        "✓ Jawaban tersimpan sebelumnya berhasil dipulihkan."
      );

    }

    catch (error) {

      console.error(
        "Postest restore error:",
        error
      );

      setStatus(
        "Data tersimpan tidak dapat dipulihkan."
      );

    }

  }


  /* =======================================================
     RESET
     ======================================================= */

  function resetPosttest() {

    const confirmed =
      window.confirm(
        "Apakah Anda yakin ingin menghapus seluruh jawaban postest?"
      );


    if (!confirmed) {

      return;

    }


    document
      .querySelectorAll(
        '.posttest-page input[type="radio"]'
      )
      .forEach(
        radio => {

          radio.checked =
            false;

        }
      );


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


    localStorage.removeItem(
      STORAGE_KEY
    );


    const result =
      $("posttest-result");


    if (result) {

      result.style.display =
        "none";

    }


    const explanations =
      $("posttest-explanations");


    if (explanations) {

      explanations.remove();

    }


    updateProgress();


    setStatus(
      "Postest berhasil direset."
    );

  }


  /* =======================================================
     SUBMIT
     ======================================================= */

  function submitPosttest() {

    const result =
      calculateScore();


    /*
     * Cek peserta.
     */

    const participant =
      getValue(
        "participant-name"
      );


    if (!participant.trim()) {

      alert(
        "Silakan isi nama peserta terlebih dahulu."
      );


      const field =
        $("participant-name");


      if (field) {

        field.focus();

      }


      return;

    }


    /*
     * Jika masih ada soal kosong,
     * beri peringatan tetapi tetap
     * izinkan submit.
     */

    if (
      result.unanswered > 0
    ) {

      const proceed =
        window.confirm(
          `Masih ada ${result.unanswered} soal yang belum dijawab.\n\nApakah Anda tetap ingin mengirim jawaban?`
        );


      if (!proceed) {

        return;

      }

    }


    savePosttest();


    showResult(
      result
    );


    setStatus(
      "✓ Postest selesai. Hasil telah dihitung."
    );

  }


  /* =======================================================
     EVENT LISTENERS
     ======================================================= */

  function attachListeners() {

    /*
     * Radio buttons
     */

    document
      .querySelectorAll(
        '.posttest-page input[type="radio"]'
      )
      .forEach(
        radio => {

          radio.addEventListener(
            "change",
            updateProgress
          );

        }
      );


    /*
     * Save
     */

    const save =
      $("posttest-save");


    if (save) {

      save.addEventListener(
        "click",
        savePosttest
      );

    }


    /*
     * Reset
     */

    const reset =
      $("posttest-reset");


    if (reset) {

      reset.addEventListener(
        "click",
        resetPosttest
      );

    }


    /*
     * Submit
     */

    const submit =
      $("posttest-submit");


    if (submit) {

      submit.addEventListener(
        "click",
        submitPosttest
      );

    }

  }


  /* =======================================================
     INITIALIZE
     ======================================================= */

  function initializePosttest() {

    /*
     * Pastikan halaman memang
     * memiliki posttest.
     */

    if (
      !document.querySelector(
        ".posttest-page"
      )
    ) {

      return;

    }


    attachListeners();

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


})();
