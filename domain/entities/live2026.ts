export type Live2026RecruitmentProps = {
  deadline: string;
  deadlineDateTime: string;
};

export type Live2026Fact = {
  label: string;
  value: string;
  note?: string;
};

export type PhotoOrientation = 'portrait' | 'landscape';

export type Live2026Photo = {
  src: string;
  alt: string;
  orientation: PhotoOrientation;
  caption: string;
};

export type Live2026Video = {
  id: string;
  title: string;
};

export type Live2026Venue = {
  name: string;
  address: string;
  mapUrl: string;
  access?: string;
};

export type Live2026PhotoFigureProps = {
  data: Live2026Photo;
  index: number;
};

export type Live2026VideoEmbedProps = {
  data: Live2026Video;
};
