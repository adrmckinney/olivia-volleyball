interface Props {
    title: string;
    type?: 'submit' | 'reset' | 'button';
    size?: string;
    onClick?: (e: React.FormEvent<HTMLFormElement> | any) => void;
    classNames?: string;
    styles?: React.CSSProperties;
    showBackgroundColor?: boolean;
}

const LinkButton = ({
    title,
    type = 'button',
    onClick,
    classNames,
    styles = {},
    showBackgroundColor = false,
}: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={[
                'border-none',
                'shadow-none',
                'focus:ring-0',
                'outline-none',
                classNames,
                showBackgroundColor ? '' : 'bg-transparent rounded-none',
            ].join(' ')}
            style={styles}
        >
            {title}
        </button>
    );
};

export default LinkButton;
