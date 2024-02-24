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

function deleteBookFromLibrary(index) {
    myLibrary.splice(index,1);
    renderLibrary();
}

function renderLibrary() {
    var container = document.querySelector('.container');
    container.innerHTML = '';

    myLibrary.forEach(function(book, index) {
        var child = document.createElement('div');
        child.textContent = book.info();
        var deleteBtn = document.createElement('button');
        var image = document.createElement("img");
        image.src = "dustbin.png";
        image.style.width = "30px";
        deleteBtn.style.border = "none";
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.appendChild(image);
        deleteBtn.setAttribute('data-book-index', index); 
        child.appendChild(deleteBtn);
        child.classList.add('child');
        container.appendChild(child);
    });
}



document.querySelector('.container').addEventListener('click', function(event) {
    if (event.target && (event.target.matches('.deleteBtn') || event.target.matches('.deleteBtn img'))) {
        const deleteBtn = event.target.closest('.deleteBtn');
        const bookIndex = deleteBtn.dataset.bookIndex;
        deleteBookFromLibrary(bookIndex);
    }
});



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
    //default form validation working so js validation
    if (title.value.trim() === '' || author.value.trim() === '') {
        alert('Please fill in both title and author fields.'); n 
        event.preventDefault();
    }
    else{
        const confirmValue = new Book(title.value,author.value);
        addBookToLibrary(confirmValue.title,confirmValue.author);
        dialog.close(); 
    }
});

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    dialog.close();
});
