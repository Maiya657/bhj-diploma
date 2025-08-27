class CreateAccountForm extends AsyncForm {
  
  onSubmit(data) {
		Account.create(data, (err, response) => {
			if (!err && response.account) {
				App.getModal('createAccount').close();
				this.element.reset();
				App.update();
			}
			if (err) {
				alert(err);
			}
		});
	}
}