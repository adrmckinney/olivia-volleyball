// Header strings
export type DetailsSubHeaders = VenueDetailHeaders | VenueStatHeaders;

type VenueDetailHeaders = 'Venue' | 'City' | 'State' | 'Start Date' | 'End Date';
type VenueStatHeaders =
    | VenueServeStatHeaders
    | VenueSettingStatHeaders
    | VenueAttackStatHeaders
    | VenueTournamentStatHeaders;
type VenueServeStatHeaders =
    | 'AVG Tournament Serve %'
    | 'AVG Tournament Serve Errors'
    | 'Total Tournament Serve Errors'
    | 'AVG Tournament Ace %';

type VenueSettingStatHeaders =
    | 'AVG Tournament Setting %'
    | 'AVG Tournament Setting Errors'
    | 'Total Tournament Setting Errors'
    | 'AVG Tournament Assist %';

type VenueAttackStatHeaders = 'AVG Tournament Attack %' | 'AVG Tournament Kill %';

type VenueTournamentStatHeaders =
    | 'Tournament Wins'
    | 'Tournament Loses'
    | 'Tournament Win/Loss %'
    | 'Tournament Play %';

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

export type SubHeaders =
    | DetailsSubHeaders
    | MatchSubHeaders
    | PlayingTimeSubHeaders
    | ServeSubHeaders
    | AttacksSubHeaders
    | ServeReceiveSubHeaders
    | BlocksSubHeaders
    | SettingSubHeaders
    | DigsSubHeaders;

// Data Types
export type SeasonData = {
    matches: Match[];
} & Details;

export type Details = {
    venueDetails: VenueDetails;
    venueTournamentDetails: VenueTournamentDetails;
    venueSettingStats: VenueSettingsStats;
    venueServeStats: VenueServeStats;
    venueAttackStats: VenueAttackStats;
};

export type VenueDetails = {
    venue: string;
    city: string;
    state: string;
    startDate: string;
    endDate: string;
};

type VenueServeStats = {
    avgTournamentServePercentage: string;
    avgTournamentServeErrors: string;
    totalTournamentServeErrors: number;
    avgTournamentAcePercentage: string;
};

type VenueSettingsStats = {
    avgTournamentSettingPercentage: string;
    avgTournamentSettingErrors: string;
    totalTournamentSettingErrors: number;
    avgTournamentAssistPercentage: string;
};

type VenueAttackStats = {
    avgTournamentAttackPercentage: string;
    avgTournamentKillPercentage: string;
};

type VenueTournamentDetails = {
    tournamentWins: number;
    tournamentLoses: number;
    tournamentWinLossPercentage: string;
    tournamentPlayPercentage: string;
};

export type Match = {
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

export type PlayingTime = {
    playingTime: string;
    matchDuration: string;
    percentagePlayed: string;
};

export type Serves = {
    aces: number;
    zeroServe: number;
    errors: number;
    total: number;
    acePercentage: string;
    servePercentage: string;
};

export type Attacks = {
    kills: number;
    zeroAttacks: number;
    errors: number;
    total: number;
    killPercentage: string;
    attackPercentage: string;
};

export type ServeReceive = {
    three: number;
    two: number;
    one: number;
    errors: number;
    total: number;
    srPercentage: string;
};

export type Blocks = {
    solo: number;
    assist: number;
    error: number;
    total: number;
};

export type Setting = {
    assists: number;
    zeroAssists: number;
    error: number;
    total: number;
    assistPercentage: string;
    settingPercentage: string;
};

export type Digs = {
    three: number;
    two: number;
    one: number;
    zero: number;
    digsTotal: number;
    passingPercentage: string;
};
