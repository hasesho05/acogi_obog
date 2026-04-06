export type ConcertStatus = 'completed' | 'upcoming';

export type ConcertData = {
  year: number;
  status: ConcertStatus;
  date?: string;
  time?: string;
  venue?: string;
  detailLink?: string;
  description?: string;
};

export type ConcertCardProps = {
  data: ConcertData;
  index: number;
};

export type ConcertArchiveCardProps = {
  data: ConcertData;
  index: number;
};

export type ConcertsArchiveListProps = {
  concerts: ConcertData[];
};
