const artistGrid = document.getElementById("artist-grid");
const playlistContainer = document.getElementById("playlist-result");
const searchInput = document.getElementById("search-input");
const artistResult = document.getElementById("artist-result");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const apiUrlSearch = `http://localhost:3000/artists?name_like=${searchTerm}`;

  if (searchTerm === "") {
    artistGrid.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  requestArtist(apiUrlSearch);
});

async function requestArtist(apiUrlSearch) {
  try {
    const response = await fetch(apiUrlSearch);
    const data = await response.json();
    displayResult(data);
  } catch (error) {
    console.error("Erro ao obter dados");
  }
}

async function displayResult(data) {
  artistGrid.classList.remove("hidden");
  playlistContainer.classList.add("hidden");

  const getElement = document.getElementsByClassName("artist-result__link");
  const cards = [...getElement]

  if (cards) {
    cards.forEach(elemento => {
      elemento.parentNode.removeChild(elemento);
  });

  }

  data.forEach((result) => {
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
