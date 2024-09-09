import axios from 'axios';
import { useState } from 'react';

const useFetchCSVData = () => {
    const [csvData, setCsvData] = useState<Record<string, unknown>[]>([]);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [parsedData, setParsedData] = useState([]);

    const fetchAndParseCsvData = async (
        csvUrl: string,
        parser: (csvString: string) => Record<string, unknown>[]
    ): Promise<string | Error> => {
        try {
            const response = await axios.get(csvUrl);
            setCsvData(response.data);
            /* eslint-disable @typescript-eslint/no-unused-vars */
            const parsed = parser(response.data);

            return response.data;
        } catch (error) {
            console.error('Error fetching CSV data:', JSON.stringify(error));
            return error as Error;
        }
    };

    return { fetchAndParseCsvData, csvData };
};

export default useFetchCSVData;
