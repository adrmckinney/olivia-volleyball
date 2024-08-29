import { ChangeEvent, useState } from 'react';
import { hasOnlyOneFalseValue } from '../helpers/objectHelpers';
import { FormFocusType } from '../sharedComponents/Inputs/TextField';

interface TouchedState {
    [index: string]: boolean | null;
}

interface NamedField {
    name: string;
}

const useForm = <T,>(initialValues: T) => {
    const [input, setInput] = useState(initialValues);
    const [touched, setTouched] = useState<TouchedState>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const newInput = { ...input, [name]: value };
        setInput(newInput);
    };

    const handleOnBlur = (event: FormFocusType): void => {
        const { name } = event.target;
        setTouched(touched => ({
            ...touched,
            [name]: true,
        }));
    };

    const checkAndTriggerValidation = <T extends Record<string, { valid: boolean }>>(
        validations: T
    ) => {
        // Check validation statuses to see if there is only one false left
        const onlyOneFalseLeft = hasOnlyOneFalseValue(Object.values(validations), 'valid');

        if (onlyOneFalseLeft) {
            const targetField = Object.entries(validations).filter(entity => !entity[1].valid);
            if (targetField.length !== 1) return;
            const key = targetField[0][0];
            setTouched(touched => ({
                ...touched,
                [key]: true,
            }));
        }
    };

    const resetTouchedFields = <T extends NamedField>(fields: T[]): void => {
        fields?.forEach((field: T) => {
            setTouched(touched => ({
                ...touched,
                [field['name']]: false,
            }));
        });
    };
    return {
        input,
        touched,
        setInput,
        handleChange,
        handleOnBlur,
        checkAndTriggerValidation,
        resetTouchedFields,
    };
};

export default useForm;
