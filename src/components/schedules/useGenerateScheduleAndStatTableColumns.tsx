import { AbbreviationKeys, Abbreviations } from '../../enums/Abbreviations';
import { TableColumn } from '../../sharedComponents/Tables/TableWithGroupedRows';
import ToolTip from '../../sharedComponents/ToolTip/ToolTip';
import { TableDataOptions } from '../../types/ScheduleStatsDataOptions';
import { StatFilterOptions } from '../../types/StatFilterOptions';
import {
    ScheduleColNames,
    ScheduleColumnsToShow,
    SubFiltersToShow,
} from './ScheduleStatsTableWrapper';

const useGenerateScheduleAndStatTableColumns = () => {
    const generateStatCols = (
        subFiltersToShow: Partial<SubFiltersToShow>,
        statFilter: StatFilterOptions,
        tableDataType: TableDataOptions
    ): TableColumn[] => {
        const columns: TableColumn[] = [
            {
                key: 'opponent',
                name: 'Opponent',
                show: true,
            },
        ];

        Object.entries(subFiltersToShow).forEach(entry => {
            const [key, values] = entry as [StatFilterOptions, Record<AbbreviationKeys, boolean>];
            Object.entries(values).forEach(e => {
                const [abbreviationKey, show] = e as [AbbreviationKeys, boolean];
                const shouldShow = statFilter === key && tableDataType === 'stats' && show;

                if (!shouldShow) return;

                columns.push({
                    key: Abbreviations[abbreviationKey]?.key,
                    name: (
                        <ToolTip message={Abbreviations[abbreviationKey]?.name} position="below">
                            {Abbreviations[abbreviationKey]?.label}
                        </ToolTip>
                    ),
                    show: shouldShow,
                });
            });
        });

        return columns;
    };

    const generateScheduleCols = (
        scheduleColumnsToShow: Partial<ScheduleColumnsToShow>,
        tableDataType: TableDataOptions
    ): TableColumn[] => {
        const columns: TableColumn[] = [];

        Object.entries(scheduleColumnsToShow).forEach(entry => {
            const [key, show] = entry as [Partial<keyof ScheduleColumnsToShow>, boolean];
            console.log('key', key);

            const shouldShow = tableDataType === 'schedule' && show;

            if (!shouldShow) return;

            columns.push({
                key,
                name: ScheduleColNames[key],
                show: shouldShow,
            });
        });
        return columns;
    };

    return {
        generateStatCols,
        generateScheduleCols,
    };
};

export default useGenerateScheduleAndStatTableColumns;
