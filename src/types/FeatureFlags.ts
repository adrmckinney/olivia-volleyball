export const defaultFeatureFlags = {
    FEATURE_JAMMERS_2025_SCHEDULE: false,
} as const;

export const featureFlags: Record<keyof typeof defaultFeatureFlags, boolean> = {
    FEATURE_JAMMERS_2025_SCHEDULE:
        import.meta.env.VITE_FEATURE_JAMMERS_2025_SCHEDULE === 'true' ||
        defaultFeatureFlags.FEATURE_JAMMERS_2025_SCHEDULE,
};

export type FeatureFlagKeys = keyof typeof featureFlags;
export type FeatureFlags = { [K in FeatureFlagKeys]: boolean };
