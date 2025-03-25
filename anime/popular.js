
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

document.addEventListener("DOMContentLoaded", function() {
    const fetchPromises = [];
    var page = 1;

    function fetchPages(){

        if (popularAnimeArr.length >= 54){
            return Promise.resolve();
        }
        
        console.log(url + `?page=${page} : ${popularAnimeArr.length}`);
        return reFetch(url + `?page=${page}`)
            .then(response => {
                for(let i = 0; i < response.data.length; i++){
                    if (!popularAnimeArr.some(item => item.mal_id === response.data[i].mal_id)) {
                        popularAnimeArr.push(response.data[i]);
                    }

                    if(popularAnimeArr.length >= 54){
                        break;
                    }
                }
                page++;
                return fetchPages();
            })
            .catch(error => {
                console.log(error);
            });

            
        }

    fetchPages()
    .then(() => {
        for(var i = 0; i < popularAnimeArr.length; i++){
            animeSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + popularAnimeArr[i].mal_id + "'><img src='" + popularAnimeArr[i].images.jpg.image_url + "'></a><p>" + popularAnimeArr[i].title + "</p></div>";
        }
    });

});