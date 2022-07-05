const startButton = document.querySelector('header button');
const mainModal = document.getElementById('add-modal');
const backDrop = document.getElementById('backdrop');
const mainModalCancel = mainModal.querySelector('.btn--passive');
const mainModalAdd = mainModal.querySelector('.btn--success');
const mainInputElements = mainModal.getElementsByTagName('input');
const mainSection = document.getElementById('entry-text');
let movies = [];

// console.log(titleValue, imageUrlValue, ratingValue);
const updateUi = () => {
  if (movies.length === 0) {
    mainSection.style.display = 'block';
  } else {
    mainSection.style.display = 'none';
  }
}

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
    id: Math.random().toString(),
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
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUi();
}

const renderNewMovieElement = (id, title, image, rating) => {
  const listRoot = document.getElementById('movie-list');
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${image}" alt="${title}">
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5</p>
  </div>
  `;

  listRoot.append(newMovieElement);
}

const deleteMovieElement = (movieId) => {
  let ind = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      movies.splice(ind, 1);
    }
    ind++;
  }
}

startButton.addEventListener('click', toggleMainModalHandler);
backDrop.addEventListener('click', toggleMainModalHandler);
mainModalCancel.addEventListener('click', cancelMainModalHandler);
mainModalAdd.addEventListener('click', addMainModalHandler);