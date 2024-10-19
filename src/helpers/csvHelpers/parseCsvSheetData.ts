import {
    Attacks,
    Blocks,
    Details,
    Digs,
    Match,
    PlayingTime,
    SeasonData,
    ServeReceive,
    Serves,
    Setting,
    SubHeaders,
    VenueDetails,
} from '../../types/VenueMatchTypes';

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

const initialVenueDetails: VenueDetails = {
    venue: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
};

const initialDetails: Details = {
    venueDetails: initialVenueDetails,
    venueTournamentDetails: {
        tournamentWins: 0,
        tournamentLoses: 0,
        tournamentWinLossPercentage: '',
        tournamentPlayPercentage: '',
    },
    venueServeStats: {
        avgTournamentServePercentage: '',
        avgTournamentServeErrors: '',
        totalTournamentServeErrors: 0,
        avgTournamentAcePercentage: '',
    },
    venueSettingStats: {
        avgTournamentSettingPercentage: '',
        avgTournamentSettingErrors: '',
        totalTournamentSettingErrors: 0,
        avgTournamentAssistPercentage: '',
    },
    venueAttackStats: {
        avgTournamentAttackPercentage: '',
        avgTournamentKillPercentage: '',
    },
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const initialJammersDataValues: SeasonData[] = [
    {
        ...initialDetails,
        matches: [initialMatchValues],
    },
];

export const parseCsvSheetData = (csvText: string): SeasonData[] => {
    const rows: string[] = csvText.split(/\r?\n/); // Split CSV text into rows, handling '\r' characters
    const filteredRows = rows.filter(row => row.split(',')[0].length);
    const venueIndicies = findTargetIndices(filteredRows, 'Venue');
    const venueGroups = createArraysForGroups(filteredRows, venueIndicies);

    const completeData: SeasonData[] = venueGroups.map((groupOfRows, idx) => {
        const matchIndices: number[] = findTargetIndices(groupOfRows, 'Date');
        const venueDetails = parseVenueData(groupOfRows, matchIndices[0]);
        const matchStringData: string[][] = createArraysForGroups(groupOfRows, matchIndices);
        const venueData: Match[] = prepareVenueData(matchStringData);
        return { ...venueDetails, matches: venueData };
    });

    return completeData;
};

const prepareVenueData = (targetStringData: string[][]) => {
    const matchesDataObjects: Match[] = [];

    for (const matchArray of targetStringData) {
        const matchCopy = { ...initialMatchValues };
        const playingTimeCopy = { ...initialMatchValues.playingTime };
        const serveCopy = { ...initialMatchValues.serves };
        const attackCopy = { ...initialMatchValues.attacks };
        const serveReceiveCopy = { ...initialMatchValues.serveReceive };
        const blocksCopy = { ...initialMatchValues.blocks };
        const settingCopy = { ...initialMatchValues.setting };
        const digsCopy = { ...initialMatchValues.digs };

        const matchesData = parseMatchesData(matchArray, matchCopy);
        const playinTimeData = parsePlayingTimeData(matchArray, playingTimeCopy);
        const serveData = parseServeData(matchArray, serveCopy);
        const attackData = parseAttackData(matchArray, attackCopy);
        const serveReceiveData = parseServeReceiveData(matchArray, serveReceiveCopy);
        const blocksData = parseBlocksData(matchArray, blocksCopy);
        const settingData = parseSettingData(matchArray, settingCopy);
        const digsData = parseDigsData(matchArray, digsCopy);

        const combinedData: Match = {
            ...matchesData,
            playingTime: playinTimeData,
            serves: serveData,
            attacks: attackData,
            serveReceive: serveReceiveData,
            blocks: blocksData,
            setting: settingData,
            digs: digsData,
        };

        matchesDataObjects.push(combinedData);
    }

    return matchesDataObjects;
};

const createArraysForGroups = (rows: string[], targetIndices: number[]): string[][] => {
    const matchStringData: string[][] = [];
    targetIndices.forEach((index, loopIdx) => {
        const startIdx = index;
        const endIdx = getEndIndex(rows, targetIndices, loopIdx);

        const rowData: string[] = [];
        for (let i = startIdx; i <= endIdx; i++) {
            if (rows[i].split(',')[0].length) rowData.push(rows[i]);
        }

        matchStringData.push(rowData);
    });

    return matchStringData;
};

const getEndIndex = (rows: string[], targetIndices: number[], loopIndex: number) => {
    return !(targetIndices[loopIndex + 1] - 1) ? rows.length - 1 : targetIndices[loopIndex + 1] - 1;
};

const findTargetIndices = (rows: string[], targetIndexKey: string): number[] => {
    const targetIndices: number[] = [];
    const rowKeys = rows.map(row => row.split(',')[0]);
    // console.log('rowKeys', rowKeys);

    let idx = rowKeys.indexOf(targetIndexKey);
    // if (targetIndexKey === 'Venue') console.log('venue idx', idx);

    while (idx !== -1) {
        targetIndices.push(idx);
        idx = rowKeys.indexOf(targetIndexKey, idx + 1);
    }

    return targetIndices;
};

const parseVenueData = (rows: string[], lastDetailIndex: number): Details => {
    const venueDetailsCopy = { ...initialDetails.venueDetails };
    const venueTournamentCopy = { ...initialDetails.venueTournamentDetails };
    const venueSettingCopy = { ...initialDetails.venueSettingStats };
    const venueServeCopy = { ...initialDetails.venueServeStats };
    const venueAttackCopy = { ...initialDetails.venueAttackStats };

    for (let i = 0; i < lastDetailIndex; i++) {
        const row = rows[i].split(',');

        // Skip empty rows
        if (row[0] === '') continue;

        // Extracting values from each row
        const key: SubHeaders = row[0] as SubHeaders;
        const value: string = row[1];

        switch (key) {
            case 'Venue':
                venueDetailsCopy.venue = value;
                break;
            case 'City':
                venueDetailsCopy.city = value;
                break;
            case 'State':
                venueDetailsCopy.state = value;
                break;
            case 'Start Date':
                venueDetailsCopy.startDate = value;
                break;
            case 'End Date':
                venueDetailsCopy.endDate = value;
                break;
            case 'Tournament Wins':
                venueTournamentCopy.tournamentWins = parseInt(value, 10);
                break;
            case 'Tournament Loses':
                venueTournamentCopy.tournamentLoses = parseInt(value, 10);
                break;
            case 'Tournament Win/Loss %':
                venueTournamentCopy.tournamentWinLossPercentage = value;
                break;
            case 'Tournament Play %':
                venueTournamentCopy.tournamentPlayPercentage = value;
                break;
            case 'AVG Tournament Setting %':
                venueSettingCopy.avgTournamentSettingPercentage = value;
                break;
            case 'AVG Tournament Setting Errors':
                venueSettingCopy.avgTournamentSettingErrors = value;
                break;
            case 'Total Tournament Setting Errors':
                venueSettingCopy.totalTournamentSettingErrors = parseInt(value, 10);
                break;
            case 'AVG Tournament Assist %':
                venueSettingCopy.avgTournamentAssistPercentage = value;
                break;
            case 'AVG Tournament Serve %':
                venueServeCopy.avgTournamentServePercentage = value;
                break;
            case 'Total Tournament Serve Errors':
                venueServeCopy.totalTournamentServeErrors = parseInt(value, 10);
                break;
            case 'AVG Tournament Serve Errors':
                venueServeCopy.avgTournamentServeErrors = value;
                break;
            case 'AVG Tournament Ace %':
                venueServeCopy.avgTournamentAcePercentage = value;
                break;
            case 'AVG Tournament Attack %':
                venueAttackCopy.avgTournamentAttackPercentage = value;
                break;
            case 'AVG Tournament Kill %':
                venueAttackCopy.avgTournamentKillPercentage = value;
                break;
            default:
                break;
        }
    }

    return {
        venueDetails: venueDetailsCopy,
        venueTournamentDetails: venueTournamentCopy,
        venueSettingStats: venueSettingCopy,
        venueServeStats: venueServeCopy,
        venueAttackStats: venueAttackCopy,
    };
};

const parseServeData = (matchArray: string[], objectCopy: Serves) => {
    matchArray.forEach(item => {
        const [key, value] = item.split(',');
        switch (key.trim()) {
            case 'Serve Ace':
                objectCopy.aces = parseInt(value, 10);
                break;
            case 'Serve Zero':
                objectCopy.zeroServe = parseInt(value, 10);
                break;
            case 'Serve Error':
                objectCopy.errors = parseInt(value, 10);
                break;
            case 'Serve Total':
                objectCopy.total = parseInt(value, 10);
                break;
            case 'Serve Ace %':
                objectCopy.acePercentage = value;
                break;
            case 'Serve %':
                objectCopy.servePercentage = value;
                break;
        }
    });
    return objectCopy;
};

const parseAttackData = (matchArray: string[], objectCopy: Attacks) => {
    matchArray.forEach(item => {
        const [key, value] = item.split(',');
        switch (key.trim()) {
            case 'Attack Kill':
                objectCopy.kills = parseInt(value, 10);
                break;
            case 'Attack Zero':
                objectCopy.zeroAttacks = parseInt(value, 10);
                break;
            case 'Attack Error':
                objectCopy.errors = parseInt(value, 10);
                break;
            case 'Attack Total':
                objectCopy.total = parseInt(value, 10);
                break;
            case 'Attack Kill %':
                objectCopy.killPercentage = value;
                break;
            case 'Attack %':
                objectCopy.attackPercentage = value;
                break;
        }
    });
    return objectCopy;
};

const parseServeReceiveData = (matchArray: string[], objectCopy: ServeReceive) => {
    matchArray.forEach(item => {
        const [key, value] = item.split(',');
        switch (key.trim()) {
            case 'SR 3':
                objectCopy.three = parseInt(value, 10);
                break;
            case 'SR 2':
                objectCopy.two = parseInt(value, 10);
                break;
            case 'SR 1':
                objectCopy.one = parseInt(value, 10);
                break;
            case 'SR  0':
                objectCopy.errors = parseInt(value, 10);
                break;
            case 'SR Total':
                objectCopy.total = parseInt(value, 10);
                break;
            case 'SR %':
                objectCopy.srPercentage = value;
                break;
        }
    });
    return objectCopy;
};

const parsePlayingTimeData = (matchArray: string[], objectCopy: PlayingTime) => {
    matchArray.forEach(item => {
        const [key, value] = item.split(',');

        switch (key.trim()) {
            case 'Playing Time (mins)':
                objectCopy.playingTime = value;
                break;
            case 'Match Duration (mins)':
                objectCopy.matchDuration = value;
                break;
            case '% Played':
                objectCopy.percentagePlayed = value;
                break;
        }
    });

    return objectCopy;
};

const parseBlocksData = (matchArray: string[], objectCopy: Blocks) => {
    matchArray.forEach(item => {
        const [key, value] = item.split(',');

        switch (key.trim()) {
            case 'Block Solo':
                objectCopy.solo = parseInt(value, 10);
                break;
            case 'Block Assist':
                objectCopy.assist = parseInt(value, 10);
                break;
            case 'Block Error':
                objectCopy.error = parseInt(value, 10);
                break;
            case 'Block Total':
                objectCopy.total = parseInt(value, 10);
                break;
        }
    });

    return objectCopy;
};

const parseSettingData = (matchArray: string[], objectCopy: Setting) => {
    matchArray.forEach(item => {
        const [key, value] = item.split(',');

        switch (key.trim()) {
            case 'Setting Assist':
                objectCopy.assists = parseInt(value, 10);
                break;
            case 'Setting Zero':
                objectCopy.zeroAssists = parseInt(value, 10);
                break;
            case 'Setting Error':
                objectCopy.error = parseInt(value, 10);
                break;
            case 'Setting Total':
                objectCopy.total = parseInt(value, 10);
                break;
            case 'Setting Assist %':
                objectCopy.assistPercentage = value;
                break;
            case 'Setting %':
                objectCopy.settingPercentage = value;
                break;
        }
    });

    return objectCopy;
};

const parseDigsData = (matchArray: string[], objectCopy: Digs) => {
    matchArray.forEach(item => {
        const [key, value] = item.split(',');

        switch (key.trim()) {
            case 'Dig 3':
                objectCopy.three = parseInt(value, 10);
                break;
            case 'Dig 2':
                objectCopy.two = parseInt(value, 10);
                break;
            case 'Dig 1':
                objectCopy.one = parseInt(value, 10);
                break;
            case 'Dig 0':
                objectCopy.zero = parseInt(value, 10);
                break;
            case 'Digs Total':
                objectCopy.digsTotal = parseInt(value, 10);
                break;
            case 'Passing %':
                objectCopy.passingPercentage = value;
                break;
        }
    });

    return objectCopy;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseMatchesData = (matchArray: string[], objectCopy: any) => {
    matchArray.forEach(item => {
        const [key, value] = item.split(',');

        switch (key.trim()) {
            case 'Date':
                objectCopy.date = value;
                break;
            case 'Opponent':
                objectCopy.opponent = value;
                break;
        }
    });

    return objectCopy;
};
