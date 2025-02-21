const url = "https://api.jikan.moe/v4/anime/";


document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");
    const headerDiv = document.getElementById("headerDiv");
    const titleDiv = document.getElementById("titleDiv");
    const airedDiv = document.getElementById("airedDiv");
    const ratingDiv = document.getElementById("ratingDiv");
    const typeDiv = document.getElementById("typeDiv");
    const scoreDiv = document.getElementById("scoreDiv");
    const infoDiv = document.getElementById("infoDiv");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
        
    const englishTitleElement = document.createElement('p');
    const japaneseTitleElement = document.createElement('p');
    const typeElement = document.createElement('p');
    const airedElement = document.createElement('p');
    const ratingElement = document.createElement('p');
    const synopsisElement = document.createElement('p');
    const scoreElement = document.createElement('p');
    const imageElement = document.createElement('img');



    fetch (url + id)
        .then(response => {
            return response.json()
        })
            .then(response => {
                let englishTitle = response.data.title_english;
                let japaneseTitle = response.data.title_japanese;
                let image = response.data.images.jpg.large_image_url;
                let type = response.data.type;
                let episodes = response.data.episodes;
                let rating = response.data.rating;
                rating = rating.split(" - ")[0];
                let synopsis = response.data.synopsis;
                synopsis = synopsis.split("[")[0];
                let score = response.data.score;

                if (type === "Movie") {
                    var aired = response.data.aired.prop.from.year;
                } else if (type === "TV") {
                    var aired = response.data.aired.prop.from.year + "-" + response.data.aired.prop.to.year;
                } else {
                    var aired = response.data.aired.string;
                }


                englishTitleElement.innerText = englishTitle;
                japaneseTitleElement.innerText = japaneseTitle;
                typeElement.innerText = `(${type} ${episodes} Eps)`;
                airedElement.innerText = aired;
                ratingElement.innerText = rating;
                synopsisElement.innerText = synopsis;
                scoreElement.innerText = score;
                imageElement.src = image;
            });


    
    titleDiv.appendChild(englishTitleElement);
    titleDiv.appendChild(japaneseTitleElement);
    airedDiv.appendChild(airedElement);
    typeDiv.appendChild(typeElement);
    ratingDiv.appendChild(ratingElement);
    scoreDiv.appendChild(scoreElement);
   
    infoDiv.appendChild(imageElement);
    infoDiv.appendChild(synopsisElement);
});