export type Match = {
    key: string;
    opponent: string;
    date: string;
    time: string;
    result: string;
    score: string;
    scoreDetails: string;
    matchStatus: string;
};

export type Stat = {
    key: string;
    opponent: string;
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

export type Group = {
    tournament: string;
    location: string;
    startDate: string;
    endDate: string;
};

export interface TournamentGroup {
    key: string;
    group: Group;
    matches: Match[];
    stats?: Stat[];
}

export const parseScheduleSheet = (csvText: string): TournamentGroup[] => {
    const rows: string[] = csvText.split('\n').filter(Boolean); // Split rows and remove empty lines
    const data: TournamentGroup[] = [];
    let currentGroup: TournamentGroup | null = null;

    // Function to properly split a CSV row, handling quoted strings
    const parseCsvRow = (row: string): string[] => {
        const regex = /(?:,|\n|^)(?:"([^"]*)"|([^",]*))(?=,|\n|$)/g;
        const matches = [];
        let match;

        while ((match = regex.exec(row)) !== null) {
            matches.push(match[1] || match[2] || '');
        }

        return matches.map(item => item.trim());
    };

    rows.slice(1).forEach(row => {
        // Skip the first row (headers)
        // Order matters
        const [
            tournamentKey,
            tournamentName,
            city,
            state,
            startDate,
            endDate,
            matchKey,
            opponent,
            date,
            time,
            result,
            score,
            scoreDetails,
            setsPlayed,
            serviceAce,
            serviceZero,
            serviceError,
            serviceAcesPerSet,
            serviceAttempts,
            serviceAcePercentage,
            servicePercentage,
            servicePoints,
            attackKill,
            attackZero,
            attackError,
            attackKillsPerSet,
            attackTotal,
            attackKillPercentage,
            attackPercentage,
            blockSolo,
            blockAssist,
            blockError,
            blockPerSet,
            blockTotal,
            blockPercentage,
            settingAssist,
            settingZero,
            settingError,
            settingAssistsPerSet,
            settingTotal,
            settingAssistPercentage,
            settingPercentage,
            dig3,
            dig2,
            dig1,
            dig0,
            digs,
            digErrors,
            digsPerSet,
            digsTotal,
            passingPercentage,
            matchStatus,
            statsStatus,
        ]: string[] = parseCsvRow(row);
        // Combine city and state into a single string
        const location = `${city}, ${state}`;

        // Check if we are starting a new tournament group
        if (!currentGroup || currentGroup.key !== tournamentKey) {
            currentGroup = {
                key: tournamentKey,
                group: {
                    tournament: tournamentName, // Full tournament name
                    location: location, // Properly concatenate city and state
                    startDate: startDate,
                    endDate: endDate,
                },
                matches: [],
                stats: [],
            };
            data.push(currentGroup); // Add new group to the data array
        }

        // Add match data to the current group
        currentGroup.matches.push({
            key: matchKey,
            opponent: opponent,
            date: date,
            time: time,
            result: result,
            score: score,
            scoreDetails: scoreDetails,
            matchStatus: matchStatus.toLowerCase() || '',
        });

        currentGroup.stats?.push({
            key: matchKey,
            opponent: opponent,
            setsPlayed: parseInt(setsPlayed, 10) || 0,
            serviceAce: parseInt(serviceAce, 10) || 0,
            serviceZero: parseInt(serviceZero, 10) || 0,
            serviceError: parseInt(serviceError, 10) || 0,
            serviceAttempts: parseInt(serviceAttempts, 10) || 0,
            serviceAcePercentage: serviceAcePercentage || '',
            servicePercentage: servicePercentage || '',
            serviceAcesPerSet: parseFloat(serviceAcesPerSet) || 0,
            servicePoints: parseInt(servicePoints, 10) || 0,
            attackKill: parseInt(attackKill, 10) || 0,
            attackZero: parseInt(attackZero, 10) || 0,
            attackError: parseInt(attackError, 10) || 0,
            attackKillsPerSet: parseFloat(attackKillsPerSet) || 0,
            attackTotal: parseInt(attackTotal, 10) || 0,
            attackKillPercentage: attackKillPercentage || '',
            attackPercentage: attackPercentage || '',
            blockSolo: parseInt(blockSolo, 10) || 0,
            blockAssist: parseInt(blockAssist, 10) || 0,
            blockError: parseInt(blockError, 10) || 0,
            blockTotal: parseFloat(blockTotal) || 0,
            blockPercentage: blockPercentage || '',
            blockPerSet: parseInt(blockPerSet, 10) || 0,
            settingAssist: parseInt(settingAssist, 10) || 0,
            settingZero: parseInt(settingZero, 10) || 0,
            settingError: parseInt(settingError, 10) || 0,
            settingAssistsPerSet: parseFloat(settingAssistsPerSet) || 0,
            settingTotal: parseInt(settingTotal, 10) || 0,
            settingAssistPercentage: settingAssistPercentage || '',
            settingPercentage: settingPercentage || '',
            dig3: parseInt(dig3, 10) || 0,
            dig2: parseInt(dig2, 10) || 0,
            dig1: parseInt(dig1, 10) || 0,
            dig0: parseInt(dig0, 10) || 0,
            digs: parseInt(digs, 10) || 0,
            digErrors: parseInt(digErrors, 10) || 0,
            digsTotal: parseInt(digsTotal, 10) || 0,
            passingPercentage: passingPercentage || '',
            digsPerSet: parseFloat(digsPerSet) || 0,
            statsStatus: statsStatus.toLowerCase() || '',
        });
    });

    return data;
};
