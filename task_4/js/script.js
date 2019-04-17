'use strict';



let money, time;

function start() {
	money = +prompt("Ваш бюджет на месяц?", "");
	time = prompt("Введите дату в формате YYYY-MM-DD", "");
	 
	while ( isNaN(money) || money == ""  || money == null) {
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
};

function chooseExpenses() {
	for (let i = 0; i < 2; i++) {
		let expenditure = prompt("Введите обязательную статью расходов в этом месяце", "");
		let cost = prompt("Во сколько обойдется?", "");
	
		if ((typeof (expenditure) === 'string') && (typeof (expenditure) != null) && (typeof (cost) === 'string') && (typeof (cost) != null) && (expenditure != '') && (cost != '') && (expenditure.length < 50)) {
			appData.expenses[expenditure] = cost;
		} else {
			i--;
		}
	}
}

chooseExpenses();


/*let i = 0;
while (i < 2) {
	let expenditure = prompt("Введите обязательную статью расходов в этом месяце", "");
	let cost = prompt("Во сколько обойдется?", "");

	if ((typeof (expenditure) === 'string') && (typeof (expenditure) != null) && (typeof (cost) === 'string') && (typeof (cost) != null) && (expenditure != '') && (cost != '') && (expenditure.length < 50)) {
		appData.expenses[expenditure] = cost;
		i++;
	}
}*/

/*let i=0;
do {
	let expenditure = prompt("Введите обязательную статью расходов в этом месяце", "");
	let cost = prompt("Во сколько обойдется?", "");

	if ((typeof (expenditure) === 'string') && (typeof (expenditure) != null) && (typeof (cost) === 'string') && (typeof (cost) != null) && (expenditure != '') && (cost != '') && (expenditure.length < 50)) {
		appData.expenses[expenditure] = cost;
		i++
	}
}
while (i < 2);*/

function detectDayBufget() {
	appData.moneyPerDay = (appData.budget / 30).toFixed(2);
	alert("Ежедневный бюджет: " + appData.moneyPerDay);
}

detectDayBufget()

function detectLevel() {
	if (appData.moneyPerDay < 100) {
		console.log('Минимальный уровень достатка');
	} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
		console.log('Средний уровень достатка');
	} else if (appData.moneyPerDay > 2000) {
		console.log('ВЫсокий уровень достатка');
	} else {
		console.log('произошла ошибка');
	}
}

detectLevel()


function checkSavings() {
	if (appData.savings) {
		let save = +prompt('Какова сумма накоплений?', ''),
				percent = +prompt('Под какой процент?', '');

		appData.monthIncome = save/100/12*percent;
		alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
	}
}

checkSavings();

function chooseOptExpenses() {
	for (i = 1; i < 4; i++ ) {
		let item = prompt("Статья не обязательных расходов?", '');
		appData.optionalExpenses[i] = item;
	}
}

console.log(appData.budget);
console.log(appData.timeData);
console.log(appData.expenses);
console.log(appData.optionalExpenses);
console.log(appData.income);
console.log(appData.savings);