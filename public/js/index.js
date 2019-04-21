'use strict';

const giphyUrl = 'https://api.giphy.com/v1/gifs/';
const apiKey = 'api_key=GxP3rAWWiabibTsL3i2Fj2R2g2u8DFQV';

const searchButton = document.getElementById('search_button');
const randomButton = document.getElementById('random_button');
const trendingButton = document.getElementById('trending_button');

const searchString = document.getElementById('search_bar');
const searchForm = document.getElementById('search_form');
let columnHeights = [0, 0, 0, 0, 0];
const columnIds = [0, 1, 2, 3, 4];

const getShortestColumn = () => {
  const index = columnHeights.reduce((lowest, columnHeight, currentIndex) => {
    if (columnHeight < columnHeights[lowest]) {
      return currentIndex;
    }
    return lowest;
  }, 0);

  return index;
};

const addImage = (image) => {
  const columnId = String(getShortestColumn(columnHeights));
  const imgColumn = document.getElementById(columnId);
  imgColumn.appendChild(image);
  columnHeights[columnId] += image.height;
};

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      const message = 'Could not load image at ' + url;
      reject(message);
    };
    image.src = url;
  });
};

const fetchJson = (url) => {
  fetch(url)
    .then(response => response.json())
    .then((imageResult) => {
      imageResult.data.forEach((result) => {
        const resultUrl = String(result.images.fixed_width.url);
        loadImage(resultUrl)
          .then((resolvedImage) => {
            addImage(resolvedImage);
          });
      });
    });
}

const fetchRandom = (url) => {
  fetch(url)
    .then(response => response.json())
    .then((imageResult) => {
      const resultUrl = String(imageResult.data.images.fixed_width.url);
      loadImage(resultUrl)
        .then((resolvedImage) => {
          addImage(resolvedImage);
        });
    });
}

const submitSearch = (search) => {
  const url = (giphyUrl + 'search?' + apiKey + '&q=' + search.value + '&limit=50&offset=0&rating=R&lang=en');
  columnIds.forEach((resultsColumn) => {
    document.getElementById(resultsColumn).innerHTML = '';
    columnHeights = [0, 0, 0, 0, 0];
  });
  fetchJson(url);
};

const submitRandom = () => {
  const url = (giphyUrl  + 'random?' + apiKey + '&offset=0&rating=R&lang=en');
  columnIds.forEach((resultsColumn) => {
    document.getElementById(resultsColumn).innerHTML = '';
    columnHeights = [0, 0, -1, 0, 0];
  });
  fetchRandom(url);
};

const submitTrending = () => {
  const url = (giphyUrl  + 'trending?' + apiKey + '&limit=50&offset=0&rating=R&lang=en');
  columnIds.forEach((resultsColumn) => {
    document.getElementById(resultsColumn).innerHTML = '';
    columnHeights = [0, 0, 0, 0, 0];
  });
  fetchJson(url);
};

searchButton.addEventListener('click', () => { submitSearch(searchString); });
randomButton.addEventListener('click', () => { submitRandom(searchString); });
trendingButton.addEventListener('click', () => { submitTrending(searchString); });

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitSearch(searchString);
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  let navbar = document.getElementById("gift-navbar");
  /* let sticky = navbar.offsetTop ;

  if (window.pageYOffset >= sticky) {
    navbar.style.display = "block";
    navbar.classList.add("sticky");
  }
  else {
    navbar.style.removeProperty("display");
    navbar.classList.remove("sticky");
  } */

  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("backtotop").style.display = "block";
    navbar.style.display = "block";
    navbar.classList.add("sticky");
  } else {
    document.getElementById("backtotop").style.display = "none";
    navbar.style.removeProperty("display");
    navbar.classList.remove("sticky");
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

}