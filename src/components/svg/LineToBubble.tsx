import { motion } from 'framer-motion';
import { SVGProps } from 'react';

const LineToBubble = (props: SVGProps<SVGSVGElement>) => {
    const durationAndDelay = 1.7;

    return (
        <svg
            // width={2086}
            // height={200}
            viewBox="0 0 2086 200" // original 0 0 2086 200
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible', zIndex: 99999 }}
            {...props}
        >
            <motion.g id="lineToBubble">
                <motion.line
                    id="Line 1"
                    x1={120.1} // original beginning point 00954396
                    y1={91}
                    // x2={1886.01} // original ending point
                    x2={120.1} // Start from the left
                    y2={97}
                    stroke="white"
                    strokeWidth={6}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{
                        x2: 1886.01, // Extend to the right
                        opacity: 1, // Fade in
                        scaleX: 1, // Show the full line width
                    }}
                    transition={{
                        times: [0, 1],
                        duration: durationAndDelay,
                        delay: 0.01,
                        // type: 'keyframes',
                        ease: 'easeInOut',
                    }}
                />
                <motion.circle
                    id="Ellipse 3"
                    cx={1986}
                    cy={100}
                    r={100}
                    fill="#D9D9D9"
                    animate={{ scale: [2, 3, 2], opacity: [0, 100] }}
                    transition={{
                        delay: durationAndDelay,
                    }}
                />
            </motion.g>
        </svg>
    );
};
export default LineToBubble;
