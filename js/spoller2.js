const questions = document.querySelector('.questions');
let spollersArray2 = questions.querySelectorAll('[data-spollers]');

if (spollersArray2) {
	// get regular spollers
	const spollersRegular = Array.from(spollersArray2).filter(function (item, index, self) {
		return !item.dataset.spollers.split(',')[0];
	});

	// init regular spollers
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// get spollers with media params
	const spollersMedia = Array.from(spollersArray2).filter(function (item, index, self) {
		return item.dataset.spollers.split(',')[0];
	});

	// init spollers with media params
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach((item) => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(',');
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// get unic breakpoints
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// work with all breakpoints
		mediaQueries.forEach((breakpoint) => {
			const paramsArray = breakpoint.split(',');
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// obj with needed boolen
			const spollersArray2 = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			// event
			matchMedia.addListener(function () {
				initSpollers(spollersArray2, matchMedia);
			});
			initSpollers(spollersArray2, matchMedia);
		});
	}

	// init
	function initSpollers(spollersArray2, matchMedia = false) {
		spollersArray2.forEach((spollersBlock) => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener('click', setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener('click', setSpollerAction);
			}
		});
	}

	// work with contant
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach((spollerTitle) => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollerBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollerBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollerBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollerBody(spollerBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollerBody(spollerBlock) {
		const spollerActiveTitle = spollerBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}
