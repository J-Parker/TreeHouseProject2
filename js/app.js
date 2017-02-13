/*
active part of this css is not working and I could not figure it out
only the hover is working with my dynamic pagination li a elements
I tried and tried to figure it out.... I pretty much got the rest
design css -->
               .pagination li a.active,
               .pagination li a:hover{
                  background-color: #4ba6c3;
                  color: #fff;
                }


*/


// dynamical create search bar and button
var searchTool =
  "<div class='student-search'><input id='searchText' class='search' placeholder='Search for students...'><button class='search' id='searchButton'>Search</button></div>";
var createSearch = document.querySelector('.page-header');
createSearch.innerHTML = createSearch.innerHTML + searchTool;
//set up variables for searching and dynamic pagination
var list = document.querySelector('.student-list');
var students = list.children;
var searchText = document.getElementById('searchText');
var searchButton = document.getElementById('searchButton');

var paginationNumber = Math.floor(students.length / 10);
var remainder = students.length % 10;
var paginate = '';
var paginateTool = '';
var searchBoolean;

//search function
searchButton.addEventListener('click', () => {
  let searchBoolean = 0;
  for (let i = 0; i < students.length; i++) {
    if (students[i].querySelector('h3').innerText.includes(searchText.value,
        0)) {
      students[i].style.display = 'block';
      searchBoolean = 1
      document.querySelector('.page-header').children[0].innerText =
        "Students that match " + searchText.value;
    } else {
      students[i].style.display = 'none';
    }
  }
  if (searchBoolean == 0) {
    alert('Student not found')
    searchText.value = '';
    paginationDisplay(1);
  }
  if (searchText.value == '') {
    paginationDisplay(1);
  }
});

//create pagination dynamically with onclick using this.innertext number
function Pagination() {
  if (remainder > 0) {
    paginationNumber += 1;
  }
  for (let i = 1; i <= paginationNumber; i++) {
    paginate = paginate + "<li id=" + i +
      "><a onclick='paginationDisplay(this.innerText)'>" +
      i + '</a></li>';
  }
  paginateTool = "<div class='pagination'><ul>" + paginate + "</ul></div>"
  $('.page').append(paginateTool);
  paginationDisplay(1);

}

//dynamically load pagination
window.onload = Pagination();



//using this.innertext from onclick dynamic pagination creation to mathimatically display desired number of students coordinated with link clicked
function paginationDisplay(x) {
  let beginDisplay = x * 10 - 10;
  let endDisplay = x * 10 - 1;
  for (let i = 0; i < students.length; i++) {
    if (i >= beginDisplay && i <= endDisplay) {
      students[i].style.display = 'block';
    } else {
      students[i].style.display = 'none';
    }
  }
  //display students out of students dynamically
  if (x < 6) {
    document.querySelector('.page-header').children[0].innerText = "Students " +
      (beginDisplay + 1) + " of " + (endDisplay + 1) + " out of " + students.length;
  } else {
    document.querySelector('.page-header').children[0].innerText = "Students " +
      (beginDisplay + 1) + " of " + (endDisplay + 1 - x) + " out of " +
      students.length;
  }
}
