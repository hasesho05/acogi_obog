type IconProps = {
  className?: string;
  strokeWidth?: number;
};

export const AcousticGuitarIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      strokeWidth={props.strokeWidth || 1.5}
    >
      {/* ネック */}
      <path
        d="M 20 8 L 24 8 L 28 32 L 16 32 Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* フレット */}
      <line x1="17" y1="14" x2="27" y2="14" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="17.5" y1="18" x2="26.5" y2="18" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="18" y1="22" x2="26" y2="22" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="18.5" y1="26" x2="25.5" y2="26" stroke="currentColor" strokeOpacity="0.5" />
      {/* ヘッド */}
      <path
        d="M 18 8 C 18 4, 26 4, 26 8"
        stroke="currentColor"
        strokeLinecap="round"
      />
      {/* ペグ */}
      <circle cx="19" cy="6" r="1" fill="currentColor" />
      <circle cx="22" cy="5" r="1" fill="currentColor" />
      <circle cx="25" cy="6" r="1" fill="currentColor" />
      {/* ボディ */}
      <ellipse
        cx="22"
        cy="46"
        rx="16"
        ry="14"
        stroke="currentColor"
        strokeLinecap="round"
      />
      {/* サウンドホール */}
      <circle cx="22" cy="44" r="5" stroke="currentColor" strokeOpacity="0.7" />
      {/* ブリッジ */}
      <rect x="18" y="52" width="8" height="2" rx="1" stroke="currentColor" strokeOpacity="0.7" />
      {/* 弦 */}
      <line x1="20" y1="12" x2="20" y2="52" stroke="currentColor" strokeOpacity="0.3" />
      <line x1="22" y1="12" x2="22" y2="52" stroke="currentColor" strokeOpacity="0.3" />
      <line x1="24" y1="12" x2="24" y2="52" stroke="currentColor" strokeOpacity="0.3" />
    </svg>
  );
};

export const MusicNoteIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      strokeWidth={props.strokeWidth || 1.5}
    >
      <path
        d="M9 18V5l12-2v13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="6" cy="18" rx="3" ry="2" stroke="currentColor" />
      <ellipse cx="18" cy="16" rx="3" ry="2" stroke="currentColor" />
    </svg>
  );
};

export const WaveformIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      strokeWidth={props.strokeWidth || 1.5}
    >
      <path
        d="M 2 12 Q 6 4, 10 12 Q 14 20, 18 12 Q 22 4, 26 12 Q 30 20, 34 12 Q 38 4, 42 12 Q 46 20, 46 12"
        stroke="currentColor"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export const VinylIcon = (props: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      strokeWidth={props.strokeWidth || 1.5}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
};
