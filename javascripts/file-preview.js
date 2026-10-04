(function () {
    "use strict";

    /*
     * ============================================================
     * MKI WORKSHOP
     * GLOBAL FILE PREVIEW SYSTEM
     * ============================================================
     *
     * Automatically detects downloadable files and provides
     * a ChatGPT-style preview panel.
     *
     * Supported:
     * .txt
     * .md
     * .py
     * .in
     * .dat
     * .xyz
     * .csv
     * .json
     * .yaml
     * .yml
     * .sh
     * .slurm
     * .sbatch
     * .xml
     * .html
     * .css
     * .js
     * .ipynb
     * .pdf
     * images
     */

    const TEXT_EXTENSIONS = [
        "txt",
        "md",
        "py",
        "in",
        "dat",
        "xyz",
        "csv",
        "json",
        "yaml",
        "yml",
        "sh",
        "slurm",
        "sbatch",
        "xml",
        "html",
        "css",
        "js",
        "inp",
        "conf",
        "cfg",
        "toml"
    ];

    const IMAGE_EXTENSIONS = [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp",
        "svg"
    ];

    const PDF_EXTENSIONS = [
        "pdf"
    ];

    const NOTEBOOK_EXTENSIONS = [
        "ipynb"
    ];

    let previewPanel = null;
    let previewBackdrop = null;

    function getExtension(url) {
        try {
            const cleanUrl = url.split("?")[0].split("#")[0];
            const filename = cleanUrl.split("/").pop();

            if (!filename || !filename.includes(".")) {
                return "";
            }

            return filename
                .split(".")
                .pop()
                .toLowerCase();
        } catch (error) {
            return "";
        }
    }

    function getFilename(url) {
        try {
            const cleanUrl = url.split("?")[0].split("#")[0];
            const filename = cleanUrl.split("/").pop();

            return decodeURIComponent(filename || "File");
        } catch (error) {
            return "File";
        }
    }

    function isSupported(url) {
        const extension = getExtension(url);

        return (
            TEXT_EXTENSIONS.includes(extension) ||
            IMAGE_EXTENSIONS.includes(extension) ||
            PDF_EXTENSIONS.includes(extension) ||
            NOTEBOOK_EXTENSIONS.includes(extension)
        );
    }

    function createPreviewUI() {

        if (document.getElementById("mki-file-preview")) {
            previewPanel = document.getElementById("mki-file-preview");
            previewBackdrop = document.getElementById("mki-file-preview-backdrop");
            return;
        }

        /*
         * BACKDROP
         */

        previewBackdrop = document.createElement("div");

        previewBackdrop.id = "mki-file-preview-backdrop";

        /*
         * PANEL
         */

        previewPanel = document.createElement("aside");

        previewPanel.id = "mki-file-preview";

        previewPanel.innerHTML = `
            <div class="mki-preview-header">

                <div class="mki-preview-file-info">

                    <div class="mki-preview-file-icon">
                        <span class="material-symbols-rounded">
                            description
                        </span>
                    </div>

                    <div class="mki-preview-file-text">

                        <div
                            class="mki-preview-filename"
                            id="mki-preview-filename"
                        >
                            File Preview
                        </div>

                        <div
                            class="mki-preview-filetype"
                            id="mki-preview-filetype"
                        >
                            Computational File
                        </div>

                    </div>

                </div>

                <div class="mki-preview-actions">

                    <a
                        id="mki-preview-download"
                        class="mki-preview-download"
                        href="#"
                        download
                    >
                        <span class="material-symbols-rounded">
                            download
                        </span>

                        <span>
                            Download
                        </span>
                    </a>

                    <button
                        id="mki-preview-close"
                        class="mki-preview-close"
                        type="button"
                        aria-label="Close preview"
                    >
                        <span class="material-symbols-rounded">
                            close
                        </span>
                    </button>

                </div>

            </div>

            <div class="mki-preview-divider"></div>

            <div
                class="mki-preview-body"
                id="mki-preview-body"
            >

                <div class="mki-preview-loading">

                    <div class="mki-preview-spinner"></div>

                    <span>
                        Loading preview...
                    </span>

                </div>

            </div>

            <div class="mki-preview-footer">

                <span class="mki-preview-status-dot"></span>

                <span>
                    File preview
                </span>

                <span class="mki-preview-footer-separator">
                    ·
                </span>

                <span id="mki-preview-footer-type">
                    Ready
                </span>

            </div>
        `;

        document.body.appendChild(previewBackdrop);
        document.body.appendChild(previewPanel);

        /*
         * EVENTS
         */

        document
            .getElementById("mki-preview-close")
            .addEventListener("click", closePreview);

        previewBackdrop.addEventListener(
            "click",
            closePreview
        );

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closePreview();
                }

            }
        );
    }

    function openPreview(url) {

        createPreviewUI();

        const filename = getFilename(url);
        const extension = getExtension(url);

        document.getElementById(
            "mki-preview-filename"
        ).textContent = filename;

        document.getElementById(
            "mki-preview-filetype"
        ).textContent = getReadableFileType(extension);

        document.getElementById(
            "mki-preview-footer-type"
        ).textContent = extension
            ? extension.toUpperCase()
            : "FILE";

        const downloadButton = document.getElementById(
            "mki-preview-download"
        );

        downloadButton.href = url;
        downloadButton.setAttribute(
            "download",
            filename
        );

        previewPanel.classList.add("is-open");
        previewBackdrop.classList.add("is-visible");

        document.body.classList.add(
            "mki-preview-open"
        );

        loadPreview(
            url,
            extension
        );
    }

    function closePreview() {

        if (!previewPanel) {
            return;
        }

        previewPanel.classList.remove(
            "is-open"
        );

        previewBackdrop.classList.remove(
            "is-visible"
        );

        document.body.classList.remove(
            "mki-preview-open"
        );
    }

    function getReadableFileType(extension) {

        const labels = {
            in: "Quantum ESPRESSO Input",
            inp: "Simulation Input",
            dat: "Simulation Data",
            xyz: "Atomic Structure",
            py: "Python Script",
            sh: "Shell Script",
            slurm: "SLURM Script",
            sbatch: "SLURM Script",
            ipynb: "Jupyter Notebook",
            md: "Markdown Document",
            csv: "CSV Dataset",
            json: "JSON Data",
            yaml: "YAML Configuration",
            yml: "YAML Configuration",
            pdf: "PDF Document",
            png: "Image",
            jpg: "Image",
            jpeg: "Image",
            webp: "Image",
            svg: "Vector Image",
            txt: "Text File",
            css: "CSS File",
            js: "JavaScript File",
            html: "HTML File"
        };

        return labels[extension] ||
            (
                extension
                    ? extension.toUpperCase() + " File"
                    : "Computational File"
            );
    }

    async function loadPreview(url, extension) {

        const body = document.getElementById(
            "mki-preview-body"
        );

        body.innerHTML = `
            <div class="mki-preview-loading">

                <div class="mki-preview-spinner"></div>

                <span>
                    Loading preview...
                </span>

            </div>
        `;

        /*
         * IMAGE
         */

        if (IMAGE_EXTENSIONS.includes(extension)) {

            body.innerHTML = `
                <div class="mki-preview-image-wrapper">

                    <img
                        src="${escapeAttribute(url)}"
                        alt="Preview of ${escapeAttribute(
                            getFilename(url)
                        )}"
                        class="mki-preview-image"
                    >

                </div>
            `;

            return;
        }

        /*
         * PDF
         */

        if (PDF_EXTENSIONS.includes(extension)) {

            body.innerHTML = `
                <div class="mki-preview-pdf-wrapper">

                    <iframe
                        src="${escapeAttribute(url)}"
                        class="mki-preview-pdf"
                        title="PDF Preview"
                    ></iframe>

                </div>
            `;

            return;
        }

        /*
         * JUPYTER NOTEBOOK
         */

        if (NOTEBOOK_EXTENSIONS.includes(extension)) {

            await loadNotebook(
                url,
                body
            );

            return;
        }

        /*
         * TEXT / CODE
         */

        if (TEXT_EXTENSIONS.includes(extension)) {

            await loadTextFile(
                url,
                body,
                extension
            );

            return;
        }

        body.innerHTML = `
            <div class="mki-preview-empty">

                <span class="material-symbols-rounded">
                    visibility_off
                </span>

                <h3>
                    Preview unavailable
                </h3>

                <p>
                    This file type does not support
                    browser preview.
                </p>

                <a
                    href="${escapeAttribute(url)}"
                    download
                    class="mki-preview-empty-download"
                >
                    Download File
                </a>

            </div>
        `;
    }

    async function loadTextFile(
        url,
        body,
        extension
    ) {

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    "Unable to load file"
                );
            }

            const text = await response.text();

            body.innerHTML = `
                <div class="mki-code-preview">

                    <div class="mki-code-toolbar">

                        <span>
                            ${escapeHtml(
                                getReadableFileType(extension)
                            )}
                        </span>

                        <span>
                            ${text.split("\n").length}
                            lines
                        </span>

                    </div>

                    <pre><code>${escapeHtml(
                        text
                    )}</code></pre>

                </div>
            `;

        } catch (error) {

            body.innerHTML = `
                <div class="mki-preview-error">

                    <span class="material-symbols-rounded">
                        error
                    </span>

                    <h3>
                        Preview could not be loaded
                    </h3>

                    <p>
                        The file exists, but the browser
                        could not retrieve its contents.
                    </p>

                    <a
                        href="${escapeAttribute(url)}"
                        download
                        class="mki-preview-empty-download"
                    >
                        Download File
                    </a>

                </div>
            `;
        }
    }

    async function loadNotebook(
        url,
        body
    ) {

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    "Unable to load notebook"
                );
            }

            const notebook = await response.json();

            let html = `
                <div class="mki-notebook-preview">
            `;

            const cells = notebook.cells || [];

            cells.forEach(
                function (cell, index) {

                    const source = (
                        cell.source || []
                    ).join("");

                    const cellType =
                        cell.cell_type || "code";

                    if (cellType === "markdown") {

                        html += `
                            <div class="mki-notebook-cell markdown-cell">

                                <div class="mki-cell-label">
                                    MARKDOWN
                                </div>

                                <div class="mki-cell-content">
                                    ${simpleMarkdown(
                                        source
                                    )}
                                </div>

                            </div>
                        `;

                    } else {

                        html += `
                            <div class="mki-notebook-cell">

                                <div class="mki-cell-label">
                                    CODE · CELL ${index + 1}
                                </div>

                                <pre><code>${escapeHtml(
                                    source
                                )}</code></pre>

                            </div>
                        `;

                    }

                }
            );

            html += `
                </div>
            `;

            body.innerHTML = html;

        } catch (error) {

            body.innerHTML = `
                <div class="mki-preview-error">

                    <span class="material-symbols-rounded">
                        error
                    </span>

                    <h3>
                        Notebook preview unavailable
                    </h3>

                    <p>
                        The notebook could not be read
                        in the browser.
                    </p>

                </div>
            `;
        }
    }

    function simpleMarkdown(text) {

        let html = escapeHtml(text);

        html = html.replace(
            /^### (.*)$/gm,
            "<h4>$1</h4>"
        );

        html = html.replace(
            /^## (.*)$/gm,
            "<h3>$1</h3>"
        );

        html = html.replace(
            /^# (.*)$/gm,
            "<h2>$1</h2>"
        );

        html = html.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );

        html = html.replace(
            /\n\n/g,
            "</p><p>"
        );

        html = "<p>" + html + "</p>";

        return html;
    }

    function escapeHtml(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttribute(value) {
        return escapeHtml(value);
    }

    /*
     * ============================================================
     * GLOBAL DOWNLOAD DETECTION
     * ============================================================
     */

    function setupDownloadDetection() {

        document.addEventListener(
            "click",
            function (event) {

                const link =
                    event.target.closest("a");

                if (!link) {
                    return;
                }

                const href =
                    link.getAttribute("href");

                if (!href) {
                    return;
                }

                /*
                 * Ignore external links
                 */

                if (
                    href.startsWith("#") ||
                    href.startsWith("mailto:") ||
                    href.startsWith("tel:")
                ) {
                    return;
                }

                /*
                 * Resolve absolute URL
                 */

                const absoluteUrl =
                    new URL(
                        href,
                        window.location.href
                    ).href;

                /*
                 * Detect whether this is a file
                 */

                const hasDownload =
                    link.hasAttribute("download");

                const supported =
                    isSupported(
                        absoluteUrl
                    );

                /*
                 * Only intercept supported files.
                 *
                 * This means normal website navigation
                 * remains untouched.
                 */

                if (
                    !hasDownload &&
                    !supported
                ) {
                    return;
                }

                /*
                 * Allow modifier-click to behave normally.
                 */

                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey
                ) {
                    return;
                }

                event.preventDefault();

                openPreview(
                    absoluteUrl
                );

            },
            true
        );
    }

    /*
     * ============================================================
     * MKDOCS MATERIAL COMPATIBILITY
     * ============================================================
     */

    function initialize() {

        createPreviewUI();

        setupDownloadDetection();

    }

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();

    }

    /*
     * Material for MkDocs instant navigation
     *
     * Reinitialize after page navigation.
     */

    if (
        typeof document$ !== "undefined"
    ) {

        document$.subscribe(
            function () {

                createPreviewUI();

            }
        );

    }

})();
