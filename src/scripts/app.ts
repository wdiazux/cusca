// jQuery
// ------
import * as $ from 'jquery';

// Images
// -------

// Here, we're requiring all images inside JS in order to use the webpack
// fileloader even on images that are not otherwise required in js

/*
function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../img/', false, /\.(png|gif|jpe?g|svg)$/));
*/

// Foundations
// -----------

import 'foundation-sites';

$(function() {
    $(document).foundation();
});

// Grid
// ----
//import * as Shuffle from 'shufflejs';
const Shuffle = require('shufflejs').default;

$(function () {
    const shuffleInstance = new Shuffle(document.querySelector('.post-feed'), {
        itemSelector: '.post-card',
        sizer: '.post-card-ex'
    });
});

// Pagination
$(function () {
    const pagination = (currentPage: number, pageCount: number) => {
        const delta = 2

        let range = []
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            range.unshift("...")
        }
        if (currentPage + delta < pageCount - 1) {
            range.push("...")
        }

        range.unshift(1)
        range.push(pageCount)

        return range
    }

    const createPagination = () => {
        let currentPage = parseInt($('.curr-page').text()),
            totalPages = parseInt($('.total-pages').text());
        let url = window.location.href;

        if(totalPages > 1) {
            var paginationArr = pagination(currentPage, totalPages);
            var paginationItem;
            var isCurrent = '';

            for (var i = paginationArr.length - 1; i >= 0; i--) {
                var pageNum = paginationArr[i];

                if (pageNum === currentPage) {
                    paginationItem = '<li class="current">' + pageNum + '</li>';
                } else if (typeof pageNum === 'number') {
                    var urlArray = url.split('/');
                    if(urlArray[urlArray.length - 3] === 'page') {
                        url = url.replace(/\/page\/.*$/,'') + '/';
                    }
                    paginationItem = '<li>' +
                        '<a href=\"' + url + 'page/' + pageNum + '\" aria-label=\"Page ' + pageNum + '\">'
                        + pageNum + '</a>' +
                        '</li>';
                } else {
                    paginationItem = '<li class=\"ellipsis\"></li>';
                }
                $('.pagination-previous').after(paginationItem);
            }
        } else {
            $('.pagination').css('display', 'none');
        }
    }
    createPagination();
});
