let gamesArray;
let id;
let objDetails;
const detailsSection = document.querySelector("#details");
const removeGames = document.querySelector("#remove");

async function gamesCategory(category) {
  if (category == undefined) {
    category = "mmorpg";
  }
  try {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "78ddad34ecmsh5d8fe9803994461p12a23ejsn44d8152d74a8",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const finialData = await response.json();
    gamesArray = finialData;
    displayGames();
  } catch (error) {
    console.log(error);
  }
}
gamesCategory();

const liList = Array.from(document.querySelectorAll("li"));

for (let i = 0; i < liList.length; i++) {
  liList[i].addEventListener("click", function () {
    let category;
    category = this.innerText;
    gamesCategory(category);
  });
}

function displayGames() {
  let box = "";
  for (i = 0; i < gamesArray.length; i++) {
    box += `
  <div  id=${
    gamesArray[i].id
  } class=" col-md-4  d-flex align-items-stretch">
    <div class="box scale text-white border border-2 border-dark rounded-2">
        <div class="img-container p-3 ">
          <div class="img-box position-relative ">
            <div class="overlay rounded-top">
            </div>
            <img src=${
              gamesArray[i].thumbnail
            } class="w-100 rounded-top" alt="">
          </div>
  
    <div id="text-p" class="d-flex justify-content-between align-items-center my-4"><p class="text-white m-0">${gamesArray[
      i
    ].title
      .split(" ")
      .splice(0, 1)}</p>
    <span class="badge bg-primary fs-6">Free</span></div>
    <p class="text-center ">${gamesArray[i].short_description
      .split(" ")
      .splice(0, 7)
      .toString()
      .replaceAll(",", " ")}</p>
        </div>
        <di id="hh" class="d-flex justify-content-between align-items-center border-dark border-top px-3 py-2">
          <p class="m-0 p-text">${gamesArray[i].genre}</p>
          <span class="p-text">${gamesArray[i].platform
            .split(" ")
            .splice(0, 2)
            .toString()
            .replaceAll(",", " ")}</span>

      </div>
    </div>
`;
  }
  document.getElementById("contant").innerHTML = box;

  elementLoop();
}

function elementLoop() {
  let contentArray = Array.from(document.getElementsByClassName("col-md-4"));
  for (i = 0; i < contentArray.length; i++) {
    contentArray[i].addEventListener("click", function (e) {
      id = this.getAttribute("id");
      gameDetails();
      removeGames.classList.add("d-none");
      document.querySelector("#landing").classList.add("d-none");
      detailsSection.classList.replace("d-none", "d-block");
    });
  }
}

async function gameDetails() {
  try {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "78ddad34ecmsh5d8fe9803994461p12a23ejsn44d8152d74a8",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    const finialData = await response.json();
    objDetails = finialData;
    console.log(objDetails)
    showDetails();
  } catch (error) {
    console.log(error);
  }
}

function showDetails() {
  let box = `
    <div class="container text-white py-5 position-relative" >
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h2 class="ps-2 m-0">Details Game</h2>
      <div>
<i id="close" class="fa-solid fs-4 fa-xmark"></i>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <img src=${objDetails.thumbnail} class="w-100 px-2 mt-2" alt="">
      </div>
      <div class="col-md-8">
        <div >
          <h3>Title: ${objDetails.title}</h3>
            <h4>Category: <span class="badge bg-info">${objDetails.genre}</span></h4>
            <h4>Platform: <span class="badge bg-info">${objDetails.platform}</span></h4>
            <h4>Status: <span class="badge bg-info">${objDetails.status}</span></h4>
          <p>${objDetails.description}</p>
            <button class="btn btn-outline-warning"><a target="_blank" href=${objDetails.game_url} class="text-decoration-none text-white">Show Game</a></button>
        </div> 
      </div>
    </div>
  </div>
  `;
  document.getElementById("details").innerHTML = box;

  document.querySelector("#close").addEventListener("click", closeDetails);
}

function closeDetails() {
  console.log("hiii");
  detailsSection.classList.add("d-none");
  removeGames.classList.replace("d-none", "d-block");
  document.querySelector("#landing").classList.replace("d-none", "d-block");
  displayGames();
}
