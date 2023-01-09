const booksEl = document.getElementById('books');

class AwesomeBook {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) ?? [];
    if (this.books) [...this.books].reverse().forEach(this.addBook);
  }

  remove = (e) => {
    const index = Array.from(booksEl.children).indexOf(e.parentNode);
    e.parentNode.remove();
    this.books = this.books.filter((_, i) => index !== i);
    localStorage.setItem('books', JSON.stringify(this.books));
  };

  addBook = (book) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book-container';
    const bookTitle = document.createElement('div');
    bookTitle.innerHTML = `${book.title} by ${book.author}`;

    const btn = document.createElement('button');
    btn.innerText = 'Remove';

    btn.onclick = () => this.remove(btn);

    bookDiv.append(bookTitle, btn);

    booksEl.insertAdjacentElement('afterbegin', bookDiv);
  };

  prepend = (book) => {
    this.books.unshift(book);
  };
}

const form = document.querySelector('form');
const awesomeBook = new AwesomeBook();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookEle = e.target.elements;
  const title = bookEle[0].value;
  const author = bookEle[1].value;

  const book = { author, title };

  awesomeBook.prepend(book);
  awesomeBook.addBook(book);

  localStorage.setItem('books', JSON.stringify(awesomeBook.books));
});
