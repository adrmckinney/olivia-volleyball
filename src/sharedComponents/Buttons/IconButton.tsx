import { CSSProperties, MouseEvent, ReactElement, ReactNode, SVGProps } from 'react';

interface Props {
    children: ReactElement<SVGProps<SVGSVGElement>> | ReactNode;
    type?: 'submit' | 'reset' | 'button';
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    classNames?: string;
    disabled?: boolean;
    formId?: string;
    styles?: CSSProperties;
}

const IconButton = ({
    children,
    type = 'button',
    onClick,
    classNames,
    disabled = false,
    formId,
    styles,
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={[
                'inline-flex items-center rounded-full border-none bg-transparent p-1 focus:ring-0',
                'text-gray-600',
                'hover:text-gray-500',
                classNames,
            ].join(' ')}
            disabled={disabled}
            form={formId}
            style={styles}
        >
            {children}
        </button>
    );
};

export default IconButton;
