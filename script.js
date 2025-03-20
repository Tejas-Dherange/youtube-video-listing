const loadBtn = document.getElementById("load-data");
const search = document.getElementById("searchInput");
const cardContainer = document.getElementById("resultsList");

async function fetchdata() {
  const url = "https://api.freeapi.app/api/v1/public/youtube/videos";

  //getting data from api

    async function getData() {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    }


  loadBtn.innerText = "loading";
  const data = await getData();

  console.log(data);

  loadBtn.innerText = "load";

  //rendering all video in webpage
  data.data.data.map((item) => {
    const anchor = document.createElement("a");
    anchor.setAttribute("id", "card");
    anchor.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${item.items.id}`
    );
    anchor.innerHTML = `
            <div class="card">
                <div class="image">
                    <img src=${item.items.snippet.thumbnails.medium.url} alt="Thumbnail">
                </div>
                <div class="content">
                    <h3 id="title">${item.items.snippet.title}</h3>
                    <h5>${item.items.snippet.channelTitle}</h5>
                    <div class="stats">
                        <span>Views: ${item.items.statistics.viewCount}</span>
                        <span>like: ${item.items.statistics.likeCount}</span>
                        <span>comment: ${item.items.statistics.commentCount}</span>
                    </div>
                </div>
            </div>
    `;

    cardContainer.appendChild(anchor);
  });

  //   console.log(data);
  //   console.log(arr);
}

loadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (cardContainer.childNodes.length === 0) {
    search.value = "";
    fetchdata();
  } else {
    loadBtn.innerText = "Data loaded";
  }
});

// fetchdata();
function searchQuery(query) {
  Array.from(cardContainer.children).forEach((card) => {
    // If it does NOT include the query, add "hide" class
    console.log(card);

    if (
      !card
        .querySelector("#title")
        .innerText.toLowerCase()
        .includes(query.toLowerCase())
    ) {
      card.classList.add("hide");
    } else {
      card.classList.remove("hide");
    }
  });
}

//seraching element with the help of throtling concept
const throttled = throttle(searchQuery, 300);

search.addEventListener("input", (e) => {
  throttled(e.target.value);
  console.log("gog");
});

function throttle(fn, delay) {
  let isRunning;
  return function (...args) {
    if (!isRunning) {
      fn.apply(this, args);
      isRunning = true;
      setTimeout(() => {
        isRunning = false;
      }, delay);
    }
  };
}

fetchdata();
