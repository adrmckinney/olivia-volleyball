import { colors } from '../../configs/colors';
import { fonts } from '../../configs/fonts';

type Props = {
    src: string;
    caption: string;
};

const HistoryImageWithCaption = ({ src, caption }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <img
                src={src}
                alt="Most improved player portrait"
                className={['w-64 rounded-md', 'bg-white', 'shadow-2xl ring-1 ring-white/10'].join(
                    ' '
                )}
            />
            <p className={[fonts.captionXs, colors.textGeneric, 'text-center'].join(' ')}>
                {caption}
            </p>
        </div>
    );
};

export default HistoryImageWithCaption;
