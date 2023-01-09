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
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = book.title;

    const authorDiv = document.createElement('div');
    authorDiv.innerHTML = book.author;

    const btn = document.createElement('button');
    btn.innerText = 'Remove';

    btn.onclick = () => this.remove(btn);

    const hr = document.createElement('hr');

    bookDiv.append(titleDiv, authorDiv, btn, hr);

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
