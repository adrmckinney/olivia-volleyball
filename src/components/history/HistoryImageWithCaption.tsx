import { colors } from '../../configs/colors';
import { fonts } from '../../configs/fonts';

type Props = {
    src: string;
    caption: string;
    shadowColor: string;
};

const HistoryImageWithCaption = ({ src, caption, shadowColor }: Props) => {
    return (
        <>
            {/* <div className="w-3/4 bg-slate-800 py-8 px-4 rounded-lg"> */}
            <div className="flex flex-col items-center space-y-3">
                <img
                    src={src}
                    alt="Most improved player portrait"
                    className={[
                        'w-64 rounded-md',
                        'bg-white',
                        'shadow-2xl ring-1 ring-white/10',
                        shadowColor,
                    ].join(' ')}
                />
                <p className={[fonts.captionXs, colors.textGeneric, 'text-center'].join(' ')}>
                    {caption}
                </p>
            </div>
            {/* </div> */}
        </>
    );
};

export default HistoryImageWithCaption;
