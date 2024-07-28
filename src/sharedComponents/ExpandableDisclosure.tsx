import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ReactNode } from 'react';
import { icon } from '../utils/Icons';

type Props = {
    show: boolean;
    title: string | ReactNode;
    children: ReactNode;
    handleClick: () => void;
};

const ExpandableDisclosure = ({ show, title, children, handleClick }: Props) => {
    return (
        <>
            <Disclosure as="div">
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
                <DisclosurePanel as="div" className="mt-1 px-2 bg-gray-950">
                    {children}
                </DisclosurePanel>
            </Disclosure>
        </>
    );
};

export default ExpandableDisclosure;
