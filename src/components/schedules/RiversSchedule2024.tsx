import useGetMaxPrepSchedule from '../../api/useGetMaxPrepSchedule';
import PrimaryButton from '../../sharedComponents/Buttons/PrimaryButton';

const RiversSchedule2024 = () => {
    const { getMaxPrepSchedule } = useGetMaxPrepSchedule({ autoFetch: false });

    const handleFetchSchedule = () => {
        const response = getMaxPrepSchedule();
        console.log('response', response);
    };

    return (
        <div>
            <h1>Volleyball Schedule</h1>
            <PrimaryButton onClick={handleFetchSchedule}>Fetch Schedule</PrimaryButton>
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
