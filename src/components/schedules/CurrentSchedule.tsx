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

    const columns: TableColumn[] = [
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
            key: Abbreviations.settingAssist.key,
            name: Abbreviations.settingAssist.label,
            show: tableDataType === 'stats' && statFilter === 'set',
        },
        // {
        //     key: Abbreviations.settingZero.key,
        //     name: Abbreviations.settingZero.label,
        //     show: tableDataType === 'stats' && statFilter === 'set',
        // },
        {
            key: Abbreviations.settingError.key,
            name: Abbreviations.settingError.label,
            show: tableDataType === 'stats' && statFilter === 'set',
        },
        {
            key: Abbreviations.settingTotal.key,
            name: Abbreviations.settingTotal.label,
            show: tableDataType === 'stats' && statFilter === 'set',
        },
        {
            key: Abbreviations.settingAssistPercentage.key,
            name: Abbreviations.settingAssistPercentage.label,
            show: tableDataType === 'stats' && statFilter === 'set',
        },
        {
            key: Abbreviations.settingPercentage.key,
            name: Abbreviations.settingPercentage.label,
            show: tableDataType === 'stats' && statFilter === 'set',
        },
        {
            key: Abbreviations.serviceAce.key,
            name: Abbreviations.serviceAce.label,
            show: tableDataType === 'stats' && statFilter === 'serve',
        },
        // {
        //     key: Abbreviations.serviceZero.key,
        //     name: Abbreviations.serviceZero.label,
        //     show: tableDataType === 'stats' && statFilter === 'serve',
        // },
        {
            key: Abbreviations.serviceError.key,
            name: Abbreviations.serviceError.label,
            show: tableDataType === 'stats' && statFilter === 'serve',
        },
        {
            key: Abbreviations.serviceAttempts.key,
            name: Abbreviations.serviceAttempts.label,
            show: tableDataType === 'stats' && statFilter === 'serve',
        },
        {
            key: Abbreviations.serviceAcePercentage.key,
            name: Abbreviations.serviceAcePercentage.label,
            show: tableDataType === 'stats' && statFilter === 'serve',
        },
        {
            key: Abbreviations.servicePercentage.key,
            name: Abbreviations.servicePercentage.label,
            show: tableDataType === 'stats' && statFilter === 'serve',
        },
        {
            key: Abbreviations.attackKill.key,
            name: Abbreviations.attackKill.label,
            show: tableDataType === 'stats' && statFilter === 'attack',
        },
        // {
        //     key: Abbreviations.attackZero.key,
        //     name: Abbreviations.attackZero.label,
        //     show: tableDataType === 'stats' && statFilter === 'attack',
        // },
        {
            key: Abbreviations.attackError.key,
            name: Abbreviations.attackError.label,
            show: tableDataType === 'stats' && statFilter === 'attack',
        },
        {
            key: Abbreviations.attackTotal.key,
            name: Abbreviations.attackTotal.label,
            show: tableDataType === 'stats' && statFilter === 'attack',
        },
        {
            key: Abbreviations.attackKillPercentage.key,
            name: Abbreviations.attackKillPercentage.label,
            show: tableDataType === 'stats' && statFilter === 'attack',
        },
        {
            key: Abbreviations.attackPercentage.key,
            name: Abbreviations.attackPercentage.label,
            show: tableDataType === 'stats' && statFilter === 'attack',
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

    const rowLevelDataKey = tableDataType === 'schedule' ? 'matches' : 'stats';

    const preparedData = prepareGroupTableData({
        data: scheduleData && Array.isArray(scheduleData) ? scheduleData : [],
        groupRender,
        rowLevelDataKey,
    });

    const statKeys = Object.keys(Abbreviations).filter(key => {
        return Abbreviations[key as keyof typeof Abbreviations].type === statFilter;
    });

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
                className={[
                    'flex flex-col justify-center items-start w-full',
                    // 'md:flex-row md:justify-start md:items-center md:px-4 md:space-x-40',
                    'lg:px-8',
                ].join(' ')}
            >
                <div className="flex mt-8 space-x-14">
                    <LinkButton
                        title="Schedule"
                        classNames={[
                            fonts.headerThree,
                            fontFamilies.headerThree,
                            tableDataType === 'schedule' ? 'text-purple-400' : colors.textGeneric,
                        ].join(' ')}
                        onClick={() => setTableDataType('schedule')}
                    />
                    <LinkButton
                        title="Stats"
                        classNames={[
                            fonts.headerThree,
                            fontFamilies.headerThree,
                            tableDataType === 'stats' ? 'text-purple-400' : colors.textGeneric,
                        ].join(' ')}
                        onClick={() => setTableDataType('stats')}
                    />

                    {/* <SecondaryButton
                        isActive={tableDataType === 'schedule'}
                        size="4xl"
                        onClick={() => setTableDataType('schedule')}
                    >
                        Schedule
                    </SecondaryButton> */}
                    {/* <SecondaryButton
                        isActive={tableDataType === 'stats'}
                        size="4xl"
                        onClick={() => setTableDataType('stats')}
                    >
                        Stats
                    </SecondaryButton> */}
                </div>
                {/* <ConditionalRender condition={tableDataType === 'stats'} isNullRender> */}
                <AnimatePresence>
                    {tableDataType === 'stats' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex justify-start w-full mt-8 space-x-6"
                        >
                            {/* <div className="mt-8 space-x-6 w-full justify-start"> */}
                            <SecondaryPillButton
                                isActive={statFilter === 'set'}
                                size="xl"
                                onClick={() => setStatFilter('set')}
                            >
                                Set
                            </SecondaryPillButton>
                            <SecondaryPillButton
                                isActive={statFilter === 'attack'}
                                size="xl"
                                onClick={() => setStatFilter('attack')}
                            >
                                Attack
                            </SecondaryPillButton>
                            <SecondaryPillButton
                                isActive={statFilter === 'serve'}
                                size="xl"
                                onClick={() => setStatFilter('serve')}
                            >
                                Serve
                            </SecondaryPillButton>
                            {/* </div> */}
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* </ConditionalRender> */}
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
