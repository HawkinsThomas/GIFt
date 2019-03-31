let giphy_url="https://api.giphy.com/v1/gifs/search?";
let api_key="api_key=GxP3rAWWiabibTsL3i2Fj2R2g2u8DFQV";

let search_button = document.getElementById("search_button");
let search_string = document.getElementById("search_bar");
let column_heights = [0,0,0,0,0];
let column_ids = [0,1,2,3,4];

search_button.addEventListener("click", function() {submit(search_string)});

function get_shortest_column(column_heights){
    let lowest = 0;
    for (let i = 1; i < column_heights.length; i++){
        if (column_heights[i] < column_heights[lowest]){
            lowest = i;
        }
    }
    return lowest;
}

function submit(search_string) {

    let url=giphy_url + api_key + "&q=" + search_string.value + "&limit=150&offset=0&rating=R&lang=en";
    let result_url;
    let column_id = 0;
    let results_columns = document.getElementsByClassName("result-column");

    column_ids.forEach(function(results_column){
        document.getElementById(results_column).innerHTML = '';
    });
    
    $.getJSON(url, function(result){
        for (let i=0; i<result.data.length; i++){
            if (i >= 30){
                column_id = get_shortest_column(column_heights);
            }
            else{
                column_id = column_id == 4 ? 0 : column_id + 1;
            }
            result_url = String(result.data[i].images.fixed_width.url);
            let result_img_height = parseInt(result.data[i].images.fixed_width.height);
            
            column_heights[column_id] += result_img_height;
            document.getElementById(column_id).innerHTML += `<img src=${result_url}>`;
        }
    });
}
