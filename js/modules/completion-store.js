const COMPLETED_ASSESSMENTS_KEY = "greenscreen.completedAssessments";

export function markAssessmentComplete(assessmentId) {
  if (!assessmentId) {
    return;
  }

  const completedAssessments = getCompletedAssessments();
  completedAssessments[assessmentId] = true;
  localStorage.setItem(COMPLETED_ASSESSMENTS_KEY, JSON.stringify(completedAssessments));
}

export function isAssessmentComplete(assessmentId) {
  return Boolean(getCompletedAssessments()[assessmentId]);
}

export function getCompletedAssessmentIds() {
  return Object.entries(getCompletedAssessments())
    .filter(([, isComplete]) => isComplete)
    .map(([assessmentId]) => assessmentId);
}

function getCompletedAssessments() {
  try {
    return JSON.parse(localStorage.getItem(COMPLETED_ASSESSMENTS_KEY)) || {};
  } catch {
    return {};
  }
}
