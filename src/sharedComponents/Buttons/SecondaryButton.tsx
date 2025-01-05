import BaseButton, { BaseButtonProps } from './BaseButton';

interface SecondaryButtonProps extends Omit<BaseButtonProps, 'className'> {
    isActive?: boolean;
}

const SecondaryButton = ({ isActive, ...props }: SecondaryButtonProps) => {
    return (
        <BaseButton
            className={[
                'text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700',
                isActive ? 'bg-gray-700' : 'bg-gray-800',
                'rounded-md',
            ].join(' ')}
            {...props}
        />
    );
};

export default SecondaryButton;
