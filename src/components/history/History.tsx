import { ReactNode, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NavigationContext } from '../../context/NavigationProvider';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import SectionHeader from '../../sharedComponents/SectionHeader';
import dsaBulldog from './../../images/dsaBulldog.png';
import jammers from './../../images/jammers.png';
import triangle from './../../images/trianglevbLogo.png';
import DSA from './DSA';
import HistoryDetails from './HistoryDetails';
import HistoryTransition from './HistoryTransition';
import Jammers2024 from './Jammers2024';
import JammersClinics2024 from './JammersClinics2024';
import LargerScreenHistorySelector from './LargerScreenHistorySelector';
import Riverside2023 from './Riverside2023';
import SmallerScreenHistorySelector from './SmallerScreenHistorySelector';
import Triangle from './Traingle';

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
    },
    {
        id: uuidv4(),
        type: 'primary',
        organization: { name: 'Triangle Volleyball Club Clinics', href: '#' },
        imageUrl: triangle,
        comment: 'Skills Clinic',
        date: 'Spring 2023', // 'April 16, 23, 30, May 7, 2023'
        key: 'triangle',
    },
    {
        id: uuidv4(),
        type: 'primary',
        organization: { name: 'Riverside High School', href: '#' },
        grade: '10th',
        imageUrl: 'https://nchslogos.com/wp-content/uploads/2023/04/Riverside_Pirates.png',
        comment: 'JV',
        date: 'Fall 2023',
        key: 'riverside2023',
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
    },
    {
        id: uuidv4(),
        type: 'primary',
        organization: { name: 'Jammers Club Volleyball Clinics', href: '#' },
        grade: '15U',
        imageUrl: jammers,
        comment: 'Red',
        date: 'Spring 2024',
        key: 'jammersClinics2024',
    },
];

export type SelectedHistory =
    | 'dsa'
    | 'triangle'
    | 'riverside2023'
    | 'jammers2024'
    | 'jammersClinics2024';

const History = () => {
    const { historyRef, hideNavBackground } = useContext(NavigationContext);
    const [selectedHistory, setSelectedHistory] = useState<SelectedHistory>('dsa');
    const handleSelection = (selection: SelectedHistory) => {
        setSelectedHistory(selection);
    };

    const renderHistoryContentForSmallerScreens = (key: SelectedHistory): ReactNode => {
        switch (key) {
            case 'dsa':
                return <DSA />;
            case 'triangle':
                return <Triangle />;
            case 'riverside2023':
                return <Riverside2023 />;
            case 'jammers2024':
                return <Jammers2024 />;
            case 'jammersClinics2024':
                return <JammersClinics2024 />;
        }
    };

    return (
        <>
            <div
                ref={historyRef}
                id="history"
                className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:scroll-m-20 lg:px-8 justify-center items-center pb-10 md:pb-0"
            >
                <SectionHeader title="Athletic History" hideNavBackground={hideNavBackground} />

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    {/* Timeline */}
                    <ul className="-mb-8 lg:ml-10 lg:pl-4 lg:sticky lg:col-start-1 lg:row-start-1 lg:overflow-hidden">
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
                                        isSelected={selectedHistory === historyItem.key}
                                        historyContent={renderHistoryContentForSmallerScreens(
                                            historyItem.key
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </ul>

                    {/* Details Larger Screen */}
                    <div
                        className={[
                            'hidden lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8',
                            'border-l-4 border-white',
                        ].join(' ')}
                    >
                        <ConditionalRender condition={selectedHistory === 'dsa'}>
                            <HistoryTransition show={selectedHistory === 'dsa'}>
                                <HistoryDetails title="Durham School of the Arts" body={<DSA />} />
                            </HistoryTransition>
                        </ConditionalRender>

                        <ConditionalRender condition={selectedHistory === 'triangle'}>
                            <HistoryTransition show={selectedHistory === 'triangle'}>
                                <HistoryDetails
                                    title="Triangle Volleyball Club Clinics"
                                    body={<Triangle />}
                                />
                            </HistoryTransition>
                        </ConditionalRender>

                        <ConditionalRender condition={selectedHistory === 'riverside2023'}>
                            <HistoryTransition show={selectedHistory === 'riverside2023'}>
                                <HistoryDetails
                                    title="Riverside High School"
                                    body={<Riverside2023 />}
                                />
                            </HistoryTransition>
                        </ConditionalRender>

                        <ConditionalRender condition={selectedHistory === 'jammers2024'}>
                            <HistoryTransition show={selectedHistory === 'jammers2024'}>
                                <HistoryDetails
                                    title="Jammers Club Volleyball"
                                    body={<Jammers2024 />}
                                />
                            </HistoryTransition>
                        </ConditionalRender>

                        <ConditionalRender condition={selectedHistory === 'jammersClinics2024'}>
                            <HistoryTransition show={selectedHistory === 'jammersClinics2024'}>
                                <HistoryDetails
                                    title="Jammers Skills Clinics"
                                    body={<JammersClinics2024 />}
                                />
                            </HistoryTransition>
                        </ConditionalRender>
                    </div>
                </div>
            </div>
        </>
    );
};

export default History;
