import { weeks } from "../data/weeks.js";

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
  if (!week.assessments.length) {
    return "";
  }

  return `
    <section class="content-section" aria-labelledby="week-${week.number}-assessments">
      <h4 id="week-${week.number}-assessments">Assessments</h4>
      <ul class="item-list">
        ${week.assessments.map(renderAssessment).join("")}
      </ul>
    </section>
  `;
}

function renderAssessment(item) {
  const badgeType = item.completed ? "success" : item.badgeType || "info";
  const badge = item.completed ? "Completed" : item.badge;
  const completeClass = item.completed ? " course-item--complete" : "";
  const taskId = item.id ? ` data-task-id="${escapeHtml(item.id)}"` : "";
  const href = item.id ? `assessment.html?id=${encodeURIComponent(item.id)}` : "#";

  return `
    <li
      class="course-item course-item--assessment${completeClass}"
      ${taskId}
      data-original-badge="${escapeHtml(item.badge)}"
      data-original-badge-type="${escapeHtml(item.badgeType || "info")}"
    >
      <span class="course-item__icon course-item__icon--clipboard" aria-hidden="true"></span>
      <a class="course-item__title course-item__link" href="${href}">${escapeHtml(item.title)}</a>
      <span class="badge badge--${badgeType}">${escapeHtml(badge)}</span>
      <span class="course-item__due">Due<br />${escapeHtml(item.due)}</span>
    </li>
  `;
}

function renderContents(week) {
  const hasAssessments = week.assessments.length > 0;

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
