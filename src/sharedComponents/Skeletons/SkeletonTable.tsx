import useGetWindowWidth from '../../hooks/useGetWindowWidth';
import { ButtonSize } from '../Buttons/BaseButton';

interface SkeletonTableProps {
    numberOfRows?: number;
    numberOfColumns?: number;
    loadingMessage?: string;
    autoCols?: boolean;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
    numberOfRows = 5,
    numberOfColumns = 4,
    loadingMessage = 'Loading data...',
    autoCols = false,
}) => {
    const { currentTailwindBreakpoint } = useGetWindowWidth();

    const autoColNum: Record<ButtonSize, number> = {
        xs: 3,
        sm: 3,
        md: 3,
        lg: 5,
        xl: 5,
        '2xl': 7,
        '3xl': 7,
        '4xl': 7,
        '5xl': 7,
    };

    const cols = autoCols ? autoColNum[currentTailwindBreakpoint] : numberOfColumns;

    const rows = Array.from({ length: numberOfRows }, (_, index) => index);
    const headers = Array.from({ length: cols }, (_, index) => index);

    const tableStyles = 'flex justify-between mb-4';

    return (
        <div
            role="status"
            className={['space-y-2.5 animate-pulse mx-auto', 'w-4/5 pt-6'].join(' ')}
        >
            {/* Table Header */}
            <div className={[tableStyles].join(' ')}>
                {headers.map((_, index) => (
                    <div
                        key={index}
                        className={[
                            `h-4 rounded bg-purple-300`,
                            index % 2 === 0 ? 'w-32' : 'w-20',
                        ].join(' ')}
                    ></div>
                ))}
            </div>

            {/* Table Rows */}
            {rows.map((_, rowIndex) => (
                <div key={rowIndex} className={[tableStyles].join(' ')}>
                    {headers.map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className={[
                                `h-4 rounded bg-purple-200`,
                                colIndex % 2 === 0 ? 'w-32' : 'w-20',
                            ].join(' ')}
                        ></div>
                    ))}
                </div>
            ))}

            {/* Loading Message */}
            <p className="text-gray-500 mt-4 text-center">{loadingMessage}</p>
        </div>
    );
};

export default SkeletonTable;
