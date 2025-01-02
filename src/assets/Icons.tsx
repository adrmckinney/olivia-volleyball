import {
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpDownIcon,
} from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5', // default size
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
    '2xl': 'h-10 w-10',
    '3xl': 'h-12 w-12',
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
    title?: string;
    titleId?: string;
    size?: keyof typeof sizeClasses;
}

// A generic wrapper that forwards props to the actual icon component
const createIconComponent = (IconComponent: React.FC<IconProps>) => {
    return ({ size = 'md', className, ...props }: IconProps) => {
        const sizeClass = sizeClasses[size];
        const combinedClassName = `${sizeClass} ${className ?? ''}`.trim();

        return <IconComponent className={combinedClassName} {...props} />;
    };
};

export const Icons = {
    ChevronRight: createIconComponent(ChevronRightIcon),
    ChevronDown: createIconComponent(ChevronDownIcon),
    ChevronLeft: createIconComponent(ChevronLeftIcon),
    ChevronUpDown: createIconComponent(ChevronUpDownIcon),
    Bars: createIconComponent(Bars3Icon),
    XMark: createIconComponent(XMarkIcon),
    Check: createIconComponent(CheckIcon),
};
