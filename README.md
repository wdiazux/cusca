# CUSCA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/wdiazux)

A theme for [Ghost 1.0](https://ghost.org).

**What that mean cusca?**

Is the abbreviation for Cuscatlán, it was the name of El Salvador before the conquest and means "the land of precious things" in Nahuatl.

---

## Introduction

Cusca was development using [Foundation](http://foundation.zurb.com), and other libraries:

- [Fancybox](http://fancyapps.com/fancybox/3/)
- [FluidVids](https://github.com/toddmotto/fluidvids)
- [FontAwesome](http://fontawesome.io)
- [ImagesLoaded](https://imagesloaded.desandro.com)
- [Isotope](https://isotope.metafizzy.co)
- [Prism.js](http://prismjs.com)
- [Wow.js](http://mynameismatthieu.com/WOW/)
- [Skeletor Syntax](https://github.com/ramonmcros/skeletor-syntax)
  
## Installation

Inside the Ghost themes folder (content/themes) you have to clone the repository or download the last version:

:anchor: [Last release](https://github.com/wdiazux/cusca/releases/latest)

```bash
git clone https://github.com/wdiazux/cusca.git
```

:warning: **Important:**

You will need to enable the Ghost Public API and Subscribers, both option are in the Labs in the Admin panel. You also can [Read how to do it on my blog](https://www.wdiaz.org/how-to-enable-the-public-api-on-ghost/).

## Setup

### Disqus

Inside the `post.hbs` file you need to replace `[your-disqus-name]` with your Disqus name:

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

#### For Facebook and Twitter

You need to go to the Ghost console in `Settings > General > Social accounts`, insert the links to your profiles.

#### For other Networks

Inside the `partials/header.hbs` file replace `[your-user]` with your user names for each social network:

```html
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

Inside the `partials/google_analytics.hbs` file replace `[your-ga-id]` with your google analytics id:

```javascript
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '[your-ga-id]', 'auto');
ga('send', 'pageview');
```


## License

The theme is under the MIT License, but if you are going to use the for commercial purposes, please note the libraries are not all free.