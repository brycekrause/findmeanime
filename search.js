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
    indexSearchBar.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            indexSearch.click();
        }
    });

    indexSearch.addEventListener("click", function() {
        const currentPath = window.location.pathname;
        if (typeDropdown.value == 0) {
            if (currentPath.includes("/anime")){
                window.location.href="search.html?search=" + indexSearchBar.value;
            }else if(currentPath.includes("/manga")){
                window.location.href="../anime/search.html?search=" + indexSearchBar.value;
            }else{
                window.location.href="anime/search.html?search=" + indexSearchBar.value;
            }
        } else if (typeDropdown.value == 1) {
            if (currentPath.includes("/manga")){
                window.location.href="search.html?search=" + indexSearchBar.value;
            }else if(currentPath.includes("/anime")){
                window.location.href="../manga/search.html?search=" + indexSearchBar.value;
            }else{
                window.location.href="manga/search.html?search=" + indexSearchBar.value;
            }
        }
    });
});