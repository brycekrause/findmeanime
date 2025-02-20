popularAnimeContainer = document.getElementById("popularAnimeDiv"); // https://api.jikan.moe/v4/top/anime
recommendedAnimeContainer = document.getElementById("recommendedAnimeDiv"); // https://api.jikan.moe/v4/recommendations/anime
randomAnimeContainer = document.getElementById("randomAnimeDiv"); // https://api.jikan.moe/v4/random/anime

popularAnimeArr = [];
recommendedAnimeArr = [];
randomAnimeArr = [];

popularMangaContainer = document.getElementById("popularMangaDiv"); // https://api.jikan.moe/v4/top/manga
recommendedMangaContainer = document.getElementById("recommendedMangaDiv"); // https://api.jikan.moe/v4/recommendations/manga
randomMangaContainer = document.getElementById("randomMangaDiv"); // https://api.jikan.moe/v4/random/manga

popularMangaArr = [];
recommendedMangaArr = [];
randomMangaArr = [];

document.addEventListener('DOMContentLoaded', function() {
    // popular anime
    fetch("https://api.jikan.moe/v4/top/anime")
        .then(response => {
            return response.json()
        })
        .then(response => {
            for (var i = 0; i < 5; i++) {
                popularAnimeArr.push(response.data[i]);
            }
            for (var i = 0; i < popularAnimeArr.length; i++) {
                popularAnimeContainer.innerHTML += "<a href='anime.html?id=" + popularAnimeArr[i].mal_id + "'><img src='" + popularAnimeArr[i].images.jpg.image_url + "'></a>";
            }
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
            for (var i = 0; i < 5; i++) {
                recommendedAnimeArr.push(response.data[i].entry[0]);
                console.log(recommendedAnimeArr[i].images.jpg.image_url);
            }
            for (var i = 0; i < recommendedAnimeArr.length; i++) {
                recommendedAnimeContainer.innerHTML += "<img src='" + recommendedAnimeArr[i].images.jpg.image_url + "'>";
            }
        })
        .catch(error => {
            console.log(error);
        });

});