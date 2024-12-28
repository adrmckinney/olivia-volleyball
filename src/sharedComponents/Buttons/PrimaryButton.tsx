import BaseButton, { BaseButtonProps } from './BaseButton';

const PrimaryButton = (props: Omit<BaseButtonProps, 'className'>) => {
    return <BaseButton className="bg-sky-600 text-white hover:bg-sky-700 rounded-md" {...props} />;
};

export default PrimaryButton;
