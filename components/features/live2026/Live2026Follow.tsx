'use client';

import { IconBrandYoutube } from '@tabler/icons-react';
import { ExternalLink, Instagram } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import {
  INSTAGRAM_URL,
  YOUTUBE_CHANNEL_URL,
} from '@/infrastructure/repositories/live2026Repository';
import { trackTrialCtaClick } from '@/lib/analytics/events';

type FollowLinkData = {
  platform: 'youtube' | 'instagram';
  title: string;
  description: string;
  href: string;
};

const followLinks: FollowLinkData[] = [
  {
    platform: 'youtube',
    title: 'YouTube',
    description: '前回の演奏動画を公開しています。',
    href: YOUTUBE_CHANNEL_URL,
  },
  {
    platform: 'instagram',
    title: 'Instagram',
    description: '続報や当日の様子を投稿します。',
    href: INSTAGRAM_URL,
  },
];

const Live2026Follow = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="content-visibility-auto bg-dark px-6 py-14 sm:px-10 md:py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-9 border-t border-primary/25 pt-6 md:grid-cols-[13rem_1fr] md:gap-16">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-body text-[0.6rem] tracking-[0.2em] text-accent">[ 04 ]</p>
          <h2 className="mt-3 font-display text-2xl text-primary md:text-3xl">SNSで続報を見る</h2>
        </motion.header>

        <div className="grid border-t border-primary/20 sm:grid-cols-2">
          {followLinks.map((link, index) => (
            <motion.a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() =>
                trackTrialCtaClick({
                  location: 'live2026',
                  destination: link.platform,
                })
              }
              className="group flex min-h-28 items-start gap-3 border-b border-primary/20 py-5 sm:first:border-r sm:first:pr-6 sm:last:pl-6"
            >
              {link.platform === 'youtube' ? (
                <IconBrandYoutube className="mt-0.5 h-4 w-4 shrink-0 text-primary/55" />
              ) : (
                <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-primary/55" />
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-display text-lg text-primary md:text-xl">
                  {link.title}
                  <ExternalLink className="h-3.5 w-3.5 text-primary/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
                <p className="mt-2 max-w-[18rem] font-body text-xs leading-5 text-primary/60">
                  {link.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Live2026Follow;
