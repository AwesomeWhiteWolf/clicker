let TIMEOUT = 5000;

let clicks = 0;
let profit = 1;
let rundNum = 0;
let doubleFlag = false;


const display = document.querySelector('#display');
const profitText = document.querySelector('#prof');
const button = document.querySelector('#button');
const double = document.querySelector('#double');
const upgrade = document.querySelector('#upgrade');
const lucky = document.querySelector('#lucky');
const counter = document.querySelector('#counter');

button.onclick = start;

function start() {
  button.onclick = () => counter.textContent = clicks += profit;
  double.onclick = () => doubleClick();
  upgrade.onclick = () => upgradeClick();
  lucky.onclick = () => luckyClick();
  profitText.textContent = profit;
}

function formatTime(ms) {
  return Number.parseFloat(ms / 1000).toFixed(2);
}

function upgradeClick() {
  profit += 1;
  counter.textContent = clicks -= 50;
  profitText.textContent = profit;
}

function luckyClick() {
  rundNum = Math.floor(1 + (Math.random() * 3));
  counter.textContent = clicks -= 100;
  switch (rundNum) {
    case 1:
      profit += 10;
      profitText.textContent = profit;
      break;
    case 2:
      counter.textContent = clicks -= 50;
      break;
    case 3:
      counter.textContent = clicks += 40;
      TIMEOUT += 1000;
      doubleClick();
  }  
}

function doubleClick() {
  if (doubleFlag == false){
    profit *= 2;
    counter.textContent = clicks -= 40;

    display.textContent = formatTime(TIMEOUT);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const delta = Date.now() - startTime;
      display.textContent = formatTime(TIMEOUT - delta);
    }, 100);

    const timeout = setTimeout(() => {
      display.textContent = '';
      clearInterval(interval);
      clearTimeout(timeout);
      doubleFlag = false;
      profit /= 2;
      //double.onclick = start;
    }, TIMEOUT);
  }

  doubleFlag = true;
}
