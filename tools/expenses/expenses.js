const incomeAmount = document.getElementById('income-amount');
const expensesAmount = document.getElementById('expenses-amount');
const savingsAmount = document.getElementById('savings-amount');
const itemSearchField = document.getElementById('item-search-field');
const allTab = document.getElementById('all-tab');
const incomeTab = document.getElementById('income-tab');
const expensesTab = document.getElementById('expenses-tab');
const itemContainer = document.getElementById('item-container');
const emptyTooltip = document.querySelector('.empty-tooltip');
const overlay = document.getElementById('overlay');
const addPopup = document.getElementById('add-popup');
const amountField = document.getElementById('amount-field');
const catagoryField = document.getElementById('catagory-field');
const selectType = document.getElementById('select-type');
const cancelBtn = document.getElementById('cancel-btn');
const okBtn = document.getElementById('ok-btn');
const btnBar = document.getElementById('btn-bar');
const plusBtn = document.getElementById('plus-btn');
const addItemBtn = document.getElementById('add-item-btn');
const delAllBtn = document.getElementById('del-all-btn');
const searchByString = document.getElementById('searchByString');
const searchByAmount = document.getElementById('searchByAmount');
const searchByDate = document.getElementById('searchByDate');
const delPopup = document.getElementById('del-popup');
const cancelDelBtn = document.getElementById('cancel-del-btn');
const confirmDelBtn = document.getElementById('confirm-del-btn');
const currentMonthBtn = document.getElementById('current-month-data');

plusBtn.onclick = () => {
  btnBar.classList.toggle('active');
  overlay.classList.toggle('active');
}

delAllBtn.onclick = () => {
  closeMenu(btnBar);
  openMenu(delPopup);
  confirmDelBtn.onclick = () => {
    expensesData = [];
    saveToLocal();
    renderItems(q, searchType);
    closeMenu(delPopup);
  }
}

addItemBtn.onclick = () => {
  closeMenu(btnBar);
  openMenu(addPopup);
}

cancelBtn.onclick = () => {
  closeMenu(addPopup);
}

cancelDelBtn.onclick = () => {
  closeMenu(delPopup);
}

currentMonthBtn.onclick = () => {
  let currentDate = new Date();
  let y = currentDate.getFullYear();
  let m = currentDate.getMonth() + 1;
  let dateString = `${y}${trailing(m)}`;
  renderItems(dateString, "date");
  closeMenu(btnBar);
}

overlay.onclick = () => {
  document.querySelectorAll('.active').forEach((e) => {
    e.classList.remove('active');
  });
}

let searchType = "string";

searchByString.onclick = () => {
  searchType = "string";
  itemSearchField.type = "search";
  itemSearchField.placeholder = "Search for item..";
  closeMenu(btnBar);
}

searchByAmount.onclick = () => {
  searchType = "amount";
  itemSearchField.type = "number";
  itemSearchField.placeholder = "Search Amount..";
  closeMenu(btnBar);
}

searchByDate.onclick = () => {
  searchType = "date";
  itemSearchField.type = "number";
  itemSearchField.placeholder = "Search YYYYMMDD";
  closeMenu(btnBar);
}

let tab = "all";
allTab.onclick = () => {
  tab = "all";
  tabSelector(allTab);
  renderItems(q, searchType);
}

incomeTab.onclick = () => {
  tab = "income";
  tabSelector(incomeTab);
  renderItems(q, searchType);
}

expensesTab.onclick = () => {
  tab = "expenses";
  tabSelector(expensesTab);
  renderItems(q, searchType);
}

function tabSelector(elm) {
  document.querySelectorAll('.tabs-container span').forEach((e) => {
    e.classList.remove('selected');
  });
  elm.classList.add('selected');
}

let expensesData = [];

let localExpencesString = localStorage.getItem("expensesLocalData");

expensesData = localExpencesString !== null ? JSON.parse(localExpencesString) : [];

let q = itemSearchField.value.toLowerCase();
itemSearchField.addEventListener("input", () => {
    q = itemSearchField.value.toLowerCase();
    renderItems(q, searchType);
  }
);

okBtn.onclick = () => {
  let inputAmount = Number(amountField.value.trim());
  let catagoryText = catagoryField.value.trim();
  let amountType = selectType.value;
  let currentDate = new Date();
  let y = currentDate.getFullYear();
  let m = trailing(currentDate.getMonth() + 1);
  let d = trailing(currentDate.getDate());
  let timeStamp = String(y) + m + d;
  if (Number.isInteger(inputAmount) && inputAmount > 0 && catagoryText !== "") {
    expensesData.push({"catagory" : catagoryText, "amount": inputAmount, "type": amountType, "timeStamp": timeStamp});
    saveToLocal();
    renderItems(q, searchType);
    closeMenu(addPopup);
    amountField.value = "";
    catagoryField.value = "";
    selectType.value = "expenses";
  } else {
    addPopup.classList.add('warning');
  }
}

