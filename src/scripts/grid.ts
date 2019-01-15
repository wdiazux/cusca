// Grid
// ----
const Shuffle = require('shufflejs').default;
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
        
        // Add class "loaded" to feed post container
        postFeed.classList.add('loaded');
        
        // Add animation class "in" to post-card
        for(let i=0; i < items.length; i++) {
            items[i].classList.add('in');
        }
        
        // Wait 6 milliseconds to remove spinkKit
        setTimeout(() => {
            if(document.body.contains(spinKit)) {
                spinKit.parentNode.removeChild(spinKit);
            }
        }, 600);
    });
}
