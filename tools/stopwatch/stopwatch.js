const playBtn = document.getElementById("play-btn");
const lapBtn = document.getElementById("lap-btn")
const resetBtn = document.getElementById("reset-btn");
const digitalClock = document.getElementById("digital-clock");
const lapInfoData = document.getElementById("lap-info-data");
const lapInfoTitle = document.getElementById("lap-info-title");

let isRunning = false;
playBtn.onclick = () => {
  lapBtn.classList.remove("active", "disabled");
  resetBtn.classList.remove("active", "disabled");
  lapBtn.classList.add("active");
  resetBtn.classList.add("active");
  if (isRunning) {
    pause();
    playBtn.textContent = "play_arrow";
    lapBtn.classList.add("disabled");
    isRunning = false;
  } else {
    start();
    playBtn.textContent = "pause";
    resetBtn.classList.add("disabled");
    isRunning = true;
  };
};

let count = 0;
let timer = null;

let lapsData = [];
lapBtn.onclick = () => {
  lapsData.push(count);
  renderLaps();
  lapInfoTitle.style.display = "flex";
};

function renderLaps() {
  document.querySelectorAll(".lap-info-item").forEach((e) => {
      e.remove();
  });
  for (let i = 0; i < lapsData.length; i++) {
    const lapInfoItem = document.createElement("div");
    const lapCount = document.createElement("span");
    const lapTime = document.createElement("span");
    const lapTotalTime = document.createElement("span");
    lapInfoItem.classList.add("lap-info-item");
    
    lapCount.textContent = deco(i+1);
    if (i !== 0) {
      lapTime.textContent = formatting(lapsData[i] - lapsData[i-1]);
    } else {
      lapTime.textContent = formatting(lapsData[i]);
    };
    lapTotalTime.textContent = formatting(lapsData[i]);
    
    lapInfoItem.append(lapCount, lapTime, lapTotalTime);
    lapInfoData.prepend(lapInfoItem);
  };
};

function start() {
  if (timer !== null) {
    return;
  };
  timer = setInterval(() => {
    digitalClock.textContent = formatting(count);
    clockHandSec.style.transform = "translate(-50%, -85%) rotate(" + (count*0.06) + "deg)";
    count++;
  }, 10);
};

function pause() {
  clearInterval(timer);
  timer = null;
};

function formatting(n) {
  let ms = n%100;
  let s = (Math.floor(n/100))%60;
  let m = (Math.floor(n/6000))%60;
  let time = deco(m) + ":" + deco(s) + ":" + deco(ms);
  return time;
};

function deco(n) {
  if (n<10) {
    return "0"+n;
  } else {
    return n;
  };
};

resetBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
  count = 0;
  lapsData = [];
  renderLaps();
  digitalClock.textContent = "00:00:00";
  clockHandSec.style.transform = "translate(-50%, -85%) rotate(0deg)";
  lapInfoTitle.style.display = "none";
  lapBtn.classList.remove("active", "disabled");
  resetBtn.classList.remove("active", "disabled");
};