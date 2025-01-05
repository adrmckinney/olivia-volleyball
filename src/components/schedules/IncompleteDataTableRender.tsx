import { colors } from '../../configs/colors';
import { ScheduleStatuses } from '../../enums/ScheduleStatuses';
import { StatsStatuses, StatStatuses } from '../../enums/StatsStatuses';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import {
    groupTableDataStyles,
    RowData,
    TableColumn,
} from '../../sharedComponents/Tables/TableWithGroupedRows';

type Props = {
    row: RowData;
    rowIndex: number;
    columns: TableColumn[];
    rowClassName?: string;
};

const IncompleteDataTableRender = ({ row, rowIndex, columns, rowClassName = '' }: Props) => {
    const isStats = 'statsStatus' in row;
    const hasOpponentName =
        row.opponent !== 'TBD' && typeof row.opponent === 'string' && row.opponent.length > 0;

    return (
        <tr
            key={`${row.key}-${rowIndex}`}
            className={[
                rowIndex === 0 ? colors.groupTableFirstRowBorder : colors.groupTableRowBorder,
                'border-t',
                !rowClassName.length ? colors.groupTableRowBackground : rowClassName,
            ].join(' ')}
        >
            <td colSpan={columns.length} className={groupTableDataStyles}>
                <span className={['flex w-full'].join(' ')}>
                    <ConditionalRender condition={hasOpponentName} isNullRender>
                        <p className="text-start flex-1">{row.opponent}</p>
                    </ConditionalRender>
                    <p
                        className={['flex-1', hasOpponentName ? 'text-start' : 'text-center'].join(
                            ' '
                        )}
                    >
                        {isStats
                            ? StatsStatuses[row.statsStatus as keyof StatStatuses]?.message
                            : ScheduleStatuses[row.matchStatus as keyof ScheduleStatuses]?.message}
                    </p>
                </span>
            </td>
        </tr>
    );
};

export default IncompleteDataTableRender;
