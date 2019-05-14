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
		statusMassage = document.createElement('div');

	statusMassage.classList.add('status');

	// Contact form
	let contactForm = document.getElementById('form');

	function sendForm(form) {
		let input = form.getElementsByTagName('input');

		form.addEventListener('submit', (event) => {
			event.preventDefault();

			// Добавляем элемент с выводом сообщения о статусе на страницу
			form.appendChild(statusMassage);

			// Формируем данные формы в json-строку
			let formData = new FormData(form);
			let obj = {};
			formData.forEach((value, key) => {
				obj[key] = value;
			});
			let json = JSON.stringify(obj);

			//функция отправки данных
			function postData(data) {

				//функция postData возвращает экземпляр Promise
				return new Promise((resolve, reject) => {

					//создаем POST запрос
					let request = new XMLHttpRequest();
					request.open('POST', '../servr.php');
					request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

					//проверяем состояние запроса
					request.addEventListener('readystatechange', () => {
												
						if (request.readyState < 4 ) {
							
							statusMassage.innerHTML = message.loading;
						} else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 300) {
								resolve();
							} else {
								reject();
							}
						}
					});

					//отправляем данные
					request.send(data);
				});
			}

			postData(json)
							.then(() => {
								statusMassage.innerHTML = message.success;													
							})
							.catch(() => {
								statusMassage.innerHTML = message.failure;							
							})
							.finally(() => {							
								clearInput(input);
							});
		});

		//функция очистки полей ввода
		function clearInput(input) {
			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
			}
		}
	}

	sendForm(contactForm);
	sendForm(form);

	//slider
	let slideIndex = 1,
			slides = document.querySelectorAll('.slider-item'),
			prev = document.querySelector('.prev'),
			next = document.querySelector('.next'),
			dotsWrap = document.querySelector('.slider-dots'),
			dots = document.querySelectorAll('.dot');

	showSlide(slideIndex);

	function showSlide(index) {

		if (index > slides.length) {
			slideIndex = 1;
		}

		if (index < 1) {
			slideIndex = slides.length;
		}

		slides.forEach( (item) => item.style.display = 'none' );
		dots.forEach( (item) => item.classList.remove('dot-active') );

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');
	}

	function plusSlide(n) {
		showSlide(slideIndex += n);
	}

	function currentSlide(n) {
		showSlide(slideIndex = n);
	}

	prev.addEventListener('click', function() {
		plusSlide(-1);
	});

	next.addEventListener('click', function() {
		plusSlide(1);
	});

	dotsWrap.addEventListener('click', function(event) {
		for (let i = 1; i < dots.length + 1; i++) {
			if ( event.target == dots[i - 1] ) {
				currentSlide(i);
			}
		}
	});

	//Calc

	let persons = document.querySelectorAll('.counter-block-input')[0],
			restDays = document.querySelectorAll('.counter-block-input')[1],
			place = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			personsSum = 0,
			daysSum = 0,
			total = 0;

			totalValue.innerHTML = 0;

			persons.addEventListener('change', function() {
				personsSum = +this.value;
				total = (daysSum + personsSum) * 4000;

				if ( restDays.value == '' || this.value == '' ) {
					totalValue.innerHTML = 0;
				} else {
					totalValue.innerHTML = total;
				}
			});

			restDays.addEventListener('change', function() {
				daysSum = +this.value;
				total = (daysSum + personsSum) * 4000;

				if ( persons.value == '' || this.value == '' ) {
					totalValue.innerHTML = 0;
				} else {
					totalValue.innerHTML = total;
				}
			});

			place.addEventListener('change', function() {
				if ( restDays.value == ''  || persons.value == '' ) {
					totalValue.innerHTML = 0;
				} else {
					let a = total;
					totalValue.innerHTML = a * this.options[this.selectedIndex].value;
				}
			});
});