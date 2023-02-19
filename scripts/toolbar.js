/**
 * Code to insert tooltip icons above the header of PS nodes
 **/

// Functions to generate helpful links based on current page
const getAmpUrl = (nid) => {
    return `https://popsugar.com/${nid}/amp`
}

// Don't add toolbar on mobile
if (window.innerWidth > 768) {
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

    const toolbar = document.createElement('div');
    toolbar.classList.add('ps-edit-toolbar', 'hidden');

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

    const header = document.querySelector('.article-header');
    header.insertBefore(toolbar, header.firstChild);

    // header.addEventListener("mouseenter", (e) => {
    //     e.target.classList.remove('hidden');
    // })

    // header.addEventListener("mouseleave", (e) => {
    //     e.target.classList.add('hidden');
    // })
}
