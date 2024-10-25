import { ReactNode } from 'react';
import {
    GroupTableData,
    TableDataRow,
    TableGroup,
} from '../sharedComponents/Tables/TableWithGroupedRows';

interface HasKey {
    key: string; // Each datum must have a key property
}

interface Props<T extends HasKey, G> {
    data: T[];
    groupRender: (group: G) => ReactNode; // Ensure groupRender gets a Group type
    groupKey?: keyof T; // groupKey is typed as one of the keys of T
    rowLevelDataKey: keyof T; // rowLevelDataKey is also a key of T
}

export const prepareGroupTableData = <T extends HasKey, G>({
    data,
    groupRender,
    groupKey = 'group' as keyof T, // Default groupKey to 'group'
    rowLevelDataKey,
}: Props<T, G>): GroupTableData[] => {
    return data.map((datum: T) => {
        const groupData = datum[groupKey] as G;

        const newGroup: TableGroup = {
            render: () => groupRender(groupData), // Render function for the group
            data: {
                // I will need to fine tune this. This is used by the table if render is not
                // provided in this newGroup object. Render demands that JSX be provided. Using
                // This value param will use the JSX that is already in the table. It will just
                // render this one value as the group header. Currently, this won't work.
                value: String(groupData), // Assuming the `group` contains a string or number
            },
        };

        // Mapping rows and wrapping them into the `TableDataRow` structure
        const rows: TableDataRow[] = (
            datum[rowLevelDataKey] as Array<Record<string, string | number>>
        ).map(row => ({
            key: row.key as string, // Assuming row has a `key` field
            data: row, // Using the dynamic data in the `data` field
        }));

        return {
            key: datum.key,
            group: newGroup,
            rows,
        };
    });
};
