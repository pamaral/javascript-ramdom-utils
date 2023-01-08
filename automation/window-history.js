
(function setWindowHistory(window) {
  if(window.openedWindows)
    return;

  var openedWindows = window.openedWindows = [];
  var _open = window.open; // saving original function
  window.open = function(url,name,params){
      var newWindow;
      
      newWindow = _open(url,name,params,Math.floor((Math.random()*100)+1));
      
      if(!newWindow) {
        alert("allow pop-ups in your browser and try again");
        return;
      }
      
      openedWindows.push(newWindow);
      setWindowHistory(newWindow);
      return newWindow;
  }
  
  openedWindows.last = function () {
    return this[this.length-1];
  }
  
  window.setWait = function setWait(callback, validator) {
    this.setWaitFor(this, callback, validator);
  }
  
  window.setWaitFor = function(window, callback, validator) {
    validator = validator || function(){return window.$(".copyright,.livelinkVersionAndCopyright").length > 0;};
    
    function doWait() {
      if(window.waitForSubmit || !window.$ || !validator(window, window.$))
        setTimeout(doWait, 100);
      else {
        setWindowHistory(window);
        callback.call(window, window, window.$);
      }
    }
    
    setTimeout(doWait, 100);
  }
  
  window.popup = function () {
    return openedWindows.last();
  }
    
  window.setSubmit = function () {
    this.waitForSubmit = true;
    return this;
  }
  
  window.Monitor = Monitor;
  
  window.Context = Context;
})(window);


function Monitor(label, dontReview) {
  label = label || "";
  if(label.length > 0)
    label += ": ";
  var callbacks = [];
  this.then = function(func) {callbacks.push(func); return this;};
  this.thenWithContext = function(url, func, w) {
    var fc = function (callback) {
      if(!w) {
        w = window.open("");
      }
      
      w.setSubmit();
      w.location = url;
      
      w.setWait(function (w, $) {
        func.call(w, function () {/*w.close();*/ callback(); });}
      );
    }
    Object.defineProperty(fc, 'name', { writable: true });

    fc.name = func.name;
    callbacks.push(fc); 
    return this;
  };
  this.execute = function() {
    (function doIt(index){
      if(index >= callbacks.length) {
        dontReview !== true && alert("Please review the configurations..");
        return console.debug(label + "end chain");
      }
      
      console.debug(label + "invoking: " + callbacks[index].name);
      callbacks[index](function(){doIt(index+1)});
    })(0);
  }
}

function Context(callback, options, wind) {
  var context = this;
  this.w = !wind ? window.open("") : (wind.w || wind);
  
  callback = (callback || function () {console.warn("no callback defined"); console.warn(context);});
  
  var contexts = this.contexts = [];
  
  this.push = function(options, callback) {
    callback = callback || function() { context.done(); };
    contexts.push(new Context(callback, options, this.w));
  }
  
  this.unshift = function(options, callback) {
    callback = callback || function() { context.done(); };
    contexts.unshift(new Context(callback, options, this.w));
  }
  
  this.wait = function(validator) {
    return this.window().wait(validator).done(function() {context.done();});
  }
  
  this.submit = function(validator) {
    return this.window().submit(validator).done(function() {context.done();});
  }
  
  this.window = function() {
    return new WindowWrapper(context.w);
  }
  
  this.execute = function() {
    if(!options)
      return this.done();
    
    if(!options.url) {
      return this.done();
    }
    
    new Monitor(null, true).thenWithContext(options.url, function(callback) {
      var window = this;
      context.w = window;
      
      var _done = context.done;
      
      context.done = function() {
        context.done = _done;
        // make sure the monitor callback is executed, just for the sake of it...
        callback();
        
        context.done();
      }
      
      options.func.apply(null, [context, options.params]);
        
    }, context.w).execute();
  }
  
  this.done = function() {
    if(contexts.length == 0) {
      return callback(this.w, this);
    }
    contexts.shift().execute();
  }
}

