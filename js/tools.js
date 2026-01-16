const toolPage = document.getElementById("tool-page");
const toolBar = document.createElement("div");
const toolTitle = document.createElement("div");
const backBtn = document.createElement("div");

toolBar.classList.add("tool-bar");
toolTitle.textContent = toolPage.dataset.page;
backBtn.textContent = "<";
backBtn.setAttribute("onclick", "history.back()");

toolBar.append(backBtn, toolTitle);
toolPage.prepend(toolBar);