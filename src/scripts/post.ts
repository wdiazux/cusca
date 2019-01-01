// jQuery
// ------

import jQuery = require('jquery');

// Fancybox
// --------

import '@fancyapps/fancybox';


// PrismJS
// -------

import 'prismjs';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/components/prism-batch';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-handlebars';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-typescript';

$(document).ready(() => {    
    // Fancybox
    // ---------
    const wrapImages = (elem:string, elemClass:string, exclude:string) => {
        let imgs = $(elem);
        if (imgs.length > 0) {
            imgs.each(function () {
                let $this = $(this);
                let imgLink = $this.attr('src'),
                caption = $this.attr('alt');

                if (!$this.hasClass(exclude)) {
                    let imgWrap = '<a href=\"' + imgLink + '\" class=\"' + elemClass + '\"' +
                        'data-fancybox=\"group\" data-caption=\"' + caption + '\"></a>';
                    $this.wrap(imgWrap);
                }
            });
        }
    };

    wrapImages('.post-content img','fancy-box','no-fancy-box');
  
	$('.fancy-box').fancybox();
    
    
    // Responsive Videos
    // -----------------
    const videoSelectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
    ];
    let $allVideos = $('.post-content').find(videoSelectors.join(','));
    $allVideos = $allVideos.not('object object'); // SwfObj conflict patch}

    $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() !== 'embed' && $this.parent('object').length === 0 || $this.parent('.responsive-embed').length  < 0) {
            const videoWrap = '<div class="responsive-embed"></div>';
            $this.wrap(videoWrap);
        }
    });
});
