type StatusMeta = {
    type: string;
    message: string;
};

export type ScheduleStatuses = {
    incomplete: StatusMeta;
    complete: StatusMeta;
    complete_no_details: StatusMeta;
    forfeit: StatusMeta;
};

export const ScheduleStatuses: ScheduleStatuses = {
    incomplete: {
        type: 'INCOMPLETE',
        message: 'The match schedules are not available',
    },
    complete: {
        type: 'COMPLETE',
        message: 'This schedule is current',
    },
    complete_no_details: {
        type: 'COMPLETE_NO_DETAILS',
        message: 'There are no available details for the match',
    },
    forfeit: {
        type: 'FORFEIT',
        message: 'The match was forfeited',
    },
};
