const artistGrid = document.getElementById("artist-grid");
const playlistContainer = document.getElementById("playlist-result");
const searchInput = document.getElementById("search-input");
const artistResult = document.getElementById("artist-result");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const apiUrlSearch =
    "https://depaula-dev.github.io/spotify-study/api/artists.json";

  if (searchTerm === "") {
    artistGrid.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  requestArtist(apiUrlSearch, searchTerm);
});

async function requestArtist(apiUrlSearch, searchTerm) {
  try {
    const response = await fetch(apiUrlSearch);
    const data = await response.json();
    displayResult(data, searchTerm);
  } catch (error) {
    console.error("Erro ao obter dados");
  }
}

async function displayResult(data, searchTerm) {
  let _data = data["artists"].filter((result) =>
    result.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  artistGrid.classList.remove("hidden");
  playlistContainer.classList.add("hidden");

  const getElement = document.getElementsByClassName("artist-result__link");
  const cards = [...getElement];

  if (cards) {
    cards.forEach((elemento) => {
      elemento.parentNode.removeChild(elemento);
    });
  }

  _data.forEach((result) => {
    let linkArtist = document.createElement("a");
    linkArtist.classList.add("artist-result__link");

    let playButton = document.createElement("button");
    playButton.classList.add("play");

    let iPlay = document.createElement("i");
    iPlay.classList.add("fa-solid");
    iPlay.classList.add("fa-play");

    let cardResult = document.createElement("div");
    cardResult.classList.add("artist-result__card");

    let imgResult = document.createElement("img");
    imgResult.src = result.urlImg;

    let titleArtist = document.createElement("div");
    titleArtist.classList.add("artist-result__text");

    let nameArtist = document.createElement("span");
    nameArtist.classList.add("artist-result__name");
    nameArtist.textContent = result.name;

    let categorieArtist = document.createElement("span");
    categorieArtist.classList.add("artist-result__categorie");
    categorieArtist.textContent = result.genre;

    artistResult.append(linkArtist);

    linkArtist.append(playButton);
    linkArtist.append(cardResult);

    playButton.append(iPlay);

    cardResult.append(imgResult);
    cardResult.append(titleArtist);

    titleArtist.append(nameArtist);
    titleArtist.append(categorieArtist);
  });
}
