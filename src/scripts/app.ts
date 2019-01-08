// jQuery
// ------

import jQuery = require('jquery');

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
$(document).ready(() => {
    $(document).foundation();
});


// Grid
// ----
const Shuffle = require('shufflejs').default;

$(document).ready(() => {
    const postFeed = document.querySelector('.post-feed');
    if(document.body.contains(postFeed)) {
        const shuffleInstance = new Shuffle(postFeed, {
            itemSelector: '.post-card',
            sizer: '.post-card-ex'
        });
    }
});


// Pagination
// ----------

$(document).ready(() => {
    const pagination = (currentPage: number, pageCount: number) => {
        const delta = 2;

        let range = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
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
    }

    const createPagination = () => {
        let currentPage = parseInt($('.curr-page').text()),
            totalPages = parseInt($('.total-pages').text());
        let url = window.location.href;

        if(totalPages > 1) {
            let paginationArr = pagination(currentPage, totalPages);
            let paginationItem:string;

            for (let i = paginationArr.length - 1; i >= 0; i--) {
                let pageNum = paginationArr[i];

                if (pageNum === currentPage) {
                    paginationItem = '<li class="current">' + pageNum + '</li>';
                } else if (typeof pageNum === 'number') {
                    let urlArray = url.split('/');
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

import 'particles.js';

let lastScrollY = window.scrollY;
let lastHeaderHeight = siteHeader.height();
let ticking = false;

const onScroll = () => {
    lastScrollY = window.scrollY;
    requestTick();
}

const onResize = () => {
    lastHeaderHeight = siteHeader.height();
    requestTick();
}

const requestTick = () => {
    if (!ticking) {
        requestAnimationFrame(setHeaderBg);
    }
    ticking = true;
}

const setHeaderBg = () => {
    if(lastScrollY - siteHeaderBg.scrollTop() - lastHeaderHeight >= -240) {
        siteHeader.addClass('bg');
        siteHeaderBg.css('opacity', 0.3);
    } else {
        siteHeader.removeClass('bg');
        siteHeaderBg.css('opacity', 1);
    }

    ticking = false;
}

$(function () {
    if(siteHeaderBg.length) {
        setHeaderBg();
    }
});

if(siteHeaderBg.length) {
    document.addEventListener('scroll', () => {
        onScroll();
    }, {
        capture: true,
        passive: true
    });
    document.addEventListener('resize', onResize, false);

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


// Search
// ------
// A modification of Ghost-Search
// https://github.com/HauntedThemes/ghost-search

const fuzzysort = require('fuzzysort');

declare namespace ghost {
    function init(options: any): void;
    namespace url {
        function api(resource:string, parameter:Object): any;
    }
}

class GhostSearch {
    check: boolean = false;
    input: string;
    results: string;
    api: any; 
    options: any; 

    constructor(input?:string, results?:string, api?:any, options?:any) {
        this.input = input || '#ghost-search-field';
        this.results = results || '#ghost-search-results';
        this.api = {
            resource: 'posts',
            parameters: { 
                limit: 'all',
                fields: ['title', 'slug', 'created_at'],
                filter: '',
                include: 'authors',
                order: '',
                formats: ''
            }
        };
        this.options = {
            keys: [
                'title'
            ],
            limit: 10,
            threshold: -3500,
            allowTypo: false
        };
        this.init();
    }
    
    
    url(){
        if (this.api.resource == 'posts' && this.api.parameters.include.match( /(tags|authors)/ )) {
            delete this.api.parameters.fields;
        };

        let url = ghost.url.api(this.api.resource, this.api.parameters);

        return url;
    } 
    
    fetch(){
        let url = this.url();

        fetch(url)
        .then(response => response.json())
        .then(resource => this.search(resource))
        .catch(error => console.error(`Fetch Error =\n`, error));
    }
    
    createElementFromHTML(htmlString:string) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild; 
    }

    template(result) {
        console.log(result);
        let url = [location.protocol, '//', location.host].join('');
        return '<li><a href="' + url + '/' + result.slug + '/">' + result.title + '</a></li>';
    }
    
    displayResults(data){
        let resultsElm = <HTMLElement>document.querySelector(this.results);
        if (resultsElm.nodeType) {
            while (document.querySelector(this.results).firstChild) {
                document.querySelector(this.results).removeChild(document.querySelector(this.results).firstChild);
            }
        };

        let inputElm = <HTMLInputElement>document.querySelector(this.input);
        let inputValue = inputElm.value;

        const results = fuzzysort.go(inputValue, data, {
            keys: this.options.keys,
            limit: this.options.limit,
            allowTypo: this.options.allowTypo,
            threshold: this.options.threshold
        });
        for (let key in results){
            if (key < results.length) {
                document.querySelector(this.results).appendChild(this.createElementFromHTML(this.template(results[key].obj)));
            };
        }
    }


    search(resource){
        let data = resource[this.api.resource];
        this.check = true;

        document.querySelectorAll(this.input)[0].addEventListener('keyup', e => {
            this.displayResults(data)
        });
    }
    
    checkGhostAPI(){
        if (typeof ghost === 'undefined') {
            console.log('Ghost API is not enabled');
            return false;
        };
        return true;
    }

    checkElements(){
        if(!document.querySelectorAll(this.input).length){
            console.log('Input not found.');
            return false;
        }
        if(!document.querySelectorAll(this.results).length){
            console.log('Results not found.');
            return false;
        };
        return true;
    }


    validate(){
        if (!this.checkGhostAPI() || !this.checkElements()) {
            return false;
        };

        return true;
    }

    init(){
         if (!this.validate()) {
            return;
        }
        
        document.querySelectorAll(this.input)[0].addEventListener('focus', () => {
            if (!this.check) {
                this.fetch();
            };
        });
    }
}

$(document).ready(() => {
    const body = document.querySelector('body');
    const search = <HTMLElement>document.querySelector('#search');
    const openSearchElm = document.querySelectorAll('[data-open-search]');
    const closeSearchElm = document.querySelectorAll('[data-close-search]');
    let ghostSearch = new GhostSearch();
    
    const openSearch = () => {
        search.style.display = 'block';
        body.classList.add('noscroll');
    }
    const closeSearch = () => {
        search.style.display = 'none';
        body.classList.remove('noscroll');
    }
    
    openSearchElm.forEach((elm) => {
        elm.addEventListener('click', openSearch);
    });
    closeSearchElm.forEach((elm) => {
        elm.addEventListener('click', closeSearch);
    });
});
