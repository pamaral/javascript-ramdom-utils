
function ngdadminAttributeSettings(callback) {
/* ********** to get the values **********
var values = [];

$(".browseRow1,.browseRow2").each ( function(i,o){
  o = $(o);
  o.children("td:eq(0)");
  var name = o.children("td:eq(0)").find("input").val();
  var source = o.children("td:eq(1)").text();
  var format = o.children("td:eq(2)").find("select").val();
  var property = o.children("td:eq(3)").text();
  
  values.push({
    name: name,
    source: source,
    format: format,
    property: property
  });
});

JSON.stringify( values);
*/

  var w = this;
  var $ = w.$;
  
  var configs = eval('[{"name":"Create Date","source":"Create Date","format":"systemshort","property":""},{"name":"Created By","source":"Created By","format":"username","property":""},{"name":"Object ID","source":"Data ID","property":""},{"name":"Description","source":"Description","property":""},{"name":"Document Name","source":"Name","property":""},{"name":"Shortlink (Open)","source":"Shortlink (Open)","property":""}]');

  function doConfigs(callback) {
    var $ = w.$;

    if(configs.length == 0)
      return callback();
    
    var config = configs[0];
    configs = configs.slice("1");
    
    Utils.doSelect("#attrList", config.source, $);

    w.setSubmit().setWait(function(w,$){
      var row = $(".browseRow1,.browseRow2").last();
      
      row.children("td:eq(0)").find("input").val(config.name).change();
      
      if(config.format)
        row.children("td:eq(2)").children("select").val(config.format).change();
        
      $("input[value=Submit]").click()
      w.setSubmit().setWait(function() {doConfigs(callback);});
    });
  }
  
  function deleteConfigs(callback) {
    var $ = w.$;
    
    if($(".browseItemActions a").length == 0)
      return callback();
    
    w.confirm = function(){return true;};
    $(".browseItemActions a:first").click();
    
    w.setSubmit().setWait(function() {deleteConfigs(callback);});
  }
  
  new Monitor("ngdadminAttributeSettings")
    .then(deleteConfigs)
    .then(doConfigs)
    .then(callback)
    .execute();
}

function ngdadminAdvancedSettings(callback) {
  var w = this;
  var $ = w.$;
  
  Utils.doSelect('#docDefaultActionSettingOpt', "Always open document as read-only", $);
  Utils.doSelect('#compEmailDefaultActionSettingOpt', "Open Compound Email's sub-items", $);
  $('input[name=ecFromHereLabel]').val("Explore from Here").change();
  $('input[name=ecFromHereSetting]').val("0,202,298,751").change();
  $('input[name=AppendShortcutPrefixOpt]:not(:checked)').click();
  
  Utils.doSelect('#metadataCaptureOpt', "Always", $);
  Utils.doSelect('#promptForMetadataOpt', "Always", $);
  
  $("input[name=compoundDocumentDragAndDropSetting]").val("").change();
  $("input[name=emailFolderDragAndDropSetting]").val("").change();
  
  $("#fileExtensionAndSubtypeSetting").val("").change();
  
  $("input[value='Submit']").click();

  w.setSubmit().setWait(callback);
}

