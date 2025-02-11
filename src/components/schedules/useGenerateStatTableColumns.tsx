import { StatFilterOptions } from '../../types/StatFilterOptions';

const useGenerateStatTableColumns = () => {
    const generateStatCols = (colType: StatFilterOptions) => {
        const types = colType;
        console.log('types', types);
    };

    return {
        generateStatCols,
    };
};

export default useGenerateStatTableColumns;
