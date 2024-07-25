const primaryText = 'text-gray-200';
const activeText = 'text-purple-300';

export const colors = {
    bgMain: 'bg-gray-950',
    textNavInactive: primaryText,
    textNavActive: activeText,
    textHeaderOne: primaryText,
    textHeaderTwo: primaryText,
    textHeaderThree: primaryText,
    textGeneric: primaryText,
    bgNavBar: ({ hide, opacity }: { hide: boolean; opacity: string }) => {
        return [hide ? 'bg-transparent' : `lg:bg-gray-900 ${opacity}`].join(' ');
    },
    textHistoryTitle: primaryText,
    textHistoryBody: primaryText,
    mobileNavMenuButton: 'text-gray-400 hover:text-gray-500 hover:bg-gray-100',
    mobileNavButtonActive: ['bg-gray-500', activeText].join(' '),
    mobileNavButtonInactive: ['bg-gray-500', primaryText].join(' '),
};
