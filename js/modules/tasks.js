export function initTasks() {
  const todoCards = document.querySelectorAll(".todo-card");

  todoCards.forEach((card) => {
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    updateTaskAccessibility(card);

    const toggleCard = () => {
      const shouldComplete = !card.classList.contains("todo-card--complete");
      setTaskCompletion(card, shouldComplete);
    };

    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
    });
  });

  document.querySelectorAll(".todo__list").forEach(reorderTasks);
  syncAllCourseAssessments();
}

function updateTaskAccessibility(card) {
  const isComplete = card.classList.contains("todo-card--complete");
  const title = card.querySelector(".todo-card__content strong")?.textContent?.trim() || "task";
  const state = isComplete ? "incomplete" : "complete";

  card.setAttribute("aria-pressed", String(isComplete));
  card.setAttribute("aria-label", `Mark ${title} as ${state}`);
}

function setTaskCompletion(card, isComplete) {
  card.classList.toggle("todo-card--complete", isComplete);
  updateTaskAccessibility(card);
  syncAssessmentGroup(card.dataset.assessmentId);
  document.querySelectorAll(".todo__list").forEach(reorderTasks);
}

function syncAllCourseAssessments() {
  const assessmentIds = new Set(
    Array.from(document.querySelectorAll(".todo-card[data-assessment-id]"), (card) => card.dataset.assessmentId)
  );

  assessmentIds.forEach(syncAssessmentGroup);
}

function syncAssessmentGroup(assessmentId) {
  if (!assessmentId) {
    return;
  }

  const relatedCards = getTaskCards(assessmentId);
  const isComplete = relatedCards.length > 0 && relatedCards.every((card) => card.classList.contains("todo-card--complete"));
  syncCourseAssessment(assessmentId, isComplete);
}

function syncCourseAssessment(assessmentId, isComplete) {
  const assessmentItems = getCourseAssessmentItems(assessmentId);

  assessmentItems.forEach((item) => {
    const badge = item.querySelector(".badge");
    const originalBadge = item.dataset.originalBadge || "";
    const originalBadgeType = item.dataset.originalBadgeType || "info";

    item.classList.toggle("course-item--complete", isComplete);
    item.setAttribute("aria-label", `${item.querySelector(".course-item__title")?.textContent?.trim()} is ${isComplete ? "completed" : "not completed"}`);

    if (!badge) {
      return;
    }

    badge.className = `badge badge--${isComplete ? "success" : originalBadgeType}`;
    badge.textContent = isComplete ? "Completed" : originalBadge;
  });
}

function getTaskCards(assessmentId) {
  return Array.from(document.querySelectorAll(".todo-card[data-assessment-id]")).filter(
    (card) => card.dataset.assessmentId === assessmentId
  );
}

function getCourseAssessmentItems(assessmentId) {
  return Array.from(document.querySelectorAll(".course-item--assessment[data-task-id]")).filter(
    (item) => item.dataset.taskId === assessmentId
  );
}

function reorderTasks(list) {
  if (!list) {
    return;
  }

  const cards = Array.from(list.querySelectorAll(".todo-card"));
  const incompleteCards = cards.filter((card) => !card.classList.contains("todo-card--complete"));
  const completeCards = cards.filter((card) => card.classList.contains("todo-card--complete"));

  [...incompleteCards, ...completeCards].forEach((card) => list.append(card));
}
