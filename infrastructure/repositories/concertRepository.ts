import type { ConcertData } from '@/domain/entities/concert';

export const concerts: ConcertData[] = [
  {
    year: 2025,
    status: 'completed',
    date: '2025年10月12日（日）',
    time: '11:00 開場 / 11:30 開演',
    venue: 'SECOND ROOMS',
    detailLink: '/concerts/2025',
    description:
      '記念すべき第1回OBOG演奏会。卒業生が再び集い、アコースティックギターの音色を響かせました。',
  },
  {
    year: 2026,
    status: 'upcoming',
    date: '2026年11月14日（土）',
    time: '11:30 開演 / 14:45 ごろ終演',
    venue: 'SECOND ROOMS',
    detailLink: '/concerts/2026',
    description: '第2回OBOG演奏会。詳細は決まり次第お知らせします。',
  },
];

export const getConcerts = (): ConcertData[] => concerts;

export const getConcertByYear = (year: number): ConcertData | undefined =>
  concerts.find((c) => c.year === year);
