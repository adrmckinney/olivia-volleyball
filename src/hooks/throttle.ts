import { useRef } from 'react';

function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const lastRan = useRef<number | null>(null);
    const lastFunc = useRef<number | null>(null);

    return (...args: any[]) => {
        if (!lastRan.current) {
            callback(...args);
            lastRan.current = Date.now();
        } else {
            clearTimeout(lastFunc.current!);
            lastFunc.current = window.setTimeout(
                () => {
                    if (Date.now() - lastRan.current! >= delay) {
                        callback(...args);
                        lastRan.current = Date.now();
                    }
                },
                delay - (Date.now() - lastRan.current!)
            );
        }
    };
}

export default useThrottle;
