async function searchTVShows(show){
    const res = await axios.get('https://api.tvmaze.com/shows', {params: {
        q: show
    }});
    console.log(res.data);
}