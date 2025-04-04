import { useContext } from 'react';
import useFetchCSVData from '../../api/FetchCSVData';
import portrait2024Cut from '../../assets/images/Portrait2024Cut.png';
import { themes } from '../../configs/themes';
import { NavigationContext } from '../../context/NavigationProvider';
import { parseCsvSheetData } from '../../helpers/csvHelpers/parseCsvSheetData';
import useGetWindowWidth from '../../hooks/useGetWindowWidth';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import BackgroundAccentColor from './BackgroundAccentColor';
import BackgroundGrid from './BackgroundGrid';
import SnapshotStats from './SnapshotStats';

const Landing = () => {
    const { landingRef } = useContext(NavigationContext);
    const url: string = import.meta.env.VITE_JAMMERS_2024_URL || '';
    useFetchCSVData({ url, parser: parseCsvSheetData });
    const { currentTailwindBreakpoint } = useGetWindowWidth();

    const renderImage = () => {
        return (
            <div className="mx-auto mt-0 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                <img
                    src={portrait2024Cut}
                    alt="portrait"
                    className={[
                        'w-[40rem] rounded-md',
                        'bg-transparent',
                        'shadow-2xl',
                        'ring-0',
                        'ring-white/10',
                    ].join(' ')}
                />
            </div>
        );
    };

    return (
        <div ref={landingRef} id="landing" className="relative isolate overflow-hidden">
            <BackgroundGrid />
            <BackgroundAccentColor />
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-40 lg:flex lg:px-8 lg:pt-40">
                <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 space-y-10">
                    <h1 className={['mt-10 lg:mb-28', themes.headerOne].join(' ')}>
                        Olivia McKinney
                    </h1>

                    <ConditionalRender condition={currentTailwindBreakpoint === 'sm'}>
                        {renderImage()}
                    </ConditionalRender>

                    <SnapshotStats />
                </div>
                <ConditionalRender condition={currentTailwindBreakpoint !== 'sm'}>
                    {renderImage()}
                </ConditionalRender>
            </div>
        </div>
    );
};

export default Landing;
