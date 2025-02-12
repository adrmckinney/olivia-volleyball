import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import { fonts } from '../../configs/fonts';
import { EventData } from '../../helpers/csvHelpers/parseRiversideScheduleSheet';
import { TournamentGroup } from '../../helpers/csvHelpers/parseScheduleSheet';
import useGetWindowWidth from '../../hooks/useGetWindowWidth';
import { ButtonSize } from '../../sharedComponents/Buttons/BaseButton';
import LinkButton from '../../sharedComponents/Buttons/LinkButton';
import SecondaryPillButton from '../../sharedComponents/Buttons/SecondaryPillButton';
import Collapsible from '../../sharedComponents/Collapsible';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import DrawerWithHeader from '../../sharedComponents/Drawers/DrawerWithHeader';
import BasicSelectDropdown, {
    SelectOption,
} from '../../sharedComponents/DropDowns/BasicSelectDropdown';
import SkeletonTable from '../../sharedComponents/Skeletons/SkeletonTable';
import SubHeaderWithExpandChevron from '../../sharedComponents/SubHeaderWithExpandChevron';
import Table from '../../sharedComponents/Tables/Table';
import TableWithGroupedRows, {
    GroupTableData,
    TableColumn,
    TableDataRow,
} from '../../sharedComponents/Tables/TableWithGroupedRows';
import ToggleSwitch from '../../sharedComponents/Toggles/ToggleSwitch';
import { TableDataOptions } from '../../types/ScheduleStatsDataOptions';
import {
    FilterButtons,
    ScheduleColumnsToShow,
    SubFiltersToShow,
} from '../../types/ScheduleStatTableTypes';
import { StatFilterOptions } from '../../types/StatFilterOptions';
import useGenerateScheduleAndStatTableColumns from './useGenerateScheduleAndStatTableColumns';
import useScheduleStatsTableHelpers from './useScheduleStatsTableHelpers';

type Props = {
    tableTitle: string;
    data: TournamentGroup[] | TournamentGroup | EventData[] | undefined;
    loading: boolean;
    subFiltersToShow: SubFiltersToShow;
    scheduleColumnsToShow: Partial<ScheduleColumnsToShow>;
    isTournament?: boolean;
};

const defaultStatFilter = {
    key: 'set',
    name: 'Setting',
    label: 'Setting',
    fn: () => {},
    isActive: true,
    show: true,
};

