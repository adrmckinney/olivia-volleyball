import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React from 'react';
import { Icons } from '../../assets/Icons';
import { colors } from '../../configs/colors';
import IconButton from '../Buttons/IconButton';
import ConditionalRender from '../ConditionalRender';

type Props = {
    open: boolean;
    onClose: () => void;
    drawerTitle: string;
    subTitleString?: string;
    subTitleContent?: React.ReactNode;
    fullScreen?: boolean;
    mainContent: React.ReactNode;
};

const DrawerWithHeader = ({
    open,
    onClose,
    drawerTitle,
    subTitleString = '',
    subTitleContent = null,
    fullScreen = false,
    mainContent,
}: Props) => {
    return (
        <Dialog transition open={open} onClose={onClose} className="relative z-[999]">
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        className={[
                            'pointer-events-none fixed inset-y-0 right-0 flex max-w-full',
                            fullScreen ? 'pl-0' : 'pl-10',
                        ].join(' ')}
                    >
                        <DialogPanel
                            transition
                            className={[
                                'pointer-events-auto top-0 right-0 w-screen max-w-full transform transition duration-500 ease-in-out',
                                'fixed h-screen',
                                'data-[closed]:translate-x-full',
                            ].join(' ')}
                        >
                            <div
                                className={[
                                    'flex h-full flex-col overflow-y-scroll shadow-xl',
                                    colors.bgMain,
                                ].join(' ')}
                            >
                                <div
                                    className={[
                                        'px-4 py-6 sm:px-6',
                                        colors.bgMobileNavMenuPopover,
                                    ].join(' ')}
                                >
                                    <div className="flex items-center justify-between">
                                        <DialogTitle className="text-base font-semibold text-white">
                                            {drawerTitle}
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <IconButton
                                                onClick={onClose}
                                                classNames="relative rounded-md text-white"
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <Icons.XMark aria-hidden="false" />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <ConditionalRender
                                            condition={subTitleString.length > 0}
                                            isNullRender
                                        >
                                            <p className="text-sm text-gray-300">
                                                {subTitleString}
                                            </p>
                                        </ConditionalRender>
                                        <ConditionalRender
                                            condition={subTitleContent != null}
                                            isNullRender
                                        >
                                            {subTitleContent}
                                        </ConditionalRender>
                                    </div>
                                </div>
                                <div
                                    className={[
                                        'relative flex-1 px-4 md:px-1 lg:px-6',
                                        'overflow-y-hidden h-full',
                                        'py-0',
                                    ].join(' ')}
                                >
                                    {mainContent}
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DrawerWithHeader;
