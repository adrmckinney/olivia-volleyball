import { useContext } from 'react';
import { NavigationContext } from '../../context/NavigationProvider';
import useLogWindowBreakpoint from '../../hooks/useLogWindowBreakpoint';
import SectionHeader from '../../sharedComponents/SectionHeader';

const stats = [
    { id: 0, name: 'Height', value: `5' 6"` },
    { id: 1, name: 'Standing Reach', value: '7\'2"' },
    { id: 2, name: 'Jump Approach', value: '8\'6"' },
    { id: 3, name: 'Block Approach', value: '8\'1"' },
];

const getLargeScreenNumberOfColumns = () => {
    if (stats.length === 3) return 'lg:grid-cols-3';
    if (stats.length === 4) return 'lg:grid-cols-4';
};

const getMediumScreenNumberOfColumns = () => {
    if (stats.length === 3) return 'md:grid-cols-3';
    if (stats.length === 4) return 'md:grid-cols-2';
};

const Stats = () => {
    const { statsRef, hideNavBackground } = useContext(NavigationContext);
    useLogWindowBreakpoint();

    return (
        <div
            ref={statsRef}
            id="stats"
            className="max-w-[1200px] ml-auto mr-auto mt-16 3xl:max-w-[1600px]"
        >
            <SectionHeader title="Stats" hideNavBackground={hideNavBackground} />
            <div className="flex justify-center">
                <dl
                    className={[
                        'mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-x-8 sm:gap-x-24 md:gap-x-44 lg:gap-x-36 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none',
                        getLargeScreenNumberOfColumns(),
                        getMediumScreenNumberOfColumns(),
                    ].join(' ')}
                >
                    {stats.map(stat => (
                        <div
                            key={stat.id}
                            className="flex flex-col gap-y-3 border-l border-white/10 pl-6"
                        >
                            <dt className="text-sm leading-6">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default Stats;
