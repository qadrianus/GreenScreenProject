export function initSubmissionUpload() {
  const input = document.querySelector(".upload-dropzone__input");
  const fileText = document.querySelector("[data-upload-files]");

  if (!input || !fileText) {
    return;
  }

  input.addEventListener("change", () => {
    const fileNames = Array.from(input.files, (file) => file.name);
    fileText.textContent = fileNames.length ? fileNames.join(", ") : "";
  });
}
