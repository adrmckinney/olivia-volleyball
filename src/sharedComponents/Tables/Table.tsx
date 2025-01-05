// src/types/TableTypes.ts
export interface TableColumn {
    key: string;
    name: React.ReactNode;
    show?: boolean;
}

interface Data {
    key: string;
    data: { [key: string]: string | number };
    render?: () => ReactNode;
}

export interface TableProps {
    columns: TableColumn[];
    data: Data[];
    tableTitle?: string;
}

import React, { Fragment, ReactNode } from 'react';
import { colors } from '../../configs/colors';
import ConditionalRender from '../ConditionalRender';

const tableStyles = {
    headerCell: [
        'px-3 py-3.5 text-left text-sm lg:text-lg font-semibold sm:pl-3',
        colors.groupTableHeaderFont,
    ].join(' '),
    bodyCell: ['whitespace-nowrap px-3 py-4 text-sm', colors.groupTableRowFont].join(' '),
};

const Table = ({ columns, data, tableTitle = '' }: TableProps) => {
    const preparedCols = columns.map(col => ({
        ...col,
        show: col.show ?? true,
    }));

    return (
        <div className="px-1 sm:px-2 lg:px-0 w-full h-full">
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

            <div className="mt-1 md:mt-8 flow-root h-full">
                <div className="-mx-4 md:-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 h-full">
                        <div
                            className={[
                                'overflow-y-auto max-h-full border-4 rounded-lg',
                                colors.groupTableBorder,
                            ].join(' ')}
                        >
                            <table className="min-w-full">
                                <thead
                                    className={[
                                        colors.groupTableHeaderBackground,
                                        'sticky top-0 z-10',
                                    ].join(' ')}
                                >
                                    <tr>
                                        {preparedCols.map(column => (
                                            <ConditionalRender
                                                key={column.key}
                                                condition={column.show}
                                                isNullRender
                                                as="th"
                                            >
                                                <th scope="col" className={tableStyles.headerCell}>
                                                    {column.name}
                                                </th>
                                            </ConditionalRender>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className={[colors.groupTableBodyBackground].join(' ')}>
                                    {data.map((row, rowIndex) => {
                                        return row.render ? (
                                            <Fragment key={row.key}>{row.render()}</Fragment>
                                        ) : (
                                            <tr
                                                key={row.key || rowIndex}
                                                className={
                                                    rowIndex % 2 === 0
                                                        ? 'bg-gray-600'
                                                        : 'bg-gray-700'
                                                }
                                            >
                                                {preparedCols.map(column => (
                                                    <ConditionalRender
                                                        key={column.key}
                                                        condition={column.show}
                                                        isNullRender
                                                        as="td"
                                                    >
                                                        <td className={tableStyles.bodyCell}>
                                                            {row.data[column.key]}
                                                        </td>
                                                    </ConditionalRender>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
