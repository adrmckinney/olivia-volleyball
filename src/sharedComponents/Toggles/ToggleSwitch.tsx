import { Field, Label, Switch } from '@headlessui/react';

interface Props {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    leftLabel?: string;
    rightLabel?: string;
}

const ToggleSwitch = ({ enabled, onChange, leftLabel = '', rightLabel = '' }: Props) => {
    return (
        <Field className="flex items-center">
            {leftLabel && (
                <Label as="span" className="mr-3 text-sm font-medium text-gray-900">
                    {leftLabel}
                </Label>
            )}
            <Switch
                checked={enabled}
                onChange={onChange}
                className={`${
                    enabled ? 'bg-gray-700' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2`}
            >
                <span
                    aria-hidden="true"
                    className={`${
                        enabled ? 'translate-x-5' : 'translate-x-1'
                    } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            {rightLabel && (
                <Label as="span" className="ml-3 text-sm font-medium text-gray-900">
                    {rightLabel}
                </Label>
            )}
        </Field>
    );
};

export default ToggleSwitch;
