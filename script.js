// Form 
const openFormButton = document.querySelector('.form-open');
const closeFormButton = document.querySelector('.form-close');
const addBookButton = document.querySelector('.add-book-button')
const bookForm = document.querySelector('.book-form');
const inputs = {
  title: document.querySelector('[name=title]'),
  author: document.querySelector('[name=author]'),
  pages: document.querySelector('[name=pages]'),
  status: document.querySelector('#status')
};

openFormButton.addEventListener('click', openForm);
closeFormButton.addEventListener('click', closeForm);
addBookButton.addEventListener('click', addBook);

function openForm () {
  bookForm.classList.add('open');
}
function closeForm () {
  bookForm.classList.remove('open');
  resetFields();
}

// Library functionality
const libraryObj = document.querySelector('.library');
let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.toggleRead = function() {
  this.status = !this.status;
};

function createBook(e) {
  const title = inputs.title.value;
  const author = inputs.author.value;
  const pages = inputs.pages.value;
  const status = inputs.status.checked;

  if (title && author && pages) {
    return new Book(title, author, pages, status);
  }
  else {
    return null;
  }
}

function addBook(e) {
  const book = createBook(e);

  if (book) {
    myLibrary.push(book);
    render();
    closeForm();
  }
  else {
    checkFields();
  }
}

function checkFields() {
  inputs.title.value ? inputs.title.classList.remove("error") : inputs.title.classList.add("error");
  inputs.author.value ? inputs.author.classList.remove("error") : inputs.author.classList.add("error");
  inputs.pages.value ? inputs.pages.classList.remove("error") : inputs.pages.classList.add("error");
}

function resetFields() {
  inputs.title.value = "";
  inputs.author.value = "";
  inputs.pages.value = "";
  inputs.status.checked = false;
  inputs.title.classList.remove("error");
  inputs.author.classList.remove("error");
  inputs.pages.classList.remove("error");
}

function removeBook() {
  myLibrary.splice(this.dataset.index, 1);
  render();
}

function toggleRead() {
  myLibrary[this.dataset.index].toggleRead();
  render();
}

function createBookHTML(book) {
  return `<div class="book">
            <div class="book-img"></div>
            <div class="book-info">
              <p class="book-title">${book.title}</p>
              <p class="book-author">by ${book.author}</p>
              <p>${book.pages} pages</p>
              <button class="status-${book.status ? '' : 'un'}read">${book.status ? 'Read' : 'Unread'}</button>
            </div>
            <button class="delete">x</button>
          </div>`
}

function updateDeleteButtons() {
  const books = document.querySelectorAll('.book');
  books.forEach((book, i) => {
    const deleteButton = book.querySelector('.delete');
    const readButton = book.querySelector('.book-info button');
    deleteButton.setAttribute('data-index', i);
    deleteButton.addEventListener('click', removeBook);
    readButton.setAttribute('data-index', i);
    readButton.addEventListener('click', toggleRead);
  });
}

function render() {
  const html = myLibrary.map(createBookHTML).join('');
  libraryObj.innerHTML = html;
  updateDeleteButtons();
}

function createTestBooks() {
  for (i = 1; i <= 7; i++) {
    const book = new Book(`Title ${i}`, 
                          `Author ${i}`, 
                          i*100, (i%2==0));
    myLibrary.push(book);
  }
  render();
}

createTestBooks();