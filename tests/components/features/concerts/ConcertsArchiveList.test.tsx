import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils';
import ConcertsArchiveList from '@/components/features/concerts/ConcertsArchiveList';
import { getConcerts } from '@/infrastructure/repositories/concertRepository';

describe('ConcertsArchiveList', () => {
  it('should render section heading', () => {
    renderWithProviders(<ConcertsArchiveList />);
    expect(screen.getByText('演奏会アーカイブ')).toBeInTheDocument();
  });

  it('should render archive label', () => {
    renderWithProviders(<ConcertsArchiveList />);
    expect(screen.getByText('Archive')).toBeInTheDocument();
  });

  it('should render all concerts from repository', () => {
    renderWithProviders(<ConcertsArchiveList />);
    const concerts = getConcerts();
    for (const concert of concerts) {
      const yearElements = screen.getAllByText(String(concert.year));
      expect(yearElements.length).toBeGreaterThan(0);
    }
  });
});
