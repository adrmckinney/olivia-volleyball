import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useContext } from 'react';
import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import { themes } from '../../configs/themes';
import { Current, NavigationContext } from '../../context/NavigationProvider';
import LinkButton from '../../sharedComponents/Buttons/LinkButton';
import { icon } from '../../utils/Icons';

type Navigation = {
    name: string;
    key: Current;
    current: boolean;
};

const NavBar = () => {
    const { current, handleNavClick, hideNavBackground } = useContext(NavigationContext);

    const navigation: Navigation[] = [
        {
            name: 'Home',
            key: 'landing',
            current: current === 'landing',
        },
        // {
        //     name: 'Stats',
        //     key: 'stats',
        //     current: current === 'stats',
        // },
        {
            name: 'Videos',
            key: 'videos',
            current: current === 'videos',
        },
        {
            name: 'Athletic History',
            key: 'history',
            current: current === 'history',
        },
        // {
        //     name: 'About',
        //     key: 'about',
        //     current: current === 'about',
        // },
        {
            name: 'Contact',
            key: 'contact',
            current: current === 'contact',
        },
    ];

    return (
        <Popover
            as="header"
            className={[
                colors.bgNavBar({ hide: hideNavBackground }),
                // colors.bgNavBar({ hide: hideNavBackground, opacity }),
                'fixed top-0 w-full z-50',
            ].join(' ')}
            style={{ borderRadius: '0 0 100px 100px/50%' }}
        >
            {({ open }) => (
                <>
                    <div className="mx-auto w-full lg:w-3/4 2xl:w-2/3 3xl:w-1/2 px-4 sm:px-6 lg:pl-0 lg:pr-0">
                        <div className={['flex w-full h-16 justify-center'].join(' ')}>
                            <div className="flex w-full justify-center items-center">
                                <div className="hidden lg:ml-0 lg:flex lg:space-x-8 lg:w-full">
                                    <div className="hidden lg:ml-0 lg:block lg:w-full">
                                        <div className="flex w-full justify-between">
                                            {navigation.map(item => (
                                                <LinkButton
                                                    key={item.key}
                                                    title={item.name}
                                                    classNames={[
                                                        themes.navLinkButton({
                                                            isActive: item.current,
                                                        }),
                                                        'px-6 py-1',
                                                        item.current
                                                            ? 'text-white bg-purple-400 bg-opacity-30 rounded-[999px]'
                                                            : '',
                                                    ].join(' ')}
                                                    onClick={() => handleNavClick(item.key)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute right-0 flex-shrink-0 mr-2 mt-2 lg:hidden">
                                {/* Mobile menu button */}
                                <PopoverButton
                                    className={[
                                        'group relative inline-flex items-center justify-center rounded-md p-2 outline-0',
                                        themes.mobileNavMenuButton,
                                    ].join(' ')}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <div className="flex">
                                        <icon.bars
                                            className="block h-6 w-6 group-data-[open]:hidden"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </PopoverButton>
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <PopoverBackdrop
                            transition
                            className="fixed inset-0 z-20 bg-black bg-opacity-60 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
                        />
                        <PopoverPanel
                            focus
                            transition
                            className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in lg:hidden"
                        >
                            <div
                                className={[
                                    'space-y-1 pb-3 pl-6 pt-2 pr-2 rounded-3xl',
                                    colors.bgMobileNavMenuPopover,
                                ].join(' ')}
                            >
                                <div className="flex justify-between">
                                    <p
                                        className={[
                                            fontFamilies.headerOne,
                                            'text-base text-gray-400 pt-2',
                                        ].join(' ')}
                                    >
                                        Navigation
                                    </p>
                                    <PopoverButton
                                        className={[
                                            'relative inline-flex items-center justify-center rounded-md p-2 outline-0',
                                            colors.bgMobileNavMenuPopover,
                                            colors.textGeneric,
                                        ].join(' ')}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <icon.x className="h-6 w-6" aria-hidden="true" />
                                    </PopoverButton>
                                </div>
                                {navigation.map((item, idx, array) => (
                                    <div key={item.name} className="py-2 pr-4">
                                        <PopoverButton
                                            className={[
                                                'block',
                                                'text-base font-medium',
                                                themes.mobileNavMenuButton,
                                                themes.navLinkButton({
                                                    isActive: item.current,
                                                }),
                                            ].join(' ')}
                                            onClick={() => handleNavClick(item.key)}
                                        >
                                            {item.name}
                                        </PopoverButton>
                                        <div
                                            className={[
                                                idx === array.length - 1
                                                    ? ''
                                                    : 'border-[1px] border-gray-600 w-full',
                                            ].join(' ')}
                                        />
                                    </div>
                                ))}
                            </div>
                        </PopoverPanel>
                    </div>
                </>
            )}
        </Popover>
    );
};

export default NavBar;
