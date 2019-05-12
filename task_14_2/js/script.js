"use strict";

let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {

	function sendData() {

		return new Promise( (resolve, reject) => {
			let request = new XMLHttpRequest();

			request.open('GET', 'js/current.json');
			request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			
			//обработчик изменения состояния запроса
			request.addEventListener('readystatechange', function() {
					if (request.readyState < 4) {
						inputUsd.value = 'Идет загрузка данных с сервера!';
					} else if (request.readyState === 4) {
						if (request.status == 200) {
							console.log(request.response);
							let data = JSON.parse(request.response);
							console.log(data);
							resolve(data);
						} else {
							reject();
						}
					} 
					
			});

			request.send();
		} ); //end Promise
	} // end function sendData

	sendData()
	.then( (data) => {	
		inputUsd.value = inputRub.value / data.usd;
	} )
	.catch( () => inputUsd.value = "Что-то пошло не так!" );

});