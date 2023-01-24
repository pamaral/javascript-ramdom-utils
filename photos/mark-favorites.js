/*
before sending the review to the photographer, we need to mark them all as favorites...
*/
var data = [
2031476156,
2031476209
];

data.forEach(function(id) {
  $.ajax({
    url: <url> #"/gallery/15578266/photofavoritetoggle",
    method: "POST",
    async: false,
    data: {
      cr: 1,
      doesAcceptTerms: 1,
      email: <email>,
      photo_id: id
    }
  });
});
