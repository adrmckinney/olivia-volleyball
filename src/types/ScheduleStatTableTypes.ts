export type FilterButtons = {
    key: string;
    name: string;
    label: string;
    isActive: boolean;
    fn: () => void;
    show?: boolean;
};

export const ScheduleColKeyNameMap: Record<keyof ScheduleColumnsToShow, string> = {
    opponent: 'Opponent',
    date: 'Date',
    time: 'Time',
    result: 'Result',
    score: 'Score',
    scoreDetails: 'Score Details',
    homeAway: 'Location',
    gameStatus: 'Status',
    opponentImage: 'Image',
};

export const StatFiltersKeyNameMap: Record<keyof SubFiltersToShow, string> = {
    set: 'Setting',
    attack: 'Attacking',
    block: 'Blocking',
    dig: 'Digging',
    serve: 'Serving',
    serveReceive: 'Serve Receive',
};

export type ScheduleColumnsToShow = {
    opponent: boolean;
    date: boolean;
    time: boolean;
    result: boolean;
    score: boolean;
    scoreDetails: boolean;
    // For high school games specifically
    homeAway: boolean;
    gameStatus: boolean;
    opponentImage: boolean;
};

export type SubFiltersToShow = {
    set: {
        setsPlayed: boolean;
        settingAssist: boolean;
        settingError: boolean;
        settingZero: boolean;
        settingTotal: boolean;
        settingAssistPercentage: boolean;
        settingPercentage: boolean;
        settingAssistsPerSet: boolean;
    };
    attack: {
        setsPlayed: boolean;
        attackKill: boolean;
        attackError: boolean;
        attackZero: boolean;
        attackTotal: boolean;
        attackPercentage: boolean;
        attackKillPercentage: boolean;
        attackKillsPerSet: boolean;
    };
    serve: {
        setsPlayed: boolean;
        serviceAce: boolean;
        serviceError: boolean;
        serviceZero: boolean;
        serviceAttempts: boolean;
        serviceAcePercentage: boolean;
        servicePercentage: boolean;
        serviceAcesPerSet: boolean;
        servicePoints: boolean;
    };
    block: {
        setsPlayed: boolean;
        blockSolo: boolean;
        blockAssist: boolean;
        blockError: boolean;
        blockTotal: boolean;
        blockPercentage: boolean;
        blocksPerSet: boolean;
    };
    dig: {
        setsPlayed: boolean;
        dig3: boolean;
        dig2: boolean;
        dig1: boolean;
        dig0: boolean;
        digs: boolean;
        digErrors: boolean;
        digsTotal: boolean;
        passingPercentage: boolean;
        digsPerSet: boolean;
    };
    serveReceive: {
        setsPlayed: boolean;
        receptions: boolean;
        receptionError: boolean;
        receptionsPerSet: boolean;
    };
};
