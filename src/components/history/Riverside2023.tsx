import mostImprovedPlayer from '../../assets/images/mostImprovedPlayer.jpeg';
import playerOfTheMatch2023 from '../../assets/images/playerOfTheMatch2023.jpeg';
import HistoryImagesContainer from './HistoryImagesContainer';

const Riverside2023 = () => {
    const images = [
        {
            src: playerOfTheMatch2023,
            caption: 'Player of the Match',
            shadowColor: 'shadow-purple-300',
        },
        {
            src: mostImprovedPlayer,
            caption: 'Most Improved',
            shadowColor: 'shadow-purple-300',
        },
    ];

    return (
        <div className="space-y-8 pb-4">
            <p>
                During her sophomore year at Riverside high school, Olivia played backrow setter for
                JV. Near the end of the season, Olivia was moved up to play varsity for a match.
            </p>

            <HistoryImagesContainer imageData={images} />
        </div>
    );
};

export default Riverside2023;
