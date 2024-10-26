// colors: {
//   textHeavy: 'bg-gray-300',
//   textLight: 'bg-gray-200',
//   divideLine: 'divide-gray-200',
//   border: 'border-gray-200',
// },

const SkeletonList = () => {
    return (
        <>
            <div
                role="status"
                className={[
                    'p-4 space-y-4 max-w-md rounded border divide-y shadow animate-pulse md:p-6',
                    'border-gray-200',
                    'divide-gray-200',
                ].join(' ')}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <div
                            className={['h-2.5 rounded-full w-24 mb-2.5', 'bg-gray-300'].join(' ')}
                        ></div>
                        <div className={['w-32 h-2 rounded-full', 'bg-gray-200'].join(' ')}></div>
                    </div>
                    <div className={['h-2.5 rounded-full w-12', 'bg-gray-300'].join(' ')}></div>
                </div>
                <div className="flex justify-between items-center pt-4">
                    <div>
                        <div
                            className={['h-2.5 rounded-full w-24 mb-2.5', 'bg-gray-300'].join(' ')}
                        ></div>
                        <div className={['w-32 h-2 rounded-full', 'bg-gray-200'].join(' ')}></div>
                    </div>
                    <div className={['h-2.5 rounded-full w-12', 'bg-gray-300'].join(' ')}></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </>
    );
};

export default SkeletonList;
