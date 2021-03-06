// IMPORTS
import {http} from './http.js';

//HTML ELEMENTS CONSTANTS

const exitMenuBtn = document.querySelector('.fa-times');
const openMenuBtn = document.querySelector('.fa-bars');
const navbar = document.querySelector('.navbar');
const blogsList = document.getElementById('article_list');
const blogHeading = document.querySelector('.blog-heading');
const emailTextField = document.getElementById('email_address');

//EVENT LISTENERS

openMenuBtn.parentElement.addEventListener('click', showSlideMenu);

exitMenuBtn.parentElement.addEventListener('click', hideSLideMenu);

document.addEventListener('DOMContentLoaded', mainEvents);

//These Try-Catches are to catch the errors as come of the constants may be null in some situations
try{
  blogsList.addEventListener('click', e => {
    getClickedPostId(e);
  });

  blogsList.addEventListener('touchstart', e => {
    getClickedPostId(e);
  });
}catch(e){
  console.log(e)
}

try{
  emailTextField.addEventListener('blur', validateEmail);
}catch(e){
  console.log(e);
}


//FUNCTIONS

//Adds a class list that translates the navbar into view
function showSlideMenu(){
  navbar.classList.add('navbar-show');
}

//Removes the class list that translates the navbar into view
function hideSLideMenu(){
  navbar.classList.remove('navbar-show');
}

//Call DOMcontent loaded functions
function mainEvents(){
  getBlogList();

  getBlog();
}

//FETCH Data from API
function fetchData(){
  return http.get('https://run.mocky.io/v3/3143931d-273f-4f0f-bce8-1b3dde6433df');
}

//Get blogs list items from api data
async function getBlogList(){
  if(blogsList !== null){
    const blogPostData = await fetchData()
                        .catch(err => console.log(err));
    
    addBlogListITems(blogPostData.blog_posts);
    console.log(blogPostData.blog_posts[1].Title);
  }
}

//Add blog list item to blogs.html page
function addBlogListITems(posts){
  let blogList = '';

  posts.forEach(post => {
    blogList += `
      <li class="article-list-item" id="${post.id}"><a href="blog_structure.html" class="list-item-link">${post.Title}</a></li>
    `;
  });
  blogsList.innerHTML = '';
  blogsList.innerHTML = blogList;
}

//Get Post Id from clicked link
function getClickedPostId(e){
  if(e.target.classList.contains('list-item-link')){
    let id = e.target.parentElement.getAttribute('id');
    sessionStorage.setItem('postId', id);
    // console.log(parseInt(sessionStorage.getItem('postId')));
  }
  // console.log(e.target);
}

//Gets blog to be loaded from the API data
async function getBlog(){
  if(blogHeading !== null){
    const blogPostData = await fetchData()
    .catch(err => console.log(err));

    const id = getBlogPostId();
    console.log(id);

    // console.log(blogPostData.blog_posts[id]);

    loadBlogContent(blogPostData.blog_posts[id]);
  }
}

//Loads the Blog content
function loadBlogContent(post){
 const header = post.Title;
 let contentBody = '';
 post.content.forEach(paragraph => {
    contentBody += `
      <p>${paragraph}</p>
    `;
 });
 blogHeading.innerHTML = '';
 blogHeading.nextElementSibling.innerHTML = '';
 blogHeading.appendChild(document.createTextNode(header));
 blogHeading.nextElementSibling.innerHTML = contentBody;
}

function getBlogPostId(){
  return parseInt(sessionStorage.getItem('postId'));
}

// Validates if the input is an email when the text field is out of focus('blur')
function validateEmail(){

  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,4})$/;

  if(!re.test(emailTextField.value) && emailTextField.value !== ''){
    emailTextField.classList.add('is-invalid');
  } else {
    emailTextField.classList.remove('is-invalid');
  }

}
