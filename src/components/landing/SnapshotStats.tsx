import useFetchCSVData from '../../api/FetchCSVData';
import { themes } from '../../configs/themes';
import { parsePersonalStats } from '../../helpers/csvHelpers/parsePersonalStats';
import SkeletonText from '../../sharedComponents/Skeletons/SkeletonText';
import { sheetUrls } from '../../utils/googleSheetsConfigs';

const SnapshotStats = () => {
    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_PERSONAL_STATS_SHEET_ID);
    const { parsedData: stats, loading } = useFetchCSVData({ url, parser: parsePersonalStats });

    return (
        <div className="lg:flex lg:flex-auto w-full">
            <dl
                className={[
                    'grid w-full grid-cols-2 items-center justify-between gap-y-10',
                    loading ? ' gap-x-20' : '',
                ].join(' ')}
            >
                {loading
                    ? Array.from({ length: 8 }).map((_, idx) => (
                          <div key={idx} className="flex justify-start items-center h-20 w-full">
                              <SkeletonText numberOfLines={2} classType="common" />
                          </div>
                      ))
                    : Array.isArray(stats) &&
                      stats?.map(stat => (
                          <div
                              key={stat.label}
                              className="flex flex-col-reverse gap-y-1 lg:gap-y-4"
                          >
                              <dt className={[themes.descriptionTitle].join(' ')}>{stat.label}</dt>
                              <dd className={[themes.descriptionData].join(' ')}>{stat.value}</dd>
                          </div>
                      ))}
            </dl>
        </div>
    );
};

export default SnapshotStats;
