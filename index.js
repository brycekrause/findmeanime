const animeSection = document.getElementById("animeSection");
const mangaSection = document.getElementById("mangaSection");
const container = document.getElementById("container");

const popularAnimeContainer = document.createElement("div"); // https://api.jikan.moe/v4/top/anime
popularAnimeContainer.id = "popularAnimeDiv";
popularAnimeArr = [];

const recommendedAnimeContainer = document.createElement("div"); // https://api.jikan.moe/v4/recommendations/anime 
recommendedAnimeContainer.id = "recommendedAnimeDiv";
recommendedAnimeArr = [];

const popularMangaContainer = document.createElement("div"); // https://api.jikan.moe/v4/top/manga
popularMangaContainer.id = "popularMangaDiv";
popularMangaArr = [];

const recommendedMangaContainer = document.createElement("div"); // https://api.jikan.moe/v4/recommendations/manga
recommendedMangaContainer.id = "recommendedMangaDiv";
recommendedMangaArr = [];

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

document.addEventListener('DOMContentLoaded', function() {
    // popular anime
    reFetch("https://api.jikan.moe/v4/top/anime")
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                if (!popularAnimeArr.some(item => item.mal_id === response.data[i].mal_id)) {
                    popularAnimeArr.push(response.data[i]);
                }
                if (popularAnimeArr.length >= 6) { break; }
            }
            for (var i = 0; i < 6; i++) {
                popularAnimeContainer.innerHTML += "<div class='optionContainer'><a href='anime/selection.html?id=" + popularAnimeArr[i].mal_id + "'><img src='" + popularAnimeArr[i].images.jpg.image_url + "'></a><p>" + popularAnimeArr[i].title + "</p></div>";
            }
            animeSection.innerHTML += "<h1>Popular Anime</h1>";
            animeSection.appendChild(popularAnimeContainer);
            animeSection.innerHTML += "<a class='moreButton' href='anime/popular.html'>See all popular anime</a>";
        })
        .catch(error => {
            console.log("Error: " + error);
        });

    // recommended anime
    reFetch("https://api.jikan.moe/v4/recommendations/anime")
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                if (!recommendedAnimeArr.some(item => item.mal_id === response.data[i].entry[0].mal_id)) {
                    recommendedAnimeArr.push(response.data[i].entry[0]);
                }
                if (recommendedAnimeArr.length >= 6) { break; }
            }
            for (var i = 0; i < recommendedAnimeArr.length; i++) {
                recommendedAnimeContainer.innerHTML += "<div class='optionContainer'><a href='anime/selection.html?id=" + recommendedAnimeArr[i].mal_id + "'><img src='" + recommendedAnimeArr[i].images.jpg.image_url + "'></a><p>" + recommendedAnimeArr[i].title + "</p></div>";
            }
            animeSection.innerHTML += "<h1>Recommended Anime</h1>";
            animeSection.appendChild(recommendedAnimeContainer);
            animeSection.innerHTML += "<a class='moreButton' href='anime/recommended.html'>See all recommended anime</a>";
        })
        .catch(error => {
            console.log("Error: " + error);
        });

    // popular manga
    reFetch("https://api.jikan.moe/v4/top/manga")
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                if (!popularMangaArr.some(item => item.mal_id === response.data[i].mal_id)) {
                    popularMangaArr.push(response.data[i]);
                }
                if (popularMangaArr.length >= 6) { break; }
            }
            for (var i = 0; i < popularMangaArr.length; i++) {
                popularMangaContainer.innerHTML += "<div class='optionContainer'><a href='manga/selection.html?id=" + popularMangaArr[i].mal_id + "'><img src='" + popularMangaArr[i].images.jpg.image_url + "'></a><p>" + popularMangaArr[i].title + "</p></div>";
            }
            mangaSection.innerHTML += "<h1>Popular Manga</h1>";
            mangaSection.appendChild(popularMangaContainer);
            mangaSection.innerHTML += "<a class='moreButton' href='manga/popular.html'>See all popular manga</a>";
        })
        .catch(error => {
            console.log("Error: " + error);
        });

    // recommended manga
    reFetch("https://api.jikan.moe/v4/recommendations/manga")
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                if (!recommendedMangaArr.some(item => item.mal_id === response.data[i].entry[0].mal_id)) {
                    recommendedMangaArr.push(response.data[i].entry[0]);
                }
                if (recommendedMangaArr.length >= 6) { break; }
            }
            for (var i = 0; i < recommendedMangaArr.length; i++) {
                recommendedMangaContainer.innerHTML += "<div class='optionContainer'><a href='manga/selection.html?id=" + recommendedMangaArr[i].mal_id + "'><img src='" + recommendedMangaArr[i].images.jpg.image_url + "'></a><p>" + recommendedMangaArr[i].title + "</p></div>";
            }
            mangaSection.innerHTML += "<h1>Recommended Manga</h1>";
            mangaSection.appendChild(recommendedMangaContainer);
            mangaSection.innerHTML += "<a class='moreButton' href='manga/recommended.html'>See all recommended manga</a>";
        })
        .catch(error => {
            console.log("Error: " + error);
        });
});