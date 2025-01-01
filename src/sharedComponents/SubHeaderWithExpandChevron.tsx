import { Icons } from '../assets/Icons';
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
                    'flex items-center space-x-2',
                    titleIsClickable ? ' cursor-pointer' : '',
                ].join(' ')}
                onClick={titleIsClickable ? handleClick : () => {}}
            >
                <SubSectionHeader title={title} />
                <IconButton classNames="text-white text-2xl md:pt-3">
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
