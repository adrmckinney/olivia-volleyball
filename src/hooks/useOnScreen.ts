// code from https://dev.to/producthackers/intersection-observer-using-react-49ko and https://github.com/zygisS22/intersectionObserverApi/blob/master/src/IO-Api-hook.js and for multiple refs: https://stackoverflow.com/questions/74466878/intersection-observer-will-not-observe-multiple-refs

import { useEffect, useRef, useState } from 'react';

type Options = { root: null; rootMargin: string; threshold: number | number[] };

type IntersectionReturn = [React.RefObject<HTMLDivElement | null>, boolean];

const useOnScreen = (observerOptions: Options): IntersectionReturn => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new window.IntersectionObserver(callbackFunction, observerOptions);
        if (ref.current) observer.observe(ref.current);

        const currentContainer = ref.current;

        return () => {
            if (currentContainer) observer.unobserve(currentContainer);
        };
    }, [ref, observerOptions]);

    return [ref, isVisible];
};

export default useOnScreen;
