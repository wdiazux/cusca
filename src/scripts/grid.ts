// Grid
// ----
const Shuffle = require('shufflejs').default;

$(document).ready(() => {
    const postFeed:HTMLElement = document.querySelector('.post-feed');
    if(document.body.contains(postFeed)) {
        const shuffleInstance = new Shuffle(postFeed, {
            itemSelector: '.post-card',
            sizer: '.post-card-ex',
            buffer: 1
        });
        
        shuffleInstance.on(Shuffle.EventType.LAYOUT, function () {
            let items = document.querySelectorAll('.post-card');
            const spinKit = document.getElementById('spinkit');
            
            for(let i=0; i < items.length; i++) {
                items[i].classList.add('in');
            }
            postFeed.classList.add('loaded');
            setTimeout(() => {
                if(document.body.contains(spinKit)) {
                    spinKit.parentNode.removeChild(spinKit);
                }
            }, 600);
        });
    }
});
