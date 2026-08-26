import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Live2026Overview from '@/components/features/live2026/Live2026Overview';
import { renderWithProviders } from '../../../utils';

describe('Live2026Overview', () => {
  it('should render the confirmed date', () => {
    renderWithProviders(<Live2026Overview />);

    expect(screen.getByText('2026年11月14日（土）')).toBeInTheDocument();
  });

  it('should render start and end time with note', () => {
    renderWithProviders(<Live2026Overview />);

    expect(screen.getByText('11:30 開演 / 14:45 ごろ終演')).toBeInTheDocument();
    expect(screen.getByText('開場時間は決まり次第お知らせします')).toBeInTheDocument();
  });

  it('should render venue fallback', () => {
    renderWithProviders(<Live2026Overview />);

    expect(screen.getByText('決まり次第お知らせします')).toBeInTheDocument();
  });
});
