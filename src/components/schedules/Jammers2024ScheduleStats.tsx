import useFetchCSVData from '../../api/FetchCSVData';
import { parseScheduleSheet } from '../../helpers/csvHelpers/parseScheduleSheet';
import { sheetUrls } from '../../utils/googleSheetsConfigs';
import ScheduleStatsTableWrapper, { SubFiltersToShow } from './ScheduleStatsTableWrapper';

const Jammers2024ScheduleStats = () => {
    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_JAMMERS2024_SCHEDULE_SHEET_ID);
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
            setsPlayed: true,
            settingAssist: true,
            settingError: true,
            settingZero: false,
            settingTotal: true,
            settingAssistPercentage: true,
            settingPercentage: true,
            settingAssistsPerSet: true,
        },
        attack: {
            setsPlayed: false,
            attackKill: false,
            attackError: false,
            attackTotal: false,
            attackZero: false,
            attackKillPercentage: false,
            attackPercentage: false,
            attackKillsPerSet: false,
        },
        serve: {
            setsPlayed: true,
            serviceAce: true,
            serviceError: true,
            serviceZero: false,
            serviceAttempts: true,
            serviceAcePercentage: true,
            servicePercentage: true,
            serviceAcesPerSet: true,
            servicePoints: false,
        },
        block: {
            setsPlayed: false,
            blockSolo: false,
            blockAssist: false,
            blockError: false,
            blockTotal: false,
            blockPercentage: false,
            blocksPerSet: false,
        },
        dig: {
            setsPlayed: true,
            dig3: false,
            dig2: false,
            dig1: false,
            dig0: false,
            digs: false,
            digErrors: true,
            digsTotal: true,
            passingPercentage: true,
            digsPerSet: true,
        },
    };

    return (
        <ScheduleStatsTableWrapper
            tableTitle="Jammers Volleyball Club 2024 Schedule and Stats"
            data={scheduleData}
            loading={loading}
            subFiltersToShow={subFiltersToShow}
            scheduleColumnsToShow={scheduleColumnsToShow}
        />
    );
};

export default Jammers2024ScheduleStats;
