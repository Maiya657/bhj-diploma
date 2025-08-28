class CreateTransactionForm extends AsyncForm {

	constructor(element) {
		super(element);
		this.renderAccountsList();
	}

	renderAccountsList() {
    const accountSelect = this.element.querySelector('.accounts-select');

		Account.list(null, (err, response) => {
			if (!err && response.data) {
        accountSelect.innerHTML = response.data.reduce((accumulator, account) => {
          return accumulator + `<option value="${account.id}">${account.name}</option>`;
        }, '');
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