function renderItems(qry, type) {
  
  let incomeValue = 0;
  let expensesValue = 0;
  let savingsValue = 0;
  itemContainer.querySelectorAll('.item').forEach((e) => {
    e.remove();
  });
  
  for (let i = 0; i < expensesData.length; i++) {
    let searchFrom = "";
    let searchFromAmount = "";
    if (type === "string") {
      searchFrom = expensesData[i].catagory.toLowerCase();
    } else if (type === "amount") {
      searchFromAmount = String(expensesData[i].amount);
    } else if (type === "date") {
      searchFrom = expensesData[i].timeStamp;
    }
    
    if ((qry === "" || searchFrom.includes(qry) || qry === searchFromAmount) && (tab === expensesData[i].type|| tab === "all")) {
      if (expensesData[i].type === "income") {
        incomeValue += Number(expensesData[i].amount);
      } else if (expensesData[i].type === 'expenses') {
        expensesValue += Number(expensesData[i].amount);
      } else if (expensesData[i].type === 'secret') {
        expensesValue += Number(expensesData[i].amount);
      }
      savingsValue = incomeValue - expensesValue;
      incomeAmount.textContent = incomeValue;
      expensesAmount.textContent = expensesValue;
      savingsAmount.textContent = savingsValue;
      let dotClass = expensesData[i].type;
      let timeString = expensesData[i].timeStamp;
      timeString = `${timeString[0]}${timeString[1]}${timeString[2]}${timeString[3]}:${timeString[4]}${timeString[5]}:${timeString[6]}${timeString[7]}`;
      const itemBox = document.createElement('div');
      const dot = document.createElement('span');
      const itemAmount = document.createElement('span');
      const itemCatagory = document.createElement('span');
      const itemMenuBtn = document.createElement('button');
      
      itemBox.classList.add('item');
      dot.classList.add('item-dot', dotClass);
      itemAmount.classList.add('item-value');
      itemCatagory.classList.add('item-text');
      itemMenuBtn.classList.add('item-menu', 'material-icons');
      
      itemAmount.textContent = expensesData[i].amount;
      itemCatagory.innerHTML = `${expensesData[i].catagory}<br>${timeString}`;
      itemMenuBtn.textContent = "more_vert";
      
      itemMenuBtn.onclick = () => {
        const itemMenu = document.createElement('div');
        const itemLabel = document.createElement('label');
        const itemEditBtn = document.createElement('button');
        const itemDelBtn = document.createElement('button');
        const itemMenuCloseBtn = document.createElement('button');
        
        itemLabel.textContent = `₹${expensesData[i].amount} - ${expensesData[i].catagory}`;
        itemEditBtn.textContent = 'Edit';
        itemDelBtn.textContent = 'Delete';
        itemEditBtn.classList.add('btns');
        itemDelBtn.classList.add('btns');
        itemMenu.classList.add('menu-popup');
        itemMenuCloseBtn.classList.add('btns');
        itemMenuCloseBtn.textContent = "Close";
        
        
        itemEditBtn.onclick = () => {
          itemMenu.remove();
          overlay.classList.remove('active');
          openMenu(addPopup);
          amountField.value = expensesData[i].amount;
          catagoryField.value = expensesData[i].catagory;
          selectType.value = expensesData[i].type;
          okBtn.textContent = 'Confirm';
          okBtn.onclick = () => {
            let inputAmount = Number(amountField.value.trim());
            let catagoryText = catagoryField.value.trim();
            if (Number.isInteger(inputAmount) && inputAmount > 0 && catagoryText !== "") {
              expensesData[i].amount = amountField.value;
              expensesData[i].catagory = catagoryField.value;
              expensesData[i].type = selectType.value;
              saveToLocal();
              renderItems(q, searchType);
              closeMenu(addPopup);
              amountField.value = "";
              catagoryField.value = "";
            } else {
              addPopup.classList.add('warning');
            }
          }
        }
        itemDelBtn.onclick = () => {
          itemMenu.remove();
          overlay.classList.remove('active');
          openMenu(delPopup);
          confirmDelBtn.onclick = () => {
            expensesData.splice(i, 1);
            saveToLocal();
            renderItems(q, searchType);
            closeMenu(delPopup);
          }
        }
        itemMenuCloseBtn.onclick = () => {
          itemMenu.remove();
          overlay.classList.remove('active');
        }
        itemMenu.append(itemLabel, itemEditBtn, itemDelBtn, itemMenuCloseBtn);
        toolPage.prepend(itemMenu);
        overlay.classList.add('active');
        overlay.onclick = () => {
          itemMenu.remove();
          overlay.classList.remove('active');
        }
      }
      
      itemBox.append(dot, itemAmount, itemCatagory, itemMenuBtn);
      itemContainer.prepend(itemBox);
    }
  }
  
  if (itemContainer.children.length < 2) {
    emptyTooltip.classList.add('shown');
  } else {
    emptyTooltip.classList.remove('shown');
  }
}

function openMenu(elem) {
  overlay.classList.add('active');
  elem.classList.add('active');
}

function closeMenu(elem) {
  overlay.classList.remove('active');
  elem.classList.remove('active');
}

function saveToLocal() {
  let jsnData = JSON.stringify(expensesData);
  localStorage.setItem("expensesLocalData", jsnData);
}

const trailing = n => n < 10 ? "0" + n : String(n);

renderItems(q, searchType);