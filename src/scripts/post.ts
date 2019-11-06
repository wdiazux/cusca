// jQuery
// ------

// Fancybox
// --------

import '@fancyapps/fancybox';

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

import Vibrant from 'node-vibrant';

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

    featureImageElm.crossOrigin = 'Anonymous';
    if (featureImage) featureImageElm.src = featureImage.src;

    const getPalette = () => {
        paletteReady = true;

        const v = new Vibrant(featureImageElm);
        v.getPalette().then(palette => {
            let paletteColor: string;
            let bgColor: string;

            if (palette.DarkVibrant) {
                paletteColor = 'DarkVibrant';
            } else if (palette.DarkMuted) {
                paletteColor = 'DarkMuted';
            } else if (palette.Vibrant) {
                paletteColor = 'Vibrant';
            } else {
                paletteColor = 'Nothing';
            }

            if (paletteColor !== 'Nothing') {
                // @ts-ignore
                bgColor = palette[paletteColor].getRgb().join();
            } else {
                bgColor = '255, 255, 255';
            }

            featureImageCt.classList.add('loaded');
            if (postFullImageBg)
                postFullImageBg.style.background = 'rgba(' + bgColor + ', 0.9)';

            setTimeout(() => {
                const spinKit: HTMLElement | null = document.getElementById(
                    'spinkit'
                );
                if (spinKit && spinKit.parentNode) {
                    spinKit.parentNode.removeChild(spinKit);
                }
            }, 600);
        });
    };

    featureImageElm.addEventListener(
        'load',
        () => {
            if (!paletteReady) getPalette();
        },
        false
    );
}

// Fancybox
// ---------
const wrapImages = (elem: string, elemClass: string, exclude: string) => {
    const imgs = $(elem);
    if (imgs.length > 0) {
        imgs.each((index, element) => {
            const $this = $(element);
            const imgLink: string | undefined = $this.attr('src');
            const caption: string | undefined = $this.attr('alt');

            if (!$this.hasClass(exclude)) {
                const imgWrap = `<a href="${imgLink}" class="${elemClass}"
                    data-fancybox="group" data-caption="${caption}"></a>`;
                $this.wrap(imgWrap);
            }
        });
    }
};

wrapImages('.post-content img', 'fancy-box', 'no-fancy-box');

$('.fancy-box').fancybox();

// Responsive Videos
// -----------------
const videoSelectors = [
    'iframe[src*="player.vimeo.com"]',
    'iframe[src*="youtube.com"]',
    'iframe[src*="youtube-nocookie.com"]',
    'iframe[src*="kickstarter.com"][src*="video.html"]',
    'object',
    'embed',
];
let $allVideos = $('.post-content').find(videoSelectors.join(','));
$allVideos = $allVideos.not('object object'); // SwfObj conflict patch}

console.log($allVideos);
$allVideos.each((index, element) => {
    const $this = $(element);
    if (
        (element.tagName.toLowerCase() !== 'embed' &&
            $this.parent('object').length === 0) ||
        $this.parent('.responsive-embed').length < 0
    ) {
        const videoWrap = '<div class="responsive-embed widescreen"></div>';
        $this.wrap(videoWrap);
    }
});
