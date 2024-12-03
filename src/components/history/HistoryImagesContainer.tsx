import { colors } from '../../configs/colors';
import { fonts } from '../../configs/fonts';

type ImageData = {
    src: string;
    caption: string;
};

type Props = {
    imageData: ImageData[];
};

const HistoryImagesContainer = ({ imageData }: Props) => {
    return (
        <ul
            role="list"
            className={[
                'mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none place-items-center',
                // 'lg:grid-cols-2',
                imageData.length > 1
                    ? 'sm:grid-cols-2 lg:grid-cols-2'
                    : 'sm:grid-cols-1 lg:grid-cols-1',
            ].join(' ')}
        >
            {imageData.map(image => (
                <li key={image.caption}>
                    <img
                        src={image.src}
                        alt={image.caption}
                        className={[
                            'aspect-[2/3] w-64 rounded-lg',
                            'object-fill',
                            'shadow-2xl ring-1 ring-white/10 shadow-purple-300',
                        ].join(' ')}
                    />
                    <h3
                        className={[
                            'mt-2 text-lg/8 font-semibold tracking-tight text-center',
                            colors.textGeneric,
                            fonts.captionXs,
                        ].join(' ')}
                    >
                        {image.caption}
                    </h3>
                </li>
            ))}
        </ul>
    );
};

export default HistoryImagesContainer;
