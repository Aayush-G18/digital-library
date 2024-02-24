const myLibrary = [];

function Book(title, author,read) {
    this.title = title;
    this.author = author;
    this.read=read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author} ${this.read ? "is read" : "is not read yet"}`;
};

function addBookToLibrary(title, author,read) {
    const newBook = new Book(title, author,read);
    myLibrary.push(newBook);
    renderLibrary();
}

function deleteBookFromLibrary(index) {
    myLibrary.splice(index,1);
    renderLibrary();
}
function toggleRead(index){
    myLibrary[index].read=!myLibrary[index].read;
    renderLibrary();
}

function renderLibrary() {
    var container = document.querySelector('.container');
    container.innerHTML = '';


    var readBtnTemplate=document.createElement('input');
    readBtnTemplate.type='checkbox';
    var deleteBtnTemplate = document.createElement('button');
    var image = document.createElement("img");
    image.src = "dustbin.png";
    image.style.width = "30px";
    deleteBtnTemplate.style.border = "none";
    deleteBtnTemplate.classList.add('deleteBtn');
    deleteBtnTemplate.appendChild(image);

    myLibrary.forEach(function(book, index) {
        var child = document.createElement('div');
        child.textContent = book.info();
        var readBtn=readBtnTemplate.cloneNode(true);
        readBtn.setAttribute('data-book-index',index);
        readBtn.classList.add('readBtn');
        var deleteBtn = deleteBtnTemplate.cloneNode(true);
        deleteBtn.setAttribute('data-book-index', index);
        deleteBtn.classList.add('deleteBtn'); 
        child.appendChild(readBtn);
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
    } else if (event.target && event.target.matches('.readBtn')) {
        const bookIndex = event.target.dataset.bookIndex; 
        toggleRead(bookIndex);
    }
});



document.addEventListener("DOMContentLoaded", function () {

    var container = document.querySelector('.container');
    
    addBookToLibrary("Harry Potter", "J.K. Rowling",true);
    addBookToLibrary("To Kill a Mockingbird", "Harper Lee",false);
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien",true);    
    renderLibrary();
});

const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const title = document.getElementById("title");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const check=document.getElementById("myCheckbox");

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
        alert('Please fill in both title and author fields.');
        return; // Added return to exit the function if fields are empty
    }
    else {
        const confirmValue = new Book(title.value, author.value, check.checked); // Changed read.checked to check.checked
        addBookToLibrary(confirmValue.title, confirmValue.author, confirmValue.read); // Changed confirm.read to confirmValue.read
        dialog.close(); 
    }
});


cancelBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    dialog.close();
});

