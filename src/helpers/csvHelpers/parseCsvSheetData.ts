const initialMatchValues: Match = {
    date: '',
    opponent: '',
    playingTime: {
        playingTime: '',
        matchDuration: '',
        percentagePlayed: '',
    },
    serves: {
        aces: 0,
        zeroServe: 0,
        errors: 0,
        total: 0,
        acePercentage: '',
        servePercentage: '',
    },
    attacks: {
        kills: 0,
        zeroAttacks: 0,
        errors: 0,
        total: 0,
        killPercentage: '',
        attackPercentage: '',
    },
    serveReceive: {
        three: 0,
        two: 0,
        one: 0,
        errors: 0,
        total: 0,
        srPercentage: '',
    },
    blocks: {
        solo: 0,
        assist: 0,
        error: 0,
        total: 0,
    },
    setting: {
        assists: 0,
        zeroAssists: 0,
        error: 0,
        total: 0,
        assistPercentage: '',
        settingPercentage: '',
    },
    digs: {
        three: 0,
        two: 0,
        one: 0,
        zero: 0,
        digsTotal: 0,
        passingPercentage: '',
    },
};

const initialDetails: Details = {
    venue: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    tournamentWins: 0,
    tournamentLoses: 0,
    tournamentWinLossPercentage: '',
    tournamentPlayPercentage: '',
    avgTournamentSettingPercentage: '',
    avgTournamentSettingErrors: '',
    totalTournamentSettingErrors: 0,
    avgTournamentAssistPercentage: '',
    avgTournamentServePercentage: '',
    avgTournamentServeErrors: '',
    totalTournamentServeErrors: 0,
    avgTournamentAcePercentage: '',
    avgTournamentAttackPercentage: '',
    avgTournamentKillPercentage: '',
};

const initialJammersDataValues: SeasonData[] = [
    {
        ...initialDetails,
        matches: [initialMatchValues],
    },
];

type DetailsSubHeaders =
    | 'Venue'
    | 'City'
    | 'State'
    | 'Start Date'
    | 'End Date'
    | 'Tournament Wins'
    | 'Tournament Loses'
    | 'Tournament Win/Loss %'
    | 'Tournament Play %'
    | 'AVG Tournament Setting %'
    | 'AVG Tournament Setting Errors'
    | 'Total Tournament Setting Errors'
    | 'AVG Tournament Assist %'
    | 'AVG Tournament Serve %'
    | 'AVG Tournament Serve Errors'
    | 'Total Tournament Serve Errors'
    | 'AVG Tournament Ace %'
    | 'AVG Tournament Attack %'
    | 'AVG Tournament Kill %';

type MatchSubHeaders = 'Date' | 'Opponent';
type PlayingTimeSubHeaders = 'Playing Time (mins)' | 'Match Duration (mins)' | '% Played';
type ServeSubHeaders =
    | 'Serve Ace'
    | 'Serve Zero'
    | 'Serve Error'
    | 'Serve Total'
    | 'Serve Ace %'
    | 'Serve %';
type AttacksSubHeaders =
    | 'Attack Kill'
    | 'Attack Zero'
    | 'Attack Error'
    | 'Attack Total'
    | 'Attack Kill %'
    | 'Attack %';
type ServeReceiveSubHeaders = 'SR 3' | 'SR 2' | 'SR 1' | 'SR 0' | 'SR Total' | 'SR %';
type BlocksSubHeaders = 'Block Solo' | 'Block Assist' | 'Block Error' | 'Block Total';
type SettingSubHeaders =
    | 'Setting Assist'
    | 'Setting Zero'
    | 'Setting Error'
    | 'Setting Total'
    | 'Setting Assist %'
    | 'Setting %';

type DigsSubHeaders = 'Dig 3' | 'Dig 2' | 'Dig 1' | 'Dig 0' | 'Digs Total' | 'Passing %';

type SubHeaders =
    | DetailsSubHeaders
    | MatchSubHeaders
    | PlayingTimeSubHeaders
    | ServeSubHeaders
    | AttacksSubHeaders
    | ServeReceiveSubHeaders
    | BlocksSubHeaders
    | SettingSubHeaders
    | DigsSubHeaders
    | 'NEW_MATCH';

export const parseCsvSheetData = (csvText: string): SeasonData[] => {
    const rows: string[] = csvText.split(/\r?\n/); // Split CSV text into rows, handling '\r' characters
    const filteredRows = rows.filter(row => row.split(',')[0].length);

    console.log('filteredRows', filteredRows);

    const venueIndicies = findTargetIndices(filteredRows, 'Venue');
    console.log('venueIndicies', venueIndicies);

    const indices: number[] = findTargetIndicesOld(filteredRows, 'NEW_MATCH,');
    console.log('indices for matches', indices);

    const indicesTest: number[] = findTargetIndices(filteredRows, 'Date');
    console.log('indicesTest for matches', indicesTest);

    // Create an array of arrays holding each match data
    const matchStringData: string[][] = createArraysForGroups(filteredRows, indices); // need to get the right array of arrays without subtracting the one from the indicies because no longer using artificial breaker 'NEW_MATCH

    const matchDetails = parseMatchDetails(rows, indices[0]);

    const matchesDataObjects: Match[] = parseMatchesData(matchStringData);

    return [{ ...matchDetails, matches: matchesDataObjects }];
};

