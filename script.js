const apiUrl = "http://localhost:3000/main-cards";

// chame o onInit assim que o carregamento da tela completar
document.addEventListener("DOMContentLoaded", function () {
  onInit();
});

// carregamento completo
function onInit() {
  getAllArtists();
}

// pegue o elemento do html com id section E faça uma chamada assicrona chamando o arquivo json ou fake back-end
async function getAllArtists() {
  const cardsSection = document.getElementById("section");
  //chamada concluída
  const data = await serviceArtist();

  let colorNumber = 1;

  //mostre cada card de data
  data.forEach((element) => {
    let linkPlaylist = document.createElement("a");

    let card = document.createElement("div");
    card.classList.add("cards");

    card.classList.add(`card${colorNumber}`);

    let title = document.createElement("h2");
    title.textContent = element.card;

    let image = document.createElement("img");
    image.src = element.urlImg;

    linkPlaylist.append(card);
    card.append(title);
    card.append(image);
    cardsSection.append(linkPlaylist);

    colorNumber++;
  });
}

async function serviceArtist() {
  try {
    // aguarde a resposta do fake back-end
    const response = await fetch(apiUrl);

    // responder com os dados concluídos
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao obter dados");
  }
}
