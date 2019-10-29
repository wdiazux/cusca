// Grid
// ----
const Shuffle = require('shufflejs').default;
const postFeed:HTMLDivElement = document.querySelector('.post-feed');

if(document.body.contains(postFeed)) {
    const shuffleInstance = new Shuffle(postFeed, {
        itemSelector: '.post-card',
        sizer: '.post-card-ex',
        buffer: 1
    });
        
    shuffleInstance.on(Shuffle.EventType.LAYOUT, function () {
        let items: NodeListOf<HTMLDivElement> = document.querySelectorAll('.post-card');
        const spinKit: HTMLElement = document.getElementById('spinkit');
        
        // Add class "loaded" to feed post container
        postFeed.classList.add('loaded');
        
        // Add animation class "in" to post-card
        items.forEach((item) => {
            item.classList.add('in');
        });

        // Wait 6 milliseconds to remove spinkKit
        setTimeout(() => {
            if(document.body.contains(spinKit)) {
                spinKit.parentNode.removeChild(spinKit);
            }
        }, 600);
    });
}
