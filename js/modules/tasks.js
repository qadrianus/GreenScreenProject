import { assessments } from "../data/assessments.js";
import { formatAssessmentDate, getDueBadge } from "./assessment-format.js";
import { getCompletedAssessmentIds } from "./completion-store.js";

export function initTasks() {
  renderTodoList();
  const todoCards = document.querySelectorAll(".todo-card");

  applyStoredAssessmentCompletions();

  todoCards.forEach((card) => {
    updateTaskAccessibility(card);

    const status = card.querySelector(".todo-card__status");
    const toggleCard = () => {
      const shouldComplete = !card.classList.contains("todo-card--complete");
      setTaskCompletion(card, shouldComplete);
    };

    if (!status) {
      return;
    }

    status.setAttribute("role", "button");
    status.setAttribute("tabindex", "0");
    status.addEventListener("click", toggleCard);
    status.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
    });
  });

  document.querySelectorAll(".todo__list").forEach(reorderTasks);
  syncAllCourseAssessments();
}

function renderTodoList() {
  const todoList = document.querySelector('[data-component="todo-list"]');

  if (!todoList) {
    return;
  }

  todoList.innerHTML = [...assessments].sort(compareAssessmentsByDueDate).map(renderTodoCard).join("");
}

function renderTodoCard(assessment) {
  const isComplete = assessment.completed || isStoredComplete(assessment.id);
  const dueBadge = getDueBadge(assessment, isComplete);
  const originalDueBadge = getDueBadge({ ...assessment, completed: false }, false);
  const completeClass = isComplete ? " todo-card--complete" : "";

  return `
    <li
      class="todo-card${completeClass}"
      data-todo-id="${assessment.id}"
      data-assessment-id="${assessment.id}"
      data-original-badge="${escapeHtml(originalDueBadge.label)}"
      data-original-badge-type="${escapeHtml(originalDueBadge.type)}"
    >
      <span class="todo-card__status" aria-hidden="true"></span>
      <a class="todo-card__content" href="assessment.html?id=${encodeURIComponent(assessment.id)}">
        <strong>${escapeHtml(assessment.title)}</strong>
        <span>Due Week ${assessment.dueWeek}</span>
        <span>${escapeHtml(formatAssessmentDate(assessment.dueDate))}</span>
      </a>
      <span class="badge badge--${dueBadge.type}">${escapeHtml(dueBadge.label)}</span>
    </li>
  `;
}

function applyStoredAssessmentCompletions() {
  getCompletedAssessmentIds().forEach((assessmentId) => {
    getTaskCards(assessmentId).forEach((card) => {
      card.classList.add("todo-card--complete");
    });
  });
}

function isStoredComplete(assessmentId) {
  return getCompletedAssessmentIds().includes(assessmentId);
}

function updateTaskAccessibility(card) {
  const isComplete = card.classList.contains("todo-card--complete");
  const title = card.querySelector(".todo-card__content strong")?.textContent?.trim() || "task";
  const state = isComplete ? "incomplete" : "complete";
  const status = card.querySelector(".todo-card__status");

  if (!status) {
    return;
  }

  status.removeAttribute("aria-hidden");
  status.setAttribute("aria-pressed", String(isComplete));
  status.setAttribute("aria-label", `Mark ${title} as ${state}`);
}

function setTaskCompletion(card, isComplete) {
  card.classList.toggle("todo-card--complete", isComplete);
  updateTaskBadge(card, isComplete);
  updateTaskAccessibility(card);
  syncAssessmentGroup(card.dataset.assessmentId);
  document.querySelectorAll(".todo__list").forEach(reorderTasks);
}

function updateTaskBadge(card, isComplete) {
  const badge = card.querySelector(".badge");

  if (!badge) {
    return;
  }

  const originalBadge = card.dataset.originalBadge || "";
  const originalBadgeType = card.dataset.originalBadgeType || "info";

  badge.className = `badge badge--${isComplete ? "success" : originalBadgeType}`;
  badge.textContent = isComplete ? "Completed" : originalBadge;
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function compareAssessmentsByDueDate(firstAssessment, secondAssessment) {
  return new Date(firstAssessment.dueDate) - new Date(secondAssessment.dueDate);
}
