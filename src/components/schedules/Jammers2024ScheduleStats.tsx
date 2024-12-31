import { motion } from 'framer-motion';
import { useState } from 'react';
import useFetchCSVData from '../../api/FetchCSVData';
import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import { fonts } from '../../configs/fonts';
import { Abbreviations } from '../../enums/Abbreviations';
import { parseScheduleSheet } from '../../helpers/csvHelpers/parseScheduleSheet';
// import { prepareGroupTableData } from '../../helpers/tableHelpers';
import LinkButton from '../../sharedComponents/Buttons/LinkButton';
import SecondaryPillButton from '../../sharedComponents/Buttons/SecondaryPillButton';
import Collapsible from '../../sharedComponents/Collapsible';
import SkeletonTable from '../../sharedComponents/Skeletons/SkeletonTable';
import SubHeaderWithExpandChevron from '../../sharedComponents/SubHeaderWithExpandChevron';
import TableWithGroupedRows, {
    TableColumn,
} from '../../sharedComponents/Tables/TableWithGroupedRows';
import ToolTip from '../../sharedComponents/ToolTip/ToolTip';
import { TableDataOptions } from '../../types/ScheduleStatsDataOptions';
import { StatFilterOptions } from '../../types/StatFilterOptions';
import { sheetUrls } from '../../utils/googleSheetsConfigs';
import useScheduleStatsTableHelpers from './useScheduleStatsTableHelpers';

