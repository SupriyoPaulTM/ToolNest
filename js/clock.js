const analogClock = document.getElementById("analog-clock");
const clockMinNum = Number(analogClock.dataset.range)/4;

const innerFrame = document.createElement("div");
const clockDot = document.createElement("div");
const clockHandS = document.createElement("div");
const clockLableOne = document.createElement("span");
const clockLableTwo = document.createElement("span");
const clockLableThree = document.createElement("span");
const clockLableFour = document.createElement("span");

innerFrame.classList.add("clock-inner-frame");
clockDot.classList.add("clock-dot");
clockHandS.classList.add("clock-hand-sec");
clockHandS.id = "clockHandSec";
clockLableOne.textContent = clockMinNum*4;
clockLableTwo.textContent = clockMinNum;
clockLableThree.textContent = clockMinNum*2;
clockLableFour.textContent = clockMinNum*3;


innerFrame.append(clockLableOne, clockLableTwo, clockLableThree, clockLableFour, clockDot, clockHandS);
analogClock.append(innerFrame);

for (let i = 0; i < 60; i++) {
  innerFrame.innerHTML += "<div class='dial-lines' style='transform: rotate("+ (i*6) +"deg)'></div>";
};