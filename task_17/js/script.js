$(document).ready(function () {
	
	//show modal
	$('.main').on('click', function (event) {
		console.log(event.target);
		if ($(event.target).hasClass('main_btna') || $(event.target).hasClass('main_btn') || $(event.target).attr('href') == '#sheldure') {
			$('.overlay').animate({opacity: 'toggle'}, 1000);
			$('.modal').slideDown(1000);
		}		
	});

	//hide modal
	$('.close').on('click', function() {
		$('.overlay').animate({opacity: 'toggle'}, 1000);
		$('.modal').slideUp(1000);
	});
});