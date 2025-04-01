document.getElementById("randomAnimeButton").addEventListener("click", function(event) {
    event.preventDefault();
    fetch("https://api.jikan.moe/v4/random/anime")
        .then(response => response.json())
        .then(response => {
            window.location.href="anime/selection.html?id=" + response.data.mal_id;
        })
        .catch(error => {
            console.log("Error: " + error);
        });
});

document.getElementById("randomMangaButton").addEventListener("click", function(event) {
    event.preventDefault();
    fetch("https://api.jikan.moe/v4/random/manga")
        .then(response => response.json())
        .then(response => {
            window.location.href="manga/selection.html?id=" + response.data.mal_id;
        })
        .catch(error => {
            console.log("Error: " + error);
        });
});