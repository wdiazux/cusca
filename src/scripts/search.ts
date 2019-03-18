// Search
// ------
// A modification of Ghost-Search
// https://github.com/HauntedThemes/ghost-search

import GhostContentAPI from '@tryghost/content-api'
const fuzzysort = require('fuzzysort');

interface IProps {
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

function autoImplement<T>(defaults?: Partial<T>) {
    return class {
        constructor() {
            Object.assign(this, defaults || {});
        }
    } as new () => T
}

export default class GhostSearch extends autoImplement<IProps>() {
    check:boolean = false;
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

    constructor(kwArgs: IProps) {
        super();
        this.url = kwArgs.url;
        this.key = kwArgs.key;
        this.version = kwArgs.version || 'v2';
        this.input = kwArgs.input || '#ghost-search-field';
        this.results = kwArgs.results || '#ghost-search-results';
        this.button = kwArgs.button || '';
        this.defaultValue = kwArgs.defaultValue || '';
        this.template = kwArgs.template || function(result) {
            let url = [location.protocol, '//', location.host].join('');
            return '<li><a href="' + url + '/' + result.slug + '/">' + result.title + '</a></li>';
        };
        this.trigger = kwArgs.trigger || 'focus';
        this.options = kwArgs.options || {
            keys: [
                'title'
            ],
                limit: 10,
                threshold: -3500,
                allowTypo: false
        };
        this.api= kwArgs.api || {
            resource: 'posts',
                parameters: {
                limit: 'all',
                    fields: ['title', 'slug', 'created_at'],
                    filter: '',
                    include: 'authors',
                    order: '',
                    formats: '',
                    page: ''
            }
        };
        this.on = kwArgs.on || {
            beforeDisplay: () => {},
                afterDisplay: (results) => {},
                beforeFetch: () => {},
                afterFetch: (results) => {}
        };
        this.init();
    }
    
    fetch(){
        this.on.beforeFetch();
        
        let ghostAPI = new GhostContentAPI({
            url: this.url,
            key: this.key,
            version: this.version
        });

        let browse = {};
        let parameters = this.api.parameters;

        for (var key in parameters) {
            if(parameters[key] != ''){
                browse[key] = parameters[key]
            }
        }
        
        ghostAPI[this.api.resource]
            .browse(browse)
            .then((data) => {
                this.search(data);
            })
            .catch((err) => {
                console.log(err);
                console.error(err);
            });
    }
    
    static createElementFromHTML(htmlString:string) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild; 
    }
    
    // TODO: create an interface
    displayResults(data:any){
        let resultsElm = <HTMLElement>document.querySelector(this.results);
    
        if (resultsElm.firstChild !== null) {
            while (resultsElm.firstChild) {
                resultsElm.removeChild(resultsElm.firstChild);
            }
        }
        let inputElm = <HTMLInputElement>document.querySelector(this.input);
        let inputValue = inputElm.value;
        if(this.defaultValue != ''){
            inputValue = this.defaultValue;
        }
       
        document.querySelector('.search-container').classList.add('dirty');

        const results = fuzzysort.go(inputValue, data, {
            keys: this.options.keys,
            limit: this.options.limit,
            allowTypo: this.options.allowTypo,
            threshold: this.options.threshold
        });
        for (let key in results){
            if (key < results.length) {
                resultsElm.appendChild(GhostSearch.createElementFromHTML(this.template(results[key].obj)));
            }
        }
        
        this.on.afterDisplay(results);
        this.defaultValue = '';
    }


    // TODO: create an interface
    search(data) {
        let inputElm = <HTMLInputElement>document.querySelector(this.input);
        this.on.afterFetch(data);
        this.check = true;

        if(this.defaultValue != '') {
            this.on.beforeDisplay();
            this.displayResults(data)
        }
        
        if (this.button != '') {
            let button = <HTMLInputElement>document.querySelector(this.button);
            if (button.tagName == 'INPUT' && button.type == 'submit') {
                button.closest('form').addEventListener('submit', e => {
                    e.preventDefault()
                });
            }
            button.addEventListener('click', e => {
                e.preventDefault();
                this.on.beforeDisplay();
                this.displayResults(data)
            })
        } else {
            inputElm.addEventListener('keyup', () => {
                this.on.beforeDisplay();
                this.displayResults(data)
            })
        }
    }

    checkArgs(){
        let inputElm = <HTMLInputElement>document.querySelector(this.input);
        let resultsElm = <HTMLInputElement>document.querySelector(this.results);

        if(!document.body.contains(inputElm)) {
            console.log('Input not found.');
            return false;
        }
        if(!document.body.contains(resultsElm)) {
            console.log('Results not found.');
            return false;
        }
        if(this.button != ''){
            if (!document.querySelectorAll(this.button).length) {
                console.log('Button not found.');
                return false;
            }
        }
        if(this.url == ''){
            console.log(this.url);
            console.log('Content API Client Library url missing. Please set the url. Must not end in a trailing slash.');
            return false;
        }
        if(this.key == ''){
            console.log('Content API Client Library key missing. Please set the key. Hex string copied from the "Integrations" screen in Ghost Admin.');
            return false;
        }
        return true;
    }

    validate(){
        return this.checkArgs();
    }

    // TODO reformat these functions
    static openSearch() {
        const search = <HTMLElement>document.querySelector('#search');
        let inputElm = <HTMLInputElement>document.querySelector('#ghost-search-field');
        search.style.display = 'block';
        document.querySelector('body').classList.add('noscroll');

        inputElm.focus();
    }
    
    static closeSearch() {
        const search = <HTMLElement>document.querySelector('#search');
        let inputElm = <HTMLInputElement>document.querySelector('#ghost-search-field');
        let resultsElm = <HTMLElement>document.querySelector('#ghost-search-results');
  
        if(search.style.display === 'none' || search.style.display === '') { return;  }
        
        search.style.display = 'none';
        document.querySelector('body').classList.remove('noscroll');
        
        document.querySelector('.search-container').classList.remove('dirty');
        inputElm.value = '';

        if (resultsElm.nodeType) {
            while (resultsElm.firstChild) {
                resultsElm.removeChild(resultsElm.firstChild);
            }
        }
    }

    init() {
        let inputElm = <HTMLInputElement>document.querySelector(this.input);
        
        if (!this.validate()) {
            return;
        }
        
        if(this.defaultValue != ''){
            inputElm.value = this.defaultValue;
            window.onload = () => {
                if (!this.check) {
                    this.fetch()
                }
            }
        }

        if (this.trigger == 'focus') {
            inputElm.addEventListener('focus', e => {
                if (!this.check) {
                    this.fetch()
                }
            })
        } else if(this.trigger == 'load'){
            window.onload = () => {
                if (!this.check) {
                    this.fetch()
                }
            }
        }
        
        document.body.addEventListener('keydown', (e) => {
            if(e.defaultPrevented) { return; }

            let key = e.key || e.keyCode;
            if(key === 'Escape' || key === 'Esc' || key === 27) {
                GhostSearch.closeSearch();
            }
        });
    }
}

