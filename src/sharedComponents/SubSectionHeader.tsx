import { themes } from '../configs/themes';

type Props = {
    title: string;
};

const SubSectionHeader = ({ title }: Props) => {
    return (
        <>
            <h3
                className={[
                    'sticky top-0 z-30 py-6 lg:static lg:top-auto lg:z-auto',
                    'bg-gray-950 lg:bg-transparent',
                    themes.headerThree,
                    'text-start',
                    'lg:py-20',
                ].join(' ')}
            >
                {title}
            </h3>
        </>
    );
};

export default SubSectionHeader;
