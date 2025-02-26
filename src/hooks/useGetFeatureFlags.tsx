import useFetchCSVData from '../api/FetchCSVData';
import { configs } from '../configs';
import { parseFeatureFlagsSheet } from '../helpers/csvHelpers/parseFeatureFlagsSheet';
import { defaultFeatureFlags, FeatureFlags } from '../types/FeatureFlags';
import { sheetUrls } from '../utils/googleSheetsConfigs';

const useGetFeatureFlags = (): FeatureFlags => {
    const url: string = sheetUrls.main
        .replace('{documentId}', configs.sheets.featureFlags.documentId)
        .replace('{sheetId}', configs.sheets.featureFlags.sheetId);

    const { parsedData: featureFlags } = useFetchCSVData({ url, parser: parseFeatureFlagsSheet });

    if (!featureFlags || Array.isArray(featureFlags)) {
        return defaultFeatureFlags;
    }

    return featureFlags;
};

export default useGetFeatureFlags;
