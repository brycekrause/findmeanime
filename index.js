const animeSection = document.getElementById("animeSection");
const mangaSection = document.getElementById("mangaSection");
const container = document.getElementById("container");

const popularAnimeContainer = document.createElement("div"); // https://api.jikan.moe/v4/top/anime
popularAnimeContainer.id = "popularAnimeDiv";
popularAnimeContainer.style.visibility = "hidden";
popularAnimeArr = [];

const recommendedAnimeContainer = document.createElement("div"); // https://api.jikan.moe/v4/recommendations/anime 
recommendedAnimeContainer.id = "recommendedAnimeDiv";
recommendedAnimeContainer.style.visibility = "hidden";
recommendedAnimeArr = [];
// https://api.jikan.moe/v4/random/anime



const popularMangaContainer = document.createElement("div"); // https://api.jikan.moe/v4/top/manga
popularMangaContainer.id = "popularMangaDiv";
popularMangaContainer.style.visibility = "hidden";
popularMangaArr = [];

const recommendedMangaContainer = document.createElement("div"); // https://api.jikan.moe/v4/recommendations/manga
recommendedMangaContainer.id = "recommendedMangaDiv";
recommendedMangaContainer.style.visibility = "hidden";
recommendedMangaArr = [];
// https://api.jikan.moe/v4/random/manga




document.addEventListener('DOMContentLoaded', function() {
    // popular anime
    fetch("https://api.jikan.moe/v4/top/anime")
        .then(response => {
            return response.json()
        })
        .then(response => {
            for (var i = 0; i < 6; i++) {
                popularAnimeArr.push(response.data[i]);
            }
            for (var i = 0; i < popularAnimeArr.length; i++) {
                popularAnimeContainer.innerHTML += "<div class='optionContainer'><a href='anime/selection.html?id=" + popularAnimeArr[i].mal_id + "'><img src='" + popularAnimeArr[i].images.jpg.image_url + "'></a><p>" + popularAnimeArr[i].title + "</p></div>";
            }
            animeSection.innerHTML += "<h1>Popular Anime</h1>";
            animeSection.appendChild(popularAnimeContainer);
            animeSection.innerHTML += "<a class='moreButton' href='anime/popular.html'>See all popular anime</a>";
        })
        .catch(error => {
            console.log(error);
        });

    // recommended anime
    fetch("https://api.jikan.moe/v4/recommendations/anime")
        .then(response => {
            return response.json()
        })
        .then(response => {
            for (var i = 0; i < 6; i++) {
                recommendedAnimeArr.push(response.data[i].entry[0]);
            }
            for (var i = 0; i < recommendedAnimeArr.length; i++) {
                recommendedAnimeContainer.innerHTML += "<div class='optionContainer'><a href='anime/selection.html?id=" + recommendedAnimeArr[i].mal_id + "'><img src='" + recommendedAnimeArr[i].images.jpg.image_url + "'></a><p>" + recommendedAnimeArr[i].title + "</p></div>";
            }
            animeSection.innerHTML += "<h1>Recommended Anime</h1>";
            animeSection.appendChild(recommendedAnimeContainer);
            animeSection.innerHTML += "<a class='moreButton' href='anime/recommended.html'>See all recommended anime</a>";
        })
        .catch(error => {
            console.log(error);
        });

    // popular manga
    fetch("https://api.jikan.moe/v4/top/manga")
        .then(response => {
            return response.json()
        })
        .then(response => {
            for (var i = 0; i < 6; i++) {
                popularMangaArr.push(response.data[i]);
            }
            for (var i = 0; i < popularMangaArr.length; i++) {
                popularMangaContainer.innerHTML += "<div class='optionContainer'><a href='manga/selection.html?id=" + popularMangaArr[i].mal_id + "'><img src='" + popularMangaArr[i].images.jpg.image_url + "'></a><p>" + popularMangaArr[i].title + "</p></div>";
            }
            mangaSection.innerHTML += "<h1>Popular Manga</h1>";
            mangaSection.appendChild(popularMangaContainer);
            mangaSection.innerHTML += "<a class='moreButton' href='manga/popular.html'>See all popular manga</a>";
        })
        .catch(error => {
            console.log(error);
        });

    // recommended manga
    fetch("https://api.jikan.moe/v4/recommendations/manga")
        .then(response => {
            return response.json()
        })
        .then(response => {
            for (var i = 0; i < 6; i++) {
                recommendedMangaArr.push(response.data[i].entry[0]);
                console.log(recommendedMangaArr[i].images.jpg.image_url);
            }
            for (var i = 0; i < recommendedAnimeArr.length; i++) {
                recommendedMangaContainer.innerHTML += "<div class='optionContainer'><a href='manga/selection.html?id=" + recommendedMangaArr[i].mal_id + "'><img src='" + recommendedMangaArr[i].images.jpg.image_url + "'></a><p>" + recommendedMangaArr[i].title + "</p></div>";
            }
            mangaSection.innerHTML += "<h1>Recommended Manga</h1>";
            mangaSection.appendChild(recommendedMangaContainer);
            mangaSection.innerHTML += "<a class='moreButton' href='manga/recommended.html'>See all recommended manga</a>";
        })
        .catch(error => {
            console.log(error);
        });

    popularAnimeContainer.style.visibility = "visible";
    recommendedAnimeContainer.style.visibility = "visible";
    popularMangaContainer.style.visibility = "visible";
    recommendedMangaContainer.style.visibility = "visible";
});