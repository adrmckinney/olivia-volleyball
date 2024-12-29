import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import BaseButton, { BaseButtonProps } from './BaseButton';

interface SecondaryButtonProps extends Omit<BaseButtonProps, 'className'> {
    isActive?: boolean;
}

const SecondaryPillButton = ({ isActive, ...props }: SecondaryButtonProps) => {
    return (
        <BaseButton
            className={[
                ' focus:outline-none focus:ring-2 focus:ring-gray-700',
                fontFamilies.navLinkButtons,
                colors.textGeneric,
                isActive
                    ? 'bg-purple-400/30 hover:bg-purple-400/30 pointer-events-none'
                    : 'bg-gray-800 hover:bg-gray-700',
                'rounded-full',
            ].join(' ')}
            style={{ fontSize: '1.125rem', lineHeight: '1.75rem', padding: '.15rem 1.25rem' }}
            {...props}
        />
    );
};

export default SecondaryPillButton;
