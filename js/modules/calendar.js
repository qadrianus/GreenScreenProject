export async function initCalendar() {
  const calendarMount = document.querySelector('[data-component="calendar"]');

  if (!calendarMount) {
    return;
  }

  try {
    const response = await fetch("components/calendar.html");

    if (!response.ok) {
      throw new Error(`Calendar component failed to load: ${response.status}`);
    }

    calendarMount.innerHTML = await response.text();
  } catch (error) {
    calendarMount.innerHTML = '<p class="calendar__error">Calendar is unavailable.</p>';
    console.error(error);
  }
}
