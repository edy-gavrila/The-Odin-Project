let myLibrary = getStoredBooks();
const addBookFormContainer = document.querySelector(".form-container");
const showHideFormButton = document.querySelector("#showHideForm");
const addBookForm = document.querySelector("#form");
const cancelButton = document.querySelector(".btn-cancel");

function Book(title, author, numPages, id, isRead = false) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.isRead = isRead;
  this.id = id;
}

Book.prototype.details = function () {
  return `${this.title} by ${this.author} , ${this.numPages} pages long,  ${
    this.isRead ? "read" : "not read yet"
  }.`;
};
Book.prototype.toggleIsRead = function () {
  this.isRead = !this.isRead;
};

function getStoredBooks() {
  const storedBooks = localStorage.getItem("Books");
  if (storedBooks) {
    const booksData = JSON.parse(storedBooks);
    const books = [];
    booksData.forEach((book) => {
      books.push(
        new Book(book.title, book.author, book.numPages, book.id, book.isRead)
      );
    });
    return books;
  }
  return [];
}

function setStoredBooks(books) {
  localStorage.setItem("Books", JSON.stringify(books));
}

function addBookToLocalStorage(book) {
  const storedBooks = getStoredBooks();
  storedBooks.push(book);
  setStoredBooks(storedBooks);
}

function addBookToLibrary(newBook) {
  myLibrary.push(
    new Book(
      newBook.title,
      newBook.author,
      newBook.numPages,
      newBook.id,
      newBook.isRead
    )
  );
}

function makeBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", book.id);

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
  const details = document.createElement("p");
  details.innerText = book.details();
  card.appendChild(details);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "DELETE";

  deleteButton.addEventListener("click", () => {
    const cardToDelete = document.querySelector(`[data-id="${book.id}"]`);
    console.log(cardToDelete);
    cardToDelete.remove();
    const updatedLibrary = myLibrary.filter((bookEl) => bookEl.id !== book.id);
    myLibrary = [...updatedLibrary];
    setStoredBooks(myLibrary);
    console.log(updatedLibrary);
  });

  markAsReadButton = document.createElement("button");
  markAsReadButton.innerText = book.isRead ? "MARK AS UNREAD" : "MARK AS READ";
  markAsReadButton.classList.add("toggle-status");
  markAsReadButton.addEventListener("click", () => {
    const bookToMark = myLibrary.find((bookEl) => bookEl.id === book.id);
    bookToMark.toggleIsRead();
    setStoredBooks(myLibrary);
    window.location.reload(false);
  });
  const buttonsContainer = document.createElement("div");
  buttonsContainer.appendChild(deleteButton);
  buttonsContainer.appendChild(markAsReadButton);

  card.appendChild(buttonsContainer);
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

  const newBookData = {
    title: titleInput.value,
    author: authorInput.value,
    numPages: numPagesInput.value,
    id: Math.random(),
    isRead: isReadCheckbox.checked,
  };

  const newBook = new Book(
    newBookData.title,
    newBookData.author,
    newBookData.numPages,
    newBookData.id,
    newBookData.isRead
  );

  console.log(newBookData);
  addBookToLibrary(newBookData);
  addBookToLocalStorage(newBook);

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
