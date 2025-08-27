class Modal {
	static element;

	constructor(element) {
		if (element === null) {
			throw new Error('Элемент не найден!');
		}
		this.element = element;
		this.registerEvents();
	}

	registerEvents() {
		const elementsClose = Array.from(this.element.querySelectorAll('[data-dismiss = "modal"]'));

		elementsClose.forEach(elem => {
			elem.addEventListener("click", () => {
				this.onClose();
			})
		})
	}

	onClose(e) {
		this.close();
	}

	open() {
		this.element.setAttribute('style', 'display: block');
	}

	close() {
		this.element.style.removeProperty('display');
	}
}