let TIMEOUT = Number(localStorage.getItem("timeout"));

let clicks = Number(localStorage.getItem("clicks"));
let profit = Number(localStorage.getItem("profit"));
let rundNum = 0;
let doubleFlag = false;


const reset = document.querySelector('#reset');
const luckyText = document.querySelector('#luckyText');
const display = document.querySelector('#display');
const profitText = document.querySelector('#prof');
const button = document.querySelector('#button');
const counter = document.querySelector('#counter');
const double = document.querySelector('#double');
const upgrade = document.querySelector('#upgrade');
const lucky = document.querySelector('#lucky');
const auto = document.querySelector('#auto');
const miniU = document.querySelector('#miniU');
const miniU100 = document.querySelector('#miniU100');
const miniL = document.querySelector('#miniL');
const miniL100 = document.querySelector('#miniL100');
let costD = document.querySelector('.d').textContent.slice(1);
let costU = document.querySelector('.u').textContent.slice(1);
let costL = document.querySelector('.l').textContent.slice(1);



start();

function start() {
  button.onclick = () => click();
  double.onclick = () => doubleClick();
  upgrade.onclick = () => upgradeClick();
  lucky.onclick = () => luckyClick();
  auto.onclick = () => autoClick();
  reset.onclick = () => resetAll();
  miniU.onclick = () => U();
  miniU100.onclick = () => U100();
  miniL.onclick = () => L();
  miniL100.onclick = () => L100();
  profitText.textContent = "Power: " + profit;
  display.textContent = "Time: " + localStorage.getItem("timeout");
  formatClicks();
}

function U() {
  for (let i = 0; i < 5; i++) {
    upgradeClick();
  }
}
function U100() {
  for (let i = 0; i < 100; i++) {
    upgradeClick();
  }
}
function L() {
  for (let i = 0; i < 5; i++) {
    luckyClick();
  }
}
function L100() {
  for (let i = 0; i < 100; i++) {
    luckyClick();
  }
}

function formatTime(ms) {
  return Number.parseFloat(ms / 1000).toFixed(2);
}

function click() {
  clicks += profit;
  formatClicks();
}

function doubleClick() {
  if (clicks >= costD) {
    if (doubleFlag == false){
      profit *= 2;
      clicks -= costD;
      formatClicks();
      saveProfit();

      display.textContent = "Time: " + TIMEOUT;
      const startTime = Date.now();
      const interval = setInterval(() => {
        const delta = Date.now() - startTime;
        display.textContent = "Time: " + formatTime(TIMEOUT - delta);
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        clearTimeout(timeout);
        display.textContent = "Time: " + TIMEOUT;
        doubleFlag = false;
        profit /= 2;
        saveProfit();
      }, TIMEOUT);
    }

    doubleFlag = true;
  }
  else {
    alert("Sorry, You have not ehough clicks. Need at least 40");
  }
}

function upgradeClick() {
  if (clicks >= costU) {
    profit += 1;
    profitText.textContent = "Power: " + profit;
    clicks -= costU;
    formatClicks();
    saveProfit();
  }
  else {
    alert("Sorry, You have not ehough clicks. Need at least 50");
  }
}

function luckyClick() {
  if (clicks >= costL) {
    rundNum = Math.floor(1 + (Math.random() * 5));
    switch (rundNum) {
      case 1:
        profit += 5;
        profitText.textContent = "Power: " + profit;
        luckyText.textContent = "Power+5";
        break;
      case 2:
        clicks -= 1500;
        formatClicks();
        luckyText.textContent = "Clicks-1500";
        break;
      case 3:
        TIMEOUT += 200;
        saveTimeout();
        display.textContent = "Time: " + TIMEOUT;
        luckyText.textContent = "Time+100";
        break;
      case 4:
        TIMEOUT -= 100;
        saveTimeout();
        display.textContent = "Time: " + TIMEOUT;
        luckyText.textContent = "Time-200";
        break;
      case 5:
        clicks += 1000;
        luckyText.textContent = "Clicks+1000";
        break;
    } 
    clicks -= costL; 
    formatClicks();
  }
  else {
    alert("Sorry, You have not ehough clicks. Need at least 100");
  }
}

function autoClick() {
  if (clicks >= 10000000) {
    const intervalId = setInterval(function() {
      click();
      if (clicks >= costU * 100) 
        U100();
      else if (clicks >= costU) {
        upgradeClick();
      }
      if (clicks >= costD)
        doubleClick();
      if (clicks >= costL)
        luckyClick();
    }, 250)
    clicks -= 10000000;
  }
}

function formatClicks() {
  if (clicks >= 1000000000) {
    counter.textContent = Math.round(clicks/1000000000) + "b " + Math.round((clicks % 1000000000)/1000000) + "m " + Math.round((clicks % 1000000)/1000) + "k";
  }
  else if (clicks >= 1000000) {
    counter.textContent = Math.round(clicks/1000000) + "m " + Math.round((clicks % 1000000)/1000) + "k";
  }
  else if (clicks >= 1000) {
    counter.textContent = Math.round((clicks/1000)) + "k";
  }
  else {
    counter.textContent = clicks;
  }
  localStorage.setItem("clicks", clicks);
}

function saveTimeout() {
  localStorage.setItem("timeout", TIMEOUT);
}
function saveProfit() {
  localStorage.setItem("profit", profit);
}

function resetAll() {
  TIMEOUT = 3000;
  saveTimeout();
  display.textContent = "Time: " + 3000;
  profit = 1;
  saveProfit();
  profitText.textContent = "Power: " + 1;
  clicks = 0;
  formatClicks();
  const costD = document.querySelector('.d').textContent.slice(1);
  const costU = document.querySelector('.u').textContent.slice(1);
  const costL = document.querySelector('.l').textContent.slice(1);
}
