window.onload = function() {
    const container = document.getElementById("container");
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
        
    const titleElement = document.createElement('p');
    titleElement.innerText = title;
    container.appendChild(titleElement);
}