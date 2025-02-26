import { createRef } from 'react';
import { NavigationType } from './context/NavigationProvider';

export const createMockNavigationContext = (): NavigationType => {
    const mockLandingRef = createRef();
    const mockVideosRef = createRef();
    const mockHistoryRef = createRef();
    const mockStatsRef = createRef();
    const mockAboutRef = createRef();
    const mockContactRef = createRef();
    const mockScheduleRef = createRef();

    const mockHandleNavClick = jest.fn();

    return {
        current: 'landing',
        handleNavClick: mockHandleNavClick,
        hideNavBackground: false,
        opacity: '1',
        landingRef: mockLandingRef,
        videosRef: mockVideosRef,
        historyRef: mockHistoryRef,
        statsRef: mockStatsRef,
        aboutRef: mockAboutRef,
        contactRef: mockContactRef,
        scheduleRef: mockScheduleRef,
    };
};
