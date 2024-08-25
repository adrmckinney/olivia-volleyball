import BaseButton, { BaseButtonProps } from './BaseButton';

interface PrimaryButtonProps extends Omit<BaseButtonProps, 'className'> {}

const PrimaryButton = (props: PrimaryButtonProps) => {
    return <BaseButton className="bg-sky-600 text-white hover:bg-sky-700" {...props} />;
};

export default PrimaryButton;
