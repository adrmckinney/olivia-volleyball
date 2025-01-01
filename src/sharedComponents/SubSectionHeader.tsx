import { themes } from '../configs/themes';

type Props = {
    title: string;
};

const SubSectionHeader = ({ title }: Props) => {
    return (
        <>
            <h3
                className={[
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
