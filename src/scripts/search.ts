// Search
// ------
// A modification of Ghost-Search
// https://github.com/HauntedThemes/ghost-search

const fuzzysort = require('fuzzysort');

export default class GhostSearch {
    check: boolean = false;
    input: string;
    results: string;
    api: any; 
    options: any; 

    // TODO create a better constructor
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

    // TODO: create an interface
    template(result:any) {
        let url = [location.protocol, '//', location.host].join('');
        return '<li><a href="' + url + '/' + result.slug + '/">' + result.title + '</a></li>';
    }
    
    // TODO: create an interface
    displayResults(data:any){
        let resultsElm = <HTMLElement>document.querySelector(this.results);
        if (resultsElm.nodeType) {
            while (document.querySelector(this.results).firstChild) {
                document.querySelector(this.results).removeChild(document.querySelector(this.results).firstChild);
            }
        };

        let inputElm = <HTMLInputElement>document.querySelector(this.input);
        let inputValue = inputElm.value;
       
        document.querySelector('.search-container').classList.add('dirty');

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


    // TODO: create an interface
    search(resource){
        let data = resource[this.api.resource];
        this.check = true;

        document.querySelector(this.input).addEventListener('keyup', e => {
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

    // TODO reformat these functions
    openSearch() {
        const search = <HTMLElement>document.querySelector('#search');
        let inputElm = <HTMLInputElement>document.querySelector('#ghost-search-field');
        search.style.display = 'block';
        document.querySelector('body').classList.add('noscroll');

        inputElm.focus();
    }
    
    closeSearch() {
        const search = <HTMLElement>document.querySelector('#search');
        let inputElm = <HTMLInputElement>document.querySelector('#ghost-search-results');
  
        if(search.style.display === 'none' || search.style.display === '') { return;  }
        
        search.style.display = 'none';
        document.querySelector('body').classList.remove('noscroll');
        
        let resultsElm = <HTMLElement>document.querySelector(this.results);
        document.querySelector('.search-container').classList.remove('dirty');
        inputElm.value = '';

        if (resultsElm.nodeType) {
            while (resultsElm.firstChild) {
                resultsElm.removeChild(resultsElm.firstChild);
            }
        };
    }
    
    init(){
         if (!this.validate()) {
            return;
        }
        
        document.querySelector(this.input).addEventListener('focus', () => {
            if (!this.check) {
                this.fetch();
            };
        });
        
        document.body.addEventListener('keydown', (e) => {
            if(e.defaultPrevented) { return; }

            let key = e.key || e.keyCode;
            if(key === 'Escape' || key === 'Esc' || key === 27) {
                this.closeSearch();
            }
        });
    }
}

