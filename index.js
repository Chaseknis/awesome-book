import AwesomeBook from './modules/AwesomeBook.js';
import { DateTime } from './modules/luxon.js';

const form = document.querySelector('form');
const awesomeBook = new AwesomeBook();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const [titleInput, authorInput] = e.target.elements;
  awesomeBook.insert({
    author: authorInput.value,
    title: titleInput.value,
  });
  e.target.reset();
});

// handle nav buttons
const navBtns = document.querySelectorAll('.nav-button');

navBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const text = e.currentTarget.innerText;
    document.body.className = `show-${text.toLowerCase().replace(' ', '-')}`;
  });
});

// Update time element every second
const timeEl = document.querySelector('time');
const updateTime = () => {
  const dt = DateTime.local();
  timeEl.innerText = dt.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
  setTimeout(updateTime, 1000);
};

updateTime();
