import { createContext, useEffect, useState } from 'react';
import useGetWindowWidth from '../hooks/useGetWindowWidth';
import useOnScreen from '../hooks/useOnScreen';
import { ProviderProps } from '../types/ProviderProps';

export type NavigationType = {
    current: Current;
    handleNavClick: (targetNav: Current) => void;
    hideNavBackground: boolean;
    opacity: string;
    landingRef: any | null;
    videosRef: any | null;
    historyRef: any | null;
    statsRef: any | null;
    aboutRef: any | null;
    contactRef: any | null;
};

export type Current =
    | 'landing'
    | 'videos'
    | 'history'
    | 'stats'
    | 'about'
    | 'contact'
    | (string & {});

const defaultValue: NavigationType = {
    current: 'landing',
    handleNavClick: () => {},
    hideNavBackground: true,
    opacity: 'opacity-0',
    landingRef: null,
    videosRef: null,
    historyRef: null,
    statsRef: null,
    aboutRef: null,
    contactRef: null,
};

export const NavigationContext = createContext<NavigationType>(defaultValue);

const NavigationProvider = ({ children }: ProviderProps) => {
    const [current, setCurrent] = useState<Current>('landing');
    const [hideNavBackground, setHideNavBackground] = useState(true);
    const [opacity, setOpacity] = useState('lg:opacity-0');
    const { currentTailwindBreakpoint } = useGetWindowWidth();

    const isSmallerScreen =
        currentTailwindBreakpoint === 'sm' || currentTailwindBreakpoint === 'md';

    const [landingRef, landingIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: isSmallerScreen ? 0 : 0.5,
    });

    const [videosRef, videoIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: isSmallerScreen ? 1.0 : 0.9,
    });

    const [historyRef, historyIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: isSmallerScreen ? 1.0 : 0.6,
    });

    const [statsRef, statsIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: isSmallerScreen ? 1.0 : 0.2,
    });

    const [aboutRef, aboutIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: isSmallerScreen ? 1.0 : 0.2,
    });

    // Because contact is such a small vertical space and is at the bottom
    // we have to use an onScroll listener to determine when it is in view
    // aka, at the bottom of the screen.
    const [contactRef, contactIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: isSmallerScreen ? 1.0 : 0.2,
    });

    const handleNavClick = (targetNav: Current) => {
        switch (targetNav) {
            case 'landing':
                landingRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'videos':
                videosRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'history':
                historyRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'stats':
                statsRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'about':
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                contactRef.current?.scrollIntoView({ behavior: 'smooth' });
                break;
        }
    };

    const handleChangeNav = () => {
        if (landingIsVisible) {
            setCurrent('landing');
        }
        if (videoIsVisible) {
            if (current === 'videos') return;
            setCurrent('videos');
        }

        if (historyIsVisible) {
            if (current === 'history') return;
            setCurrent('history');
        }

        if (statsIsVisible) {
            if (current === 'stats') return;
            setCurrent('stats');
        }

        if (aboutIsVisible) {
            if (current === 'about') return;
            setCurrent('about');
        }

        // if (contactIsVisible) {
        //     if (current === 'contact') return;
        //     setCurrent('contact');
        // }

        if (isSmallerScreen) {
            if (contactIsVisible) {
                if (current === 'contact') return;
                setCurrent('contact');
            }
        } else {
            window.onscroll = function (ev) {
                if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
                    // you're at the bottom of the page
                    setCurrent('contact');
                } else if (
                    // Set current to the previous around the time the header would be in view
                    window.innerHeight + window.scrollY >= document.body.scrollHeight - 310 &&
                    window.innerHeight + window.scrollY <= document.body.scrollHeight - 290
                ) {
                    setCurrent('history');
                }
            };
        }
    };

    const changeNavOpacity = (yPosition: number) => {
        if (yPosition <= 30) {
            setOpacity('lg:opacity-0');
        }

        if (yPosition >= 31 && yPosition <= 40) {
            setOpacity('lg:opacity-5');
        }

        if (yPosition >= 41 && yPosition <= 50) {
            setOpacity('lg:opacity-10');
        }

        if (yPosition >= 51 && yPosition <= 60) {
            setOpacity('lg:opacity-15');
        }

        if (yPosition >= 61 && yPosition <= 70) {
            setOpacity('lg:opacity-20');
        }

        if (yPosition >= 71 && yPosition <= 80) {
            setOpacity('lg:opacity-40');
        }

        if (yPosition >= 81 && yPosition <= 90) {
            setOpacity('lg:opacity-55');
        }

        if (yPosition >= 91 && yPosition <= 100) {
            setOpacity('lg:opacity-95');
        }

        if (yPosition >= 101) {
            setOpacity('lg:opacity-100');
        }
    };

    const handleScroll = () => {
        if (window.scrollY > 30) {
            setHideNavBackground(false);
            changeNavOpacity(window.scrollY);
        } else {
            setHideNavBackground(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleChangeNav();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        landingIsVisible,
        videoIsVisible,
        historyIsVisible,
        statsIsVisible,
        aboutIsVisible,
        contactIsVisible,
    ]);

    return (
        <NavigationContext.Provider
            value={{
                current,
                handleNavClick,
                hideNavBackground,
                opacity,
                landingRef,
                videosRef,
                historyRef,
                statsRef,
                aboutRef,
                contactRef,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationProvider;
