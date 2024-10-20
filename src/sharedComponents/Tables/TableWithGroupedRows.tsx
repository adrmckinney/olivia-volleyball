import { Fragment } from 'react/jsx-runtime';
import ConditionalRender from '../ConditionalRender';

type TableColumn = {
    key: string;
    name: string;
};

type TableGroup = {
    tournament: string;
    location: string;
    startDate: string;
    endDate: string;
};

type Matches = {
    key: string;
    opponent: string;
    date: string;
    result: string;
};

type TableData = {
    key: string;
    group: TableGroup;
    matches: Matches[];
};

type TableProps = {
    columns: TableColumn[];
    data: TableData[];
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
                                        className={[
                                            //   'bg-white',
                                            'bg-gray-800',
                                            ' sticky top-0 z-20',
                                        ].join(' ')}
                                    >
                                        <tr>
                                            {columns.map(column => (
                                                <th
                                                    key={column.key}
                                                    scope="col"
                                                    className={[
                                                        //   'text-gray-900',
                                                        'text-gray-50',
                                                        'py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-3',
                                                    ].join(' ')}
                                                >
                                                    {column.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {data?.map(datum => (
                                            <Fragment key={datum.key}>
                                                <tr
                                                    className={[
                                                        'border-t ',
                                                        //   'border-gray-200',
                                                        'border-gray-950',
                                                    ].join(' ')}
                                                >
                                                    <th
                                                        scope="colgroup"
                                                        colSpan={5}
                                                        className={[
                                                            // 'bg-gray-50',
                                                            // 'text-gray-900',
                                                            'bg-gray-700',
                                                            'text-gray-50',
                                                            'py-2 pl-4 pr-3 text-left text-sm font-semibold sm:pl-3',
                                                            'sticky top-[44px] z-10', // Adjust `top` value as per table header height
                                                        ].join(' ')}
                                                    >
                                                        <div className="flex space-x-4">
                                                            <p>{datum.group.tournament}</p>
                                                            <p>|</p>
                                                            <p>{datum.group.location}</p>
                                                            <p>|</p>
                                                            <p>
                                                                {datum.group.startDate} -{' '}
                                                                {datum.group.endDate}
                                                            </p>
                                                        </div>
                                                    </th>
                                                </tr>
                                                {datum.matches.map((match, matchIdx) => (
                                                    <tr
                                                        key={match.key}
                                                        className={[
                                                            matchIdx === 0
                                                                ? // ? 'border-gray-300'
                                                                  'border-gray-950'
                                                                : // : 'border-gray-200',
                                                                  'border-gray-900',
                                                            'border-t',
                                                            'bg-gray-800',
                                                        ].join(' ')}
                                                    >
                                                        <td
                                                            className={[
                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-3',
                                                                //   'text-gray-900',
                                                                'text-gray-50',
                                                            ].join(' ')}
                                                        >
                                                            {match.opponent}
                                                        </td>
                                                        <td
                                                            className={[
                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-3',
                                                                //   'text-gray-900',
                                                                'text-gray-200',
                                                            ].join(' ')}
                                                        >
                                                            {match.date}
                                                        </td>
                                                        <td
                                                            className={[
                                                                'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-3',
                                                                //   'text-gray-900',
                                                                'text-gray-200',
                                                            ].join(' ')}
                                                        >
                                                            {match.result}
                                                        </td>
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
