  function createFile() {
    function format(date) {return (date.getFullYear().toString())+'-'+('0'+ (date.getMonth() +1 )).substr(-2,2)+'-'+('0'+date.getDate()).substr(-2,2)+'_'+(+date);}

    var d = new Date();
    var create = "This is a random generated text file, here the timestamp: " + (+new Date());
    
    var blob = new Blob([create], { type: "text/plain" });
    blob.name = "my-test-file-" + format(d) + ".txt";
    blob.lastModified = d;

    return ( blob.size > 0 ? blob : "file creation error" )
  };

  var ev = $.Event( "drop" );
  ev.originalEvent = {type: "drop", target: {
    files: [createFile()]}};
  ev.preventDefault = ev.stopPropagation = function(){};
  $("#target-to-drop").trigger(ev);
  
