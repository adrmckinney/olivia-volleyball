import { ReactNode } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { colors } from '../../configs/colors';
import ConditionalRender from '../ConditionalRender';

export type TableColumn = {
    key: string;
    name: string;
    show?: boolean;
};

export type TableGroup = {
    render?: () => ReactNode;
    data: {
        value: string | number;
    };
};

export type TableDataRow = {
    key: string;
    render?: () => ReactNode;
    data: {
        [key: string]: string | number;
    };
};

export type GroupTableData = {
    key: string;
    group: TableGroup;
    rows: TableDataRow[];
};

type TableProps = {
    columns: TableColumn[];
    data: GroupTableData[];
    tableTitle?: string;
};

const TableWithGroupedRows = ({ columns, data, tableTitle = '' }: TableProps) => {
    const preparedCols = columns.map(col => ({
        ...col,
        show: col.show ?? true,
    }));

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <ConditionalRender condition={tableTitle?.length > 0} isNullRender>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1
                                className={[
                                    'text-base font-semibold leading-6',
                                    colors.groupTableTitleFont,
                                ].join(' ')}
                            >
                                {tableTitle}
                            </h1>
                        </div>
                    </div>
                </ConditionalRender>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div
                                className={[
                                    'overflow-y-auto max-h-[600px] border-4 rounded-lg',
                                    colors.groupTableBorder,
                                ].join(' ')}
                            >
                                <table className="min-w-full ">
                                    <thead
                                        className={[
                                            colors.groupTableHeaderBackground,
                                            ' sticky top-0 z-20',
                                        ].join(' ')}
                                    >
                                        <tr>
                                            {preparedCols.map(column => (
                                                <ConditionalRender
                                                    key={column.key}
                                                    condition={column.show}
                                                    isNullRender
                                                    as={'th'}
                                                >
                                                    <th
                                                        key={column.key}
                                                        scope="col"
                                                        className={[
                                                            colors.groupTableHeaderFont,
                                                            'py-3.5 pl-4 pr-3 text-left text-sm lg:text-lg font-semibold  sm:pl-3',
                                                        ].join(' ')}
                                                    >
                                                        {column.name}
                                                    </th>
                                                </ConditionalRender>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className={[colors.groupTableBodyBackground].join(' ')}>
                                        {data &&
                                            data?.map(datum => (
                                                <Fragment key={datum.key}>
                                                    <tr
                                                        className={[
                                                            'border-t ',
                                                            colors.groupTableGroupRowBorder,
                                                        ].join(' ')}
                                                    >
                                                        <th
                                                            scope="colgroup"
                                                            colSpan={columns.length}
                                                            className={[
                                                                colors.groupTableGroupRowBackground,
                                                                colors.groupTableGroupFont,
                                                                'py-2 pl-4 pr-3 text-left text-sm lg:text-lg font-semibold sm:pl-3 h-20 ',
                                                                'md:h-auto',
                                                                'sticky top-[44px] md:top-[54px] z-10',
                                                            ].join(' ')}
                                                        >
                                                            {datum.group.render ? (
                                                                datum.group.render()
                                                            ) : (
                                                                <p className="px-4">
                                                                    {datum.group.data.value}
                                                                </p>
                                                            )}
                                                        </th>
                                                    </tr>
                                                    {datum.rows.map((row, rowIndex) => (
                                                        <tr
                                                            key={row.key}
                                                            className={[
                                                                rowIndex === 0
                                                                    ? colors.groupTableFirstRowBorder
                                                                    : colors.groupTableRowBorder,
                                                                'border-t',
                                                                colors.groupTableRowBackground,
                                                            ].join(' ')}
                                                        >
                                                            {preparedCols.map(column => {
                                                                return (
                                                                    <ConditionalRender
                                                                        key={column.key}
                                                                        as={'td'}
                                                                        isNullRender
                                                                        condition={column.show}
                                                                    >
                                                                        <td
                                                                            key={column.key}
                                                                            className={[
                                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-3',
                                                                                colors.groupTableRowFont,
                                                                            ].join(' ')}
                                                                        >
                                                                            {
                                                                                row.data[
                                                                                    column.key as keyof typeof row
                                                                                ]
                                                                            }
                                                                        </td>
                                                                    </ConditionalRender>
                                                                );
                                                            })}
                                                        </tr>
                                                    ))}
                                                </Fragment>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TableWithGroupedRows;
