import { render, screen } from '@testing-library/react';
import { configs } from '../../__mocks__/configs'; // Import the mock configs
import { NavigationContext } from '../../context/NavigationProvider';
import { createMockNavigationContext } from '../../testUtils';
import Videos from './Videos';

jest.mock('../../configs'); // Mock the configs module

describe('videos page elements render', () => {
    const mockContextValue = createMockNavigationContext();

    test('video section title renders', () => {
        render(
            <NavigationContext.Provider value={mockContextValue}>
                <Videos />
            </NavigationContext.Provider>
        );
        const element = screen.getByText(/Videos/i);
        expect(element).toBeInTheDocument();
        expect(configs).toBeDefined(); // Ensure the mock configs is being used
    });
});
