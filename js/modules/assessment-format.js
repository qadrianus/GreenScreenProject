const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function formatAssessmentDate(dueDate) {
  const date = new Date(dueDate);
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month} ${day} ${year}, ${hours}.${minutes}`;
}

export function getDueBadge(assessment, isComplete = false) {
  if (isComplete || assessment.completed) {
    return { label: "Completed", type: "success" };
  }

  const dueDate = new Date(assessment.dueDate);
  const now = new Date();
  const daysLeft = Math.ceil((dueDate - now) / DAY_IN_MS);

  if (daysLeft < 0) {
    return { label: "Overdue", type: "urgent" };
  }

  if (daysLeft === 0) {
    return { label: "Due today", type: "urgent" };
  }

  if (daysLeft <= 5) {
    return { label: `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`, type: "urgent" };
  }

  if (daysLeft <= 10) {
    return { label: `${daysLeft} days left`, type: "warning" };
  }

  return { label: `${daysLeft} days left`, type: "info" };
}

export function getDeadlinePriority(assessment, today = new Date()) {
  if (assessment.completed) {
    return "success";
  }

  const dueDate = new Date(assessment.dueDate);
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const daysLeft = Math.ceil((startOfDueDate - startOfToday) / DAY_IN_MS);

  if (daysLeft <= 5) {
    return "urgent";
  }

  if (daysLeft <= 10) {
    return "warning";
  }

  return "info";
}

export function formatAttempts(assessment) {
  return `${assessment.attemptsUsed}/${assessment.attemptsAllowed}`;
}

export function formatMarks(assessment) {
  return `${assessment.marks} Marks`;
}
