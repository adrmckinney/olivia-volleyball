import { useContext } from 'react';
import { themes } from '../../configs/themes';
import { NavigationContext } from '../../context/NavigationProvider';
import flavArt from './../../images/youTubeThumbnails/flavArt.png';
import philWiggins from './../../images/youTubeThumbnails/philWiggins.png';
import podcast from './../../images/youTubeThumbnails/podcast.png';
import reflections from './../../images/youTubeThumbnails/reflections.png';
import seeingOurselves from './../../images/youTubeThumbnails/seeingOurselves.png';
import senegal from './../../images/youTubeThumbnails/senegal.png';
import urbanArtistry from './../../images/youTubeThumbnails/urbanArtistry.png';
import voices from './../../images/youTubeThumbnails/voices.png';
import VideoCard from './VideoCard';

export type VideoData = {
    title: string;
    videoUrl: string;
    thumbnail: string;
    customThumbnail: string;
};

const Vidoes = () => {
    const { videosRef } = useContext(NavigationContext);

    const videoData: VideoData[] = [
        {
            title: 'NCTA Reflections 2020',
            videoUrl: 'https://www.youtube.com/embed/hy1eClkGDp0?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/hy1eClkGDp0/maxresdefault.jpg',
            customThumbnail: reflections,
        },
        {
            title: 'World Learning Seeing Ourselves in Others 2020',
            videoUrl: 'https://www.youtube.com/embed/5sM2DhPpoBA?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/5sM2DhPpoBA/hqdefault.jpg',
            customThumbnail: seeingOurselves,
        },
        {
            title: 'Next Level Senegal 2014',
            videoUrl: 'https://www.youtube.com/embed/aZmX-PY763g?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/aZmX-PY763g/maxresdefault.jpg',
            customThumbnail: senegal,
        },
        {
            title: 'NEA Art Works 2019',
            videoUrl: 'https://www.youtube.com/embed/O1KDlzim_OE?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/O1KDlzim_OE/maxresdefault.jpg',
            customThumbnail: podcast,
        },
        {
            title: 'Library of Congress UA 2017',
            videoUrl: 'https://www.youtube.com/embed/_G7qnXmrBBU?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/_G7qnXmrBBU/hqdefault.jpg',
            customThumbnail: urbanArtistry,
        },
        {
            title: 'With Phil Wiggins at LOC 2014',
            videoUrl: 'https://www.youtube.com/embed/CAKUVWIhbBU?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/CAKUVWIhbBU/maxresdefault.jpg',
            customThumbnail: philWiggins,
        },
        {
            title: 'Voices of America 2012',
            videoUrl: 'https://www.youtube.com/embed/cL5CjowoGfc?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/cL5CjowoGfc/hqdefault.jpg',
            customThumbnail: voices,
        },
        {
            title: 'Junious Brickhouse Thessaloniki 2013',
            videoUrl: 'https://youtube.com/embed/tkQgEZ4SFmo?autoplay=1&mute=0',
            thumbnail: 'http://i.ytimg.com/vi/tkQgEZ4SFmo/maxresdefault.jpg',
            customThumbnail: flavArt,
        },
    ];

    return (
        <div ref={videosRef} id="videos" className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
            <h2 className={[themes.headerTwo, 'text-center'].join(' ')}>Videos</h2>
            {/* <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"> */}
            <ul className="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center pt-20 px-4">
                <VideoCard videoData={videoData} />
                {/* <img
                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
                    alt="Transistor"
                    width={158}
                    height={48}
                /> */}
            </ul>
            {/* </div> */}
        </div>
    );
};

export default Vidoes;
