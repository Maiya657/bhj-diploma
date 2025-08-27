class AccountsWidget {

	constructor(element) {
		if (element === null) {
			throw new Error('Элемент не найден!');
		}
		this.element = element;
		this.registerEvents();
		this.update();
	}

	registerEvents() {
		document.querySelector(".create-account").addEventListener("click", (e) => {
			e.preventDefault();
			App.getModal('createAccount').open();
		})

		this.element.addEventListener('click', e => {
			e.preventDefault();
			const account = e.target.closest('.account');
			if (account) {
				this.onSelectAccount(account);
			}
		})
	}

	update() {
		const currentUser = User.current();

		if (currentUser) {
			Account.list(null, (err, response) => {
				this.clear();
				if (!err && response.data) {
					response.data.forEach(account => {
						this.renderItem(account);
					})
				}
			});
		}
	}

	clear() {
		Array.from(document.querySelectorAll('.account')).forEach(account => {
			account.remove();
		})
	}

	onSelectAccount(element) {
		Array.from(document.querySelectorAll('.active')).forEach(active => {
			active.classList.remove('active');
		})
		element.classList.add('active');
		App.showPage('transactions', {
			account_id: element.dataset.id
		});
	}

	getAccountHTML(item) {
		const numberFormat = new Intl.NumberFormat("ru-RU", {
			style: "currency",
			currency: "RUB"
		})
		return `
    <li class="account" data-id="${item.id}">
      <a href="#">
        <span>${item.name}</span> /
        <span>${numberFormat.format(item.sum)}</span>
      </a>
    </li>`
	}

	renderItem(data) {
		this.element.insertAdjacentHTML('beforeEnd', this.getAccountHTML(data));
	}
}