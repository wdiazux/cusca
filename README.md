# CUSCA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/wdiazux/cusca/workflows/Test/badge.svg)](https://github.com/wdiazux/cusca/actions?query=workflow%3ATest)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/wdiazux)

A responsive theme for [Ghost 3.x](https://ghost.org).

**What that mean CUSCA?**

Is the abbreviation for Cuscatlán, it was the name of El Salvador before the conquest and means "the land of precious things" in Nahuatl.

---

## Introduction

Cusca was development using [Foundation](http://foundation.zurb.com) as base, the style is generated with
[Sass](https://sass-lang.com) and the javascript is generated with [Typescript](https://www.typescriptlang.org) and
other cool stuff that comes from different libraries:

- [Shuffle](https://vestride.github.io/Shuffle/)
- [LightGallery.js](https://sachinchoolur.github.io/lightgallery.js/)
- [FontAwesome](http://fontawesome.io)
- [Prism.js](http://prismjs.com)
- [Color Thief](https://lokeshdhakar.com/projects/color-thief/)
- [Particles.js](https://vincentgarreau.com/particles.js/)
- [Ghost Search](https://github.com/HauntedThemes/ghost-search)

All the help to contribute to the development or improvement of the theme is welcomed.
  
## Installation

Inside the Ghost themes folder (content/themes) you have to clone the repository or download the last version:

:anchor: [Last release](https://github.com/wdiazux/cusca/releases/latest)

```bash
git clone https://github.com/wdiazux/cusca.git
```

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

### Search

The new release of the Ghost API v3, require extra steps that are **NECESSARY** for the
search functionality:

- Go in your Ghost's dashboard -> Integrations -> Add custom integration
- Set a name: Themes Search
- Get the `Content API Key` and replace the demo key with this one
- Do the same with the `API URL`

The file to modify with this credentials is `src/scripts/app.ts`
and at the end of the document is the Search section, and the parameter you
need to change are the URL and Key from the GhostSearch class.

```javascript
const ghostSearch = new GhostSearch({
    url: 'http://localhost:2368',
    key: '4f1476d8df3a9cd277b2273b6e',
});
```

You will need to rebuild the theme to make it work after modifying the parameters. In
the end of this page you will find the commands that you need to do it.

### Social Icons

Inside the `partials/footer.hbs` file replace `[your-user]` with your user names for each social network:

```html
<li>
    <a href="https://www.youtube.com/[your-user]" target="_blank" rel="noopener" title="Youtube"><i class="fab fa-youtube"></i></a>
</li>
<li>
    <a href="https://www.facebook.com/[your-user]" target="_blank" rel="noopener" title="Facebook"><i class="fab fa-facebook-f"></i></a>
</li>
<li>
    <a href="https://twitter.com/[your-user]" target="_blank" rel="noopener" title="Twitter"><i class="fab fa-twitter"></i></a>
</li>
<li>
    <a href="https://www.instagram.com/[your-user]" target="_blank" rel="noopener" title="Instagram"><i class="fab fa-instagram"></i></a>
</li>
<li>
    <a href="https://github.com/[your-user]" target="_blank" rel="noopener" title="Github"><i class="fab fa-github-alt"></i></a>
</li>
<li>
    <a href="https://www.linkedin.com/in/[your-user]" target="_blank" rel="noopener" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
</li>
```

### Google Analytics

Inside the `partials/google_analytics.hbs` file replace `[your-ga-id]` with your google analytics id:

```javascript
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '[your-ga-id]', 'auto');
ga('send', 'pageview');
```

## Modify the theme

You need to run a ghost instance in the port 2368 it is the default ghost port,
the theme was development using Webpack, so first you need to install it and
their dependencies with this command:

``` bash
npm install
```

You also can use yarn instead of npm:
``` bash
yarn install
```

Then you have four commands provided by the Webpack configuration file:
* `npm run dev` to compile files in development.
* `npm run start` for live development.
* `npm run build` to build a production environment.
* `npm run test` to test the theme with gscan.

If you are using yarn:
* `yarn dev` to compile files in development.
* `yarn start` for live development.
* `yarn build` to build a production environment.
* `yarn test` to test the theme with gscan.

If you are looking to modify the style or something in the scripts, the source
files are in the `src` directory `assets` is the destination directory and it
shouldn't be modified.
This version use Typescript for javascript and SASS to generate CSS.

## Copyright & License

- Copyright (c) 2017-2020 William Diaz - Released under the [MIT license](LICENSE).
This version is using the MIT license and the libraries are also MIT or compatibles with it.
