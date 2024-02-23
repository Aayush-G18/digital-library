const myLibrary = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
    this.info = function () {
        return`${this.title} by ${this.author}`;
    };
}

function addBookToLibrary(title, author) {
    const newBook = new Book(title, author);
    myLibrary.push(newBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien");


document.addEventListener("DOMContentLoaded", function () {
    var container = document.querySelector('.container');

    // Add books to the library
    addBookToLibrary("Harry Potter", "J.K. Rowling");
    addBookToLibrary("To Kill a Mockingbird", "Harper Lee");

    // Loop through the library and create book elements
    myLibrary.forEach(function (book) {
        var child = document.createElement('div');
        // child.textContent=`${book.title} by ${book.author}`;
        child.textContent=book.info();
        child.classList.add('child');
        container.appendChild(child);
    });
});