function fcspermmgradminGetSettings(callback) {
  var w = this;
  var $ = w.$;
  
  var ItemsToIncludeValues = "{-1,'',144,0,298,751,749,202,1,3030202}";
  var ItemsToIncludeLabels = "{'All Types','','Documents','Folders','Collections','Email Folder','Email','Project Item','Shortcuts','CoP'}";

  $("input[type=radio][name='EnablePermissionOverview'][value='true']").click().change();
  $("input[type=radio][name='EnableCopyPermissions'][value='true']").click().change();
  $("input[type=radio][name='EnableReplaceUser'][value='true']").click().change();
  $("input[type=radio][name='EnablePermissionsSearch'][value='true']").click().change();
  $("input[type=radio][name='EnableVirtualEditing'][value='true']").click().change();
  $("input[type=radio][name='EnablePermissionsTemplates'][value='true']").click().change();
  $("input[type=radio][name='EnablePermissionsTemplatesPersMenu'][value='true']").click().change();
  $("input[type=radio][name='EnablePermissionsRollback'][value='true']").click().change();
  $("input[type=radio][name='ShowPermsToReaders'][value='true']").click().change();
  $("input[type=radio][name='CopyPermissionsStyle'][value='CopyReplace']").click().change();
  $("input[type=radio][name='RMOfficial'][value='1']").click().change();
  $("input[type=radio][name='RMConfidential'][value='1']").click().change();
  $("input[type=radio][name='EnableSecClearances'][value='true']").click().change();
  $("input[type=radio][name='EnableSuppMarkings'][value='true']").click().change();
  $("input[type=radio][name='EnableReplaceCase'][value='false']").click().change();
  $("input[type=radio][name='EnableVisualIndication'][value='true']").click().change();
  $("input[type=radio][name='removeowner'][value='true']").click().change();
  $("input[type=radio][name='RetainOwner'][value='true']").click().change();
  $("input[type=radio][name='RetainGroupOwner'][value='true']").click().change();
  $("input[type=radio][name='SearchMethod'][value='2']").click().change();
  $("input[type=radio][name='SizeCheckMethod'][value='2']").click().change();
  $("input[type=radio][name='AutoApplyToSub'][value='true']").click().change();
  $("input[type=radio][name='AlternativePermCheckboxes'][value='true']").click().change();

  $("input[type=text][name='visualindication']").val("lightblue").change();
  $("input[type=text][name='MaxExpand']").val("10").change();
  $("input[type=text][name='ItemsToIncludeValues']").val("{-1,'',144,0,298,751,749,202,1,3030202}").change();
  $("input[type=text][name='ItemsToIncludeLabels']").val("{'All Types','','Documents','Folders','Collections','Email Folder','Email','Project Item','Shortcuts','CoP'}").change();
  $("input[type=text][name='ItemLimits']").val("{20,50,100,500}").change();
  $("input[type=text][name='ItemLimitsDefault']").val("50").change();
  $("input[type=text][name='maxHierarchySize']").val("-1").change();
  $("input[type=text][name='ExcludedSubtypes']").val("{137,142,143,148,150,154,161,162,201,203,209,210,211,226,231}").change();
  $("input[type=text][name='ResultsCacheExpiration']").val("60").change();
  $("input[type=text][name='CopyPermissionsLevels']").val("{-1,1,2,3,4,5,6,7,8,9,10}").change();
  $("input[type=text][name='CopyPermissionsLevelsDefault']").val("-1").change();
  
  $("input[type=checkbox][name='EnableCascadeCopyPermissionsFunctionality']:not(:checked)").click().change();
  
  $("input[type=checkbox][name='EnableCascadeCopyPermissionsFunctionality']:not(:checked)").click().change();
  
  var tmpAlert = w.alert;
  w.alert = function() {return true;}
  Utils.doSelect("select[name=CascadeCopyPermissionsToItemsMaxLimit]", "No Limit Restrictions on Cascade Copy Permissions", $);
  w.alert = tmpAlert;

  Utils.doSelect("select[name=CascadePageUpdateRefreshInterval]", "60", $);
  
  //Submit the values
  $("input[value=Save]").click();

  w.setSubmit().setWait(callback);
}

function webEditAdmin(callback) {
  var w = this;
  var $ = w.$;

  $("#availableOpt_ActiveX").click().change();
  $("#availableOpt_WebDAV").click().change();
  $("#unavailableOpt_OfficeOnline[value='Unavailable']").click().change();

  $("input[type=checkbox][name='UseDocFetchForAllOpens'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreate5Excel2007'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreateExcel2010'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreateExcel2013'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreateExcel2016'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreate2Excel'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreate6PowerPoint2007'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreatePowerPoint2010'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreatePowerPoint2013'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreatePowerPoint2016'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreate3PowerPoint'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreate7Project'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreate8Project2007'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreateProject2010'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreateProject2013'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreateProject2016'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreate9Visio'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreateVisio2013'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreateVisio2016'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreate4Word2007'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreateWord2010'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreateWord2013'][value='True']:not(:checked)").click().change();
  $("input[type=checkbox][name='CanCreateWord2016'][value='True']:checked").click().change();
  $("input[type=checkbox][name='CanCreate1Word'][value='True']:not(:checked)").click().change();


  var editorTable = $("#col_editorname_1").parents("table:first");
  while(editorTable.find("label:contains(Office Editor)").attr("id") != "col_editorname_1") {
    editorTable.find("label:contains(Office Editor)").parent().siblings().find("img[alt=Up]").click();
  } 
  while(editorTable.find("label:contains(WebDAV)").attr("id") != "col_editorname_2") {
    editorTable.find("label:contains(WebDAV)").parent().siblings().find("img[alt=Up]").click();
  }

  $(".applyButton").click();
  
  w.setSubmit().setWait(callback);
}

