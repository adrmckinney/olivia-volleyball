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
                'text-5xl',
                colors.textGeneric,
                isActive
                    ? 'bg-purple-400/30 hover:bg-purple-400/30 pointer-events-none'
                    : 'bg-gray-800 hover:bg-gray-700',
                'rounded-full',
                'px-6 py-1 rounded-[999px]',
            ].join(' ')}
            {...props}
        />
    );
};

export default SecondaryPillButton;
