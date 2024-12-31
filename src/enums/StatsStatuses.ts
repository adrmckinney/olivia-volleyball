type StatusMeta = {
    type: string;
    message: string;
};

export type StatStatuses = {
    incomplete: StatusMeta;
    complete: StatusMeta;
    out_with_injury: StatusMeta;
    no_stats: StatusMeta;
};

export const StatsStatuses: StatStatuses = {
    incomplete: {
        type: 'INCOMPLETE',
        message: 'These stats have not been entered yet',
    },
    complete: {
        type: 'COMPLETE',
        message: 'All stats are current',
    },
    out_with_injury: {
        type: 'OUT_WITH_INJURY',
        message: 'Out with injury',
    },
    no_stats: {
        type: 'NO_STATS',
        message: 'No stats available',
    },
};
