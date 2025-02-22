import { AbbreviationKeys, Abbreviations } from '../../enums/Abbreviations';
import { TableColumn } from '../../sharedComponents/Tables/TableWithGroupedRows';
import ToolTip from '../../sharedComponents/ToolTip/ToolTip';
import { TableDataOptions } from '../../types/ScheduleStatsDataOptions';
import {
    FilterButtons,
    ScheduleColKeyNameMap,
    ScheduleColumnsToShow,
    StatFiltersKeyNameMap,
    SubFiltersToShow,
} from '../../types/ScheduleStatTableTypes';
import { StatFilterOptions } from '../../types/StatFilterOptions';

const useGenerateScheduleAndStatTableColumns = () => {
    const generateStatCols = (
        subFiltersToShow: Partial<SubFiltersToShow>,
        statFilter: StatFilterOptions,
        tableDataType: TableDataOptions
    ): TableColumn[] => {
        const columns: TableColumn[] = [{ key: `opponent`, name: 'Opponent', show: true }];

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

            const shouldShow = tableDataType === 'schedule' && show;

            if (!shouldShow) return;

            columns.push({ key, name: ScheduleColKeyNameMap[key], show: shouldShow });
        });
        return columns;
    };

    const generateStatFilters = (
        subFiltersToShow: SubFiltersToShow,
        filterFn: (string: keyof SubFiltersToShow) => void,
        statFilterState: StatFilterOptions
    ): FilterButtons[] => {
        const filters: FilterButtons[] = [];

        Object.keys(subFiltersToShow).forEach(key => {
            const typedKey = key as keyof SubFiltersToShow;
            const shouldShow = subFiltersToShow[typedKey]
                ? Object.values(subFiltersToShow[typedKey]).some(Boolean)
                : false;

            if (!shouldShow) return;

            filters.push({
                key: typedKey,
                name: StatFiltersKeyNameMap[typedKey],
                label: StatFiltersKeyNameMap[typedKey],
                fn: () => filterFn(typedKey),
                isActive: statFilterState === typedKey,
                show: shouldShow,
            });
        });

        return filters;
    };

    return { generateStatCols, generateScheduleCols, generateStatFilters };
};

export default useGenerateScheduleAndStatTableColumns;
