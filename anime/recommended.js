
const url = "https://api.jikan.moe/v4/recommendations/anime";
document.addEventListener("DOMContentLoaded", function() {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
});