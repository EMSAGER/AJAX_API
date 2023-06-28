"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");
const noTVImage = "https://images.pexels.com/photos/17233395/pexels-photo-17233395/free-photo-of-a-retro-television-with-flowers.jpeg";
//const $noTVImage = $("<img src=https://images.pexels.com/photos/17233395/pexels-photo-17233395/free-photo-of-a-retro-television-with-flowers.jpeg");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
//console.log("test!1");
async function searchShows(query) {
  //console.log(`https://api.tvmaze.com/search/shows?q=${query}`);
  let res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
  //console.log(res.data);
  
  let shows = res.data.map(result => {
      let show = result.show;
      console.log(show);
      return {
        id: show.id,
        name: show.name,
        summary: show.summary,
        image: show.image ? show.image.medium : noTVImage,
      };
      
    });
    //console.log("test2");
    
  return shows;
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  // $showsList.empty();
  console.log(shows);
  console.log($showsList);
  for (let show of shows) {
    console.log(show.id);
    console.log(show.image);
    console.log(show.name);
    console.log(show.summary);
    let showItem = $(
        `<div data-show-id="${show.id}" class="col-md-12 col-lg-6 mb-4" id="Show">
         <div class="card" data-show-id="${show.id}">
         <div class="card-img-top" src="${show.image}"> 
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>

             <button class="btn btn-outline-light btn-sm" id="Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);
    $showsList.append(showItem); 
    
    console.log($showsList);
    console.log("test3");
  };
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay(query) {
  // let querys = $("#searchForm").val();
  let shows = await searchShows(query);

  
 //populateShows(show);
//  console.log(shows);
  // console.log("test4");
  return shows;
}

$searchForm.on("submit", async function handleSearch(e) {
  e.preventDefault();

  let query = $('#search-query').val();
  console.log(query);
  if(!query) return;

  $episodesArea.hide();

  // let shows = await searchForShowAndDisplay(query);
  let shows = await searchShows(query);
  //console.log(show);
  console.log('A');
  populateShows(shows);
  console.log("test5");
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }