// Search
// ------
// A modification of Ghost-Search
// https://github.com/HauntedThemes/ghost-search

import 'core-js/es/number/is-integer';

// eslint-disable-next-line max-classes-per-file
import GhostContentAPI from '@tryghost/content-api';

const fuzzysort = require('fuzzysort');

/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.matches) {
    Element.prototype.matches =
        // @ts-ignore
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    // eslint-disable-next-line func-names
    Element.prototype.closest = function(s: string) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let el: Element | null = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// TODO: Create custom type for any types
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
    url: string;
    key: string;
    version?: string;
    input?: string;
    results?: string;
    button?: string;
    defaultValue?: string;
    template?: any;
    trigger?: string;
    options?: any;
    api?: any;
    on?: any;
}

interface ObjectOfStrings {
    [propName: string]: string;
}

export default class GhostSearch implements Props {
    public url: string;
    public key: string;
    public version?: string;
    public input?: string;
    public results?: string;
    public button?: string;
    public defaultValue?: string;
    public template?: any;
    public trigger?: string;
    public options?: any;
    public api?: any;
    public on?: any;
    private check = false;

    constructor(props?: Props) {
        this.url = (props && props.url) || '';
        this.key = (props && props.key) || '';
        this.version = (props && props.version) || 'v3';
        this.input = (props && props.input) || '#ghost-search-field';
        this.results = (props && props.results) || '#ghost-search-results';
        this.button = (props && props.button) || '';
        this.defaultValue = (props && props.defaultValue) || '';
        this.template =
            (props && props.template) ||
            ((result: { slug: string; title: string }): string => {
                const url = [
                    window.location.protocol,
                    '//',
                    window.location.host,
                ].join('');
                return `<li><a href="${url}/${result.slug}">${result.title}</a></li>`;
            });
        this.trigger = (props && props.trigger) || 'focus';
        this.options = (props && props.options) || {
            keys: ['title'],
            limit: 10,
            threshold: -3500,
            allowTypo: false,
        };
        this.api = (props && props.api) || {
            resource: 'posts',
            parameters: {
                limit: 'all',
                fields: ['title', 'slug', 'created_at'],
                filter: '',
                include: 'authors',
                order: '',
                formats: '',
                page: '',
            },
        };
        this.on = (props && props.on) || {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            beforeDisplay: () => {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            afterDisplay: () => {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            beforeFetch: () => {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            afterFetch: () => {},
        };
        this.init();
    }

    fetch = () => {
        this.on.beforeFetch();

        const ghostAPI = new GhostContentAPI({
            url: this.url,
            key: this.key,
            version: this.version,
        });

        const browse: ObjectOfStrings = {};
        const { parameters } = this.api;

        Object.keys(parameters).forEach((key: string) => {
            if (parameters[key] !== '') browse[key] = parameters[key];
        });

        ghostAPI[this.api.resource]
            .browse(browse)
            .then((data: any) => {
                this.search(data);
            })
            .catch((err: string) => {
                console.error(err);
            });
    };

    // eslint-disable-next-line class-methods-use-this
    createElementFromHTML = (htmlString: string) => {
        const div: HTMLDivElement = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    };

    // TODO: create an interface
    displayResults = (data: any) => {
        if (!this.results) return;
        const inputElm: HTMLInputElement | null = document.querySelector(
            this.input!
        );

        const resultsElm: Element | null = document.querySelector(this.results);

        if (resultsElm) {
            while (resultsElm.firstChild) {
                resultsElm.removeChild(resultsElm.firstChild);
            }
        }

        let inputValue: string | null;
        if (this.defaultValue) {
            inputValue = this.defaultValue;
        } else if (inputElm) {
            inputValue = inputElm.value;
        } else {
            inputValue = null;
        }

        const searchContainer: HTMLDivElement | null = document.querySelector(
            '.search-container'
        );
        if (searchContainer) searchContainer.classList.add('dirty');

        const results = fuzzysort.go(inputValue, data, {
            keys: this.options.keys,
            limit: this.options.limit,
            allowTypo: this.options.allowTypo,
            threshold: this.options.threshold,
        });

        if (resultsElm) {
            Object.keys(results).forEach(key => {
                if (key < results.length) {
                    resultsElm.appendChild(
                        this.createElementFromHTML(
                            this.template(results[key].obj)
                        )!
                    );
                }
            });
        }

        this.on.afterDisplay(results);
        this.defaultValue = '';
    };

    // TODO: create an interface for data
    search = (data: any) => {
        this.on.afterFetch(data);
        this.check = true;

        const inputElm: HTMLInputElement | null = document.querySelector(
            this.input!
        );

        if (this.defaultValue !== '') {
            this.on.beforeDisplay();
            this.displayResults(data);
        }

        if (this.button) {
            const button: HTMLInputElement | null = document.querySelector(
                this.button
            );
            if (
                button &&
                button.tagName === 'INPUT' &&
                button.type === 'submit'
            ) {
                button.closest('form')!.addEventListener('submit', e => {
                    e.preventDefault();
                });

                button.addEventListener('click', e => {
                    e.preventDefault();
                    this.on.beforeDisplay();
                    this.displayResults(data);
                });
            }
        } else if (inputElm) {
            inputElm.addEventListener('keyup', () => {
                this.on.beforeDisplay();
                this.displayResults(data);
            });
        }
    };

    checkArgs = () => {
        const resultsElm: HTMLInputElement | null = document.querySelector(
            this.results!
        );

        const inputElm: HTMLInputElement | null = document.querySelector(
            this.input!
        );

        if (!document.body.contains(inputElm)) {
            console.log('Input not found.');
            return false;
        }
        if (!document.body.contains(resultsElm)) {
            console.log('Results not found.');
            return false;
        }
        if (this.button && !document.querySelectorAll(this.button).length) {
            console.log('Button not found.');
            return false;
        }
        if (this.url === '') {
            console.log(
                'Content API Client Library url missing. Please set the url. Must not end in a trailing slash.'
            );
            return false;
        }
        if (this.key === '') {
            console.log(
                'Content API Client Library key missing. Please set the key. Hex string copied from the "Integrations" screen in Ghost Admin.'
            );
            return false;
        }
        return true;
    };

    validate = () => {
        return this.checkArgs();
    };

    // TODO reformat these functions
    public openSearch = () => {
        const search: HTMLDivElement | null = document.querySelector('#search');
        const bodyElm: HTMLBodyElement | null = document.querySelector('body');
        const inputElm: HTMLInputElement | null = document.querySelector(
            this.input!
        );

        if (search) search.style.display = 'block';
        bodyElm!.classList.add('noscroll');
        inputElm!.focus();
    };

    public closeSearch = () => {
        const search: HTMLElement | null = document.querySelector('#search');
        const resultsElm: HTMLElement | null = document.querySelector(
            '#ghost-search-results'
        );

        if (
            !search ||
            search.style.display === 'none' ||
            search.style.display === ''
        ) {
            return;
        }

        search.style.display = 'none';
        document!.querySelector('body')!.classList.remove('noscroll');
        document!.querySelector('.search-container')!.classList.remove('dirty');
        const inputElm: HTMLInputElement | null = document.querySelector(
            this.input!
        );

        inputElm!.value = '';

        if (resultsElm) {
            while (resultsElm.firstChild) {
                resultsElm.removeChild(resultsElm.firstChild);
            }
        }
    };

    init = () => {
        const inputElm: HTMLInputElement | null = document.querySelector(
            this.input!
        );
        if (!this.validate()) {
            return;
        }

        if (this.defaultValue && inputElm) {
            inputElm.value = this.defaultValue;
            window.onload = () => {
                if (!this.check) this.fetch();
            };
        }

        if (inputElm && this.trigger === 'focus') {
            inputElm.addEventListener('focus', () => {
                if (!this.check) this.fetch();
            });
        } else if (this.trigger === 'load') {
            window.onload = () => {
                if (!this.check) this.fetch();
            };
        }

        document.body.addEventListener('keydown', e => {
            if (e.defaultPrevented) {
                return;
            }

            const key = e.key || e.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) {
                this.closeSearch();
            }
        });
    };
}
