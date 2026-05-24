export function initNavigation() {
  const navLinks = document.querySelectorAll(".course-nav__link");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      navLinks.forEach((item) => item.classList.remove("course-nav__link--active"));
      link.classList.add("course-nav__link--active");
    });
  });
}