function WindowWrapper(window, validator) {
  this.validator = validator;
  
  this.wait = function(validator) {
    validator = validator || this.validator;
    
    var deferred = $.Deferred();
    
    window.setWait(function() { deferred.resolve(); }, validator);
    
    return deferred;
  }
  
  this.submit = function(validator) {
    window.setSubmit();
    
    return this.wait(validator);
  }
}

/*

var inputtext = $("input[type=text]:visible,input[type=password]:visible").map(function() { return "$('#_ID_[name=_NAME_]').val('_VALUE_').change().focusout()".replace("_ID_",$(this).attr("id") || "").replace("_NAME_",$(this).attr("name") || "").replace("_VALUE_",$(this).val()).replace("[name=]","").replace("#[","[") }).toArray();
var textarea = $("textarea:visible").map(function() { return "$('#_ID_[name=_NAME_]').val(decodeURIComponent('_VALUE_')).change()".replace("_ID_",$(this).attr("id") || "").replace("_NAME_",$(this).attr("name") || "").replace("_VALUE_",encodeURIComponent($(this).val()).replace("'", "\\'")).replace("[name=]","").replace("#[","[") }).toArray();
var checkbox = $("input[type=checkbox]:visible").map(function() { return "$('#_ID_[value=_VALUE_][name=_NAME_]:_SELECTOR_').click().change()".replace("_ID_",$(this).attr("id") || "").replace("_NAME_",$(this).attr("name") || "").replace("_VALUE_",$(this).val()).replace('_SELECTOR_', $(this).is(":checked") ? "not(:checked)": "checked").replace("[value=on]","").replace("[name=]","").replace("#[","[") }).toArray();

var arr = [];
arr.push.apply(arr, inputtext);
arr.push.apply(arr, textarea);
arr.push.apply(arr, checkbox);

console.log("  " + arr.join("\n  "))

*/

function addAdminServer(context, params) {
  var $ = context.w.$;
  /*
    {
      name: "",
      host: "",
      password: "",
    }
  */
  
  if($("#alias").val() != params.name) {
    console.warn(params.name + " not found in page, assuming it's already configured... moving on");
    return context.done();
  }
  
  $('#HOST[name=HOST]').val(params.host).change().focusout()
  $('#password[name=password]').val(params.password).change().focusout()
  $('#verify_password[name=verify_password]').val(params.password).change().focusout()
  $('#description[name=description]').val(decodeURIComponent(params.description || "")).change()
  $('#defaultServer[name=defaultServer]:checked').click().change()
  $('#showCheckbox_password:checked').click().change()
  $('#FileCacheEnabled[name=FileCacheEnabled]:not(:checked)').click().change();
  
  $("#addButton").click();
  context.wait();
}

