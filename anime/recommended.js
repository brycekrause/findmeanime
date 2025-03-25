
const url = "https://api.jikan.moe/v4/recommendations/anime";

const animeSection = document.getElementById("animeSection");
var recommendedAnimeArr = [];

document.addEventListener("DOMContentLoaded", function() {
    return fetch(url)
    .then(response => response.json())
    .then(response => {
        
        for(var i = 0; i < 54; i++){
            if (response.data[i].entry[0].mal_id == response.data[i+1].entry[0].mal_id){
                recommendedAnimeArr.push(response.data[i].entry[1]);
            }else{
                recommendedAnimeArr.push(response.data[i].entry[0]);
            }
            
        }
        for(var i = 0; i < recommendedAnimeArr.length; i++){
            animeSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + recommendedAnimeArr[i].mal_id + "'><img src='" + recommendedAnimeArr[i].images.jpg.image_url + "'></a><p>" + recommendedAnimeArr[i].title + "</p></div>";
        }
    });
});