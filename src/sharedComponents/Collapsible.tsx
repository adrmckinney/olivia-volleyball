import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    show: boolean;
    children: React.ReactNode;
    triggerComponent: React.ReactNode;
};

const Collapsible = ({ show, children, triggerComponent }: Props) => {
    return (
        <>
            <AnimatePresence>
                {triggerComponent}
                {show ? (
                    <motion.div
                        key="table"
                        initial={{ y: '-150px', opacity: 0 }}
                        animate={{ y: '0px', opacity: 1 }}
                        exit={{ y: '-150px', opacity: 0 }}
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
