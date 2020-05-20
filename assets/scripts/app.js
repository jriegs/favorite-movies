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

const entryTextSection = document.querySelector('#entry-text');
const movieList = document.querySelector('#movie-list');

const movieElement = document.createElement('div');
movieElement.className = 'movie-element card';
let deleteMovieBtns;

const movies = [];
let movieExists;
let addedMovie;
let selectedMovie;

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const clearMovieInputs = () => {
  addModalInputs.forEach((input) => {
    input.value = '';
  });
};

const showAddModal = () => {
  clearMovieInputs();
  backdrop.classList.add('visible');
  addModal.classList.add('visible');
};
const hideAddModal = () => {
  backdrop.classList.remove('visible');
  addModal.classList.remove('visible');
};

const showDeleteModal = () => {
  backdrop.classList.add('visible');
  deleteModal.classList.add('visible');
}
const hideDeleteModal = () => {
  backdrop.classList.remove('visible');
  deleteModal.classList.remove('visible');
};

const enterMovie = () => {
  const movieEntry = {
    'title': '', // Tropic Thunder
    'imageUrl': '', // https://upload.wikimedia.org/wikipedia/en/d/d6/Tropic_thunder_ver3.jpg
    'rating': '' // 4
  };

  let i = 0;
  for (key in movieEntry) {
    if (
        addModalInputs[i].value.trim() && 
        addModalInputs[2].value >= 1 &&
        addModalInputs[2].value <= 5
    ) {
      movieEntry[key] = addModalInputs[i].value;
    } else {
      alert('Enter proper values to continue (rating can\'t be above 5)');
      movieExists = false;
      return
    }
    i++;
  }
  movieExists = true;
  clearMovieInputs();
  movies.push(movieEntry);
};
const imageError = (img) => {
  let defaultImageSrc = 'https://kare.ee/images/no-image.jpg';
  img.src = defaultImageSrc;
};
const addToMovieList = () => {
  if (movies.length) {
    addedMovie = movies[movies.length-1];
    movieElement.innerHTML = `
      <div class="movie-element__image">
      <img src="${addedMovie.imageUrl}" alt="${addedMovie.title}" onerror="imageError(this)" />
      </div><div class="movie-element__info">
      <h2>${addedMovie.title} <p>${addedMovie.rating} stars</p></h2>
      <button class="movie-element__delete btn btn--danger">Delete Movie</button>
      </div>
    `;
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
    updateUI();
    setMovieDeleteBtn();
  }
};

const deleteMovie = () => {
  let movieTitle = selectedMovie.querySelector('img').getAttribute('alt');
  movieList.removeChild(selectedMovie);
  console.log(`You deleted the following movie: ${movieTitle}`);
  hideDeleteModal();
  updateUI();
};

const closeModal = () => {
  backdrop.classList.remove('visible');
  if (addModal.classList.contains('visible')) {
    addModal.classList.remove('visible');
  } else if (deleteModal.classList.contains('visible')) {
    deleteModal.classList.remove('visible');
  }
}

backdrop.addEventListener('click', closeModal);
addMovieBtn.addEventListener('click', showAddModal);
cancelBtn.addEventListener('click', hideAddModal);
addBtn.addEventListener('click', addMovie);
noBtn.addEventListener('click', hideDeleteModal);
yesBtn.addEventListener('click', deleteMovie);
