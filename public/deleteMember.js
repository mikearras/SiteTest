function deleteMember(memberID) {
  $.ajax({
    url: '/libraryMember/' + memberID,
    type: 'DELETE',
    success: function (result) {
      window.location.reload(true);
    }
  })
};

