import useFetchCSVData from '../../api/FetchCSVData';
import { parseScheduleSheet } from '../../helpers/csvHelpers/parseScheduleSheet';
import { SubFiltersToShow } from '../../types/ScheduleStatTableTypes';
import { sheetUrls } from '../../utils/googleSheetsConfigs';
import ScheduleStatsTableWrapper from './ScheduleStatsTableWrapper';

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
        time: true,
        result: true,
        score: true,
        scoreDetails: false,
    };

    const subFiltersToShow: SubFiltersToShow = {
        set: {
            setsPlayed: true,
            settingAssist: true,
            settingError: true,
            settingZero: false,
            settingTotal: true,
            settingAssistPercentage: true,
            settingAssistsPerSet: true,
            settingPercentage: true,
        },
        attack: {
            setsPlayed: true,
            attackKill: true,
            attackError: true,
            attackTotal: true,
            attackZero: false,
            attackKillPercentage: true,
            attackKillsPerSet: true,
            attackPercentage: true,
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
            blockSolo: true,
            blockAssist: true,
            blockError: true,
            blockTotal: true,
            blockPercentage: true,
            blocksPerSet: false,
        },
        dig: {
            setsPlayed: true,
            dig3: false,
            dig2: false,
            dig1: false,
            dig0: false,
            digs: true,
            digErrors: true,
            digsTotal: true,
            passingPercentage: true,
            digsPerSet: true,
        },
        serveReceive: {
            setsPlayed: false,
            receptions: false,
            receptionError: false,
            receptionsPerSet: false,
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
