(function ($, undefined) {
    'use strict';

    /*
     * Start foundation in all document
     *
     */
    $(document).foundation();

    /*
     * Add sencondary class to subscribe button
     *
     */
    $('.off-subscribe-ct').find('button:submit').addClass('secondary');


    /*
     * Off canvas
     *
     */
    $(window).resize(function() {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function(){
            var offCanvas = $('#offCanvas');
            if($(window).width() >= 768 && offCanvas.hasClass('is-open')) {
                offCanvas.foundation('close');
            }
        }, 250);
    });

    /*
     * Pagination
     *
     */

    // Source: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
    function pagination(c, m) {
        var current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (var i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (var arr = range, isArray = Array.isArray(arr), i = 0, arr = isArray ? arr : arr[Symbol.iterator]();;) {
            var ref;

            if (isArray) {
                if (i >= arr.length) break;
                ref = arr[i++];
            } else {
                i = arr.next();
                if (i.done) break;
                ref = i.value;
            }

            var n = ref;

            if (l) {
                if (n - l === 2) { rangeWithDots.push(l + 1); }
                else if (n - l !== 1) { rangeWithDots.push('...'); }
            }
            rangeWithDots.push(n);
            l = n;
        }

        return rangeWithDots;
    }

    function createPagination() {
        var currentPage = parseInt($('.curr-page').text()),
            totalPages = parseInt($('.total-pages').text());
        var url = window.location.href;

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

    /*
     * Grid
     *
     */
    var gridElm = $('.grid');
    if(gridElm.length > 0) {
        var grid = gridElm.isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            transitionDuration: 0
        });

        // layout Isotope after each image loads
        grid.imagesLoaded().progress( function() {
            grid.isotope('layout');
        });

        /*
         * Wow
         *
         */
        var wow = new WOW({
            boxClass: 'grid-item',
            animateClass: 'hingeIn',
            delay: '1.5s',
            offset:10
        }).init();
    }

    /*
     * GhostBot
     *
     */
    var searchField = $('#search-field');
    var gbInfoTemplate = '<h5 class=\"search-info\">Number of posts found: {{amount}}</h5>',
        gbResultTemplate = '<article class=\"post-result\"><a href=\"{{link}}\">' +
            '<h3 class=\"search-title\">{{title}}</h3>' +
            '<i class=\"fa fa-clock-o\"></i><time class=\"result-date\">{{pubData}}</time>' +
            '</a></article>';

    var ghostSearch = new GhostBot({
        inputbox: document.querySelector('#search-field'),
        target: document.querySelector('#results'),
        info_template: gbInfoTemplate,
        result_template: gbResultTemplate
    });

    $('.search-form').submit(function(e){
        e.preventDefault();

        if(searchField.val().length !== 0) {
            $.fancybox.open([
                {
                    src  : '#reveal-search',
                    type : 'inline'
                }
            ]);
        }
    });

    /*
     * Fancybox
     */
    function aTagWrap(elem, elemClass, exclude) {
        var imgs = $(elem);
        if (imgs.length > 0) {
            imgs.each(function () {
                var $this = $(this);
                var imgLink = $this.attr('src'),
                    caption = $this.attr('alt');

                if (!$this.hasClass(exclude)) {
                    var html = '<a href=\"' + imgLink + '\" class=\"' + elemClass + '\"' +
                        'data-fancybox=\"group\" data-caption=\"' + caption + '\"></a>';
                    $this.wrap(html);
                }
            });
        }
    }

    aTagWrap('.post-content img','fancy-box','no-fancy-box');

    /*
     * Fluid Videos
     *
     */
    fluidvids.init({
        selector: ['iframe', 'object'],
        players: ['www.youtube.com', 'player.vimeo.com']
    });
})(jQuery);