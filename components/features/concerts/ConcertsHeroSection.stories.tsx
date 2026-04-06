import type { Meta, StoryObj } from '@storybook/react';
import ConcertsHeroSection from './ConcertsHeroSection';

const meta = {
  title: 'Features/Concerts/ConcertsHeroSection',
  component: ConcertsHeroSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'warm-white' },
  },
} satisfies Meta<typeof ConcertsHeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
