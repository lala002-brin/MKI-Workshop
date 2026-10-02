document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hpc-editor").forEach((container) => {
    const textarea = container.querySelector("textarea");

    if (!textarea) return;

    const original = textarea.value.trim();

    const filename =
      container.dataset.filename || "file.txt";

    const language =
      container.dataset.language || "TEXT";

    container.innerHTML = "";

    container.classList.add("hpc-editor-ready");

    const header = document.createElement("div");
    header.className = "hpc-editor-header";

    const fileInfo = document.createElement("div");
    fileInfo.className = "hpc-editor-file";

    fileInfo.innerHTML = `
      <span class="hpc-editor-file-icon">▤</span>
      <div>
        <strong>${filename}</strong>
        <small>${language}</small>
      </div>
    `;

    const actions = document.createElement("div");
    actions.className = "hpc-editor-actions";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "hpc-editor-button";
    resetButton.textContent = "Reset";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "hpc-editor-button";
    copyButton.textContent = "Copy";

    const downloadButton = document.createElement("button");
    downloadButton.type = "button";
    downloadButton.className =
      "hpc-editor-button hpc-editor-button-primary";
    downloadButton.textContent = "Download";

    actions.appendChild(resetButton);
    actions.appendChild(copyButton);
    actions.appendChild(downloadButton);

    header.appendChild(fileInfo);
    header.appendChild(actions);

    const body = document.createElement("div");
    body.className = "hpc-editor-body";

    const lineNumbers = document.createElement("div");
    lineNumbers.className = "hpc-editor-lines";

    const editorArea = document.createElement("div");
    editorArea.className = "hpc-editor-area";

    const editor = document.createElement("textarea");
    editor.className = "hpc-editor-textarea";
    editor.spellcheck = false;
    editor.wrap = "off";
    editor.value = original;

    editorArea.appendChild(editor);

    body.appendChild(lineNumbers);
    body.appendChild(editorArea);

    const footer = document.createElement("div");
    footer.className = "hpc-editor-footer";

    const status = document.createElement("span");
    status.className = "hpc-editor-status";
    status.innerHTML = "● Local edit";

    const counter = document.createElement("span");
    counter.className = "hpc-editor-counter";

    footer.appendChild(status);
    footer.appendChild(counter);

    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(footer);

    function updateEditor() {
      const value = editor.value;

      const lines = value.split("\n").length;

      lineNumbers.innerHTML = "";

      for (let i = 1; i <= lines; i++) {
        const line = document.createElement("span");
        line.textContent = i;
        lineNumbers.appendChild(line);
      }

      const characters = value.length;

      counter.textContent =
        `${lines} lines · ${characters} characters`;
    }

    function syncScroll() {
      lineNumbers.scrollTop = editor.scrollTop;
    }

    editor.addEventListener("input", () => {
      updateEditor();

      status.textContent = "● Modified locally";
      status.classList.add("modified");
    });

    editor.addEventListener("scroll", syncScroll);

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(editor.value);

        copyButton.textContent = "Copied";

        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 1500);
      } catch (error) {
        editor.select();
        document.execCommand("copy");

        copyButton.textContent = "Copied";

        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 1500);
      }
    });

    resetButton.addEventListener("click", () => {
      const confirmed = confirm(
        "Reset this file to the original example?"
      );

      if (!confirmed) return;

      editor.value = original;

      status.textContent = "● Local edit";
      status.classList.remove("modified");

      updateEditor();
      syncScroll();
    });

    downloadButton.addEventListener("click", () => {
      const blob = new Blob(
        [editor.value],
        {
          type: "text/plain;charset=utf-8"
        }
      );

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      URL.revokeObjectURL(url);
    });

    editor.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();

        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        editor.value =
          editor.value.substring(0, start) +
          "    " +
          editor.value.substring(end);

        editor.selectionStart = editor.selectionEnd =
          start + 4;

        updateEditor();
      }
    });

    updateEditor();
  });
});
