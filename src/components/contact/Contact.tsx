import { ChangeEvent, useContext, useState } from 'react';
import { colors } from '../../configs/colors';
import { NavigationContext } from '../../context/NavigationProvider';
// import portrait2024BallTossCut from '../../images/portrait2024BallTossCut.png';
import portrait2024BallToss from '../../images/portrait2024BallToss.jpeg';
import TextField from '../../sharedComponents/Inputs/TextField';
import SectionHeader from '../../sharedComponents/SectionHeader';

type FieldName = 'firstName' | 'lastName' | 'email' | 'message';
type FormField = {
    name: FieldName;
    label: string;
};

interface Input {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

const initialValues: Input = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};

const Contact = () => {
    const { contactRef, hideNavBackground } = useContext(NavigationContext);
    const [input, setInput] = useState(initialValues);

    const formFields: FormField[] = [
        {
            name: 'firstName',
            label: 'First name',
        },
        {
            name: 'lastName',
            label: 'Last name',
        },
        {
            name: 'email',
            label: 'Email',
        },
        {
            name: 'message',
            label: 'Message',
        },
    ];

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const newInput = { ...input, [name]: value };
        setInput(newInput);
    };

    const paddingBottom = 'lg:py-10';
    return (
        <div ref={contactRef} className={['relative isolate', colors.bgMain].join(' ')}>
            <SectionHeader
                title="Talk to Liv"
                hideNavBackground={hideNavBackground}
                isContactHeader
            />
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div
                    className={[
                        'relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8  order-last',
                        // 'lg:py-48',
                        paddingBottom,
                    ].join(' ')}
                >
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
                            <svg
                                aria-hidden="true"
                                className={[
                                    'absolute inset-0 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]',
                                    // 'stroke-gray-700',
                                    'stroke-white/10',
                                ].join(' ')}
                            >
                                <defs>
                                    <pattern
                                        x="100%"
                                        y={-1}
                                        id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                                        width={200}
                                        height={200}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path d="M130 200V.5M.5 .5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <svg x="100%" y={-1} className="overflow-visible fill-gray-800/20">
                                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                </svg>
                                <rect
                                    fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                                    width="100%"
                                    height="100%"
                                    strokeWidth={0}
                                />
                            </svg>
                            <div
                                aria-hidden="true"
                                className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                            >
                                <div
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                                    }}
                                    className={[
                                        'aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20',
                                    ].join(' ')}
                                />
                            </div>
                        </div>

                        <div className="mx-auto mt-0 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                            <img
                                src={portrait2024BallToss}
                                alt="portrait"
                                className={[
                                    'w-[40rem] rounded-md',
                                    'bg-transparent',
                                    'shadow-2xl',
                                    'ring-0',
                                    'ring-white/10',
                                ].join(' ')}
                            />
                        </div>

                        {/* <h2 className="text-3xl font-bold tracking-tight text-white">
                            Talk to Liv
                        </h2> */}
                        {/* <p className="mt-6 text-lg leading-8 text-gray-300">
                            Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie
                            a eu arcu. Sed ut tincidunt integer elementum id sem. Arcu sed malesuada
                            et magna.
                        </p> */}
                        {/* <dl className="mt-10 space-y-4 text-base leading-7 text-gray-300">
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Address</span>
                                        <BuildingOffice2Icon
                                            aria-hidden="true"
                                            className="h-7 w-6 text-gray-400"
                                        />
                                    </dt>
                                    <dd>
                                        545 Mavis Island
                                        <br />
                                        Chicago, IL 99191
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Telephone</span>
                                        <PhoneIcon
                                            aria-hidden="true"
                                            className="h-7 w-6 text-gray-400"
                                        />
                                    </dt>
                                    <dd>
                                        <a
                                            href="tel:+1 (555) 234-5678"
                                            className="hover:text-white"
                                        >
                                            +1 (555) 234-5678
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Email</span>
                                        <EnvelopeIcon
                                            aria-hidden="true"
                                            className="h-7 w-6 text-gray-400"
                                        />
                                    </dt>
                                    <dd>
                                        <a
                                            href="mailto:hello@example.com"
                                            className="hover:text-white"
                                        >
                                            hello@example.com
                                        </a>
                                    </dd>
                                </div>
                            </dl> */}
                    </div>
                </div>
                <form
                    className={[
                        'px-6 pb-0 pt-4 sm:pb-32 lg:px-8',
                        //   'lg:py-48',
                        paddingBottom,
                    ].join(' ')}
                >
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {formFields.map(field => (
                                <TextField
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    handleChange={handleChange}
                                    type={field.name === 'email' ? 'email' : 'text'}
                                    value={input[field.name]}
                                    isTextArea={field.name === 'message'}
                                />
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                className="rounded-md bg-purple-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Send message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
