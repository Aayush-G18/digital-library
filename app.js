const myLibrary = [];

function Book(title, author,read) {
    this.title = title;
    this.author = author;

}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}`;
};

function addBookToLibrary(title, author) {
    const newBook = new Book(title, author);
    myLibrary.push(newBook);
    renderLibrary();
}

function renderLibrary() {
    var container = document.querySelector('.container');
    container.innerHTML = '';

    myLibrary.forEach(function(book) {
        var child = document.createElement('div');
        child.textContent = book.info();
        child.classList.add('child');
        container.appendChild(child);
    });
}

document.addEventListener("DOMContentLoaded", function () {

    var container = document.querySelector('.container');
    
    addBookToLibrary("Harry Potter", "J.K. Rowling");
    addBookToLibrary("To Kill a Mockingbird", "Harper Lee");
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien");    
    renderLibrary();
});

const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const title = document.getElementById("title");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

showBtn.addEventListener("click", () => {
    dialog.style.top = "-400px";
    dialog.style.left = "-400px";
    dialog.showModal();
});

dialog.addEventListener("close", (e) => {
    output.value =
        dialog.returnValue === "default"
        ? "No return value."
        : `ReturnValue: ${dialog.returnValue}.`; 
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    const confirmValue = new Book(title.value,author.value);
    addBookToLibrary(confirmValue.title,confirmValue.author);
    dialog.close(); 
});

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    dialog.close();
});
