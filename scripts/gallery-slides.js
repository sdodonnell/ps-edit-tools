/**
 * Code to insert tooltip icons next to gallery slides
 **/
const gallerySlideContainers = document.querySelectorAll('div[data-element-type="ParagraphSlide"]');
let isGalleryToolbarShowing = false;

if (gallerySlideContainers.length > 0 && window.innerWidth > 768) {
    gallerySlideContainers.forEach((slide, index) => {
        const toolbarContainer = document.createElement('div');
        toolbarContainer.classList.add('ps-gallery-slide-toolbar', 'hide');
        const toolbar = document.createElement('div');
        toolbarContainer.appendChild(toolbar);

        // Add links to toolbar
        const toolbarItems = {
            // The first item will always be the index.
            editPost: {},
            editImage: {},
            imageSizes: {},
            addPhotos: {}
        }

        addLinksToToolbar(toolbarItems, toolbar)

        slide.insertBefore(toolbarContainer, slide.firstChild);
    })

    const toolbars = document.querySelectorAll('.ps-gallery-slide-toolbar')

    const hideGalleryToolbars = () => {
        toolbars.forEach(toolbar => toolbar.classList.add('hide'));
        isGalleryToolbarShowing = false;
    }

    const showGalleryToolbars = () => {
        toolbars.forEach(toolbar => toolbar.classList.remove('hide'));
        isGalleryToolbarShowing = true;
    }

    window.addEventListener('keydown', e => {
        if (e.key === '?' && !isGalleryToolbarShowing) {
            showGalleryToolbars();
        } else if (e.key === '?' && isGalleryToolbarShowing) {
            hideGalleryToolbars();
        }
    })
}
