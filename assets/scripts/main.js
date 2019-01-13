!function(l){function e(e){for(var t,r,n=e[0],o=e[1],i=e[2],a=0,s=[];a<n.length;a++)r=n[a],u[r]&&s.push(u[r][0]),u[r]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(l[t]=o[t]);for(d&&d(e);s.length;)s.shift()();return f.push.apply(f,i||[]),c()}function c(){for(var e,t=0;t<f.length;t++){for(var r=f[t],n=!0,o=1;o<r.length;o++){var i=r[o];0!==u[i]&&(n=!1)}n&&(f.splice(t--,1),e=a(a.s=r[0]))}return e}var r={},u={1:0},f=[];function a(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=l,a.c=r,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var t=window.webpackJsonp=window.webpackJsonp||[],n=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var d=n;f.push([67,0]),c()}({11:function(e,t){var r,n,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(e){r=i}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var l,c=[],u=!1,f=-1;function d(){u&&l&&(u=!1,l.length?c=l.concat(c):f=-1,c.length&&p())}function p(){if(!u){var e=s(d);u=!0;for(var t=c.length;t;){for(l=c,c=[];++f<t;)l&&l[f].run();f=-1,t=c.length}l=null,u=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function v(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new h(e,t)),1!==c.length||u||s(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},23:function(e,o,i){(function(e){var t=void 0!==e&&e||"undefined"!=typeof self&&self||window,r=Function.prototype.apply;function n(e,t){this._id=e,this._clearFn=t}o.setTimeout=function(){return new n(r.call(setTimeout,t,arguments),clearTimeout)},o.setInterval=function(){return new n(r.call(setInterval,t,arguments),clearInterval)},o.clearTimeout=o.clearInterval=function(e){e&&e.close()},n.prototype.unref=n.prototype.ref=function(){},n.prototype.close=function(){this._clearFn.call(t,this._id)},o.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},o.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},o._unrefActive=o.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;0<=t&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},i(24),o.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,o.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,i(3))},24:function(e,t,r){(function(e,h){!function(r,n){"use strict";if(!r.setImmediate){var o,i,t,a,e,s=1,l={},c=!1,u=r.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(r);f=f&&f.setTimeout?f:r,o="[object process]"==={}.toString.call(r.process)?function(e){h.nextTick(function(){p(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",e=function(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&p(+e.data.slice(a.length))},r.addEventListener?r.addEventListener("message",e,!1):r.attachEvent("onmessage",e),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){p(e.data)},function(e){t.port2.postMessage(e)}):u&&"onreadystatechange"in u.createElement("script")?(i=u.documentElement,function(e){var t=u.createElement("script");t.onreadystatechange=function(){p(e),t.onreadystatechange=null,i.removeChild(t),t=null},i.appendChild(t)}):function(e){setTimeout(p,0,e)},f.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return l[s]=n,o(s),s++},f.clearImmediate=d}function d(e){delete l[e]}function p(e){if(c)setTimeout(p,0,e);else{var t=l[e];if(t){c=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{d(e),c=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,r(3),r(11))},3:function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},67:function(e,t,r){r(68),e.exports=r(77)},68:function(e,f,d){"use strict";(function(l){f.__esModule=!0;var e;(e=d(69)).keys().map(e);d(72),l(document).ready(function(){l(document).foundation()});var t=d(73).default;l(document).ready(function(){var r=document.querySelector(".post-feed");document.body.contains(r)&&new t(r,{itemSelector:".post-card",sizer:".post-card-ex",buffer:1}).on(t.EventType.LAYOUT,function(){var e=document.querySelectorAll(".post-card"),t=document.getElementById("spinkit");e.forEach(function(e){e.classList.add("in"),r.classList.add("loaded")}),setTimeout(function(){document.body.contains(t)&&t.parentNode.removeChild(t)},600)})}),l(document).ready(function(){!function(){var e=parseInt(l(".curr-page").text()),t=parseInt(l(".total-pages").text()),r=window.location.href;if(1<t)for(var n=function(e,t){for(var r=[],n=Math.max(2,e-2);n<=Math.min(t-1,e+2);n++)r.push(n);return 2<e-2&&r.unshift("..."),e+2<t-1&&r.push("..."),r.unshift(1),r.push(t),r}(e,t),o=void 0,i=n.length-1;0<=i;i--){var a=n[i];if(a===e)o='<li class="current">'+a+"</li>";else if("number"==typeof a){var s=r.split("/");"page"===s[s.length-3]&&(r=r.replace(/\/page\/.*$/,"")+"/"),o='<li><a href="'+r+"page/"+a+'" aria-label="Page '+a+'">'+a+"</a></li>"}else o='<li class="ellipsis"></li>';l(".pagination-previous").after(o)}else l(".pagination").css("display","none")}()});var r=l(".site-header-bg"),n=l(".site-header");d(74);var o=window.scrollY,i=n.height(),a=!1,s=function(){a||requestAnimationFrame(c),a=!0},c=function(){-240<=o-r.scrollTop()-i?(n.addClass("bg"),r.css("opacity",.3)):(n.removeClass("bg"),r.css("opacity",1)),a=!1};l(function(){r.length&&c()}),r.length?(document.addEventListener("scroll",function(){o=window.scrollY,s()},{capture:!0,passive:!0}),document.addEventListener("resize",function(){i=n.height(),s()},!1),particlesJS("site-header-bg",{particles:{number:{value:60,density:{enable:!0,value_area:1420}},color:{value:["#aa73ff","#f8c210","#83d238","#33b1f8"]},shape:{type:"triangle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5}},opacity:{value:.5,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:12,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:2,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:140,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})):n.addClass("bg");var u=d(75);l(document).ready(function(){var e=document.querySelectorAll("[data-open-search]"),t=document.querySelectorAll("[data-close-search]"),r=new u.default;e.forEach(function(e){e.addEventListener("click",r.openSearch)}),t.forEach(function(e){e.addEventListener("click",r.closeSearch)})})}).call(this,d(0))},69:function(e,t,r){var n={"./photo-1523980669340-3d154e47d5fd.jpg":70,"./sven-scheuermeier-178631-unsplash.jpg":71};function o(e){var t=i(e);return r(t)}function i(e){var t=n[e];if(t+1)return t;var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}o.keys=function(){return Object.keys(n)},o.resolve=i,(e.exports=o).id=69},70:function(e,t){e.exports="../../assets/img/photo-1523980669340-3d154e47d5fd.jpg"},71:function(e,t){e.exports="../../assets/img/sven-scheuermeier-178631-unsplash.jpg"},75:function(e,t,r){"use strict";t.__esModule=!0;var o=r(76),n=function(){function e(e,t,r,n){this.check=!1,this.input=e||"#ghost-search-field",this.results=t||"#ghost-search-results",this.api={resource:"posts",parameters:{limit:"all",fields:["title","slug","created_at"],filter:"",include:"authors",order:"",formats:""}},this.options={keys:["title"],limit:10,threshold:-3500,allowTypo:!1},this.init()}return e.prototype.url=function(){return"posts"==this.api.resource&&this.api.parameters.include.match(/(tags|authors)/)&&delete this.api.parameters.fields,ghost.url.api(this.api.resource,this.api.parameters)},e.prototype.fetch=function(){var t=this,e=this.url();fetch(e).then(function(e){return e.json()}).then(function(e){return t.search(e)}).catch(function(e){return console.error("Fetch Error =\n",e)})},e.prototype.createElementFromHTML=function(e){var t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild},e.prototype.template=function(e){return'<li><a href="'+[location.protocol,"//",location.host].join("")+"/"+e.slug+'/">'+e.title+"</a></li>"},e.prototype.displayResults=function(e){if(document.querySelector(this.results).nodeType)for(;document.querySelector(this.results).firstChild;)document.querySelector(this.results).removeChild(document.querySelector(this.results).firstChild);var t=document.querySelector(this.input).value;document.querySelector(".search-container").classList.add("dirty");var r=o.go(t,e,{keys:this.options.keys,limit:this.options.limit,allowTypo:this.options.allowTypo,threshold:this.options.threshold});for(var n in r)n<r.length&&document.querySelector(this.results).appendChild(this.createElementFromHTML(this.template(r[n].obj)))},e.prototype.search=function(e){var t=this,r=e[this.api.resource];this.check=!0,document.querySelector(this.input).addEventListener("keyup",function(e){t.displayResults(r)})},e.prototype.checkGhostAPI=function(){return"undefined"!=typeof ghost||(console.log("Ghost API is not enabled"),!1)},e.prototype.checkElements=function(){return document.querySelectorAll(this.input).length?!!document.querySelectorAll(this.results).length||(console.log("Results not found."),!1):(console.log("Input not found."),!1)},e.prototype.validate=function(){return!(!this.checkGhostAPI()||!this.checkElements())},e.prototype.openSearch=function(){var e=document.querySelector("#search"),t=document.querySelector("#ghost-search-field");e.style.display="block",document.querySelector("body").classList.add("noscroll"),t.focus()},e.prototype.closeSearch=function(){var e=document.querySelector("#search"),t=document.querySelector("#ghost-search-results");if("none"!==e.style.display&&""!==e.style.display){e.style.display="none",document.querySelector("body").classList.remove("noscroll");var r=document.querySelector(this.results);if(document.querySelector(".search-container").classList.remove("dirty"),t.value="",r.nodeType)for(;r.firstChild;)r.removeChild(r.firstChild)}},e.prototype.init=function(){var r=this;this.validate()&&(document.querySelector(this.input).addEventListener("focus",function(){r.check||r.fetch()}),document.body.addEventListener("keydown",function(e){if(!e.defaultPrevented){var t=e.key||e.keyCode;"Escape"!==t&&"Esc"!==t&&27!==t||r.closeSearch()}}))},e}();t.default=n},76:function(n,o,e){(function(O){var e,t,r;t=[],void 0===(r="function"==typeof(e=function(){var j="undefined"==typeof window,r=new Map,n=new Map,A=[];A.total=0;var x=[],_=[];function t(){r.clear(),n.clear(),x=[],_=[]}function q(e){for(var t=-9007199254740991,r=e.length-1;0<=r;--r){var n=e[r];if(null!==n){var o=n.score;t<o&&(t=o)}}return-9007199254740991===t?null:t}function P(e,t){var r=e[t];if(void 0!==r)return r;var n=t;Array.isArray(t)||(n=t.split("."));for(var o=n.length,i=-1;e&&++i<o;)e=e[n[i]];return e}function M(e){return"object"==typeof e}var o=function(){var i=[],a=0,e={};function t(){for(var e=0,t=i[e],r=1;r<a;){var n=r+1;e=r,n<a&&i[n].score<i[r].score&&(e=n),i[e-1>>1]=i[e],r=1+(e<<1)}for(var o=e-1>>1;0<e&&t.score<i[o].score;o=(e=o)-1>>1)i[e]=i[o];i[e]=t}return e.add=function(e){var t=a;i[a++]=e;for(var r=t-1>>1;0<t&&e.score<i[r].score;r=(t=r)-1>>1)i[t]=i[r];i[t]=e},e.poll=function(){if(0!==a){var e=i[0];return i[0]=i[--a],t(),e}},e.peek=function(e){if(0!==a)return i[0]},e.replaceTop=function(e){i[0]=e,t()},e},S=o();return function e(E){var C={single:function(e,t,r){if(!e)return null;if(M(e)||(e=C.getPreparedSearch(e)),!t)return null;M(t)||(t=C.getPrepared(t));var n=r&&void 0!==r.allowTypo?r.allowTypo:!E||void 0===E.allowTypo||E.allowTypo,o=n?C.algorithm:C.algorithmNoTypo;return o(e,t,e[0])},go:function(e,t,r){if(!e)return A;var n=(e=C.prepareSearch(e))[0],o=r&&r.threshold||E&&E.threshold||-9007199254740991,i=r&&r.limit||E&&E.limit||9007199254740991,a=r&&void 0!==r.allowTypo?r.allowTypo:!E||void 0===E.allowTypo||E.allowTypo,s=a?C.algorithm:C.algorithmNoTypo,l=0,c=0,u=t.length;if(r&&r.keys)for(var f=r.scoreFn||q,d=r.keys,p=d.length,h=u-1;0<=h;--h){for(var v=t[h],m=new Array(p),g=p-1;0<=g;--g){var y=d[g],w=P(v,y);m[g]=w?(M(w)||(w=C.getPrepared(w)),s(e,w,n)):null}m.obj=v;var b=f(m);null!==b&&(b<o||(m.score=b,l<i?(S.add(m),++l):(++c,b>S.peek().score&&S.replaceTop(m))))}else if(r&&r.key)for(var y=r.key,h=u-1;0<=h;--h){var v=t[h],w=P(v,y);if(w){M(w)||(w=C.getPrepared(w));var T=s(e,w,n);null!==T&&(T.score<o||(T={target:T.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:T.score,indexes:T.indexes,obj:v},l<i?(S.add(T),++l):(++c,T.score>S.peek().score&&S.replaceTop(T))))}}else for(var h=u-1;0<=h;--h){var w=t[h];if(w){M(w)||(w=C.getPrepared(w));var T=s(e,w,n);null!==T&&(T.score<o||(l<i?(S.add(T),++l):(++c,T.score>S.peek().score&&S.replaceTop(T))))}}if(0===l)return A;for(var k=new Array(l),h=l-1;0<=h;--h)k[h]=S.poll();return k.total=l+c,k},goAsync:function(_,S,I){var L=!1,e=new Promise(function(p,h){if(!_)return p(A);var v=(_=C.prepareSearch(_))[0],m=o(),g=S.length-1,y=I&&I.threshold||E&&E.threshold||-9007199254740991,w=I&&I.limit||E&&E.limit||9007199254740991,e=I&&void 0!==I.allowTypo?I.allowTypo:!E||void 0===E.allowTypo||E.allowTypo,b=e?C.algorithm:C.algorithmNoTypo,T=0,k=0;function x(){if(L)return h("canceled");var e=Date.now();if(I&&I.keys)for(var t=I.scoreFn||q,r=I.keys,n=r.length;0<=g;--g){for(var o=S[g],i=new Array(n),a=n-1;0<=a;--a){var s=r[a],l=P(o,s);i[a]=l?(M(l)||(l=C.getPrepared(l)),b(_,l,v)):null}i.obj=o;var c=t(i);if(null!==c&&!(c<y)&&(i.score=c,T<w?(m.add(i),++T):(++k,c>m.peek().score&&m.replaceTop(i)),g%1e3==0&&10<=Date.now()-e))return void(j?O(x):setTimeout(x))}else if(I&&I.key)for(var s=I.key;0<=g;--g){var o=S[g],l=P(o,s);if(l){M(l)||(l=C.getPrepared(l));var u=b(_,l,v);if(null!==u&&!(u.score<y)&&(u={target:u.target,_targetLowerCodes:null,_nextBeginningIndexes:null,score:u.score,indexes:u.indexes,obj:o},T<w?(m.add(u),++T):(++k,u.score>m.peek().score&&m.replaceTop(u)),g%1e3==0&&10<=Date.now()-e))return void(j?O(x):setTimeout(x))}}else for(;0<=g;--g){var l=S[g];if(l){M(l)||(l=C.getPrepared(l));var u=b(_,l,v);if(null!==u&&!(u.score<y)&&(T<w?(m.add(u),++T):(++k,u.score>m.peek().score&&m.replaceTop(u)),g%1e3==0&&10<=Date.now()-e))return void(j?O(x):setTimeout(x))}}if(0===T)return p(A);for(var f=new Array(T),d=T-1;0<=d;--d)f[d]=m.poll();f.total=T+k,p(f)}j?O(x):x()});return e.cancel=function(){L=!0},e},highlight:function(e,t,r){if(null===e)return null;void 0===t&&(t="<b>"),void 0===r&&(r="</b>");for(var n="",o=0,i=!1,a=e.target,s=a.length,l=e.indexes,c=0;c<s;++c){var u=a[c];if(l[o]===c){if(i||(i=!0,n+=t),++o===l.length){n+=u+r+a.substr(c+1);break}}else i&&(i=!1,n+=r);n+=u}return n},prepare:function(e){if(e)return{target:e,_targetLowerCodes:C.prepareLowerCodes(e),_nextBeginningIndexes:null,score:null,indexes:null,obj:null}},prepareSlow:function(e){if(e)return{target:e,_targetLowerCodes:C.prepareLowerCodes(e),_nextBeginningIndexes:C.prepareNextBeginningIndexes(e),score:null,indexes:null,obj:null}},prepareSearch:function(e){if(e)return C.prepareLowerCodes(e)},getPrepared:function(e){if(999<e.length)return C.prepare(e);var t=r.get(e);return void 0!==t||(t=C.prepare(e),r.set(e,t)),t},getPreparedSearch:function(e){if(999<e.length)return C.prepareSearch(e);var t=n.get(e);return void 0!==t||(t=C.prepareSearch(e),n.set(e,t)),t},algorithm:function(e,t,r){for(var n=t._targetLowerCodes,o=e.length,i=n.length,a=0,s=0,l=0,c=0;;){var u=r===n[s];if(u){if(x[c++]=s,++a===o)break;r=e[0===l?a:l===a?a+1:l===a-1?a-1:a]}if(i<=++s)for(;;){if(a<=1)return null;if(0===l){var f=e[--a];if(r===f)continue;l=a}else{if(1===l)return null;r=e[1+(a=--l)];var f=e[a];if(r===f)continue}s=x[(c=a)-1]+1;break}}var a=0,d=0,p=!1,h=0,v=t._nextBeginningIndexes;null===v&&(v=t._nextBeginningIndexes=C.prepareNextBeginningIndexes(t.target));var m=s=0===x[0]?0:v[x[0]-1];if(s!==i)for(;;)if(i<=s){if(a<=0){if(o-2<++d)break;if(e[d]===e[d+1])continue;s=m;continue}--a;var g=_[--h];s=v[g]}else{var u=e[0===d?a:d===a?a+1:d===a-1?a-1:a]===n[s];if(u){if(_[h++]=s,++a===o){p=!0;break}++s}else s=v[s]}if(p)var y=_,w=h;else var y=x,w=c;for(var b=0,T=-1,k=0;k<o;++k){var s=y[k];T!==s-1&&(b-=s),T=s}p?0!==d&&(b+=-20):(b*=1e3,0!==l&&(b+=-20)),b-=i-o,t.score=b,t.indexes=new Array(w);for(var k=w-1;0<=k;--k)t.indexes[k]=y[k];return t},algorithmNoTypo:function(e,t,r){for(var n=t._targetLowerCodes,o=e.length,i=n.length,a=0,s=0,l=0;;){var c=r===n[s];if(c){if(x[l++]=s,++a===o)break;r=e[a]}if(i<=++s)return null}var a=0,u=!1,f=0,d=t._nextBeginningIndexes;if(null===d&&(d=t._nextBeginningIndexes=C.prepareNextBeginningIndexes(t.target)),(s=0===x[0]?0:d[x[0]-1])!==i)for(;;)if(i<=s){if(a<=0)break;--a;var p=_[--f];s=d[p]}else{var c=e[a]===n[s];if(c){if(_[f++]=s,++a===o){u=!0;break}++s}else s=d[s]}if(u)var h=_,v=f;else var h=x,v=l;for(var m=0,g=-1,y=0;y<o;++y){var s=h[y];g!==s-1&&(m-=s),g=s}u||(m*=1e3),m-=i-o,t.score=m,t.indexes=new Array(v);for(var y=v-1;0<=y;--y)t.indexes[y]=h[y];return t},prepareLowerCodes:function(e){for(var t=e.length,r=[],n=e.toLowerCase(),o=0;o<t;++o)r[o]=n.charCodeAt(o);return r},prepareBeginningIndexes:function(e){for(var t=e.length,r=[],n=0,o=!1,i=!1,a=0;a<t;++a){var s=e.charCodeAt(a),l=65<=s&&s<=90,c=l||97<=s&&s<=122||48<=s&&s<=57,u=l&&!o||!i||!c;o=l,i=c,u&&(r[n++]=a)}return r},prepareNextBeginningIndexes:function(e){for(var t=e.length,r=C.prepareBeginningIndexes(e),n=[],o=r[0],i=0,a=0;a<t;++a)n[a]=a<o?o:void 0===(o=r[++i])?t:o;return n},cleanup:t,new:e};return C}()})?e.apply(o,t):e)||(n.exports=r)}).call(this,e(23).setImmediate)},77:function(e,t,r){}});
//# sourceMappingURL=main.js.map