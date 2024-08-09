import { fontFamilies } from '../../configs/fontFamilies';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import { HistoryDataType, SelectedHistory } from './History';

type Props = {
    historyItem: HistoryDataType;
    handleSelection: (selectedHistory: SelectedHistory) => void;
    isSelected: boolean;
    isLastItem: boolean;
};

const LargerScreenHistorySelector = ({
    historyItem,
    handleSelection,
    isSelected,
    isLastItem,
}: Props) => {
    return (
        <>
            <li key={historyItem.id}>
                <div className="relative pb-8 space-y-10">
                    <ConditionalRender condition={!isLastItem}>
                        <span
                            className="absolute left-8 top-8 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                        />
                    </ConditionalRender>

                    <div
                        className="relative flex items-center space-x-3"
                        onClick={() => handleSelection(historyItem.key)}
                    >
                        <>
                            <div className="relative">
                                <img
                                    className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                    src={historyItem.imageUrl}
                                    alt=""
                                />
                            </div>
                            <div className="min-w-fit flex-1 pl-6 flex-col">
                                <div>
                                    <div
                                        className={[
                                            'text-lg',
                                            isSelected && 'border-b-4 border-white',
                                        ].join(' ')}
                                    >
                                        <div
                                            className={[
                                                fontFamilies.historyBody,
                                                'font-bold',
                                                'text-white',
                                            ].join(' ')}
                                        >
                                            {historyItem.organization.name}
                                        </div>
                                    </div>
                                    <p
                                        className={[
                                            'mt-0.5 text-base text-gray-500 font-bold',
                                            fontFamilies.historyBody,
                                        ].join(' ')}
                                    >
                                        {historyItem.date}
                                    </p>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </li>
        </>
    );
};

export default LargerScreenHistorySelector;
