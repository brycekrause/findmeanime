const url = "https://api.jikan.moe/v4/manga/";


document.addEventListener("DOMContentLoaded", function() {
    const titleDiv = document.getElementById("titleDiv");
    const scoreDiv = document.getElementById("scoreDiv");
    const typeDiv = document.getElementById("typeDiv");
    const statusDiv = document.getElementById("statusDiv");
    const publishedDiv = document.getElementById("publishedDiv");
    const synopsisDiv = document.getElementById("synopsisDiv");
    const imageDiv = document.getElementById("imageDiv");
    const infoDiv = document.getElementById("infoDiv");
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
        
    const englishTitleElement = document.createElement('p');
    const japaneseTitleElement = document.createElement('p');
    const synopsisElement = document.createElement('p');
    const scoreElement = document.createElement('p');
    const typeElement = document.createElement('p');
    const statusElement = document.createElement('p');
    const publishedElement = document.createElement('p');
    const imageElement = document.createElement('img');



    fetch (url + id)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.error('Error:', error);
        })
            .then(response => {
                let englishTitle = response.data.title;
                let japaneseTitle = response.data.title_japanese;
                let image = response.data.images.jpg.large_image_url;
                let synopsis = response.data.synopsis;
                synopsis = synopsis.split("[")[0];
                let score = response.data.score;
                let type = response.data.type;
                let status = response.data.status;

                if (! response.data.chapters === null) {
                    var chapters = response.data.chapters;
                } else {
                    var chapters = "N/A";
                }
                
                if (! response.data.published.prop.to.year === null) {
                    var published = response.data.published.prop.from.year + "-" + response.data.published.prop.to.year;
                } else {
                    var published = response.data.published.prop.from.year;
                }


                englishTitleElement.innerText = englishTitle;
                japaneseTitleElement.innerText = japaneseTitle;
                synopsisElement.innerText = synopsis;
                scoreElement.innerText = score;
                statusElement.innerText = status;
                typeElement.innerText = `(${type}, ${chapters} Chapters)`;
                publishedElement.innerText = published;
                

                imageElement.src = image;
            }).catch(error => {
                console.error('Error:', error);
            });


    
    titleDiv.appendChild(englishTitleElement);
    titleDiv.appendChild(japaneseTitleElement);
    scoreDiv.appendChild(scoreElement);
    typeDiv.appendChild(typeElement);
    statusDiv.appendChild(statusElement);
    publishedDiv.appendChild(publishedElement);
   
    imageDiv.appendChild(imageElement);
    synopsisDiv.appendChild(synopsisElement);
});