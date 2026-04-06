import type { Meta, StoryObj } from '@storybook/react';
import ConcertSection from './ConcertSection';

const meta = {
  title: 'Features/Top/ConcertSection',
  component: ConcertSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'warm-white' },
  },
} satisfies Meta<typeof ConcertSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
