
(function(slice, regions) {
  var totalSize = regions.length;
  var results = [];
  function processRegion() {
    if(results.length == totalSize) {
      console.info("Region,Count\n" + $(results).map(function () { return this.region + "," + this.items  }).toArray().join("\n"));
      return alert("done!");
    }
    
    var region = regions.pop();
    
    if(region == null)
      return;

    var squery = '[qlregion "' + region + '"] *';

    $.get("?slice=" + slice + "&searchbarwidgetmode=fulltext&where1=" + encodeURIComponent(squery) + "&ScopeSelection=" + slice + "&lookfor1=allwords&modifier1=&boolean2=And&lookfor2=complexquery&typeDropDownId=1&boolean3=And&lookfor3=complexquery&userDropDownId=1&dateDropDownId=1&func=search&objType=258&SearchBarSearch=TRUE&location_id1=&facets=user&fulltextMode=allwords", 
      function(data) {
        window.data = data;
        var count = 0;
        try {
          count = parseInt(data.match(/totalCount = (\d+)/)[1]);
        } catch(e) {}
        
        results.push({region:region, items:count});
        console.info(results.length + "/" + totalSize + " - " + region + ": " + count);
        processRegion();
     });
  }



  processRegion();
  processRegion();
  processRegion();
  processRegion();
  processRegion();
  processRegion();
  processRegion();
  processRegion();
  processRegion();
  processRegion();
  processRegion();
  processRegion();
})(
  5234916, 
  [
    "OTDoc_copyright",
    "OTDoc_date",
  ]
  );
