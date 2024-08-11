import { ReactNode, useEffect, useState } from 'react';
import useThrottle from '../../hooks/throttle';
import { icon } from '../../utils/Icons';
import IconButton from '../Buttons/IconButton';
import ConditionalRender from '../ConditionalRender';
import './carousel.css';

type Props = {
    children: ReactNode[];
    show: number;
    infiniteLoop?: boolean;
};

const Carousel = ({ children, show, infiniteLoop = false }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
    const [length, setLength] = useState(children.length);

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show);
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    useEffect(() => {
        setLength(children.length);
        setIsRepeating(infiniteLoop && children.length > show);
    }, [children, infiniteLoop, show]);

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
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index]);
        }
        output.reverse();
        return output;
    };

    const renderExtraNext = () => {
        let output = [];
        for (let index = 0; index < show; index++) {
            output.push(children[index]);
        }
        return output;
    };

    // Must delay between clicks, otherwise if user clicks
    // too quickly then the state cannot update fast enough.
    const throttledPrev = useThrottle(prev, 400);
    const throttledNext = useThrottle(next, 400);

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full relative">
                <ConditionalRender condition={isRepeating || currentIndex > 0}>
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
                        className={`carousel-content show-${show}`} // Have to leave the css file for this because it has the convenient command to attach styles to the immediate child, that I do not have access to in this component.
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
                <ConditionalRender condition={isRepeating || currentIndex < length - show}>
                    <IconButton
                        onClick={throttledNext}
                        classNames="right-arrow"
                        disabled={!transitionEnabled}
                    >
                        <icon.chevronRight />
                    </IconButton>
                </ConditionalRender>
            </div>
        </div>
    );
};

export default Carousel;
