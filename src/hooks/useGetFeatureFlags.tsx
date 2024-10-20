import useFetchCSVData from '../api/FetchCSVData';
import { parseFeatureFlagsSheet } from '../helpers/csvHelpers/parseFeatureFlagsSheet';
import { defaultFeatureFlags, FeatureFlags } from '../types/FeatureFlags';
import { sheetUrls } from '../utils/googleSheetsConfigs';

const useGetFeatureFlags = (): FeatureFlags => {
    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_FEATURE_FLAGS_SHEET_ID);

    const { parsedData: featureFlags } = useFetchCSVData({ url, parser: parseFeatureFlagsSheet });

    if (!featureFlags || Array.isArray(featureFlags)) {
        return defaultFeatureFlags;
    }

    return featureFlags;
};

export default useGetFeatureFlags;
