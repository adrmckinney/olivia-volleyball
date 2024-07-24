import { themes } from '../../configs/themes';

const stats = [
    { label: 'Position', value: 'Setter' },
    { label: 'Height', value: `5' 6"` },
    { label: 'GPA', value: '3.4' },
    { label: 'Class', value: '2026' },
];

const SnapshotStats = () => {
    return (
        <div className="lg:flex lg:flex-auto w-full">
            <dl className="grid w-full grid-cols-2 items-center justify-between gap-y-10">
                {stats.map(stat => (
                    <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                        <dt className={[themes.descriptionTitle].join(' ')}>{stat.label}</dt>
                        <dd className={[themes.descriptionData].join(' ')}>{stat.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};

export default SnapshotStats;
