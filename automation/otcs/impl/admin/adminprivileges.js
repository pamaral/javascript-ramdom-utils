function deleteAllRestrictions(callback) {
  window.popup().location = "?func=admin.adminprivileges";
  window.popup().setWait();
	window.popup().setWait(function(w, $){
    var restrictions = $("a:contains('Delete All Restrictions')");
    
    (function doIt(w,$){
      if($("a:contains('Delete All Restrictions')").length == 0) {
        return callback();
      }
      
      w.confirm = function () {return true;};
      $("a:contains('Delete All Restrictions'):first").click();
      
      w.setWait(function(w,$) {
        doIt(w,$)
      });
    })(w,$);
  });
}

function general(callback, groupName, settingName) {
  window.popup().setSubmit().location = "?func=admin.adminprivileges";
    
	window.popup().setWait(function(w, $){
		var obj = $("#TransactionPrivileges td:contains('" + settingName + "')").parent("tr:first").find("a");

		if(obj.length == 0){
			return console.error("could not find Object Type '"+settingName+"'");
		}
    
		w.confirm = function () {return true;};
		obj[0].click();
    	
		w.setSubmit().setWait(function(w, $){
      var frameURL = $("#rightFrame").attr("src");
      w.location.href = frameURL;
      w.setSubmit().setWait(function(w, $){
        //$("#_ug_searchColumn").val("0").change(); //Search by Group Name
        $("#_ug_searchColumn option[value=0]:last").prop("selected", "true");
        
        if(groupName === "Admin")
          $("#_ug_searchColumn option[value=0]:first").prop("selected", "true");
          
        $("#_ug_searchColumn").change();
        $("#_ug_searchValue").val(groupName).change(); //Search Term
        $("input[value=Find]").click();
        w.setSubmit().setWait(function(w, $){
          var user = $("a:contains('" + groupName + "')").filter(function(){return $(this).text() == groupName;});
          if(user.length == 0){
            return console.error("No group found with '" + groupName + "' or already exists");
          }
          
          user.parents("tr:first").find("input").click();

          if(user.parents("tr:first").find("input").length == 0)
            console.debug(settingName + " - group already selected:" +  groupName);
          else 
            console.info(settingName + " - selecting group:" +  groupName);
          
          $("input[value=Submit]").click();
          
          w.setSubmit().setWait(function(w, $){
            callback();
          },function(w, $){return $("input[value=Find]").length > 0;});
        },function(w, $){return $("input[value=Submit]").length > 0;});
      },function(w, $){return $("input[value=Find]").length > 0;});
    });
	});
}

(function() {
  
/* TO GET RESTRICTIONS
var links = $("a:contains('Edit Restrictions')");

function doIt(index){
  if(index >= links.length) {
    popup().close();
    return console.debug("END");
  }
  
  var url = "?func=user.feditgroup&groupID=" + links[index].href.match(/groupid=(\d+)/)[1] + "&redirectobj=adminprivileges";
  if(popup()) {
    popup().setSubmit().location = url;
  } else 
    window.open(url);
  
  var name = $(links[index]).parents("tr:first").find("td:eq(1)").text().trim();
  
  popup().setWait(function(w, $) {
    var groups = $("a:not(:first)").map(function() { return $(this).text()});

    for(var i = 0; i<groups.length; ++i) {
      var group = groups[i];
      console.debug('  funcs.push(function _type_(callback){'.replace('_type_', name.replace(/\s/gi, "_") + i));
      console.debug('    general(callback, "_group_", "_name_");'.replace('_name_', name).replace('_group_', group));
      console.debug('  });');
      console.debug('');
    }
    
    doIt(++index);
  }, function(w,$) {
    return $(".saveButton").length;}
  );
}

doIt(0);
*/
  var funcs = [];
  
    funcs.push(function Permissions_Filter(callback){general(callback, "myGroup","Permissions Filter");});
    funcs.push(function Effective_Permissions(callback){general(callback, "myGroup","Effective Permissions");});
    funcs.push(function Edit_Permissions(callback){general(callback, "myGroup","Edit Permissions");});
    funcs.push(function Copy_Permissions(callback){general(callback, "myGroup","Copy Permissions");});
    funcs.push(function Permissions_Search(callback){general(callback, "myGroup","Permissions Search");});
    funcs.push(function View_Edit_Brava_Permissions(callback){general(callback, "myGroup","View/Edit Brava Permissions");});
    funcs.push(function Edit_Groups(callback){general(callback, "myGroup","Edit Groups");});
    funcs.push(function Compare_Groups(callback){general(callback, "myGroup","Compare Groups");});
    funcs.push(function Replace_User(callback){general(callback, "myGroup","Replace User");});
    funcs.push(function Permissions_Rollback(callback){general(callback, "myGroup","Permissions Rollback");});
    funcs.push(function Run_Permission_Reports(callback){general(callback, "myGroup","Run Permission Reports");});
    funcs.push(function Virtual_permissions(callback){general(callback, "myGroup","Virtual permissions");});
    funcs.push(function Security_clearance(callback){general(callback, "myGroup","Security clearance");});
    funcs.push(function View_security_clearance_of_other_users(callback){general(callback, "myGroup","View security clearance of other users");});
    funcs.push(function Supplemental_markings(callback){general(callback, "myGroup","Supplemental markings");});
    funcs.push(function View_supplemental_markings_of_other_users(callback){general(callback, "myGroup","View supplemental markings of other users");});


  var monitor = new Monitor();
  
  monitor.then(function openWindow(callback) {window.open("?func=admin.adminprivileges"); window.popup().setWait(function(w, $){ callback(); })});

  monitor.then(deleteAllRestrictions);
  
  for(var i = 0; i < funcs.length; ++i)
    monitor.then(funcs[i]);
    
  monitor.then(function closeWindow(callback) {window.popup().close();callback();});
  
  monitor.execute();
})();
