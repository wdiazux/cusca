// Polyfill
// --------

import 'core-js/es/array';

const Shuffle = require('shufflejs').default;

if (window.NodeList && !NodeList.prototype.forEach) {
    // @ts-ignore
    NodeList.prototype.forEach = Array.prototype.forEach;
}
const onImagesLoaded = (container: string, callback?: () => void) => {
    const containerElm: HTMLElement | null = document.querySelector(container);
    if (!container) return;

    const images: HTMLCollectionOf<HTMLImageElement> = containerElm!.getElementsByTagName(
        'img'
    );
    let loaded: number = images.length;

    if (loaded === 0 && callback) {
        callback();
        return;
    }

    Array.from(images).forEach(image => {
        if (image.complete) {
            // eslint-disable-next-line no-plusplus
            loaded -= 1;
            if (loaded === 0 && callback) callback();
        } else {
            image.addEventListener('load', () => {
                // eslint-disable-next-line no-plusplus
                loaded -= 1;
                if (loaded === 0 && callback) callback();
            });
        }
    });
};

// Grid
// ----
const postFeed: HTMLDivElement | null = document.querySelector('.post-feed');
const shuffleInstance = new Shuffle(postFeed, {
    itemSelector: '.post-card',
    sizer: '.post-card-ex',
    buffer: 1,
});

const postCard: NodeListOf<HTMLDivElement> | null = document.querySelectorAll(
    '.post-card'
);
if (postCard) {
    postCard.forEach((card: HTMLDivElement): void => {
        let cardHeight = 220;
        const line2 = card.querySelector('.placeholder-text2');
        const line3 = card.querySelector('.placeholder-text3');
        const placeholderCt: HTMLDivElement | null = card.querySelector(
            '.placeholder-content-ct'
        );
        const postCardMeta: HTMLDivElement | null = card.querySelector(
            '.post-card-meta'
        );

        if (postCardMeta) {
            cardHeight = postCardMeta.offsetTop + postCardMeta.offsetHeight;
        }
        if (cardHeight < 119) {
            card.style.minHeight = '0';
            if (line2?.parentNode) line2.parentNode.removeChild(line2);
            if (line3?.parentNode) line3.parentNode.removeChild(line3);
            if (placeholderCt) placeholderCt.style.minHeight = '0';
        }
    });
}

const shuffleCards = (): void => {
    if (postFeed) {
        // Remove placeholder class in parent
        postFeed.classList.remove('loading-cards');

        // Add class "loaded" to feed post container
        postFeed.classList.add('loaded');

        shuffleInstance.on(Shuffle.EventType.LAYOUT, () => {
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
};

onImagesLoaded('.post-feed', shuffleCards);
