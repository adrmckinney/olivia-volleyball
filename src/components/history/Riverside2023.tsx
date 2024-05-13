import MostImproved from './../../images/MostImprovedPortrait.jpeg';

const Riverside2023 = () => {
    return (
        <>
            <div className="flex space-x-4">
                <p className="mt-8">
                    During my Sophomore year at Riverside, I received the player of the year award.
                </p>
                <img
                    src={MostImproved}
                    alt="Most improved player portrait"
                    className="w-64 rounded-md bg-white shadow-2xl ring-1 ring-white/10"
                />
            </div>
        </>
    );
};

export default Riverside2023;
