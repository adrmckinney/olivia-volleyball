import { themes } from '../configs/themes';

type Props = {
    title: string;
    hideNavBackground: boolean;
};

const SectionHeader = ({ title, hideNavBackground }: Props) => {
    return (
        <>
            <h2
                className={[
                    'sticky top-0 z-10 py-6 lg:static lg:top-auto lg:z-auto lg:py-20',
                    hideNavBackground ? 'bg-transparent' : 'bg-gray-950 lg:bg-transparent',
                    themes.headerTwo,
                    'text-center',
                ].join(' ')}
            >
                {title}
            </h2>
        </>
    );
};

export default SectionHeader;
