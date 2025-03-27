
const url = "https://api.jikan.moe/v4/top/manga";

const mangaSection = document.getElementById("mangaSection");
var popularMangaArr = [];
var page = 1;
var isFetching = false;

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
    function fetchPages(count = 54){

        
        return reFetch(url + `?page=${page}`)
            .then(response => {
                let itemsAdded = 0;

                for(let i = 0; i < response.data.length; i++){
                    if (!popularMangaArr.some(item => item.mal_id === response.data[i].mal_id)) {
                        popularMangaArr.push(response.data[i]);
                        mangaSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + response.data[i].mal_id + "'><img src='" + response.data[i].images.jpg.image_url + "'></a><p>" + response.data[i].title + "</p></div>";
                        itemsAdded++;

                        if (itemsAdded >= count){
                            break;
                        }
                    }
                }
                
                if (itemsAdded < count){
                    page++;
                    console.log(url + `?page=${page} : ${popularMangaArr.length}`);
                    return fetchPages(count - itemsAdded);
                } else {
                    page++;
                }

            })
            .catch(error => {
                console.log(error);
            });
    }

    fetchPages()
    

    document.getElementById("loadMore").addEventListener("click", function() {
        fetchPages();
    });
});