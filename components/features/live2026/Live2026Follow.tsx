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
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="content-visibility-auto pb-28 md:pb-36">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.24em] text-green">
            04 / Follow
          </p>
          <h2 className="font-display text-4xl text-dark md:text-5xl">続報はSNSで</h2>
        </motion.div>

        <div>
          {followLinks.map((link, index) => (
            <motion.a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ x: 6, transition: { duration: 0.25 } }}
              onClick={() =>
                trackTrialCtaClick({
                  location: 'live2026',
                  destination: link.platform,
                })
              }
              className="group block border-b border-dark/20 py-7 first:border-t"
            >
              <div className="flex items-center gap-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-dark/20 transition-colors duration-300 group-hover:border-secondary">
                  {link.platform === 'youtube' ? (
                    <IconBrandYoutube className="h-7 w-7 text-dark" />
                  ) : (
                    <Instagram className="h-7 w-7 text-dark" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-3 font-display text-2xl text-dark">
                    {link.title}
                    <ExternalLink className="h-4 w-4 shrink-0 text-dark/35 transition-colors group-hover:text-secondary" />
                  </p>
                  <p className="mt-1 font-body text-sm text-dark/60">{link.description}</p>
                </div>
                <span className="hidden font-body text-xs uppercase tracking-[0.18em] text-secondary sm:inline">
                  Follow ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Live2026Follow;
