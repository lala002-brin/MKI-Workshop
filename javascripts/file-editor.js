(function () {
    "use strict";

    /*
     * ============================================================
     * HPC SCRIPT LIBRARY EDITOR
     * ============================================================
     *
     * Features:
     * - Local browser editing
     * - Local persistence
     * - Copy to clipboard
     * - Reset to original template
     * - Keyboard shortcuts
     * - Tab indentation
     * - Line count
     * - Modified status
     * - MkDocs Material instant navigation support
     *
     * Changes never modify the original Markdown file.
     * ============================================================
     */


    const CONFIG = {

        sectionSelector:
            ".script-library-section",

        codeSelector:
            ".script-code code",

        editorSelector:
            ".script-editor",

        editSelector:
            ".script-edit",

        copySelector:
            ".script-copy",

        resetSelector:
            ".script-reset",

        doneSelector:
            ".script-done",

        statusSelector:
            ".script-local-change",

        storagePrefix:
            "hpc-script-",

        saveDelay:
            250,

        copiedMessage:
            "Copied",

        savedMessage:
            "Saved",

        editingMessage:
            "Editing",

        modifiedMessage:
            "Edited locally"

    };


    /*
     * ============================================================
     * STORAGE
     * ============================================================
     */

    function storageKey(section) {

        const id =
            section.id ||
            "unnamed-script";

        return CONFIG.storagePrefix + id;

    }


    function getSavedScript(section) {

        try {

            return localStorage.getItem(
                storageKey(section)
            );

        } catch (error) {

            console.warn(
                "HPC Script Library: localStorage unavailable.",
                error
            );

            return null;

        }

    }


    function saveScript(section, value) {

        try {

            localStorage.setItem(
                storageKey(section),
                value
            );

            return true;

        } catch (error) {

            console.warn(
                "HPC Script Library: unable to save script.",
                error
            );

            return false;

        }

    }


    function removeSavedScript(section) {

        try {

            localStorage.removeItem(
                storageKey(section)
            );

            return true;

        } catch (error) {

            console.warn(
                "HPC Script Library: unable to remove saved script.",
                error
            );

            return false;

        }

    }


    /*
     * ============================================================
     * DOM HELPERS
     * ============================================================
     */

    function query(section, selector) {

        return section.querySelector(selector);

    }


    function createElement(tag, className) {

        const element =
            document.createElement(tag);

        if (className) {
            element.className = className;
        }

        return element;

    }


    /*
     * ============================================================
     * STATUS
     * ============================================================
     */

    function setStatus(
        section,
        message,
        visible
    ) {

        const status =
            query(
                section,
                CONFIG.statusSelector
            );

        if (!status) {
            return;
        }

        status.textContent =
            message || CONFIG.modifiedMessage;

        status.hidden =
            visible === false;

    }


    /*
     * ============================================================
     * LINE COUNT
     * ============================================================
     */

    function updateLineCount(
        section,
        value
    ) {

        const editor =
            query(
                section,
                CONFIG.editorSelector
            );

        if (!editor) {
            return;
        }

        const lines =
            value.split("\n").length;

        let counter =
            query(
                section,
                ".script-line-count"
            );

        if (!counter) {

            counter =
                createElement(
                    "div",
                    "script-line-count"
                );

            editor.parentNode.insertBefore(
                counter,
                editor
            );

        }

        counter.textContent =
            lines === 1
                ? "1 line"
                : `${lines} lines`;

    }


    /*
     * ============================================================
     * CHANGE DETECTION
     * ============================================================
     */

    function isModified(
        originalScript,
        currentScript
    ) {

        return (
            currentScript !==
            originalScript
        );

    }


    function updateModifiedState(
        section,
        originalScript,
        currentScript
    ) {

        const modified =
            isModified(
                originalScript,
                currentScript
            );

        section.classList.toggle(
            "script-is-modified",
            modified
        );

        if (modified) {

            setStatus(
                section,
                CONFIG.modifiedMessage,
                true
            );

        } else {

            setStatus(
                section,
                "",
                false
            );

        }

    }


    /*
     * ============================================================
     * RENDER CODE
     * ============================================================
     */

    function renderCode(
        codeElement,
        value
    ) {

        if (!codeElement) {
            return;
        }

        codeElement.textContent =
            value;

        /*
         * Re-run syntax highlighting when
         * Prism is available.
         */

        if (
            window.Prism &&
            typeof window.Prism.highlightElement ===
                "function"
        ) {

            try {

                window.Prism.highlightElement(
                    codeElement
                );

            } catch (error) {

                console.warn(
                    "HPC Script Library: syntax highlighting failed.",
                    error
                );

            }

        }

    }


    /*
     * ============================================================
     * ENTER EDIT MODE
     * ============================================================
     */

    function enterEditMode(
        section,
        originalScript
    ) {

        const codeBlock =
            query(
                section,
                ".script-code"
            );

        const codeElement =
            query(
                section,
                CONFIG.codeSelector
            );

        const editor =
            query(
                section,
                CONFIG.editorSelector
            );

        if (
            !codeBlock ||
            !codeElement ||
            !editor
        ) {
            return;
        }


        /*
         * Use the currently displayed script.
         */

        const currentScript =
            codeElement.textContent;


        editor.value =
            currentScript;


        updateLineCount(
            section,
            currentScript
        );


        section.classList.add(
            "is-editing"
        );


        section.setAttribute(
            "data-editor-active",
            "true"
        );


        setStatus(
            section,
            isModified(
                originalScript,
                currentScript
            )
                ? CONFIG.modifiedMessage
                : CONFIG.editingMessage,
            true
        );


        /*
         * Focus editor.
         */

        requestAnimationFrame(
            function () {

                editor.focus();

                /*
                 * Place cursor at the end.
                 */

                try {

                    editor.selectionStart =
                        editor.value.length;

                    editor.selectionEnd =
                        editor.value.length;

                } catch (error) {
                    /* Ignore cursor errors. */
                }

            }
        );

    }


    /*
     * ============================================================
     * EXIT EDIT MODE
     * ============================================================
     */

    function finishEditing(
        section,
        originalScript
    ) {

        const codeElement =
            query(
                section,
                CONFIG.codeSelector
            );

        const editor =
            query(
                section,
                CONFIG.editorSelector
            );

        if (
            !codeElement ||
            !editor
        ) {
            return;
        }


        const value =
            editor.value;


        /*
         * Save only when different
         * from the original template.
         */

        if (
            isModified(
                originalScript,
                value
            )
        ) {

            saveScript(
                section,
                value
            );

            setStatus(
                section,
                CONFIG.modifiedMessage,
                true
            );

        } else {

            removeSavedScript(
                section
            );

            setStatus(
                section,
                "",
                false
            );

        }


        /*
         * Update displayed code.
         */

        renderCode(
            codeElement,
            value
        );


        section.classList.remove(
            "is-editing"
        );


        section.setAttribute(
            "data-editor-active",
            "false"
        );


        updateLineCount(
            section,
            value
        );

    }


    /*
     * ============================================================
     * RESET
     * ============================================================
     */

    function resetScript(
        section,
        originalScript
    ) {

        const codeElement =
            query(
                section,
                CONFIG.codeSelector
            );

        const editor =
            query(
                section,
                CONFIG.editorSelector
            );

        if (
            !codeElement ||
            !editor
        ) {
            return;
        }


        /*
         * Remove browser-local version.
         */

        removeSavedScript(
            section
        );


        /*
         * Restore original template.
         */

        editor.value =
            originalScript;


        renderCode(
            codeElement,
            originalScript
        );


        updateLineCount(
            section,
            originalScript
        );


        section.classList.remove(
            "is-editing",
            "script-is-modified"
        );


        section.setAttribute(
            "data-editor-active",
            "false"
        );


        setStatus(
            section,
            "",
            false
        );


        /*
         * Visual feedback.
         */

        const resetButton =
            query(
                section,
                CONFIG.resetSelector
            );

        if (resetButton) {

            const oldText =
                resetButton.textContent;

            resetButton.textContent =
                "Reset";

            setTimeout(
                function () {

                    resetButton.textContent =
                        oldText;

                },
                800
            );

        }

    }


    /*
     * ============================================================
     * COPY
     * ============================================================
     */

    async function copyScript(
        section
    ) {

        const codeElement =
            query(
                section,
                CONFIG.codeSelector
            );

        const editor =
            query(
                section,
                CONFIG.editorSelector
            );

        const copyButton =
            query(
                section,
                CONFIG.copySelector
            );

        if (
            !codeElement ||
            !editor ||
            !copyButton
        ) {
            return;
        }


        /*
         * When editing, copy editor content.
         * Otherwise copy displayed code.
         */

        const value =
            section.classList.contains(
                "is-editing"
            )
                ? editor.value
                : codeElement.textContent;


        try {

            await copyToClipboard(
                value
            );


            const oldText =
                copyButton.textContent;


            copyButton.textContent =
                CONFIG.copiedMessage;


            copyButton.classList.add(
                "is-copied"
            );


            setTimeout(
                function () {

                    copyButton.textContent =
                        oldText;

                    copyButton.classList.remove(
                        "is-copied"
                    );

                },
                1200
            );


        } catch (error) {

            console.error(
                "HPC Script Library: copy failed.",
                error
            );


            /*
             * Fallback message.
             */

            const oldText =
                copyButton.textContent;


            copyButton.textContent =
                "Select & Copy";


            setTimeout(
                function () {

                    copyButton.textContent =
                        oldText;

                },
                1500
            );

        }

    }


    /*
     * ============================================================
     * CLIPBOARD
     * ============================================================
     */

    async function copyToClipboard(
        value
    ) {

        /*
         * Modern Clipboard API.
         */

        if (
            navigator.clipboard &&
            typeof navigator.clipboard.writeText ===
                "function"
        ) {

            await navigator.clipboard.writeText(
                value
            );

            return;

        }


        /*
         * Fallback for environments
         * where Clipboard API is unavailable.
         */

        const temporary =
            document.createElement(
                "textarea"
            );


        temporary.value =
            value;


        temporary.setAttribute(
            "readonly",
            ""
        );


        temporary.style.position =
            "fixed";

        temporary.style.opacity =
            "0";

        temporary.style.pointerEvents =
            "none";


        document.body.appendChild(
            temporary
        );


        temporary.select();


        const successful =
            document.execCommand(
                "copy"
            );


        document.body.removeChild(
            temporary
        );


        if (!successful) {

            throw new Error(
                "Clipboard operation failed."
            );

        }

    }


    /*
     * ============================================================
     * AUTO SAVE
     * ============================================================
     */

    function scheduleAutoSave(
        section,
        originalScript,
        value
    ) {

        clearTimeout(
            section._editorSaveTimer
        );


        section._editorSaveTimer =
            setTimeout(
                function () {

                    if (
                        isModified(
                            originalScript,
                            value
                        )
                    ) {

                        const saved =
                            saveScript(
                                section,
                                value
                            );


                        if (saved) {

                            setStatus(
                                section,
                                CONFIG.modifiedMessage,
                                true
                            );

                        }

                    } else {

                        removeSavedScript(
                            section
                        );

                        setStatus(
                            section,
                            CONFIG.editingMessage,
                            true
                        );

                    }

                },
                CONFIG.saveDelay
            );

    }


    /*
     * ============================================================
     * TAB SUPPORT
     * ============================================================
     */

    function handleTab(
        event,
        editor
    ) {

        if (
            event.key !== "Tab"
        ) {
            return;
        }


        event.preventDefault();


        const start =
            editor.selectionStart;

        const end =
            editor.selectionEnd;


        /*
         * Insert four spaces.
         */

        const indentation =
            "    ";


        editor.value =
            editor.value.substring(
                0,
                start
            ) +
            indentation +
            editor.value.substring(
                end
            );


        editor.selectionStart =
            start +
            indentation.length;

        editor.selectionEnd =
            start +
            indentation.length;


        /*
         * Trigger input event
         * so autosave and counters update.
         */

        editor.dispatchEvent(
            new Event(
                "input",
                {
                    bubbles: true
                }
            )
        );

    }


    /*
     * ============================================================
     * KEYBOARD SHORTCUTS
     * ============================================================
     */

    function handleKeyboard(
        event,
        section,
        originalScript,
        editor
    ) {

        /*
         * Tab
         */

        if (
            event.key === "Tab"
        ) {

            handleTab(
                event,
                editor
            );

            return;

        }


        /*
         * Escape
         *
         * Exit editing without resetting.
         * Changes already autosaved remain.
         */

        if (
            event.key === "Escape"
        ) {

            event.preventDefault();

            finishEditing(
                section,
                originalScript
            );

            return;

        }


        /*
         * Ctrl + S
         * Cmd + S
         */

        if (
            (
                event.ctrlKey ||
                event.metaKey
            ) &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();

            finishEditing(
                section,
                originalScript
            );

        }

    }


    /*
     * ============================================================
     * INPUT HANDLER
     * ============================================================
     */

    function handleInput(
        section,
        originalScript,
        editor
    ) {

        const value =
            editor.value;


        updateLineCount(
            section,
            value
        );


        updateModifiedState(
            section,
            originalScript,
            value
        );


        scheduleAutoSave(
            section,
            originalScript,
            value
        );

    }


    /*
     * ============================================================
     * INITIALIZE ONE SCRIPT
     * ============================================================
     */

    function initializeSection(
        section
    ) {

        /*
         * Prevent duplicate initialization.
         *
         * This matters for MkDocs Material
         * instant navigation.
         */

        if (
            section.dataset.editorInitialized ===
            "true"
        ) {
            return;
        }


        section.dataset.editorInitialized =
            "true";


        const codeElement =
            query(
                section,
                CONFIG.codeSelector
            );


        const editor =
            query(
                section,
                CONFIG.editorSelector
            );


        const editButton =
            query(
                section,
                CONFIG.editSelector
            );


        const copyButton =
            query(
                section,
                CONFIG.copySelector
            );


        const resetButton =
            query(
                section,
                CONFIG.resetSelector
            );


        const doneButton =
            query(
                section,
                CONFIG.doneSelector
            );


        if (
            !codeElement ||
            !editor ||
            !editButton
        ) {

            console.warn(
                "HPC Script Library: incomplete script section.",
                section
            );

            return;

        }


        /*
         * Store the original template.
         */

        const originalScript =
            codeElement.textContent;


        section.dataset.originalScript =
            originalScript;


        /*
         * Load locally saved version.
         */

        const savedScript =
            getSavedScript(
                section
            );


        if (
            savedScript !== null
        ) {

            editor.value =
                savedScript;


            renderCode(
                codeElement,
                savedScript
            );


            section.classList.add(
                "script-is-modified"
            );


            setStatus(
                section,
                CONFIG.modifiedMessage,
                true
            );

        } else {

            editor.value =
                originalScript;


            updateLineCount(
                section,
                originalScript
            );


            setStatus(
                section,
                "",
                false
            );

        }


        /*
         * ========================================================
         * EDIT BUTTON
         * ========================================================
         */

        editButton.addEventListener(
            "click",
            function () {

                enterEditMode(
                    section,
                    originalScript
                );

            }
        );


        /*
         * ========================================================
         * DONE BUTTON
         * ========================================================
         */

        if (doneButton) {

            doneButton.addEventListener(
                "click",
                function () {

                    finishEditing(
                        section,
                        originalScript
                    );

                }
            );

        }


        /*
         * ========================================================
         * COPY BUTTON
         * ========================================================
         */

        if (copyButton) {

            copyButton.addEventListener(
                "click",
                function () {

                    copyScript(
                        section
                    );

                }
            );

        }


        /*
         * ========================================================
         * RESET BUTTON
         * ========================================================
         */

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function () {

                    resetScript(
                        section,
                        originalScript
                    );

                }
            );

        }


        /*
         * ========================================================
         * INPUT
         * ========================================================
         */

        editor.addEventListener(
            "input",
            function () {

                handleInput(
                    section,
                    originalScript,
                    editor
                );

            }
        );


        /*
         * ========================================================
         * KEYBOARD
         * ========================================================
         */

        editor.addEventListener(
            "keydown",
            function (event) {

                handleKeyboard(
                    event,
                    section,
                    originalScript,
                    editor
                );

            }
        );


        /*
         * ========================================================
         * INITIAL STATE
         * ========================================================
         */

        section.setAttribute(
            "data-editor-active",
            "false"
        );


        /*
         * Accessibility
         */

        editor.setAttribute(
            "aria-label",
            "Script editor"
        );


        editButton.setAttribute(
            "aria-label",
            "Edit script"
        );


        if (copyButton) {

            copyButton.setAttribute(
                "aria-label",
                "Copy script"
            );

        }


        if (resetButton) {

            resetButton.setAttribute(
                "aria-label",
                "Reset script"
            );

        }


        if (doneButton) {

            doneButton.setAttribute(
                "aria-label",
                "Finish editing"
            );

        }

    }


    /*
     * ============================================================
     * INITIALIZE ALL
     * ============================================================
     */

    function initializeAll() {

        const sections =
            document.querySelectorAll(
                CONFIG.sectionSelector
            );


        sections.forEach(
            function (section) {

                initializeSection(
                    section
                );

            }
        );

    }


    /*
     * ============================================================
     * MKDOCS MATERIAL SUPPORT
     * ============================================================
     *
     * MkDocs Material can replace page content during
     * instant navigation. document$ lets us initialize
     * JavaScript again after each page transition.
     * ============================================================
     */

    if (
        typeof document$ !== "undefined" &&
        document$ &&
        typeof document$.subscribe ===
            "function"
    ) {

        document$.subscribe(
            function () {

                initializeAll();

            }
        );

    } else {

        /*
         * Standard page load.
         */

        if (
            document.readyState ===
            "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                initializeAll
            );

        } else {

            initializeAll();

        }

    }


    /*
     * ============================================================
     * DEBUG HELPER
     * ============================================================
     *
     * Available in browser console:
     *
     * window.HPCScriptLibrary
     *
     * Useful during development.
     * ============================================================
     */

    window.HPCScriptLibrary = {

        initialize:
            initializeAll,

        version:
            "1.0.0"

    };

})();
