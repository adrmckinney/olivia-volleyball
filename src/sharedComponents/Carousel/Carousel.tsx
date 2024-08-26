// https://github.com/rakumairu/simple-react-carousel/tree/part-4
import { ReactNode, useEffect, useRef, useState } from 'react';
import useThrottle from '../../hooks/throttle';
import { icon } from '../../utils/Icons';
import IconButton from '../Buttons/IconButton';
import ConditionalRender from '../ConditionalRender';
import './carousel.css';

type Props = {
    children: ReactNode[];
    show: number;
    infiniteLoop?: boolean;
    showCue?: boolean;
    showScrollArrows?: boolean;
};

const Carousel = ({
    children,
    show,
    infiniteLoop = false,
    showCue = false,
    showScrollArrows = true,
}: Props) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
    const [length, setLength] = useState(children.length);

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    useEffect(() => {
        setLength(children.length);
        setIsRepeating(infiniteLoop && children.length > show);
    }, [children, infiniteLoop, show]);

    // Sadly, need a second useEffect to disable vertical scroll on touch event for small screen view
    useEffect(() => {
        const disableScroll = (e: TouchEvent) => {
            e.preventDefault();
        };

        const ref = carouselRef.current;

        if (ref) {
            ref.addEventListener('touchmove', disableScroll, { passive: false });
        }

        // Cleanup function to remove the event listener on unmount
        return () => {
            if (ref) {
                ref.removeEventListener('touchmove', disableScroll);
            }
        };
    }, []);

    const next = () => {
        if (isRepeating || currentIndex < length - show) {
            setCurrentIndex(prevState => prevState + 1);
        }
    };

    const prev = () => {
        if (isRepeating || currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1);
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            next();
        }

        if (diff < -5) {
            prev();
        }

        setTouchPosition(null);
    };

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false);
                setCurrentIndex(length);
                // Timeout is needed else a reset effect happens where the
                // entire array reverses until it gets back to the beginning
                setTimeout(() => setTransitionEnabled(true), 100);
            } else if (currentIndex === length + show) {
                setTransitionEnabled(false);
                setCurrentIndex(show);
                setTimeout(() => setTransitionEnabled(true), 100);
            }
        }
    };

    const renderExtraPrev = () => {
        let output = [];
        for (let i = 0; i < show; i++) {
            output.push(children[length - 1 - i]);
        }
        output.reverse();
        return output;
    };

    const renderExtraNext = () => {
        let output = [];
        for (let i = 0; i < show; i++) {
            output.push(children[i]);
        }
        return output;
    };

    // Must delay between clicks, otherwise if user clicks
    // too quickly then the state cannot update fast enough.
    const throttledPrev = useThrottle(prev, 400);
    const throttledNext = useThrottle(next, 400);

    const getCueColor = (index: number) => {
        const indexToColor = currentIndex - show + show;

        const baseIndex = currentIndex - show < 0 ? indexToColor : currentIndex - show;
        const algorithm = infiniteLoop ? baseIndex === index : currentIndex === index;
        return algorithm ? 'bg-purple-500' : 'bg-gray-500';
    };

    return (
        <div ref={carouselRef} className="flex flex-col w-full">
            <div className="flex w-full relative">
                <ConditionalRender
                    condition={(isRepeating || currentIndex > 0) && showScrollArrows}
                >
                    <IconButton
                        onClick={throttledPrev}
                        classNames="left-arrow"
                        disabled={!transitionEnabled}
                    >
                        <icon.chevronLeft />
                    </IconButton>
                </ConditionalRender>
                <div
                    className="overflow-hidden w-full h-full"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`} // Have to leave the css file for this because it has the convenient command to attach styles to the immediate child, which I do not have access to in this component.
                        style={{
                            transform: `translateX(-${currentIndex * (100 / show)}%)`,
                            transition: !transitionEnabled ? 'none' : undefined,
                        }}
                        onTransitionEnd={() => handleTransitionEnd()}
                    >
                        {length > show && isRepeating && renderExtraPrev()}
                        {children}
                        {length > show && isRepeating && renderExtraNext()}
                    </div>
                </div>
                <ConditionalRender
                    condition={(isRepeating || currentIndex < length - show) && showScrollArrows}
                >
                    <IconButton
                        onClick={throttledNext}
                        classNames="right-arrow"
                        disabled={!transitionEnabled}
                    >
                        <icon.chevronRight />
                    </IconButton>
                </ConditionalRender>
            </div>
            <ConditionalRender condition={showCue}>
                <div className="flex justify-center items-center space-x-4 pt-8">
                    {[...Array(length)].map((_, index) => {
                        return (
                            <div
                                key={index}
                                className={['h-4 w-4 rounded-full', getCueColor(index)].join(' ')}
                            />
                        );
                    })}
                </div>
            </ConditionalRender>
        </div>
    );
};

export default Carousel;
