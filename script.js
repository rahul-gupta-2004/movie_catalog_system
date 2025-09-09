const API_URL = 'http://localhost:3001/movies';

function fetchMovies() {
  fetch(API_URL)
    .then(res => res.json())
    .then(movies => {
      const table = document.getElementById('moviesTable');
      table.innerHTML = '';
      movies.forEach(movie => {
        table.innerHTML += `
          <tr>
            <td class="border p-2">${movie.id}</td>
            <td class="border p-2">${movie.title}</td>
            <td class="border p-2">${movie.director}</td>
            <td class="border p-2">${movie.genre}</td>
            <td class="border p-2">${movie.release_year}</td>
            <td class="border p-2">${movie.rating}</td>
            <td class="border p-2">
              <button onclick="editMovie(${movie.id})" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Update</button>
              <button onclick="deleteMovie(${movie.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

document.getElementById('movieForm').onsubmit = function(e) {
  e.preventDefault();
  const movie = {
    title: document.getElementById('title').value,
    director: document.getElementById('director').value,
    genre: document.getElementById('genre').value,
    release_year: document.getElementById('release_year').value,
    rating: document.getElementById('rating').value
  };
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie)
  }).then(() => {
    fetchMovies();
    this.reset();
  });
};

function deleteMovie(id) {
  fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    .then(() => fetchMovies());
}

// Show update form and fill with movie data
window.editMovie = function(id) {
  fetch(`${API_URL}`)
    .then(res => res.json())
    .then(movies => {
      const movie = movies.find(m => m.id === id);
      if (movie) {
        document.getElementById('update_id').value = movie.id;
        document.getElementById('update_title').value = movie.title;
        document.getElementById('update_director').value = movie.director;
        document.getElementById('update_genre').value = movie.genre;
        document.getElementById('update_release_year').value = movie.release_year;
        document.getElementById('update_rating').value = movie.rating;
        document.getElementById('updateForm').classList.remove('hidden');
      }
    });
};

// Handle update form submission
document.getElementById('updateForm').onsubmit = function(e) {
  e.preventDefault();
  const id = document.getElementById('update_id').value;
  const movie = {
    title: document.getElementById('update_title').value,
    director: document.getElementById('update_director').value,
    genre: document.getElementById('update_genre').value,
    release_year: document.getElementById('update_release_year').value,
    rating: document.getElementById('update_rating').value
  };
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie)
  }).then(() => {
    fetchMovies();
    this.reset();
    document.getElementById('updateForm').classList.add('hidden');
  });
};

fetchMovies();