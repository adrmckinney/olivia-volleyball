import { toCamelCase } from '../stringHelpers';
type HighSchoolMatchKeys =
    | 'key'
    | 'date'
    | 'opponent'
    | 'opponentImage'
    | 'homeAway'
    | 'gameStatus'
    | 'result'
    | 'time'
    | 'score'
    | 'matchStatus';
type HighSchoolStatKeys =
    | 'key'
    | 'opponent'
    | 'setsPlayed'
    | 'serviceAce'
    | 'serviceZero'
    | 'serviceError'
    | 'serviceAttempts'
    | 'serviceAcePercentage'
    | 'servicePercentage'
    | 'serviceAcesPerSet'
    | 'servicePoints'
    | 'attackKill'
    | 'attackZero'
    | 'attackError'
    | 'attackTotal'
    | 'attackKillPercentage'
    | 'attackPercentage'
    | 'attackKillsPerSet'
    | 'blockSolo'
    | 'blockAssist'
    | 'blockError'
    | 'blockTotal'
    | 'blockPercentage'
    | 'blockPerSet'
    | 'settingAssist'
    | 'settingZero'
    | 'settingError'
    | 'settingTotal'
    | 'settingAssistPercentage'
    | 'settingPercentage'
    | 'settingAssistsPerSet'
    | 'dig3'
    | 'dig2'
    | 'dig1'
    | 'dig0'
    | 'digs'
    | 'digErrors'
    | 'digsTotal'
    | 'passingPercentage'
    | 'digsPerSet'
    | 'statsStatus';

export type Match = {
    key: string;
    date: string;
    opponent: string;
    opponentImage: string;
    homeAway: string;
    gameStatus: string;
    result: string;
    time: string;
    score: string;
    matchStatus: string;
};

export type Stat = {
    key: string;
    opponentName: string;
    setsPlayed: number;
    serviceAce: number;
    serviceZero: number;
    serviceError: number;
    serviceAttempts: number;
    serviceAcePercentage: string;
    servicePercentage: string;
    serviceAcesPerSet: number;
    servicePoints: number;
    attackKill: number;
    attackZero: number;
    attackError: number;
    attackTotal: number;
    attackKillPercentage: string;
    attackPercentage: string;
    attackKillsPerSet: number;
    blockSolo: number;
    blockAssist: number;
    blockError: number;
    blockTotal: number;
    blockPercentage: string;
    blockPerSet: number;
    settingAssist: number;
    settingZero: number;
    settingError: number;
    settingTotal: number;
    settingAssistPercentage: string;
    settingPercentage: string;
    settingAssistsPerSet: number;
    dig3: number;
    dig2: number;
    dig1: number;
    dig0: number;
    digs: number;
    digErrors: number;
    digsTotal: number;
    passingPercentage: string;
    digsPerSet: number;
    statsStatus: string;
};

export interface EventData {
    key: string;
    matches: Match[];
    stats?: Stat[];
}

const initialMatchValues: Record<HighSchoolMatchKeys, string | number> = {
    key: '',
    date: '',
    opponent: '',
    opponentImage: '',
    homeAway: '',
    gameStatus: '',
    result: '',
    time: '',
    score: '',
    matchStatus: '',
};

const initialStatValues: Record<HighSchoolStatKeys, string | number> = {
    key: '',
    opponent: '',
    setsPlayed: 0,
    serviceAce: 0,
    serviceZero: 0,
    serviceError: 0,
    serviceAttempts: 0,
    serviceAcePercentage: '',
    servicePercentage: '',
    serviceAcesPerSet: 0,
    servicePoints: 0,
    attackKill: 0,
    attackZero: 0,
    attackError: 0,
    attackTotal: 0,
    attackKillPercentage: '',
    attackPercentage: '',
    attackKillsPerSet: 0,
    blockSolo: 0,
    blockAssist: 0,
    blockError: 0,
    blockTotal: 0,
    blockPercentage: '',
    blockPerSet: 0,
    settingAssist: 0,
    settingZero: 0,
    settingError: 0,
    settingTotal: 0,
    settingAssistPercentage: '',
    settingPercentage: '',
    settingAssistsPerSet: 0,
    dig3: 0,
    dig2: 0,
    dig1: 0,
    dig0: 0,
    digs: 0,
    digErrors: 0,
    digsTotal: 0,
    passingPercentage: '',
    digsPerSet: 0,
    statsStatus: '',
};

const parseCsvRow = (row: string): string[] => {
    const regex = /(?:,|\n|^)(?:"([^"]*)"|([^",]*))(?=,|\n|$)/g;
    const matches = [];
    let match;

    while ((match = regex.exec(row)) !== null) {
        matches.push(match[1] || match[2] || '');
    }

    return matches.map(item => item.trim());
};

export const parseRiversideScheduleSheet = (csvText: string): EventData[] => {
    const rows: string[] = csvText.split('\n').filter(Boolean);
    const eventData: EventData[] = [];

    // Map headers to indices
    const headerIndexes = new Map<number, HighSchoolMatchKeys | HighSchoolStatKeys>();
    parseCsvRow(rows[0]).forEach((header, index) => {
        const camelCaseHeader = toCamelCase(header);
        const finalHeader = camelCaseHeader === 'opponentName' ? 'opponent' : camelCaseHeader;
        headerIndexes.set(index, finalHeader as HighSchoolMatchKeys | HighSchoolStatKeys);
    });

    // Process each data row
    rows.slice(1).forEach(row => {
        // Create fresh objects for each row
        const rowMatchObject = JSON.parse(JSON.stringify(initialMatchValues));
        const rowStatObject = JSON.parse(JSON.stringify(initialStatValues));

        const rowData = parseCsvRow(row);
        let rowKey = '';

        // Map data to correct properties
        rowData.forEach((item, index) => {
            const header = headerIndexes.get(index) || 'key';

            if (header === 'key') {
                rowKey = item;
            }

            if (Object.keys(initialMatchValues).includes(header)) {
                rowMatchObject[header] = header === 'matchStatus' ? item.toLowerCase() : item;
            }

            if (Object.keys(initialStatValues).includes(header)) {
                rowStatObject[header] = header === 'statsStatus' ? item.toLowerCase() : item;
            }
        });

        // Create event data object with correct key
        const eventDataObject = {
            key: rowKey,
            matches: [rowMatchObject as Match],
            stats: [rowStatObject as Stat],
        };

        eventData.push(eventDataObject);
    });

    return eventData;
};
