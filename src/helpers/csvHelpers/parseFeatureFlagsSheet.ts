import { defaultFeatureFlags, featureFlags, FeatureFlags } from '../../types/FeatureFlags';

export const parseFeatureFlagsSheet = (csvText: string): FeatureFlags => {
    // If in dev env, overwrite the env variable in
    // google sheet with a variable in local .env
    if (import.meta.env.DEV) {
        return featureFlags;
    }

    // If for some reason the csv data is bad
    // return default values.
    if (!csvText || !csvText.length) {
        return defaultFeatureFlags;
    }

    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    const map = new Map();

    // First row contains headers
    rows.slice(1).forEach(row => {
        const [flagName, enabled] = row.split(',').map(col => col.trim());
        let newEnabled = false;
        if (typeof enabled === 'boolean') {
            newEnabled = enabled;
        } else {
            switch (enabled) {
                case 'TRUE':
                    newEnabled = true;
                    break;
                case 'FALSE':
                    newEnabled = false;
                    break;
            }
        }

        map.set(flagName, newEnabled);
    });

    const flags: FeatureFlags = Object.fromEntries(map);

    return { ...defaultFeatureFlags, ...flags };
};
