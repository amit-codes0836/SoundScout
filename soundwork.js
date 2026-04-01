const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const songsContainer = document.getElementById("songsContainer");
const loader = document.getElementById("loader");


searchBtn.addEventListener("click", () => {
  let query = searchInput.value.trim();

  if (query !== "") {
    fetchSongs(query);
  }
});


searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

function fetchSongs(query) {
  loader.classList.remove("hidden");
  songsContainer.innerHTML = "";

  fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=100`)
    .then(res => res.json())
    .then(data => {
      loader.classList.add("hidden");
      displaySongs(data.results);
    })
    .catch(err => {
      console.log("Error:", err);
      loader.classList.add("hidden");
    });
}

function displaySongs(songs) {
  songsContainer.innerHTML = "";

  songs.map(song => {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${song.artworkUrl100}" alt="song">
      <h3>${song.trackName}</h3>
      <p>${song.artistName}</p>
      <audio controls src="${song.previewUrl}"></audio>
    `;

    songsContainer.appendChild(card);
  });
}


window.onload = function() {
  fetchSongs("bollywood hits");
};