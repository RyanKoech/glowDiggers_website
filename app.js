// IMPORTS
// import { resolve } from 'path/posix';
// import { forEach } from 'lodash';
import {http} from './http.js';

//HTML ELEMENTS CONSTANTS

const exitMenuBtn = document.querySelector('.fa-times');
const openMenuBtn = document.querySelector('.fa-bars');
const navbar = document.querySelector('.navbar');
const blogsList = document.getElementById('article_list');

//EVENT LISTENERS
openMenuBtn.parentElement.addEventListener('click', showSlideMenu);

exitMenuBtn.parentElement.addEventListener('click', hideSLideMenu);

document.addEventListener('DOMContentLoaded', mainEvents);



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

//FETCH Data from API
function fetchData(){
  return http.get('https://run.mocky.io/v3/3143931d-273f-4f0f-bce8-1b3dde6433df');
}

//Add blog list item to blogs.html page
function addBlogListITems(posts){
  let blogList = '';

  posts.forEach(post => {
    blogList += `
      <li class="article-list-item"><a href="#">${post.Title}</a></li>
    `;
  });

  blogsList.innerHTML = blogList;
}
