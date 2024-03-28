const btnAdd = document.getElementById('btn-add')
const btnConfirm = document.getElementById('btn-add-confirm')
const addTitle = document.getElementById('book-title')
const addAuthor = document.getElementById('book-author')
const addPages = document.getElementById('book-pages')
const dialog = document.querySelector('dialog')
const books = document.getElementById('books') // to hook the books

const myLibrary = []
showLibrary()

btnAdd.addEventListener('click', () => {
    dialog.showModal()
})

btnConfirm.addEventListener('click', (e) => {
    e.preventDefault()
    const book = new Book(addTitle.value, addAuthor.value, addPages.value)
    myLibrary.push(book)
    showLibrary()
    dialog.close()
})


function Book(title, author, pages){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = 'unread'
}


function showLibrary(){
    books.innerHTML = ''
    myLibrary.forEach((book, idx) => {
        const bookContent = document.createElement('div')
        bookContent.classList.add('book')
        bookContent.innerHTML = `
            <p class="title"><i class="fa-solid fa-book"></i>&nbsp; ${book.title}</p>
            <p class="author"><i class="fa-solid fa-user"></i>&nbsp; ${book.author} </p>
            <p class="pages"> ${book.pages} pp</p>
            <p class="status ${book.status}">${book.status}</p>
            <section class="actions">
                <button class="btn-${book.status}"><i class="fa-solid fa-eye"></i></button>
                <button class="btn-delete"><i class="fa-solid   fa-trash"></i></button>
            </section>`
        books.appendChild(bookContent)
        
        // fetch action buttons
        const btnDelete = bookContent.querySelector('.btn-delete')
        btnDelete.addEventListener('click', () => {
            myLibrary.splice(idx, 1)
            showLibrary()
        })
        
        const btnRead = bookContent.querySelector(`.btn-${book.status}`)
        btnRead.addEventListener('click', () => {
            book.status = toggleStatus(book.status)
            showLibrary()
        })
    })   
}


function toggleStatus(status){
    return status === 'unread' ? 'read':'unread'
}
