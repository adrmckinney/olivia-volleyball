import emailjs from '@emailjs/browser';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import portrait2024BallToss from '../../assets/images/portrait2024BallToss.jpeg';
import { colors } from '../../configs/colors';
import { emailJsConfigs } from '../../configs/emailJs';
import { fontFamilies } from '../../configs/fontFamilies';
import { themes } from '../../configs/themes';
import { NavigationContext } from '../../context/NavigationProvider';
import useForm from '../../hooks/useForm';
import useMessageFormValidation from '../../hooks/useMessageFormValidation';
import ConditionalRender from '../../sharedComponents/ConditionalRender';
import TextField from '../../sharedComponents/Inputs/TextField';
import SectionHeader from '../../sharedComponents/SectionHeader';

type FieldName = 'firstName' | 'lastName' | 'email' | 'message';
type FormField = {
    name: FieldName;
    label: string;
};

export type MessageInput = {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
};

const initialValues: MessageInput = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
};

const initialMessageStatusValues: ContactMessageStatus = {
    status: '',
    message: '',
};

type ContactMessageStatus = {
    status: 'ok' | 'error' | '';
    message: string;
};

const Contact = () => {
    const { contactRef, hideNavBackground } = useContext(NavigationContext);
    const {
        input,
        touched,
        setInput,
        handleChange,
        handleOnBlur,
        checkAndTriggerValidation,
        resetTouchedFields,
    } = useForm(initialValues);
    const { validations } = useMessageFormValidation(input, touched);

    const [messageSentStatus, setMessageSentStatus] = useState<ContactMessageStatus>(
        initialMessageStatusValues
    );

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

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (messageSentStatus.status === 'ok') {
            setMessageSentStatus(initialMessageStatusValues);
        }

        handleChange(e);

        checkAndTriggerValidation(validations);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        emailjs
            .send(
                emailJsConfigs.services.vb,
                emailJsConfigs.templates.contactPlayer,
                input as unknown as Record<string, unknown>,
                import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
            )
            .then(
                () => {
                    setMessageSentStatus({ status: 'ok', message: 'Message sent' });
                    setInput(initialValues);
                    resetTouchedFields(formFields);
                },
                (error: unknown) => {
                    setMessageSentStatus({
                        status: 'error',
                        message: `Message failed to send: ${JSON.stringify(error)}`,
                    });
                }
            );
    };

    const checkIfFormValid = () => {
        const formInvalid = Object.values(validations).some(validation => !validation.valid);
        return formInvalid;
    };

    const paddingBottom = 'lg:py-10';
    return (
        <div
            ref={contactRef}
            id="contacts"
            className={['relative isolate', colors.bgMain, 'pt-10'].join(' ')}
        >
            <SectionHeader
                title="Talk to Liv"
                hideNavBackground={hideNavBackground}
                isContactHeader
            />
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div
                    className={[
                        'relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 order-last',
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
                                    'shadow-purple-300',
                                    'ring-0',
                                    'ring-white/10',
                                ].join(' ')}
                            />
                        </div>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={['px-6 pb-0 pt-4 sm:pb-32 lg:px-8', paddingBottom].join(' ')}
                >
                    <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                        <p className={[themes.historyBody, 'pb-10'].join(' ')}>
                            I am a Junior at Riverside High School, Durham, NC. If you would like to
                            reach out to me, please submit the following form and I will get back to
                            you.
                        </p>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            {formFields.map(field => (
                                <TextField
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    handleChange={handleFormChange}
                                    type={field.name === 'email' ? 'email' : 'text'}
                                    value={input[field.name]}
                                    isTextArea={field.name === 'message'}
                                    autoCapitalize={field.name === 'email' ? 'none' : 'sentences'}
                                    handleOnBlur={handleOnBlur}
                                    validation={validations[field.name]}
                                />
                            ))}
                        </div>
                        <div className="mt-8 flex justify-end items-center">
                            <ConditionalRender condition={!!messageSentStatus.status.length}>
                                <p
                                    className={[
                                        'overflow-auto pr-10',
                                        fontFamilies.body,
                                        messageSentStatus.status === 'ok'
                                            ? 'text-green-700 text-base'
                                            : 'text-red-500 text-sm',
                                    ].join(' ')}
                                >
                                    {messageSentStatus.message}
                                </p>
                            </ConditionalRender>
                            <button
                                type="submit"
                                className={[
                                    'rounded-md  px-3.5 py-2.5 text-center text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',
                                    checkIfFormValid()
                                        ? 'bg-gray-500 text-gray-900 cursor-not-allowed'
                                        : 'bg-purple-600 hover:bg-purple-700 text-white focus-visible:outline-purple-500',
                                ].join(' ')}
                                disabled={checkIfFormValid()}
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
