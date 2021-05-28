function filterAuthorByLastName() {
    //get the id of the selected homeworld from the filter dropdown
    var author_id = document.getElementById('lastName_filter').value
    //construct the URL and redirect to it
    window.location = '/authorRecords/filter/' + parseInt(author_id)
}