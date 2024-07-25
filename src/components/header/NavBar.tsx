import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useContext } from 'react';
import { colors } from '../../configs/colors';
import { themes } from '../../configs/themes';
import { Current, NavigationContext } from '../../context/NavigationProvider';
import LinkButton from '../../sharedComponents/LinkButton';
import { icon } from '../../utils/Icons';

type Navigation = {
    name: string;
    key: Current;
    current: boolean;
};

const NavBar = () => {
    const { current, handleNavClick, hideNavBackground, opacity } = useContext(NavigationContext);

    const navigation: Navigation[] = [
        {
            name: 'Landing',
            key: 'landing',
            current: current === 'landing',
        },
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
        {
            name: 'Stats',
            key: 'stats',
            current: current === 'stats',
        },
        {
            name: 'About Olivia',
            key: 'about',
            current: current === 'about',
        },
    ];

    return (
        <Popover
            as="header"
            className={[
                colors.bgNavBar({ hide: hideNavBackground, opacity }),
                'fixed top-0 w-full z-50',
            ].join(' ')}
            style={{ borderRadius: '0 0 100px 100px/50%' }}
        >
            {({ open }) => (
                <>
                    <div className="mx-auto w-full sm:w-1/2 px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 w-full justify-center">
                            <div className="flex w-full justify-center items-center">
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8 lg:w-full">
                                    <div className="hidden lg:ml-6 lg:block lg:w-full">
                                        <div className="flex w-full justify-between">
                                            {navigation.map(item => (
                                                <LinkButton
                                                    key={item.key}
                                                    title={item.name}
                                                    classNames={themes.navLinkButton({
                                                        isActive: item.current,
                                                    })}
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
                                        'group relative inline-flex items-center justify-center rounded-md p-2',
                                        themes.mobileNavMenuButton,
                                    ].join(' ')}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <icon.x
                                        className="hidden h-6 w-6 group-data-[close]:block"
                                        aria-hidden="true"
                                    />
                                    <icon.bars
                                        className="block h-6 w-6 group-data-[open]:hidden"
                                        aria-hidden="true"
                                    />
                                </PopoverButton>
                            </div>
                        </div>
                    </div>

                    <div className="lg:hidden">
                        <PopoverBackdrop
                            transition
                            className="fixed inset-0 z-20 bg-black bg-opacity-25 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
                        />
                        <PopoverPanel
                            focus
                            transition
                            className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition duration-150 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in sm:hidden"
                        >
                            <div className="bg-white space-y-1 pb-3 pt-2">
                                <div className="text-end">
                                    <PopoverButton
                                        className={[
                                            'relative inline-flex items-center justify-center rounded-md bg-white p-2',
                                            themes.mobileNavButton,
                                        ].join(' ')}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <icon.x className="h-6 w-6" aria-hidden="true" />
                                    </PopoverButton>
                                </div>
                                {navigation.map(item => (
                                    <PopoverButton
                                        key={item.name}
                                        className={[
                                            'block',
                                            'py-2 pl-3 pr-4 text-base font-medium',
                                            // themes.mobileNavMenuButton,
                                            themes.navLinkButton({
                                                isActive: item.current,
                                            }),
                                        ].join(' ')}
                                        onClick={() => handleNavClick(item.key)}
                                    >
                                        {item.name}
                                    </PopoverButton>
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
