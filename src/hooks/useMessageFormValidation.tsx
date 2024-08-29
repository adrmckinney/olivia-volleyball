import { useEffect, useState } from 'react';
import { MessageInput } from '../components/contact/Contact';

interface Touched {
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    message?: boolean;
}

const validateEmail = (email: string) => {
    if (email.length) {
        return {
            valid: !!email
                ?.toLowerCase()
                ?.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
            message: 'Invalid email',
        };
    }
    return {
        valid: !!email.length,
        message: 'Email is required',
    };
};

const useMessageFormValidation = (
    { firstName, lastName, email, message }: MessageInput,
    touched: Touched
) => {
    const [firstNameError, setFirstNameError] = useState({
        valid: false,
        message: '',
    });
    const [lastNameError, setLastNameError] = useState({
        valid: false,
        message: '',
    });
    const [emailMustExistError, setEmailMustExistError] = useState({
        valid: false,
        message: '',
    });
    const [messageError, setMessageError] = useState({
        valid: false,
        message: '',
    });

    useEffect(() => {
        if (touched?.firstName) {
            setFirstNameError(state => ({
                ...state,
                valid: !!firstName?.length,
                message: 'First name is required',
            }));
        }
        if (touched?.lastName) {
            setLastNameError(state => ({
                ...state,
                valid: !!lastName?.length,
                message: 'Last name is required',
            }));
        }
        if (touched?.email) {
            const newState = validateEmail(email);
            setEmailMustExistError(state => ({
                ...state,
                ...newState,
            }));
        }
        if (touched?.message) {
            console.log('message touched');
            setMessageError(state => ({
                ...state,
                valid: !!message?.length,
                message: 'Please provide a message',
            }));
        }
    }, [firstName, lastName, email, message, touched]);

    return {
        validations: {
            firstName: firstNameError,
            lastName: lastNameError,
            email: emailMustExistError,
            message: messageError,
        },
    };
};

export default useMessageFormValidation;
