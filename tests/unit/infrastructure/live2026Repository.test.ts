import { describe, expect, it } from 'vitest';
import {
  live2025Photos,
  live2025Videos,
  live2026Facts,
  live2026Venue,
  YOUTUBE_CHANNEL_URL,
} from '@/infrastructure/repositories/live2026Repository';

describe('live2026Repository', () => {
  it('should include the confirmed date fact', () => {
    const date = live2026Facts.find((fact) => fact.label === 'Date');

    expect(date?.value).toBe('2026年11月14日（土）');
  });

  it('should include start and end time', () => {
    const time = live2026Facts.find((fact) => fact.label === 'Time');

    expect(time?.value).toContain('11:30 開演');
    expect(time?.value).toContain('14:45');
  });

  it('should provide 12 photos under /images/live2025/', () => {
    expect(live2025Photos).toHaveLength(12);
    for (const photo of live2025Photos) {
      expect(photo.src).toMatch(/^\/images\/live2025\/live2025-\d{2}\.jpg$/);
      expect(['portrait', 'landscape']).toContain(photo.orientation);
      expect(photo.alt.length).toBeGreaterThan(0);
    }
  });

  it('should define videos array and channel url', () => {
    expect(Array.isArray(live2025Videos)).toBe(true);
    expect(YOUTUBE_CHANNEL_URL).toBe('https://www.youtube.com/@obog4633');
  });

  it('should provide the confirmed SECOND ROOMS venue', () => {
    expect(live2026Venue?.name).toBe('SECOND ROOMS');
    expect(live2026Venue?.address).toContain('向日市');
    expect(live2026Venue?.mapUrl).toContain('google.com/maps');
  });
});
