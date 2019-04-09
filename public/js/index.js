let giphy_url="https://api.giphy.com/v1/gifs/search?"
let api_key="api_key=GxP3rAWWiabibTsL3i2Fj2R2g2u8DFQV"

let search_button = document.getElementById("search_button")
let search_string = document.getElementById("search_bar")
let search_form = document.getElementById("search_form")
let column_heights = [0,0,0,0,0]
let column_ids = [0,1,2,3,4]

search_button.addEventListener("click", function() {submit(search_string)});

search_form.addEventListener("submit", (event) => {
    event.preventDefault()
    submit(search_string)
})

let get_shortest_column = (column_heights) => {
    let index = column_heights.reduce((lowest, column_height, currentIndex) => {
        if (column_height < column_heights[lowest]){
            lowest = currentIndex
        }
        return lowest
    }, 0)

    return index
}

let loadImage = (url) => {
    return new Promise((resolve, reject) => {
        let image = new Image()

        image.onload = function() {
            addImage(image.src)
            resolve(image)
        }

        image.onerror = function() {
            let message =
                'Could not load image at ' + url
            reject(image)
        }
        image.src = url
    })
}

let addImage = (src) => {
    let imgElement = document.createElement("img")
    imgElement.src = src

    let column_id = String(get_shortest_column(column_heights))
    let img_column = document.getElementById(column_id)
    img_column.appendChild(imgElement)
    column_heights[column_id] += imgElement.height
}

function submit(search_string) {

    let url=giphy_url + api_key + "&q=" + search_string.value + "&limit=200&offset=0&rating=R&lang=en"
    let result_url

    column_ids.forEach(function(results_column){
        document.getElementById(results_column).innerHTML = ''
    });
    
    $.getJSON(url, function(result){
        result.data.map(result => {
            result_url = String(result.images.fixed_width.url)
            loadImage(result_url)
        })    
    })   
}
