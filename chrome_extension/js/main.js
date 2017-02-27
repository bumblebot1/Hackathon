if (typeof chrome !== 'undefined') {
  chrome.runtime.onInstalled.addListener(function(event) {
    init(event);
  });

  chrome.runtime.onStartup.addListener(function(event) {
    init(event)
    .then(function (){
      return adFinder.localGet('disableAutoUpdate')
    })
  });

  chrome.runtime.onMessage.addListener(function (msg) {
    var key = msg.msg.what
    if (adFinder[key] && typeof adFinder[key] === 'function') {
      adFinder[key](msg.msg[key])
    }
  })
}

function init(event) {
  adFinder.fetchSelectorList()
}
