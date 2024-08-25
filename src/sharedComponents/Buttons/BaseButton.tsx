import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    size?: ButtonSize;
    disabled?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 text-sm',
    md: 'px-2.5 py-1.5 text-sm', // default size
    lg: 'px-3 py-2 text-sm',
    xl: 'px-3.5 py-2.5 text-sm',
};

const BaseButton = ({
    children,
    leadingIcon,
    trailingIcon,
    className = '',
    size = 'md',
    disabled = false,
    ...props
}: BaseButtonProps) => {
    return (
        <button
            className={[
                'inline-flex items-center gap-x-1.5 rounded-md font-semibold shadow-sm',
                sizeClasses[size],
                disabled && 'opacity-50 cursor-not-allowed',
                className,
            ].join(' ')}
            {...props}
        >
            {leadingIcon && <span className="-ml-0.5">{leadingIcon}</span>}
            {children}
            {trailingIcon && <span className="-mr-0.5">{trailingIcon}</span>}
        </button>
    );
};

export default BaseButton;
