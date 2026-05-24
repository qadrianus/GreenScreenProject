import { assessments } from "../data/assessments.js";
import { formatAssessmentDate, formatAttempts, formatMarks, getDueBadge } from "./assessment-format.js";
import { isAssessmentComplete } from "./completion-store.js";

export function renderAssessmentPage() {
  const page = document.querySelector('[data-component="assessment-page"]');

  if (!page) {
    return;
  }

  const assessment = getCurrentAssessment();

  if (!assessment) {
    page.innerHTML = renderMissingAssessment();
    return;
  }

  document.title = `${assessment.title} | GreenScreen`;
  page.innerHTML = renderAssessment(assessment);
}

function getCurrentAssessment() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "problem-framing-report";

  return assessments.find((assessment) => assessment.id === id);
}

function renderAssessment(assessment) {
  return `
    <header class="assessment-title">
      <a class="assessment-title__back" href="index.html" aria-label="Back to course content">
        <span aria-hidden="true"></span>
      </a>
      <h1>${escapeHtml(assessment.title)}</h1>
    </header>

    <div class="assessment-layout">
      <div class="assessment-layout__main">
        ${renderBrief(assessment)}
        ${renderCriteria(assessment)}
        ${renderSubmission()}
      </div>
      ${renderDetails(assessment)}
    </div>

    <div class="action-bar" aria-label="Assessment actions">
      <button class="button button--secondary" type="button">Save Draft</button>
      <button class="button button--disabled" type="button" data-submit-assessment disabled>Submit</button>
    </div>
  `;
}

function renderBrief(assessment) {
  return `
    <article class="accordion accordion--open assignment-panel">
      <h2 id="assignment-brief-title">
        <button
          class="accordion__trigger"
          type="button"
          aria-expanded="true"
          aria-controls="assignment-brief-panel"
        >
          <span>Assignment Brief</span>
          <span class="accordion__icon" aria-hidden="true"></span>
        </button>
      </h2>
      <div
        class="accordion__panel assignment-panel__content"
        id="assignment-brief-panel"
        role="region"
        aria-labelledby="assignment-brief-title"
      >
        ${assessment.brief.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        <p>The purpose of this assignment is to:</p>
        ${renderList(assessment.purpose)}
        <p>Students must select one digital product, platform, or interaction issue to analyse. Examples may include:</p>
        ${renderList(assessment.examples)}
      </div>
    </article>
  `;
}

function renderCriteria(assessment) {
  return `
    <article class="accordion assignment-panel">
      <h2 id="assignment-criteria-title">
        <button
          class="accordion__trigger"
          type="button"
          aria-expanded="false"
          aria-controls="assignment-criteria-panel"
        >
          <span>Assignment Grading Criteria</span>
          <span class="accordion__icon" aria-hidden="true"></span>
        </button>
      </h2>
      <div
        class="accordion__panel assignment-panel__content"
        id="assignment-criteria-panel"
        role="region"
        aria-labelledby="assignment-criteria-title"
        hidden
      >
        ${renderList(assessment.criteria)}
      </div>
    </article>
  `;
}

function renderSubmission() {
  return `
    <section class="submission-card" aria-labelledby="assignment-submission-title">
      <h2 id="assignment-submission-title">Assignment Submission</h2>
      <label class="upload-dropzone" for="assessment-file">
        <input id="assessment-file" class="upload-dropzone__input" type="file" multiple />
        <span class="upload-dropzone__icon" aria-hidden="true"></span>
        <span class="upload-dropzone__text">Drag or upload files here</span>
        <span class="upload-dropzone__files" data-upload-files aria-live="polite"></span>
      </label>
    </section>
  `;
}

function renderDetails(assessment) {
  const dueBadge = getDueBadge(assessment, isAssessmentComplete(assessment.id));

  return `
    <aside class="assignment-details" aria-labelledby="assignment-details-title">
      <h2 id="assignment-details-title">Assignment Details</h2>
      <dl class="assignment-details__list">
        <div class="assignment-details__item assignment-details__item--due">
          <dt>
            <span class="assignment-details__icon assignment-details__icon--calendar" aria-hidden="true"></span>
            Due
          </dt>
          <dd>
            <span>${escapeHtml(formatAssessmentDate(assessment.dueDate))}</span>
            <span class="badge badge--${escapeHtml(dueBadge.type)}">${escapeHtml(dueBadge.label)}</span>
          </dd>
        </div>
        <div class="assignment-details__item">
          <dt>
            <span class="assignment-details__icon assignment-details__icon--attempts" aria-hidden="true"></span>
            Attempts
          </dt>
          <dd>${escapeHtml(formatAttempts(assessment))}</dd>
        </div>
        <div class="assignment-details__item">
          <dt>
            <span class="assignment-details__icon assignment-details__icon--marks" aria-hidden="true"></span>
            Total Marks
          </dt>
          <dd>${escapeHtml(formatMarks(assessment))}</dd>
        </div>
      </dl>
    </aside>
  `;
}

function renderMissingAssessment() {
  return `
    <section class="assessment-empty" aria-labelledby="assessment-empty-title">
      <h1 id="assessment-empty-title">Assessment not found</h1>
      <p>The assessment link is missing or no longer available.</p>
      <a class="button button--secondary" href="index.html">Back to Course Content</a>
    </section>
  `;
}

function renderList(items) {
  return `
    <ul>
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
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
