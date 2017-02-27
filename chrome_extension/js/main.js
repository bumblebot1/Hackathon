if (typeof chrome !== 'undefined') {
  chrome.runtime.onInstalled.addListener(function(event) {
    init(event);
  });

  chrome.runtime.onStartup.addListener(function(event) {
    init(event)
    .then(function (){
      return adReplacer.localGet('disableAutoUpdate')
    })
  });
}

function init(event) {
  adReplacer.fetchSelectorList()
}
