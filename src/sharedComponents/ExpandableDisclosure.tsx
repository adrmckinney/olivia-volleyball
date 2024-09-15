import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { ReactNode } from 'react';
import { icon } from '../utils/Icons';

type Props = {
    title: string | ReactNode;
    children: ReactNode;
    handleClick: () => void;
};

const ExpandableDisclosure = ({ title, children, handleClick }: Props) => {
    return (
        <>
            <Disclosure as="div">
                {({ open }) => (
                    <>
                        <DisclosureButton
                            className={[
                                'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-gray-700',
                            ].join(' ')}
                        >
                            <div className="flex justify-between items-center w-full">
                                <div className="w-full">{title}</div>
                                <icon.chevronRight
                                    aria-hidden="true"
                                    className="h-5 w-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                                    onClick={handleClick}
                                />
                            </div>
                        </DisclosureButton>
                        <Transition show={open}>
                            <TransitionChild>
                                <DisclosurePanel
                                    as="div"
                                    className={[
                                        'mt-1 px-2 pb-4 bg-gray-950',
                                        'transform transition duration-75 data-[enter]:ease-out data-[leave]:ease-in',
                                        // 'overflow-hidden',
                                        // 'transition duration-200 data-[enter]:max-h-fit data-[enter]:-translate-y-full data-[enter]:opacity-100 data-[leave]:-translate-y-full data-[leave]:opacity-0',
                                        // 'ease-in-out',
                                    ].join(' ')}
                                >
                                    {children}
                                </DisclosurePanel>
                            </TransitionChild>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </>
    );
};

export default ExpandableDisclosure;
