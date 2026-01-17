"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

// 葉のSVGシェイプ - 楓、イチョウ、シンプルな葉
const LeafShapes = {
  // 楓（もみじ）の葉
  maple: (
    <path d="M12 2C12 2 10 6 8 8C6 10 2 10 2 10C2 10 4 14 6 16C4 18 2 22 2 22C2 22 8 20 10 18C10 20 12 24 12 24C12 24 14 20 14 18C16 20 22 22 22 22C22 22 20 18 18 16C20 14 22 10 22 10C22 10 18 10 16 8C14 6 12 2 12 2Z" />
  ),
  // イチョウの葉
  ginkgo: (
    <path d="M12 2C12 2 6 8 6 14C6 18 8 22 12 24C16 22 18 18 18 14C18 8 12 2 12 2ZM12 6C12 6 14 10 14 14C14 16 13 18 12 19C11 18 10 16 10 14C10 10 12 6 12 6Z" />
  ),
  // シンプルな葉
  simple: (
    <path d="M12 2C8 6 4 12 4 16C4 20 8 22 12 22C16 22 20 20 20 16C20 12 16 6 12 2ZM12 8C12 8 16 12 16 16C16 18 14 20 12 20C10 20 8 18 8 16C8 12 12 8 12 8Z" />
  ),
  // オークの葉
  oak: (
    <path d="M12 2C12 2 8 4 7 8C6 10 8 12 6 14C4 16 6 18 8 18C8 20 10 22 12 24C14 22 16 20 16 18C18 18 20 16 18 14C16 12 18 10 17 8C16 4 12 2 12 2Z" />
  ),
};

// 葉の色パレット（既存のテーマカラーを活用）
const leafColors = [
  "#d4502c", // secondary - 紅葉の赤オレンジ
  "#e07548", // accent - サーモンオレンジ
  "#8b3a1e", // dark - 深い赤茶
  "#2d6a4f", // green - フォレストグリーン
  "#40916c", // green-light - ライトグリーン
  "#ff9671", // light - 明るいオレンジ
  "#b7e4c7", // green-pale - ペールグリーン
];

type LeafType = keyof typeof LeafShapes;

type LeafData = {
  id: number;
  type: LeafType;
  color: string;
  size: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  rotationSpeed: number;
  swayAmount: number;
  windDirection: number;
};

const generateLeaves = (count: number): LeafData[] => {
  const types = Object.keys(LeafShapes) as LeafType[];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    type: types[Math.floor(Math.random() * types.length)],
    color: leafColors[Math.floor(Math.random() * leafColors.length)],
    size: 16 + Math.random() * 24, // 16-40px
    startX: -10 + Math.random() * 120, // -10% to 110% of screen width
    startY: -20 - Math.random() * 30, // Start above viewport
    delay: Math.random() * 2.5, // 0-2.5s delay
    duration: 4 + Math.random() * 4, // 4-8s duration
    rotationSpeed: 180 + Math.random() * 360, // 180-540 degrees
    swayAmount: 30 + Math.random() * 60, // Horizontal sway amount
    windDirection: Math.random() > 0.5 ? 1 : -1, // Wind direction
  }));
};

const Leaf = (props: { leaf: LeafData }) => {
  const { leaf } = props;

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{
        left: `${leaf.startX}%`,
        top: `${leaf.startY}%`,
        width: leaf.size,
        height: leaf.size,
      }}
      initial={{
        y: 0,
        x: 0,
        rotate: 0,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        y: ["0vh", "120vh"],
        x: [
          "0px",
          `${leaf.swayAmount * leaf.windDirection}px`,
          `${-leaf.swayAmount * 0.5 * leaf.windDirection}px`,
          `${leaf.swayAmount * 0.8 * leaf.windDirection}px`,
          `${leaf.swayAmount * 1.5 * leaf.windDirection}px`,
        ],
        rotate: [0, leaf.rotationSpeed * leaf.windDirection],
        opacity: [0, 0.9, 0.9, 0.7, 0],
        scale: [0.5, 1, 1, 0.9, 0.6],
      }}
      transition={{
        duration: leaf.duration,
        delay: leaf.delay,
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.1, 0.5, 0.8, 1],
      }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        fill={leaf.color}
        className="w-full h-full drop-shadow-md"
        style={{ filter: `drop-shadow(0 2px 4px ${leaf.color}40)` }}
        animate={{
          rotateY: [0, 180, 360],
          rotateX: [0, 20, -20, 0],
        }}
        transition={{
          duration: leaf.duration * 0.4,
          delay: leaf.delay,
          repeat: 2,
          ease: "easeInOut",
        }}
      >
        {LeafShapes[leaf.type]}
      </motion.svg>
    </motion.div>
  );
};

type FallingLeavesProps = {
  leafCount?: number;
  playOnce?: boolean;
};

const FallingLeaves = (props: FallingLeavesProps) => {
  const { leafCount = 25, playOnce = true } = props;
  const [leaves, setLeaves] = useState<LeafData[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setLeaves(generateLeaves(leafCount));

    if (playOnce) {
      // アニメーション終了後に非表示にする（最長の葉が落ちきる時間）
      const maxDuration = 8 + 2.5; // 最大duration + 最大delay
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, maxDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [leafCount, playOnce]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-50"
      aria-hidden="true"
    >
      {/* 風のエフェクト - 微妙なグラデーション */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 3,
          ease: "easeOut",
        }}
      />

      {/* 葉っぱたち */}
      {leaves.map((leaf) => (
        <Leaf key={leaf.id} leaf={leaf} />
      ))}
    </div>
  );
};

export default FallingLeaves;
