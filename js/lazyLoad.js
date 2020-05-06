(function() {
  const loadMultipleCss = function(){
    loadCSS('vendor/fontawesome-free/css/all.min.css');
    loadCSS('vendor/magnific-popup/magnific-popup.min.css');
  }

  const loadCSS = function(cssPath){
      var cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = cssPath;
      var head = document.getElementsByTagName('head')[0];
      head.parentNode.insertBefore(cssLink, head);
  };

  //call function on window load
  window.addEventListener('DOMContentLoaded', loadMultipleCss);
})()
