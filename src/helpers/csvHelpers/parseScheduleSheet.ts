interface Match {
    key: string;
    opponent: string;
    date: string;
    result: string;
}

export interface TournamentGroup {
    key: string;
    group: {
        tournament: string;
        location: string;
        startDate: string;
        endDate: string;
    };
    matches: Match[];
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
            };
            data.push(currentGroup); // Add new group to the data array
        }

        // Add match data to the current group
        currentGroup.matches.push({
            key: matchKey,
            opponent: opponent,
            date: date,
            result: result,
        });
    });

    return data;
};
