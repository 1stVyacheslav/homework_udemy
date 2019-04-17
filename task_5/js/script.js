'use strict';



let money, time;

function start() {
	money = +prompt("Ваш бюджет на месяц?", "");
	time = prompt("Введите дату в формате YYYY-MM-DD", "");

	while (isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", "");
	}
}

start();

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false,

	chooseExpenses: function () {
		for (let i = 0; i < 2; i++) {
			let expenditure = prompt("Введите обязательную статью расходов в этом месяце", "");
			let cost = prompt("Во сколько обойдется?", "");

			if ((typeof (expenditure) === 'string') && (typeof (expenditure) != null) && (typeof (cost) === 'string') && (typeof (cost) != null) && (expenditure != '') && (cost != '') && (expenditure.length < 50)) {
				appData.expenses[expenditure] = cost;
			} else {
				i--;
			}
		}
	},

	detectDayBufget: function () {
		appData.moneyPerDay = (appData.budget / 30).toFixed(2);
		alert("Ежедневный бюджет: " + appData.moneyPerDay);
	},

	detectLevel: function () {
		if (appData.moneyPerDay < 100) {
			console.log('Минимальный уровень достатка');
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log('Средний уровень достатка');
		} else if (appData.moneyPerDay > 2000) {
			console.log('ВЫсокий уровень достатка');
		} else {
			console.log('произошла ошибка');
		}
	},

	checkSavings: function () {
		if (appData.savings) {
			let save = +prompt('Какова сумма накоплений?', ''),
				percent = +prompt('Под какой процент?', '');

			appData.monthIncome = save / 100 / 12 * percent;
			alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
		}
	},

	chooseOptExpenses: function () {
		for (let i = 1; i < 4; i++) {
			let item = prompt("Статья не обязательных расходов?", '');
			appData.optionalExpenses[i] = item;
		}
	},

	chooseIncome: function () {

		while (true) {
			let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");
			if ((typeof (items) === "string") && (items != "") && (typeof (items) != null)) {
				appData.income = items.split(', ');
				appData.income.push(prompt('Может что-то еще?', ''));
				appData.income.sort();
				break;
			}
		}
	}
};

appData.chooseIncome();
appData.income.forEach(function (item, i) {
	alert( "Способы доп.заработка: " + (i + 1) + " - " + item);
});

for (let key in appData) {
	console.log( "Наша программа включает в себя данные: " + key + " - " + appData[key] );
}
