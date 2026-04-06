import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('should render brand name', () => {
    render(<Footer />);
    expect(
      screen.getByText('龍谷大学アコギサークル'),
    ).toBeInTheDocument();
  });

  it('should render link to about page', () => {
    render(<Footer />);
    const link = screen.getByText('このサイトについて');
    expect(link.closest('a')).toHaveAttribute('href', '/about');
  });

  it('should render link to concerts archive', () => {
    render(<Footer />);
    const link = screen.getByText('演奏会アーカイブ');
    expect(link.closest('a')).toHaveAttribute('href', '/concerts');
  });

  it('should render link to 2025 concert', () => {
    render(<Footer />);
    const link = screen.getByText('2025年演奏会');
    expect(link.closest('a')).toHaveAttribute('href', '/concerts/2025');
  });

  it('should render Instagram link', () => {
    render(<Footer />);
    const link = screen.getByLabelText('Instagram');
    expect(link).toHaveAttribute(
      'href',
      'https://www.instagram.com/acoustic_concert_obog',
    );
  });

  it('should render copyright notice', () => {
    render(<Footer />);
    expect(
      screen.getByText(/Ryukoku Acoustic Guitar Circle/),
    ).toBeInTheDocument();
  });
});
