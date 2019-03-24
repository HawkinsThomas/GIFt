let giphy_url="https://api.giphy.com/v1/gifs/search?";
let api_key="api_key=GxP3rAWWiabibTsL3i2Fj2R2g2u8DFQV";

let search_button = document.getElementById("search_button");
let search_string = document.getElementById("search_bar");


search_button.addEventListener("click", function() {submit(search_string)});

function submit(search_string) {

    let url=giphy_url + api_key + "&q=" + search_string.value + "&limit=20&offset=0&rating=R&lang=en";
    console.log(url)
    let result_url;

    $.getJSON(url, function(result){
        for (let i=0; i<result.data.length; i++){
            let display_id = "result" + String(i + 1);
            console.log(display_id);
            result_url = String(result.data[i].images.fixed_width.url);
            console.log(result.data[i].images.fixed_width.url);
            let display_element= document.getElementById(display_id);
            display_element.src=result_url;
        }
    });

    
}