function documentoverview(callback) {
  var w = this;
  var $ = w.$;

  $("#OpenEnabled[value='true']").click().change();
  $("#ViewEnabled[value='true']").click().change();
  $("#enable[value='true']").click().change();

  $("input[type=text][name='MaxVersionsBeforeWarn']").val(decodeURIComponent("20")).change();
  $("input[type=text][name='MaxVersionsSizeBeforeWarn']").val(decodeURIComponent("51200000")).change();

  $(".saveButton").click();
  
  w.setSubmit().setWait(callback);
}

function admineLinkConfigure(callback) {
  var w = this;
  var $ = w.$;

  $("input[type=checkbox][name='MyMailEnabled_Control']:checked").click().change();

  $("input[type=checkbox][name='EnableEmailDocLink_Control']:not(:checked)").click().change();

  $(".saveButton").click();
  
  w.setSubmit().setWait(callback);
}


function webreportsManageUserGroupWRTrigger(callback) {
  var w = this;
  var $ = w.$;

  function popupSelectObject(w, valuepath, callback) {
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
      })(w,w.$);
  }
  
  function addTrigger(w,$) {
    $("img[title='Click here to Add new WR Trigger']").click();
  
    w.setSubmit().setWait(function(w,$){
      $("input[type=checkbox][id=Enabled]:not(:checked)").click().change();
      $("input[type=checkbox][id=Global_1]:not(:checked)").click().change();
      Utils.doSelect('#EventSelector_1', "Create User / Group", $);
      Utils.doSelect('#Inherit_1', "Direct Members", $);
      
      $("[name=selectTriggerButton_1]").click();
      
      w.popup().setWait(function(wPopup,$) {
        popupSelectObject(wPopup, "DARWIN:DARWIN Administration:12) Active views:WebReport - Show Item description on browse view:Show item description on browse view".split(":"), function (){
          w.$(".saveButton[type=SUBMIT]").click();
          w.setSubmit().setWait(callback);
        });
      },function(w,$){return $(".cancelButton").length;});
    });
  }
  
  (function deleteTrigger(w,$) {
    w.confirm = function(){return true;};
    if($("img[title='Delete Row']").click().length == 0)
      return addTrigger(w,$);
    return w.setSubmit().setWait(deleteTrigger);
  })(w,$);
}



