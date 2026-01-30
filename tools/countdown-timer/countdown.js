const digitalClock = document.getElementById('clock');
const stopBtn = document.getElementById('stop-btn');
const restartBtn = document.getElementById('restart-btn');
const playBtn = document.getElementById('play-btn');
const magicCover = document.querySelector('.magic-cover');

let input = "";
let totalSeconds = 0;
let lastMemory = 0;
let timer = null;
let isRunning = false;

playBtn.onclick = timerFunction;

function timerFunction() {
  if (!isRunning && totalSeconds > 0) {
    const start = Date.now();
    const duration = totalSeconds * 1000;
    const end = start + duration;
    
    if (navigator.vibrate) navigator.vibrate(30);
    
    timer = setInterval(() => {
      const now = Date.now();
      const remaining = end - now;
      
      if (remaining > 0) {
        totalSeconds = Math.floor(remaining / 1000);
        digitalClock.innerText = formatting(totalSeconds);
        
        const progress = 1 - (remaining / duration);
        const angle = progress * 360;
        
        magicCover.style.backgroundImage =
          "conic-gradient(transparent 0deg, transparent " + angle + "deg, var(--color-bg) " + angle + "deg, var(--color-bg) 360deg)";
      } else {
        clearInterval(timer);
        timer = null;
        input = '';
        isRunning = false;
        
        totalSeconds = 0;
        digitalClock.innerText = "00:00:00";
        
        magicCover.style.backgroundImage =
          "conic-gradient(transparent 0deg, transparent 360deg, var(--color-bg) 360deg, var(--color-bg) 360deg)";
        
        playBtn.textContent = "play_arrow";
        toolPage.classList.remove('running');
        
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        alert('Time Over!');
      }
    }, 16);
    
    isRunning = true;
    playBtn.textContent = "pause";
    toolPage.classList.add('running');
  } else {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    playBtn.textContent = "play_arrow";
  }
}

restartBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
  isRunning = false;
  totalSeconds = lastMemory;
  input = secondsToInput(totalSeconds);
  digitalClock.innerText = formatting(totalSeconds);
  magicCover.style.backgroundImage =
    "conic-gradient(transparent 0deg, transparent 0deg, var(--color-bg) 0deg, var(--color-bg) 360deg)";
  timerFunction();
};

stopBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
  isRunning = false;
  totalSeconds = 0;
  input = "";
  playBtn.textContent = "play_arrow";
  toolPage.classList.remove('running');
  digitalClock.innerText = "00:00:00";
  magicCover.style.backgroundImage =
    "conic-gradient(transparent 0deg, transparent 0deg, var(--color-bg) 0deg, var(--color-bg) 360deg)";
};

function addTime(n) {
  totalSeconds += n;
  lastMemory = totalSeconds;
  input = secondsToInput(totalSeconds);
  digitalClock.innerText = formatting(totalSeconds);
}

function setTime(n) {
  totalSeconds = n;
  lastMemory = totalSeconds;
  input = secondsToInput(totalSeconds);
  digitalClock.innerText = formatting(totalSeconds);
}

function keypad(n) {
  if (input.length >= 6) return;
  input += n.toString();
  updateFromInput();
}

function clearBtn() {
  input = "";
  totalSeconds = 0;
  digitalClock.innerText = "00:00:00";
}

function backSpace() {
  input = input.slice(0, -1);
  updateFromInput();
}

function updateFromInput() {
  let str = input.padStart(6, "0");
  let h = parseInt(str.slice(0, 2));
  let m = parseInt(str.slice(2, 4));
  let s = parseInt(str.slice(4, 6));
  m = reduce(m);
  s = reduce(s);
  totalSeconds = h * 3600 + m * 60 + s;
  lastMemory = totalSeconds;
  digitalClock.innerText = formatting(totalSeconds);
}

function secondsToInput(sec) {
  let h = Math.floor(sec / 3600);
  let m = Math.floor((sec % 3600) / 60);
  let s = sec % 60;
  return trailing(h) + trailing(m) + trailing(s);
}

function formatting(n) {
  let s = n % 60;
  let m = Math.floor(n / 60) % 60;
  let h = Math.floor(n / 3600) % 60;
  return trailing(h) + ":" + trailing(m) + ":" + trailing(s);
}

function trailing(n) {
  return n < 10 ? "0" + n : n;
}

function reduce(n) {
  return n > 59 ? 59 : n;
}