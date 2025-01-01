export type Match = {
    key: string;
    opponent: string;
    date: string;
    result: string;
    score: string;
    scoreDetails: string;
    matchStatus: string;
};

export type Stat = {
    key: string;
    opponent: string;
    serviceAce: number;
    serviceZero: number;
    serviceError: number;
    serviceAttempts: number;
    serviceAcePercentage: string;
    servicePercentage: string;
    attackKill: number;
    attackZero: number;
    attackError: number;
    attackTotal: number;
    attackKillPercentage: string;
    attackPercentage: string;
    blockSolo: number;
    blockAssist: number;
    blockError: number;
    blockTotal: number;
    blockPercentage: string;
    settingAssist: number;
    settingZero: number;
    settingError: number;
    settingTotal: number;
    settingAssistPercentage: string;
    settingPercentage: string;
    dig3: number;
    dig2: number;
    dig1: number;
    dig0: number;
    digsTotal: number;
    passingPercentage: string;
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
            result,
            score,
            scoreDetails,
            serviceAce,
            serviceZero,
            serviceError,
            serviceAttempts,
            serviceAcePercentage,
            servicePercentage,
            attackKill,
            attackZero,
            attackError,
            attackTotal,
            attackKillPercentage,
            attackPercentage,
            blockSolo,
            blockAssist,
            blockError,
            blockTotal,
            blockPercentage,
            settingAssist,
            settingZero,
            settingError,
            settingTotal,
            settingAssistPercentage,
            settingPercentage,
            dig3,
            dig2,
            dig1,
            dig0,
            digsTotal,
            passingPercentage,
            matchStatus,
            statsStatus,
        ]: string[] = parseCsvRow(row);

        // Ensure all required fields are present
        if (
            !tournamentKey ||
            !tournamentName ||
            !city ||
            !state ||
            !startDate ||
            !endDate ||
            !matchKey ||
            !opponent ||
            !date ||
            !result
        ) {
            console.warn('Incomplete data row:', row);
            return; // Skip incomplete rows
        }

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
            result: result,
            score: score,
            scoreDetails: scoreDetails,
            matchStatus: matchStatus.toLowerCase() || '',
        });

        currentGroup.stats?.push({
            key: matchKey,
            opponent: opponent,
            serviceAce: parseInt(serviceAce, 10) || 0,
            serviceZero: parseInt(serviceZero, 10) || 0,
            serviceError: parseInt(serviceError, 10) || 0,
            serviceAttempts: parseInt(serviceAttempts, 10) || 0,
            serviceAcePercentage: serviceAcePercentage || '',
            servicePercentage: servicePercentage || '',
            attackKill: parseInt(attackKill, 10) || 0,
            attackZero: parseInt(attackZero, 10) || 0,
            attackError: parseInt(attackError, 10) || 0,
            attackTotal: parseInt(attackTotal, 10) || 0,
            attackKillPercentage: attackKillPercentage || '',
            attackPercentage: attackPercentage || '',
            blockSolo: parseInt(blockSolo, 10) || 0,
            blockAssist: parseInt(blockAssist, 10) || 0,
            blockError: parseInt(blockError, 10) || 0,
            blockTotal: parseInt(blockTotal, 10) || 0,
            blockPercentage: blockPercentage || '',
            settingAssist: parseInt(settingAssist, 10) || 0,
            settingZero: parseInt(settingZero, 10) || 0,
            settingError: parseInt(settingError, 10) || 0,
            settingTotal: parseInt(settingTotal, 10) || 0,
            settingAssistPercentage: settingAssistPercentage || '',
            settingPercentage: settingPercentage || '',
            dig3: parseInt(dig3, 10) || 0,
            dig2: parseInt(dig2, 10) || 0,
            dig1: parseInt(dig1, 10) || 0,
            dig0: parseInt(dig0, 10) || 0,
            digsTotal: parseInt(digsTotal, 10) || 0,
            passingPercentage: passingPercentage || '',
            statsStatus: statsStatus.toLowerCase() || '',
        });
    });

    return data;
};
