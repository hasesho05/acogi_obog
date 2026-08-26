import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Live2026Memories from '@/components/features/live2026/Live2026Memories';
import { live2025Photos } from '@/infrastructure/repositories/live2026Repository';
import { renderWithProviders } from '../../../utils';

describe('Live2026Memories', () => {
  it('should render all archive photos', () => {
    renderWithProviders(<Live2026Memories />);

    for (const photo of live2025Photos) {
      expect(screen.getByAltText(photo.alt)).toBeInTheDocument();
    }
  });

  it('should render numbered captions', () => {
    renderWithProviders(<Live2026Memories />);

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('should fall back to a channel link when no videos are set', () => {
    renderWithProviders(<Live2026Memories />);

    const link = screen.getByRole('link', {
      name: /龍大アコギOBOGの部屋/,
    });
    expect(link).toHaveAttribute('href', 'https://www.youtube.com/@obog4633');
  });
});
