const url = "https://api.jikan.moe/v4/manga/";


document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");
    const headerDiv = document.getElementById("headerDiv");
    const titleDiv = document.getElementById("titleDiv");
    const scoreDiv = document.getElementById("scoreDiv");
    const infoDiv = document.getElementById("infoDiv");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
        
    const englishTitleElement = document.createElement('p');
    const japaneseTitleElement = document.createElement('p');
    const synopsisElement = document.createElement('p');
    const scoreElement = document.createElement('p');
    const imageElement = document.createElement('img');



    fetch (url + id)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.error('Error:', error);
        })
            .then(response => {
                let englishTitle = response.data.titles[0].title;
                let japaneseTitle = response.data.titles[1].title;
                let image = response.data.images.jpg.large_image_url;
                let episodes = response.data.episodes;
                let synopsis = response.data.synopsis;
                synopsis = synopsis.split("[")[0];
                let score = response.data.score;


                englishTitleElement.innerText = englishTitle;
                japaneseTitleElement.innerText = japaneseTitle;
                synopsisElement.innerText = synopsis;
                scoreElement.innerText = score;
                imageElement.src = image;
            }).catch(error => {
                console.error('Error:', error);
            });


    
    titleDiv.appendChild(englishTitleElement);
    titleDiv.appendChild(japaneseTitleElement);
    scoreDiv.appendChild(scoreElement);
   
    infoDiv.appendChild(imageElement);
    infoDiv.appendChild(synopsisElement);
});