import { Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import classes from './HorizontalSwipeContainer.module.css';

interface IHorizontalSwipeContainerProps {
  children: ReactNode | ReactNode[];
}

export function HorizontalSwipeContainer({ children }: IHorizontalSwipeContainerProps) {
  const ref = useRef(null);

  return (
    <Box className={classes.root} ref={ref}>
      <motion.div drag="x" dragConstraints={ref} dragElastic={0.1} className={classes.list}>
        {children}
      </motion.div>
    </Box>
  );
}
