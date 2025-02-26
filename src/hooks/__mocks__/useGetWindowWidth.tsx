export const testWindowWidthResponse = {
    currentTailwindBreakpoint: 'md',
    currentWindowWidth: 1024,
    isBreakpointGreaterThan: jest.fn(),
    isBreakpointLessThan: jest.fn(),
};

const useGetWindowWidth = jest.fn(() => {
    return testWindowWidthResponse;
});
export default useGetWindowWidth;
