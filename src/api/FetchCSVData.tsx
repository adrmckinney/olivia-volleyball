import axios from 'axios';
import { useState } from 'react';

// export type CSVData<T = { [key: string]: string }> = T;
export type CSVData<T> = T;

const useFetchCSVData = <T,>() => {
    const [csvData, setCsvData] = useState<CSVData<T>[]>([]);
    // const [csvData, setCsvData] = useState<Record<string, unknown>[]>([]);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [parsedData, setParsedData] = useState<CSVData<T>[]>();

    const fetchAndParseCsvData = async (
        csvUrl: string,
        parser: (csvString: string) => CSVData<T>[]
        // parser: (csvString: string) => Record<string, unknown>[]
    ): Promise<T[] | Error> => {
        try {
            const response = await axios.get(csvUrl);
            setCsvData(response.data);
            /* eslint-disable @typescript-eslint/no-unused-vars */
            const parsed = parser(response.data);
            setParsedData(parsed);
            return parsed;
        } catch (error) {
            console.error('Error fetching CSV data:', JSON.stringify(error));
            return error as Error;
        }
    };

    return { fetchAndParseCsvData, csvData, parsedData };
};

export default useFetchCSVData;
