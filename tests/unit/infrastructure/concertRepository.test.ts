import { describe, it, expect } from 'vitest';
import {
  getConcerts,
  getConcertByYear,
} from '@/infrastructure/repositories/concertRepository';

describe('concertRepository', () => {
  describe('getConcerts', () => {
    it('should return a non-empty array', () => {
      const concerts = getConcerts();
      expect(concerts.length).toBeGreaterThan(0);
    });

    it('should return concerts with required fields', () => {
      const concerts = getConcerts();
      for (const concert of concerts) {
        expect(concert).toHaveProperty('year');
        expect(concert).toHaveProperty('status');
        expect(['completed', 'upcoming']).toContain(concert.status);
      }
    });

    it('should include both completed and upcoming concerts', () => {
      const concerts = getConcerts();
      const statuses = concerts.map((c) => c.status);
      expect(statuses).toContain('completed');
      expect(statuses).toContain('upcoming');
    });
  });

  describe('getConcertByYear', () => {
    it('should return correct concert for existing year', () => {
      const concert = getConcertByYear(2025);
      expect(concert).toBeDefined();
      expect(concert?.year).toBe(2025);
      expect(concert?.status).toBe('completed');
    });

    it('should return undefined for non-existing year', () => {
      const concert = getConcertByYear(9999);
      expect(concert).toBeUndefined();
    });

    it('should return concert with detailLink for completed concerts', () => {
      const concert = getConcertByYear(2025);
      expect(concert?.detailLink).toBe('/concerts/2025');
    });
  });
});
