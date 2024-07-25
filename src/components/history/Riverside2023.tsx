import MostImproved from './../../images/MostImprovedPortrait.jpeg';
import PlayerOfTheGame from './../../images/PlayerOfTheGameOne.jpeg';

const Riverside2023 = () => {
    return (
        <div className="space-y-4">
            <p>During her sophomore year at Riverside high school, Olivia played backrow setter.</p>
            <div className="flex justify-between pt-4">
                <p className="mt-8">Player of the Match</p>
                <img
                    src={PlayerOfTheGame}
                    alt="Most improved player portrait"
                    className={[
                        'w-64 rounded-md',
                        // 'bg-white',
                        'shadow-2xl ring-1 ring-white/10',
                    ].join(' ')}
                />
            </div>
            <div className="flex justify-between">
                <p className="mt-8">Most Improved</p>
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
