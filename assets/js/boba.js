const filterButtons = document.querySelectorAll(".filter-button");
const drinkCards = document.querySelectorAll(".drink-card");

const toast = document.createElement("div");
toast.className = "toast";
toast.setAttribute("role", "status");
toast.setAttribute("aria-live", "polite");
document.body.appendChild(toast);

let toastTimer;

function showToast(message) {
	toast.textContent = message;
	toast.classList.add("visible");
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const filter = button.dataset.filter;

		filterButtons.forEach((item) => {
			item.classList.remove("active");
			item.setAttribute("aria-pressed", "false");
		});
		button.classList.add("active");
		button.setAttribute("aria-pressed", "true");

		drinkCards.forEach((card) => {
			const isVisible = filter === "all" || card.dataset.type === filter;
			card.classList.toggle("hidden", !isVisible);
		});
	});
});

drinkCards.forEach((card) => {
	card.setAttribute("tabindex", "0");
	card.setAttribute("role", "button");
	card.setAttribute("aria-label", `Pedir ${card.dataset.name}`);

	const openOrder = () => {
		const name = card.dataset.name;
		const price = card.dataset.price;
		const text = encodeURIComponent(`Hola El Rey del Paste, quiero una boba de ${name} (${price}) con tapioca.`);
		showToast(`${name} listo para pedir por WhatsApp`);
		window.open(`https://wa.me/527714658861?text=${text}`, "_blank", "noopener");
	};

	card.addEventListener("click", openOrder);
	card.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			openOrder();
		}
	});
});
