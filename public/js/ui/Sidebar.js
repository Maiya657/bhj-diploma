class Sidebar {
	static init() {
		this.initAuthLinks();
		this.initToggleButton();
	}

	static initToggleButton() {
		const sidebarBtn = document.querySelector(".sidebar-toggle");
		const body = document.body;

		sidebarBtn.addEventListener("click", () => {
			body.classList.toggle("sidebar-open");
			body.classList.toggle("sidebar-collapse");
		})
	}

	static initAuthLinks() {
		document.querySelector(".menu-item_register").addEventListener("click", (e) => {
			e.preventDefault();
			App.getModal('register').open();
		})

		document.querySelector(".menu-item_login").addEventListener("click", (e) => {
			e.preventDefault();
			App.getModal('login').open();
		})

		document.querySelector(".menu-item_logout").addEventListener("click", (e) => {
			e.preventDefault();
			User.logout((err, response) => {
				if (!err && response.success) {
					App.setState('init');
				}
				if (err) {
					alert(err);
				}
			})
		})
	}
}