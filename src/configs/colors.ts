const primaryText = 'text-gray-200';
const activeText = 'text-purple-300';

export const colors = {
    bgMain: 'bg-gray-950',
    borderPurple: 'border-purple-300',
    textNavInactive: primaryText,
    textNavActive: activeText,
    textHeaderOne: primaryText,
    textHeaderTwo: primaryText,
    textHeaderThree: primaryText,
    textGeneric: primaryText,
    bgNavBar: ({ hide }: { hide: boolean }) => {
        return [hide ? 'bg-transparent' : `lg:bg-gray-950/90 `].join(' ');
    },
    // bgNavBar: ({ hide, opacity }: { hide: boolean; opacity: string }) => {
    //     return [hide ? 'bg-transparent' : `lg:bg-gray-950/90 ${opacity}`].join(' ');
    // },
    textHistoryTitle: primaryText,
    textHistoryBody: primaryText,
    mobileNavMenuButton: `${primaryText} hover:text-gray-500`,
    mobileNavButtonActive: ['bg-gray-500', activeText].join(' '),
    mobileNavButtonInactive: ['bg-gray-500', primaryText].join(' '),
    subText: 'text-gray-500',
    bgMobileNavMenuPopover: 'bg-gray-700',

    // Group Table colors
    groupTableBorder: 'border-gray-700',
    // Table title
    groupTableTitleFont: 'text-gray-50',

    // Table header
    groupTableHeaderFont: 'text-gray-50',
    groupTableHeaderBackground: 'bg-gray-800',
    groupTableHeaderBorder: 'border-gray-900',

    // Table body
    groupTableBodyBackground: 'bg-gray-700',

    // Group Rows
    groupTableGroupFont: 'text-gray-50',
    groupTableGroupRowBackground: 'bg-gray-700',
    groupTableGroupRowBorder: 'border-gray-700', // Just border top

    // Table Rows
    groupTableRowFont: 'text-gray-200',
    groupTableRowBackground: 'bg-gray-800',
    groupTableRowBorder: 'border-gray-900',
    groupTableFirstRowBorder: 'border-gray-950',

    // Select Dropdown
    selectBg: 'bg-gray-200',
    selectText: 'text-gray-900',
    selectFocusRing: 'focus:outline-purple-400',
    selectIconColor: 'text-purple-400',
};
