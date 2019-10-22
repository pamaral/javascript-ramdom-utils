(function setWindowHistory(window) {
  if(window.openedWindows)
    return;

  var openedWindows = window.openedWindows = [];
  var _open = window.open; // saving original function
  window.open = function(url,name,params){
      var newWindow;
      openedWindows.push(newWindow = _open(url,name,params,Math.floor((Math.random()*100)+1)));
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
})(window);


function Monitor(label, dontReview) {
  label = label || "";
  if(label.length > 0)
    label += ": ";
  var callbacks = [];
  this.then = function(func) {callbacks.push(func); return this;};
  this.thenWithContext = function(url, func) {
    var fc = function (callback) {
      window.open(url).setWait(function (w, $) {
        func.call(w, function () {w.close(); callback(); });}
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

