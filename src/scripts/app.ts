import 'core-js/stable';
import 'foundation-sites';
import 'particles.js';
import particlesJSON from './particles.json';

// Search
// ------

import GhostSearch from './search';

// Here, we're requiring all images inside JS in order to use the webpack
// fileloader even on images that are not otherwise required in js
const images = require.context('../img/', false, /\.(png|gif|jpe?g|svg)$/);
images.keys().map(images);

$(document).foundation();

// Pagination
// ----------

$(document).ready(() => {
    const pagination = (currentPage: number, pageCount: number) => {
        const delta = 2;

        const range = [];
        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(pageCount - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift('...');
        }
        if (currentPage + delta < pageCount - 1) {
            range.push('...');
        }

        range.unshift(1);
        range.push(pageCount);

        return range;
    };

    const createPagination = () => {
        const currentPage = parseInt($('.curr-page').text(), 10);
        const totalPages = parseInt($('.total-pages').text(), 10);
        let url = window.location.href;

        if (totalPages > 1) {
            const paginationArr = pagination(currentPage, totalPages);
            let paginationItem: string;

            for (let i = paginationArr.length - 1; i >= 0; i--) {
                const pageNum = paginationArr[i];

                if (pageNum === currentPage) {
                    paginationItem = '<li class="current">' + pageNum + '</li>';
                } else if (typeof pageNum === 'number') {
                    const urlArray = url.split('/');
                    if (urlArray[urlArray.length - 3] === 'page') {
                        url = url.replace(/\/page\/.*$/, '') + '/';
                    }
                    paginationItem = `<li><a href="${url}page/${pageNum}" aria-label="Page ${pageNum}">${pageNum}</a></li>`;
                } else {
                    paginationItem = '<li class="ellipsis"></li>';
                }
                $('.pagination-previous').after(paginationItem);
            }
        } else {
            $('.pagination').css('display', 'none');
        }
    };
    createPagination();
});

// Top bar
// -------

const siteHeaderBg: JQuery<HTMLDivElement> = $('.site-header-bg');
const siteHeader: JQuery<HTMLDivElement> = $('.site-header');

let lastScrollY = window.scrollY;
let lastHeaderHeight = siteHeader.height();
let ticking = false;

const setHeaderBg = () => {
    // @ts-ignore
    if (lastScrollY - siteHeaderBg.scrollTop() - lastHeaderHeight >= -240) {
        siteHeader.addClass('bg');
        siteHeaderBg.css('opacity', 0.3);
    } else {
        siteHeader.removeClass('bg');
        siteHeaderBg.css('opacity', 1);
    }

    ticking = false;
};

const requestTick = (): void => {
    if (!ticking) {
        requestAnimationFrame(setHeaderBg);
    }
    ticking = true;
};

const onScroll = (): void => {
    lastScrollY = window.scrollY;
    requestTick();
};

const onResize = (): void => {
    lastHeaderHeight = siteHeader.height();
    requestTick();
};

$(() => {
    if (siteHeaderBg.length) {
        setHeaderBg();
    }
});

// eslint-disable-next-line @typescript-eslint/camelcase,@typescript-eslint/no-explicit-any
declare const particlesJS: any;
// declare function particlesJS(tag_id: string, params: any): void;

if (siteHeaderBg.length) {
    window.addEventListener(
        'scroll',
        () => {
            onScroll();
        },
        {
            capture: true,
            passive: true,
        }
    );
    window.addEventListener('resize', onResize, false);

    particlesJS('site-header-bg', particlesJSON);
} else {
    siteHeader.addClass('bg');
}

$(document).ready(() => {
    const openSearchElm = document.querySelectorAll('[data-open-search]');
    const closeSearchElm = document.querySelectorAll('[data-close-search]');

    const ghostSearch = new GhostSearch({
        url: 'http://localhost:2368',
        key: '4f1476d8df3a9cd277b2273b6e',
    });

    for (let i = 0; i < openSearchElm.length; i++) {
        openSearchElm[i].addEventListener('click', ghostSearch.openSearch);
    }
    for (let i = 0; i < closeSearchElm.length; i++) {
        closeSearchElm[i].addEventListener('click', ghostSearch.closeSearch);
    }
});
