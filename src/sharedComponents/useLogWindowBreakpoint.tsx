import { useEffect, useState } from 'react';

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1600,
};

const getCurrentBreakpoint = (width: number) => {
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    if (width < breakpoints['2xl']) return 'xl';
    if (width < breakpoints['3xl']) return '2xl';
    if (width > breakpoints['3xl']) return '3xl';
};

/**
 * Use Log Window Breakpoint
 *
 * This custom hook is for development/debugging purposes. Calling this
 * hook in a file will console log the current breakpoint as a string.
 * Adjusting the width of the screen will trigger new
 * currentBreakpoints to be logged.
 *
 * @returns currentBreakpoint as string. Ex 'sm', 'md' etc.
 */
const useLogWindowBreakpoint = (): string | undefined => {
    const [currentTailwindBreakpoint, setCurrentTailwindBreakpoint] = useState(
        getCurrentBreakpoint(window.innerWidth)
    );
    const [currentWindowLength, setCurrentWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setCurrentWindowWidth(window.innerWidth);
            setCurrentTailwindBreakpoint(getCurrentBreakpoint(window.innerWidth));
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    console.log(
        `currentWindowLength: ${currentWindowLength} | currentTailwindBreakpoint: ${currentTailwindBreakpoint}`
    );
    return currentTailwindBreakpoint;
};

export default useLogWindowBreakpoint;
