'use strict';

const giphyUrl = 'https://api.giphy.com/v1/gifs/search?';
const apiKey = 'api_key=GxP3rAWWiabibTsL3i2Fj2R2g2u8DFQV';

const searchButton = document.getElementById('search_button');
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

const submit = (search) => {
  const url = (giphyUrl + apiKey + '&q=' + search.value + '&limit=50&offset=0&rating=R&lang=en');
  columnIds.forEach((resultsColumn) => {
    document.getElementById(resultsColumn).innerHTML = '';
    columnHeights = [0, 0, 0, 0, 0];
  });

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
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backtotop").style.display = "block";
  } else {
    document.getElementById("backtotop").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onscroll = function() {scrollFunction()};
searchButton.addEventListener('click', () => { submit(searchString); });
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submit(searchString);
});
