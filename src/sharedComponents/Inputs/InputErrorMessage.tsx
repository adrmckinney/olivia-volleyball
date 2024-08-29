interface Props {
    name: string;
    errorMessage: string;
}

const InputErrorMessage = ({ name, errorMessage }: Props) => {
    return (
        <>
            <p className="mt-2 text-sm text-red-600" id={`${name}`}>
                {errorMessage}
            </p>
        </>
    );
};

export default InputErrorMessage;
