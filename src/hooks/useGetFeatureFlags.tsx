import useFetchCSVData from '../api/FetchCSVData';
import { FeatureFlags, parseFeatureFlagsSheet } from '../helpers/csvHelpers/parseFeatureFlagsSheet';
import { sheetUrls } from '../utils/googleSheetsConfigs';

const useGetFeatureFlags = (): FeatureFlags | undefined => {
    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_FEATURE_FLAGS_SHEET_ID);

    const { parsedData: featureFlags } = useFetchCSVData({ url, parser: parseFeatureFlagsSheet });

    if (featureFlags && !Array.isArray(featureFlags)) {
        return featureFlags;
    }
};

export default useGetFeatureFlags;
