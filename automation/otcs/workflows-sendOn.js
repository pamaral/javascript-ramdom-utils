/*
requires https://github.com/pamaral/javascript-ramdom-utils/blob/master/automation/window-history.js
requires https://github.com/pamaral/javascript-ramdom-utils/blob/master/automation/otcs/utils.js
*/

(() => {
  function sendOn(callback) {
    window.open("?func=Personal.Assignments");
    
    window.popup().setWait(
      function(w,$) {
        (function doIt(w, $){
          if(!$("a:contains('Initiator')").length)
            return w.close() && callback();
          
          $("a:contains('Initiator'):first")[0].click();
          
          w.setSubmit().setWait(function(w,$) {
            $("iframe[name=IFrameLeft]").contents().find("input.saveButton").click();
            w.setSubmit().setWait(doIt);
          }, function (w,$) { 
            try {
                return $("iframe[name=IFrameLeft]").contents().find("input.saveButton").length;
            } catch(e) {}
            return false;
          });
        })(w,$);
      }
    );
  }
  

  new Monitor()
    .then(sendOn)
    .execute();
})();

