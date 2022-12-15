import { CountUp } from './libs/countUp.js';

let countName = document.querySelectorAll('#counter-value');

for(let i = 0; i < countName.length; i++){
  let endVal = countName[i].dataset.valueCount;
  countName[i].classList.add("animate-active");
  new CountUp(countName[i], endVal, { enableScrollSpy: true, scrollSpyOnce: true });
}