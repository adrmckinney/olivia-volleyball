import { ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dsaBulldog from '../../assets/images/dsaBulldog.png';
import jammers from '../../assets/images/jammers.png';
import triangle from '../../assets/images/trianglevbLogo.png';
import usmcVolleyballLogo from '../../assets/images/usmcVolleyballLogo.png';
import { NavigationContext } from '../../context/NavigationProvider';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import SectionHeader from '../../sharedComponents/SectionHeader';
import DSA from './DSA';
import HistoryDetails from './HistoryDetails';
import HistoryTransition from './HistoryTransition';
import Jammers2024 from './Jammers2024';
import JammersClinics2024 from './JammersClinics2024';
import LargerScreenHistorySelector from './LargerScreenHistorySelector';
import Riverside2023 from './Riverside2023';
import Riverside2024 from './Riverside2024';
import SmallerScreenHistorySelector from './SmallerScreenHistorySelector';
import Triangle from './Triangle';
import Usmc2024 from './Usmc2024';

export type HistoryDataType = {
    id: string;
    type: string;
    organization: {
        name: string;
        href: string;
    };
    grade?: string;
    imageUrl: string;
    comment: string;
    date: string;
    key: SelectedHistory;
    detailComponent: ReactNode;
};

const riversideIcon = 'https://nchslogos.com/wp-content/uploads/2023/04/Riverside_Pirates.png';

export type SelectedHistory =
    | 'dsa'
    | 'triangle'
    | 'riverside2023'
    | 'jammers2024'
    | 'jammersClinics2024'
    | 'riverside2024'
    | 'usmc2024';

const History = () => {
    const { historyRef, hideNavBackground } = useContext(NavigationContext);
    const [selectedHistory, setSelectedHistory] = useState<SelectedHistory>('dsa');
    const handleSelection = (selection: SelectedHistory) => {
        setSelectedHistory(selection);
    };

    const history: HistoryDataType[] = [
        {
            id: uuidv4(),
            type: 'primary',
            organization: { name: 'Durham School of the Arts', href: '#' },
            grade: '9th',
            imageUrl: dsaBulldog,
            comment: 'JV',
            date: 'Fall 2022',
            key: 'dsa',
            detailComponent: <DSA />,
        },
        {
            id: uuidv4(),
            type: 'primary',
            organization: { name: 'Triangle Volleyball Club Clinics', href: '#' },
            imageUrl: triangle,
            comment: 'Skills Clinic',
            date: 'Spring 2023', // 'April 16, 23, 30, May 7, 2023'
            key: 'triangle',
            detailComponent: <Triangle />,
        },
        {
            id: uuidv4(),
            type: 'primary',
            organization: { name: 'Riverside High School', href: '#' },
            grade: '10th',
            imageUrl: riversideIcon,
            comment: 'JV',
            date: 'Fall 2023',
            key: 'riverside2023',
            detailComponent: <Riverside2023 />,
        },
        {
            id: uuidv4(),
            type: 'primary',
            organization: { name: 'Jammers Club Volleyball', href: '#' },
            grade: '15U',
            imageUrl: jammers,
            comment: 'Red',
            date: 'Spring 2024',
            key: 'jammers2024',
            detailComponent: <Jammers2024 />,
        },
        {
            id: uuidv4(),
            type: 'primary',
            organization: { name: 'Jammers Club Clinics', href: '#' },
            grade: '15U',
            imageUrl: jammers,
            comment: 'Red',
            date: 'Spring 2024',
            key: 'jammersClinics2024',
            detailComponent: <JammersClinics2024 />,
        },
        {
            id: uuidv4(),
            type: 'primary',
            organization: { name: 'Riverside High School', href: '#' },
            grade: '11th',
            imageUrl: riversideIcon,
            comment: 'Varsity',
            date: 'Fall 2024',
            key: 'riverside2024',
            detailComponent: <Riverside2024 />,
        },
        {
            id: uuidv4(),
            type: 'primary',
            organization: { name: 'USMC Volleyball Camp', href: '#' },
            grade: '11th',
            imageUrl: usmcVolleyballLogo,
            comment: 'Varsity',
            date: 'Fall 2024',
            key: 'usmc2024',
            detailComponent: <Usmc2024 />,
        },
    ];

    return (
        <>
            <div
                ref={historyRef}
                id="history"
                className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:scroll-m-20 lg:px-8 justify-center items-center pb-20 md:pb-0"
            >
                <SectionHeader title="Athletic History" hideNavBackground={hideNavBackground} />

                <div
                    className={[
                        'mx-auto grid max-w-2xl grid-cols-1 gap-y-16 lg:mx-0 lg:max-w-none lg:items-start lg:gap-y-10',
                        'lg:grid-cols-5',
                    ].join(' ')}
                >
                    {/* Timeline */}
                    <ul className="-mb-8 lg:ml-10 lg:pl-4 lg:sticky lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:overflow-hidden">
                        {history.map((historyItem, idx, array) => (
                            <div key={historyItem.key}>
                                {/* Larger Screen Selectors */}
                                <div className="hidden lg:block">
                                    <LargerScreenHistorySelector
                                        historyItem={historyItem}
                                        handleSelection={handleSelection}
                                        isSelected={selectedHistory === historyItem.key}
                                        isLastItem={idx === array.length - 1}
                                    />
                                </div>

                                {/* Smaller Screen Selectors */}
                                <div className="pt-2 lg:hidden">
                                    <SmallerScreenHistorySelector
                                        historyItem={historyItem}
                                        handleSelection={handleSelection}
                                        historyContent={historyItem.detailComponent}
                                    />
                                </div>
                            </div>
                        ))}
                    </ul>

                    {/* Details Larger Screen */}
                    <div
                        className={[
                            'hidden lg:col-span-3 lg:col-start-3 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8 h-full',
                            'border-l-4 border-white',
                        ].join(' ')}
                    >
                        {history.map(historyItem => (
                            <ConditionalRender
                                key={historyItem.key}
                                condition={selectedHistory === historyItem.key}
                            >
                                <HistoryTransition show={selectedHistory === historyItem.key}>
                                    <HistoryDetails
                                        title={historyItem.organization.name}
                                        body={historyItem.detailComponent}
                                    />
                                </HistoryTransition>
                            </ConditionalRender>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default History;
