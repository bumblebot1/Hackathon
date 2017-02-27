(function() {
  'use strict';
  var imageURL = chrome.extension.getURL("images/Harambe.png")
  var adReplacer = {
    replacedCount : '',
    processAdNode : function (elem) {
      var done = false

      if (elem.tagName !== 'IFRAME'
          && elem.tagName !== 'IMG'
          && elem.tagName !== 'DIV'
          && elem.tagName !== 'OBJECT'
          && elem.tagName !== 'A'
          && elem.tagName !== 'INS'
          ) done = true

      //speed up by skipping the elements already replaced
      if ($(elem).data('replaced')) 
        done = true
      
      $(elem).data('replaced', true)
      
      if (done) return

      var origW = elem.offsetWidth
      var origH = elem.offsetHeight
      var wrap = $('<div>').css({
        width: origW,
        height: origH,
        position : $(elem).css('position') || 'relative'
      }).attr('class', elem.className).attr('id', elem.id)
      
      var div = $('<div>').css({
        width : origW + 'px',
        height : origH + 'px',
        display : 'block',
        position : 'absolute',
        zIndex : 100,
        background : "url(" + imageURL + ")",
        backgroundSize : "contain",
        backgroundPosition : "left " + ['top', 'bottom', 'center'][( Math.floor(Math.random() * 3) )],
        backgroundRepeat : "no-repeat"
      })
      

      wrap.append(div)
      $(elem.parentElement).append(wrap)
      $(elem).remove()
      return true
    },
    getBlockedSites : function (){
      return adReplacer.localGet('blockedSites')
        .then(function (obj){
          return obj.blockedSites || []
        })
    },
    toggleSiteBlock : function (host){
      return adReplacer.getBlockedSites()
      .then(function (blockedSites){
        if (R.contains(host, blockedSites)) {
          blockedSites = R.filter(R.pipe(R.equals(host),R.not), blockedSites)
        } else {
          blockedSites.push(host)
        }
        return adReplacer.localSet('blockedSites', blockedSites)
      })
    },
    // abstract storage for different browsers
    localSet : function (key, thing) {
      var d = Q.defer()
      if (typeof chrome !== 'undefined') {
        var save = {}
        save[key] = thing
        chrome.storage.local.set(save, d.resolve)
      }
      return d.promise
    },
    localGet : function (key) {
      var d = Q.defer()
      if (typeof chrome !== 'undefined') {
        chrome.storage.local.get(key, d.resolve)
      }
      return d.promise
    },
    fetchSelectorList : function () {
      $.ajax({
        url : 'https://easylist-downloads.adblockplus.org/easylist.txt',
        type : 'get',
        success : function (txt){
          var txtArr = txt.split("\n").reverse() 
          var selectors = txtArr 
                .filter(function (line) {
                  return /^##/.test(line)
                })
                .map(function (line) {
                  return line.replace(/^##/, '')
                })

          var whitelist = txtArr
                .filter(function (line){
                  return /^[a-z0-9]/.test(line) && !/##/.test(line)
                })
                .map(R.split('#@#'))
          adReplacer.localSet('selectors', {
            selectors : selectors,
            whitelist : whitelist
          })
        }
      })
    },
    getSelectors : function () {
      var response
      return adReplacer.localGet('selectors')
      .then(function (obj) {
        response = obj.selectors
        return adReplacer.getBlockedSites()
      })
      .then(function (blockedSites){
        response.blockedSites = blockedSites
        return response
      })
    },
    addPropToObj : R.curry(function (prop, fn){
      return function (obj) {
        return R.set(R.lensProp(prop), typeof fn === 'function' ? fn(obj) : fn, R.clone(obj))
      }
    })
  }
  window.adReplacer = adReplacer
})();


