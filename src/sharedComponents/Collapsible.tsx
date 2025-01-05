import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    show: boolean;
    children: React.ReactNode;
    triggerComponent: React.ReactNode;
    initialY?: string;
};

const Collapsible = ({ show, children, triggerComponent, initialY = '-100px' }: Props) => {
    return (
        <>
            <AnimatePresence>
                {triggerComponent}
                {show ? (
                    <motion.div
                        key="table"
                        initial={{ y: initialY, opacity: 0 }}
                        animate={{ y: '0px', opacity: 1 }}
                        exit={{ y: initialY, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={['flex flex-col justify-center items-start w-full'].join(' ')}
                    >
                        {children}
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </>
    );
};

export default Collapsible;
