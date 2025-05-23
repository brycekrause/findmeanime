const url = "https://api.jikan.moe/v4/manga?q=";
const mangaSection = document.getElementById("mangaSection");
var searchedMangaArr = [];
const searchTerm = document.getElementById("searchTerm");

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
                document.getElementById("loadMore").style.display = "none";
                throw new Error("No data found:" + url);
            }
        })
}

var page = 1

const params = new URLSearchParams(window.location.search);
const search = params.get('search') ? params.get('search').replace("-", "") : "";

document.addEventListener("DOMContentLoaded", function() {
    typeDropdown.value = 1;
    indexSearchBar.value = search;
    searchTerm.innerHTML = search;
    function fetchPages(){
        return reFetch(url + `${search}&page=${page}`)
            .then(response => {
                let itemsAdded = 0;

                for(let i = 0; i < response.data.length; i++){
                    if (!searchedMangaArr.some(item => item.mal_id === response.data[i].mal_id)) {
                        searchedMangaArr.push(response.data[i]);
                        mangaSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + response.data[i].mal_id + "'><img src='" + response.data[i].images.jpg.image_url + "'></a><p>" + response.data[i].title + "</p></div>";
                        itemsAdded++;
                        console.log(response.data[i].mal_id);
                        document.getElementById("loadMore").style.display = "block";
                    } 
                }

                
                if (response.pagination.has_next_page == false){
                    document.getElementById("loadMore").style.display = "none";
                }else{
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