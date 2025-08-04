// Home page related types
export interface HeroSectionProps {
  videos: string[];
  typewriterTexts: string[];
}

export interface EventInformationProps {
  date: string;
}

export interface VenueInformationProps {
  name: string;
  address: string;
  access: string;
  mapUrl?: string;
}

export interface PastEventPhotosProps {
  images: string[];
  title: string;
}

export interface CallToActionProps {
  title: string;
  description: string;
  instagramUrl: string;
}