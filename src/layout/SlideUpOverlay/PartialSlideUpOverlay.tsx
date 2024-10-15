import { useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { useLocation, useNavigate } from 'react-router-dom';
import { Overlay, Stack, Transition as MantineTransition } from '@mantine/core';
import { createPortal } from 'react-dom';
import classes from './PartialSlideUpOverlay.module.css';
import { Queue } from '../../helpers/Queue';

const transitionStyles = {
  entering: { transform: 'translateY(0)' },
  entered: { transform: 'translateY(0)' },
  exiting: { transform: 'translateY(100vh)' },
  exited: { transform: 'translateY(100vh)' },
  unmounted: {},
};

interface ISlideUpOverlayProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  id: string;
  height?: number;
}

export const PartialSlideUpOverlay = ({
  open,
  children,
  onClose,
  id,
  height = 80,
}: ISlideUpOverlayProps) => {
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const stateQueueRef = useRef(new Queue<{ id: string }>(2));

  useEffect(() => {
    stateQueueRef.current.enqueue(location.state);
  }, [location]);

  useEffect(() => {
    const popStateHandler = () => {
      if (id === stateQueueRef.current.get(0)?.id) {
        navigate(location.pathname, { state: location.state, replace: true });
        onClose();
      }
    };

    if (open) {
      navigate(location.pathname, {
        state: {
          id,
        },
      });

      window.addEventListener('popstate', popStateHandler);
    }

    return () => {
      window.removeEventListener('popstate', popStateHandler);
    };
  }, [open]);

  return (
    <>
      <MantineTransition mounted={open} transition="fade" duration={400} timingFunction="ease">
        {(styles) => (
          <Overlay style={styles} color="#000" backgroundOpacity={0.75} onClick={onClose} />
        )}
      </MantineTransition>
      {createPortal(
        <Transition nodeRef={nodeRef} in={open} timeout={700} unmountOnExit>
          {(state) => (
            <Stack
              gap={0}
              className={classes.wrapper}
              ref={nodeRef}
              style={{
                height: `${height}vh`,
                ...transitionStyles[state],
              }}
            >
              {children}
            </Stack>
          )}
        </Transition>,
        document.body
      )}
    </>
  );
};
