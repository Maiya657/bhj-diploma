class TransactionsPage {

	constructor(element) {
		if (element === null) {
			throw new Error('Элемент не найден!');
		}
		this.element = element;
		this.registerEvents();
	}

	update() {
		this.render(this.lastOptions);
	}

	registerEvents() {
		document.querySelector('.remove-account').addEventListener('click', e => {
			e.preventDefault();
			this.removeAccount();
		});

		this.element.addEventListener('click', e => {
			e.preventDefault();
			const removeBtn = e.target.closest('.transaction__remove');
			if (removeBtn) {
				this.removeTransaction(removeBtn.dataset.id);
			}
		})
	}

	removeAccount() {
		if (this.lastOptions && confirm('Вы действительно хотите удалить счёт?')) {
			Account.remove({
				"id": this.lastOptions.account_id
			}, (err, response) => {
				App.updateWidgets();
				App.updateForms();
				this.clear();
			});
		}
	}

	removeTransaction(id) {
		if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
			Transaction.remove({
				"id": id
			}, (err, response) => {
				if (!err && response.success) {
          this.update();
					App.update();
				}
			})
		}
	}

	render(options) {
		if (options) {
			this.lastOptions = options;

			Account.get(options.account_id, (err, response) => {
				if (!err && response.success) {
					this.renderTitle(response.data.name);
				}
			});

			Transaction.list(options, (err, response) => {
				if (!err && response.success) {
					this.renderTransactions(response.data);
				}
			})
		}
	}

	clear() {
		this.renderTransactions([]);
		this.renderTitle('Название счёта');
		delete this.lastOptions;
	}

	renderTitle(name) {
		document.querySelector('.content-title').textContent = name;
	}

	formatDate(date) {
		return new Intl.DateTimeFormat("ru-RU", {
			dateStyle: "full",
			timeStyle: "long",
		}).format(new Date(date))
	}

	getTransactionHTML(item) {
		return `  
    <div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <!-- дата -->
              <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
          <!--  сумма -->
              ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <!-- в data-id нужно поместить id -->
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>`


	}

	renderTransactions(data) {
    this.element.querySelector('.content').innerHTML = data.reduce((accumulator, transaction) => {
      return accumulator + this.getTransactionHTML(transaction);
    }, '');
	}
}