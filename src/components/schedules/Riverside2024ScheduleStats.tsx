import useFetchCSVData from '../../api/FetchCSVData';
import { configs } from '../../configs';
import { parseRiversideScheduleSheet } from '../../helpers/csvHelpers/parseRiversideScheduleSheet';
import { SubFiltersToShow } from '../../types/ScheduleStatTableTypes';
import { sheetUrls } from '../../utils/googleSheetsConfigs';
import ScheduleStatsTableWrapper from './ScheduleStatsTableWrapper';

const Riverside2024ScheduleStats = () => {
    const url: string = sheetUrls.main
        .replace('{documentId}', configs.sheets.riverside2024Schedule.documentId)
        .replace('{sheetId}', configs.sheets.riverside2024Schedule.sheetId);
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

    const subFiltersToShow: SubFiltersToShow = {
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
        serveReceive: {
            setsPlayed: false,
            receptions: false,
            receptionError: false,
            receptionsPerSet: false,
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
