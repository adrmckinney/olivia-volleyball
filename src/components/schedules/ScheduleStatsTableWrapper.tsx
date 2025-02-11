import { motion } from 'framer-motion';
import { useState } from 'react';
import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import { fonts } from '../../configs/fonts';
import { Abbreviations } from '../../enums/Abbreviations';
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
import ToolTip from '../../sharedComponents/ToolTip/ToolTip';
import { TableDataOptions } from '../../types/ScheduleStatsDataOptions';
import { StatFilterOptions } from '../../types/StatFilterOptions';
import useScheduleStatsTableHelpers from './useScheduleStatsTableHelpers';

type FilterButtons = {
    key: string;
    name: string;
    label: string;
    isActive: boolean;
    fn: () => void;
    show?: boolean;
};

export type ScheduleColumnsToShow = {
    opponent: boolean;
    date: boolean;
    time: boolean;
    result: boolean;
    score: boolean;
    scoreDetails: boolean;
    // For high school games specifically
    homeAway: boolean;
    gameStatus: boolean;
    opponentImage: boolean;
};

export type SubFiltersToShow = {
    set: {
        setsPlayed: boolean;
        settingAssist: boolean;
        settingError: boolean;
        settingZero: boolean;
        settingTotal: boolean;
        settingAssistPercentage: boolean;
        settingPercentage: boolean;
        settingAssistsPerSet: boolean;
    };
    attack: {
        setsPlayed: boolean;
        attackKill: boolean;
        attackError: boolean;
        attackZero: boolean;
        attackTotal: boolean;
        attackPercentage: boolean;
        attackKillPercentage: boolean;
        attackKillsPerSet: boolean;
    };
    serve: {
        setsPlayed: boolean;
        serviceAce: boolean;
        serviceError: boolean;
        serviceZero: boolean;
        serviceAttempts: boolean;
        serviceAcePercentage: boolean;
        servicePercentage: boolean;
        serviceAcesPerSet: boolean;
        servicePoints: boolean;
    };
    block: {
        setsPlayed: boolean;
        blockSolo: boolean;
        blockAssist: boolean;
        blockError: boolean;
        blockTotal: boolean;
        blockPercentage: boolean;
        blocksPerSet: boolean;
    };
    dig: {
        setsPlayed: boolean;
        dig3: boolean;
        dig2: boolean;
        dig1: boolean;
        dig0: boolean;
        digs: boolean;
        digErrors: boolean;
        digsTotal: boolean;
        passingPercentage: boolean;
        digsPerSet: boolean;
    };
    serveReceive: {
        setsPlayed: boolean;
        receptions: boolean;
        receptionError: boolean;
        receptionsPerSet: boolean;
    };
};

