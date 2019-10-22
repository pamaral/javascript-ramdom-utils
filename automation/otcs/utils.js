
(function (window) {
  var Utils = window.Utils = {};
  
  Utils.selectGroup = function (groupName, w, $, callback) {
    $("#_ug_searchValue").val(groupName);
    $("input[value=Find]").click();
    
    w.setSubmit().setWait(function (w,$){
      var group = $("a").filter(function () {return $(this).text() == groupName;}).parents("tr:first").find("a:contains(Select)").click();
      
      if(group.length != 1)
        throw console.error("group not found:" + groupName);
      
      callback(w, $);
    });
  }
  
  Utils.doSelect = function(selector, valueString, $) {
    $ = $ || window.$;
    var opt = $(selector + ' option:contains("' + valueString.trim() + '")').filter(function () {return $(this).text().trim() == valueString.trim()});
    if(opt.length != 1) {
      throw console.error("no or multiple options found for '" + selector + "': " + valueString);
    }
    
    $(selector).val(opt.val()).change();
  }
  
  Utils.doCheckbox = function(selector, isChecked, $) {
    $ = $ || window.$;
    if( isChecked != $(selector).is(":checked"))
      $(selector).click().change();
  }
})(window);
