import { markAssessmentComplete } from "./completion-store.js";
import { queueToast } from "./toast.js";

export function initAssessmentSubmission() {
  const submitButton = document.querySelector("[data-submit-assessment]");
  const fileInput = document.querySelector(".upload-dropzone__input");
  const assessmentId = new URLSearchParams(window.location.search).get("id") || "problem-framing-report";

  if (!submitButton || !fileInput) {
    return;
  }

  fileInput.addEventListener("change", () => {
    setSubmitEnabled(submitButton, fileInput.files.length > 0);
  });

  submitButton.addEventListener("click", () => {
    if (submitButton.disabled) {
      return;
    }

    markAssessmentComplete(assessmentId);
    queueToast("Assessment submitted successfully.");
    window.location.href = "index.html";
  });
}

function setSubmitEnabled(button, isEnabled) {
  button.disabled = !isEnabled;
  button.classList.toggle("button--primary", isEnabled);
  button.classList.toggle("button--disabled", !isEnabled);
}
