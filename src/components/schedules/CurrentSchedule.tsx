import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import useFetchCSVData from '../../api/FetchCSVData';
import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import { fonts } from '../../configs/fonts';
import { NavigationContext } from '../../context/NavigationProvider';
import { Abbreviations } from '../../enums/Abbreviations';
import { Group, parseScheduleSheet } from '../../helpers/csvHelpers/parseScheduleSheet';
import { prepareGroupTableData } from '../../helpers/tableHelpers';
import LinkButton from '../../sharedComponents/Buttons/LinkButton';
import SecondaryPillButton from '../../sharedComponents/Buttons/SecondaryPillButton';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import SectionHeader from '../../sharedComponents/SectionHeader';
import SkeletonTable from '../../sharedComponents/Skeletons/SkeletonTable';
import TableWithGroupedRows, {
    TableColumn,
} from '../../sharedComponents/Tables/TableWithGroupedRows';
import { sheetUrls } from '../../utils/googleSheetsConfigs';

type TableDataOptions = 'schedule' | 'stats';
type StatFilterOptions = 'set' | 'attack' | 'serve' | 'dig' | 'block' | 'serveReceive';

const CurrentSchedule = () => {
    const { scheduleRef, hideNavBackground } = useContext(NavigationContext);
    const [tableDataType, setTableDataType] = useState<TableDataOptions>('schedule');
    const [statFilter, setStatFilter] = useState<StatFilterOptions>('set');

    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_JAMMERS2025_SCHEDULE_SHEET_ID);
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
    ];

    const settingColumns = [
        {
            key: Abbreviations.settingAssist.key,
            name: Abbreviations.settingAssist.label,
            show: isStatSet,
        },
        // {
        //     key: Abbreviations.settingZero.key,
        //     name: Abbreviations.settingZero.label,
        //     show: isStatSet,
        // },
        {
            key: Abbreviations.settingError.key,
            name: Abbreviations.settingError.label,
            show: isStatSet,
        },
        {
            key: Abbreviations.settingTotal.key,
            name: Abbreviations.settingTotal.label,
            show: isStatSet,
        },
        {
            key: Abbreviations.settingAssistPercentage.key,
            name: Abbreviations.settingAssistPercentage.label,
            show: isStatSet,
        },
        {
            key: Abbreviations.settingPercentage.key,
            name: Abbreviations.settingPercentage.label,
            show: isStatSet,
        },
    ];
    const serviceColumns = [
        {
            key: Abbreviations.serviceAce.key,
            name: Abbreviations.serviceAce.label,
            show: isStatServe,
        },
        // {
        //     key: Abbreviations.serviceZero.key,
        //     name: Abbreviations.serviceZero.label,
        //     show: isStatServe,
        // },
        {
            key: Abbreviations.serviceError.key,
            name: Abbreviations.serviceError.label,
            show: isStatServe,
        },
        {
            key: Abbreviations.serviceAttempts.key,
            name: Abbreviations.serviceAttempts.label,
            show: isStatServe,
        },
        {
            key: Abbreviations.serviceAcePercentage.key,
            name: Abbreviations.serviceAcePercentage.label,
            show: isStatServe,
        },
        {
            key: Abbreviations.servicePercentage.key,
            name: Abbreviations.servicePercentage.label,
            show: isStatServe,
        },
    ];
    const attackColumns = [
        {
            key: Abbreviations.attackKill.key,
            name: Abbreviations.attackKill.label,
            show: isStatAttach,
        },
        // {
        //     key: Abbreviations.attackZero.key,
        //     name: Abbreviations.attackZero.label,
        //     show: isStatAttach,
        // },
        {
            key: Abbreviations.attackError.key,
            name: Abbreviations.attackError.label,
            show: isStatAttach,
        },
        {
            key: Abbreviations.attackTotal.key,
            name: Abbreviations.attackTotal.label,
            show: isStatAttach,
        },
        {
            key: Abbreviations.attackKillPercentage.key,
            name: Abbreviations.attackKillPercentage.label,
            show: isStatAttach,
        },
        {
            key: Abbreviations.attackPercentage.key,
            name: Abbreviations.attackPercentage.label,
            show: isStatAttach,
        },
    ];

    const columns: TableColumn[] = [
        ...scheduleColumns,
        ...settingColumns,
        ...serviceColumns,
        ...attackColumns,
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

    const rowLevelDataKey = tableDataType === 'schedule' ? 'matches' : 'stats';

    const preparedData = prepareGroupTableData({
        data: scheduleData && Array.isArray(scheduleData) ? scheduleData : [],
        groupRender,
        rowLevelDataKey,
    });

    // Get the keys for the stats we want to display
    const statKeys = Object.keys(Abbreviations).filter(key => {
        return Abbreviations[key as keyof typeof Abbreviations].type === statFilter;
    });

    // If stats, filter the stats based on the statFilter, otherwise return the preparedData for the schedule
    const filteredStats =
        tableDataType === 'schedule'
            ? preparedData
            : preparedData.map(group => {
                  const rows = group.rows.map(row => {
                      const currentStats = { ...row.data };
                      const newStats: { [key: string]: string | number } = {};
                      Object.keys(currentStats).forEach(key => {
                          if (statKeys.includes(key)) {
                              newStats[key] = currentStats[key];
                          }
                      });
                      newStats['opponent'] = currentStats['opponent'];
                      newStats['key'] = currentStats['key'];
                      return { data: newStats, key: currentStats['key'] as string };
                  });
                  return { ...group, rows };
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
        <div
            ref={scheduleRef}
            id="schedule"
            className={[
                'mx-auto mt-8 px-6 sm:mt-16 lg:scroll-m-20 lg:px-8 justify-center items-center pb-20 md:pb-0',
                'max-w-[1600px]',
            ].join(' ')}
        >
            <SectionHeader
                title="Jammers Volleyball Club 2025 Schedule and Stats"
                hideNavBackground={hideNavBackground}
            />

            <div
                className={['flex flex-col justify-center items-start w-full', 'lg:px-8'].join(' ')}
            >
                <div className="flex mt-8 space-x-14">
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

                <AnimatePresence>
                    {tableDataType === 'stats' && (
                        <motion.div
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
                </AnimatePresence>
            </div>

            {loading ? (
                <SkeletonTable numberOfRows={10} numberOfColumns={5} />
            ) : (
                <TableWithGroupedRows columns={columns} data={filteredStats} />
            )}
        </div>
    );
};

export default CurrentSchedule;
