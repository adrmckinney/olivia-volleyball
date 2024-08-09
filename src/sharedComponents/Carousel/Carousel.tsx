import { ReactNode, useEffect, useState } from 'react';
import ConditionalRender from '../ConditionalRender';
import './carousel.css';

type Props = {
    children: ReactNode[];
    show: number;
};

const Carousel = ({ children, show }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(children.length);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length);
    }, [children]);

    const next = () => {
        if (currentIndex < length - show) {
            setCurrentIndex(prevState => prevState + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
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

    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full relative">
                <ConditionalRender condition={currentIndex > 0}>
                    <button onClick={prev} className="left-arrow">
                        &lt;
                    </button>
                </ConditionalRender>
                <div
                    className="overflow-hidden w-full h-full"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className={`carousel-content show-${show}`} // Have to leave the css file for this
                        style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                    >
                        {children}
                    </div>
                </div>
                <ConditionalRender condition={currentIndex < length - show}>
                    <button onClick={next} className="right-arrow">
                        &gt;
                    </button>
                </ConditionalRender>
            </div>
        </div>
    );
};

export default Carousel;
