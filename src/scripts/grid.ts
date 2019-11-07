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
        const items: NodeListOf<HTMLDivElement> = document.querySelectorAll(
            '.post-card'
        );
        const spinKit: HTMLElement | null = document.getElementById('spinkit');

        // Add class "loaded" to feed post container
        postFeed.classList.add('loaded');

        // Add animation class "in" to post-card
        items.forEach(item => {
            item.classList.add('in');
        });

        // Wait 6 milliseconds to remove spinkKit
        setTimeout(() => {
            if (spinKit && spinKit.parentNode) {
                spinKit.parentNode.removeChild(spinKit);
            }
        }, 600);
    });
}
