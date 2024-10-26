import { themes } from '../configs/themes';

type Props = {
    title: string;
    hideNavBackground: boolean;
    isContactHeader?: boolean;
};

const SectionHeader = ({ title, hideNavBackground, isContactHeader = false }: Props) => {
    return (
        <>
            <h2
                className={[
                    'sticky top-0 z-30 py-6 lg:static lg:top-auto lg:z-auto',
                    hideNavBackground ? 'bg-transparent' : 'bg-gray-950 lg:bg-transparent',
                    themes.headerTwo,
                    'text-center',
                    isContactHeader ? 'lg:pt-8 lg:pb-0' : 'lg:py-20',
                ].join(' ')}
            >
                {title}
            </h2>
        </>
    );
};

export default SectionHeader;
