function runUpgrade()
{
  if ( !upgradeStatus.completed )
  {
    $.ajax({
			type: "post",
			url: baseURL,
			data: RUN_UPGRADE_DATA,
			cache: false,
      success: function (responseData) {
        if((typeof responseData) == 'string') {
          return setTimeout(runUpgrade, 20000);
        }
        try {
          upgradeStatus = responseData;
          showStatus();
          setTimeout( runUpgrade, RUN_UPGRADE_WAIT_PERIOD );
          $("#upgraded").html($("#upgraded").html() + " - " + new Date().toTimeString().match(/^\S+/)[0]);
        } catch (e) {
          setTimeout(runUpgrade, 60000);
        }
      },
      error: function () {
        try {
          if(!window.mySsoLoginWindow || window.mySsoLoginWindow.closed)
            window.amaral = window.open();
          
          window.amaral.location = "?func=llworkspace";
        } catch (e) {}
        setTimeout(function () {try {window.mySsoLoginWindow.close();} catch (e) {} runUpgrade();}, 5000)
      }
    });
  }
}
