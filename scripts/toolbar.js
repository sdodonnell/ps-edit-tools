/**
 * Code to insert tooltip icons above the header of PS nodes
 **/
const header = document.querySelector('.article-header');
let isToolbarShowing = false;

/**
 * Link getters
 */

// Functions to generate helpful links based on current page.
// These will either return a string or a function. A string will be
// a URL; a function will send a message to the extension service
// worker that will open a new window.
const getAppleNewsUrl = () => {
    const nextData = JSON.parse(document.getElementById('__NEXT_DATA__')?.innerText || '{}');
    const appleNewsId = nextData?.props?.pageProps?.page?.apple_news_id;

    if (appleNewsId) {
        const apiUrl = `https://popsugar.com/api/news/getarticle?uid=${appleNewsId}`;

        return async () => {
            const apiResponse = await fetch(apiUrl);
            const apiResponseJson = await apiResponse.json();
            const url = apiResponseJson.url;
            const data = {
                type: 'appleNews',
                url
            }

            await chrome.runtime.sendMessage(data);
        }
    }
}

const getAmpUrl = (_, path, host) => {
    return `${host}/amphtml/${path}`
}

const getMobileUrl = () => {
    const url = window.location.href
    return async () => {
        const data = {
            type: 'mobile',
            url
        }

        await chrome.runtime.sendMessage(data);
    }
}

const getAnalyticsUrl = nid => {
    return `https://popsugar.com/dashboard/analytics/overview?nid=${nid}`
}

const getTimersUrl = nid => {
    return `https://popsugar.com/${nid}/edit?#publishing_options`
}

const getEditUrl = nid => {
    return `https://popsugar.com/${nid}/edit`
}

/**
 * Helpers
 */

const isLocal = host => host.includes('dev.popsugar.com');
const isStaging = host => host.includes('.p3.staging.popsugar.com');

// Don't add toolbar on mobile, or on non-node pages
if (header && window.innerWidth > 768) {
    const toolbarItems = {
        appleNews: {
            show: true,
            getLink: getAppleNewsUrl,
            image: 'images/apple-news.png',
            title: 'Apple News Link'
        },
        amp: {
            show: true,
            getLink: getAmpUrl,
            image: 'images/flash.png',
            title: 'AMP preview'
        },
        mobile: {
            show: true,
            getLink: getMobileUrl,
            image: 'images/iphone.png',
            title: 'Mobile preview'
        },
        analytics: {
            show: true,
            getLink: getAnalyticsUrl,
            image: 'images/analytics.png',
            title: 'Analytics dashboard'
        },
        timers: {
            show: true,
            getLink: getTimersUrl,
            image: 'images/clock.png',
            title: 'View timers'
        },
        edit: {
            show: true,
            getLink: getEditUrl,
            image: 'images/edit.png',
            title: 'Edit post'
        },
    }

    // Create toolbar DOM node
    const toolbarContainer = document.createElement('div');
    toolbarContainer.classList.add('ps-edit-toolbar', 'hide');
    const toolbar = document.createElement('div');
    toolbarContainer.appendChild(toolbar);

    addLinksToToolbar(toolbarItems, toolbar)

    header.insertBefore(toolbarContainer, header.firstChild);

    const hideToolbar = () => {
        toolbarContainer.classList.add('hide');
        isToolbarShowing = false;
    }

    const showToolbar = () => {
        toolbarContainer.classList.remove('hide');
        isToolbarShowing = true;
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
        if (e.key === '?' && !isToolbarShowing) {
            showToolbar();
            removeEventListeners();
        } else if (e.key === '?' && isToolbarShowing) {
            hideToolbar();
            addEventListeners();
        }
    })

    addEventListeners();
}