function webEditAdminoe(callback) {
  var w = this;
  var $ = w.$;

  $("textarea[name='MIMEActiveX1']").val(decodeURIComponent("application%2Fmsword%0Aapplication%2Fvnd.openxmlformats-officedocument.wordprocessingml.document%0Aapplication%2Fvnd.ms-word.document.macroEnabled.12%0Aapplication%2Fvnd.ms-word%0Aapplication%2Fvnd.ms-word%2Bxml%0Aapplication%2Fms-excel%0Aapplication%2Fmsexcel%0Aapplication%2Fx-msexcel%0Aapplication%2Fvnd.ms-excel%0Aapplication%2Fvnd.openxmlformats-officedocument.spreadsheetml.sheet%0Aapplication%2Fvnd.ms-excel.sheet.macroEnabled.12%0Aapplication%2Fvnd.ms-excel.sheet.binary.macroEnabled.12%0Aapplication%2Fvnd.ms-excel%2Bxml%0Aapplication%2Fvnd.ms-powerpoint%0Aapplication%2Fx-mspowerpoint%0Aapplication%2Fvnd.openxmlformats-officedocument.presentationml.presentation%0Aapplication%2Fvnd.ms-powerpoint.presentation.macroEnabled.12%0Aapplication%2Fpowerpoint%0Aapplication%2Fppt%0Aapplication%2Fvnd.ms-powerpoint%2Bxml%0Aapplication%2Fvnd.ms-project%0Aapplication%2Fvnd.visio%0Aapplication%2Fvisio%0Aapplication%2Fx-visio%0Aapplication%2Fvnd.ms-visio.drawing%0Aapplication%2Fvnd.ms-visio.drawing.macroEnabled%0Aapplication%2Fvnd.ms-visio.stencil%0Aapplication%2Fvnd.ms-visio.stencil.macroEnabled%0Aapplication%2Fpdf%0Atext%2Fplain")).change();    

  Utils.doSelect('#versionMgmtSetting', "Keep only the last version", $);

  $("input[type=checkbox][name='forceLatestClientOption'][value='True']:checked").click().change(); 

  $("input[type=checkbox][name='EnableDocumentCaching'][value='True']:not(:checked)").click().change();  

  $(".applyButton").click();
  
  w.setSubmit().setWait(callback);
}


/*
$("input[type=radio]:checked").filter(function(){var s = $(this).attr("id") ? "#" + $(this).attr("id") : "input[type=radio][name='" + $(this).attr("name") + "']";if($(this).val() && $(this).val()  != 'on') s += "[value='" + $(this).val() + "']";if($('"_val_"'.replace('"_val_"', s)).length == 1 && this === $('"_val_"'.replace('"_val_"', s))[0])console.debug("$(\"" + s + "\").click().change();");else console.warn("$(\"" + s + "\").click().change();");});
$("input[type=checkbox]:enabled").filter(function() {var s = $(this).attr("id") ? "input[type=checkbox][id=" + $(this).attr("id") + "]": "";if(s.length && $(s).length == 1 && $(s)[0] == this) {} else {s = $(this).attr("name") ? "input[type=checkbox][name='" + $(this).attr("name") + "']" : "";if ($(this).val() && $(this).val() != 'on') s += "[value='" + $(this).val() + "']";if($(s).length == 1 && $(s)[0] == this) {} else {console.error("could not get the selector for " + s);return;}}s += ($(this).is(":checked") ? ":not(:checked)" : ":checked");console.debug("$(\"" + s + "\").click().change();");});
$("input[type=text]:not(:disabled)").filter(function(){console.debug("$(\"input[type=text][name='" + $(this).attr('name') + "']\").val(decodeURIComponent(\"" + encodeURIComponent($(this).val()) + "\")).change();")});
$("textarea").filter(function(){console.debug("$(\"textarea[name='" + $(this).attr('name') + "']\").val(decodeURIComponent(\"" + encodeURIComponent($(this).val()) + "\")).change();")});
$("select").filter(function(){var s = $(this); var text = s.find("option").filter(function() { return $(this).val() == s.val();}).text(); s = s.attr("id") && s.attr("id").length > 0 ? "#" + s.attr("id"): "select[name=\"" + s.attr("name") + "\"]";console.debug("Utils.doSelect('" + s + "', \"" + text.trim() + "\", $);")});
*/


new Monitor("main")
    .thenWithContext("?func=ngdadmin.AttributeSettings", ngdadminAttributeSettings)
    .thenWithContext("?func=ngdadmin.AdvancedSettings", ngdadminAdvancedSettings)
    .thenWithContext("?func=fcspermmgradmin.GetSettings", fcspermmgradminGetSettings)
    .thenWithContext("?func=webedit.admin", webEditAdmin)
    .thenWithContext("?func=admin.documentoverview", documentoverview)
    .thenWithContext("?func=admin.eLinkConfigure&advanced=true&nextURL=", admineLinkConfigure)
    .thenWithContext("?func=webreports.ManageUserGroupWRTrigger", webreportsManageUserGroupWRTrigger)
    .thenWithContext("?func=webedit.adminoe", webEditAdminoe)

    .execute();


