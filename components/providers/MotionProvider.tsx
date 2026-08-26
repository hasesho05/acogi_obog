'use client';

import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

const MotionProvider = (props: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{props.children}</MotionConfig>
    </LazyMotion>
  );
};

export default MotionProvider;
