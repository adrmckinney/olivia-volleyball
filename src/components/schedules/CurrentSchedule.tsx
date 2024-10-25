import { useContext } from 'react';
import useFetchCSVData from '../../api/FetchCSVData';
import { NavigationContext } from '../../context/NavigationProvider';
import { Group, parseScheduleSheet } from '../../helpers/csvHelpers/parseScheduleSheet';
import { prepareGroupTableData } from '../../helpers/tableHelpers';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import SectionHeader from '../../sharedComponents/SectionHeader';
import TableWithGroupedRows, {
    TableColumn,
} from '../../sharedComponents/Tables/TableWithGroupedRows';
import { sheetUrls } from '../../utils/googleSheetsConfigs';

const CurrentSchedule = () => {
    const { scheduleRef, hideNavBackground } = useContext(NavigationContext);

    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_JAMMERS2025_SCHEDULE_SHEET_ID);
    const { parsedData: scheduleData } = useFetchCSVData({ url, parser: parseScheduleSheet });

    const columns: TableColumn[] = [
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

    const groupRender = (group: Group) => (
        <div className="flex divide-x-2 divide-gray-50">
            <p className="pr-4">{group.tournament}</p>
            <p className="px-4">{group.location}</p>
            <ConditionalRender
                condition={group.startDate === group.endDate}
                falseRender={
                    <p className="pl-4">
                        {group.startDate} - {group.endDate}
                    </p>
                }
            >
                <p className="pl-4">{group.startDate}</p>
            </ConditionalRender>
        </div>
    );

    const preparedData = prepareGroupTableData({
        data: scheduleData && Array.isArray(scheduleData) ? scheduleData : [],
        groupRender,
        rowLevelDataKey: 'matches',
    });

    return (
        <div
            ref={scheduleRef}
            id="schedule"
            className={[
                'mx-auto mt-8 px-6 sm:mt-16 lg:scroll-m-20 lg:px-8 justify-center items-center pb-20 md:pb-0',
                'max-w-[1600px]',
            ].join(' ')}
        >
            <SectionHeader
                title="Jammer's Volleyball Club 2025 Schedule"
                hideNavBackground={hideNavBackground}
            />
            <TableWithGroupedRows columns={columns} data={preparedData} />
        </div>
    );
};

export default CurrentSchedule;
