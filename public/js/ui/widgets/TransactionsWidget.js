class TransactionsWidget {

	constructor(element) {
		if (element === null) {
			throw new Error('Элемент не найден!');
		}
		this.element = element;
		this.registerEvents();
	}

	registerEvents() {
		document.querySelector('.create-income-button').addEventListener('click', e => {
			e.preventDefault();
			App.getModal('newIncome').open();
		});

		document.querySelector('.create-expense-button').addEventListener('click', e => {
			e.preventDefault();
			App.getModal('newExpense').open();
		});
	}
}