//HTML ELEMENTS CONSTANTS

const exitMenuBtn = document.querySelector('.fa-times');
const openMenuBtn = document.querySelector('.fa-bars');
const navbar = document.querySelector('.navbar');

//EVENT LISTENERS
openMenuBtn.parentElement.addEventListener('click', showSlideMenu);

exitMenuBtn.parentElement.addEventListener('click', hideSLideMenu);



//FUNCTIONS

//Adds a class list that translates the navbar into view
function showSlideMenu(){
  navbar.classList.add('navbar-show');
}

//Removes the class list that translates the navbar into view
function hideSLideMenu(){
  navbar.classList.remove('navbar-show');
}

