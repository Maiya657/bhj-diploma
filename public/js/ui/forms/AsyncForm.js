class AsyncForm {
	static element;

	constructor(element) {
		if (element === null) {
			throw new Error('Элемент не найден!');
		}
		this.element = element;
		this.registerEvents();
	}

	registerEvents() {
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submit();
    })
	}

	getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
	}

	onSubmit(options) {

	}

	submit() {
		this.onSubmit(this.getData());
	}
}