import { ReactNode } from 'react';
import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import ExpandableDisclosure from '../../sharedComponents/ExpandableDisclosure';
import { HistoryDataType, SelectedHistory } from './History';

type Props = {
    historyItem: HistoryDataType;
    handleSelection: (selectedHistory: SelectedHistory) => void;
    historyContent: ReactNode;
};

const SmallerScreenHistorySelector = ({ historyItem, handleSelection, historyContent }: Props) => {
    return (
        <>
            {/* <div
                className={[
                    isSelected ? 'border-t-2 border-purple-300 rounded-md' : 'border-t-0',
                ].join(' ')}
            /> */}
            <ExpandableDisclosure
                title={
                    <div className={['flex justify-between items-center w-full'].join(' ')}>
                        <p
                            className={[
                                fontFamilies.body,
                                colors.textGeneric,
                                'text-base font-semibold tracking-normal',
                            ].join(' ')}
                        >
                            {historyItem.organization.name}
                        </p>
                        <p
                            className={[
                                fontFamilies.body,
                                colors.subText,
                                'text-sm font-normal tracking-normal',
                            ].join(' ')}
                        >
                            {historyItem.date}
                        </p>
                    </div>
                }
                handleClick={() => handleSelection(historyItem.key)}
            >
                <div
                    className={[
                        fontFamilies.body,
                        colors.textGeneric,
                        colors.borderPurple,
                        'text-base',
                        'border-x-2 rounded-md -mx-3 p-2',
                    ].join(' ')}
                >
                    {historyContent}
                </div>
            </ExpandableDisclosure>
        </>
    );
};

export default SmallerScreenHistorySelector;
