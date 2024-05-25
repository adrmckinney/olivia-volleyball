import MostImproved from './../../images/MostImprovedPortrait.jpeg';
import PlayerOfTheGame from './../../images/PlayerOfTheGameOne.jpeg';

const Riverside2023 = () => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <p className="mt-8">Player of the Game</p>
                <img
                    src={PlayerOfTheGame}
                    alt="Most improved player portrait"
                    className="w-64 rounded-md bg-white shadow-2xl ring-1 ring-white/10"
                />
            </div>
            <div className="flex justify-between">
                <p className="mt-8">Player of the Year</p>
                <img
                    src={MostImproved}
                    alt="Most improved player portrait"
                    className="w-64 rounded-md bg-white shadow-2xl ring-1 ring-white/10"
                />
            </div>
        </div>
    );
};

export default Riverside2023;
