import {
    ArrowPathIcon,
    ChevronRightIcon,
    CloudArrowUpIcon,
    Cog6ToothIcon,
    FingerPrintIcon,
    LockClosedIcon,
    ServerIcon,
    TagIcon,
    UserCircleIcon,
} from '@heroicons/react/20/solid';
import {
    Bars3Icon,
    BoltIcon,
    CalendarDaysIcon,
    SparklesIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

type Icon = {
    arrowPath: typeof ArrowPathIcon;
    chevronRight: typeof ChevronRightIcon;
    cloudArrowUp: typeof CloudArrowUpIcon;
    cog: typeof Cog6ToothIcon;
    fingerPrint: typeof FingerPrintIcon;
    lockClosed: typeof LockClosedIcon;
    server: typeof ServerIcon;
    bolt: typeof BoltIcon;
    calendar: typeof CalendarDaysIcon;
    user: typeof UsersIcon;
    bars: typeof Bars3Icon;
    x: typeof XMarkIcon;
    tag: typeof TagIcon;
    userCircle: typeof UserCircleIcon;
    sparkles: typeof SparklesIcon;
};

export const icon: Icon = {
    arrowPath: ArrowPathIcon,
    chevronRight: ChevronRightIcon,
    cloudArrowUp: CloudArrowUpIcon,
    cog: Cog6ToothIcon,
    fingerPrint: FingerPrintIcon,
    lockClosed: LockClosedIcon,
    server: ServerIcon,
    bolt: BoltIcon,
    calendar: CalendarDaysIcon,
    user: UsersIcon,
    bars: Bars3Icon,
    x: XMarkIcon,
    tag: TagIcon,
    userCircle: UserCircleIcon,
    sparkles: SparklesIcon,
};
