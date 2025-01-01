import { Icons } from '../assets/Icons';
import { colors } from '../configs/colors';
import IconButton from './Buttons/IconButton';
import ConditionalRender from './ConditionalRender';
import SubSectionHeader from './SubSectionHeader';

type Props = {
    title: string;
    handleClick: () => void;
    show: boolean;
    titleIsClickable?: boolean;
};

const SubHeaderWithExpandChevron = ({
    title,
    show,
    handleClick,
    titleIsClickable = true,
}: Props) => {
    return (
        <>
            <div
                key="header"
                className={[
                    'sticky top-16 z-40 py-6 lg:static lg:top-auto lg:z-auto',
                    'flex items-center space-x-2',
                    colors.bgMain,
                    titleIsClickable ? ' cursor-pointer' : '',
                ].join(' ')}
                onClick={titleIsClickable ? handleClick : () => {}}
            >
                <SubSectionHeader title={title} />
                <IconButton classNames={['text-white text-2xl md:pt-3'].join(' ')}>
                    <ConditionalRender
                        condition={show}
                        falseRender={<Icons.ChevronRight onClick={handleClick} size="3xl" />}
                    >
                        <Icons.ChevronDown onClick={handleClick} size="3xl" />
                    </ConditionalRender>
                </IconButton>
            </div>
        </>
    );
};

export default SubHeaderWithExpandChevron;
