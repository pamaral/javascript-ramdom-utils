// Object privileges

function deleteAllRestrictions(callback) {
  window.open("?func=admin.adminfactories");
	window.popup().setWait(function(w, $){
    var restrictions = $("a:contains('Delete All Restrictions')");
    
    (function doIt(w,$){
      if($("a:contains('Delete All Restrictions')").length == 0) {
        w.close();
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
	window.open("?func=admin.adminfactories");
	window.popup().setWait(function(w, $){
		var obj = $("#ObjectPrivileges img[alt=\""+settingName+"\"]").parent().parent().find("a:first");
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
        $("#_ug_searchColumn").change();
        $("#_ug_searchValue").val(groupName).change(); //Search Term
        $("input[value=Find]").click();
        w.setSubmit().setWait(function(w, $){
          var user = $("a:contains('" + groupName + "')").filter(function(){return $(this).text() == groupName;});
          if(user.length == 0){
            return console.error("No group found with '" + groupName + "' or already exists");
          }
          
          user.parents("tr:first").find("input").click();
          
          $("input[value=Submit]").click();
          
          w.setSubmit().setWait(function(w, $){
            w.close();
            callback();
          },function(w, $){return $("input[value=Find]").length > 0;});
        },function(w, $){return $("input[value=Submit]").length > 0;});
      },function(w, $){return $("input[value=Find]").length > 0;});
    });
	},
	function(w, $){ return $("#ObjectPrivileges tr:last").length > 0;}
	);
}

(function() {
  
/* TO GET RESTRICTIONS
var links = $("a:contains('Edit Restrictions')");

function doIt(index){
  if(index >= links.length)
    return console.debug("END");
  
  window.open(links[index].href);
  
  popup().setWait(function(w, $) {
    var name = $(".pageTitleText h1").text().trim().match(/:\s(.*) \(\d+\)/)[1];
    var groups = $("#leftFrame").contents().find("a:not(:first)").map(function() { return $(this).text()});

    for(var i = 0; i<groups.length; ++i) {
      var group = groups[i];
      console.debug('  funcs.push(function _type_(callback){'.replace('_type_', name.replace(" ", "_") + i));
      console.debug('    general(callback, "_group_", "_name_");'.replace('_name_', name).replace('_group_', group));
      console.debug('  });');
      console.debug('');
    }
    
    w.close();
    doIt(++index);
  }, function(w,$) {return $("#leftFrame").contents().find(".saveButton").length;});
}

doIt(0);
*/
  var funcs = [];
  
  funcs.push(function Workflow_Map0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Workflow Map");
  });

  funcs.push(function Category0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Category");
  });

  funcs.push(function Category_Folder0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Category Folder");
  });

  funcs.push(function Custom_View0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Custom View");
  });

  funcs.push(function Workflow_Status0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Workflow Status");
  });

  funcs.push(function Profile0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Profile");
  });

  funcs.push(function Classification_Tree0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Classification Tree");
  });

  funcs.push(function Classification_Shortcut0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Classification Shortcut");
  });

  funcs.push(function Classification0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Classification");
  });

  funcs.push(function Project0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Project");
  });

  funcs.push(function Channel0(callback){
    general(callback, "CONFIG_PRIV_AdvancedUser", "Channel");
  });

  funcs.push(function News0(callback){
    general(callback, "CONFIG_PRIV_AdvancedUser", "News");
  });

  funcs.push(function Discussion0(callback){
    general(callback, "CONFIG_PRIV_AdvancedUser", "Discussion");
  });

  funcs.push(function Poll0(callback){
    general(callback, "CONFIG_PRIV_AdvancedUser", "Poll");
  });

  funcs.push(function Form0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Form");
  });

  funcs.push(function HTML_View0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "HTML View");
  });

  funcs.push(function Form_Template0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Form Template");
  });

  funcs.push(function Web_Forms_Database_Lookup0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Web Forms Database Lookup");
  });

  funcs.push(function Web_Forms_Database_Connection0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Web Forms Database Connection");
  });

  funcs.push(function LiveReport0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "LiveReport");
  });

  funcs.push(function XML_DTD0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "XML DTD");
  });

  funcs.push(function Prospector0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Prospector");
  });

  funcs.push(function Prospector_Snapshot0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Prospector Snapshot");
  });

  funcs.push(function Storage_Management0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Storage Management");
  });

  funcs.push(function Locators0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Locators");
  });

  funcs.push(function Record_Type0(callback){
    general(callback, "CONFIG_PRIV_CREATE_RECORD TYPE", "Record Type");
  });

  funcs.push(function Record_Type1(callback){
    general(callback, "FUNC_ALS", "Record Type");
  });

  funcs.push(function Record_Type2(callback){
    general(callback, "FUNC_RMS", "Record Type");
  });

  funcs.push(function RM_Folder0(callback){
    general(callback, "CONFIG_PRIV_CREATE_RM FOLDER", "RM Folder");
  });

  funcs.push(function RM_Folder1(callback){
    general(callback, "FUNC_ALS", "RM Folder");
  });

  funcs.push(function RM_Folder2(callback){
    general(callback, "FUNC_RMS", "RM Folder");
  });

  funcs.push(function RM_Part0(callback){
    general(callback, "CONFIG_PRIV_CREATE_RM PART", "RM Part");
  });

  funcs.push(function RM_Part1(callback){
    general(callback, "FUNC_ALS", "RM Part");
  });

  funcs.push(function RM_Part2(callback){
    general(callback, "FUNC_RMS", "RM Part");
  });

  funcs.push(function Record_Types0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Record Types");
  });

  funcs.push(function Appearance0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Appearance");
  });

  funcs.push(function Global_Appearance0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Global Appearance");
  });

  funcs.push(function Transport_Item0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Transport Item");
  });

  funcs.push(function Workbench0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Workbench");
  });

  funcs.push(function Warehouse_Folder0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Warehouse Folder");
  });

  funcs.push(function Transport_Package_Folder0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Transport Package Folder");
  });

  funcs.push(function Transport_Package0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Transport Package");
  });

  funcs.push(function Template_Folder0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Template Folder");
  });

  funcs.push(function Project_Template0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Project Template");
  });

  funcs.push(function Records_Management_Workspace0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Records Management Workspace");
  });

  funcs.push(function RM_Classification0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "RM Classification");
  });

  funcs.push(function Hold_Maintenance0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Hold Maintenance");
  });

  funcs.push(function RSI(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "RSI's");
  });

  funcs.push(function Dispositions0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Dispositions");
  });

  funcs.push(function Disposition_Search0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Disposition Search");
  });

  funcs.push(function Records_Management_Administration0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Records Management Administration");
  });

  funcs.push(function Reports0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Reports");
  });

  funcs.push(function RM_Classification_Terms0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "RM Classification Terms");
  });

  funcs.push(function Disposition_Group0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Disposition Group");
  });

  funcs.push(function Archived_Document0(callback){
    general(callback, "FUNC_DARWIN_Admin", "Archived Document");
  });

  funcs.push(function Content_Move_Volume0(callback){
    general(callback, "FUNC_DARWIN_Admin", "Content Move Volume");
  });

  funcs.push(function Content_Move_Job_Folder0(callback){
    general(callback, "FUNC_DARWIN_Admin", "Content Move Job Folder");
  });

  funcs.push(function Content_Move_Job0(callback){
    general(callback, "FUNC_DARWIN_Admin", "Content Move Job");
  });

  funcs.push(function Provenance0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Provenance");
  });

  funcs.push(function Hold_Group0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Hold Group");
  });

  funcs.push(function Accession_Search0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Accession Search");
  });

  funcs.push(function Search_Enabled_Hold0(callback){
    general(callback, "CONFIG_PRIV_RecordsManagement", "Search Enabled Hold");
  });

  funcs.push(function Custom_View_Template0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Custom View Template");
  });

  funcs.push(function Business_Workspace0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Business Workspace");
  });

  funcs.push(function Related_Business_Workspaces0(callback){
    general(callback, "CONFIG_PRIV_CREATE_RELATED BUSINESS WORKSPACES", "Related Business Workspaces");
  });

  funcs.push(function Virtual_Folder0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Virtual Folder");
  });

  funcs.push(function Column0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Column");
  });

  funcs.push(function Facet_Tree0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Facet Tree");
  });

  funcs.push(function Facet0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Facet");
  });

  funcs.push(function Facet_Folder0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Facet Folder");
  });

  funcs.push(function Fixed_System_Column0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Fixed System Column");
  });

  funcs.push(function Activity_Manager0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Activity Manager");
  });

  funcs.push(function SocialObject0(callback){
    general(callback, "FUNC_DARWIN_Admin", "SocialObject");
  });

  funcs.push(function MicroPost0(callback){
    general(callback, "FUNC_DARWIN_Admin", "MicroPost");
  });

  funcs.push(function Wiki0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Wiki");
  });

  funcs.push(function WebReport0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "WebReport");
  });

  funcs.push(function ActiveView0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "ActiveView");
  });

  funcs.push(function Binder0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Binder");
  });

  funcs.push(function Hierarchical_Storage_Folder0(callback){
    general(callback, "FUNC_DARWIN_Admin", "Hierarchical Storage Folder");
  });

  funcs.push(function Binding_Folder0(callback){
    general(callback, "FUNC_DARWIN_Admin", "Binding Folder");
  });

  funcs.push(function CS_Application_Manifest0(callback){
    general(callback, "FUNC_DARWIN_Admin", "CS Application Manifest");
  });

  funcs.push(function Chat_Room0(callback){
    general(callback, "FUNC_DARWIN_Admin", "Chat Room");
  });

  funcs.push(function Community_Template0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Community Template");
  });

  funcs.push(function Community0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Community");
  });

  funcs.push(function Comm_Workspace0(callback){
    general(callback, "CONFIG_PRIV_ContentAdmin", "Comm Workspace");
  });

  var monitor = new Monitor();
  
  monitor.then(deleteAllRestrictions);
  
  for(var i = 0; i < funcs.length; ++i)
    monitor.then(funcs[i]);
  
  monitor.execute();
})();
