const resultArtist = document.getElementById("artist-result");
const playlistContainer = document.getElementById("playlist-result");
const searchInput = document.getElementById("search-input");



searchInput.addEventListener("input", function () {

  const searchTerm = searchInput.value.toLowerCase();
  const apiUrlSearch = `http://localhost:3000/artists?name_like=${searchTerm}`;
  
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }

  requestArtist(apiUrlSearch );
});

async function requestArtist(apiUrlSearch ) {
  try {
    const response = await fetch(apiUrlSearch);
    const data = await response.json();
    displayResult();
  } catch (error) {
    console.error("Erro ao obter dados");
  }
}

async function displayResult() {
    resultArtist.classList.remove("hidden");
    playlistContainer.classList.add("hidden");
    const data = await requestArtist();

    data.forEach((element) => {
        let 
    })

}
