class CreateTransactionForm extends AsyncForm {

	constructor(element) {
		super(element);
		this.renderAccountsList();
	}

	renderAccountsList() {
		const expenseList = document.querySelector('#expense-accounts-list');
		const incomeList = document.querySelector('#income-accounts-list');

		Account.list(null, (err, response) => {
			if (!err && response.data) {
				expenseList.innerHTML = '';
				incomeList.innerHTML = '';
				response.data.forEach(account => {
					expenseList.insertAdjacentHTML('beforeEnd', `<option value="${account.id}">${account.name}</option>`);
					incomeList.insertAdjacentHTML('beforeEnd', `<option value="${account.id}">${account.name}</option>`);
				})
			}
		})
	}

	onSubmit(data) {
		Transaction.create(data, (err, response) => {
			if (!err && response.success) {
				if (data.type === 'income') {
					App.getModal('newIncome').close();
				} else if (data.type === 'expense') {
					App.getModal('newExpense').close();
				}
				this.element.reset();
				App.update();
			}
			if (err) {
				alert(err);
			}
		});
	}
}