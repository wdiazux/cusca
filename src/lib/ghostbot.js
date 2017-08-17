/**
 * GhostBot: A Simple Common Search Engine based on Ghost API
 * author: Luna Shu
 * Git: https://github.com/LunaYJ/GhostBot.git
 * coding: https://git.coding.net/lunayj/GhostBot.git
 * https://luna.fancylog.net/
 *
 * Forked from https://github.com/wssgcg1213/ghostbot
 * Original Author: ZeroLing
 * Original Author Blog: http://www.zeroling.com/
 *
 */
function Ajax() {
    'use strict';
    var aja = {};
    aja.tarUrl = '';
    aja.postString = '';
    aja.createAjax = function () {
        var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        return xmlhttp;
    };
    aja.xhr = aja.createAjax();
    aja.processHandler = function () {
        if (aja.xhr.readyState === 4) {
            if (aja.xhr.status === 200) {
                aja.resultHandler(aja.xhr.responseText);
            }
        }
    };
    aja.get = function (tarUrl, callbackHandler) {
        aja.tarUrl = tarUrl;
        aja.resultHandler = callbackHandler;
        aja.xhr.onreadystatechange = aja.processHandler;
        aja.xhr.open('get', aja.tarUrl, true);
        aja.xhr.send();
    };
    return aja;
}

function pad (str, max) {
    'use strict';
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function formatDate(date, type) {
    'use strict';
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    if(type === 'text') {
        return pad(day, 2) + ' ' + monthNames[monthIndex] + ' ' + year;
    } else {
        return year + '-' + pad(monthIndex + 1, 2) + '-' + pad(day, 2);
    }
}

var GhostBot = function (options) {
    'use strict';
    this.defaults = {
        result_template: '<a href="{{link}}" class="searchResult">{{title}}</a>',
        info_template: '<h4>Find{{amount}}Articles.</h4>'
    };
    var opts = this.extend({}, this.defaults, options);
    if (opts.inputbox) {
        this.init(opts);
    }
};
GhostBot.prototype.extend = function () {
    //'use strict';
    var _arg = Array.prototype.slice.call(arguments);
    for (var i = _arg.length - 1; i > 0; i--) {
        var former = _arg[i - 1],
            latter = _arg[i];
        for (j in latter) former[j] = latter[j];
    }
    return _arg[0];
};
GhostBot.prototype.init = function (opts) {
    'use strict';
    var that = this;
    this.result_template = opts.result_template;
    this.info_template = opts.info_template;
    this.target = opts.target;
    this.inputbox = opts.inputbox;
    this.blogData = [];
    this.ajax = new Ajax();
    this.loadAPI();
};
GhostBot.prototype.loadAPI = function () {
    'use strict';
    if (this.inited) { return false; }
    var that = this;
    var obj = { limit: 'all', include: 'tags' };
    var maxLength = 120;
    var blogData = [];

    this.ajax.get(ghost.url.api('posts', obj), function (data) {
        var searchData = JSON.parse(data).posts;
        searchData.forEach(function (arrayItem) {
            var tag_arr = arrayItem.tags.map(function (v) {
                return v.name;
            });
            if (arrayItem.meta_description === null) {
                arrayItem.meta_description = '';
            }
            var category = tag_arr.join(', ');
            if (category.length < 1) {
                category = 'undefined';
            }
            var parsedData = {
                id: String(arrayItem.id),
                title: String(arrayItem.title),
                slug: String(arrayItem.slug),
                url: String(arrayItem.url),
                markdown: String(arrayItem.markdown),
                pubDate: String(arrayItem.created_at.split('T')[0]),
                tag: category,
                link: String(arrayItem.url),
                description: String(arrayItem.html.substr(33, maxLength)) + '...',
                content: arrayItem.html.substr(33, arrayItem.html.length)
            };
            blogData.push(parsedData);
        });
        that.items = blogData;
        that.inited = true;
        that.listen();
    });
};
GhostBot.prototype.listen = function () {
    'use strict';
    var that = this;
    this.inputbox.onkeyup = function () {
        var ele = that.inputbox;
        if (!ele.value) { that.target.innerHTML = ''; }
        var _r = that.search(ele.value);
        var _HTML = that.format(that.info_template, {
            amount: _r.length
        });
        for (var i=0; i < _r.length; i++) { _HTML += that.format(that.result_template, _r[i]); }
        that.target.innerHTML = _HTML;
    };
};
GhostBot.prototype.format = function (text, obj) {
    'use strict';
    return text.replace(/{{([^{}]*)}}/g, function (a, b) {
        var r = obj[b];
        return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
};
GhostBot.prototype.search = function (kw) {
    'use strict';
    var _result = [];
    var _reg = new RegExp(kw.toLowerCase());
    this.items.forEach(function (i) {
        var content = i.markdown;
        var title = i.title;
        var url = i.url;

        if (_reg.test(title.toLowerCase() + content.toLowerCase() + url.toLowerCase())) {
            var link = i.link;
            _result.push({
                title: title,
                link: link,
                content: content,
                pubData: i.pubDate,
                description: i.description
            });
        }
    });
    return _result;
};
