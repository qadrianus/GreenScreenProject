export function initAccordions() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector(".accordion__trigger");
    const panel = accordion.querySelector(".accordion__panel");

    if (!trigger || !panel) {
      return;
    }

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.hidden = isOpen;
      accordion.classList.toggle("accordion--open", !isOpen);
    });
  });
}
