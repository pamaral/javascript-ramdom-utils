/*
In the invoice listing page, it will open each page, disable the "attach timesheet" and press print.
PROBLEM: in the canceled invoices, the printbutton is not being pressed
*/
if(!window.jQuery){
    let script = document.createElement('script');
    document.head.appendChild(script);
    script.type = 'text/javascript';
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
    await (function() {
      return new Promise((resolve, reject) => {
        var interval = setInterval(function() {
          if(!window.jQuery)
            return;
          clearInterval(interval);
          resolve();
        }, 500);
      });
    })();
}

async function waitFor(selector, w) {
  var d = $.Deferred();
  
  var interval = setInterval(async function() {
    var $ = w.$;
    var document = w.document;
    
    if(w.jQuery === true) {
      return;
    }
    
    try {
      if($(selector) === false ) {
        let script = document.createElement('script');
        document.head.appendChild(script);
        script.type = 'text/javascript';
        script.src = "//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js";
        script.onload
        return;
      }
      if($(selector).length == 0 )
        return;
      
      clearInterval(interval);
      d.resolve($(selector));
    } catch(e) {console.log(e)}
  }, 200)
  
  return d;
}

var links = $(".r a[title='Rechnung: Übersicht']").toArray();

for(var i in links) {
  setTimeout((function(href) {
    return async function() {
      console.log("running");
      var w = window.open(href);
      var btn = await waitFor("a[title='Rechnung: Verkauf']", w);

      btn[0].click();

      await waitFor("#group_geloescht", w);
      
      btn = await waitFor("#group_taetigkeitsnachweisAnhaengen", w);
      if(btn.is(":checked")) {
        var btn2 = await waitFor("a.drucken.cmdbtn", w);
        btn2.remove();
        btn[0].click();
        btn2 = await waitFor("input.speichern.cmdbtn", w);
        btn2[0].click();
      }

      var btnDrucken = await waitFor("a.drucken.cmdbtn", w);
      btnDrucken[0].click();
      console.log("done", i);
    }
  })($(links[i]).attr("href")), Math.random() * 30000 );
}
