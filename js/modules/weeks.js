import { assessments } from "../data/assessments.js";
import { weeks } from "../data/weeks.js";
import { formatAssessmentDate, getDueBadge } from "./assessment-format.js";
import { isAssessmentComplete } from "./completion-store.js";

export function renderWeeks() {
  const weeksMount = document.querySelector('[data-component="weeks"]');

  if (!weeksMount) {
    return;
  }

  const resources = weeksMount.querySelector(".accordion--resource");
  weeksMount.innerHTML = weeks.map(renderWeek).join("");

  if (resources) {
    weeksMount.append(resources);
  }
}

function renderWeek(week) {
  const panelId = `week-${week.number}-panel`;
  const titleId = `week-${week.number}-title`;
  const isOpen = Boolean(week.isOpen);

  return `
    <article class="accordion${isOpen ? " accordion--open" : ""}">
      <h3 id="${titleId}">
        <button
          class="accordion__trigger"
          type="button"
          aria-expanded="${isOpen}"
          aria-controls="${panelId}"
        >
          <span class="accordion__title">
            <span>Week ${week.number}</span>
            <small>${escapeHtml(week.title)}</small>
          </span>
          <span class="accordion__icon" aria-hidden="true"></span>
        </button>
      </h3>
      <div
        class="accordion__panel"
        id="${panelId}"
        role="region"
        aria-labelledby="${titleId}"
        ${isOpen ? "" : "hidden"}
      >
        ${renderAssessments(week)}
        ${renderContents(week)}
      </div>
    </article>
  `;
}

function renderAssessments(week) {
  const weekAssessments = assessments
    .filter((assessment) => assessment.week === week.number)
    .sort(compareAssessmentsByDueDate);

  if (!weekAssessments.length) {
    return "";
  }

  return `
    <section class="content-section" aria-labelledby="week-${week.number}-assessments">
      <h4 id="week-${week.number}-assessments">Assessments</h4>
      <ul class="item-list">
        ${weekAssessments.map(renderAssessment).join("")}
      </ul>
    </section>
  `;
}

function renderAssessment(item) {
  const isComplete = item.completed || isAssessmentComplete(item.id);
  const dueBadge = getDueBadge(item, isComplete);
  const originalDueBadge = getDueBadge({ ...item, completed: false }, false);
  const completeClass = isComplete ? " course-item--complete" : "";
  const taskId = item.id ? ` data-task-id="${escapeHtml(item.id)}"` : "";
  const href = item.id ? `assessment.html?id=${encodeURIComponent(item.id)}` : "#";

  return `
    <li
      class="course-item course-item--assessment${completeClass}"
      ${taskId}
      data-original-badge="${escapeHtml(originalDueBadge.label)}"
      data-original-badge-type="${escapeHtml(originalDueBadge.type)}"
    >
      <span class="course-item__icon course-item__icon--clipboard" aria-hidden="true"></span>
      <a class="course-item__title course-item__link" href="${href}">${escapeHtml(item.title)}</a>
      <span class="badge badge--${dueBadge.type}">${escapeHtml(dueBadge.label)}</span>
      <span class="course-item__due">Due<br />${escapeHtml(formatAssessmentDate(item.dueDate))}</span>
    </li>
  `;
}

function renderContents(week) {
  const hasAssessments = assessments.some((assessment) => assessment.week === week.number);

  return `
    <section
      class="content-section${hasAssessments ? " content-section--divided" : ""}"
      aria-labelledby="week-${week.number}-contents"
    >
      <h4 id="week-${week.number}-contents">Contents</h4>
      <ul class="item-list">
        ${week.contents.map(renderContentItem).join("")}
      </ul>
    </section>
  `;
}

function renderContentItem(item) {
  const iconType = item.type === "video" ? "video" : "document";

  return `
    <li class="course-item">
      <span class="course-item__icon course-item__icon--${iconType}" aria-hidden="true"></span>
      <span class="course-item__title">${escapeHtml(item.title)}</span>
    </li>
  `;
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
