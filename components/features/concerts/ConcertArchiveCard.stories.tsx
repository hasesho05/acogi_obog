import type { Meta, StoryObj } from '@storybook/react';
import ConcertArchiveCard from './ConcertArchiveCard';

const meta = {
  title: 'Features/Concerts/ConcertArchiveCard',
  component: ConcertArchiveCard,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'warm-white' },
  },
} satisfies Meta<typeof ConcertArchiveCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Completed: Story = {
  args: {
    data: {
      year: 2025,
      status: 'completed',
      date: '2025年1月26日（日）',
      time: '13:00 開場 / 13:30 開演',
      venue: 'SECOND ROOMS',
      detailLink: '/concerts/2025',
      description:
        '記念すべき第1回OBOG演奏会。卒業生が再び集い、アコースティックギターの音色を響かせました。',
    },
    index: 0,
  },
};

export const Upcoming: Story = {
  args: {
    data: {
      year: 2026,
      status: 'upcoming',
      description: '第2回OBOG演奏会。詳細は決まり次第お知らせします。',
    },
    index: 1,
  },
};

export const CompletedWithoutLink: Story = {
  args: {
    data: {
      year: 2024,
      status: 'completed',
      date: '2024年3月10日（日）',
      time: '14:00 開場 / 14:30 開演',
      venue: 'カフェライブ',
      description: '小規模なアコースティックライブイベント。',
    },
    index: 0,
  },
};
