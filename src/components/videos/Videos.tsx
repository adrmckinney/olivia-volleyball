import { useContext, useState } from 'react';
import useFetchCSVData from '../../api/FetchCSVData';
import { themes } from '../../configs/themes';
import { NavigationContext } from '../../context/NavigationProvider';
import { parseVideosSheetData } from '../../helpers/csvHelpers/parseVideosSheetData';
import useGetWindowWidth from '../../hooks/useGetWindowWidth';
import Carousel from '../../sharedComponents/Carousel/Carousel';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import SectionHeader from '../../sharedComponents/SectionHeader';
import SkeletonImage from '../../sharedComponents/Skeletons/SkeletonImage';
import { sheetUrls } from '../../utils/googleSheetsConfigs';

export type Direction = 'previous' | 'next';

const Videos = () => {
    const { videosRef, hideNavBackground } = useContext(NavigationContext);
    const [playVideoIdx, setPlayVideoIdx] = useState<number | null>(null);
    const { currentTailwindBreakpoint } = useGetWindowWidth();
    const url: string = sheetUrls.main
        .replace('{documentId}', import.meta.env.VITE_MAIN_GOOGLE_DOCUMENT_ID)
        .replace('{sheetId}', import.meta.env.VITE_VIDEOS_SHEET_ID);

    const { parsedData: videos, loading } = useFetchCSVData({ url, parser: parseVideosSheetData });

    const handleVisibleVideos = () => {
        switch (currentTailwindBreakpoint) {
            case '3xl':
            case '2xl':
            case 'xl':
                return 3;
            case 'lg':
            case 'md':
                return 2;
            case 'sm':
                return 1;
            default:
                return 1;
        }
    };

    return (
        <div
            ref={videosRef}
            id="videos"
            className={[
                'max-w-[1200px] ml-auto mr-auto 3xl:max-w-[1600px]',
                'mt-16 lg:mt-4 lg:scroll-m-0',
            ].join(' ')}
        >
            <SectionHeader title="Videos" hideNavBackground={hideNavBackground} />

            {loading ? (
                <div className="flex w-full justify-around">
                    {Array.from({ length: handleVisibleVideos() }).map((_, idx) => (
                        <SkeletonImage key={idx} size="lg" />
                    ))}
                </div>
            ) : Array.isArray(videos) ? (
                <Carousel
                    show={handleVisibleVideos()}
                    infiniteLoop={true}
                    showCue={currentTailwindBreakpoint === 'sm'}
                    showScrollArrows={currentTailwindBreakpoint !== 'sm'}
                >
                    {videos?.map((video, idx) => (
                        <div key={`${video.key}-${idx}`} className="px-3 xl:px-4">
                            <ConditionalRender
                                condition={playVideoIdx === idx}
                                isNullRender
                                falseRender={
                                    <div
                                        className="flex justify-center items-center aspect-video bg-gray-300 rounded-md"
                                        onClick={() => setPlayVideoIdx(idx)}
                                    >
                                        <p className={[themes.videoThumbnailTitle].join(' ')}>
                                            {video.title}
                                        </p>
                                    </div>
                                }
                            >
                                <iframe
                                    id={`ytplayer-${video.key}`}
                                    title={video.title}
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&mute=0`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
                                    allowFullScreen
                                    className="shadow-2xl rounded-md object-cover object-left border-none w-full h-full"
                                />
                            </ConditionalRender>
                        </div>
                    ))}
                </Carousel>
            ) : null}
        </div>
    );
};

export default Videos;