const createArraysForGroups = (rows: string[], targetIndices: number[]): string[][] => {
    const matchStringData: string[][] = [];
    targetIndices.forEach((index, loopIdx) => {
        const startIdx = index + 1;
        const endIdx = !(targetIndices[loopIdx + 1] - 1)
            ? rows.length - 1
            : targetIndices[loopIdx + 1] - 1;

        let rowData: string[] = [];
        for (let i = startIdx; i <= endIdx; i++) {
            if (rows[i].split(',')[0].length) rowData.push(rows[i]);
        }

        matchStringData.push(rowData);
    });

    return matchStringData;
};

const findTargetIndices = (rows: string[], targetIndexKey: string): number[] => {
    const targetIndices: number[] = [];
    const rowKeys = rows.map(row => row.split(',')[0]);
    // console.log('rowKeys', rowKeys);

    let idx = rowKeys.indexOf(targetIndexKey);
    if (targetIndexKey === 'Venue') console.log('venue idx', idx);

    while (idx !== -1) {
        targetIndices.push(idx);
        idx = rowKeys.indexOf(targetIndexKey, idx + 1);
    }

    return targetIndices;
};

const findTargetIndicesOld = (rows: string[], targetIndexKey: string): number[] => {
    const targetIndices: number[] = [];

    let idx = rows.indexOf(targetIndexKey);
    if (targetIndexKey === 'Venue') console.log('venue idx', idx);

    while (idx !== -1) {
        targetIndices.push(idx);
        idx = rows.indexOf(targetIndexKey, idx + 1);
    }

    return targetIndices;
};

const parseMatchDetails = (rows: string[], lastDetailIndex: number) => {
    const data = initialDetails;
    for (let i = 0; i < lastDetailIndex; i++) {
        const row = rows[i].split(',');

        // Skip empty rows
        if (row[0] === '') continue;

        // Extracting values from each row
        const key: SubHeaders = row[0] as SubHeaders;
        const value: string = row[1];

        switch (key) {
            case 'Venue':
                data.venue = value;
                break;
            case 'City':
                data.city = value;
                break;
            case 'State':
                data.state = value;
                break;
            case 'Start Date':
                data.startDate = value;
                break;
            case 'End Date':
                data.endDate = value;
                break;
            case 'Tournament Wins':
                data.tournamentWins = parseInt(value, 10);
                break;
            case 'Tournament Loses':
                data.tournamentLoses = parseInt(value, 10);
                break;
            case 'Tournament Win/Loss %':
                data.tournamentWinLossPercentage = value;
                break;
            case 'Tournament Play %':
                data.tournamentPlayPercentage = value;
                break;
            case 'AVG Tournament Setting %':
                data.avgTournamentSettingPercentage = value;
                break;
            case 'AVG Tournament Setting Errors':
                data.avgTournamentSettingErrors = value;
                break;
            case 'Total Tournament Setting Errors':
                data.totalTournamentSettingErrors = parseInt(value, 10);
                break;
            case 'AVG Tournament Assist %':
                data.avgTournamentAssistPercentage = value;
                break;
            case 'AVG Tournament Serve %':
                data.avgTournamentServePercentage = value;
                break;
            case 'Total Tournament Serve Errors':
                data.totalTournamentServeErrors = parseInt(value, 10);
                break;
            case 'AVG Tournament Serve Errors':
                data.avgTournamentServeErrors = value;
                break;
            case 'AVG Tournament Ace %':
                data.avgTournamentAcePercentage = value;
                break;
            case 'AVG Tournament Attack %':
                data.avgTournamentAttackPercentage = value;
                break;
            case 'AVG Tournament Kill %':
                data.avgTournamentKillPercentage = value;
                break;
            default:
                break;
        }
    }

    return data;
};

