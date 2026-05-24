export function initAccordions() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion, index) => {
    const trigger = accordion.querySelector(".accordion__trigger");
    const panel = accordion.querySelector(".accordion__panel");

    if (!trigger || !panel) {
      return;
    }

    if (!panel.id) {
      panel.id = `accordion-panel-${index + 1}`;
    }

    trigger.setAttribute("aria-controls", panel.id);
    syncAccordionState(accordion, trigger, panel);

    if (accordion.dataset.accordionReady === "true") {
      return;
    }

    accordion.dataset.accordionReady = "true";
    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      setAccordionState(accordion, trigger, panel, !isOpen);
    });
  });
}

function syncAccordionState(accordion, trigger, panel) {
  const isOpen = accordion.classList.contains("accordion--open") || trigger.getAttribute("aria-expanded") === "true";
  setAccordionState(accordion, trigger, panel, isOpen);
}

function setAccordionState(accordion, trigger, panel, isOpen) {
  trigger.setAttribute("aria-expanded", String(isOpen));
  panel.hidden = !isOpen;
  accordion.classList.toggle("accordion--open", isOpen);
}
