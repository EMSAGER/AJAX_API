const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */
//console.log("test!1");
async function searchShows(term) {
  let res = await axios.get("https://api.tvmaze.com/search/shows?q=`${term}`");
  //console.log(res.data);
  
  //console.log("test!2");
  let shows = res.data.map(result => {
      let show = result.show;
      return {
        id: show.id,
        name: show.name,
        summary: show.summary,
      };
    });
return shows;
  
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of $showsList) {
    let $term = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="card" data-show-id="${show.id}">
           <img 
              src= "${show.image}" 
              class="w-25 mr-3">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);
      console.log($term)
    $showsList.append($term); 
    console.log($showsList);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const $term = $("#searchForm-term").val();
  const shows = await getShowsBySearch($term);

  console.log(shows);
  
  populateShows(shows);
}

$searchForm.on("submit", async function handleSearch(e) {
  e.preventDefault();

  let term = $('#search-query').val();
  if(!term) return;

  $episodesArea.hide();

  let shows = await searchShows(term);
  console.log(shows);
  populateShows(shows);
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
