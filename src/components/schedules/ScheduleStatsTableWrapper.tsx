import { motion } from 'framer-motion';
import { useState } from 'react';
import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import { fonts } from '../../configs/fonts';
import { Abbreviations } from '../../enums/Abbreviations';
import { TournamentGroup } from '../../helpers/csvHelpers/parseScheduleSheet';
import useGetWindowWidth from '../../hooks/useGetWindowWidth';
import { ButtonSize } from '../../sharedComponents/Buttons/BaseButton';
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
import useScheduleStatsTableHelpers from './useScheduleStatsTableHelpers';

type FilterButtons = {
    key: string;
    label: string;
    isActive: boolean;
    fn: () => void;
    show?: boolean;
};

export type SubFiltersToShow = {
    set: {
        settingAssist: boolean;
        settingError: boolean;
        settingZero: boolean;
        settingTotal: boolean;
        settingAssistPercentage: boolean;
        settingPercentage: boolean;
        settingAssistPerSet: boolean;
    };
    attack: {
        attackKill: boolean;
        attackError: boolean;
        attackZero: boolean;
        attackTotal: boolean;
        attackPercentage: boolean;
        attackKillPercentage: boolean;
        attackKillsPerSet: boolean;
    };
    serve: {
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
        blockSolo: boolean;
        blockAssist: boolean;
        blockError: boolean;
        blockTotal: boolean;
        blockPercentage: boolean;
        blocksPerSet: boolean;
    };
    dig: {
        dig3: boolean;
        dig2: boolean;
        dig1: boolean;
        dig0: boolean;
        digsTotal: boolean;
        passingPercentage: boolean;
        digsPerSet: boolean;
    };
    serveReceive: {
        receptions: boolean;
        receptionError: boolean;
        receptionsPerSet: boolean;
    };
};

type Props = {
    tableTitle: string;
    data: TournamentGroup[] | TournamentGroup | undefined;
    loading: boolean;
    subFiltersToShow: Partial<SubFiltersToShow>;
};

const ScheduleStatsTableWrapper = ({ tableTitle, data, loading, subFiltersToShow }: Props) => {
    const { currentTailwindBreakpoint } = useGetWindowWidth();
    const { prepareGroupTableData } = useScheduleStatsTableHelpers();
    const [tableDataType, setTableDataType] = useState<TableDataOptions>('schedule');
    const [statFilter, setStatFilter] = useState<StatFilterOptions>('set');
    const [showTable, setShowTable] = useState(false);

    const isStatSet = tableDataType === 'stats' && statFilter === 'set';
    const isStatServe = tableDataType === 'stats' && statFilter === 'serve';
    const isStatAttach = tableDataType === 'stats' && statFilter === 'attack';
    const isStatBlock = tableDataType === 'stats' && statFilter === 'block';
    const isStatDigs = tableDataType === 'stats' && statFilter === 'dig';
    const isStatServeReceive = tableDataType === 'stats' && statFilter === 'serveReceive';

    const rowLevelDataKey = tableDataType === 'schedule' ? 'matches' : 'stats';

    const pillButtonSize: Record<ButtonSize, ButtonSize> = {
        xs: 'xs',
        sm: 'xs',
        md: 'sm',
        lg: 'lg',
        xl: '2xl',
        '2xl': '3xl',
        '3xl': '3xl',
        '4xl': '3xl',
        '5xl': '3xl',
    };

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
            key: Abbreviations.settingPercentage.key,
            name: (
                <ToolTip message={Abbreviations.settingPercentage.name} position="below">
                    {Abbreviations.settingPercentage.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingPercentage,
        },
        {
            key: Abbreviations.settingAssistPerSet.key,
            name: (
                <ToolTip message={Abbreviations.settingAssistPerSet.name} position="below">
                    {Abbreviations.settingAssistPerSet.label}
                </ToolTip>
            ),
            show: isStatSet && subFiltersToShow?.set?.settingAssistPerSet,
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
            key: Abbreviations.servicePercentage.key,
            name: (
                <ToolTip message={Abbreviations.servicePercentage.name} position="below">
                    {Abbreviations.servicePercentage.label}
                </ToolTip>
            ),
            show: isStatServe && subFiltersToShow.serve?.servicePercentage,
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
            key: Abbreviations.attackPercentage.key,
            name: (
                <ToolTip message={Abbreviations.attackPercentage.name} position="below">
                    {Abbreviations.attackPercentage.label}
                </ToolTip>
            ),
            show: isStatAttach && subFiltersToShow.attack?.attackPercentage,
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
    ];

    const blockColumns = [
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
            key: Abbreviations.blockPercentage.key,
            name: (
                <ToolTip message={Abbreviations.blockPercentage.name} position="below">
                    {Abbreviations.blockPercentage.label}
                </ToolTip>
            ),
            show: isStatBlock && subFiltersToShow.block?.blockPercentage,
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
    ];

    const digsColumns = [
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
            key: Abbreviations.passingPercentage.key,
            name: (
                <ToolTip message={Abbreviations.passingPercentage.name} position="below">
                    {Abbreviations.passingPercentage.label}
                </ToolTip>
            ),
            show: isStatDigs && subFiltersToShow.dig?.passingPercentage,
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
    ];

    const serveReceiveColumns = [
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
        ...scheduleColumns,
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

    const subFilters: FilterButtons[] = [
        {
            key: 'set',
            label: 'Set',
            fn: () => setStatFilter('set'),
            isActive: statFilter === 'set',
            show: subFiltersToShow.set ? Object.values(subFiltersToShow.set).some(Boolean) : false,
        },
        {
            key: 'attack',
            label: 'Attack',
            fn: () => setStatFilter('attack'),
            isActive: statFilter === 'attack',
            show: subFiltersToShow.attack
                ? Object.values(subFiltersToShow.attack).some(Boolean)
                : false,
        },
        {
            key: 'serve',
            label: 'Serve',
            fn: () => setStatFilter('serve'),
            isActive: statFilter === 'serve',
            show: subFiltersToShow.serve
                ? Object.values(subFiltersToShow.serve).some(Boolean)
                : false,
        },
        {
            key: 'block',
            label: 'Block',
            fn: () => setStatFilter('block'),
            isActive: statFilter === 'block',
            show: subFiltersToShow.block
                ? Object.values(subFiltersToShow.block).some(Boolean)
                : false,
        },
        {
            key: 'dig',
            label: 'Dig',
            fn: () => setStatFilter('dig'),
            isActive: statFilter === 'dig',
            show: subFiltersToShow.dig ? Object.values(subFiltersToShow.dig).some(Boolean) : false,
        },
        {
            key: 'serveReceive',
            label: 'Serve Receive',
            fn: () => setStatFilter('serveReceive'),
            isActive: statFilter === 'serveReceive',
            show: subFiltersToShow.serveReceive
                ? Object.values(subFiltersToShow.serveReceive).some(Boolean)
                : false,
        },
    ].filter(filter => filter.show);

    const preparedData = prepareGroupTableData({
        data: data && Array.isArray(data) ? data : [],
        rowLevelDataKey,
        dataType: tableDataType,
        statFilter,
        columns,
    });

    return (
        <>
            <Collapsible
                show={showTable}
                triggerComponent={
                    <SubHeaderWithExpandChevron
                        title={tableTitle}
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
                        className="flex justify-start w-full mt-8 space-x-6 pl-0 md:pl-44 lg:pl-52"
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
                    <TableWithGroupedRows columns={columns} data={preparedData} />
                )}
            </Collapsible>
        </>
    );
};

export default ScheduleStatsTableWrapper;
