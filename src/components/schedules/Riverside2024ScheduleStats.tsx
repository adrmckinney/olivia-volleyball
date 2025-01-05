import useFetchCSVData from '../../api/FetchCSVData';
import { parseRiversideScheduleSheet } from '../../helpers/csvHelpers/parseRiversideScheduleSheet';
import { sheetUrls } from '../../utils/googleSheetsConfigs';
import ScheduleStatsTableWrapper, { SubFiltersToShow } from './ScheduleStatsTableWrapper';

const Riverside2024ScheduleStats = () => {
    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_RIVERSIDE2024_SCHEDULE_SHEET_ID);
    const { parsedData: scheduleData, loading } = useFetchCSVData({
        url,
        parser: parseRiversideScheduleSheet,
    });

    const scheduleColumnsToShow = {
        date: true,
        opponent: true,
        opponentImage: false,
        homeAway: true,
        gameStatus: true,
        result: true,
        time: false,
        score: true,
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
            settingAssistsPerSet: false,
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
            serviceAcesPerSet: false,
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
            tableTitle="Riverside High School 2024 Schedule and Stats"
            data={scheduleData && Array.isArray(scheduleData) ? scheduleData : []}
            loading={loading}
            subFiltersToShow={subFiltersToShow}
            scheduleColumnsToShow={scheduleColumnsToShow}
            isTournament={false}
        />
    );
};

export default Riverside2024ScheduleStats;
