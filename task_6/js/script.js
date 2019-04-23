"use strict";

//2.1
let menuItems = document.getElementsByClassName("menu-item"),
		menu = document.querySelector(".menu"),
		fiveItem = document.createElement('li');

menuItems[1].textContent = "Второй пункт";
menuItems[2].textContent = "Третий пункт";
fiveItem.classList.add("menu-item");
fiveItem.textContent = "Пятый пункт";

menu.appendChild(fiveItem);

//2.2
document.body.style.background = "url(../img/apple_true.jpg) center no-repeat"


//2.3
let title = document.getElementById('title');

title.textContent = 'Мы продаем только подлинную технику Apple';

//2.4
let parentAdv = document.getElementsByClassName('column')[1],
		adv = document.getElementsByClassName('adv')[0];

parentAdv.removeChild(adv);

//2.5
let text = prompt('Ваше отношение к технике Apple?', ''),
		textDiv = document.getElementById('prompt');

textDiv.textContent = text;
