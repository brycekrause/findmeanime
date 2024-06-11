const url = "https://api.jikan.moe/v4/anime?q=";
// &page=

function search() {
    let container = document.getElementById("container");

    // delete old data
    document.getElementById("container").innerHTML = "";

    // use the search box
    var text = document.getElementById("search").value;
    document.getElementById("result").innerHTML = "Search results for " + text;

    // get json data from api!
    fetch(url + text)
        .then(response => {
            return response.json();
          })
          .then(response => {
            let arrTitles = [];
            let arrImages = [];
            let arrYear = [];

            // get data & put in an array
            for (var i = 0; i < response.pagination.items.count; ++i) {
                if (response.data[i].rating == "Rx - Hentai" || response.data[i].rating == "R+ - Mild Nudity") {
                    null;
                } else {
                    try {
                        arrTitles.push(response.data[i].title);
                        arrImages.push(response.data[i].images.jpg.image_url);
                        arrYear.push(response.data[i].year);
                    } catch (error){
                        null;
                    }
                }

            }

            // put data on page
            for (i = 0; i < arrTitles.length; ++i) {

                let div = document.createElement('div');
                div.id = i;
                container.appendChild(div);

                let dataContainer = document.getElementById(i);

                let img = document.createElement('img');
                img.src = arrImages[i]
                dataContainer.appendChild(img);

                let li = document.createElement('p');
                li.innerText = arrTitles[i];
                dataContainer.appendChild(li);

                let eps = document.createElement('p');
                eps.innerText = arrYear[i];
                dataContainer.appendChild(eps);
            }
          })
          .catch(error => {
            console.log('Error:', error);
            document.getElementById("result").innerHTML = error;
          });
}

function dropdown() {
    search("dropdown")
}



var searchbox = document.getElementById("search");

searchbox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("click").click();
    }
});