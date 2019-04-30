window.addEventListener('DOMContentLoaded', function() {

	'use strict';

	let tab = document.querySelectorAll('.info-header-tab'),
			info = document.querySelector('.info-header'),
			tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if ( tabContent[b].classList.contains('hide') ) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;

		if ( target && target.classList.contains('info-header-tab') ) {
			for (let i = 0; i < tab.length; i++) {
				if ( target == tab[i] ) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}

	});

	let deadline = '2019-04-30 16:00';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
				seconds, minutes, hours;
				if (t > 0) {
					seconds = Math.floor( (t/1000) % 60 ),
					minutes = Math.floor( (t/60000) % 60 ),
					hours = Math.floor( (t/(1000*60*60)) );
				} else {
					seconds = minutes = hours = 0;
				}


				return {
					'total': t,
					'hours': hours,
					'minutes': minutes,
					'seconds': seconds
				};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
				hours = timer.querySelector('.hours'),
				minutes = timer.querySelector('.minutes'),
				seconds = timer.querySelector('.seconds'),
				timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);
			hours.textContent = t.hours > 9 ? t.hours : "0" + t.hours;
			minutes.textContent = t.minutes > 9 ? t.minutes : "0" + t.minutes;
			seconds.textContent = t.seconds > 9 ? t.seconds : "0" + t.seconds;

			if (total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('timer', deadline);

});