type Props = {
    tableTitle: string;
    data: TournamentGroup[] | TournamentGroup | EventData[] | undefined;
    loading: boolean;
    subFiltersToShow: Partial<SubFiltersToShow>;
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

    const isStatSet = tableDataType === 'stats' && statFilter === 'set';
    const isStatServe = tableDataType === 'stats' && statFilter === 'serve';
    const isStatAttach = tableDataType === 'stats' && statFilter === 'attack';
    const isStatBlock = tableDataType === 'stats' && statFilter === 'block';
    const isStatDigs = tableDataType === 'stats' && statFilter === 'dig';
    const isStatServeReceive = tableDataType === 'stats' && statFilter === 'serveReceive';
    // const { generateStatCols } = useGenerateStatTableColumns();

    // const cols = generateStatCols('set');
    // console.log('cols', cols);

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

    const scheduleColumns = [
        {
            key: 'opponent',
            name: 'Opponent',
            show: true,
        },
        {
            key: 'date',
            name: 'Date',
            show: tableDataType === 'schedule' && scheduleColumnsToShow?.date,
        },
        {
            key: 'time',
            name: 'Time',
            show: tableDataType === 'schedule' && scheduleColumnsToShow?.time,
        },
        {
            key: 'homeAway',
            name: 'Location',
            show: tableDataType === 'schedule' && scheduleColumnsToShow?.homeAway,
        },
        {
            key: 'gameStatus',
            name: 'Status',
            show: tableDataType === 'schedule' && scheduleColumnsToShow?.gameStatus,
        },
        {
            key: 'result',
            name: 'Result',
            show: tableDataType === 'schedule' && scheduleColumnsToShow?.result,
        },
        {
            key: 'score',
            name: 'Score',
            show: tableDataType === 'schedule' && scheduleColumnsToShow?.score,
        },
        {
            key: 'scoreDetails',
            name: 'Score Details',
            show: tableDataType === 'schedule' && scheduleColumnsToShow?.scoreDetails,
        },
    ];

    const settingColumns = [
        {
            key: Abbreviations.setsPlayed.key,
            name: (
                <ToolTip message={Abbreviations.setsPlayed.name} position="below">
                    {Abbreviations.setsPlayed.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.setsPlayed,
        },
        {
            key: Abbreviations.settingAssist.key,
            name: (
                <ToolTip message={Abbreviations.settingAssist.name} position="below">
                    {Abbreviations.settingAssist.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingAssist,
        },
        {
            key: Abbreviations.settingError.key,
            name: (
                <ToolTip message={Abbreviations.settingError.name} position="below">
                    {Abbreviations.settingError.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingError,
        },
        {
            key: Abbreviations.settingZero.key,
            name: (
                <ToolTip message={Abbreviations.settingZero.name} position="below">
                    {Abbreviations.settingZero.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingZero,
        },
        {
            key: Abbreviations.settingTotal.key,
            name: (
                <ToolTip message={Abbreviations.settingTotal.name} position="below">
                    {Abbreviations.settingTotal.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingTotal,
        },
        {
            key: Abbreviations.settingAssistPercentage.key,
            name: (
                <ToolTip message={Abbreviations.settingAssistPercentage.name} position="below">
                    {Abbreviations.settingAssistPercentage.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingAssistPercentage,
        },
        {
            key: Abbreviations.settingAssistsPerSet.key,
            name: (
                <ToolTip message={Abbreviations.settingAssistsPerSet.name} position="below">
                    {Abbreviations.settingAssistsPerSet.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingAssistsPerSet,
        },
        {
            key: Abbreviations.settingPercentage.key,
            name: (
                <ToolTip message={Abbreviations.settingPercentage.name} position="below">
                    {Abbreviations.settingPercentage.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingPercentage,
        },
    ];

    const serviceColumns = [
        {
            key: Abbreviations.setsPlayed.key,
            name: (
                <ToolTip message={Abbreviations.setsPlayed.name} position="below">
                    {Abbreviations.setsPlayed.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.setsPlayed,
        },
        {
            key: Abbreviations.serviceAce.key,
            name: (
                <ToolTip message={Abbreviations.serviceAce.name} position="below">
                    {Abbreviations.serviceAce.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.serviceAce,
        },
        {
            key: Abbreviations.serviceError.key,
            name: (
                <ToolTip message={Abbreviations.serviceError.name} position="below">
                    {Abbreviations.serviceError.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.serviceError,
        },
        {
            key: Abbreviations.serviceZero.key,
            name: (
                <ToolTip message={Abbreviations.serviceZero.name} position="below">
                    {Abbreviations.serviceZero.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.serviceZero,
        },
        {
            key: Abbreviations.serviceAttempts.key,
            name: (
                <ToolTip message={Abbreviations.serviceAttempts.name} position="below">
                    {Abbreviations.serviceAttempts.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.serviceAttempts,
        },
        {
            key: Abbreviations.serviceAcePercentage.key,
            name: (
                <ToolTip message={Abbreviations.serviceAcePercentage.name} position="below">
                    {Abbreviations.serviceAcePercentage.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.serviceAcePercentage,
        },
        {
            key: Abbreviations.serviceAcesPerSet.key,
            name: (
                <ToolTip message={Abbreviations.serviceAcesPerSet.name} position="below">
                    {Abbreviations.serviceAcesPerSet.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.serviceAcesPerSet,
        },
        {
            key: Abbreviations.servicePercentage.key,
            name: (
                <ToolTip message={Abbreviations.servicePercentage.name} position="below">
                    {Abbreviations.servicePercentage.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.servicePercentage,
        },
        {
            key: Abbreviations.servicePoints.key,
            name: (
                <ToolTip message={Abbreviations.servicePoints.name} position="below">
                    {Abbreviations.servicePoints.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.servicePoints,
        },
    ];

    const attackColumns = [
        {
            key: Abbreviations.setsPlayed.key,
            name: (
                <ToolTip message={Abbreviations.setsPlayed.name} position="below">
                    {Abbreviations.setsPlayed.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.setsPlayed,
        },
        {
            key: Abbreviations.attackKill.key,
            name: (
                <ToolTip message={Abbreviations.attackKill.name} position="below">
                    {Abbreviations.attackKill.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.attackKill,
        },
        {
            key: Abbreviations.attackError.key,
            name: (
                <ToolTip message={Abbreviations.attackError.name} position="below">
                    {Abbreviations.attackError.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.attackError,
        },
        {
            key: Abbreviations.attackZero.key,
            name: (
                <ToolTip message={Abbreviations.attackZero.name} position="below">
                    {Abbreviations.attackZero.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.attackZero,
        },
        {
            key: Abbreviations.attackTotal.key,
            name: (
                <ToolTip message={Abbreviations.attackTotal.name} position="below">
                    {Abbreviations.attackTotal.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.attackTotal,
        },
        {
            key: Abbreviations.attackKillPercentage.key,
            name: (
                <ToolTip message={Abbreviations.attackKillPercentage.name} position="below">
                    {Abbreviations.attackKillPercentage.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.attackKillPercentage,
        },
        {
            key: Abbreviations.attackKillsPerSet.key,
            name: (
                <ToolTip message={Abbreviations.attackKillsPerSet.name} position="below">
                    {Abbreviations.attackKillsPerSet.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.attackKillsPerSet,
        },
        {
            key: Abbreviations.attackPercentage.key,
            name: (
                <ToolTip message={Abbreviations.attackPercentage.name} position="below">
                    {Abbreviations.attackPercentage.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.attackPercentage,
        },
    ];

    const blockColumns = [
        {
            key: Abbreviations.setsPlayed.key,
            name: (
                <ToolTip message={Abbreviations.setsPlayed.name} position="below">
                    {Abbreviations.setsPlayed.label}
                </ToolTip>
            ),
            show: isStatBlock && subFiltersToShow?.block?.setsPlayed,
        },
        {
            key: Abbreviations.blockSolo.key,
            name: (
                <ToolTip message={Abbreviations.blockSolo.name} position="below">
                    {Abbreviations.blockSolo.label}
                </ToolTip>
            ),
            show: isStatBlock && subFiltersToShow?.block?.blockSolo,
        },
        {
            key: Abbreviations.blockAssist.key,
            name: (
                <ToolTip message={Abbreviations.blockAssist.name} position="below">
                    {Abbreviations.blockAssist.label}
                </ToolTip>
            ),
            show: isStatBlock && subFiltersToShow.block?.blockAssist,
        },
        {
            key: Abbreviations.blockError.key,
            name: (
                <ToolTip message={Abbreviations.blockError.name} position="below">
                    {Abbreviations.blockError.label}
                </ToolTip>
            ),
            show: isStatBlock && subFiltersToShow.block?.blockError,
        },
        {
            key: Abbreviations.blockTotal.key,
            name: (
                <ToolTip message={Abbreviations.blockTotal.name} position="below">
                    {Abbreviations.blockTotal.label}
                </ToolTip>
            ),
            show: isStatBlock && subFiltersToShow.block?.blockTotal,
        },
        {
            key: Abbreviations.blocksPerSet.key,
            name: (
                <ToolTip message={Abbreviations.blocksPerSet.name} position="below">
                    {Abbreviations.blocksPerSet.label}
                </ToolTip>
            ),
            show: isStatBlock && subFiltersToShow.block?.blocksPerSet,
        },
        {
            key: Abbreviations.blockPercentage.key,
            name: (
                <ToolTip message={Abbreviations.blockPercentage.name} position="below">
                    {Abbreviations.blockPercentage.label}
                </ToolTip>
            ),
            show: isStatBlock && subFiltersToShow.block?.blockPercentage,
        },
    ];

    const digsColumns = [
        {
            key: Abbreviations.setsPlayed.key,
            name: (
                <ToolTip message={Abbreviations.setsPlayed.name} position="below">
                    {Abbreviations.setsPlayed.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.setsPlayed,
        },
        {
            key: Abbreviations.dig3.key,
            name: (
                <ToolTip message={Abbreviations.dig3.name} position="below">
                    {Abbreviations.dig3.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.dig3,
        },
        {
            key: Abbreviations.dig2.key,
            name: (
                <ToolTip message={Abbreviations.dig2.name} position="below">
                    {Abbreviations.dig2.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.dig2,
        },
        {
            key: Abbreviations.dig1.key,
            name: (
                <ToolTip message={Abbreviations.dig1.name} position="below">
                    {Abbreviations.dig1.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.dig1,
        },
        {
            key: Abbreviations.dig0.key,
            name: (
                <ToolTip message={Abbreviations.dig0.name} position="below">
                    {Abbreviations.dig0.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.dig0,
        },
        {
            key: Abbreviations.digsTotal.key,
            name: (
                <ToolTip message={Abbreviations.digsTotal.name} position="below">
                    {Abbreviations.digsTotal.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.digsTotal,
        },
        {
            key: Abbreviations.digErrors.key,
            name: (
                <ToolTip message={Abbreviations.digErrors.name} position="below">
                    {Abbreviations.digErrors.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.digErrors,
        },
        {
            key: Abbreviations.digsPerSet.key,
            name: (
                <ToolTip message={Abbreviations.digsPerSet.name} position="below">
                    {Abbreviations.digsPerSet.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.digsPerSet,
        },
        {
            key: Abbreviations.passingPercentage.key,
            name: (
                <ToolTip message={Abbreviations.passingPercentage.name} position="below">
                    {Abbreviations.passingPercentage.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.passingPercentage,
        },
    ];

    const serveReceiveColumns = [
        {
            key: Abbreviations.setsPlayed.key,
            name: (
                <ToolTip message={Abbreviations.setsPlayed.name} position="below">
                    {Abbreviations.setsPlayed.label}
                </ToolTip>
            ),
            show: isStatServeReceive && subFiltersToShow.serveReceive?.setsPlayed,
        },
        {
            key: Abbreviations.receptions.key,
            name: (
                <ToolTip message={Abbreviations.receptions.name} position="below">
                    {Abbreviations.receptions.label}
                </ToolTip>
            ),
            show: isStatServeReceive && subFiltersToShow.serveReceive?.receptions,
        },
        {
            key: Abbreviations.receptionError.key,
            name: (
                <ToolTip message={Abbreviations.receptionError.name} position="below">
                    {Abbreviations.receptionError.label}
                </ToolTip>
            ),
            show: isStatServeReceive && subFiltersToShow.serveReceive?.receptionError,
        },
        {
            key: Abbreviations.receptionsPerSet.key,
            name: (
                <ToolTip message={Abbreviations.receptionsPerSet.name} position="below">
                    {Abbreviations.receptionsPerSet.label}
                </ToolTip>
            ),
            show: isStatServeReceive && subFiltersToShow.serveReceive?.receptionsPerSet,
        },
    ];

    const columns: TableColumn[] = [
        ...scheduleColumns.filter(col => col.show),
        ...settingColumns.filter(col => col.show),
        ...serviceColumns.filter(col => col.show),
        ...attackColumns.filter(col => col.show),
        ...blockColumns.filter(col => col.show),
        ...digsColumns.filter(col => col.show),
        ...serveReceiveColumns.filter(col => col.show),
    ];

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

    const subFilters: FilterButtons[] = [
        {
            key: 'set',
            name: 'Setting',
            label: 'Setting',
            fn: () => setStatFilter('set'),
            isActive: statFilter === 'set',
            show: subFiltersToShow.set ? Object.values(subFiltersToShow.set).some(Boolean) : false,
        },
        {
            key: 'attack',
            name: 'Attacking',
            label: 'Attacking',
            fn: () => setStatFilter('attack'),
            isActive: statFilter === 'attack',
            show: subFiltersToShow.attack
                ? Object.values(subFiltersToShow.attack).some(Boolean)
                : false,
        },
        {
            key: 'serve',
            name: 'Serving',
            label: 'Serving',
            fn: () => setStatFilter('serve'),
            isActive: statFilter === 'serve',
            show: subFiltersToShow.serve
                ? Object.values(subFiltersToShow.serve).some(Boolean)
                : false,
        },
        {
            key: 'block',
            name: 'Blocking',
            label: 'Blocking',
            fn: () => setStatFilter('block'),
            isActive: statFilter === 'block',
            show: subFiltersToShow.block
                ? Object.values(subFiltersToShow.block).some(Boolean)
                : false,
        },
        {
            key: 'dig',
            name: 'Digging',
            label: 'Digging',
            fn: () => setStatFilter('dig'),
            isActive: statFilter === 'dig',
            show: subFiltersToShow.dig ? Object.values(subFiltersToShow.dig).some(Boolean) : false,
        },
        {
            key: 'serveReceive',
            name: 'Serve Receive',
            label: 'Serve Receive',
            fn: () => setStatFilter('serveReceive'),
            isActive: statFilter === 'serveReceive',
            show: subFiltersToShow.serveReceive
                ? Object.values(subFiltersToShow.serveReceive).some(Boolean)
                : false,
        },
    ].filter(filter => filter.show);

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
