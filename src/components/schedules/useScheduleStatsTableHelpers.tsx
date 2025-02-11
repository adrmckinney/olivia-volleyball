import dayjs from 'dayjs';
import { Abbreviations } from '../../enums/Abbreviations';
import { ScheduleStatuses } from '../../enums/ScheduleStatuses';
import { StatsStatuses } from '../../enums/StatsStatuses';
import { Group } from '../../helpers/csvHelpers/parseScheduleSheet';
import {
    GroupTableData,
    RowData,
    TableColumn,
    TableDataRow,
    TableGroup,
} from '../../sharedComponents/Tables/TableWithGroupedRows';
import { TableDataOptions } from '../../types/ScheduleStatsDataOptions';
import { StatFilterOptions } from '../../types/StatFilterOptions';
import GroupDataTableRender from './GroupDataTableRender';
import IncompleteDataTableRender from './IncompleteDataTableRender';

type HasKey = {
    key: string; // Each Datum must have a key
};

type PrepareGroupTableProps<T> = {
    data: T[];
    groupKey?: keyof T;
    rowLevelDataKey: keyof T;
    dataType: TableDataOptions;
    statFilter?: StatFilterOptions;
    columns: TableColumn[];
};

type PrepareTableProps<T> = {
    data: T[];
    groupKey?: keyof T;
    rowLevelDataKey: keyof T;
    dataType: TableDataOptions;
    statFilter?: StatFilterOptions;
    columns: TableColumn[];
};

const useScheduleStatsTableHelpers = () => {
    const groupRender = (group: Group) => <GroupDataTableRender group={group} />;

    // This is for incomplete data, both schedule and stats
    const dataRender = (row: RowData, rowIndex: number, columns: TableColumn[]) => (
        <IncompleteDataTableRender row={row} rowIndex={rowIndex} columns={columns} />
    );

    const prepareGroupTableData = <T extends HasKey>({
        data,
        groupKey = 'group' as keyof T,
        rowLevelDataKey,
        dataType,
        statFilter,
        columns,
    }: PrepareGroupTableProps<T>): GroupTableData[] => {
        const sortedData = data.sort((a, b) => {
            const dateA = dayjs((b[groupKey] as { startDate: string }).startDate).valueOf();
            const dateB = dayjs((a[groupKey] as { startDate: string }).startDate).valueOf();
            return dateB - dateA;
        });
        return sortedData.map((datum: T) => {
            const groupData = datum[groupKey];

            const newGroup: TableGroup = {
                render: () => groupRender(groupData as Group),
                data: {
                    value: String(groupData),
                },
            };

            const rows = prepareRowData(
                datum,
                columns,
                rowLevelDataKey,
                dataType,
                statFilter as StatFilterOptions
            );

            return {
                key: datum.key,
                group: newGroup,
                rows,
            };
        });
    };

    const prepareTableData = <T extends HasKey>({
        data,
        rowLevelDataKey,
        dataType,
        statFilter,
        columns,
    }: PrepareTableProps<T>) => {
        const allRows: TableDataRow[] = [];
        data?.forEach(datum => {
            const [row] = prepareRowData(
                datum,
                columns,
                rowLevelDataKey,
                dataType,
                statFilter as StatFilterOptions
            );

            allRows.push(row);
        });
        return allRows;
    };

    const prepareRowData = <T,>(
        datum: T,
        columns: TableColumn[],
        rowLevelDataKey: keyof T,
        dataType: TableDataOptions,
        statFilter: StatFilterOptions
    ): TableDataRow[] => {
        console.log('columns in prepare', columns);
        const statKeys = statFilter
            ? Object.keys(Abbreviations).filter(key => {
                  return Abbreviations[key as keyof typeof Abbreviations].type === statFilter;
              })
            : [];
        return (datum[rowLevelDataKey] as Array<Record<string, string | number>>).map(
            (row, rowIndex) => {
                const isScheduleAndNotComplete =
                    'matchStatus' in row &&
                    row.matchStatus !== ScheduleStatuses.complete.type.toLowerCase();

                const isStatsAndNotComplete =
                    'statsStatus' in row &&
                    row.statsStatus !== StatsStatuses.complete.type.toLowerCase();

                const renderCondition =
                    (dataType === 'schedule' && isScheduleAndNotComplete) ||
                    (dataType === 'stats' && isStatsAndNotComplete);

                const filteredStats =
                    statFilter && dataType === 'stats'
                        ? Object.keys(row)
                              .filter(
                                  key =>
                                      ['opponent', 'statsStatus', 'key', 'setsPlayed'].includes(
                                          key
                                      ) || statKeys.includes(key)
                              )
                              .reduce(
                                  (acc, key) => {
                                      acc[key] = row[key];
                                      return acc;
                                  },
                                  {} as Record<string, string | number>
                              )
                        : row;

                return {
                    key: row.key as string,
                    data: filteredStats,
                    ...(renderCondition
                        ? { render: () => dataRender(row as RowData, rowIndex, columns) }
                        : {}),
                };
            }
        );
    };

    return { prepareTableData, prepareGroupTableData };
};

export default useScheduleStatsTableHelpers;
