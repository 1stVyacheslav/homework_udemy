'use strict';

let money = +prompt("Ваш бюджет на месяц?", "");
let time = prompt("Введите дату в формате YYYY-MM-DD", "");

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false,
};

for (let i = 0; i < 2; i++) {
	let expenditure = prompt("Введите обязательную статью расходов в этом месяце", "");
	let cost = prompt("Во сколько обойдется?", "");

	if ((typeof (expenditure) === 'string') && (typeof (expenditure) != null) && (typeof (cost) === 'string') && (typeof (cost) != null) && (expenditure != '') && (cost != '') && (expenditure.length < 50)) {
		appData.expenses[expenditure] = cost;
	} else {
		i--;
	}
}

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

appData.moneyPerDay = appData.budget / 30;

alert("Ежедневный бюджет: " + appData.moneyPerDay);

if (appData.moneyPerDay < 100) {
	console.log('Минимальный уровень достатка');
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
	console.log('Средний уровень достатка');
} else if (appData.moneyPerDay > 2000) {
	console.log('ВЫсокий уровень достатка');
} else {
	console.log('произошла ошибка');
}

console.log(appData.budget);
console.log(appData.timeData);
console.log(appData.expenses);
console.log(appData.optionalExpenses);
console.log(appData.income);
console.log(appData.savings);