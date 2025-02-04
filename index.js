/* TODO:
        Add subpages for each anime when it is generated
        This can be accomplished by storing the anime data for each show
        once the function search() is ran.
        Create a file to store the information page; use this page for each show.
        Simply parse the data to the already developed structure and tada!
*/

const url = "https://api.jikan.moe/v4/anime?q=";

let current_page = 1;
let old_text;
let page_total;

document.getElementById("page_container").style.visibility = "hidden";
document.getElementById("page_container2").style.visibility = "hidden";

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
                    } catch (error){
                        null;
                    }
                }

            }

            // put data on page
            for (let i = 0; i < arrTitles.length; ++i) {

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

                div.addEventListener("click", function() {
                    let title = encodeURIComponent(arrTitles[i]);
                    window.open(`selection.html?title=${title}`, target = "_self");
                });
            }
          })
          .catch(error => {
            console.log('Error:', error);
          });

    document.getElementById("page_container").style.visibility = "visible";
    document.getElementById("page_container2").style.visibility = "visible";


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

var searchbox = document.getElementById("search");

searchbox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("click").click();
    }
});