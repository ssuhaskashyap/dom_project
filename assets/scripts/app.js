const startButton = document.querySelector('header button');
const mainModal = document.getElementById('add-modal');
const backDrop = document.getElementById('backdrop');
const mainModalCancel = mainModal.querySelector('.btn--passive');
const mainModalAdd = mainModal.querySelector('.btn--success');
const mainInputElements = mainModal.getElementsByTagName('input');
const mainSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const deleteModal = document.getElementById('delete-modal');
const cancelDeleteModal = deleteModal.querySelector('.modal__actions').querySelector('.btn--passive');
let confirmDeleteModal = deleteModal.querySelector('.modal__actions').querySelector('.btn--danger');
let movies = [];

const updateUi = () => {
  if (movies.length === 0) {
    mainSection.style.display = 'block';
  } else {
    mainSection.style.display = 'none';
  }
}

const showMainModalHandler = () => {
  mainModal.classList.add("visible");
  toggleBackDrop();
}

const toggleBackDrop = () => {
  backDrop.classList.toggle('visible');
}

const cancelMainModalHandler = () => {
  removeMainModalHandler();
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
    return;
  } else {
    movies.push(newMovie);
  }

  clearInputElements();
  removeMainModalHandler();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUi();
}

const removeMainModalHandler = () => {
  if (mainModal.className === 'modal visible') {
    mainModal.classList.remove("visible");
    clearInputElements();
    toggleBackDrop();
  }
}

const renderNewMovieElement = (id, title, image, rating) => {
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

  newMovieElement.addEventListener('click', deleteMovieModal.bind(this, id));
  listRoot.append(newMovieElement);
}

// https://www.mbatious.com/uploads/files/1497349879912-movies.jpg

const deleteMovieModal = (index) => {
  toggleBackDrop();
  deleteModal.classList.add('visible');

  confirmDeleteModal.replaceWith(confirmDeleteModal.cloneNode(true));
  confirmDeleteModal = deleteModal.querySelector('.modal__actions').querySelector('.btn--danger');
  cancelDeleteModal.removeEventListener('click', cancelDeleteModalHandler);

  cancelDeleteModal.addEventListener('click', cancelDeleteModalHandler);
  confirmDeleteModal.addEventListener('click', deleteMovieElementHandler.bind(null, index));
}

const cancelDeleteModalHandler = () => {
  deleteModal.classList.remove('visible');
  toggleBackDrop();
}

const deleteMovieElementHandler = (movieId) => {
  deleteModal.classList.remove('visible');
  toggleBackDrop();
  let ind = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    ind++;
  }
  movies.splice(ind, 1);
  listRoot.children[ind].remove();
  updateUi();
}

startButton.addEventListener('click', showMainModalHandler);
backDrop.addEventListener('click', removeMainModalHandler);
mainModalCancel.addEventListener('click', cancelMainModalHandler);
mainModalAdd.addEventListener('click', addMainModalHandler);
