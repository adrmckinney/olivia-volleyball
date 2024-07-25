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
                    'sticky lg:static top-0 lg:top-auto z-10 lg:z-auto py-6 lg:py-0',
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
