class RegisterForm extends AsyncForm {

	onSubmit(data) {
		User.register(data, (err, response) => {
      if (!err && response.user) {
        App.setState('user-logged');
        App.getModal('register').close();
        this.element.reset();
      }
      if (err) {
        alert(err);
      }
    });
	}
}