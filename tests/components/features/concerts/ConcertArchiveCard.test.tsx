import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils';
import ConcertArchiveCard from '@/components/features/concerts/ConcertArchiveCard';
import type { ConcertData } from '@/domain/entities/concert';

const completedConcert: ConcertData = {
  year: 2025,
  status: 'completed',
  date: '2025年1月26日（日）',
  time: '13:00 開場 / 13:30 開演',
  venue: 'SECOND ROOMS',
  detailLink: '/concerts/2025',
  description: '第1回OBOG演奏会。',
};

const upcomingConcert: ConcertData = {
  year: 2026,
  status: 'upcoming',
  description: '第2回OBOG演奏会。',
};

describe('ConcertArchiveCard', () => {
  it('should render year for completed concert', () => {
    renderWithProviders(
      <ConcertArchiveCard data={completedConcert} index={0} />,
    );
    const yearElements = screen.getAllByText('2025');
    expect(yearElements.length).toBeGreaterThan(0);
  });

  it('should render date, time, and venue for completed concert', () => {
    renderWithProviders(
      <ConcertArchiveCard data={completedConcert} index={0} />,
    );
    expect(screen.getByText('2025年1月26日（日）')).toBeInTheDocument();
    expect(screen.getByText('13:00 開場 / 13:30 開演')).toBeInTheDocument();
    expect(screen.getByText('SECOND ROOMS')).toBeInTheDocument();
  });

  it('should render description', () => {
    renderWithProviders(
      <ConcertArchiveCard data={completedConcert} index={0} />,
    );
    expect(screen.getByText('第1回OBOG演奏会。')).toBeInTheDocument();
  });

  it('should render detail link for completed concert', () => {
    renderWithProviders(
      <ConcertArchiveCard data={completedConcert} index={0} />,
    );
    const link = screen.getByText('詳細を見る');
    expect(link.closest('a')).toHaveAttribute('href', '/concerts/2025');
  });

  it('should render "終了" badge for completed concert', () => {
    renderWithProviders(
      <ConcertArchiveCard data={completedConcert} index={0} />,
    );
    expect(screen.getByText('終了')).toBeInTheDocument();
  });

  it('should render "Coming Soon" for upcoming concert', () => {
    renderWithProviders(
      <ConcertArchiveCard data={upcomingConcert} index={0} />,
    );
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('should show placeholder text for upcoming concert without date', () => {
    renderWithProviders(
      <ConcertArchiveCard data={upcomingConcert} index={0} />,
    );
    expect(
      screen.getByText('日程未定 — 続報をお待ちください'),
    ).toBeInTheDocument();
  });

  it('should not render detail link for upcoming concert', () => {
    renderWithProviders(
      <ConcertArchiveCard data={upcomingConcert} index={0} />,
    );
    expect(screen.queryByText('詳細を見る')).not.toBeInTheDocument();
  });
});
