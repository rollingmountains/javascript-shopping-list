//Access all the elements
//1.form
const form = document.getElementById('item-form');
//2.input field
const itemInput = document.getElementById('item-input');
//3.list
const itemList = document.getElementById('item-list');
//4.clear all button
const clrBtn = document.getElementById('clear');

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
  btn.append(icon);
  return btn;
}
//Function to create new item list
function newListItem() {
  const newListItem = document.createElement('li');
  newListItem.append(document.createTextNode(itemInput.value));
  //append icon and btn element to new list item
  const iconButtonElement = newBtn(
    'fa-solid fa-xmark',
    'remove-item btn-link text-red'
  );
  newListItem.append(iconButtonElement);
  console.log(itemList);
  //append new list item to the 'ul' list at the top
  itemList.append(newListItem);

  //clear the input field
  itemInput.value = '';
}
//Function for onSubmit event
function onSubmit(e) {
  e.preventDefault();
  const newItemValue = itemInput.value;
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
    console.log(itemList);
  }
  return;
}

//Function to clear all items from the list
function onBtnClick() {
  // const list = document.querySelectorAll('li');
  // list.forEach((item) => {
  //   item.remove();
  // });
  // itemList.innerHTML = '';
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

//Add eventListener to elements
form.addEventListener('click', onSubmit);
itemList.addEventListener('click', onClick);
clrBtn.addEventListener('click', onBtnClick);

//
