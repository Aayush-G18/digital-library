// Section 1: Global Variables and Constants
const myLibrary = [];

// Section 2: Book Class and Prototypes
function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author} ${this.read ? "is read" : "is not read yet"}`;
};

// Section 3: Functions
function addBookToLibrary(title, author, read) {
    const newBook = new Book(title, author, read);
    myLibrary.push(newBook);
    renderLibrary();
}

function deleteBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    renderLibrary();
}

function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    renderLibrary();
}

// Section 4: Rendering Functions

function renderLibrary() {
    var container = document.querySelector('.container');
    container.innerHTML = '';

    myLibrary.forEach(function(book, index) {
        var child = document.createElement('div');
        child.textContent = book.info();
        
        var readBtn = document.createElement('input');
        readBtn.type = 'checkbox';
        readBtn.checked = book.read; // Set the checked attribute based on the read property
        readBtn.setAttribute('data-book-index', index);
        readBtn.classList.add('readBtn');
        
        var deleteBtn = document.createElement('button');
        var image = document.createElement("img");
        image.src = "dustbin.png";
        image.style.width = "30px";
        deleteBtn.style.border = "none";
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.appendChild(image);
        deleteBtn.setAttribute('data-book-index', index);
        
        child.appendChild(readBtn);
        child.appendChild(deleteBtn);
        child.classList.add('child');
        container.appendChild(child);
    });
}

// Section 5: Event Listeners
document.querySelector('.container').addEventListener('click', function(event) {
    if (event.target && (event.target.matches('.deleteBtn') || event.target.matches('.deleteBtn img'))) {
        const deleteBtn = event.target.closest('.deleteBtn');
        const bookIndex = deleteBtn.dataset.bookIndex;
        deleteBookFromLibrary(bookIndex);
    } else if (event.target && event.target.matches('.readBtn')) {
        const bookIndex = event.target.dataset.bookIndex; 
        toggleRead(bookIndex);
    }
});

// Section 6: DOMContentLoaded Event Handler
document.addEventListener("DOMContentLoaded", function () {
    var container = document.querySelector('.container');
    addBookToLibrary("Harry Potter", "J.K. Rowling", true);
    addBookToLibrary("To Kill a Mockingbird", "Harper Lee", false);
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", true);    
    renderLibrary();
});

// Section 7: Dialog Box for Adding Book
const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

showBtn.addEventListener("click", () => {
    dialog.style.top = "-500px"; 
    dialog.style.left="-1000px";
    dialog.showModal();
});


dialog.addEventListener("close", (e) => {
    if (dialog.returnValue === "confirm") {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        if (title !== '' && author !== '') {
            const read = document.getElementById("myCheckbox").checked;
            addBookToLibrary(title, author, read);
        } else {
            alert('Please fill in both title and author fields.');
        }
    }
});

confirmBtn.addEventListener("click", () => {
    dialog.returnValue = "confirm";
    dialog.close();
});

cancelBtn.addEventListener("click", () => {
    dialog.returnValue = "cancel";
    dialog.close();
});
