import { useContext } from 'react';
import { NavigationContext } from '../../context/NavigationProvider';
import useGetFeatureFlags from '../../hooks/useGetFeatureFlags';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import SectionHeader from '../../sharedComponents/SectionHeader';
import Jammers2024ScheduleStats from './Jammers2024ScheduleStats';
import Jammers2025ScheduleStats from './Jammers2025ScheduleStats';

const SchedulesSection = () => {
    const { scheduleRef, hideNavBackground } = useContext(NavigationContext);
    const featureFlags = useGetFeatureFlags();
    return (
        <>
            <div
                ref={scheduleRef}
                id="schedule"
                className={[
                    'mx-auto mt-8 px-6 sm:mt-16 lg:scroll-m-20 lg:px-8 justify-center items-center pb-20 md:pb-0',
                    'max-w-[1600px]',
                ].join(' ')}
            >
                <SectionHeader title="Schedules and Stats" hideNavBackground={hideNavBackground} />
                <div className="space-y-0">
                    <ConditionalRender condition={featureFlags.FEATURE_JAMMERS_2025_SCHEDULE}>
                        <Jammers2025ScheduleStats />
                    </ConditionalRender>

                    <ConditionalRender condition={featureFlags.FEATURE_JAMMERS_2024_SCHEDULE}>
                        <Jammers2024ScheduleStats />
                    </ConditionalRender>
                </div>
            </div>
        </>
    );
};

export default SchedulesSection;
