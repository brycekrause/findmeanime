const url = "https://api.jikan.moe/v4/anime?q=";

let current_page = 1;
let old_text;
let page_total;

function search() {
    let container = document.getElementById("container");
  

    // delete old data
    document.getElementById("container").innerHTML = "";

    // use the search box
    var text = document.getElementById("search").value;

    try{
        if (text !== old_text) {
            current_page = 1;
        }        
    } catch (error){
        document.getElementById("findmeanime").innerHTML = error;
        null;
    }

    
    document.getElementById("result").innerHTML = "Search results for " + text;
    document.getElementById("page_counter").innerHTML = current_page;

    old_text = text;

    // get json data from api!
    fetch(url + text + '&page=' + current_page)
        .then(response => {
            return response.json();
          })
          .then(response => {
            let arrTitles = [];
            let arrImages = [];
            let arrYear = [];
            let arrID = [];
            page_total = response.pagination.last_visible_page;


            // get data & put in an array
            for (var i = 0; i < response.pagination.items.count; ++i) {
                if (response.data[i].rating == "Rx - Hentai" || response.data[i].rating == "R+ - Mild Nudity") {
                    null;
                } else {
                    try {
                        arrTitles.push(response.data[i].title);
                        arrImages.push(response.data[i].images.jpg.image_url);
                        arrYear.push(response.data[i].year);
                        arrID.push(response.data[i].mal_id);
                    } catch (error){
                        null;
                    }
                }

            }

            // put data on page
            for (let i = 0; i < arrTitles.length; ++i) {

                let div = document.createElement('div');
                div.id = i;
                div.className = "dataContainer";
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

                div.addEventListener("click", function() {
                    let id = encodeURIComponent(arrID[i]);
                    window.open(`selection.html?id=${id}`, target = "_self");
                });
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });

    page_container.style.visibility = "visible";


}

function next() {
    if (current_page >= page_total) {
        null;
    } else {
        current_page += 1;
        search()        
    }

}

function prev() {
    if (current_page <= 1) {
        null;
    } else {
        current_page -= 1;
        search()
    }

}


const searchContainer = document.getElementById("searchContainer");
const searchbox = document.getElementById("search");
const searchButton = document.getElementById("searchButton");

document.addEventListener("DOMContentLoaded", function() {
    var page_container = document.createElement('div');
    page_container.id = "page_container";
    page_container.style.visibility = "hidden";

    var prevButton = document.createElement('button');
    prevButton.innerText = "Prev";
    prevButton.id = "pages";
    prevButton.addEventListener("click", prev);

    counter = document.createElement('p');
    counter.id = "page_counter";

    var nextButton = document.createElement('button');
    nextButton.innerText = "Next";
    nextButton.id = "pages";
    nextButton.addEventListener("click", next);

    page_container.appendChild(prevButton);
    page_container.appendChild(counter);
    page_container.appendChild(nextButton);



    searchContainer.appendChild(page_container);

    searchbox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    });

    searchButton.addEventListener("click", search);

    
});
