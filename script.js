let books = JSON.parse(localStorage.getItem('books')) ?? [];

const booksEl = document.getElementById('books');

const addBook = (book) => {
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  titleDiv.innerHTML = book.title;

  const authorDiv = document.createElement('div');
  authorDiv.innerHTML = book.author;

  const btn = document.createElement('button');
  btn.innerText = 'Remove';

  btn.onclick = () => {
    remove(btn);
  };

  const hr = document.createElement('hr');

  bookDiv.append(titleDiv, authorDiv, btn, hr);

  booksEl.insertAdjacentElement('afterbegin', bookDiv);
};

if (books) [...books].reverse().forEach(addBook);

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookEle = e.target.elements;
  const title = bookEle[0].value;
  const author = bookEle[1].value;

  const book = { author, title };

  books.unshift(book);
  addBook(book);

  localStorage.setItem('books', JSON.stringify(books));
});

const remove = (e) => {
  const index = Array.from(booksEl.children).indexOf(e.parentNode);
  e.parentNode.remove();
  books = books.filter((_, i) => {
    return index != i;
  });
  localStorage.setItem('books', JSON.stringify(books));
};
