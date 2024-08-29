import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import ConditionalRender from '../ConditionalRender';
import InputErrorMessage from './InputErrorMessage';

export type FormFocusType = React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

type Props = {
    label: string;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value: string;
    name: string;
    type?: HTMLInputTypeAttribute;
    isTextArea?: boolean;
    textAreaRows?: number;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    handleOnBlur?: (e: FormFocusType) => void;
    validation?: { valid: boolean; message: string };
    handleFocus?: (e: FormFocusType) => void;
};

const TextField = ({
    label,
    handleChange,
    value,
    name,
    type = 'text',
    isTextArea = false,
    textAreaRows = 4,
    autoCapitalize = 'sentences',
    handleOnBlur = (e: FormFocusType) => {},
    validation = { valid: true, message: '' },
    handleFocus = (e: FormFocusType) => {},
}: Props) => {
    const className =
        'block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-300 sm:text-sm sm:leading-6';
    return (
        <>
            <ConditionalRender
                condition={!isTextArea}
                falseRender={
                    <div className="sm:col-span-2">
                        <label
                            htmlFor={name}
                            className="block text-sm font-semibold leading-6 text-white"
                        >
                            {label}
                        </label>
                        <div className="mt-2.5">
                            <textarea
                                id={name}
                                name={name}
                                rows={textAreaRows}
                                className={className}
                                value={value}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
                                onFocus={handleFocus}
                            />
                        </div>
                        <ConditionalRender condition={!validation?.valid}>
                            <InputErrorMessage name={name} errorMessage={validation?.message} />
                        </ConditionalRender>
                    </div>
                }
            >
                <div>
                    <label
                        htmlFor={name}
                        className="block text-sm font-semibold leading-6 text-white"
                    >
                        {label}
                    </label>
                    <div className="mt-2.5">
                        <input
                            id={name}
                            name={name}
                            type={type}
                            className={className}
                            value={value}
                            onChange={handleChange}
                            autoCapitalize={autoCapitalize}
                            onBlur={handleOnBlur}
                            onFocus={handleFocus}
                        />
                    </div>
                    <ConditionalRender condition={!validation?.valid}>
                        <InputErrorMessage name={name} errorMessage={validation?.message} />
                    </ConditionalRender>
                </div>
            </ConditionalRender>
        </>
    );
};

export default TextField;
