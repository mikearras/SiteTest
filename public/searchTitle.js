console.log("searchTitle.js is refrenced")
function searchItemByTitle() {
    console.log("inside the searchItemByTitle")
    //get the title
    var title_search_string  = document.getElementById('title_search_string').value
    //construct the URL and redirect to it
    window.location = '/item/search/' + encodeURI(title_search_string)
}
