function searchMemberByLastName() {
    //get the last name 
    var lastNameSearch = document.getElementById('lastNameSearch').value
    console.log(lastNameSearch);
    //construct the URL and redirect to it
    window.location = '/libraryMember/search/' + encodeURI(lastNameSearch)
}