const Jammers2024ScheduleStats = () => {
    const { prepareGroupTableData } = useScheduleStatsTableHelpers();
    const [tableDataType, setTableDataType] = useState<TableDataOptions>('schedule');
    const [statFilter, setStatFilter] = useState<StatFilterOptions>('set');
    const [showTable, setShowTable] = useState(false);

    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_JAMMERS2024_SCHEDULE_SHEET_ID);
    const { parsedData: scheduleData, loading } = useFetchCSVData({
        url,
        parser: parseScheduleSheet,
    });

    const isStatSet = tableDataType === 'stats' && statFilter === 'set';
    const isStatServe = tableDataType === 'stats' && statFilter === 'serve';
    const isStatAttach = tableDataType === 'stats' && statFilter === 'attack';

    const scheduleColumns = [
        {
            key: 'opponent',
            name: 'Opponent',
        },
        {
            key: 'date',
            name: 'Date',
            show: tableDataType === 'schedule',
        },
        {
            key: 'result',
            name: 'Result',
            show: tableDataType === 'schedule',
        },
        {
            key: 'score',
            name: 'Score',
            show: tableDataType === 'schedule',
        },
    ];

    const settingColumns = [
        {
            key: Abbreviations.settingAssist.key,
            name: (
                <ToolTip message={Abbreviations.settingAssist.name} position="below">
                    {Abbreviations.settingAssist.label}
                </ToolTip>
            ),
            show: isStatSet,
        },
        {
            key: Abbreviations.settingError.key,
            name: (
                <ToolTip message={Abbreviations.settingError.name} position="below">
                    {Abbreviations.settingError.label}
                </ToolTip>
            ),
            show: isStatSet,
        },
        {
            key: Abbreviations.settingTotal.key,
            name: (
                <ToolTip message={Abbreviations.settingTotal.name} position="below">
                    {Abbreviations.settingTotal.label}
                </ToolTip>
            ),
            show: isStatSet,
        },
        {
            key: Abbreviations.settingAssistPercentage.key,
            name: (
                <ToolTip message={Abbreviations.settingAssistPercentage.name} position="below">
                    {Abbreviations.settingAssistPercentage.label}
                </ToolTip>
            ),
            show: isStatSet,
        },
        {
            key: Abbreviations.settingPercentage.key,
            name: (
                <ToolTip message={Abbreviations.settingPercentage.name} position="below">
                    {Abbreviations.settingPercentage.label}
                </ToolTip>
            ),
            show: isStatSet,
        },
    ];
    const serviceColumns = [
        {
            key: Abbreviations.serviceAce.key,
            name: (
                <ToolTip message={Abbreviations.serviceAce.name} position="below">
                    {Abbreviations.serviceAce.label}
                </ToolTip>
            ),
            show: isStatServe,
        },
        {
            key: Abbreviations.serviceError.key,
            name: (
                <ToolTip message={Abbreviations.serviceError.name} position="below">
                    {Abbreviations.serviceError.label}
                </ToolTip>
            ),
            show: isStatServe,
        },
        {
            key: Abbreviations.serviceAttempts.key,
            name: (
                <ToolTip message={Abbreviations.serviceAttempts.name} position="below">
                    {Abbreviations.serviceAttempts.label}
                </ToolTip>
            ),
            show: isStatServe,
        },
        {
            key: Abbreviations.serviceAcePercentage.key,
            name: (
                <ToolTip message={Abbreviations.serviceAcePercentage.name} position="below">
                    {Abbreviations.serviceAcePercentage.label}
                </ToolTip>
            ),
            show: isStatServe,
        },
        {
            key: Abbreviations.servicePercentage.key,
            name: (
                <ToolTip message={Abbreviations.servicePercentage.name} position="below">
                    {Abbreviations.servicePercentage.label}
                </ToolTip>
            ),
            show: isStatServe,
        },
    ];
    const attackColumns = [
        {
            key: Abbreviations.attackKill.key,
            name: (
                <ToolTip message={Abbreviations.attackKill.name} position="below">
                    {Abbreviations.attackKill.label}
                </ToolTip>
            ),
            show: isStatAttach,
        },
        {
            key: Abbreviations.attackError.key,
            name: (
                <ToolTip message={Abbreviations.attackError.name} position="below">
                    {Abbreviations.attackError.label}
                </ToolTip>
            ),
            show: isStatAttach,
        },
        {
            key: Abbreviations.attackTotal.key,
            name: (
                <ToolTip message={Abbreviations.attackTotal.name} position="below">
                    {Abbreviations.attackTotal.label}
                </ToolTip>
            ),
            show: isStatAttach,
        },
        {
            key: Abbreviations.attackKillPercentage.key,
            name: (
                <ToolTip message={Abbreviations.attackKillPercentage.name} position="below">
                    {Abbreviations.attackKillPercentage.label}
                </ToolTip>
            ),
            show: isStatAttach,
        },
        {
            key: Abbreviations.attackPercentage.key,
            name: (
                <ToolTip message={Abbreviations.attackPercentage.name} position="below">
                    {Abbreviations.attackPercentage.label}
                </ToolTip>
            ),
            show: isStatAttach,
        },
    ];

    const columns: TableColumn[] = [
        ...scheduleColumns,
        ...settingColumns,
        ...serviceColumns,
        ...attackColumns,
    ];

    const rowLevelDataKey = tableDataType === 'schedule' ? 'matches' : 'stats';

    const preparedData = prepareGroupTableData({
        data: scheduleData && Array.isArray(scheduleData) ? scheduleData : [],
        // groupRender,
        // dataRender,
        rowLevelDataKey,
        dataType: tableDataType,
        statFilter,
        columns,
    });

    const mainFilters = [
        {
            key: 'schedule',
            label: 'Schedule',
            fn: () => setTableDataType('schedule'),
            isActive: tableDataType === 'schedule',
        },
        {
            key: 'stats',
            label: 'Stats',
            fn: () => setTableDataType('stats'),
            isActive: tableDataType === 'stats',
        },
    ];

    const subFilters = [
        {
            key: 'set',
            label: 'Set',
            fn: () => setStatFilter('set'),
            isActive: statFilter === 'set',
        },
        {
            key: 'attack',
            label: 'Attack',
            fn: () => setStatFilter('attack'),
            isActive: statFilter === 'attack',
        },
        {
            key: 'serve',
            label: 'Serve',
            fn: () => setStatFilter('serve'),
            isActive: statFilter === 'serve',
        },
    ];

    return (
        <>
            <Collapsible
                show={showTable}
                triggerComponent={
                    <SubHeaderWithExpandChevron
                        title="Jammers Volleyball Club 2024 Schedule and Stats"
                        show={showTable}
                        handleClick={() => setShowTable(!showTable)}
                        titleIsClickable
                    />
                }
            >
                <div className="flex mt-0 space-x-14">
                    {mainFilters.map(filter => (
                        <LinkButton
                            key={filter.key}
                            title={filter.label}
                            classNames={[
                                fonts.groupTableMainFilterText,
                                fontFamilies.headerThree,
                                filter.isActive ? colors.textNavActive : colors.textGeneric,
                            ].join(' ')}
                            onClick={filter.fn}
                        />
                    ))}
                </div>

                {tableDataType === 'stats' && (
                    <motion.div
                        key="stats"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-start w-full mt-8 space-x-6 pl-52"
                    >
                        {subFilters.map(filter => (
                            <SecondaryPillButton
                                key={filter.key}
                                isActive={filter.isActive}
                                size="2xl"
                                onClick={filter.fn}
                            >
                                {filter.label}
                            </SecondaryPillButton>
                        ))}
                    </motion.div>
                )}

                {loading ? (
                    <SkeletonTable numberOfRows={10} numberOfColumns={5} />
                ) : (
                    <TableWithGroupedRows columns={columns} data={preparedData} />
                )}
            </Collapsible>
        </>
    );
};

export default Jammers2024ScheduleStats;
