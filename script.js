//Access all the elements
//1.form
const form = document.getElementById('item-form');
//2.input field
const itemInput = document.getElementById('item-input');
//3.list
const itemList = document.getElementById('item-list');
//4.removeIcon
const items = document.querySelectorAll('li');

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
  //append new list item to the 'ul' list at the top
  itemList.append(newListItem);

  //append new item to the top of the list
  //   const siblingItem = document.querySelector('li:first-child');
  //   itemList.insertBefore(newListItem, siblingItem);

  //clear the input field
  itemInput.value = '';
}
//Function for onSubmit event
function onSubmit(e) {
  e.preventDefault();

  const newItemValue = itemInput.value;
  //validate the input field
  if (newItemValue === '') {
    alert('Please enter an item.');
    return;
  }
  //invoke new item list function
  newListItem();
}

//Function to remove individual item
function onClick(e) {
  //console.log(e.target);
  //console.log(e.currentTarget);
  if (e.target.classList.contains('fa-solid')) {
    const i = e.target.parentElement.parentElement;
    console.log(i);
    i.remove();
  }
  return;
}

//Add eventListener in form element
form.addEventListener('click', onSubmit);
itemList.addEventListener('click', onClick);


//
