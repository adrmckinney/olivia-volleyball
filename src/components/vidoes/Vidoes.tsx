import { useContext, useState } from 'react';
import { colors } from '../../configs/colors';
import { fonts } from '../../configs/fonts';
import { themes } from '../../configs/themes';
import { NavigationContext } from '../../context/NavigationProvider';
import useGetWindowWidth from '../../hooks/useGetWindowWidth';
import Carousel from '../../sharedComponents/Carousel/Carousel';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import SectionHeader from '../../sharedComponents/SectionHeader';
import podcast from './../../images/youTubeThumbnails/podcast.png';
import reflections from './../../images/youTubeThumbnails/reflections.png';
import seeingOurselves from './../../images/youTubeThumbnails/seeingOurselves.png';
import senegal from './../../images/youTubeThumbnails/senegal.png';

export type VideoData = {
    title: string;
    key: VideoKeys;
    videoUrl: string;
    thumbnail: string;
    customThumbnail: string;
};

type VideoKeys = 'setting_outside' | 'setting_right_side' | 'setting_middle' | 'digs' | 'dumps';

export type Direction = 'previous' | 'next';

const Vidoes = () => {
    const { videosRef, hideNavBackground } = useContext(NavigationContext);
    const [playVideoIdx, setPlayVideoIdx] = useState<number | null>(null);
    const { currentTailwindBreakpoint } = useGetWindowWidth();

    const videoData: VideoData[] = [
        {
            title: 'Outside Sets',
            key: 'setting_outside',
            videoUrl: 'https://www.youtube.com/embed/hy1eClkGDp0?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/hy1eClkGDp0/maxresdefault.jpg',
            customThumbnail: reflections,
        },
        {
            title: 'Right side sets',
            key: 'setting_right_side',
            videoUrl: 'https://www.youtube.com/embed/5sM2DhPpoBA?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/5sM2DhPpoBA/hqdefault.jpg',
            customThumbnail: seeingOurselves,
        },
        {
            title: 'Middle sets',
            key: 'setting_middle',
            videoUrl: 'https://www.youtube.com/embed/aZmX-PY763g?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/aZmX-PY763g/maxresdefault.jpg',
            customThumbnail: senegal,
        },
        {
            title: 'Digs',
            key: 'digs',
            videoUrl: 'https://www.youtube.com/embed/O1KDlzim_OE?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/O1KDlzim_OE/maxresdefault.jpg',
            customThumbnail: podcast,
        },
        {
            title: 'Dumps',
            key: 'setting_outside',
            videoUrl: 'https://www.youtube.com/embed/hy1eClkGDp0?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/hy1eClkGDp0/maxresdefault.jpg',
            customThumbnail: reflections,
        },
    ];

    const handleVisibleVideos = () => {
        switch (currentTailwindBreakpoint) {
            case '3xl':
            case '2xl':
            case 'xl':
                return 3;
            default:
                return 2;
        }
    };

    return (
        <div
            ref={videosRef}
            id="videos"
            className="max-w-[1200px] ml-auto mr-auto mt-16 3xl:max-w-[1600px]"
        >
            <SectionHeader title="Vidoes" hideNavBackground={hideNavBackground} />
            <Carousel show={handleVisibleVideos()} infiniteLoop={true}>
                {videoData.map((video, idx) => (
                    <div key={`${video.key}-${idx}`} className="px-3 xl:px-4">
                        <ConditionalRender
                            condition={playVideoIdx === idx}
                            isNullRender
                            falseRender={
                                // <img
                                //     src={video.customThumbnail}
                                //     alt={video.title}
                                //     className="shadow-2xl rounded-md object-cover object-center"
                                //     onClick={() => setPlayVideoIdx(idx)}
                                // />
                                <div
                                    className="flex justify-center items-center aspect-video bg-gradient-to-r from-purple-600 to-gray-300 rounded-md"
                                    onClick={() => setPlayVideoIdx(idx)}
                                >
                                    <p className={[themes.historyTitle].join(' ')}>{video.title}</p>
                                </div>
                            }
                        >
                            <iframe
                                id="ytplayer"
                                title={video.title}
                                src={video.videoUrl}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                                allowFullScreen
                                className="shadow-2xl rounded-md object-cover object-left border-none w-full h-full"
                            />
                        </ConditionalRender>
                        <p
                            className={['text-center', colors.textGeneric, fonts.captionMd].join(
                                ' '
                            )}
                        >
                            {`${video.title} ${idx}`}
                        </p>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Vidoes;