function addPartition(context, params) {
  var $ = context.w.$;
  
  $("a:contains('Enterprise Data Source Folder')")[0].click();
  context.window().submit().then(function() {
    var $ = context.w.$;
    console.debug("inside 'Enterprise Data Source Folder'");
    
    console.log(-1);
    $("a:contains('Enterprise Partition Map')")[0].click();
    console.log(0);
    
    return context.window().submit().then(function() {
      var $ = context.w.$;
      console.log(1);
      $(".menuItem > a:contains('Partition')").click();
      console.log(2);
      
      return context.window().submit();
    })
  }).done(partitionWizardStep1);
  
  function partitionWizardStep1() {
    console.debug("partitionWizardStep1");
    var $ = context.w.$;
    
    $("#NextButton").click();
    context.window().submit().done(partitionWizardStep2);
  }
  
  function partitionWizardStep2() {
    console.debug("partitionWizardStep2");
    var $ = context.w.$;
    
    $('[name=PartitionName]').val(params.partition.PartitionName).change().focusout()
    $('[name=MaxContentSizeInMBytes]').val(params.partition.MaxContentSizeInMBytes).change().focusout()
    $('[name=MaxMetadataSizeInMBytes]').val(params.partition.MaxMetadataSizeInMBytes).change().focusout()
    
    $("input[type=submit]").click();
    context.window().submit().done(partitionWizardStep3);
  }
  
  function partitionWizardStep3() {
    console.debug("partitionWizardStep3");
    var $ = context.w.$;
    
    $('[name=IndexEngineName]').val(params.index.IndexEngineName).change().focusout();
    $('#AdminServer_ID').val(params.index.AdminServer);
    $('#AdminPort[name=AdminPort]').val(params.index.AdminPort).change().focusout();
    $('#ServerPort[name=ServerPort]').val(params.index.ServerPort).change().focusout();
    
    var window = context.w;
    
    function createShare(window) {
      var w = window.popup();
      var deferred = $.Deferred();
      
      var wr = new WindowWrapper(w, function(w, $) {return $("#BrowseAdminFolderForm").length > 0; });
      
      return wr.wait().then(function() {
        console.debug("execute changeDir");
        w.changeDir( "/opt/opentext/cs_index_shared/enterprise" );
        
        return wr.submit().then(function() {
          console.debug("execute prompt");
          w.prompt = function() {return params.PartitionDir};
          w.addDir();
          
          return wr.submit().then(function() {
            console.debug("execute selectDir");
            w.selectDir( '/opt/opentext/cs_index_shared/enterprise/' + params.PartitionDir );
          });
        });
      })
    }
    
    $("input[name=IndexDirectory_BrowseDir]").click();
    
    createShare(window).done(partitionWizardStep4);
  }
  
  function partitionWizardStep4() {
    console.debug("partitionWizardStep4");
    var $ = context.w.$;
    
    $('[name=SearchEngineName1]').val(params.search.SearchEngineName).change().focusout()
    $('#AdminServer1_ID').val(params.search.AdminServer);
    $('#AdminPort1[name=AdminPort1]').val(params.search.AdminPort).change().focusout()
    $('#ServerPort1[name=ServerPort1]').val(params.search.ServerPort).change().focusout()

    $("input[type=submit]").click();
    context.window().submit().done(partitionWizardStep5);
  }
  
  function partitionWizardStep5() {
    console.debug("partitionWizardStep5");
    var $ = context.w.$;
    
    $("#finishButton").click();
    
    context.submit();
  }
'}

var adminPassword = "FerrovieGosign12";

var context = new Context(function (window) {
  console.error(1);
  // close the opened window
  window.close();
});
/*
context.push(
    {
      url:"?func=OTAdmin.CreateServer&nextURL=%2Fcs%2Fcs%2Eexe%3Ffunc%3Dll%26objId%3D2001%26objAction%3Dbrowse", 
      func: addAdminServer,
      params: {name: "AdminServer-02", host: "otcs-backend-search-0.otcs-backend-search.xecm-dev.svc.cluster.local", password: adminPassword}
    }
  );

context.push(
    {
      url:"?func=OTAdmin.CreateServer&nextURL=%2Fcs%2Fcs%2Eexe%3Ffunc%3Dll%26objId%3D2001%26objAction%3Dbrowse", 
      func: addAdminServer,
      params: {name: "AdminServer-03", host: "otcs-backend-search-0.otcs-backend-search.xecm-dev.svc.cluster.local", password: adminPassword}
    }
  );
*/

context.push(
    {
      url:"?func=ll&objId=2001&objAction=browse", 
      func: addPartition,
      params: {
        partition: {
          PartitionName: "Partition 2", 
          MaxContentSizeInMBytes: 100000, 
          MaxMetadataSizeInMBytes: 1000
        },
        index: {
          AdminServer: "AdminServer-02", 
          IndexEngineName: "Index Engine for Partition 4", 
          AdminPort: 8510, 
          ServerPort:8511, 
          PartitionDir:"index4"
        },
        search: {
          AdminServer: "AdminServer-02", 
          SearchEngineName: "Search Engine For Partition 4", 
          AdminPort: 8524, 
          ServerPort:8525
        }
      }
    }
  );
    
context.execute();
