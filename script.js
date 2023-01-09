const books = [];

const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let bookEle = e.target.elements;
  const title = bookEle[0].value;
  const author = bookEle[1].value;

  books.unshift({
    author,
    title,
  });
  console.log(books);
  localStorage.setItem('books', JSON.stringify(books));
});
