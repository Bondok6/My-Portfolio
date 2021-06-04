'use strict';

const icons = document.querySelectorAll('.icons span');

const clearActive = function() {
	icons.forEach((icon) => {
		icon.classList.remove('active');
	});
};

icons.forEach((icon) => {
	icon.addEventListener('click', () => {
		clearActive();
		icon.classList.add('active');
	});
});
