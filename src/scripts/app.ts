// jQuery
// ------
import * as $ from 'jquery';

// Images
// -------

// Here, we're requiring all images inside JS in order to use the webpack
// fileloader even on images that are not otherwise required in js

function importAll(r) {
    return r.keys().map(r);
}
const images = importAll(require.context('../img/', false, /\.(png|gif|jpe?g|svg)$/));


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
// ----------
$(function () {
    const pagination = (currentPage: number, pageCount: number) => {
        const delta = 2

        let range = []
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            range.unshift('...')
        }
        if (currentPage + delta < pageCount - 1) {
            range.push('...')
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

// Top bar
// -------

const siteHeaderBg = $('.site-header-bg');
const siteHeader = $('.site-header');
declare function particlesJS(tag_id: any, params: any): void;

import 'particles.js';

const setHeaderBg = () => {
    if($(window).scrollTop() - siteHeaderBg.scrollTop() - siteHeaderBg.height() >= -240) {
        siteHeader.addClass('bg');
        siteHeaderBg.css('opacity', 0.3);
    } else {
        siteHeader.removeClass('bg');
        siteHeaderBg.css('opacity', 1);
    }
}

$(function () {
    if(siteHeaderBg.length) {
        setHeaderBg();
    }
});

if(siteHeaderBg.length) {
    document.addEventListener('scroll', (evt) => {
        setHeaderBg();
    }, {
        capture: true,
        passive: true
    });

    particlesJS('site-header-bg', {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 1420
                }
            },
            "color": {
                "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
            },
            "shape": {
                "type": "triangle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 12,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
} else {
    siteHeader.addClass('bg');
}
