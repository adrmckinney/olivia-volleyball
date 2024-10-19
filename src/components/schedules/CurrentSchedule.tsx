import { useContext } from 'react';
import useFetchCSVData from '../../api/FetchCSVData';
import { NavigationContext } from '../../context/NavigationProvider';
import { parseScheduleSheet, TournamentGroup } from '../../helpers/csvHelpers/parseScheduleSheet';
import SectionHeader from '../../sharedComponents/SectionHeader';
import TableWithGroupedRows from '../../sharedComponents/Tables/TableWithGroupedRows';
import { sheetUrls } from '../../utils/googleSheetsConfigs';

const CurrentSchedule = () => {
    const { scheduleRef, hideNavBackground } = useContext(NavigationContext);

    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_JAMMERS2025_SCHEDULE_SHEET_ID);
    const { parsedData: scheduleData } = useFetchCSVData({ url, parser: parseScheduleSheet });

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
            <TableWithGroupedRows columns={columns} data={scheduleData as TournamentGroup[]} />
        </div>
    );
};

export default CurrentSchedule;
