// Get nid from current page
const nid = window.location.pathname.split('-').reverse()[0];
const path = window.location.pathname;
const host = window.location.origin;

// Generate toolbar items and add to parent DOM node
const addLinksToToolbar = (toolbarItems, toolbar) => {
    Object.values(toolbarItems).forEach(item => {
        if (item.show) {
            const toolbarItem = document.createElement('a');
            toolbarItem.title = item.title;
            toolbarItem.target = "_blank";

            const getter = item.getLink(nid, path, host);
            if (typeof getter === 'function') {
                toolbarItem.onclick = getter;
            } else {
                toolbarItem.href = getter;
            }

            const toolbarItemImage = document.createElement('img');
            toolbarItemImage.src = chrome.runtime.getURL(item.image);

            toolbarItem.appendChild(toolbarItemImage);
            toolbar.appendChild(toolbarItem);
        }
    })
}
