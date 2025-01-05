import useFetchCSVData from '../../api/FetchCSVData';
import { parseScheduleSheet } from '../../helpers/csvHelpers/parseScheduleSheet';
import { sheetUrls } from '../../utils/googleSheetsConfigs';
import ScheduleStatsTableWrapper, { SubFiltersToShow } from './ScheduleStatsTableWrapper';

const Jammers2025ScheduleStats = () => {
    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_JAMMERS2025_SCHEDULE_SHEET_ID);
    const { parsedData: scheduleData, loading } = useFetchCSVData({
        url,
        parser: parseScheduleSheet,
    });

    const scheduleColumnsToShow = {
        opponent: true,
        date: true,
        time: false,
        result: true,
        score: true,
        scoreDetails: false,
    };

    const subFiltersToShow: Partial<SubFiltersToShow> = {
        set: {
            setsPlayed: false,
            settingAssist: true,
            settingError: true,
            settingZero: false,
            settingTotal: true,
            settingAssistPercentage: true,
            settingPercentage: true,
            settingAssistsPerSet: false,
        },
        attack: {
            setsPlayed: false,
            attackKill: true,
            attackError: true,
            attackTotal: true,
            attackZero: false,
            attackKillPercentage: true,
            attackPercentage: true,
            attackKillsPerSet: false,
        },
        serve: {
            setsPlayed: false,
            serviceAce: true,
            serviceError: true,
            serviceZero: false,
            serviceAttempts: true,
            serviceAcePercentage: true,
            servicePercentage: true,
            serviceAcesPerSet: false,
            servicePoints: false,
        },
        block: {
            setsPlayed: false,
            blockSolo: true,
            blockAssist: true,
            blockError: true,
            blockTotal: true,
            blockPercentage: true,
            blocksPerSet: false,
        },
        dig: {
            setsPlayed: false,
            dig3: false,
            dig2: false,
            dig1: false,
            dig0: false,
            digs: false,
            digErrors: false,
            digsTotal: false,
            passingPercentage: false,
            digsPerSet: false,
        },
    };

    return (
        <ScheduleStatsTableWrapper
            tableTitle="Jammers Volleyball Club 2025 Schedule and Stats"
            data={scheduleData}
            loading={loading}
            subFiltersToShow={subFiltersToShow}
            scheduleColumnsToShow={scheduleColumnsToShow}
        />
    );
};

export default Jammers2025ScheduleStats;
