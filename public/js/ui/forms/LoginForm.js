class LoginForm extends AsyncForm {
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (!err && response.user) {
        App.setState('user-logged');
        App.getModal('login').close();
        this.element.reset();
      }
      if (err) {
        alert(err);
      }
    });
	}
}