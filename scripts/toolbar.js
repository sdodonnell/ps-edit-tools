/**
 * Code to insert tooltip icons above the header of PS nodes
 **/

const header = document.querySelector('.article-header');
let isShowing = false;

// Functions to generate helpful links based on current page
const getAmpUrl = (nid) => {
    return `https://popsugar.com/${nid}/amp`
}

// Don't add toolbar on mobile, or on non-node pages
if (header && window.innerWidth > 768) {
    const toolbarItems = {
        appleNews: {
            show: true,
            getLink: () => { },
            image: 'images/something.png'
        },
        amp: {
            show: true,
            getLink: getAmpUrl,
            image: 'images/something.png'
        },
        mobile: {
            show: true,
            getLink: () => { },
            image: 'images/something.png'
        },
        analytics: {
            show: true,
            getLink: () => { },
            image: 'images/something.png'
        },
        timers: {
            show: true,
            getLink: () => { },
            image: 'images/something.png'
        },
        edit: {
            show: true,
            getLink: () => { },
            image: 'images/something.png'
        },
    }

    // Get nid from current page
    const nid = window.location.href.split('-').reverse()[0];

    // Create toolbar DOM node
    const toolbarContainer = document.createElement('div');
    toolbarContainer.classList.add('ps-edit-toolbar', 'hide');
    const toolbar = document.createElement('div');
    toolbarContainer.appendChild(toolbar);

    // Generate toolbar items and add to parent DOM node
    Object.values(toolbarItems).forEach(item => {
        if (item.show) {
            const toolbarItem = document.createElement('a');
            toolbarItem.href = item.getLink(nid);

            const toolbarItemImage = document.createElement('img');
            toolbarItemImage.src = chrome.runtime.getURL(item.image);

            toolbarItem.appendChild(toolbarItemImage);
            toolbar.appendChild(toolbarItem);
        }
    })

    header.insertBefore(toolbarContainer, header.firstChild);

    const hideToolbar = () => {
        toolbarContainer.classList.add('hide');
        isShowing = false;
    }

    const showToolbar = () => {
        toolbarContainer.classList.remove('hide');
        isShowing = true;
    }

    const addEventListeners = () => {
        toolbarContainer.addEventListener("pointerenter", showToolbar);
        toolbarContainer.addEventListener("pointerleave", hideToolbar);
    }

    const removeEventListeners = () => {
        toolbarContainer.removeEventListener('pointerleave', hideToolbar);
        toolbarContainer.removeEventListener('pointerenter', showToolbar);
    }

    window.addEventListener('keydown', e => {
        if (e.key === '?' && !isShowing) {
            showToolbar();
            removeEventListeners();
        } else if (e.key === '?' && isShowing) {
            hideToolbar();
            addEventListeners();
        }
    })

    addEventListeners();
}
