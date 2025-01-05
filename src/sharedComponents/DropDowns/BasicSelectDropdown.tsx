import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { Icons } from '../../assets/Icons';
import { colors } from '../../configs/colors';
import ConditionalRender from '../ConditionalRender';

export type SelectOption = {
    [key: string]: string | boolean | (() => void);
    key: string;
    name: string;
};

type Props = {
    selected: SelectOption;
    handleChange: (option: SelectOption) => void;
    options: SelectOption[];
    label?: string;
};

const BasicSelectDropdown = ({ selected, options, handleChange, label = '' }: Props) => {
    return (
        <Listbox value={selected} onChange={handleChange}>
            <ConditionalRender condition={label.length > 0} isNullRender>
                <Label className="block text-sm/6 font-medium text-gray-50">{label}</Label>
            </ConditionalRender>
            <div className="relative mt-0 w-1/3">
                <ListboxButton
                    className={[
                        'grid w-full cursor-default grid-cols-1 rounded-md py-0.5 pl-3 pr-2 text-left outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 sm:text-sm/6',
                        colors.selectBg,
                        colors.selectText,
                        colors.selectFocusRing,
                    ].join(' ')}
                >
                    <span className="col-start-1 row-start-1 truncate pr-6">{selected.name}</span>
                    <Icons.ChevronUpDown
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className={[
                        'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm',
                        colors.selectBg,
                    ].join(' ')}
                >
                    {options.map(option => (
                        <ListboxOption
                            key={option.key}
                            value={option}
                            className={[
                                'group relative cursor-default select-none py-2 pl-3 pr-9 data-[focus]:bg-purple-500 data-[focus]:text-white data-[focus]:outline-none',
                                colors.selectText,
                            ].join(' ')}
                        >
                            <span className="block font-normal group-data-[selected]:font-semibold">
                                {option.name}
                            </span>

                            <span
                                className={[
                                    'absolute inset-y-0 right-0 flex items-center pr-4 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white',
                                    colors.selectIconColor,
                                ].join(' ')}
                            >
                                <Icons.Check aria-hidden="true" className="size-5" />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
};

export default BasicSelectDropdown;
