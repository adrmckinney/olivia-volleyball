import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationContext } from '../../context/NavigationProvider';
import { testFlags } from '../../hooks/__mocks__/useGetFeatureFlags';
import useGetFeatureFlags from '../../hooks/useGetFeatureFlags';
import { createMockNavigationContext } from '../../testUtils';
import NavBar from './NavBar';

jest.mock('../../hooks/useGetFeatureFlags');

describe('nav bar buttons render', () => {
    test('renders Home nav button', () => {
        render(<NavBar />);
        const homeElement = screen.getByText(/Home/i);
        expect(homeElement).toBeInTheDocument();
    });

    test('renders videos nav button', () => {
        render(<NavBar />);
        const videoEl = screen.getByText(/Videos/i);
        expect(videoEl).toBeInTheDocument();
    });

    test('renders schedule/stats nav button', () => {
        render(<NavBar />);
        const scheduleEl = screen.getByText(/Schedule\/Stats/i);
        expect(scheduleEl).toBeInTheDocument();
    });

    test('does not render schedule/stats nav button with feature flag false', () => {
        (useGetFeatureFlags as jest.Mock).mockReturnValue({
            ...testFlags,
            SCHEDULES_AND_STATS: false,
        });

        render(<NavBar />);
        const scheduleEl = screen.queryByText(/Schedule\/Stats/i);
        expect(scheduleEl).not.toBeInTheDocument();
    });

    test('renders athletic history nav button', () => {
        render(<NavBar />);
        const element = screen.getByText(/Athletic History/i);
        expect(element).toBeInTheDocument();
    });

    test('renders contact nav button', () => {
        render(<NavBar />);
        const element = screen.getByText(/Contact/i);
        expect(element).toBeInTheDocument();
    });

    test('about does not render nav button', () => {
        (useGetFeatureFlags as jest.Mock).mockReturnValue({
            ...testFlags,
            FEATURE_ABOUT_SECTION: false,
        });
        render(<NavBar />);
        const element = screen.queryByText(/About/i);
        expect(element).not.toBeInTheDocument();
    });
});

describe('nav bar buttons click', () => {
    const mockContextValue = createMockNavigationContext();
    const { handleNavClick: mockHandleNavClick } = mockContextValue;
    test('home nav button clickable', () => {
        render(
            <NavigationContext.Provider value={mockContextValue}>
                <NavBar />
            </NavigationContext.Provider>
        );
        const homeElement = screen.getByText(/Home/i);
        expect(homeElement).toBeInTheDocument();

        fireEvent.click(homeElement);
        expect(mockHandleNavClick).toHaveBeenCalledWith('landing');
    });

    test('videos nav button clickable', () => {
        render(
            <NavigationContext.Provider value={mockContextValue}>
                <NavBar />
            </NavigationContext.Provider>
        );
        const element = screen.getByText(/Videos/i);
        expect(element).toBeInTheDocument();

        fireEvent.click(element);
        expect(mockHandleNavClick).toHaveBeenCalledWith('videos');
    });

    test('schedule/stats nav button clickable', () => {
        render(
            <NavigationContext.Provider value={mockContextValue}>
                <NavBar />
            </NavigationContext.Provider>
        );
        const element = screen.getByText(/Schedule\/Stats/i);
        expect(element).toBeInTheDocument();

        fireEvent.click(element);
        expect(mockHandleNavClick).toHaveBeenCalledWith('schedule');
    });

    test('athletic history nav button clickable', () => {
        render(
            <NavigationContext.Provider value={mockContextValue}>
                <NavBar />
            </NavigationContext.Provider>
        );
        const element = screen.getByText(/Athletic History/i);
        expect(element).toBeInTheDocument();

        fireEvent.click(element);
        expect(mockHandleNavClick).toHaveBeenCalledWith('history');
    });

    test('contact history nav button clickable', () => {
        render(
            <NavigationContext.Provider value={mockContextValue}>
                <NavBar />
            </NavigationContext.Provider>
        );
        const element = screen.getByText(/Contact/i);
        expect(element).toBeInTheDocument();

        fireEvent.click(element);
        expect(mockHandleNavClick).toHaveBeenCalledWith('contact');
    });
});