const parseMatchesData = (matchStringData: string[][]) => {
    return matchStringData.map(matchArray => {
        const matchObj: Match = { ...initialMatchValues };

        matchArray.forEach(item => {
            const [key, value] = item.split(',');

            switch (key.trim()) {
                case 'Date':
                    matchObj.date = value;
                    break;
                case 'Opponent':
                    matchObj.opponent = value;
                    break;
                case 'Playing Time (mins)':
                    const [playingTime, matchDuration] = value.split(':');
                    matchObj.playingTime.playingTime = playingTime;
                    matchObj.playingTime.matchDuration = matchDuration;
                    break;
                case 'Match Duration (mins)':
                    matchObj.playingTime.matchDuration = value;
                    break;
                case '% Played':
                    matchObj.playingTime.percentagePlayed = value;
                    break;
                case 'Serve Ace':
                    matchObj.serves.aces = parseInt(value, 10);
                    break;
                case 'Serve Zero':
                    matchObj.serves.zeroServe = parseInt(value, 10);
                    break;
                case 'Serve Error':
                    matchObj.serves.errors = parseInt(value, 10);
                    break;
                case 'Serve Total':
                    matchObj.serves.total = parseInt(value, 10);
                    break;
                case 'Serve Ace %':
                    matchObj.serves.acePercentage = value;
                    break;
                case 'Serve %':
                    matchObj.serves.servePercentage = value;
                    break;
                case 'Attack Kill':
                    matchObj.attacks.kills = parseInt(value, 10);
                    break;
                case 'Attack Zero':
                    matchObj.attacks.zeroAttacks = parseInt(value, 10);
                    break;
                case 'Attack Error':
                    matchObj.attacks.errors = parseInt(value, 10);
                    break;
                case 'Attack Total':
                    matchObj.attacks.total = parseInt(value, 10);
                    break;
                case 'Attack Kill %':
                    matchObj.attacks.killPercentage = value;
                    break;
                case 'Attack %':
                    matchObj.attacks.attackPercentage = value;
                    break;
                case 'SR 3':
                    matchObj.serveReceive.three = parseInt(value, 10);
                    break;
                case 'SR 2':
                    matchObj.serveReceive.two = parseInt(value, 10);
                    break;
                case 'SR 1':
                    matchObj.serveReceive.one = parseInt(value, 10);
                    break;
                case 'SR  0':
                    matchObj.serveReceive.errors = parseInt(value, 10);
                    break;
                case 'SR Total':
                    matchObj.serveReceive.total = parseInt(value, 10);
                    break;
                case 'SR %':
                    matchObj.serveReceive.srPercentage = value;
                    break;
                case 'Block Solo':
                    matchObj.blocks.solo = parseInt(value, 10);
                    break;
                case 'Block Assist':
                    matchObj.blocks.assist = parseInt(value, 10);
                    break;
                case 'Block Error':
                    matchObj.blocks.error = parseInt(value, 10);
                    break;
                case 'Block Total':
                    matchObj.blocks.total = parseInt(value, 10);
                    break;
                case 'Setting Assist':
                    matchObj.setting.assists = parseInt(value, 10);
                    break;
                case 'Setting Zero':
                    matchObj.setting.zeroAssists = parseInt(value, 10);
                    break;
                case 'Setting Error':
                    matchObj.setting.error = parseInt(value, 10);
                    break;
                case 'Setting Total':
                    matchObj.setting.total = parseInt(value, 10);
                    break;
                case 'Setting Assist %':
                    matchObj.setting.assistPercentage = value;
                    break;
                case 'Setting %':
                    matchObj.setting.settingPercentage = value;
                    break;
                case 'Dig 3':
                    matchObj.digs.three = parseInt(value, 10);
                    break;
                case 'Dig 2':
                    matchObj.digs.two = parseInt(value, 10);
                    break;
                case 'Dig 1':
                    matchObj.digs.one = parseInt(value, 10);
                    break;
                case 'Dig 0':
                    matchObj.digs.zero = parseInt(value, 10);
                    break;
                case 'Digs Total':
                    matchObj.digs.digsTotal = parseInt(value, 10);
                    break;
                case 'Passing %':
                    matchObj.digs.passingPercentage = value;
                    break;
                default:
                    break;
            }
        });
        return matchObj;
    });
};

export type SeasonData = {
    matches: Match[];
} & Details;

type Details = {
    venue: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
    tournamentWins: number;
    tournamentLoses: number;
    tournamentWinLossPercentage: string;
    tournamentPlayPercentage: string;
    avgTournamentSettingPercentage: string;
    avgTournamentSettingErrors: string;
    totalTournamentSettingErrors: number;
    avgTournamentAssistPercentage: string;
    avgTournamentServePercentage: string;
    avgTournamentServeErrors: string;
    totalTournamentServeErrors: number;
    avgTournamentAcePercentage: string;
    avgTournamentAttackPercentage: string;
    avgTournamentKillPercentage: string;
};

type Match = {
    date: string;
    opponent: string;
    playingTime: PlayingTime;
    serves: Serves;
    attacks: Attacks;
    serveReceive: ServeReceive;
    blocks: Blocks;
    setting: Setting;
    digs: Digs;
};

type PlayingTime = {
    playingTime: string;
    matchDuration: string;
    percentagePlayed: string;
};

type Serves = {
    aces: number;
    zeroServe: number;
    errors: number;
    total: number;
    acePercentage: string;
    servePercentage: string;
};
type Attacks = {
    kills: number;
    zeroAttacks: number;
    errors: number;
    total: number;
    killPercentage: string;
    attackPercentage: string;
};

type ServeReceive = {
    three: number;
    two: number;
    one: number;
    errors: number;
    total: number;
    srPercentage: string;
};

type Blocks = {
    solo: number;
    assist: number;
    error: number;
    total: number;
};

type Setting = {
    assists: number;
    zeroAssists: number;
    error: number;
    total: number;
    assistPercentage: string;
    settingPercentage: string;
};

type Digs = {
    three: number;
    two: number;
    one: number;
    zero: number;
    digsTotal: number;
    passingPercentage: string;
};
