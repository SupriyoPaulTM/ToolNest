const notesContainer = document.getElementById('notes-container');
const plusBtn = document.getElementById('plus-btn');
const overlay = document.getElementById('overlay');
const editBox = document.getElementById('edit-box');
const menuBox = document.getElementById('menu-box');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const titleField = document.getElementById('title-field');
const colorPicker = document.getElementById('color-picker');
const contentField = document.getElementById('content-field');
const randomBtn = document.getElementById('random-btn');
const viewBox = document.getElementById('view-box');

let notesData = [];
let stringifyNotes = localStorage.getItem("localNotesData");
if (stringifyNotes !== null) {
  notesData = JSON.parse(stringifyNotes);
}

let isEditing = true;
let editIndex = 0;
plusBtn.onclick = () => {
  isEditing = false;
  openMenu(editBox);
}

confirmBtn.onclick = () => {
  let titleValue = titleField.value.trim();
  let colorValue = colorPicker.value;
  let contentValue = contentField.value;
  if (isEditing) {
    if (titleValue !== "" && contentValue !== "") {
      notesData[editIndex].title = titleValue;
      notesData[editIndex].content = contentValue;
      notesData[editIndex].color = colorValue;
      saveToLocal();
      closeMenu(editBox);
      renderNotes();
      titleField.value = "";
      contentField.value = "";
      colorPicker.value = "#000000";
      confirmBtn.textContent = "Add";
    } else {
      editBox.classList.add('warning');
    }
  } else {
    if (titleValue !== "" && contentValue !== "") {
      notesData.push({"title": titleValue, "content": contentValue, "color": colorValue});
      saveToLocal();
      closeMenu(editBox);
      renderNotes();
      titleField.value = "";
      contentField.value = "";
      colorPicker.value = "#000000";
    } else {
      editBox.classList.add('warning');
    }
  }
}

titleField.addEventListener('input', () => {
  editBox.classList.remove('warning');
});

function renderNotes() {
  
  notesContainer.querySelectorAll('.note-item').forEach((e) => {
    e.remove();
  });
  
  for (let i = 0; i < notesData.length; i++) {
    const item = document.createElement('div');
    const title = document.createElement('div');
    const content = document.createElement('div');
    
    item.classList.add('note-item');
    title.classList.add('note-title');
    content.classList.add('note-content');
    
    item.style.border = `0.8px solid ${notesData[i].color}`;
    title.textContent = notesData[i].title;
    content.textContent = shortened(notesData[i].content);
    item.onclick = () => {
      openView(i);
    }
    
    item.append(title, content);
    notesContainer.prepend(item);
  }
  
  if (notesContainer.children.length < 2) {
    notesContainer.classList.add('empty');
  } else {
    notesContainer.classList.remove('empty');
  }
}

cancelBtn.onclick = () => {
  if (isEditing) {
    titleField.value = "";
    contentField.value = "";
    colorPicker.value = "#000000";
    editBox.style.border = "var(--glass-border)";
    confirmBtn.textContent = "Add";
    closeMenu(editBox);
  } else {
    closeMenu(editBox);
  }
  editBox.classList.remove('warning');
}

overlay.onclick = () => {
  overlay.classList.remove('active');
  toolPage.querySelectorAll('.active').forEach((e) => {
    e.classList.remove('active');
  });
}

randomBtn.onclick = () => {
  let hexResult = "#";
  let hexStr = "0123456789abcdef";
  for (let i = 0; i < 6; i++) {
    let rng = Math.floor(Math.random()*16);
    hexResult += hexStr[rng];
  }
  colorPicker.value = hexResult;
}

function openView(n) {
  openMenu(viewBox);
  viewBox.querySelector('.view-title').textContent = notesData[n].title;
  viewBox.querySelector('.view-content').textContent = notesData[n].content;
  viewBox.querySelector('.view-content').style.border = `0.8px solid ${notesData[n].color}`;
  viewBox.querySelector('.delete-btn').onclick = () => {
    closeMenu(viewBox);
    notesContainer.children[notesContainer.children.length - 2 - n].classList.add('delete');
    setTimeout(() => {
      notesData.splice(n, 1);
      saveToLocal();
      renderNotes();
    }, 600);
  }
  viewBox.querySelector('.edit-btn').onclick = () => {
    closeMenu(viewBox);
    openEdit(n);
  }
  viewBox.querySelector('.close-btn').onclick = () => {
    closeMenu(viewBox);
  }
}

function openEdit(n) {
  isEditing = true;
  editIndex = n;
  openMenu(editBox);
  titleField.value = notesData[n].title;
  contentField.value = notesData[n].content;
  colorPicker.value = notesData[n].color;
  editBox.style.border = `0.8px solid ${notesData[n].color}`;
  confirmBtn.textContent = "Confirm";
}

function shortened(txt) {
  let shortenedTxt = "";
  let maxLetter = 70;
  if (txt.length > maxLetter) {
    for (let i = 0; i < maxLetter; i++) {
      shortenedTxt += txt[i];
    }
    shortenedTxt += "...more";
    return shortenedTxt;
  } else {
    return txt;
  }
}

function openMenu(e) {
  e.classList.add('active');
  overlay.classList.add('active');
}

function closeMenu(e) {
  e.classList.remove('active');
  overlay.classList.remove('active');
}

function saveToLocal() {
  let jsonData = JSON.stringify(notesData);
  localStorage.setItem("localNotesData", jsonData);
}

renderNotes();