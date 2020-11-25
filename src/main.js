jQuery(function($) {

	$('#dark-mode').on('click', function (e) {
		$('body').toggleClass('dark');
	});

	$('.service__info .more-btn').on('click', function (e) {
		$('body').toggleClass('no-scroll');
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
		$('body').removeClass('no-scroll');
	});

	//resize window

	let minResize = false;
	let maxResize = false;

	let f_windowWidth = function (w) {
		if (w <= n && !minResize) {
			minResize = true;
			maxResize = false;
			console.log("Window width <= " + n);
			$('.service__text').removeClass('show');
			$('.more-btn img').removeClass('rotate');
			$('body').removeClass('no-scroll');
		}

		if (w >= n && !maxResize) {
			maxResize = true;
			minResize = false;
			console.log("Window width > " + n);
			$('.service__text').removeClass('show');
			$('.more-btn img').removeClass('rotate');
			$('body').removeClass('no-scroll');
		}
	};
		
	let n = 996, w = window.innerWidth;

	$(window).on("resize", function () {
		let w = window.innerWidth;
		f_windowWidth(w); 
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
				breakpoint: 520,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});
	// слайдер отзывы END

	// Валдация формы START
	$('.form').validate({
		messages: {
			phone: {
				required: "Поле обязательно к заполнению",
			},
			email: {
				required: "Поле обязательно к заполнению",
				email: "Необходим формат адреса email" 
			},
			company: {
				required: "Поле обязательно к заполнению",
			},
			name: {
				required: "Поле обязательно к заполнению",
			},
		},
	})


	// Валдация формы END

	$("#phone").mask("+7(999) 999-99-99");

	// отправка формы START
	
	$(".form").submit(function (e) {
		e.preventDefault();
		if($('.form')[0].checkValidity()) {
			var formData = new FormData($(this)[0]);
			var th = $(this);
			$.ajax({
				url: 'scripts/mail.php',
				type: "POST",
				data: formData,
				async: false,
				success: function (msg) {
					$('.overlay, .modal').fadeIn();
				},
				error: function (msg) {
					alert('Ошибка!');
				},
				cache: false,
				contentType: false,
				processData: false
			});
		}
		
	});

	// отправка формы END

	// Анимация блоков при скроле START

	$(window).scroll(function() {
		$('.services .title, .reviews .title, .reviews__wrap,.feedback').each(function () {
			let blockPos = $(this).offset().top;

			let topOfWindow = $(window).scrollTop();
			if (blockPos < topOfWindow + $(window).innerHeight()) {
				$(this).addClass("fade");
			}
		});
		$('.block-1, .block-3').each(function () {
			let blockPos = $(this).offset().top;

			let topOfWindow = $(window).scrollTop();
			if (blockPos < topOfWindow + $(window).innerHeight()) {
				$(this).addClass("fadeInRight")
			}
		});
		$('.block-2').each(function () {
			let blockPos = $(this).offset().top;

			let topOfWindow = $(window).scrollTop();
			if (blockPos < topOfWindow + $(window).innerHeight()) {
				$(this).addClass("fadeInLeft")
			}
		});
	});

	// Анимация блоков при скроле END

	// Переключатель над формой START

	$('#switch').on('click', function(){
		if($('#switch').is(':checked')){
			$('input[name="company"]').attr("placeholder", "Компания");
			$('input[name="tip"]').attr("value", "Рекламодатель");
		}else {
			$('input[name="company"]').attr("placeholder", "Ссылка на Twitch канал");
			$('input[name="tip"]').attr("value", "Стример");
		}
	});

// Переключатель над формой END

	$('.overlay, .close-btnn').on('click', function (e) {
		$('.overlay, .modal').fadeOut();
	});

});

