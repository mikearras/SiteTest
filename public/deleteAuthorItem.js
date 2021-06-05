function deleteAuthorItem(authorID) {
    console.log("got to the public delete")
    $.ajax({
      url: '/authorItems/' + authorID,
      type: 'DELETE',
      success: function (result) {
        window.location.reload(true);
      }
    })
  };
  