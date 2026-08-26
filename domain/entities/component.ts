import type { LucideIcon } from "lucide-react";

/** 下層ページ共通ヒーローの props */
export type PageHeroProps = {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  subIcon: LucideIcon;
};
