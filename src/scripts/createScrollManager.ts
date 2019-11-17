const createScrollManager = () => {
    let callbacks: { (data?: number): void }[] = [];
    let scrollPosition = -1;
    let animatedKilled = false;
    let eventsAdded = false;

    const animate = () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        requestAnimationFrame(onScroll);
    };

    const addEvents = (): void => {
        window.addEventListener(
            'scroll',
            () => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                onScroll();
            },
            {
                capture: true,
                passive: true,
            }
        );
    };

    const onScroll = () => {
        if (animatedKilled) return;

        if (scrollPosition !== window.pageYOffset) {
            scrollPosition = window.pageYOffset;
            callbacks.forEach(cb => cb(scrollPosition));
            animate();
        } else if (!eventsAdded) {
            addEvents();
            eventsAdded = true;
        }
    };

    animate();

    return {
        add: (cb: (data?: number) => void) => {
            callbacks = [...callbacks, cb];
        },
        remove: (cb: () => {}): void => {
            callbacks = callbacks.filter(value => value !== cb);
        },
        destroy: (): void => {
            animatedKilled = true;
            window.removeEventListener('scroll', animate);
        },
    };
};

export default createScrollManager;
