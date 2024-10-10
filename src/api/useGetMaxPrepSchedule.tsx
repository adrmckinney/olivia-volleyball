import axios from 'axios';
import { useEffect, useState } from 'react';
import { maxPrepLoginCredentials } from '../utils/constants';

export type GameStatus =
    | 'Conference Game'
    | 'Playoffs'
    | 'Tournament'
    | 'Non-Conference Game'
    | (string & {});

type Response = {
    teamStats: TeamStatsReturn;
    teamSchedule: TeamScheduleReturn[];
};

type TeamStatsReturn = {
    overallWinLose: string;
    overallPercentage: string;
    conferenceWinLose: string;
    conferenceRank: string;
};

type TeamScheduleReturn = {
    date: string;
    gameStatus: GameStatus;
    isHomeGame: boolean;
    opponent: {
        name: string;
        img: string;
    };
    final: {
        result: string;
        score: string;
    };
    time: string;
};

const initialScheduleValues = {
    teamStats: {
        overallWinLose: '',
        overallPercentage: '',
        conferenceWinLose: '',
        conferenceRank: '',
    },
    teamSchedule: [
        {
            date: '',
            gameStatus: '',
            isHomeGame: true,
            opponent: {
                name: '',
                img: '',
            },
            final: {
                result: '',
                score: '',
            },
            time: '',
        },
    ],
};

type Props = {
    autoFetch?: boolean;
};

const useGetMaxPrepSchedule = ({ autoFetch = true }: Props) => {
    const [schedule, setSchedule] = useState<Response>(initialScheduleValues);
    const getMaxPrepSchedule = () => {
        axios
            .get(
                `http://localhost:3000/api/scrape/volleyball?email=${maxPrepLoginCredentials.email}&password=${maxPrepLoginCredentials.password}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                    },
                }
            )
            .then(res => {
                console.log('res.data', res.data);
                setSchedule(res.data);
                return res.data;
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    useEffect(() => {
        if (autoFetch) {
            let ignore = false;

            if (!ignore) {
                getMaxPrepSchedule();
            }

            return () => {
                ignore = true;
            };
        }
    }, []);

    return { schedule, getMaxPrepSchedule };
};

export default useGetMaxPrepSchedule;
