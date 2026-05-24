const TOAST_KEY = "greenscreen.toast";
const TOAST_TIMEOUT = 3000;

export function queueToast(message) {
  sessionStorage.setItem(TOAST_KEY, message);
}

export function initToast() {
  const message = sessionStorage.getItem(TOAST_KEY);

  if (!message) {
    return;
  }

  sessionStorage.removeItem(TOAST_KEY);
  showToast(message);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.textContent = message;

  document.body.append(toast);

  window.setTimeout(() => {
    toast.classList.add("toast--closing");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, TOAST_TIMEOUT);
}
