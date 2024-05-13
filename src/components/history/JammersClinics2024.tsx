// import { icon } from '../../utils/Icons';
import hittingIcon from '../../customIcons/hittingIcon.svg';
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
        <>
            <p>
                During the off-season, Jammers Volleyball Club hosts multiple specialized volleyball
                clinics for athletes wanting to improve their skill set during the off-season.
            </p>
            <ul className={`mt-8 ml-8 space-y-8 font-semibold ${textColor.paragraph}`}>
                {skills.map(skill => (
                    <li className="flex gap-x-3">
                        {/* <icon.cloudArrowUp
                            className="mt-1 h-5 w-5 flex-none text-indigo-600"
                            aria-hidden="true"
                        /> */}

                        <img src={hittingIcon} alt="" className="w-12" />
                        <div className="flex flex-col">
                            <p>{skill.title}</p>
                            <p className="mt-0.5 text-base text-gray-500">{skill.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default JammersClinics2024;
