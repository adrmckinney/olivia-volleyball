import { ReactNode } from 'react';

type Props = {
    title: string;
    body: ReactNode;
};

const HistoryDetails = ({ title, body }: Props) => {
    return (
        <div className="lg:pr-4">
            <div className="max-w-xl text-xl leading-7 text-gray-300 lg:max-w-lg">
                <h3 className="text-2xl pb-6 sticky">{title}</h3>
                <div className="h-[40rem] overflow-y-scroll">{body}</div>
            </div>
        </div>
    );
};

export default HistoryDetails;
