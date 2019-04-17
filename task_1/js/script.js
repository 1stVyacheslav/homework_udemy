'use strict';

let money = prompt("Ваш бюджет на месяц?", "");
let time = prompt("Введите дату в формате YYYY-MM-DD", "");

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false,
};

for (var i = 0; i < 2; i++) {
	var expenditure = prompt("Введите обязательную статью расходов в этом месяце", "");
	var cost = prompt("Во сколько обойдется?", "");
	appData.expenses[expenditure] = cost;
}

alert(+appData.budget / 30);

console.log(appData.budget);
console.log(appData.timeData);
console.log(appData.expenses);
console.log(appData.optionalExpenses);
console.log(appData.income);
console.log(appData.savings);