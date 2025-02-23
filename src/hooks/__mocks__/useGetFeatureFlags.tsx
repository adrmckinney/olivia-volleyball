import { FeatureFlags } from '../../types/FeatureFlags';

export const testFlags: FeatureFlags = {
    SCHEDULES_AND_STATS: true,
    FEATURE_JAMMERS_2024_SCHEDULE: true,
    FEATURE_RIVERSIDE_2024_SCHEDULE: true,
    FEATURE_JAMMERS_2025_SCHEDULE: true,
    FEATURE_ABOUT_SECTION: true,
};

const useGetFeatureFlags = jest.fn(() => {
    return testFlags;
});

export default useGetFeatureFlags;
