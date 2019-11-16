import 'core-js/proposals/url';
import 'foundation-sites';
import 'particles.js';
import particlesJSON from './particles.json';
import GhostSearch from './search';
import createScrollManager from './createScrollManager';

// Here, we're requiring all images inside JS in order to use the webpack
// fileloader even on images that are not otherwise required in js
const images = require.context('../img/', false, /\.(png|gif|jpe?g|svg)$/);
images.keys().map(images);

$(document).foundation();

// Pagination
// ----------

document.addEventListener('DOMContentLoaded', () => {
    const pagination = (currentPage: number, pageCount: number) => {
        const range: (string | number)[] = [];
        const delta = 2;

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(pageCount - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) range.unshift('...');
        if (currentPage + delta < pageCount - 1) range.push('...');

        range.unshift(1);
        range.push(pageCount);

        return range;
    };

    const createPagination = () => {
        let url: string = window.location.href;
        const currPageElm: HTMLDivElement | null = document.querySelector(
            '.curr-page'
        );
        const totalPagesElm: HTMLDivElement | null = document.querySelector(
            '.total-pages'
        );
        if (!currPageElm || !totalPagesElm) return;
        const currentPage: number = Number.parseInt(
            currPageElm!.textContent!,
            10
        );
        const totalPages: number = Number.parseInt(
            totalPagesElm!.textContent!,
            10
        );
        const paginationElm: HTMLElement | null = document.querySelector(
            '.pagination'
        );
        const paginationPrev: HTMLDivElement | null = document.querySelector(
            '.pagination-previous'
        );

        if (totalPages > 1) {
            const paginationItems: string[] = [];
            const paginationArr: (string | number)[] = pagination(
                currentPage,
                totalPages
            );

            paginationArr.forEach((pagElm: number | string): void => {
                const urlArray = url.split('/');

                if (pagElm === currentPage) {
                    paginationItems.push(`<li class="current">${pagElm}</li>`);
                } else if (typeof pagElm === 'number') {
                    if (urlArray[urlArray.length - 3] === 'page') {
                        url = url.replace(/\/page\/.*$/, '') + '/';
                    }
                    paginationItems.push(
                        `<li><a href="${url}page/${pagElm}" aria-label="Page ${pagElm}">${pagElm}</a></li>`
                    );
                } else {
                    paginationItems.push('<li class="ellipsis"></li>');
                }
            });

            if (paginationPrev?.parentNode)
                paginationPrev.insertAdjacentHTML(
                    'afterend',
                    paginationItems.join('')
                );
        } else if (paginationElm != null) {
            paginationElm.style.display = 'none';
        }
    };
    createPagination();
});

// Top bar
// -------

const siteHeader: HTMLDivElement | null = document.querySelector(
    '.site-header'
);
const siteHeaderBg: HTMLDivElement | null = document.querySelector(
    '.site-header-bg'
);

createScrollManager().add(pageScroll => {
    if (!siteHeader || !siteHeaderBg) return;
    const lastHeaderHeight = siteHeader.offsetHeight;

    if (pageScroll! - siteHeaderBg.scrollTop - lastHeaderHeight! >= -240) {
        siteHeader.classList.add('bg');
        siteHeaderBg.style.opacity = '0.3';
    } else {
        siteHeader.classList.remove('bg');
        siteHeaderBg!.style.opacity = '1';
    }
});

if (siteHeaderBg) {
    window.particlesJS('site-header-bg', particlesJSON);
} else if (siteHeader) {
    siteHeader.classList.add('bg');
}

document.addEventListener('DOMContentLoaded', () => {
    // Search
    // ------
    const openSearchElm = document.querySelectorAll('[data-open-search]');
    const closeSearchElm = document.querySelectorAll('[data-close-search]');

    const ghostSearch = new GhostSearch({
        url: 'http://localhost:2368',
        key: '4f1476d8df3a9cd277b2273b6e',
    });

    openSearchElm.forEach((elm): void => {
        elm.addEventListener('click', ghostSearch.openSearch);
    });
    closeSearchElm.forEach((elm): void => {
        elm.addEventListener('click', ghostSearch.closeSearch);
    });
});
