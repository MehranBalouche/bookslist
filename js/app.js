// start
let $ = document;
function _log(value) {
  console.log(value);
}
function _table(value) {
  console.table(value);
}

const inputTitleElem = $.getElementById('title');
const inputAuthorElem = $.getElementById('author');
const inputYearElem = $.getElementById('year');
const form = $.getElementById('book-form');
const addBtnElem = $.getElementById('addBtn');
const invalidTitleElem = $.getElementById('invalidTitle');
const invalidAuthorElem = $.getElementById('invalidAuthor');
const invalidYearElem = $.getElementById('invalidYear');
const bookListElem = $.getElementById('bookList');

let booksList = [];

function checkForm(event) {
  event.preventDefault();
  let newTitleValue = inputTitleElem.value;
  let newAuthorValue = inputAuthorElem.value;
  let newYearValue = inputYearElem.value;

  if (newTitleValue.trim() === '') {
    invalidTitleElem.style.display = 'block';
    setTimeout(function () {
      invalidTitleElem.style.display = 'none';
    }, 3000);
    return;
  }
  if (newAuthorValue.trim() === '') {
    invalidAuthorElem.style.display = 'block';
    setTimeout(function () {
      invalidAuthorElem.style.display = 'none';
    }, 3000);
    return;
  }
  if (newYearValue.trim() === '') {
    invalidYearElem.style.display = 'block';
    setTimeout(function () {
      invalidYearElem.style.display = 'none';
    }, 3000);
    return;
  }

  const id = (Math.random() + 1).toString(36).substring(7);

  let newBookInformation = {
    id: id,
    title: newTitleValue,
    author: newAuthorValue,
    year: newYearValue,
  };

  booksList.push(newBookInformation);

  setLocalStorage(booksList);
  listBooksGenerator(booksList);

  inputTitleElem.value = '';
  inputAuthorElem.value = '';
  inputYearElem.value = '';
  inputTitleElem.focus();
}

function setLocalStorage(data) {
  localStorage.setItem('myBooksList', JSON.stringify(data));
}

function deleteBooks(event) {

  let localStorageBooksList = JSON.parse(localStorage.getItem('myBooksList'));

  booksList = localStorageBooksList;
  let targetId = event.target.parentElement.id;

  let mainBookIndex = booksList.findIndex(function (book) {
    return book.id === targetId;
  });
  booksList.splice(mainBookIndex, 1);

  setLocalStorage(booksList);
  listBooksGenerator(booksList);
}

function listBooksGenerator(data) {
  let newTrElem, thTitleElem, thAuthorElem, thYearElem, thDeleteElem;

  bookListElem.innerHTML = '';

  data.forEach(function (book) {
    newTrElem = $.createElement('tr');
    newTrElem.setAttribute('id', book.id);

    thTitleElem = $.createElement('th');
    thTitleElem.innerHTML = book.title;

    thAuthorElem = $.createElement('th');
    thAuthorElem.innerHTML = book.author;

    thYearElem = $.createElement('th');
    thYearElem.innerHTML = book.year;

    thDeleteElem = $.createElement('th');
    thDeleteElem.classList.add('delete-c');
    thDeleteElem.addEventListener('click', deleteBooks);
    thDeleteElem.innerHTML = '❌';

    newTrElem.appendChild(thTitleElem);
    newTrElem.appendChild(thAuthorElem);
    newTrElem.appendChild(thYearElem);
    newTrElem.appendChild(thDeleteElem);
    bookListElem.appendChild(newTrElem);
  });
}

function getLocalStorage() {
  let localStorageBooksList = JSON.parse(localStorage.getItem('myBooksList'));
  if (localStorageBooksList) {
    booksList = localStorageBooksList;
  } else {
    booksList = [];
  }

  listBooksGenerator(booksList);
}

window.addEventListener('load', getLocalStorage);
form.addEventListener('submit', checkForm);
