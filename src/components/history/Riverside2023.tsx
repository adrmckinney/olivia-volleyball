import { themes } from '../../configs/themes';
import MostImproved from './../../images/MostImprovedPortrait.jpeg';
import PlayerOfTheGame from './../../images/PlayerOfTheGameOne.jpeg';
import HistoryImageWithCaption from './HistoryImageWithCaption';

const Riverside2023 = () => {
    return (
        <div className="space-y-8">
            <p className={[themes.mobileHistoryBody].join(' ')}>
                During her sophomore year at Riverside high school, Olivia played backrow setter.
            </p>

            <HistoryImageWithCaption src={PlayerOfTheGame} caption="Player of the Match" />

            <HistoryImageWithCaption src={MostImproved} caption="Most Improved" />
        </div>
    );
};

export default Riverside2023;
