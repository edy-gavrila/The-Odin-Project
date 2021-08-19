let myLibrary = [];
const addBookFormContainer = document.querySelector(".form-container");
const showHideFormButton = document.querySelector("#showHideForm");
const addBookForm = document.querySelector("#form");
const cancelButton = document.querySelector(".btn-cancel");

function Book(title, author, numPages, isRead = false) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
}

Book.prototype.details = function () {
  return `${this.title} by ${this.author} , ${this.numPages} pages long,  ${
    this.isRead ? "read" : "not read yet"
  }.`;
};

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

addBookToLibrary(new Book("Sapiens", "Yuval Noah Harari", 297, true));
addBookToLibrary(new Book("Homo Deus", "Yuval Noah Harari", 316, true));
addBookToLibrary(
  new Book("21 Lessons for the 21st Century", "Yuval Noah Harari", 369, true)
);
addBookToLibrary(new Book("Computer Networks", "Andrew Tanenbaum", 890, true));
addBookToLibrary(
  new Book("Functional Programming", "Eduard Gavrila", 260, false)
);

function makeBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.innerText = book.title;
  card.appendChild(title);

  const uList = document.createElement("ul");

  const bookTitle = document.createElement("li");
  bookTitle.innerHTML = `<b>Title</b>: ${book.title}`;
  const author = document.createElement("li");
  author.innerHTML = `<b>Author:</b> ${book.author}`;
  const numPages = document.createElement("li");
  numPages.innerHTML = `<b>Pages:</b> ${book.numPages}`;
  const isRead = document.createElement("li");
  isRead.innerHTML = `<b>Read</b>: ${book.isRead ? "Yes" : "Not Yet"}`;

  uList.appendChild(bookTitle);
  uList.appendChild(author);
  uList.appendChild(numPages);
  uList.appendChild(isRead);
  card.appendChild(uList);
  return card;
}

function displayBooks(library) {
  library.forEach((book) => {
    const bookCard = makeBookCard(book);
    document.body.appendChild(bookCard);
  });
}

function addBookFormHandler(e) {
  e.preventDefault();
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const numPagesInput = document.querySelector("#numPages");
  const isReadCheckbox = document.querySelector("#isRead");

  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    numPages: numPagesInput.value,
    isRead: isReadCheckbox.checked,
  };
  addBookToLibrary(newBook);

  const newBookCard = makeBookCard(newBook);
  document.body.appendChild(newBookCard);
}

function toggleAddBookForm() {
  addBookFormContainer.classList.toggle("invisible");
  showHideFormButton.classList.toggle("invisible");
}

showHideFormButton.addEventListener("click", toggleAddBookForm);
addBookForm.addEventListener("submit", addBookFormHandler);

cancelButton.addEventListener("click", toggleAddBookForm);

displayBooks(myLibrary);
