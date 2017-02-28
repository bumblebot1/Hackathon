jQuery(function ($){
  "use strict"
  var howMany = 3
  var tried = 0
  adReplacer.getSelectors()
  .then(function (obj){
    var selectors = obj.selectors
    replaceAds(selectors, howMany, tried)
    console.log("hiasjfaikjfalk")
  })
})

function replaceAds(selectors, howMany, tried) {
  var found = $(selectors.join(',')).each(function (){
    adReplacer.processAdNode(this)
  })
  if (++tried < howMany) {
    setTimeout(function(){
      replaceAds(selectors, howMany, tried);
    }, 3000)
  }
}
