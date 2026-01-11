const searchField = document.getElementById("search-field");
document.getElementById('google-btn').onclick = function() {
  window.location.href = "https://www.google.com";
};

document.getElementById("search-btn").onclick = function() {
  search(searchQuery());
};

searchField.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    search(searchQuery());
  };
});

function searchQuery() {
  return searchField.value.trim();
};

function search(q) {
  if (q !== "") {
    let searchURL = "https://google.com/search?q=" + encodeURIComponent(q);
    window.location.href = searchURL;
  };
};