const ScheduleStatsTableWrapper = ({
    tableTitle,
    data,
    loading,
    subFiltersToShow,
    scheduleColumnsToShow,
    isTournament = true,
}: Props) => {
    const { currentTailwindBreakpoint, isBreakpointGreaterThan } = useGetWindowWidth();
    const { prepareTableData, prepareGroupTableData } = useScheduleStatsTableHelpers();
    const [tableDataType, setTableDataType] = useState<TableDataOptions>('schedule');
    const [statFilter, setStatFilter] = useState<StatFilterOptions>(
        defaultStatFilter.key as StatFilterOptions
    );
    const [showTable, setShowTable] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [dropDownSelection, setDropDownSelection] = useState<FilterButtons>(defaultStatFilter);
    const { generateStatCols, generateScheduleCols, generateStatFilters } =
        useGenerateScheduleAndStatTableColumns();

    const scheduleCols = useMemo(() => {
        if (tableDataType === 'schedule') {
            return generateScheduleCols(scheduleColumnsToShow, tableDataType);
        }
        return [];
    }, [tableDataType]);

    const statCols = useMemo(() => {
        if (tableDataType === 'stats') {
            return generateStatCols(subFiltersToShow, statFilter, tableDataType);
        }
        return [];
    }, [tableDataType, statFilter]);
    console.log('statCols', tableTitle, statCols);
    const rowLevelDataKey = tableDataType === 'schedule' ? 'matches' : 'stats';

    const pillButtonSize: Record<ButtonSize, ButtonSize> = {
        xs: 'xs',
        sm: 'xs',
        md: 'sm',
        lg: 'lg',
        xl: '2xl',
        '2xl': '2xl',
        '3xl': '2xl',
        '4xl': '2xl',
        '5xl': '2xl',
    };

    const columns: TableColumn[] = [...scheduleCols, ...statCols];

    const mainFilters: FilterButtons[] = [
        {
            key: 'schedule',
            name: 'Schedule',
            label: 'Schedule',
            fn: () => setTableDataType('schedule'),
            isActive: tableDataType === 'schedule',
        },
        {
            key: 'stats',
            name: 'Stats',
            label: 'Stats',
            fn: () => setTableDataType('stats'),
            isActive: tableDataType === 'stats',
        },
    ];
    const subFilters: FilterButtons[] = generateStatFilters(
        subFiltersToShow,
        setStatFilter,
        statFilter
    );

    if (!data || !Array.isArray(data)) return;

    const preparedData =
        data && isTournament
            ? prepareGroupTableData({
                  data: data as TournamentGroup[],
                  rowLevelDataKey,
                  dataType: tableDataType,
                  statFilter,
                  columns,
              })
            : prepareTableData({
                  data: data as EventData[],
                  rowLevelDataKey,
                  dataType: tableDataType,
                  statFilter,
                  columns,
              });

    const highestBreakpointToShowDrawer = 'md';
    const handleShowTable = () => {
        setShowTable(!showTable);
    };

    const handleShowTableDrawer = () => {
        setShowDrawer(true);
    };

    const drawerTitle = tableTitle.replace('Schedule and Stats', '');

    const handleDropDownSelection = (option: SelectOption) => {
        setDropDownSelection(option as FilterButtons);
        setStatFilter(option.key as StatFilterOptions);
    };

    return (
        <>
            <ConditionalRender
                condition={isBreakpointGreaterThan(highestBreakpointToShowDrawer)}
                isNullRender
                falseRender={
                    // mobile view
                    <>
                        <SubHeaderWithExpandChevron
                            title={tableTitle}
                            show={false}
                            handleClick={handleShowTableDrawer}
                        />

                        <DrawerWithHeader
                            open={showDrawer}
                            onClose={() => setShowDrawer(false)}
                            drawerTitle={drawerTitle}
                            fullScreen
                            mainContent={
                                <ConditionalRender
                                    condition={isTournament}
                                    isNullRender
                                    falseRender={
                                        <Table
                                            columns={columns}
                                            data={preparedData as TableDataRow[]}
                                        />
                                    }
                                >
                                    <TableWithGroupedRows
                                        columns={columns}
                                        data={preparedData as GroupTableData[]}
                                    />
                                </ConditionalRender>
                            }
                            subTitleContent={
                                <div
                                    className={[
                                        'flex w-full justify-between items-center space-x-4 pt-2',
                                    ].join(' ')}
                                >
                                    <ToggleSwitch
                                        enabled={tableDataType === 'stats'}
                                        leftLabel="Schedule"
                                        rightLabel="Stats"
                                        onChange={() =>
                                            setTableDataType(
                                                tableDataType === 'schedule' ? 'stats' : 'schedule'
                                            )
                                        }
                                    />
                                    <ConditionalRender
                                        condition={tableDataType === 'stats'}
                                        isNullRender
                                    >
                                        <BasicSelectDropdown
                                            options={subFilters.filter(
                                                option => option.key !== dropDownSelection.key
                                            )}
                                            handleChange={handleDropDownSelection}
                                            selected={dropDownSelection}
                                        />
                                    </ConditionalRender>
                                </div>
                            }
                        />
                    </>
                }
            >
                <Collapsible // Larger screen view
                    show={showTable}
                    triggerComponent={
                        <SubHeaderWithExpandChevron
                            title={tableTitle}
                            show={showTable}
                            handleClick={handleShowTable}
                            titleIsClickable
                        />
                    }
                >
                    <ConditionalRender
                        condition={isBreakpointGreaterThan(highestBreakpointToShowDrawer)}
                    >
                        <div
                            className={[
                                'flex mt-0 space-x-14 w-full h-fit',
                                'sticky top-44 z-30 py-0 lg:static lg:top-auto lg:z-auto',
                                colors.bgMain,
                            ].join(' ')}
                        >
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
                                className={[
                                    'flex justify-start w-full mt-8 lg:mt-8 space-x-6 pl-0 md:pl-44 lg:pl-52',
                                    'sticky top-52 z-20 py-6 md:py-3 lg:py-0 lg:static lg:top-auto lg:z-auto',
                                    colors.bgMain,
                                ].join(' ')}
                            >
                                {subFilters.map(filter => (
                                    <SecondaryPillButton
                                        key={filter.key}
                                        isActive={filter.isActive}
                                        size={pillButtonSize[currentTailwindBreakpoint]}
                                        onClick={filter.fn}
                                    >
                                        {filter.label}
                                    </SecondaryPillButton>
                                ))}
                            </motion.div>
                        )}

                        {loading ? (
                            <SkeletonTable numberOfRows={10} autoCols />
                        ) : (
                            <ConditionalRender
                                condition={isTournament}
                                isNullRender
                                falseRender={
                                    <Table
                                        columns={columns}
                                        data={preparedData as TableDataRow[]}
                                    />
                                }
                            >
                                <TableWithGroupedRows
                                    columns={columns}
                                    data={preparedData as GroupTableData[]}
                                />
                            </ConditionalRender>
                        )}
                    </ConditionalRender>
                </Collapsible>
            </ConditionalRender>
        </>
    );
};

export default ScheduleStatsTableWrapper;
