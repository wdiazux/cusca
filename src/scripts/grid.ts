// Polyfill
// --------

import 'core-js/es/array';

if (window.NodeList && !NodeList.prototype.forEach) {
    // @ts-ignore
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Grid
// ----
const Shuffle = require('shufflejs').default;

const postFeed: HTMLDivElement | null = document.querySelector('.post-feed');

if (postFeed) {
    const shuffleInstance = new Shuffle(postFeed, {
        itemSelector: '.post-card',
        sizer: '.post-card-ex',
        buffer: 1,
    });

    shuffleInstance.on(Shuffle.EventType.LAYOUT, () => {
        const loadingCard: HTMLDivElement | null = document.querySelector(
            '.loading-card'
        );
        if (loadingCard) loadingCard.classList.remove('.loading-card');

        // Add class "loaded" to feed post container
        postFeed.classList.add('loaded');

        const placeholderCt: NodeListOf<HTMLElement> = document.querySelectorAll(
            '.placeholder-content-ct'
        );
        const placeholderImg: NodeListOf<HTMLElement> = document.querySelectorAll(
            '.placeholder-featured-image'
        );

        placeholderCt.forEach((placeHolder: HTMLElement): void => {
            if (placeHolder?.parentElement)
                placeHolder.parentElement.removeChild(placeHolder);
        });

        placeholderImg.forEach((placeHolder: HTMLElement): void => {
            if (placeHolder?.parentElement)
                placeHolder.parentElement.removeChild(placeHolder);
        });
    });
}
