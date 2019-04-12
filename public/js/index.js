'use strict';

const giphyUrl = 'https://api.giphy.com/v1/gifs/search?';
const apiKey = 'api_key=GxP3rAWWiabibTsL3i2Fj2R2g2u8DFQV';

const searchButton = document.getElementById('search_button');
const searchString = document.getElementById('search_bar');
const searchForm = document.getElementById('search_form');
const columnHeights = [0, 0, 0, 0, 0];
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
  });

  $.getJSON(url, (result) => {
    result.data.forEach((imgageResult) => {
      const resultUrl = String(imgageResult.images.fixed_width.url);
      loadImage(resultUrl)
        .then((resolvedValue) => {
          addImage(resolvedValue);
        });
    });
  });
};

searchButton.addEventListener('click', () => { submit(searchString); });
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submit(searchString);
});
