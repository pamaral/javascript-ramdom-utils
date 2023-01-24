/*
Can't remember which the site is... (my wife asks me to do it every now and again)
It downloads all photos from a gallery
*/

function doIt(data, index) {
	if(index >= data.length) {
		return console.log("Done!");
	} 
  console.log(index + "/" + data.length );
  var photo = data[index];
  
  var w = window.open("https://d2rxqglyhdohqf.cloudfront.net/ph/" + photo.key + "/l/" + photo.id + ".jpg");
  
  setTimeout(function() {
	doIt(data, index + 1); 
	//w.close();
  }, 200);
	
}

$.get("/gallery/15578266/data?cr=1").done(function(data) {
	doIt(data.photos, 0);
})

