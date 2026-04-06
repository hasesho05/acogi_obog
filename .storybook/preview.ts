import type { Preview } from '@storybook/react';
import { withMotion } from './decorators';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'warm-white',
      values: [
        { name: 'warm-white', value: '#fff5f0' },
        { name: 'dark', value: '#8b3a1e' },
      ],
    },
    layout: 'fullscreen',
  },
  decorators: [withMotion],
};

export default preview;
