import { assessments } from "../data/assessments.js";
import { getDeadlinePriority } from "./assessment-format.js";

export async function initCalendar() {
  const calendarMount = document.querySelector('[data-component="calendar"]');

  if (!calendarMount) {
    return;
  }

  calendarMount.innerHTML = renderCalendar(new Date());
}

function renderCalendar(today) {
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthLabel = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(monthStart);
  const days = getCalendarDays(monthStart);

  return `
    <div class="calendar" aria-label="${monthLabel} calendar">
      <header class="calendar__header">
        <h4>${monthLabel}</h4>
      </header>
      <div class="calendar__weekdays" aria-hidden="true">
        <span>M</span>
        <span>T</span>
        <span>W</span>
        <span>T</span>
        <span>F</span>
        <span>S</span>
        <span>S</span>
      </div>
      <div class="calendar__grid">
        ${days.map((date) => renderCalendarDay(date, today, monthStart)).join("")}
      </div>
      <ul class="calendar__legend" aria-label="Deadline priority legend">
        <li><span class="calendar__legend-dot calendar__legend-dot--urgent"></span>Due in 5 days</li>
        <li><span class="calendar__legend-dot calendar__legend-dot--warning"></span>Due in 10 days</li>
        <li><span class="calendar__legend-dot calendar__legend-dot--info"></span>Later</li>
      </ul>
    </div>
  `;
}

function getCalendarDays(monthStart) {
  const startOffset = (monthStart.getDay() + 6) % 7;
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(monthStart.getDate() - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    return date;
  });
}

function renderCalendarDay(date, today, monthStart) {
  const dayAssessments = assessments.filter((assessment) => isSameDay(new Date(assessment.dueDate), date));
  const priority = getHighestPriority(dayAssessments, today);
  const isCurrentMonth = date.getMonth() === monthStart.getMonth();
  const isToday = isSameDay(date, today);
  const classes = ["calendar__date"];
  const labelParts = [formatReadableDate(date)];

  if (!isCurrentMonth) {
    classes.push("calendar__muted");
  }

  if (priority) {
    classes.push(`calendar__day--${priority}`);
    labelParts.push(`${priority} deadline`);
  }

  if (isToday) {
    classes.push("calendar__date--today");
    labelParts.push("today");
  }

  return `<span class="${classes.join(" ")}" aria-label="${labelParts.join(", ")}">${String(date.getDate()).padStart(2, "0")}</span>`;
}

function getHighestPriority(dayAssessments, today) {
  const priorities = dayAssessments.map((assessment) => getDeadlinePriority(assessment, today));

  if (priorities.includes("urgent")) {
    return "urgent";
  }

  if (priorities.includes("warning")) {
    return "warning";
  }

  if (priorities.includes("info")) {
    return "info";
  }

  return "";
}

function isSameDay(firstDate, secondDate) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

function formatReadableDate(date) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(date);
}
