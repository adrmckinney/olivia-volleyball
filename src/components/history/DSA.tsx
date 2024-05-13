import { icon } from '../../utils/Icons';

const DSA = () => {
    return (
        <>
            <p>
                Olivia decided to try out for the volleyball team with it being her first ever time
                playing the sport. At first she did not make the team but reached out to the coaches
                to ask what she needs to improve on for next year. The coaches responded with
                feedback as-well as an offer for a spot on the team because someone did not accept
                theirs. Olivia did not have a lot of playing time in her position was as a back row
                player. In the last few weeks of the season coach decided to put Olivia as a setter,
                and that is when she started to find more joy in the sport.
            </p>
            <ul className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                    <icon.cloudArrowUp
                        className="mt-1 h-5 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                    />
                    <span>
                        <strong className="font-semibold text-gray-900">Push to deploy.</strong>{' '}
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit
                        perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
                    </span>
                </li>
                <li className="flex gap-x-3">
                    <icon.lockClosed
                        className="mt-1 h-5 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                    />
                    <span>
                        <strong className="font-semibold text-gray-900">SSL certificates.</strong>{' '}
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
                        cupidatat commodo.
                    </span>
                </li>
                <li className="flex gap-x-3">
                    <icon.server
                        className="mt-1 h-5 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                    />
                    <span>
                        <strong className="font-semibold text-gray-900">Database backups.</strong>{' '}
                        Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit
                        morbi lobortis.
                    </span>
                </li>
            </ul>
            <p className="mt-8">
                Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id
                blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel.
                Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac
                tempor et ut. Ac lorem vel integer orci.
            </p>
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                No server? No problem.
            </h2>
            <p className="mt-6">
                Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis
                arcu ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat
                vulputate nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris.
                Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
                ipsum eu a sed convallis diam.
            </p>
        </>
    );
};

export default DSA;
