import type {
  Live2026Fact,
  Live2026Photo,
  Live2026RecruitmentProps,
  Live2026Venue,
  Live2026Video,
} from '@/domain/entities/live2026';

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@obog4633';
export const INSTAGRAM_URL = 'https://www.instagram.com/acoustic_concert_obog';

export const live2026Recruitment: Live2026RecruitmentProps = {
  deadline: '10月11日（日）',
  deadlineDateTime: '2026-10-11',
};

export const live2026Facts: Live2026Fact[] = [
  { label: 'Date', value: '2026年11月14日（土）' },
  {
    label: 'Time',
    value: '11:30 開演 / 14:45 ごろ終演',
    note: '開場時間は決まり次第お知らせします',
  },
  {
    label: 'Venue',
    value: 'SECOND ROOMS',
    note: '京都府向日市・阪急東向日駅から徒歩約1分',
  },
  {
    label: 'Performers',
    value: '龍谷大学アコースティックギターサークル OB・OG',
  },
];

export const live2026Venue: Live2026Venue | null = {
  name: 'SECOND ROOMS',
  address: '京都府向日市寺戸町西田中瀬3-4 FORUM東向日Ⅰ 3F',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=SECOND+ROOMS+%E4%BA%AC%E9%83%BD%E5%BA%9C%E5%90%91%E6%97%A5%E5%B8%82%E5%AF%BA%E6%88%B8%E7%94%BA%E8%A5%BF%E7%94%B0%E4%B8%AD%E7%80%AC3-4',
  access: '阪急京都線「東向日」駅から徒歩約1分（84m）',
};

export const live2025Photos: Live2026Photo[] = [
  {
    src: '/images/live2025/live2025-01.jpg',
    alt: '会場前に置かれたOBOG LIVE 2025のポスターと看板',
    orientation: 'portrait',
    caption: '会場前の看板',
  },
  {
    src: '/images/live2025/live2025-02.jpg',
    alt: '開演前のSECOND ROOMSのステージ全景',
    orientation: 'landscape',
    caption: '開演前のステージ',
  },
  {
    src: '/images/live2025/live2025-03.jpg',
    alt: '紫の照明の中でギターを弾き語る出演者',
    orientation: 'portrait',
    caption: 'ソロ弾き語り',
  },
  {
    src: '/images/live2025/live2025-04.jpg',
    alt: '青い照明のステージで演奏するふたりの出演者',
    orientation: 'landscape',
    caption: 'ふたりの弾き語り',
  },
  {
    src: '/images/live2025/live2025-05.jpg',
    alt: '青い照明の中で歌う出演者',
    orientation: 'portrait',
    caption: '青い照明の中で',
  },
  {
    src: '/images/live2025/live2025-06.jpg',
    alt: '黄色い照明のステージで演奏する出演者',
    orientation: 'portrait',
    caption: 'ソロステージ',
  },
  {
    src: '/images/live2025/live2025-07.jpg',
    alt: 'ベースとギターのデュオ演奏',
    orientation: 'landscape',
    caption: 'デュオ',
  },
  {
    src: '/images/live2025/live2025-08.jpg',
    alt: 'カホン・ボーカル・ギターのトリオ演奏',
    orientation: 'portrait',
    caption: 'トリオ編成',
  },
  {
    src: '/images/live2025/live2025-09.jpg',
    alt: 'ステージ転換中の出演者たち',
    orientation: 'landscape',
    caption: '転換のひとこま',
  },
  {
    src: '/images/live2025/live2025-10.jpg',
    alt: 'アンバーの照明の中でギターを弾き語る出演者',
    orientation: 'portrait',
    caption: 'ソロステージ',
  },
  {
    src: '/images/live2025/live2025-11.jpg',
    alt: 'ステージ脇に並んだアコースティックギター',
    orientation: 'portrait',
    caption: '並んだギターたち',
  },
  {
    src: '/images/live2025/live2025-12.jpg',
    alt: 'オレンジの照明に包まれた終盤のトリオ演奏',
    orientation: 'landscape',
    caption: '終盤のステージ',
  },
];

// 動画が決まったら { id, title } を追加する。
export const live2025Videos: Live2026Video[] = [];
