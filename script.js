//Access all the elements
//1.form
const form = document.getElementById('item-form');
//2.input field
const itemInput = document.getElementById('item-input');
//3.list
const itemList = document.getElementById('item-list');
//4.clear all button
const clrBtn = document.getElementById('clear');
//5.filter item
const filter = document.getElementById('filter');
//6.container
const container = document.querySelector('.container');

//Function to clear elements
function clearUI() {
  const filter = document.querySelector('#filter');
  filter.value = '';
  const items = document.querySelectorAll('li');
  if (items.length === 0) {
    clrBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clrBtn.style.display = 'block';
    filter.style.display = 'block';
  }
}

//Function to create icon
function newIcon(iconClass) {
  const i = document.createElement('i');
  i.className = iconClass;
  return i;
}
//Function to create button
function newBtn(iconClass, btnClass) {
  const btn = document.createElement('btn');
  btn.className = btnClass;
  //append icon element to button
  const icon = newIcon(iconClass);
  btn.appendChild(icon);
  return btn;
}
//Function to create new item list
function newListItem() {
  const newListItem = document.createElement('li');
  newListItem.appendChild(document.createTextNode(itemInput.value));
  //append icon and btn element to new list item
  const iconButtonElement = newBtn(
    'fa-solid fa-xmark',
    'remove-item btn-link text-red'
  );
  newListItem.appendChild(iconButtonElement);
  //console.log(itemList);
  //append new list item to the 'ul' list at the top
  itemList.appendChild(newListItem);

  //clear the input field
  itemInput.value = '';
  clearUI();
}

//Function to alert duplicate item

//Function for onSubmit event
function onSubmit(e) {
  e.preventDefault();
  const newItemValue = itemInput.value.toLowerCase();
  const btnClick = e.target.classList.contains('btn');

  if (newItemValue === '' && btnClick) {
    alert('Please enter value');
  } else if (newItemValue !== '' && btnClick) {
    newListItem();
  }
}

//Function to remove individual item
function onClick(e) {
  if (e.target.classList.contains('fa-solid')) {
    const i = e.target.parentElement.parentElement;
    i.remove();
  }
  clearUI();
}

//Function to clear all items from the list
function onBtnClick() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  clearUI();
}

//Function to filter items
function onFilter(e) {
  const li = document.querySelectorAll('li');
  const input = e.target.value.toLowerCase();
  // console.log(typeof input, input);

  // console.log(li);
  li.forEach((item) => {
    // console.log(item.innerText.includes('App'));
    if (item.innerText.toLowerCase().includes(input)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

//Add eventListener to elements
form.addEventListener('click', onSubmit);
filter.addEventListener('input', onFilter);
itemList.addEventListener('click', onClick);
clrBtn.addEventListener('click', onBtnClick);

//Function to clear UI on page load
clearUI();
//
