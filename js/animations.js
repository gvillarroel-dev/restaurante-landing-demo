const animatedElements = document.querySelectorAll("[data-animate]");

const observerOptions = {
	threshold: 0.15,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("animate-in");
		}
	});
}, observerOptions);

animatedElements.forEach((element) => {
	observer.observe(element);
});

window.addEventListener("DOMContentLoaded", () => {
	animatedElements.forEach((element) => {
		const rect = element.getBoundingClientRect();
		const isVisible = rect.top < window.innerHeight;

		if (isVisible) {
			element.classList.add("animate-in");
		}
	});
});
