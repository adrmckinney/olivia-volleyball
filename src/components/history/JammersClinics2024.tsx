import { icon } from '../../utils/Icons';
import { textColor } from '../../utils/Styles';

const JammersClinics2024 = () => {
    const skills = [
        {
            title: 'Serve and Serve Receive',
            date: 'April 21, 2024',
        },
        {
            title: 'Blocking',
            date: 'April 28, 2024',
        },
        {
            title: 'Setting',
            date: 'April 28, 2024',
        },
        {
            title: 'Hitting',
            date: 'May 19, 2024',
        },
    ];

    return (
        <div className="mt-6 space-y-10">
            <p>
                During the off-season, Jammers Volleyball Club hosts multiple specialized volleyball
                clinics for athletes wanting to improve their skill set during the off-season.
            </p>
            <p>Olivia partiicpated in the following clinics:</p>
            <ul className={`ml-10 space-y-8 font-semibold ${textColor.paragraph}`}>
                {skills.map((skill, idx) => (
                    <li key={`${skill.title}-${idx}`} className="flex gap-x-3">
                        <icon.sparkles className="w-10" />
                        <div className="flex flex-col">
                            <p>{skill.title}</p>
                            <p className="mt-0.5 text-base text-gray-500">{skill.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JammersClinics2024;
