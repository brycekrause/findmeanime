
const url = "https://api.jikan.moe/v4/top/manga";

const mangaSection = document.getElementById("mangaSection");
var popularMangaArr = [];

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

        if (popularMangaArr.length >= 54){
            return Promise.resolve();
        }
        
        console.log(url + `?page=${page} : ${popularMangaArr.length}`);
        return reFetch(url + `?page=${page}`)
            .then(response => {
                for(let i = 0; i < response.data.length; i++){
                    if (!popularMangaArr.some(item => item.mal_id === response.data[i].mal_id)) {
                        popularMangaArr.push(response.data[i]);
                    }

                    if(popularMangaArr.length >= 54){
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
        for(var i = 0; i < popularMangaArr.length; i++){
            mangaSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + popularMangaArr[i].mal_id + "'><img src='" + popularMangaArr[i].images.jpg.image_url + "'></a><p>" + popularMangaArr[i].title + "</p></div>";
        }
    });

});

function paginationControls(){
    if (topPaginationControls) { topPaginationControls.remove(); }
    if (bottomPaginationControls) { bottomPaginationControls.remove(); }

    topPaginationControls = document.createElement("div")
    topPaginationControls.id = "topPaginationControls";
    bottomPaginationControls = document.createElement("div");
    bottomPaginationControls.id = "bottomPaginationControls";

    const prevButton = document.createElement("button");
    prevButton.innerHTML = "Previous";
    prevButton.addEventListener("click", () => {
        if (currentPage > 1){
            currentPage--;
            fetchPages();
        }
    });

    const nextButton = document.createElement("button");
    nextButton.innerHTML = "Next";
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages){
            currentPage++;
            fetchPages();
        }
    });

    topPaginationControls.appendChild(prevButton);
    topPaginationControls.appendChild(nextButton);

    bottomPaginationControls.appendChild(prevButton.cloneNode(true));
    bottomPaginationControls.appendChild(nextButton.cloneNode(true));

}