const themeBtn = document.getElementById('theme-btn');

themeBtn.onclick = function() {
  themeBtn.classList.toggle("active");
  document.body.classList.toggle("dark");
};