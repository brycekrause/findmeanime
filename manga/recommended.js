
const url = "https://api.jikan.moe/v4/recommendations/manga";

const mangaSection = document.getElementById("mangaSection");
var recommendedMangaArr = [];

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
                    if (!recommendedMangaArr.some(item => item.mal_id === response.data[i].entry[0].mal_id)) {
                        recommendedMangaArr.push(response.data[i].entry[0]);
                        mangaSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + response.data[i].entry[0].mal_id + "'><img src='" + response.data[i].entry[0].images.jpg.image_url + "'></a><p>" + response.data[i].entry[0].title + "</p></div>";
                        itemsAdded++;
                        console.log(response.data[i].entry[0].mal_id);
                    } 

                    if (!recommendedMangaArr.some(item => item.mal_id === response.data[i].entry[1].mal_id)) {
                        recommendedMangaArr.push(response.data[i].entry[1]);
                        mangaSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + response.data[i].entry[1].mal_id + "'><img src='" + response.data[i].entry[1].images.jpg.image_url + "'></a><p>" + response.data[i].entry[1].title + "</p></div>";
                        itemsAdded++;
                        console.log(response.data[i].entry[1].mal_id);
                    }

                    if (itemsAdded >= count){
                        break;
                    }
                }

                if (itemsAdded === 0){
                    document.getElementById("loadMore").style.display = "none";
                    return;
                }
                
                if (itemsAdded < count){
                    page++;
                    console.log(url + `?page=${page} : ${recommendedMangaArr.length}`);
                    return fetchPages(count - itemsAdded);
                } else {
                    page++;
                    console.log(page);
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