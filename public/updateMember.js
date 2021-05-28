function updateMember(memberID){
    $.ajax({
        url: '/libraryMember/' + memberID,
        type: 'PUT',
        data: $('#update-member').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

