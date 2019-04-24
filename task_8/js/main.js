'use strict';

//2
var btnStart = document.getElementById("start"),
	blocksValue = document.querySelectorAll('div[class$="value"]'),
	expItems = document.getElementsByClassName('expenses-item'),
	expBtn = document.getElementsByClassName('expenses-item-btn')[0],
	optExpBtn = document.getElementsByClassName('optionalexpenses-btn')[0],
	countBudgedBtn = document.getElementsByClassName('count-budget-btn')[0],
	optExpItms = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	chkBoxSavings = document.querySelector('#savings'),
	sum = document.querySelector('#sum'),
	percent = document.querySelector('#percent'),
	yearVal = document.querySelector('.year-value'),
	monthVal = document.querySelector('.month-value'),
	dayVal = document.querySelector('.day-value');

let money, time;

btnStart.addEventListener('click', function () {
	//Вводим данные
	time = prompt("Введите дату в формате YYYY-MM-DD", "");
	money = +prompt("Ваш бюджет на месяц?", "");

	//проверка введенных данных
	while (isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", "");
	}

	//Запись данных в объект appDAta
	appData.budget = money;
	appData.timeData = time;

	//Вывод данных на страницу
	blocksValue[0].textContent = money.toFixed();
	yearVal.value = new Date(Date.parse(time)).getFullYear();
	monthVal.value = new Date(Date.parse(time)).getMonth() + 1;
	dayVal.value = new Date(Date.parse(time)).getDate();
});

expBtn.addEventListener('click', function () {

	if (appData.budget != undefined) {

		let sum = 0;

		for (let i = 0; i < expItems.length; i++) {
			let expenditure = expItems[i].value;
			let cost = expItems[++i].value;

			if ((typeof (expenditure) === 'string') && (typeof (expenditure) != null) && (typeof (cost) === 'string') && (typeof (cost) != null) && (expenditure != '') && (cost != '') && (expenditure.length < 50)) {
				appData.expenses[expenditure] = cost;
				sum += +cost;
			} else {
				i--;
			}
		}

		blocksValue[3].textContent = sum;
	} else {
		alert("Нажмите кнопку 'Начать расчет'!");
	}
});

optExpBtn.addEventListener('click', function () {

	if (appData.budget != undefined) {

		for (let i = 0; i < optExpItms.length; i++) {
			let item = optExpItms[i].value;
			appData.optionalExpenses[i] = item;
			blocksValue[4].textContent += appData.optionalExpenses[i] + " ";
		};
	} else {
		alert("Нажмите кнопку 'Начать расчет'!");
	}
});

countBudgedBtn.addEventListener('click', function () {

	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - blocksValue[3].textContent) / 30).toFixed(2);
		blocksValue[1].textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			blocksValue[2].textContent = 'Минимальный уровень достатка';
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			blocksValue[2].textContent = 'Средний уровень достатка';
		} else if (appData.moneyPerDay > 2000) {
			blocksValue[2].textContent = 'Высокий уровень достатка';
		} else {
			blocksValue[2].textContent = 'произошла ошибка';
		}
	} else {
		blocksValue[1].textContent = "Произошла ошибка!";
	}
});

incomeItem.addEventListener('input', function () {
	let items = incomeItem.value;
	appData.income = items.split(', ');

	blocksValue[5].textContent = appData.income;
});

chkBoxSavings.addEventListener('click', function () {
	if (appData.savings) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

sum.addEventListener('input', function () {
	if (appData.savings) {
		let tempSum = +sum.value,
			tempPercent = +percent.value;

		appData.monthIncome = tempSum / 100 / 12 * tempPercent;
		appData.yearIncome = tempSum / 100 * tempPercent;

		blocksValue[6].textContent = appData.monthIncome.toFixed(1);
		blocksValue[7].textContent = appData.yearIncome.toFixed(1);
	}
})

percent.addEventListener('input', function () {
	if (appData.savings) {
		let tempSum = +sum.value,
			tempPercent = +percent.value;

		appData.monthIncome = tempSum / 100 / 12 * tempPercent;
		appData.yearIncome = tempSum / 100 * tempPercent;

		blocksValue[6].textContent = appData.monthIncome.toFixed(1);
		blocksValue[7].textContent = appData.yearIncome.toFixed(1);
	}
})

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false,
};