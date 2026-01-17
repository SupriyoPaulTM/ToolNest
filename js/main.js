const themeBtn = document.getElementById('theme-btn');
let themeData = "dark";
let localThemeString = localStorage.getItem("userTheme");
if (localThemeString !== null) {
  themeData = JSON.parse(localThemeString);
};

if (themeData === "light") {
  themeBtn.classList.remove("active");
  document.body.classList.remove("dark");
};

themeBtn.onclick = function() {
  if (themeData === "dark") {
    themeData = "light";
    saveThemeData();
  } else {
    themeData = "dark";
    saveThemeData();
  };
  themeBtn.classList.toggle("active");
  document.body.classList.toggle("dark");
};


function saveThemeData() {
  let jsonData = JSON.stringify(themeData);
  localStorage.setItem("userTheme", jsonData);
};

const mainContainer = document.getElementById('main');
const mesh = document.createElement('div');
const circleOne = document.createElement('div');
const circleTwo = document.createElement('div');
mesh.classList.add("mesh")
circleOne.classList.add("circle", "one");
circleTwo.classList.add("circle", "two");
mainContainer.append(mesh, circleOne, circleTwo);



window.addEventListener("pageshow", () => {
  const saved = localStorage.getItem("userTheme");
  const theme = saved ? JSON.parse(saved) : "dark";

  document.body.classList.toggle("dark", theme === "dark");

  const themeBtn = document.getElementById("theme-btn");
  if (themeBtn) {
    themeBtn.classList.toggle("active", theme === "dark");
  }
});