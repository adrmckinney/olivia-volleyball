import axios from 'axios';
import { useEffect, useState } from 'react';
import { maxPrepLoginCredentials } from '../../utils/constants';

interface Game {
    [key: number]: string;
}

const RiversSchedule2024 = () => {
    const [schedule, setSchedule] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSchedule() {
            try {
                const response = await axios.get<Game[]>(
                    `http://localhost:3000/api/scrape/volleyball?email=${maxPrepLoginCredentials.email}&password=${maxPrepLoginCredentials.password}`
                );
                setSchedule(response.data);
            } catch (error) {
                setError('Failed to fetch schedule. Please try again later.');
                console.error('Error fetching schedule:', error);
            }
        }

        fetchSchedule();
    }, []);

    console.log('schedule', schedule);
    return (
        <div>
            <h1>Volleyball Schedule</h1>
            {/* {error && <p>{error}</p>}
            <ul>
                {schedule.map((game, index) => (
                    <li key={index}>{game.join(' - ')}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default RiversSchedule2024;
