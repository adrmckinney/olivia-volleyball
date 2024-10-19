import { useContext, useEffect, useState } from 'react';
import useFetchCSVData from '../../api/FetchCSVData';
import { NavigationContext } from '../../context/NavigationProvider';
import { parseScheduleSheet, TournamentGroup } from '../../helpers/csvHelpers/parseScheduleSheet';
import SectionHeader from '../../sharedComponents/SectionHeader';
import TableWithGroupedRows from '../../sharedComponents/Tables/TableWithGroupedRows';
import { urls } from '../../utils/googleSheetsConfigs';

const CurrentSchedule = () => {
    const { scheduleRef, hideNavBackground } = useContext(NavigationContext);
    const [scheduleData, setScheduleData] = useState<TournamentGroup[]>();

    const { fetchAndParseCsvData, parsedData } = useFetchCSVData();
    const url: string = urls.schedules
        .replace('{documentId}', import.meta.env.VITE_JAMMERS_2025_SCHEDULE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_JAMMERS2025_SCHEDULE_SHEET_ID);

    useEffect(() => {
        fetchAndParseCsvData(url, parseScheduleSheet);
    }, []);
    console.log('parsedData', parsedData);
    const data = [
        {
            key: 'winter-bump',
            group: {
                tournament: 'Winter Bump',
                location: 'Myrtle Beach, SC',
                startDate: '1/18/25',
                endDate: '1/20/25',
            },
            matches: [
                {
                    key: 'tbd-1',
                    opponent: 'TBD',
                    date: 'TBD',
                    result: 'TBD',
                },
                {
                    key: 'tbd-2',
                    opponent: 'TBD',
                    date: 'TBD',
                    result: 'TBD',
                },
                {
                    key: 'tbd-3',
                    opponent: 'TBD',
                    date: 'TBD',
                    result: 'TBD',
                },
                {
                    key: 'tbd-4',
                    opponent: 'TBD',
                    date: 'TBD',
                    result: 'TBD',
                },
            ],
        },
        {
            key: 'carolina-regional',
            group: {
                tournament: 'Carolina Regional',
                location: 'TBD',
                startDate: '1/25/25',
                endDate: '1/25/25',
            },
            matches: [
                {
                    key: 'tbd-1',
                    opponent: 'TBD',
                    date: 'TBD',
                    result: 'TBD',
                },
                {
                    key: 'tbd-2',
                    opponent: 'TBD',
                    date: 'TBD',
                    result: 'TBD',
                },
                {
                    key: 'tbd-3',
                    opponent: 'TBD',
                    date: 'TBD',
                    result: 'TBD',
                },
                {
                    key: 'tbd-4',
                    opponent: 'TBD',
                    date: 'TBD',
                    result: 'TBD',
                },
            ],
        },
    ];

    const columns = [
        {
            key: 'opponent',
            name: 'Opponent',
        },
        {
            key: 'date',
            name: 'Date',
        },
        {
            key: 'result',
            name: 'Result',
        },
    ];

    return (
        <div
            ref={scheduleRef}
            id="schedule"
            className={[
                'mx-auto mt-8 px-6 sm:mt-16 lg:scroll-m-20 lg:px-8 justify-center items-center pb-20 md:pb-0',
                'max-w-[1600px]',
                //   'max-w-7xl'
            ].join(' ')}
        >
            <SectionHeader title="Jammers 2025 Schedule" hideNavBackground={hideNavBackground} />
            <TableWithGroupedRows columns={columns} data={parsedData as TournamentGroup[]} />
        </div>
    );
};

export default CurrentSchedule;
