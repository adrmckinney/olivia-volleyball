import { useContext } from 'react';
import { NavigationContext } from '../../context/NavigationProvider';
import WhiteWithPurpleHue from '../../sharedComponents/Containers/WhiteWithPurpleHue';

const About = () => {
    const { aboutRef } = useContext(NavigationContext);

    const paragraphs = [
        'Olivia’s journey in volleyball began as a freshman when she decided to try out for her high school team, despite having no prior experience in the sport. Although she did not initially make the team, she took the initiative to reach out to the coaches, asking for feedback on what she could improve for the following year. The coaches responded with constructive advice and, to her surprise, offered her a spot on the team.',
        'Since then, Olivia has developed into a dedicated team player, a natural leader, and a rising star on the court. She is known for being coachable and committed, always striving to better herself for the benefit of her team. She attends all available clinics and stays competitive by starting her mornings in the weight room three times a week and returns to the gym to focus on volleyball skills whenever she has the chance after school.',
        'Olivia has been nominated as most improved player and MVP twice. Despite a challenging 2024 high school volleyball season—the team navigated a Title IX investigation—she ended the season third in the conference for assists.',
        'In addition to her athletic pursuits, Olivia demonstrates exceptional time management and work ethic. She juggles her training with babysitting, a part-time job, and her involvement in the school choir. Olivia’s drive, versatility, and commitment to both personal and team growth make her a standout student-athlete.',
    ];

    return (
        <div ref={aboutRef}>
            <WhiteWithPurpleHue maxWidth="lg:max-w-screen-3xl">
                <figure className="mt-10 space-y-10">
                    {paragraphs.map((paragraph, idx) => (
                        <blockquote
                            key={idx}
                            className="text-start text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9"
                        >
                            <p>{paragraph}</p>
                        </blockquote>
                    ))}
                </figure>
            </WhiteWithPurpleHue>
        </div>
    );
};

export default About;
