import { ReactNode } from 'react';
import { themes } from '../../configs/themes';

type Props = {
    title: string;
    body: ReactNode;
};

const HistoryDetails = ({ title, body }: Props) => {
    return (
        <div className="lg:pr-4">
            <div className="max-w-xl text-gray-300 lg:max-w-2xl">
                <h3 className={['pb-6 sticky', themes.headerThree].join(' ')}>{title}</h3>
                <div className={['h-[45rem] overflow-y-scroll', themes.historyBody].join(' ')}>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default HistoryDetails;
