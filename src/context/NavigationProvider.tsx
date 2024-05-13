import { createContext, useEffect, useState } from 'react';
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
};

export type Current = 'landing' | 'videos' | 'history' | 'stats' | 'about' | (string & {});

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
};

export const NavigationContext = createContext<NavigationType>(defaultValue);

const NavigationProvider = ({ children }: ProviderProps) => {
    const [current, setCurrent] = useState<Current>('landing');
    const [hideNavBackground, setHideNavBackground] = useState(true);
    const [opacity, setOpacity] = useState('opacity-0');

    const [landingRef, landingIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    });

    const [videosRef, videoIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    });

    const [historyRef, historyIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
    });

    const [statsRef, statsIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
    });

    const [aboutRef, aboutIsVisible] = useOnScreen({
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
    });

    const handleNavClick = (targetNav: Current) => {
        setCurrent(targetNav);
        switch (targetNav) {
            case 'landing':
                landingRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'videos':
                videosRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'history':
                historyRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'stats':
                statsRef.current.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'about':
                aboutRef.current.scrollIntoView({ behavior: 'smooth' });
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
    };

    const changeNavOpacity = (yPosition: number) => {
        if (yPosition <= 30) {
            setOpacity('opacity-0');
        }

        if (yPosition >= 31 && yPosition <= 40) {
            setOpacity('opacity-5');
        }

        if (yPosition >= 41 && yPosition <= 50) {
            setOpacity('opacity-10');
        }

        if (yPosition >= 51 && yPosition <= 60) {
            setOpacity('opacity-15');
        }

        if (yPosition >= 61 && yPosition <= 70) {
            setOpacity('opacity-20');
        }

        if (yPosition >= 71 && yPosition <= 80) {
            setOpacity('opacity-40');
        }

        if (yPosition >= 81 && yPosition <= 90) {
            setOpacity('opacity-55');
        }

        if (yPosition >= 91 && yPosition <= 100) {
            setOpacity('opacity-95');
        }

        if (yPosition >= 101) {
            setOpacity('opacity-100');
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
    }, [landingIsVisible, videoIsVisible, historyIsVisible, statsIsVisible, aboutIsVisible]);

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
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationProvider;
