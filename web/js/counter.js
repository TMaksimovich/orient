import { CountUp } from './libs/countUp.js';

let countName = document.querySelectorAll('#counter-value');

for(let i = 0; i < countName.length; i++){
  let endVal = countName[i].dataset.valueCount;
  new CountUp(countName[i], endVal, { enableScrollSpy: true, scrollSpyOnce: true, scrollSpyDelay: 2 });
}

document.addEventListener('DOMContentLoaded', () => {
	const scrollItems = document.querySelectorAll('.counter-column');

	const scrollAnimation = () => {
		let windowCenter = (window.innerHeight / 2) + window.scrollY;
		//console.log(windowCenter)
		scrollItems.forEach(el => {
			let scrollOffset = el.offsetTop + (el.offsetHeight / 2);
			//console.log(scrollOffset)
			if (windowCenter >= scrollOffset - 300) {
				el.classList.add('animate-active');
			} 
		});
	};

	scrollAnimation();
	window.addEventListener('scroll', () => {
		scrollAnimation();
	});
});