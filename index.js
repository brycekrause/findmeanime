popularAnimeContainer = document.getElementById("popularAnimeDiv"); // https://api.jikan.moe/v4/top/anime
recommendedAnimeContainer = document.getElementById("recommendedAnimeDiv"); // https://api.jikan.moe/v4/recommendations/anime 
// https://api.jikan.moe/v4/random/anime

popularAnimeArr = [];
recommendedAnimeArr = [];

popularMangaContainer = document.getElementById("popularMangaDiv"); // https://api.jikan.moe/v4/top/manga
recommendedMangaContainer = document.getElementById("recommendedMangaDiv"); // https://api.jikan.moe/v4/recommendations/manga
// https://api.jikan.moe/v4/random/manga

popularMangaArr = [];
recommendedMangaArr = [];

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
                popularAnimeContainer.innerHTML += "<div class='optionContainer'><a href='anime/selection.html?id=" + popularAnimeArr[i].mal_id + "'><img src='" + popularAnimeArr[i].images.jpg.image_url + "'></a><p>" + popularAnimeArr[i].title + "</p></div>";
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
            }
            for (var i = 0; i < recommendedAnimeArr.length; i++) {
                recommendedAnimeContainer.innerHTML += "<div class='optionContainer'><a href='anime/selection.html?id=" + recommendedAnimeArr[i].mal_id + "'><img src='" + recommendedAnimeArr[i].images.jpg.image_url + "'></a><p>" + recommendedAnimeArr[i].title + "</p></div>";
            }
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
            for (var i = 0; i < 5; i++) {
                popularMangaArr.push(response.data[i]);
            }
            for (var i = 0; i < popularMangaArr.length; i++) {
                popularMangaContainer.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + popularMangaArr[i].mal_id + "'><img src='" + popularMangaArr[i].images.jpg.image_url + "'></a><p>" + popularMangaArr[i].title + "</p></div>";
            }
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
            for (var i = 0; i < 5; i++) {
                recommendedMangaArr.push(response.data[i].entry[0]);
                console.log(recommendedMangaArr[i].images.jpg.image_url);
            }
            for (var i = 0; i < recommendedAnimeArr.length; i++) {
                recommendedMangaContainer.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + recommendedMangaArr[i].mal_id + "'><img src='" + recommendedMangaArr[i].images.jpg.image_url + "'></a><p>" + recommendedMangaArr[i].title + "</p></div>";
            }
        })
        .catch(error => {
            console.log(error);
        });
});