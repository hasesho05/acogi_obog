import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { LazyMotion, domAnimation } from 'motion/react';
import type { ReactNode } from 'react';

const AllProviders = (props: { children: ReactNode }) => {
  return (
    <LazyMotion features={domAnimation}>{props.children}</LazyMotion>
  );
};

export const renderWithProviders = (
  ui: ReactNode,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, { wrapper: AllProviders, ...options });
};
