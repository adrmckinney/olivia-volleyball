import { Transition } from '@headlessui/react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    show: boolean;
};

const HistoryTransition = ({ children, show }: Props) => {
    return (
        <Transition
            appear
            show={show}
            enter="transition ease-in duration-1000"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition ease-out duration-75"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
        >
            {children}
        </Transition>
    );
};

export default HistoryTransition;
