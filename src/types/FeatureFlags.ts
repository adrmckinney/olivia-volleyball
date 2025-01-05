export const defaultFeatureFlags = {
    SCHEDULES_AND_STATS: false,
    FEATURE_JAMMERS_2024_SCHEDULE: false,
    FEATURE_JAMMERS_2025_SCHEDULE: false,
    FEATURE_RIVERSIDE_2024_SCHEDULE: false,
} as const;

export const featureFlags: Record<keyof typeof defaultFeatureFlags, boolean> = {
    SCHEDULES_AND_STATS:
        import.meta.env.VITE_SCHEDULES_AND_STATS === 'true' ||
        defaultFeatureFlags.SCHEDULES_AND_STATS,
    FEATURE_JAMMERS_2024_SCHEDULE:
        import.meta.env.VITE_FEATURE_JAMMERS_2024_SCHEDULE === 'true' ||
        defaultFeatureFlags.FEATURE_JAMMERS_2024_SCHEDULE,
    FEATURE_RIVERSIDE_2024_SCHEDULE:
        import.meta.env.VITE_RIVERSIDE_2024_SCHEDULE_SHEET_ID === 'true' ||
        defaultFeatureFlags.FEATURE_RIVERSIDE_2024_SCHEDULE,
    FEATURE_JAMMERS_2025_SCHEDULE:
        import.meta.env.VITE_FEATURE_JAMMERS_2025_SCHEDULE === 'true' ||
        defaultFeatureFlags.FEATURE_JAMMERS_2025_SCHEDULE,
};

export type FeatureFlagKeys = keyof typeof featureFlags;
export type FeatureFlags = { [K in FeatureFlagKeys]: boolean };
