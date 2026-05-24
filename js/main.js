import { initAccordions } from "./modules/accordion.js";
import { initCalendar } from "./modules/calendar.js";
import { initNavigation } from "./modules/navigation.js";
import { initTasks } from "./modules/tasks.js";
import { initToast } from "./modules/toast.js";
import { renderWeeks } from "./modules/weeks.js";

renderWeeks();
initCalendar();
initAccordions();
initNavigation();
initTasks();
initToast();
