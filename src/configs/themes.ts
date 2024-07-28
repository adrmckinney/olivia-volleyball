import { colors } from './colors';
import { fontFamilies } from './fontFamilies';
import { fonts } from './fonts';

export const themes = {
    headerOne: `${fontFamilies.headerOne} ${fonts.headerOne} ${colors.textHeaderOne}`,
    headerTwo: `${fontFamilies.headerTwo} ${fonts.headerTwo} ${colors.textHeaderTwo}`,
    headerThree: `${fontFamilies.headerThree} ${fonts.headerThree} ${colors.textHeaderThree}`,
    descriptionTitle: `${fontFamilies.descriptionTitle} ${fonts.descriptionTitle} ${colors.textGeneric}`,
    descriptionData: `${fontFamilies.descriptionData} ${fonts.descriptionData} ${colors.textGeneric}`,
    navLinkButton: ({ isActive }: { isActive: boolean }) => {
        return `${fontFamilies.navLinkButtons} ${fonts.navLink} ${isActive ? colors.textNavActive : colors.textNavInactive}`;
    },
    historyTitle: `${fontFamilies.historyTitle} ${fonts.historyTitle} ${colors.textHistoryTitle}`,
    historyBody: `${fontFamilies.historyBody} ${fonts.historyBody} ${colors.textHistoryBody}`,
    mobileHistoryBody: `${fontFamilies.historyBody} ${fonts.mobileHistoryBody} ${colors.textHistoryBody}`,
    mobileNavMenuButton: `${colors.mobileNavMenuButton}`,
    mobileNavButton: ({ isActive }: { isActive: boolean }) => {
        return `${fontFamilies.navLinkButtons} ${fonts.mobileNavText} ${isActive ? colors.mobileNavButtonActive : colors.mobileNavButtonInactive}`;
    },
};
