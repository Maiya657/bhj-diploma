class UserWidget {
	static element;

	constructor(element) {
		if (element === null) {
			throw new Error('Элемент не найден!');
		}
		this.element = element;
	}

	update() {
		const currentUser = User.current();
		if (currentUser) {
			document.querySelector('.user-name').textContent = currentUser.name;
		}
	}
}