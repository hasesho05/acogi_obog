import { LazyMotion, domAnimation } from 'motion/react';
import type { Decorator } from '@storybook/react';

export const withMotion: Decorator = (Story) => (
  <LazyMotion features={domAnimation}>
    <Story />
  </LazyMotion>
);
