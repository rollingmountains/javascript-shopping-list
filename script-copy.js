//Access elements in global scope
const form = document.getElementById('item-form');
const inputItem = document.querySelector('#item-input');
const listItem = document.querySelector('#item-list');

//function to create a new icon
function newIcon(iconClass) {
  const newIcon = document.createElement('i');
  newIcon.className = iconClass;
  return newIcon;
}
//function to create a new button
function newButton(iconClass, btnClass) {
  const newBtn = document.createElement('btn');
  newBtn.className = btnClass;
  //append newIcon to button
  const i = newIcon(iconClass);
  newBtn.append(i);
  return newBtn;
}
//function to create new list
function onSubmit(e) {
  e.preventDefault();
  const newItem = inputItem.value;

  if (newItem === '') {
    alert('Please enter value');
    return;
  }

  const newLi = document.createElement('li');

  const newLiText = document.createTextNode(newItem);
  //append value to li element
  newLi.appendChild(newLiText);
  console.log(newLi);

  //invoke newBtn function to get icon and button element
  const newBtn = newButton(
    'fa-solid fa-xmark',
    'remove-item btn-link text-red'
  );
  //console.log(newBtn);
  //append icon and button element to the list
  newLi.append(newBtn);
  //append new list to the ul
  listItem.append(newLi);
  //append ul to the form
  //form.append(ul);
  //append formItem to body
  //document.body.append(formItem);
}

//add event listener in enter item element
//itemInput.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);
