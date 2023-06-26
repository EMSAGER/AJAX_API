"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
console.log("hello!");
async function getShowsByTerm(term) {
  let res = await axios.get("https://api.tvmaze.com/search/shows?q=`${term}`");
  //console.log(res.data);
  console.log(term);
  let shows = res.data.map(result => {
      let show = result.show;
      return {
        id: show.id,
        name: show.name,
        summary: show.summary
      };

  });
console.log(shows);
  
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  let $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of $showsList) {
    let $term = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src= "${show.image}" 
              alt="" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);
      console.log($term)
    //$showsList.append($term); 
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const $term = $("#searchForm-term").val();
  const shows = await getShowsByTerm($term);

  $episodesArea.hide();
  
  populateShows(shows);
}

$searchForm.on("submit", async function handleSearch(e) {
  e.preventDefault();

  let term = $('#search-query').val();
  if(!term) return;

  let shows = await searchForShowAndDisplay(term);
  console.log(shows);
  // populateShows(shows);
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
