jQuery(function ($){
  var howMany = 3
  var tried = 0
  adFinder.getSelectors()
  .then(function (obj){
    var selectors = obj.selectors
    ;(function checkIFrames() {
      var found = $(selectors.join(',')).each(function (){
        var $this = $(this)
        adFinder.processAdNode(this)
      })
      if (++tried < howMany) {
        setTimeout(checkIFrames, 3000)
      }
    })()
  })
})
