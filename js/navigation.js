const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");
const header = document.getElementById("header");
const sections = document.querySelectorAll("section[id]");

// mobile menu
if (navToggle) {
	navToggle.addEventListener("click", () => {
		navMenu.classList.toggle("nav__menu--active");
		navToggle.classList.toggle("nav__toggle--active");
	});
}

navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		navMenu.classList.remove("nav__menu--active");
		navToggle.classList.remove("nav__toggle--active");
	});
});

// scroll suave
navLinks.forEach((link) => {
	link.addEventListener("click", function (e) {
		e.preventDefault();

		const targetId = this.getAttribute("href");
		const targetSection = document.querySelector(targetId);

		if (targetSection) {
			const headerHeight = header.offsetHeight + 36;
			const targetPosition = targetSection.offsetTop - headerHeight;

			window.scrollTo({
				top: targetPosition,
				behavior: "smooth",
			});
		}
	});
});

// sección activa
function highlightNavOnScroll() {
    const scrollY = window.scrollY;
    const offset = 100;
    const headerHeight = header.offsetHeight + 36;

    navLinks.forEach((link) => link.classList.remove("active"));

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - offset - headerHeight; // Ajustado para consistencia
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
            break;
        }
    }
}

// listeners
window.addEventListener("scroll", () => {
	highlightNavOnScroll();
});

// llamada inicial
highlightNavOnScroll();
