/**
 * Global variables
 */

const nid = window.location.pathname.split('-').reverse()[0];
const path = window.location.pathname;
const host = window.location.origin;

/**
 * Helpers
 */

const isLocal = host => host.includes('dev.popsugar.com');
const isStaging = host => host.includes('.p3.staging.popsugar.com');

/**
 * Link getters
 */

// Functions to generate helpful links based on current page.
// These will either return a string or a function. A string will be
// a URL; a function will send a message to the extension service
// worker that will open a new window.

const getEditUrl = nid => {
    return `https://popsugar.com/${nid}/edit`
}

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

    return null;
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

const getAddPhotosUrl = nid => {
    return `https://popsugar.com/node/${nid}/edit/upload`
}

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
            } else if (getter) {
                toolbarItem.href = getter;
            }

            const toolbarItemImage = document.createElement('img');
            toolbarItemImage.src = chrome.runtime.getURL(item.image);

            toolbarItem.appendChild(toolbarItemImage);
            toolbar.appendChild(toolbarItem);
        }
    })
}
