import { initAccordions } from "./modules/accordion.js";
import { initAssessmentSubmission } from "./modules/assessment-submission.js";
import { renderAssessmentPage } from "./modules/assessment-page.js";
import { initNavigation } from "./modules/navigation.js";
import { initSubmissionUpload } from "./modules/submission-upload.js";

renderAssessmentPage();
initAccordions();
initNavigation();
initSubmissionUpload();
initAssessmentSubmission();
