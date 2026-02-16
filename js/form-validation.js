const form = document.querySelector("#contactForm");

// AJAX
form.addEventListener("submit", async function (e) {
	e.preventDefault();

	const submitButton = form.querySelector(".form__submit");
	const originalText = submitButton.textContent;

	submitButton.textContent = "Enviando...";
	submitButton.disabled = true;

	const formData = new FormData(form);

	try {
		const response = await fetch(form.action, {
			method: "POST",
			body: formData,
			headers: {
				Accept: "application/json",
			},
		});

		if (response.ok) {
			showSuccessMessage();
			form.reset();
		} else {
			throw new Error("Error al enviar el formulario");
		}
	} catch (error) {
		alert("Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente o contáctame directamente por WhatsApp.");
		submitButton.textContent = originalText;
		submitButton.disabled = false;
	}
});

function showSuccessMessage() {
	const formContainer = form.parentElement;

	const successMessage = document.createElement("div");
	successMessage.classList.add("form__success");

	const icon = document.createElement("div");
	icon.classList.add("success__icon");
	icon.textContent = "✓";

	const title = document.createElement("h3");
	title.classList.add("success__title");
	title.textContent = "¡Mensaje enviado con éxito!";

	const text = document.createElement("p");
	text.classList.add("success__text");
	text.textContent = "Gracias por contactarme. Te responderé a la brevedad, generalmente en menos de 24 horas.";

	const button = document.createElement("button");
	button.classList.add("success__button");
	button.textContent = "Enviar otro mensaje";
	button.addEventListener("click", () => location.reload());

	successMessage.appendChild(icon);
	successMessage.appendChild(title);
	successMessage.appendChild(text);
	successMessage.appendChild(button);

	form.style.opacity = "0";
	form.style.transform = "scale(0.95)";

	setTimeout(() => {
		form.style.display = "none";
		formContainer.appendChild(successMessage);
	}, 300);
}

// validación
const inputs = form.querySelectorAll(".form__input, .form__textarea");

inputs.forEach((input) => {
	input.addEventListener("blur", function() {
		if (this.value.trim() === "" && this.hasAttribute("required")) {
			this.style.borderColor = "#ff6b7b";
		} else {
			this.style.borderColor = "";
		}
	});

	input.addEventListener("input", function() {
		if (this.style.borderColor === "rgb(255, 107, 107)") {
			this.style.borderColor = "";
		}
	});
});

// validar email
const emailInput = document.querySelector("#email");
emailInput.addEventListener("blur", function() {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(this.value) && this.value !== "") {
		this.style.borderColor = "#ff6b6b";
	}
});
