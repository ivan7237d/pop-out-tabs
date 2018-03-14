chrome.browserAction.onClicked.addListener(currentTab => {
  popoutTab(currentTab);
});

chrome.commands.onCommand.addListener(command => {
  if (command == 'popout_action') {
    popoutTab(-1);
  }
});

function popoutTab(currentTab) {
  chrome.tabs.query(
    { currentWindow: true, highlighted: true },
    highlightedTabs => {
      chrome.windows.create({ tabId: highlightedTabs[0].id }, window => {
        chrome.tabs.move(highlightedTabs.map(tab => tab.id), {
          windowId: window.id,
          index: -1,
        });
        chrome.tabs.update(currentTab.id, { active: true });
      });
    },
  );
}
