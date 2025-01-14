import { ReactNode } from 'react';

type WidthOptions =
    | 'lg:max-w-2xl'
    | 'lg:max-w-3xl'
    | 'lg:max-w-4xl'
    | 'lg:max-w-5xl'
    | 'lg:max-w-6xl'
    | 'lg:max-w-7xl'
    | 'lg:max-w-screen-1xl'
    | 'lg:max-w-screen-2xl'
    | 'lg:max-w-screen-3xl'
    | 'lg:max-w-full';

type Props = {
    children: ReactNode;
    maxWidth?: WidthOptions;
};

const WhiteWithPurpleHue = ({ children, maxWidth = 'lg:max-w-4xl' }: Props) => {
    return (
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-purple-600/10 ring-1 ring-purple-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
            <div className={['mx-auto max-w-2xl', maxWidth].join(' ')}>{children}</div>
        </section>
    );
};

export default WhiteWithPurpleHue;
