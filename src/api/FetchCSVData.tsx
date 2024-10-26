import axios from 'axios';
import { useEffect, useState } from 'react';

export type DataObject<T> = T;

type Props<T> = {
    autoFetch?: boolean;
    url?: string;
    parser?: (csvString: string) => DataObject<T>[] | DataObject<T>;
};

const useFetchCSVData = <T,>({ autoFetch = true, url = '', parser = () => [] }: Props<T>) => {
    const [parsedData, setParsedData] = useState<DataObject<T>[] | DataObject<T>>();
    const [, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(autoFetch);

    const fetchAndParseCsvData = async (
        csvUrl: string,
        parser: (csvString: string) => DataObject<T>[] | DataObject<T>
    ) => {
        if (!autoFetch) setLoading(true);

        try {
            const response = await axios.get(csvUrl);
            const parsed = parser(response.data);
            if (!autoFetch) {
                setParsedData(parsed);
                setError(null);
                setLoading(false);
            } else {
                return parsed;
            }
        } catch (error) {
            if (!autoFetch) {
                console.error('Error fetching CSV data:', JSON.stringify(error));
                setError(error as Error);
                setLoading(false);
            } else {
                throw error;
            }
        }
    };

    useEffect(() => {
        if (autoFetch) {
            let ignore = false;

            fetchAndParseCsvData(url, parser)
                .then(res => {
                    if (!ignore) {
                        setParsedData(res);
                        setError(null);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    if (!ignore) {
                        console.error('Error fetching CSV data:', JSON.stringify(error));
                        setError(error as Error);
                        setLoading(false);
                    }
                });

            return () => {
                ignore = true;
            };
        }
    }, []);

    return { fetchAndParseCsvData, parsedData, loading };
};

export default useFetchCSVData;
