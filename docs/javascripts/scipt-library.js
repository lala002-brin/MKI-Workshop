(function () {

    "use strict";

    /*
     * ============================================================
     * SCRIPT LIBRARY EDITOR
     * MKDocs Material
     *
     * Fungsi:
     * 1. Edit Script
     * 2. Salin Script
     * 3. Reset Script
     * 4. Validasi Script
     * 5. Auto Resize
     * 6. Line Counter
     * 7. Instant Navigation Support
     * ============================================================
     */


    function initScriptLibrary() {

        /*
         * --------------------------------------------------------
         * CARI EDITOR
         * --------------------------------------------------------
         */

        const editor =
            document.querySelector(
                "#job-script-editor"
            );

        if (!editor) {
            return;
        }


        /*
         * --------------------------------------------------------
         * CEGAH INISIALISASI BERULANG
         * --------------------------------------------------------
         *
         * MkDocs Material dapat memuat halaman tanpa reload.
         * Karena itu kita beri penanda bahwa editor sudah dipasang.
         */

        if (
            editor.dataset.scriptLibraryReady === "true"
        ) {
            return;
        }

        editor.dataset.scriptLibraryReady = "true";


        /*
         * --------------------------------------------------------
         * CARI CONTAINER
         * --------------------------------------------------------
         */

        const container =
            editor.closest(
                ".script-editor"
            ) ||
            editor.parentElement;


        /*
         * --------------------------------------------------------
         * CARI TOMBOL
         * --------------------------------------------------------
         */

        const buttons =
            container.querySelectorAll(
                "button"
            );


        /*
         * --------------------------------------------------------
         * CARI VALIDATION BOX
         * --------------------------------------------------------
         */

        let validation =
            container.querySelector(
                ".script-validation"
            );


        /*
         * Jika validation box belum tersedia,
         * buat otomatis.
         */

        if (!validation) {

            validation =
                document.createElement(
                    "div"
                );

            validation.className =
                "script-validation";

            container.appendChild(
                validation
            );

        }


        /*
         * --------------------------------------------------------
         * CARI LINE COUNTER
         * --------------------------------------------------------
         */

        let lineCounter =
            container.querySelector(
                "[data-line-count]"
            );


        /*
         * Jika belum ada line counter,
         * cari elemen dengan class.
         */

        if (!lineCounter) {

            lineCounter =
                container.querySelector(
                    ".script-line-counter"
                );

        }


        /*
         * --------------------------------------------------------
         * SIMPAN TEMPLATE AWAL
         * --------------------------------------------------------
         */

        if (
            !editor.dataset.originalScript
        ) {

            editor.dataset.originalScript =
                editor.value;

        }


        /*
         * ========================================================
         * EDITOR STYLE
         * ========================================================
         */

        editor.readOnly = false;
        editor.disabled = false;

        editor.style.setProperty(
            "color",
            "#26384c",
            "important"
        );

        editor.style.setProperty(
            "-webkit-text-fill-color",
            "#26384c",
            "important"
        );

        editor.style.setProperty(
            "background-color",
            "#ffffff",
            "important"
        );

        editor.style.setProperty(
            "caret-color",
            "#2563a6",
            "important"
        );

        editor.style.setProperty(
            "opacity",
            "1",
            "important"
        );

        editor.style.setProperty(
            "font-family",
            "SFMono-Regular, Consolas, Monaco, monospace",
            "important"
        );

        editor.style.setProperty(
            "font-size",
            "14px",
            "important"
        );

        editor.style.setProperty(
            "line-height",
            "1.7",
            "important"
        );

        editor.style.setProperty(
            "width",
            "100%",
            "important"
        );

        editor.style.setProperty(
            "box-sizing",
            "border-box",
            "important"
        );

        editor.style.setProperty(
            "resize",
            "vertical",
            "important"
        );


        /*
         * ========================================================
         * AUTO RESIZE
         * ========================================================
         */

        function resizeEditor() {

            editor.style.height =
                "auto";

            const contentHeight =
                editor.scrollHeight;

            const minHeight =
                300;

            const maxHeight =
                700;

            const newHeight =
                Math.min(
                    Math.max(
                        contentHeight,
                        minHeight
                    ),
                    maxHeight
                );

            editor.style.height =
                newHeight + "px";


            if (
                contentHeight > maxHeight
            ) {

                editor.style.overflowY =
                    "auto";

            } else {

                editor.style.overflowY =
                    "hidden";

            }

        }


        /*
         * ========================================================
         * LINE COUNTER
         * ========================================================
         */

        function updateLineCount() {

            if (!lineCounter) {
                return;
            }

            const value =
                editor.value || "";

            const lines =
                value.length === 0
                    ? 0
                    : value.split("\n").length;

            lineCounter.textContent =
                lines + " baris";

        }


        /*
         * ========================================================
         * UPDATE EDITOR
         * ========================================================
         */

        function updateEditor() {

            resizeEditor();

            updateLineCount();

        }


        /*
         * ========================================================
         * MESSAGE
         * ========================================================
         */

        function showMessage(
            message,
            type
        ) {

            validation.className =
                "script-validation show " +
                type;

            validation.innerHTML =
                message;

            validation.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }


        /*
         * ========================================================
         * HIDE MESSAGE
         * ========================================================
         */

        function hideMessage() {

            validation.className =
                "script-validation";

            validation.innerHTML =
                "";

        }


        /*
         * ========================================================
         * BUTTON SUCCESS
         * ========================================================
         */

        function buttonSuccess(
            button,
            successText,
            normalText
        ) {

            button.textContent =
                successText;

            button.disabled = true;

            setTimeout(
                function () {

                    button.textContent =
                        normalText;

                    button.disabled =
                        false;

                },
                1600
            );

        }


        /*
         * ========================================================
         * VALIDASI SCRIPT
         * ========================================================
         */

        function validateScript() {

            const script =
                editor.value.trim();


            /*
             * Script kosong
             */

            if (!script) {

                showMessage(
                    `
                    <strong>✕ Script masih kosong</strong>

                    <p>
                    Masukkan job script terlebih dahulu
                    sebelum melakukan validasi.
                    </p>
                    `,
                    "error"
                );

                return;

            }


            /*
             * Pemeriksaan dasar SLURM
             */

            const checks = [

                {
                    name:
                        "Shebang",

                    pattern:
                        /^#!\/bin\/bash/m
                },

                {
                    name:
                        "Job name",

                    pattern:
                        /#SBATCH\s+--job-name\s*=\s*/
                },

                {
                    name:
                        "Partition",

                    pattern:
                        /#SBATCH\s+--partition\s*=\s*/
                },

                {
                    name:
                        "Node",

                    pattern:
                        /#SBATCH\s+--nodes\s*=\s*/
                },

                {
                    name:
                        "Task",

                    pattern:
                        /#SBATCH\s+--ntasks\s*=\s*/
                },

                {
                    name:
                        "Time limit",

                    pattern:
                        /#SBATCH\s+--time\s*=\s*/
                }

            ];


            /*
             * Jalankan pemeriksaan
             */

            const results =
                checks.map(
                    function (check) {

                        return {

                            name:
                                check.name,

                            valid:
                                check.pattern.test(
                                    script
                                )

                        };

                    }
                );


            /*
             * Hitung hasil
             */

            const passed =
                results.filter(
                    function (item) {

                        return item.valid;

                    }
                ).length;


            const total =
                results.length;


            /*
             * Tentukan status
             */

            let status =
                "warning";


            if (
                passed === total
            ) {

                status =
                    "success";

            } else if (
                passed <= 2
            ) {

                status =
                    "error";

            }


            /*
             * ====================================================
             * BUAT HASIL VALIDASI
             * ====================================================
             */

            let html = "";


            if (
                status === "success"
            ) {

                html += `
                    <div class="validation-title">
                        ✓ Script memenuhi struktur dasar
                    </div>

                    <p>
                        ${passed} dari ${total}
                        pemeriksaan dasar berhasil.
                    </p>
                `;

            } else if (
                status === "warning"
            ) {

                html += `
                    <div class="validation-title">
                        ⚠ Script masih perlu diperiksa
                    </div>

                    <p>
                        ${passed} dari ${total}
                        pemeriksaan dasar berhasil.
                    </p>
                `;

            } else {

                html += `
                    <div class="validation-title">
                        ✕ Script belum lengkap
                    </div>

                    <p>
                        ${passed} dari ${total}
                        pemeriksaan dasar berhasil.
                    </p>
                `;

            }


            /*
             * Checklist
             */

            html += `
                <div class="script-validation-list">
            `;


            results.forEach(
                function (result) {

                    html += `
                        <div class="
                            script-validation-item
                            ${result.valid
                                ? "valid"
                                : "invalid"}
                        ">

                            <span>
                                ${
                                    result.valid
                                        ? "✓"
                                        : "!"
                                }
                            </span>

                            <strong>
                                ${result.name}
                            </strong>

                        </div>
                    `;

                }
            );


            html += `
                </div>
            `;


            /*
             * Pesan akhir
             */

            if (
                status === "success"
            ) {

                html += `
                    <div class="script-validation-note">

                        <strong>
                            Struktur dasar sudah lengkap.
                        </strong>

                        <p>
                            Sebelum menggunakan
                            <code>sbatch</code>,
                            tetap periksa partition,
                            resource, module,
                            executable, input file,
                            output path, dan aturan HPC.
                        </p>

                    </div>
                `;

            } else {

                html += `
                    <div class="script-validation-note">

                        <strong>
                            Lengkapi parameter yang belum tersedia.
                        </strong>

                        <p>
                            Setelah diperbaiki,
                            klik kembali
                            <strong>Validasi Script</strong>.
                        </p>

                    </div>
                `;

            }


            /*
             * Tampilkan
             */

            showMessage(
                html,
                status
            );

        }


        /*
         * ========================================================
         * BUTTON HANDLER
         * ========================================================
         */

        buttons.forEach(
            function (button) {

                /*
                 * Hindari listener ganda.
                 */

                if (
                    button.dataset.scriptButtonReady === "true"
                ) {

                    return;

                }

                button.dataset.scriptButtonReady =
                    "true";


                /*
                 * Ambil action.
                 *
                 * Mendukung:
                 * focus
                 * edit
                 * copy
                 * validate
                 * reset
                 */

                const action =
                    (
                        button.dataset.action ||
                        ""
                    ).toLowerCase();


                /*
                 * Teks tombol sebagai fallback.
                 */

                const buttonText =
                    (
                        button.textContent ||
                        ""
                    )
                    .trim()
                    .toLowerCase();


                /*
                 * ====================================================
                 * EDIT
                 * ====================================================
                 */

                if (
                    action === "edit" ||
                    action === "focus" ||
                    buttonText.includes("edit")
                ) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();
                            event.stopPropagation();

                            editor.readOnly =
                                false;

                            editor.disabled =
                                false;

                            editor.focus();


                            /*
                             * Cursor ke akhir script.
                             */

                            try {

                                const length =
                                    editor.value.length;

                                editor.setSelectionRange(
                                    length,
                                    length
                                );

                            } catch (error) {}


                            resizeEditor();

                        }
                    );

                }


                /*
                 * ====================================================
                 * COPY
                 * ====================================================
                 */

                if (
                    action === "copy" ||
                    buttonText.includes("salin") ||
                    buttonText.includes("copy")
                ) {

                    button.addEventListener(
                        "click",
                        async function (event) {

                            event.preventDefault();
                            event.stopPropagation();


                            const text =
                                editor.value;


                            if (
                                !text.trim()
                            ) {

                                showMessage(
                                    `
                                    <strong>
                                        Script masih kosong.
                                    </strong>
                                    `,
                                    "warning"
                                );

                                return;

                            }


                            try {

                                await navigator.clipboard.writeText(
                                    text
                                );

                            } catch (error) {

                                /*
                                 * Fallback browser
                                 */

                                editor.focus();

                                editor.select();

                                document.execCommand(
                                    "copy"
                                );

                                editor.setSelectionRange(
                                    text.length,
                                    text.length
                                );

                            }


                            buttonSuccess(
                                button,
                                "Tersalin ✓",
                                button.textContent
                            );

                        }
                    );

                }


                /*
                 * ====================================================
                 * RESET
                 * ====================================================
                 */

                if (
                    action === "reset" ||
                    buttonText === "reset"
                ) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();
                            event.stopPropagation();


                            const confirmed =
                                window.confirm(
                                    "Kembalikan script ke template awal?"
                                );


                            if (!confirmed) {
                                return;
                            }


                            editor.value =
                                editor.dataset.originalScript ||
                                "";


                            updateEditor();

                            hideMessage();


                            buttonSuccess(
                                button,
                                "Direset ✓",
                                "Reset"
                            );

                        }
                    );

                }


                /*
                 * ====================================================
                 * VALIDATE
                 * ====================================================
                 */

                if (
                    action === "validate" ||
                    buttonText.includes("validasi")
                ) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();
                            event.stopPropagation();

                            validateScript();

                        }
                    );

                }

            }
        );


        /*
         * ========================================================
         * EVENT INPUT
         * ========================================================
         */

        editor.addEventListener(
            "input",
            function () {

                updateEditor();

                /*
                 * Jika user mengedit script,
                 * hasil validasi lama disembunyikan.
                 */

                if (
                    validation.classList.contains(
                        "show"
                    )
                ) {

                    hideMessage();

                }

            }
        );


        /*
         * ========================================================
         * INITIALIZE
         * ========================================================
         */

        updateEditor();

    }


    /*
     * ============================================================
     * INITIAL PAGE LOAD
     * ============================================================
     */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initScriptLibrary
        );

    } else {

        initScriptLibrary();

    }


    /*
     * ============================================================
     * MKDOCS MATERIAL INSTANT NAVIGATION
     * ============================================================
     */

    if (
        typeof document$ !== "undefined"
    ) {

        document$.subscribe(
            function () {

                /*
                 * Beri sedikit waktu agar
                 * DOM halaman baru selesai dibuat.
                 */

                setTimeout(
                    function () {

                        initScriptLibrary();

                    },
                    100
                );

            }
        );

    }

})();