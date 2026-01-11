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