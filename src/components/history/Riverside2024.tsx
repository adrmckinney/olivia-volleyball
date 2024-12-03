import playerOfTheWeek2024 from '../../assets/images/AthleteOfTheWeek2024.png';
import HistoryImagesContainer from './HistoryImagesContainer';

const Riverside2024 = () => {
    const images = [
        {
            src: playerOfTheWeek2024,
            caption: 'Player of the Week',
            shadowColor: 'shadow-purple-300',
        },
    ];

    return (
        <div className="space-y-8 pb-4">
            <p>
                Midway through the season, the team navigated a challenging Title IX investigation,
                which resulted in a transition to a new volunteer coaching staff. As a team captain,
                Olivia took on a leadership role by engaging with the athletic administrator and
                school principal to ensure clear and consistent communication between the
                administration and her teammates during this critical period.
            </p>
            <p>
                Despite the obstacles, Olivia’s determination and skill shone through. She finished
                the season ranked 3rd in her conference for both assists and aces, demonstrating her
                resilience and commitment to excellence on the court.
            </p>

            <HistoryImagesContainer imageData={images} />
        </div>
    );
};

export default Riverside2024;
