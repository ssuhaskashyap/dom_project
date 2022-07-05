const startButton = document.querySelector('header button');
const mainModal = document.getElementById('add-modal');
const backDrop = document.getElementById('backdrop');
const mainModalCancel = mainModal.querySelector('.btn--passive');
const mainModalAdd = mainModal.querySelector('.btn--success');
const mainInputElements = mainModal.getElementsByTagName('input');
let movies = [];

// console.log(titleValue, imageUrlValue, ratingValue);

const toggleMainModalHandler = () => {
  mainModal.classList.toggle("visible");
  toggleBackDrop();
}

const toggleBackDrop = () => {
  backDrop.classList.toggle('visible');
}

const cancelMainModalHandler = () => {
  toggleMainModalHandler();
  clearInputElements();
}

const clearInputElements = () => {
  for (const el of mainInputElements) {
    el.value = '';
  }
}

const addMainModalHandler = () => {
  const titleValue = mainInputElements[0].value;
  const imageUrlValue = mainInputElements[1].value;
  const ratingValue = mainInputElements[2].value;
  const newMovie = {
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  if (titleValue.trim() === '' || imageUrlValue.trim() === '' || ratingValue.trim() === '' || +ratingValue < 1 || +ratingValue > 5) {
    alert('Please enter a valid entry');
  } else {
    movies.push(newMovie);
    console.log(movies);
  }

  clearInputElements();
  toggleMainModalHandler();
}

startButton.addEventListener('click', toggleMainModalHandler);
backDrop.addEventListener('click', toggleMainModalHandler);
mainModalCancel.addEventListener('click', cancelMainModalHandler);
mainModalAdd.addEventListener('click', addMainModalHandler);