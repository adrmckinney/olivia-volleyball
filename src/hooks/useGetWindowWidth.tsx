import { useEffect, useState } from 'react';

const breakpointValues: Record<TailwindBreakpoints, number> = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 5,
    '3xl': 6,
};

export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1600,
};

const getBreakpointValue = (breakpoint: TailwindBreakpoints) => breakpointValues[breakpoint] || 0;

export const getCurrentBreakpoint = (width: number): TailwindBreakpoints => {
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    if (width < breakpoints['2xl']) return 'xl';
    if (width < breakpoints['3xl']) return '2xl';
    if (width > breakpoints['3xl']) return '3xl';
    return 'md'; // in case of undefined which should never happen
};

export type TailwindBreakpoints = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type Response = {
    currentTailwindBreakpoint: TailwindBreakpoints;
    currentWindowWidth: number;
    isBreakpointGreaterThan: (breakpoint: TailwindBreakpoints) => boolean;
    isBreakpointLessThan: (breakpoint: TailwindBreakpoints) => boolean;
};

/**
 * use Get Window Width
 *
 * @returns object with currentBreakpoint as string. Ex 'sm', 'md' etc and currentWindowWidth.
 */
const useGetWindowWidth = (): Response => {
    const [currentTailwindBreakpoint, setCurrentTailwindBreakpoint] = useState<TailwindBreakpoints>(
        getCurrentBreakpoint(window.innerWidth)
    );
    const [currentWindowWidth, setCurrentWindowWidth] = useState(window.innerWidth);

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

    const isBreakpointGreaterThan = (breakpoint: TailwindBreakpoints) => {
        return getBreakpointValue(currentTailwindBreakpoint) > getBreakpointValue(breakpoint);
    };

    const isBreakpointLessThan = (breakpoint: TailwindBreakpoints) => {
        return getBreakpointValue(currentTailwindBreakpoint) < getBreakpointValue(breakpoint);
    };

    return {
        currentTailwindBreakpoint,
        currentWindowWidth,
        isBreakpointGreaterThan,
        isBreakpointLessThan,
    };
};

export default useGetWindowWidth;
