import { FeatureFlagKeys } from '../../types/FeatureFlags';

export type FeatureFlags = Record<FeatureFlagKeys, boolean>;

export const parseFeatureFlagsSheet = (csvText: string): FeatureFlags => {
    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    // const featureFlags: FeatureFlags = {};
    const map = new Map();
    // Assuming first row contains headers: "Feature Flag, Enabled"
    rows.slice(1).forEach(row => {
        const [flagName, enabled] = row.split(',').map(col => col.trim());
        let newEnabled = false;

        switch (enabled) {
            case 'TRUE':
                newEnabled = true;
                break;
            case 'FALSE':
                newEnabled = false;
                break;
        }

        map.set(flagName, newEnabled);
    });
    const featureFlags = Object.fromEntries(map);
    return featureFlags;
};
