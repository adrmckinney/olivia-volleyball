import { Disclosure } from '@headlessui/react';
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
        <Disclosure
            as="nav"
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
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:w-full">
                                    <div className="hidden sm:ml-6 sm:block sm:w-full">
                                        <div className="flex w-full justify-between">
                                            {navigation.map(item => (
                                                <LinkButton
                                                    key={item.key}
                                                    title={item.name}
                                                    classNames={
                                                        themes.navLinkButton({
                                                            isActive: item.current,
                                                        })
                                                        // item.current
                                                        //     ? hideNavBackground
                                                        //         ? 'text-green-400'
                                                        //         : 'text-teal-900 font-bold'
                                                        //     : hideNavBackground
                                                        //       ? 'text-white'
                                                        //       : 'text-gray-900'
                                                    }
                                                    onClick={() => handleNavClick(item.key)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {/* <a
                                        href="#"
                                        className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                                    >
                                        Dashboard
                                    </a> */}
                                </div>
                            </div>

                            <div className="-mr-2 flex items-center justify-end w-full sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button
                                    className={[
                                        'relative inline-flex items-center justify-center rounded-md p-2',
                                        themes.mobileNavMenuButton,
                                    ].join(' ')}
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <icon.x className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <icon.bars className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="bg-gray-100 space-y-1 pb-3 pt-2">
                            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                            {navigation.map(item => (
                                <Disclosure.Button
                                    key={item.name}
                                    className={[
                                        'block',
                                        // 'border-l-4 border-indigo-500 bg-indigo-50',
                                        'py-2 pl-3 pr-4 text-base font-medium',
                                        themes.mobileNavMenuButton,
                                        // 'text-indigo-700',
                                    ].join(' ')}
                                    onClick={() => handleNavClick(item.key)}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
};

export default NavBar;
