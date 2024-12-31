import React, { useEffect, useRef, useState } from 'react';

interface Props {
    message: string;
    position?: 'above' | 'right' | 'left' | 'below';
    children: React.ReactNode;
}

const ToolTip = ({ message, position = 'above', children }: Props) => {
    const [visible, setVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState(position);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visible && tooltipRef.current && targetRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const targetRect = targetRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;

            let newPosition = position;

            if (position === 'above' && targetRect.top < tooltipRect.height) {
                newPosition = 'below';
            } else if (
                position === 'below' &&
                targetRect.bottom + tooltipRect.height > windowHeight
            ) {
                newPosition = 'above';
            } else if (position === 'left' && targetRect.left < tooltipRect.width) {
                newPosition = 'right';
            } else if (position === 'right' && targetRect.right + tooltipRect.width > windowWidth) {
                newPosition = 'left';
            }

            setTooltipPosition(newPosition);
        }
    }, [visible, position]);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            ref={targetRef}
        >
            {children}
            {visible && (
                <div
                    ref={tooltipRef}
                    className={`absolute z-10 p-2 text-sm text-white bg-black rounded-md ${
                        tooltipPosition === 'above'
                            ? 'bottom-full mb-2'
                            : tooltipPosition === 'below'
                              ? 'top-full mt-2'
                              : tooltipPosition === 'left'
                                ? 'right-full mr-2'
                                : 'left-full ml-2'
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default ToolTip;
