import { motion, PanInfo, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface ISwipeableTabs {
  children: React.ReactNode[];
  value: number;
  onChange: (i: number) => void;
  disabled?: boolean;
}

export function swipePower(offset: number, absDistance: number): number {
  return (offset / absDistance) * 100;
}

export const SwipeableTabs = ({ children, value, onChange, disabled = false }: ISwipeableTabs) => {
  const animation = useAnimation();

  const constraintsRef = useRef(null);

  const handleDragEnd = async (evt: any, { offset }: PanInfo) => {
    if (disabled) return;

    const power = swipePower(offset.x, document.body.offsetWidth);

    if (power > 30) {
      const newIndex = Math.max(0, value - 1);
      onChange(newIndex);

      await animation.start({ x: -newIndex * document.body.offsetWidth });
    } else if (power < -30) {
      const newIndex = Math.min(children.length - 1, value + 1);
      onChange(newIndex);

      await animation.start({
        x: -newIndex * document.body.offsetWidth,
      });
    } else {
      await animation.start({
        x: -value * document.body.offsetWidth,
      });
    }
  };

  useEffect(() => {
    animation.start({ x: -value * document.body.offsetWidth });
  }, [value]);

  const content = children.map((child, i) => (
    <div key={i} style={{ width: '100%', height: '100%' }}>
      {child}
    </div>
  ));

  return (
    <div ref={constraintsRef} style={{ maxWidth: '100vw', height: '100%', overflowX: 'hidden' }}>
      <motion.div
        style={{
          width: `calc(100vw * ${children.length})`,
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          maxHeight: '100%',
          touchAction: 'pan-y',
        }}
        draggable={false}
        drag={disabled ? false : 'x'}
        animate={animation}
        dragListener={!disabled}
        onDragEnd={disabled ? undefined : handleDragEnd}
        dragConstraints={constraintsRef}
        dragElastic={0}
      >
        {content.map((el) => (
          <motion.div
            layoutScroll
            style={{
              overflow: 'scroll',
              height: '100%',
              maxHeight: '100%',
              touchAction: 'pan-y',
              minWidth: `calc(100% / ${content.length})`,
              maxWidth: `calc(100% / ${content.length})`,
            }}
          >
            {el}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
