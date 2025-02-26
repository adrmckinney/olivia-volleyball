import { configs } from '../configs';

export const defaultFeatureFlags = {
    SCHEDULES_AND_STATS: false,
    FEATURE_JAMMERS_2024_SCHEDULE: false,
    FEATURE_JAMMERS_2025_SCHEDULE: false,
    FEATURE_RIVERSIDE_2024_SCHEDULE: false,
    FEATURE_ABOUT_SECTION: false,
} as const;

export const featureFlags: Record<keyof typeof defaultFeatureFlags, boolean> = {
    SCHEDULES_AND_STATS:
        configs.featureFlags.schedulesAndStats || defaultFeatureFlags.SCHEDULES_AND_STATS,
    FEATURE_JAMMERS_2024_SCHEDULE:
        configs.featureFlags.jammers2024Schedule ||
        defaultFeatureFlags.FEATURE_JAMMERS_2024_SCHEDULE,
    FEATURE_RIVERSIDE_2024_SCHEDULE:
        configs.featureFlags.riverside2024Schedule ||
        defaultFeatureFlags.FEATURE_RIVERSIDE_2024_SCHEDULE,
    FEATURE_JAMMERS_2025_SCHEDULE:
        configs.featureFlags.jammers2025Schedule ||
        defaultFeatureFlags.FEATURE_JAMMERS_2025_SCHEDULE,
    FEATURE_ABOUT_SECTION:
        configs.featureFlags.aboutSection || defaultFeatureFlags.FEATURE_ABOUT_SECTION,
};

export type FeatureFlagKeys = keyof typeof featureFlags;
export type FeatureFlags = { [K in FeatureFlagKeys]: boolean };
