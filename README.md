# CUSCA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/wdiazux)

A theme for [Ghost](https://ghost.org). I used it on my blog: [wdiaz.org](https://www.wdiaz.org), it looks a little different because my blog is using a different font.

**What that mean cusca?**

Is the abbreviation for Cuscatlán, it was the name of El Salvador before the conquest and means "the land of precious things" in Nahuatl.

---

## Introduction

Cusca was development using [Foundation](http://foundation.zurb.com), and other libraries, like:

- [Fancybox](http://fancyapps.com/fancybox/3/)
- [FluidVids](https://github.com/toddmotto/fluidvids)
- [FontAwesome](http://fontawesome.io)
- [ImagesLoaded](https://imagesloaded.desandro.com)
- [Isotope](https://isotope.metafizzy.co)
- [Prism.js](http://prismjs.com)
- [Wow.js](http://mynameismatthieu.com/WOW/)
- [Skeletor Syntax](https://github.com/ramonmcros/skeletor-syntax)
  
## Installation

Inside the Ghost themes folder (`content/themes`) clone the repository:
```bash
git clone https://github.com/wdiazux/cusca.git
```
You will need to enable the Ghost Public API, you will found the options in the Admin panel and Labs or you also can [Read how to do it on my blog](https://www.wdiaz.org/how-to-enable-the-public-api-on-ghost/).

## Setup

### Disqus

On `post.hbs` you need to replace `[your-disqus-name]` with your Disqus name:

```javascript
(function() { // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.async = true;
    s.src = 'https://[your-disqus-name].disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
})();
```

Do the same for `partials/loop.hbs`:

```html
<script id="dsq-count-scr" src="//[your-disqus-name].disqus.com/count.js" async></script>
```

### Social Icons

On `partials/header.hbs` replace `[your-user]` with your user names for each social network:

```html
<li class="nd-social-twitter">
    <a target="_blank" href="https://twitter.com/[your-user]"><i class="fa fa-twitter fa-lg"></i></a>
</li>
<li class="nd-social-youtube">
    <a target="_blank" href="https://www.youtube.com/user/[your-user]"><i class="fa fa-youtube fa-lg"></i></a>
</li>
<li class="nd-social-instagram">
    <a target="_blank" href="https://www.instagram.com/[your-user]"><i class="fa fa-instagram fa-lg"></i></a>
</li>
<li class="nd-social-github">
    <a target="_blank" href="https://github.com/[your-user]"><i class="fa fa-github fa-lg"></i></a>
</li>
```

### Google Analytics

On `partials/google_analytics.hbs` replace `[your-ga-id]` with your google analytics id:

```javascript
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '[your-ga-id]', 'auto');
ga('send', 'pageview');
```


## License

The theme is under the MIT License, but if you are going to use the for commercial purposes, please note the libraries are not all free.