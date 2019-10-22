function doAllGlobalOverrides(callbackMaster) {
/* GLOBAL OVERRIDES 
$(".templateColumn .ValueEditable").filter(function () {return $(this).val().trim().length;}).filter(function (id) {
  var title = $(this).parents("tr:first").find(".overrideTypeColumn label").text().trim();
  if(!title.length)
    title = $(this).parents("tr:first").find(".overrideTypeColumn label").text().trim();
  
  if(!title.length)
    title = $(this).parents("tr:first").siblings().first().find(".overrideTypeColumn label").text().trim();
  
  if(!title.length)
    return;
  
  console.debug("//" + title);
  
  var tableid = $(this).parents("table:first").attr("id");
  
  var sel = $(this).parents("tr:first").find(".priorityColumn select");
  var selstring = sel.find("option[value=" + sel.val() + "]").text().trim();
  
  var rules = encodeURIComponent($(this).parents("tr:first").find(".rulesColumn textarea").val().trim());
  var activeview = $(this).parents("tr:first").find(".templateColumn input[type=text]").val();
  console.debug('function GlobalOverrides' + id + ' (callback) {');
  console.debug("  var tableid = '#_id_ ';".replace("_id_", tableid));
  console.debug("  var priority = '_value_';".replace("_value_", selstring));
  console.debug("  var rules = decodeURIComponent(\"_value_\");".replace("_value_", rules));
  console.debug("  var value = '_value_';".replace("_value_", activeview));
  console.debug("");
  console.debug("  popup().setWait(function(w,$){doGlobalOverridesGeneric(callback, w, $, tableid, value, priority, rules);});");
  console.debug("}");
  console.debug("");
  return true;
}).filter (function (id) {
  var name = "GlobalOverrides" + id;
  console.debug("  .then(" + name + ")")
}) ;
*/
  function doGlobalOverridesGeneric(callback, w, $, tableid, value, priority, rules, pattern) {
    var valuepath = value.split(":");

    $("img[title='Expand this section']").click();
    
    var inputs = $(tableid + " input[type=text]");
    if(inputs.filter(function(){return $(this).val() == value;}).length > 0) {
      console.debug("already found configuration with:" + value);
      return callback();
    }

    if(inputs.filter(function(){return $(this).val() == '';}).length == 0) {
      $(tableid + " .overrideAddButton:last")[0].click();
    }
    var input = $(tableid + " .templateColumn input[type=text]").filter(function(){return $(this).val() == '';});
    var select = input.parents("tr:first").find("select");
    var textarea = input.parents("tr:first").find("textarea");
    
    if(pattern)
      input.parents("tr:first").find("input[type=text]:first").val(pattern).change();
    
    select.val(select.find("option:contains(" + priority + ")").val()).change();
    textarea.val(rules).change();
    
    input.parents("tr:first").find("input[value=Browse]").click();
    
    w.popup().setWait(function(w,$){
      var index = -1;
      function navigate(w,$) {
        var v = valuepath[++index];
        
        if(index >= (valuepath.length - 1)) {
          var anchor = $("td.browseItemName:contains('" + v + "')").filter(function(){return $(this).text() == v;}).siblings().find("a");
          
          if(anchor.length == 0)
            return console.error("could not find clickable item> " + value)
          
          anchor.click();
          return callback();
        }
        
        var a = $("a:contains('" + v + "')").filter(function(){return $(this).text() == v;});
        if(a.length != 1)
          return console.error("could not find 'one' with value:" + v);
        
        a.click();
        w.setSubmit().setWait(navigate,function(w,$){ return $(".cancelButton").length > 0; });
      }
      
      (function goToTop(w,$){
        if($("img[alt='Up One Level']").length == 0)
          return navigate(w,$);
        
        $("img[alt='Up One Level']").parent().click();
        w.setSubmit().setWait(goToTop,function(w,$){ return $(".cancelButton").length > 0; });
      })(w,$);
    }, function(w,$){ return $(".cancelButton").length > 0; });
  }

  //Folder Browse:
  function GlobalOverrides0 (callback) {
    var tableid = '#ActiveViewBrowse_avtable ';
    var priority = 'Global';
    var rules = decodeURIComponent("%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Mobile'%20%2F%5D%22%20%3D%3D%20%22true%22%20OR%20%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Blackberry'%20%2F%5D%22%20%3D%3D%20%22true%22%20OR%20%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Android'%20%2F%5D%22%20%3D%3D%20%22true%22%20AND%20%22%5BLL_REPTAG_HTTPCOOKIE%20ASSOC%3AdisableAVM%20%2F%5D%22%20!%3D%20%22true%22");
    var value = 'Content Server Applications:ECM Everywhere ActiveView 2.6 Components:Folder Browse ActiveView';

    popup().setWait(function(w,$){doGlobalOverridesGeneric(callback, w, $, tableid, value, priority, rules);});
  }

  //Compound Document Browse:
  function GlobalOverrides1 (callback) {
    var tableid = '#ActiveViewCDBrowse_avtable ';
    var priority = 'Global';
    var rules = decodeURIComponent("%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Mobile'%20%2F%5D%22%20%3D%3D%20%22true%22%20OR%20%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Blackberry'%20%2F%5D%22%20%3D%3D%20%22true%22%20OR%20%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Android'%20%2F%5D%22%20%3D%3D%20%22true%22%20AND%20%22%5BLL_REPTAG_HTTPCOOKIE%20ASSOC%3AdisableAVM%20%2F%5D%22%20!%3D%20%22true%22");
    var value = 'Content Server Applications:ECM Everywhere ActiveView 2.6 Components:Special Browse ActiveView';

    popup().setWait(function(w,$){doGlobalOverridesGeneric(callback, w, $, tableid, value, priority, rules);});
  }

  //Collection Browse:
  function GlobalOverrides2 (callback) {
    var tableid = '#ActiveViewCollectionBrowse_avtable ';
    var priority = 'Global';
    var rules = decodeURIComponent("%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Mobile'%20%2F%5D%22%20%3D%3D%20%22true%22%20OR%20%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Blackberry'%20%2F%5D%22%20%3D%3D%20%22true%22%20OR%20%22%5BLL_REPTAG_%26HTTP_USER_AGENT%20PATFIND%3A'Android'%20%2F%5D%22%20%3D%3D%20%22true%22%20AND%20%22%5BLL_REPTAG_HTTPCOOKIE%20ASSOC%3AdisableAVM%20%2F%5D%22%20!%3D%20%22true%22");
    var value = 'Content Server Applications:ECM Everywhere ActiveView 2.6 Components:Special Browse ActiveView';

    popup().setWait(function(w,$){doGlobalOverridesGeneric(callback, w, $, tableid, value, priority, rules);});
  }

  function GlobalOverridesGenericRequestHandlers(callback) {
    var configs = [];
    configs.push({
      pattern:"overviewversion&objid=@number@&vernum=@number@",
      priority:"Global",
      rules:"",
      activeview:"<Enterprise Workspace>:<folder1>:<act>"
    });
    
    var monitor = new Monitor("GlobalOverridesGenericRequestHandlers");
    
    for(var i = 0; i < configs.length; ++i) {
      monitor.then(
        (function(config){
            return function(callback) {
              doGlobalOverridesGeneric(
                callback, 
                popup(), 
                popup().$, 
                "#ActiveViewReqOvrs_avtable ", 
                config.activeview, 
                config.priority, 
                config.rules, 
                config.pattern);
            };
          })(configs[i])
      );
    }
    
    monitor.then(function(){callback();});
    monitor.execute();
  }

  function openAndClearGlobalOverrides(callback) {
    window.open("?func=activeview.GlobalOverrides");
    
    popup().setWait(function(w,$){
      $("input[name=clearButton]:visible").click();
      $(".overrideDeleteButton:visible").click();
      callback();
    });
  }


  function saveAndCloseGlobalOverrides(callback) {
    var w = popup();
    var $ = w.$;
    
    $(".saveButton:last").click();
    w.setSubmit().setWait(function(w,$){
      w.close();
      callback();
    });
  }

  new Monitor("doAllGlobalOverrides", true)
    .then(openAndClearGlobalOverrides)
    .then(GlobalOverrides0)
    .then(GlobalOverrides1)
    .then(GlobalOverrides2)
    .then(GlobalOverridesGenericRequestHandlers)
    .then(saveAndCloseGlobalOverrides)
    .then(function (callback) {callback(); callbackMaster();})
    .execute();
    
}

new Monitor()
    .then(doAllGlobalOverrides)
    .execute();
