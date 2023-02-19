async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

chrome.tabs.onActivated.addListener(async () => {
    try {
        console.log(chrome);
        const tab = await getCurrentTab();
        chrome.scripting.insertCSS({
            files: ["stylesheet.css"],
            target: { tabId: tab.id },
        })

        console.log('added stylesheet!')
    } catch (e) {
        console.log(e);
    }
});
