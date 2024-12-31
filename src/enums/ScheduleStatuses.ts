type StatusMeta = {
    type: string;
    message: string;
};

export type ScheduleStatuses = {
    incomplete: StatusMeta;
    complete: StatusMeta;
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
};
