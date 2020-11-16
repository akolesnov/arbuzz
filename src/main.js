jQuery(function($) {

	$('#dark-mode').on('click', function (e) {
		$('body').toggleClass('dark');
	});


	$('.block-1 .more-btn').on('click', function (e) {
		$('.block-1 .service__text').toggleClass('show');
		$('.block-1 .more-btn img').toggleClass('rotate');
	});
	$('.block-2 .more-btn').on('click', function (e) {
		$('.block-2 .service__text').toggleClass('show');
		$('.block-2 .more-btn img').toggleClass('rotate');
	});
	$('.block-3 .more-btn').on('click', function (e) {
		$('.block-3 .service__text').toggleClass('show');
		$('.block-3 .more-btn img').toggleClass('rotate');
	});
	$('.close-btn').on('click', function (e) {
		$('.service__text').removeClass('show');
		$('.more-btn img').removeClass('rotate');
	});


	// слайдер отзывы START

	$('.reviews__wrap').slick({
		dots: false,
		arrows: true,
		speed: 500,
		slidesToShow: 3,
		infinity: true,
		prevArrow: '<span class="prevB"></span>',
		nextArrow: '<span class="nextB"></span>',
		responsive: [
			{
				breakpoint: 996,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});
	// слайдер отзывы END

	// Валдация формы START
	$(function(){
		$('.form').validate({
			messages: {
				phone: {
					required: "Поле обязательно к заполнению",
				},
				email: {
					required: "Поле обязательно к заполнению",
					email: "Необходим формат адреса email" 
				},
				select: {
					required: "Поле обязательно к заполнению",
				},
				other: {
					required: "Поле обязательно к заполнению",
				},
			}
		});
	});
	// Валдация формы END

	$("#phone").mask("+7(999) 999-99-99");


});