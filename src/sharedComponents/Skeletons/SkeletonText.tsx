import { ReactNode } from 'react';

type ClassTypes = 'random' | 'common';

interface Props {
    numberOfLines?: number;
    classType?: ClassTypes;
}

const SkeletonText = ({ numberOfLines = 2, classType = 'random' }: Props) => {
    // Define width classes for each line's content; extend as needed for more variation
    const widthClasses = {
        random: [
            ['w-32', 'w-24', 'w-full'],
            ['w-full', 'w-full', 'w-24'],
            ['w-full', 'w-80', 'w-full'],
        ],
        common: [['w-24'], ['w-32']],
    };

    const getSkeletonLines = (): ReactNode[] => {
        return Array.from({ length: numberOfLines }).map((_, index) => {
            // Choose width classes based on the index, looping through if there are more lines than presets
            const classes = widthClasses[classType][index % widthClasses[classType].length];

            return (
                <div key={index} className="flex items-center space-x-2 w-full max-w-lg">
                    {classes.map((widthClass, i) => (
                        <div
                            key={i}
                            className={`h-2.5 rounded-full ${widthClass} ${
                                i === 0 ? 'bg-purple-200' : 'bg-purple-100'
                            }`}
                        ></div>
                    ))}
                </div>
            );
        });
    };

    return (
        <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
            {getSkeletonLines()}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default SkeletonText;
