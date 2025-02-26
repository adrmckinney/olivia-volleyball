import { configs } from '../../configs';
import { defaultFeatureFlags, featureFlags, FeatureFlags } from '../../types/FeatureFlags';

export const parseFeatureFlagsSheet = (csvText: string): FeatureFlags => {
    // If in dev env, overwrite with local .env variables
    if (configs.env === 'development') {
        return featureFlags;
    }

    // If the csv data is bad, return default values.
    if (!csvText || !csvText.length) {
        return defaultFeatureFlags;
    }

    const rows = csvText.split('\n').filter(row => row.trim() !== '');
    const map = new Map();

    // Get current environment (e.g., 'prod', 'staging')
    const currentEnv = configs.env;

    // Assuming first row contains headers: "Feature Flag, Enabled, Environment"
    rows.slice(1).forEach(row => {
        const [flagName, enabled, environment] = row.split(',').map(col => col.trim());

        let newEnabled = false;
        // Only set the flag if it's for the current environment or for all environments
        // Environments variables must be set in staging and prod.
        if (environment === currentEnv || environment === 'all') {
            if (enabled === 'TRUE') {
                newEnabled = true;
            } else if (enabled === 'FALSE') {
                newEnabled = false;
            }
        }
        map.set(flagName, newEnabled);
    });

    // Merge parsed flags with default flags
    const flags: FeatureFlags = Object.fromEntries(map);
    return { ...defaultFeatureFlags, ...flags };
};
