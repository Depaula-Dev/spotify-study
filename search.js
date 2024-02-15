const resultArtist = document.getElementById("artist-result");
const playlistContainer = document.getElementById("playlist-result");
const searchInput = document.getElementById("search-input");

//http://localhost:3000/artists?name_like=Arlindo

searchInput.addEventListener("input", function () {

  const searchTerm = searchInput.value.toLowerCase();
  const apiUrlSearch = `http://localhost:3000/artists?name_like=${searchTerm}`;
  
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
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
    resultArtist.classList.remove("hidden");
    playlistContainer.classList.add("hidden");

console.log(data)
    data.forEach((result) => {
        let linkArtist = document.createElement("a");
        linkArtist.classList.add("artist-result__link");

        let playButton = document.createElement("button");
        playButton.classList.add("play");

        let iPlay = document.createElement("i")
        iPlay.classList.add("fa-solid");
        iPlay.classList.add("fa-play");

        let cardResult = document.createElement("div");
        cardResult.classList.add("artist-result__card");

        let imgResult = document.createElement("img");
        image.src = result.urlImg;

        let titleArtist = document.createElement("div");
        titleArtist.classList.add("artist-result__text");

        let nameArtist = document.createElement("span");
        nameArtist.classList.add("artist-result__name");
        nameArtist.textContent = result.name;

        let categorieArtist = document.createElement("span");
        categorieArtist.classList.add("artist-result__categorie");  
        categorieArtist.textContent = result.genre;


        linkArtist.append(playButton);
        linkArtist.append(cardResult);

        playButton.append(iPlay);

        cardResult.append(imgResult);
        cardResult.append(titleArtist);

        titleArtist.append(nameArtist);
        titleArtist.append(categorieArtist);

        resultArtist.append(linkArtist);

    })

}


