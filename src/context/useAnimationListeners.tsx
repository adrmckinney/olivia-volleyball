import { useEffect, useRef, useState } from 'react';

const useAnimationListeners = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRef = useRef<HTMLDivElement>(null);

    // Without the event listeners below, the drawer animation would work
    // 100% on open but wouldn't work at all on close because the drawer
    // would be dismounted before the animation could run. These event
    // listeners keep the drawer mounted until the animation is done.
    useEffect(() => {
        const handleAnimationCancel = () => {
            setIsAnimating(false);
        };
        const handleAnimationEnd = () => {
            setIsAnimating(false);
        };

        const drawerEl = animationRef.current;
        drawerEl?.addEventListener('animationcancel', handleAnimationCancel);
        drawerEl?.addEventListener('animationend', handleAnimationEnd);

        return () => {
            drawerEl?.removeEventListener('animationcancel', handleAnimationCancel);
            drawerEl?.removeEventListener('animationend', handleAnimationEnd);
        };
    }, [animationRef.current]);
    console.log('isAnimating in hook', isAnimating);
    return {
        isAnimating,
        setIsAnimating,
        animationRef,
    };
};

export default useAnimationListeners;
