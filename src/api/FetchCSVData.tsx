import axios from 'axios';
import { useState } from 'react';

const useFetchCSVData = () => {
    const [csvData, setCsvData] = useState<Record<string, any>[]>([]);
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const [parsedData, setParsedData] = useState([]);

    const fetchAndParseCsvData = async (
        csvUrl: string,
        parser: (csvString: string) => Record<string, any>[]
    ): Promise<string | Error> => {
        try {
            const response = await axios.get(csvUrl);
            setCsvData(response.data);

            const parsed = parser(response.data);
            console.log('parsed', parsed);

            return response.data;
        } catch (error) {
            console.error('Error fetching CSV data:', JSON.stringify(error));
            return error as Error;
        }
    };

    return { fetchAndParseCsvData, csvData };
};

export default useFetchCSVData;
