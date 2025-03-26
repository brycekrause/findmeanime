
const url = "https://api.jikan.moe/v4/recommendations/manga";

const mangaSection = document.getElementById("mangaSection");
var recommendedMangaArr = [];

document.addEventListener("DOMContentLoaded", function() {
    return fetch(url)
    .then(response => response.json())
    .then(response => {
        
        for(var i = 0; i < 54; i++){
            if (response.data[i].entry[0].mal_id == response.data[i+1].entry[0].mal_id){
                recommendedMangaArr.push(response.data[i].entry[1]);
            }else{
                recommendedMangaArr.push(response.data[i].entry[0]);
            }
            
        }
        for(var i = 0; i < recommendedMangaArr.length; i++){
            mangaSection.innerHTML += "<div class='optionContainer'><a href='selection.html?id=" + recommendedMangaArr[i].mal_id + "'><img src='" + recommendedMangaArr[i].images.jpg.image_url + "'></a><p>" + recommendedMangaArr[i].title + "</p></div>";
        }
    });
});