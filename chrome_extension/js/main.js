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

  chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.create({
      url: chrome.extension.getURL('page/index.html')
    })
  });
}

function init(event) {
  adReplacer.fetchSelectorList()
}
