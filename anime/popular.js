
const url = "https://api.jikan.moe/v4/top/anime";

const animeSection = document.getElementById("animeSection");
var popularAnimeArr = [];

const max_retries = 10;

function reFetch(url, retries = max_retries) {
    return fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response.data && response.data.length > 0){
                return response;
            }else if(retries > 0){
                return reFetch(url, retries - 1);
            }else{
                throw new Error("No data found:" + url);
            }
        })
}

var page = 1;

document.addEventListener("DOMContentLoaded", function() {
    function fetchPages(count = 54){

        
        return reFetch(url + `?page=${page}`)
            .then(response => {
                let itemsAdded = 0;

                for(let i = 0; i < response.data.length; i++){
                    if (!popularAnimeArr.some(item => item.mal_id === response.data[i].mal_id)) {
                        if (!response.data[i].rating.includes("Rx")){
                            popularAnimeArr.push(response.data[i]);
                            animeSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + response.data[i].mal_id + "'><img src='" + response.data[i].images.jpg.image_url + "'></a><p>" + response.data[i].title + "</p></div>";
                            itemsAdded++;
                        }


                        if (itemsAdded >= count){
                            break;
                        }
                    }
                }

                if (itemsAdded === 0){
                    document.getElementById("loadMore").style.display = "none";
                    return;
                }
                
                if (itemsAdded < count){
                    page++;
                    console.log(url + `?page=${page} : ${popularAnimeArr.length}`);
                    return fetchPages(count - itemsAdded);
                } else {
                    page++;
                }

            })
            .catch(error => {
                console.log(error);
            });
    }

    fetchPages();
    

    document.getElementById("loadMore").addEventListener("click", function() {
        fetchPages();
    });
});