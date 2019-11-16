// Lightbox
// --------

import 'lightgallery.js';
import 'lg-zoom.js';

// PrismJS
// -------

import 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/components/prism-batch';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';

// Feature Image Background
// ------------------------

import ColorThief from 'colorthief';

// Helper function
// ---------------

function wrap(el: Element, wrapper: HTMLElement) {
    if (!el.parentNode) return;
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

// Feature Image Background
// ------------------------

const featureImageCt: HTMLElement | null = document.querySelector(
    '.post-full-image'
);
if (featureImageCt) {
    const featureImage: HTMLImageElement | null = featureImageCt.querySelector(
        'img'
    );
    const postFullImageBg: HTMLElement | null = document.querySelector(
        '.post-full-image-background'
    );
    const featureImageElm: HTMLImageElement = new Image();
    let paletteReady = false;
    /*
    const googleProxyURL =
        'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
     */

    featureImageElm.crossOrigin = 'Anonymous';
    /*
    if (featureImage)
        featureImage.src =
            googleProxyURL + encodeURIComponent(featureImage.src);
     */
    if (featureImage) featureImageElm.src = featureImage.src;

    const getPalette = (): void => {
        paletteReady = true;
        const colorThief = new ColorThief();

        if (featureImage?.complete) {
            const bgColor: string = colorThief.getColor(featureImage);

            featureImageCt.classList.add('loaded');

            if (postFullImageBg)
                postFullImageBg.style.background = `rgba(${bgColor}, 0.9)`;

            setTimeout(() => {
                const spinKit: HTMLElement | null = document.getElementById(
                    'spinkit'
                );
                if (spinKit && spinKit.parentNode) {
                    spinKit.parentNode.removeChild(spinKit);
                }
            }, 500);
        }
    };

    featureImageElm.addEventListener(
        'load',
        () => {
            if (!paletteReady) getPalette();
        },
        false
    );
}

// Lightbox
// ---------

const wrapImages = (elem: string, elemClass: string, exclude: string) => {
    const imgs = document.querySelectorAll(elem);

    imgs.forEach((image: Element) => {
        let caption: string | null;
        const imgLink: string | null = image.getAttribute('src');
        if (image.classList.contains('kg-image')) {
            const imageCard: HTMLElement | null = image.closest(
                '.kg-image-card'
            );
            const figCaption = imageCard?.querySelector('figcaption');
            caption = figCaption?.textContent ?? '';
        } else {
            caption = '';
        }

        if (!image.classList.contains(exclude)) {
            const imgWrap = document.createElement('div');

            imgWrap.className = elemClass;
            if (imgLink != null) imgWrap.dataset.src = imgLink;
            if (caption !== '') imgWrap.dataset.subHtml = caption;

            wrap(image, imgWrap);
        }
    });
};

wrapImages('.post-content img', 'lightbox', 'no-lightbox');
const images = document.querySelector('.post-content');
if (images != null) {
    window.lightGallery(images, {
        selector: '.lightbox',
        escKey: true,
        keyPress: true,
        controls: true,
        getCaptionFromTitleOrAlt: true,
    });
}

// Responsive Videos
// -----------------

const videoSelectors: string[] = [
    'iframe[src*="player.vimeo.com"]',
    'iframe[src*="youtube.com"]',
    'iframe[src*="youtube-nocookie.com"]',
    'iframe[src*="kickstarter.com"][src*="video.html"]',
    'object:not(object)',
    'embed',
];

const allVideos = document
    .querySelector('.post-content')!
    .querySelectorAll(videoSelectors.join(','));

allVideos.forEach(element => {
    if (
        (element.tagName.toLowerCase() !== 'embed' &&
            !element.closest('object')) ||
        !element.closest('.responsive-embed')
    ) {
        const videoWrap = document.createElement('div');
        videoWrap.className = 'responsive-embed widescreen';
        wrap(element, videoWrap);
    }
});
