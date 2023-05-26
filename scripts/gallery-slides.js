/**
 * Code to insert tooltip icons next to gallery slides
 **/
(function() {
    const gallerySlideContainers = document.querySelectorAll('div[data-element-type="ParagraphSlide"]');
    let isShowing = false;

    const addIndexToToolbar = (index, toolbar) => {
        const number = document.createElement('div');
        number.innerText = index + 1;
        toolbar.appendChild(number);
    }

    const getImageEditUrl = (nid, imageNid, index) => {
        const pageNum = Math.ceil((index + 1) / 25);
        return `https://www.popsugar.com/node/${nid}/edit/photos?page=${pageNum}#${imageNid}`
    }

    const getImageSizesUrl = (imageNid) => {
        return `https://www.popsugar.com/image/sizes/${imageNid}`
    }

    const addEditImageUrlToToolbar = (slide, index, toolbar) => {
        const toolbarItem = document.createElement('a');
        toolbarItem.title = 'Edit Image';
        toolbarItem.target = "_blank";

        const imageNid = slide.id.split('-')[1];
        toolbarItem.href = getImageEditUrl(nid, imageNid, index);

        const toolbarItemImage = document.createElement('img');
        toolbarItemImage.src = chrome.runtime.getURL('images/edit.png');

        toolbarItem.appendChild(toolbarItemImage);
        toolbar.insertBefore(toolbarItem, toolbar.childNodes[2]);
    }

    const addImageSizesUrlToToolbar = (slide, toolbar) => {
        const toolbarItem = document.createElement('a');
        toolbarItem.title = 'Image Sizes';
        toolbarItem.target = "_blank";

        const imageNid = slide.id.split('-')[1];
        toolbarItem.href = getImageSizesUrl(imageNid);

        const toolbarItemImage = document.createElement('img');
        toolbarItemImage.src = chrome.runtime.getURL('images/edit.png');

        toolbarItem.appendChild(toolbarItemImage);
        toolbar.insertBefore(toolbarItem, toolbar.childNodes[3]);
    }
    
    if (gallerySlideContainers.length > 0 && window.innerWidth > 768) {
        gallerySlideContainers.forEach((slide, index) => {
            const toolbarContainer = document.createElement('div');
            toolbarContainer.classList.add('ps-gallery-slide-toolbar', 'hide');
            const toolbar = document.createElement('div');
            toolbarContainer.appendChild(toolbar);
    
            // Add links to toolbar
            const toolbarItems = {
                //
                // The first item will always be the index.
                //
                editPost: {
                    show: true,
                    getLink: getEditUrl,
                    image: 'images/edit.png',
                    title: 'Edit Post'
                },
                //
                // The third item will be the image edit URL, which is generated below.
                //
                //
                // The fourth item will be the edit image sizes URL, which is generated below.
                //
                addPhotos: {
                    show: true,
                    getLink: getAddPhotosUrl,
                    image: 'images/edit.png',
                    title: 'Add Photos'
                }
            }
    
            addIndexToToolbar(index, toolbar);
            addLinksToToolbar(toolbarItems, toolbar);
            addEditImageUrlToToolbar(slide, index, toolbar);
            addImageSizesUrlToToolbar(slide, toolbar);
    
            slide.insertBefore(toolbarContainer, slide.firstChild);
        })
    
        const toolbars = document.querySelectorAll('.ps-gallery-slide-toolbar')
    
        const hideGalleryToolbars = () => {
            toolbars.forEach(toolbar => toolbar.classList.add('hide'));
            isShowing = false;
        }
    
        const showGalleryToolbars = () => {
            toolbars.forEach(toolbar => toolbar.classList.remove('hide'));
            isShowing = true;
        }
    
        window.addEventListener('keydown', e => {
            if (e.key === '?' && !isShowing) {
                showGalleryToolbars();
            } else if (e.key === '?' && isShowing) {
                hideGalleryToolbars();
            }
        })
    }

})()
