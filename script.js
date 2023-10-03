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
//7.form button
const formBtn = form.querySelector('button');
let isEditMode = false;

//Function to clear elements

function resetUI() {
  const filter = document.querySelector('#filter');
  filter.value = '';
  itemInput.value = '';
  const items = document.querySelectorAll('li');
  if (items.length === 0) {
    clrBtn.style.display = 'none';
    filter.style.display = 'none';
  } else {
    clrBtn.style.display = 'block';
    filter.style.display = 'block';
  }

  // //rest form button
  formBtn.innerHTML = `<i class="fa-solid fa-plus"></i>  Add Item`;
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

//Function to display items on page load
function displayItems() {
  const getItems = getItemsFromStorage();
  getItems.forEach((item) => addItemToDOM(item));
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
  resetUI();
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

  if (isEditMode) {
    const removeItem = itemList.querySelector('.edit-mode');
    // remove from local storage
    removeItemFromStorage(removeItem.textContent);
    removeItem.classList.remove('edit-mode');
    //remove from dom
    removeItem.remove();
    //isEditMode = false;
  }
  addItemToDOM(newItemValue);
  addItemToStorage(newItemValue);
}

//Function to  remove item
function onClickItem(e) {
  if (e.target.classList.contains('fa-solid')) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.parentElement.classList.contains('items')) {
    setItemToEdit(e.target);
  }
  //resetUI();
}

//Function to edit an item
function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  console.log(formBtn.innerHTML);
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>  Update Item';
  formBtn.style.backgroundColor = '#008000';
  console.log(formBtn.innerHTML);
  itemInput.value = item.textContent;
}

//Function to remove individual item
function removeItem(item) {
  if (confirm('Are you sure?')) {
    // remove item from DOM
    item.remove();
    // remove item from storage
    removeItemFromStorage(item.textContent);
    resetUI();
  }
}

//Function to remove Item from storage
function removeItemFromStorage(item) {
  let itemFromStorage = getItemsFromStorage();

  itemFromStorage = itemFromStorage.filter((i) => i !== item);

  //reset to local storage
  localStorage.setItem('items', JSON.stringify(itemFromStorage));

  //remove local storage 'items' if it's empty

  if (itemFromStorage.length === 0) {
    localStorage.clear();
  }
}

//Function to remove all items from storage
function removeAllItemsFromStorage() {
  localStorage.removeItem('items');
}

//Function to clear all items from the list
function clearAllItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  removeAllItemsFromStorage();
  resetUI();
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
  itemList.addEventListener('click', onClickItem);
  clrBtn.addEventListener('click', clearAllItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  //Function to clear UI on page load
  resetUI();
  //
}

init();
