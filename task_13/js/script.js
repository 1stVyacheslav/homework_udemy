window.addEventListener('DOMContentLoaded', function () {

	'use strict';

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	let hideTabContent = (a) => {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	};

	hideTabContent(1);

	let showTabContent = (b) => {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	};
	info.addEventListener('click', (event) => {
		let target = event.target;

		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}

	});

	let deadline = '2019-05-04 16:00';

	let getTimeRemaining = (endtime) => {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds, minutes, hours;
		if (t > 0) {
			seconds = Math.floor((t / 1000) % 60);
			minutes = Math.floor((t / 60000) % 60);
			hours = Math.floor((t / (1000 * 60 * 60)));
		} else {
			seconds = minutes = hours = 0;
		}


		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	};

	let setClock = (id, endtime) => {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds');


		let updateClock = () => {
			let t = getTimeRemaining(endtime);
			hours.textContent = t.hours > 9 ? t.hours : "0" + t.hours;
			minutes.textContent = t.minutes > 9 ? t.minutes : "0" + t.minutes;
			seconds.textContent = t.seconds > 9 ? t.seconds : "0" + t.seconds;

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		};

		let timeInterval = setInterval(updateClock, 1000);
	};

	setClock('timer', deadline);


	// modal

	let content = document.querySelector('.content'),
		more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close');

	content.addEventListener('click', (event) => {
		let target = event.target;

		if (target && (target.classList.contains('more') || target.classList.contains('description-btn'))) {
			overlay.style.display = 'block';
			content.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		}
	});

	close.addEventListener('click', () => {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	// Form

	let message = {
		loading: 'Загрузка',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так!'
	};

	let form = document.querySelector('.main-form'),
		input = form.getElementsByTagName('input'),
		statusMassage = document.createElement('div');

	statusMassage.classList.add('status');

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		form.appendChild(statusMassage);

		let request = new XMLHttpRequest();
		request.open('POST', '../server.php');
		request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

		let formData = new FormData(form);

		let obj = {};
		formData.forEach((value, key) => {
			obj[key] = value;
		});

		let json = JSON.stringify(obj);

		request.addEventListener('readystatechange', () => {
			if (request.readyState < 4) {
				statusMassage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200) {
				statusMassage.innerHTML = message.success;
			} else {
				statusMassage.innerHTML = message.failure;
			}
		});

		request.send(json);

		for (let i = 0; i < input.length; i++) {
			input[i].value = '';
		}
	});

	// Contact form

	let contactForm = document.getElementById('form'),
		contInput = contactForm.getElementsByTagName('input');

		console.log(contactForm);

	contactForm.addEventListener('submit', (event) => {
		event.preventDefault();

		contactForm.appendChild(statusMassage);

		let request = new XMLHttpRequest();
		request.open('POST', '../server.php');
		request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

		let formData = new FormData(contactForm);

		let obj = {};
		formData.forEach((value, key) => {
			obj[key] = value;
		});

		let json = JSON.stringify(obj);

		request.addEventListener('readystatechange', () => {
			if (request.readyState < 4) {
				statusMassage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200) {
				statusMassage.innerHTML = message.success;
			} else {
				statusMassage.innerHTML = message.failure;
			}
		});

		request.send(json);

		for (let i = 0; i < contInput.length; i++) {
			contInput[i].value = '';
		}
	
	});

});