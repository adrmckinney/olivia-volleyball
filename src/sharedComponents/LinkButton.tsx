interface Props {
    title: string;
    type?: 'submit' | 'reset' | 'button';
    size?: string;
    onClick?: (e: React.FormEvent<HTMLFormElement> | any) => void;
    classNames?: string;
}

const LinkButton = ({ title, type = 'button', onClick, classNames }: Props) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={[
                'bg-transparent',
                'border-none',
                'shadow-none',
                'focus:ring-0',
                'outline-none',
                'rounded-none',
                classNames,
            ].join(' ')}
        >
            {title}
        </button>
    );
};

export default LinkButton;
