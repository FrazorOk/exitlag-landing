const swiper = new Swiper('.best-players-swiper', {
	slidesPerView: 1,
	spaceBetween: 63,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},

	mousewheel: {
		sensitivity: 1,
	},

	breakpoints: {
		1202: {
			slidesPerView: 3,
			spaceBetween: 35,
		},

		600: {
			slidesPerView: 2,
			spaceBetween: 63,
		},
	},

	// freeMode: true,
});

const swiper2 = new Swiper('.games-swiper', {
	slidesPerView: 'auto',

	speed: 1200,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},

	mousewheel: {
		sensitivity: 1,
	},

	spaceBetween: 40,

	loop: true,

	autoplay: {
		delay: 200,
		disableOnInteraction: false,
	},
});
