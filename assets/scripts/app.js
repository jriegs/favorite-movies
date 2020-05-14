const backdrop = document.querySelector('#backdrop');
const modal = document.querySelectorAll('.modal');
const addMovieBtn = document.querySelector('header button');

const addModal = modal[0];
const addModalInputs = addModal.querySelectorAll('input');
const cancelBtn = document.querySelectorAll('.btn--passive')[0];
const addBtn = document.querySelector('.btn--success');

const deleteModal = modal[1];
const noBtn = document.querySelectorAll('.btn--passive')[1];
const yesBtn = document.querySelector('.btn--danger');

const movieList = document.querySelector('#movie-list');

const movieElement = document.createElement('div');
movieElement.className = 'movie-element card';
let deleteMovieBtns;

const movies = [];
let movieExists;
let addedMovie;
let selectedMovie;

const showPopup = (el, el2) => {
  el.classList.add('visible');
  el2.classList.add('visible');
};
const hidePopup = (el, el2) => {
  el.classList.remove('visible');
  el2.classList.remove('visible');
};

const clearMovieInputs = () => {
  addModalInputs.forEach((input) => {
    input.value = '';
  });
};

const showAddModal = () => {
  clearMovieInputs();
  showPopup(backdrop, addModal);
};
const hideAddModal = () => hidePopup(backdrop, addModal);

const showDeleteModal = () => showPopup(backdrop, deleteModal);
const hideDeleteModal = () => hidePopup(backdrop, deleteModal);

const enterMovie = () => {
  const movieEntry = {
    'title': '', // Tropic Thunder
    'imageUrl': '', // https://upload.wikimedia.org/wikipedia/en/d/d6/Tropic_thunder_ver3.jpg
    'rating': '' // 4
  };

  let i = 0;
  for (key in movieEntry) {
    if (addModalInputs[i].value) {
      movieEntry[key] = addModalInputs[i].value;
    } else {
      alert('Enter proper values for each input to continue');
      movieExists = false;
      return
    }
    i++;
  }
  movieExists = true;
  clearMovieInputs();
  movies.push(movieEntry);
};
const addToMovieList = () => {
  let defaultImageSrc = 'https://kare.ee/images/no-image.jpg';
  if (movies.length) {
    addedMovie = movies[movies.length-1];
    movieElement.innerHTML = '<div class="movie-element__image">' +
                             `<img src="${addedMovie.imageUrl}" alt="${addedMovie.title}" />` +
                             '</div><div class="movie-element__info">' +
                             `<h2>${addedMovie.title} <p>${addedMovie.rating} stars</p></h2>` + 
                             '<button class="movie-element__delete btn btn--danger">Delete Movie</button>'
                             '</div>';
    let movieImg = movieElement.querySelector('img');
    movieImg.onerror = () => {
      movieImg.src = defaultImageSrc;
    }
    movieImg.onerror();
    movieList.appendChild(movieElement.cloneNode(true));
  }
};
const setMovieDeleteBtn = () => {
  deleteMovieBtns = document.querySelectorAll('.movie-element__delete');
  deleteMovieBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      selectedMovie = e.target.parentElement.parentElement;
      showDeleteModal();
    });
  });
};

const addMovie = () => {
  enterMovie();
  if (movieExists) {
    addToMovieList();
    hideAddModal();
    setMovieDeleteBtn();
  }
};

const deleteMovie = () => {
  let movieTitle = selectedMovie
                  .firstElementChild
                  .firstElementChild
                  .getAttribute('alt');
  
  movieList.removeChild(selectedMovie);
  console.log(`You deleted the following movie: ${movieTitle}`);
  hideDeleteModal();
};

addMovieBtn.addEventListener('click', showAddModal);
cancelBtn.addEventListener('click', hideAddModal);
addBtn.addEventListener('click', addMovie);
noBtn.addEventListener('click', hideDeleteModal);
yesBtn.addEventListener('click', deleteMovie);