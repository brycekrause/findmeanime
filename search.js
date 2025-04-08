const ratingDropdown = document.getElementById("ratingDropdown");
const genreDropdown = document.getElementById("genreDropdown");
const typeDropdown = document.getElementById("typeDropdown");
const indexSearchBar = document.getElementById("indexSearchBar");
const indexSearch = document.getElementById("indexSearch");

function reFetch(url, retries = max_retries) {
    return fetch(url)
        .then(response => response.json())
        .then(response => {
            if (response.data && response.data.length > 0){
                return response;
            }else if(retries > 0){
                return reFetch(url, retries - 1);
            }else{
                throw new Error("No data found:" + url);
            }
        })
}

document.addEventListener('DOMContentLoaded', function() {
    typeDropdown.value = 0;
    genreDropdown.value = 0;
    ratingDropdown.value = 0;
    indexSearchBar.value = "";

    typeDropdown.addEventListener("change", function() {
        if (typeDropdown.value == 0) {
            genreDropdown.innerHTML = "<option value='0'>Genre</option>";
            genreDropdown.innerHTML += "<option value='1'>All</option>";
        } else if (typeDropdown.value == 1){
            genreDropdown.innerHTML = "<option value='0'>Genre</option>";
            genreDropdown.innerHTML += "<option value='1'>All</option>";
            reFetch("https://api.jikan.moe/v4/genres/anime")
                .then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        genreDropdown.innerHTML += "<option value='" + response.data[i].mal_id + "'>" + response.data[i].name + "</option>";
                    }
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        } else if(typeDropdown.value == 2){
            genreDropdown.innerHTML = "<option value='0'>Genre</option>";
            genreDropdown.innerHTML += "<option value='1'>All</option>";
            reFetch("https://api.jikan.moe/v4/genres/manga")
                .then(response => {
                    for (var i = 0; i < response.data.length; i++) {
                        genreDropdown.innerHTML += "<option value='" + response.data[i].mal_id + "'>" + response.data[i].name + "</option>";
                    }
                })
                .catch(error => {
                    console.log("Error: " + error);
                });
        }
    });

    indexSearchBar.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            indexSearch.click();
        }
    });

    indexSearch.addEventListener("click", function() {
        const currentPath = window.location.pathname;
        if (typeDropdown.value == 0) {
            alert("Please select a type");
        } else if (typeDropdown.value == 1) {
            if (currentPath.includes("/anime")){
                window.location.href="search.html?genre=" + genreDropdown.value + "&rating=" + ratingDropdown.options[ratingDropdown.selectedIndex].text + "&search=" + indexSearchBar.value;
            }else if(currentPath.includes("/manga")){
                window.location.href="../anime/search.html?genre=" + genreDropdown.value + "&rating=" + ratingDropdown.options[ratingDropdown.selectedIndex].text + "&search=" + indexSearchBar.value;
            }else{
                window.location.href="anime/search.html?genre=" + genreDropdown.value + "&rating=" + ratingDropdown.options[ratingDropdown.selectedIndex].text + "&search=" + indexSearchBar.value;
            }
        } else if (typeDropdown.value == 2) {
            if (currentPath.includes("/manga")){
                window.location.href="search.html?genre=" + genreDropdown.value + "&rating=" + ratingDropdown.options[ratingDropdown.selectedIndex].text + "&search=" + indexSearchBar.value;
            }else if(currentPath.includes("/anime")){
                window.location.href="../manga/search.html?genre=" + genreDropdown.value + "&rating=" + ratingDropdown.options[ratingDropdown.selectedIndex].text + "&search=" + indexSearchBar.value;
            }else{
                window.location.href="manga/search.html?genre=" + genreDropdown.options[genreDropdown.selectedIndex].text + "&rating=" + ratingDropdown.options[ratingDropdown.selectedIndex].text + "&search=" + indexSearchBar.value;
            }
        }
    });
});