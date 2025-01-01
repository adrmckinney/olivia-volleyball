import { colors } from '../../configs/colors';
import { fontFamilies } from '../../configs/fontFamilies';
import BaseButton, { BaseButtonProps, ButtonSize } from './BaseButton';

interface SecondaryButtonProps extends Omit<BaseButtonProps, 'className'> {
    isActive?: boolean;
    size?: ButtonSize;
}

type PaddingClasses = Record<ButtonSize, string>;

const SecondaryPillButton = ({ isActive, size = 'sm', ...props }: SecondaryButtonProps) => {
    const paddingClasses: PaddingClasses = {
        xs: 'py-0.5 px-5 text-xs',
        sm: 'py-0.5 px-5 text-sm',
        md: 'py-0.5 px-6 text-sm',
        lg: 'py-0.5 px-7 text-sm',
        xl: 'py-0.5 px-8 text-sm',
        '2xl': 'py-0.5 px-9 text-base',
        '3xl': 'py-0.5 px-10 text-base',
        '4xl': 'py-0.5 px-11 text-lg',
        '5xl': 'py-0.5 px-12 text-xl',
    };

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
                paddingClasses[size],
            ].join(' ')}
            size={size}
            {...props}
        />
    );
};

export default SecondaryPillButton;
