const tabs = document.querySelectorAll('.tabs-container span');
const overlay = document.getElementById('overlay');
const addPopup = document.getElementById('add-popup');
const plusBtn = document.getElementById('plus-btn');
const cancelBtn = document.getElementById('cancel-btn');
const okBtn = document.getElementById('ok-btn');
const inputTaskField = document.getElementById('input-task-field');
const taskSearchField = document.getElementById('task-search-field');
const taskContainer = document.getElementById('tasks-container');
const emptyTooltip = document.querySelector('.empty-tooltip');

function popupToggle() {
  overlay.classList.toggle('active');
  addPopup.classList.toggle('active');
};

plusBtn.onclick = popupToggle;

cancelBtn.onclick = () => {
    popupToggle();
    inputTaskField.classList.remove('warning');
};

inputTaskField.addEventListener('input', () => {
    inputTaskField.classList.remove('warning');
});

let toDoList = [];
let localToDoString = localStorage.getItem('toDoListData');
if (localToDoString !== null) {
  toDoList = JSON.parse(localToDoString);
};

okBtn.onclick = addTask;

inputTaskField.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {
    addTask();
  };
});

function addTask() {
  let userInput = inputTaskField.value.trim();
  if (userInput !== "") {
    toDoList.push({"task": userInput, "priority": 1});
    inputTaskField.value = "";
    saveToLocal();
    render(query);
    popupToggle();
  } else {
    inputTaskField.classList.add('warning');
  };
};

let query = taskSearchField.value.toLowerCase();
taskSearchField.addEventListener("input", () => {
    query = taskSearchField.value.toLowerCase();
    render(query);
});

let showListOf = 4;

function tabSelector(elem) {
  tabs.forEach((tab) => {
    tab.classList.remove('active');
  });
  elem.classList.add('active');
}

document.getElementById('all-tab').onclick = function() {
  showListOf = 4;
  render(query);
  tabSelector(this);
};

document.getElementById('high-tab').onclick = function() {
  showListOf = 3;
  render(query);
  tabSelector(this);
};

document.getElementById('mid-tab').onclick = function() {
  showListOf = 2;
  render(query);
  tabSelector(this);
};

document.getElementById('low-tab').onclick = function() {
  showListOf = 1;
  render(query);
  tabSelector(this);
};

function render(query) {
  document.querySelectorAll('.task-item').forEach((e) => {
      e.remove();
  });
  for (let i = 0; i < toDoList.length; i++) {
    if ((toDoList[i].task.toLowerCase().includes(query) || query === "") && (toDoList[i].priority === showListOf || showListOf === 4)) {
      const taskItem = document.createElement('div');
      const priorityDot = document.createElement('span');
      const taskText = document.createElement('span');
      const taskMenu = document.createElement('span');
      const editBox = document.createElement('div');
      const editInput = document.createElement('input');
      const editDone = document.createElement('button');
      const editNo = document.createElement('button');
      
      taskItem.classList.add('task-item');
      priorityDot.classList.add('priority-dot');
      taskText.classList.add('task-text');
      taskMenu.classList.add('task-menu', 'material-icons');
      taskMenu.textContent = 'more_vert';
      
      editBox.classList.add('edit-box');
      editDone.classList.add('material-icons');
      editNo.classList.add('material-icons');
      editInput.value = toDoList[i].task;
      editDone.textContent = "check";
      editNo.textContent = "close";
      
      taskText.textContent = toDoList[i].task;
      taskItem.classList.add(givePriority(toDoList[i].priority));
      
      editDone.onclick = () => {
        toDoList[i].task = editInput.value.trim();
        saveToLocal();
        render(query);
      };
      
      editNo.onclick = () => {
        render(query);
      };
      
      taskMenu.onclick = () => {
        overlay.classList.add('active');
          const menuPopup = document.createElement('div');
          const taskName = document.createElement('label');
          const highBtn = document.createElement('button');
          const midBtn = document.createElement('button');
          const lowBtn = document.createElement('button');
          const doneBtn = document.createElement('button');
          const editBtn = document.createElement('button');
          const delBtn = document.createElement('button');
          const cancelBtnMenu = document.createElement('button');
          
          menuPopup.classList.add('menu-popup');
          taskName.textContent = toDoList[i].task;
          highBtn.textContent = "Set as High";
          midBtn.textContent = "Set as Medium";
          lowBtn.textContent = "Set as Low";
          doneBtn.textContent = "Set as Done";
          editBtn.textContent = "Edit";
          delBtn.textContent = "Delete";
          cancelBtnMenu.textContent = "Cancel";
          
          highBtn.onclick = () => {
            toDoList[i].priority = 3;
            menuClose();
            saveToLocal();
            render(query);
          };
          
          midBtn.onclick = () => {
            toDoList[i].priority = 2;
            menuClose();
            saveToLocal();
            render(query);
          };
          
          lowBtn.onclick = () => {
            toDoList[i].priority = 1;
            menuClose();
            saveToLocal();
            render(query);
          };
          
          doneBtn.onclick = () => {
            toDoList[i].priority = 0;
            menuClose();
            saveToLocal();
            render(query);
          };
          
          editBtn.onclick = () => {
            taskText.replaceWith(editBox);
            taskMenu.style.display = 'none';
            menuClose();
          };
          
          delBtn.onclick = () => {
            if (confirm('Are You Sure?')) {
              menuClose();
              taskItem.classList.add('delete');
              setTimeout( () => {
                toDoList.splice(i, 1);
                saveToLocal();
                render(query);
              } , 600);
            };
          };
          
          cancelBtnMenu.onclick = menuClose;
          
          editBox.append(editInput, editDone, editNo);
          
          menuPopup.append(taskName, highBtn, midBtn, lowBtn, doneBtn, editBtn, delBtn, cancelBtnMenu);
          toolPage.append(menuPopup);
          function menuClose() {
            menuPopup.remove();
            overlay.classList.remove('active');
          };
      };
      
      taskItem.append(priorityDot, taskText, taskMenu);
      taskContainer.append(taskItem);
    };
  };
  if (taskContainer.children.length <= 1) {
    emptyTooltip.classList.add('active');
  } else {
    emptyTooltip.classList.remove('active');
  };
};

function givePriority(n) {
  if (n===3) {
    return "high";
  } else if (n===2) {
    return "medium";
  } else if (n===1) {
    return "low";
  } else {
    return "done";
  };
};

function saveToLocal() {
  let jsonData = JSON.stringify(toDoList);
  localStorage.setItem('toDoListData', jsonData);
};

render(query);