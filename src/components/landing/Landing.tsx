import { useContext, useEffect } from 'react';
import useFetchCSVData from '../../api/FetchCSVData';
import { NavigationContext } from '../../context/NavigationProvider';
import { parseCsvSheetData } from '../../helpers/csvHelpers/parseCsvSheetData';
import SpiralDesign from './../../images/SpiralPlayersDesign.png';
import BackgroundAccentColor from './BackgroundAccentColor';
import BackgroundGrid from './BackgroundGrid';
import SnapshotStats from './SnapshotStats';

const Landing = () => {
    const { landingRef } = useContext(NavigationContext);
    const { fetchAndParseCsvData } = useFetchCSVData();
    const csvUrl: string = process.env.REACT_APP_WINTER_BUMP_2024_URL || '';

    useEffect(() => {
        fetchAndParseCsvData(csvUrl, parseCsvSheetData);
    }, []);

    return (
        <div ref={landingRef} id="landing" className="relative isolate overflow-hidden">
            <BackgroundGrid />
            <BackgroundAccentColor />
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
                <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 space-y-10">
                    <h1 className="mt-10 text-4xl font-bold tracking-wide text-white sm:text-6xl">
                        Olivia McKinney
                    </h1>

                    <SnapshotStats />
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <img
                            src={SpiralDesign}
                            alt="Intense Face"
                            className="w-[40rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
