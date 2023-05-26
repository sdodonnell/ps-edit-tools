/**
 * Code to insert tooltip icons above the header of PS nodes
 **/
(function() {
    const header = document.querySelector('.article-header');
    let isShowing = false;
    
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
})()
