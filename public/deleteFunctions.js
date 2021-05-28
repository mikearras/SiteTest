function deleteMember(memberID){
    $.ajax({
        url: '/libraryMember/' + memberID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteAuthor(authorID){
    $.ajax({
        url: '/authorRecord/' + authorID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};