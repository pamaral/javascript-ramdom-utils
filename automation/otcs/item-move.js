
function prepareWindow(callback) {
  window.open("?");
  
  window.getPopup().setWait(callback)
}

function closePreparedWindow(callback) {
  window.getPopup().close();
  setTimeout(callback, 1000);
}


function process(callback, obj) {
  var w = window.getPopup();
  var $ = w.$;
  
  var id = obj.id;
  var destination = obj.destination;
  
  w.location = 
    '?func=ll&objId=' + id + '&objAction=move&nexturl=' + encodeURIComponent("/livelink/livelink/properties/" + id); 

  w.setSubmit().setWait((w1,$) => {
    $("#MovePermissions[value=0]").click();
    $("[name=DEST_Button]").click();
    
    w1.getPopup().setWait((w2,$) => {
      w2.selectNodeItem( destination, '', 'shortcuts' )
      
      w1.$(".saveButton").click();
      
      w1.setSubmit().setWait(callback);
    }, (w,$) => {return w.$ && $(".cancelButton").length;});
  });
}



/*
objs.push({id: 139820137 	,destination: 139966754 });
objs.push({id: 133298374 	,destination: 132455644 });
objs.push({id: 139820136 	,destination: 139966754 });
objs.push({id: 133298710 	,destination: 132393276 });
objs.push({id: 133299286 	,destination: 132393276 });
objs.push({id: 132454324 	,destination: 132393934 });
objs.push({id: 132455974 	,destination: 132393934 });

objs.push({id: 139820137 	,destination: 139993749 });
objs.push({id: 133298374 	,destination: 139993749 });
objs.push({id: 139820136 	,destination: 139993749 });
objs.push({id: 133298710 	,destination: 139993749 });
objs.push({id: 133299286 	,destination: 139993749 });
objs.push({id: 132454324 	,destination: 139993749 });
objs.push({id: 132455974 	,destination: 139993749 });

*/

  new Monitor()
    .then(prepareWindow)
    .then(function(callback) {
      var objs = [];
      
objs.push({id: 139820137 	,destination: 139966754 });
objs.push({id: 133298374 	,destination: 132455644 });
objs.push({id: 139820136 	,destination: 139966754 });
objs.push({id: 133298710 	,destination: 132393276 });
objs.push({id: 133299286 	,destination: 132393276 });
objs.push({id: 132454324 	,destination: 132393934 });
objs.push({id: 132455974 	,destination: 132393934 });
      
      (function doIt() {
        if(objs.length == 0)
          return callback();
          
        var obj = objs.pop();
        process(doIt, obj);
      })();
    })
    .then(closePreparedWindow)
    .execute();  

    
