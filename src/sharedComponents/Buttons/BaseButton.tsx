import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

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
    '2xl': 'px-4 py-3 text-base',
    '3xl': 'px-5 py-4 text-base',
    '4xl': 'px-6 py-4 text-lg',
    '5xl': 'px-8 py-6 text-xl',
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
                'inline-flex items-center gap-x-1.5 font-semibold shadow-sm',
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
