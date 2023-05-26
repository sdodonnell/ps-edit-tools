/**
 * Code to insert tooltip icons next to gallery slides
 **/
(function() {
    const gallerySlideContainers = document.querySelectorAll('div[data-element-type="ParagraphSlide"]');
    let isShowing = false;
    
    if (gallerySlideContainers.length > 0) {
        gallerySlideContainers.forEach(slide => {
            const toolbarContainer = document.createElement('div');
            toolbarContainer.classList.add('ps-gallery-slide-toolbar', 'hide');
            const toolbar = document.createElement('div');
            toolbarContainer.appendChild(toolbar);
    
            // Add links to toolbar
    
            // Set up visibility toggle
    
            slide.insertBefore(toolbarContainer, slide.firstChild);
        })
    }
})()
