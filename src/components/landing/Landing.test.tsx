import { render, screen } from '@testing-library/react';
import { configs } from '../../__mocks__/configs'; // Import the mock configs
import { NavigationContext } from '../../context/NavigationProvider';
import { createMockNavigationContext } from '../../testUtils';
import Landing from './Landing';

jest.mock('../../configs'); // Mock the configs module

// Can't test anything else because all other data comes from Google Sheets
// and I'm not testing with real API calls.

describe('landing page elements render', () => {
    const mockContextValue = createMockNavigationContext();

    test('name renders', () => {
        render(
            <NavigationContext.Provider value={mockContextValue}>
                <Landing />
            </NavigationContext.Provider>
        );
        const element = screen.getByText(/Olivia McKinney/i);
        expect(element).toBeInTheDocument();
        expect(configs).toBeDefined(); // Ensure the mock configs is being used
    });
});
