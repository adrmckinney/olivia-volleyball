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
                <Label
                    as="span"
                    className={[
                        'mr-3 text-sm font-medium',
                        enabled ? 'text-gray-200' : 'text-purple-300',
                    ].join(' ')}
                >
                    {leftLabel}
                </Label>
            )}
            <Switch
                checked={enabled}
                onChange={onChange}
                className={`${
                    enabled ? 'bg-gray-200' : 'bg-gray-200'
                } relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
            >
                <span
                    aria-hidden="true"
                    className={`${
                        enabled ? 'translate-x-5' : 'translate-x-0.5'
                    } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-purple-400 shadow ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            {rightLabel && (
                <Label
                    as="span"
                    className={[
                        'ml-3 text-sm font-medium',
                        enabled ? 'text-purple-300' : 'text-gray-200',
                    ].join(' ')}
                >
                    {rightLabel}
                </Label>
            )}
        </Field>
    );
};

export default ToggleSwitch;
