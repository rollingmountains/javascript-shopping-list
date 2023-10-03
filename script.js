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

//Function to display items on page load
function displayItems() {
  const getItems = getItemsFromStorage();
  console.log(typeof getItems);
  // getItems.forEach((item)=> addItemToDOM(item))
}

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

//Function to create new item list
function addItemToDOM(item) {
  const newListItem = document.createElement('li');
  newListItem.appendChild(document.createTextNode(item));
  //append icon and btn element to new list item
  const iconButtonElement = newBtn(
    'fa-solid fa-xmark',
    'remove-item btn-link text-red'
  );
  newListItem.appendChild(iconButtonElement);
  //append new list item to the 'ul' list at the top
  itemList.appendChild(newListItem);

  //clear the input field
  itemInput.value = '';
  clearUI();
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

//Function store item in local storage
function addItemToStorage(item) {
  const itemInLocalStorage = getItemsFromStorage();
  itemInLocalStorage.push(item);

  //Store the new item in the storage
  localStorage.setItem('items', JSON.stringify(itemInLocalStorage));
}

//Function to get items from storage
function getItemsFromStorage() {
  let itemInLocalStorage;

  if (localStorage.getItem('items') === null) {
    itemInLocalStorage = [];
  } else {
    //Parse existing items form storage and add to array
    itemInLocalStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemInLocalStorage;
}

//Function for onSubmit event
function onAddItemSubmit(e) {
  e.preventDefault();
  const newItemValue = itemInput.value;

  if (newItemValue === '') {
    alert('Please enter value');
    return;
  }
  addItemToDOM(newItemValue);
  addItemToStorage(newItemValue);
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
  li.forEach((item) => {
    if (item.innerText.toLowerCase().includes(input)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

//Function to initialise app
function init() {
  //Add eventListener to elements
  form.addEventListener('submit', onAddItemSubmit);
  filter.addEventListener('input', onFilter);
  itemList.addEventListener('click', onClick);
  clrBtn.addEventListener('click', onBtnClick);
  document.addEventListener('DOMContentLoaded', displayItems());

  //Function to clear UI on page load
  clearUI();
  //
}

init();
