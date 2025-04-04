function fetchRandom(type){
    const apiUrl = `https://api.jikan.moe/v4/random/${type}`;
    fetch (apiUrl)
        .then(response => response.json())
        .then(response => {
            const currentPath = window.location.pathname;
            if (currentPath.includes(`/${type}`)){
                window.location.href="selection.html?id=" + response.data.mal_id;
            }else if(currentPath.includes(`/${type === "anime" ? "manga" : "anime"}`)){ 
                window.location.href=`../${type}/selection.html?id=` + response.data.mal_id;
            } else{
                window.location.href=`${type}/selection.html?id=` + response.data.mal_id;
            }
        })
        .catch(error => {
            console.log("Error: " + error);
        });
}

document.getElementById("randomAnimeButton").addEventListener("click", function(event) {
    event.preventDefault();
    fetchRandom("anime");
});

document.getElementById("randomMangaButton").addEventListener("click", function(event) {
    event.preventDefault();
    fetchRandom("manga");
});