let checkBoxStatus = document.querySelector('.switch-input'),
	checkBoxInput = document.querySelector('.switch-slider');
let ms = document.querySelector('.scrinshot__mss'),
	loss = document.querySelector('.scrinshot__loss');

if (checkBoxInput) {
	checkBoxInput.addEventListener('click', () => {
		console.log(checkBoxStatus);
		if (!checkBoxStatus.checked) {
			ms.innerHTML = 'MS 18';
			loss.innerHTML = 'LOSS 0%';
		} else {
			ms.innerHTML = 'MS 153';
			loss.innerHTML = 'LOSS 12%';
		}
	});
}
