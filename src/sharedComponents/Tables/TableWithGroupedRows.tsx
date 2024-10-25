import { ReactNode } from 'react';
import { Fragment } from 'react/jsx-runtime';
import ConditionalRender from '../ConditionalRender';

export type TableColumn = {
    key: string;
    name: string;
};

// type TableGroup = {
//     tournament: string;
//     location: string;
//     startDate: string;
//     endDate: string;
// } & GroupExtensions;

// type Matches = {
//     key: string;
//     opponent: string;
//     date: string;
//     result: string;
// };

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
// rows: Matches[];

// type GroupExtensions = {
//     render: () => ReactNode;
// };

type TableProps = {
    columns: TableColumn[];
    data: GroupTableData[];
    tableTitle?: string;
};

const TableWithGroupedRows = ({ columns, data, tableTitle = '' }: TableProps) => {
    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <ConditionalRender condition={tableTitle?.length > 0}>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-base font-semibold leading-6 text-gray-50">
                                {tableTitle}
                            </h1>
                        </div>
                    </div>
                </ConditionalRender>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-y-auto max-h-[600px]">
                                <table className="min-w-full">
                                    <thead
                                        className={['bg-gray-800', ' sticky top-0 z-20'].join(' ')}
                                    >
                                        <tr>
                                            {columns.map(column => (
                                                <th
                                                    key={column.key}
                                                    scope="col"
                                                    className={[
                                                        'text-gray-50',
                                                        'py-3.5 pl-4 pr-3 text-left text-sm lg:text-lg font-semibold  sm:pl-3',
                                                    ].join(' ')}
                                                >
                                                    {column.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {data &&
                                            data?.map(datum => (
                                                <Fragment key={datum.key}>
                                                    <tr
                                                        className={[
                                                            'border-t ',
                                                            'border-gray-950',
                                                        ].join(' ')}
                                                    >
                                                        <th
                                                            scope="colgroup"
                                                            colSpan={5}
                                                            className={[
                                                                'bg-gray-700',
                                                                'text-gray-50',
                                                                'py-2 pl-4 pr-3 text-left text-sm lg:text-lg font-semibold sm:pl-3 h-20 md:h-auto',
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
                                                                    ? 'border-gray-950'
                                                                    : 'border-gray-900',
                                                                'border-t',
                                                                'bg-gray-800',
                                                            ].join(' ')}
                                                        >
                                                            {columns.map(column => {
                                                                return (
                                                                    <td
                                                                        key={column.key}
                                                                        className={[
                                                                            'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-3',
                                                                            'text-gray-200',
                                                                        ].join(' ')}
                                                                    >
                                                                        {
                                                                            row.data[
                                                                                column.key as keyof typeof row
                                                                            ]
                                                                        }
                                                                    </td>
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
