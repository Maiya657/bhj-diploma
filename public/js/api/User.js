class User {
	static URL = '/user';

	static setCurrent(user) {
		localStorage.user = JSON.stringify(user);

	}

	static unsetCurrent() {
		localStorage.removeItem('user');
	}

	static current() {
    return JSON.parse(localStorage.getItem('user'));
	}

	static fetch(callback) {
		createRequest({
			url: this.URL + '/current',
			method: 'GET',
			data: User.current(),
			callback: (err, response) => {
				if (response && response.success && response.user) {
					this.setCurrent(response.user);
				} else if (response && !response.success) {
          this.unsetCurrent();
        }
				callback(err, response);
			}
		});
	}

	static login(data, callback) {
		createRequest({
			url: this.URL + '/login',
			method: 'POST',
			data: data,
			callback: (err, response) => {
				if (response && response.user) {
					this.setCurrent(response.user);
				}
				callback(err, response);
			}
		});
	}

	static register(data, callback) {
		createRequest({
			url: this.URL + '/register',
			method: 'POST',
			data: data,
			callback: (err, response) => {
				if (response && response.success) {
					this.setCurrent(response.user);
				}
				callback(err, response);
			}
		})
	}

	static logout(callback) {
		createRequest({
			url: this.URL + '/logout',
			method: 'POST',
			callback: (err, response) => {
				if (response && response.success) {
		      this.unsetCurrent();
				}
				callback(err, response);
			}
		})
	}
}