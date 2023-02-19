chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'mobile') {
        chrome.windows.create({
            url: request.url,
            height: 677,
            width: 375,
            type: 'popup'
        })
    } else if (request.type === 'appleNews') {
        chrome.windows.create({
            url: request.url,
            height: 677,
            width: 767
        })
    }
}
);
