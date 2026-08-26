'use client';

import { IconBrandYoutube } from '@tabler/icons-react';
import { ExternalLink } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Live2026PhotoFigureProps, Live2026VideoEmbedProps } from '@/domain/entities/live2026';
import {
  live2025Photos,
  live2025Videos,
  YOUTUBE_CHANNEL_URL,
} from '@/infrastructure/repositories/live2026Repository';
import { trackTrialCtaClick } from '@/lib/analytics/events';

const PhotoFigure = (props: Live2026PhotoFigureProps) => {
  const isPortrait = props.data.orientation === 'portrait';

  return (
    <figure
      className={`shrink-0 snap-start ${
        isPortrait ? 'w-[230px] md:w-[290px]' : 'w-[380px] md:w-[500px]'
      }`}
    >
      <div className="border border-dark/15 bg-white p-1.5">
        <Image
          src={props.data.src}
          alt={props.data.alt}
          width={isPortrait ? 1108 : 1477}
          height={isPortrait ? 1477 : 1108}
          loading="lazy"
          quality={75}
          className="h-[300px] w-full object-cover md:h-[380px]"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline gap-3 font-body text-xs text-dark/55">
        <span className="tracking-[0.18em] text-secondary">
          {String(props.index + 1).padStart(2, '0')}
        </span>
        <span>{props.data.caption}</span>
      </figcaption>
    </figure>
  );
};

const VideoEmbed = (props: Live2026VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${props.data.id}?autoplay=1`}
        title={props.data.title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full border border-dark/15"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={`${props.data.title}を再生`}
      className="group relative block aspect-video w-full overflow-hidden border border-dark/15"
    >
      <Image
        src={`https://i.ytimg.com/vi/${props.data.id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-primary px-4 py-2 font-body text-xs tracking-[0.14em] text-dark transition-colors group-hover:text-secondary">
        <IconBrandYoutube className="h-4 w-4" />
        再生する
      </span>
    </button>
  );
};

const Live2026Memories = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="content-visibility-auto bg-tertiary/45 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-end justify-between gap-8 border-b border-dark/20 pb-7 md:mb-16"
        >
          <div>
            <p className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.24em] text-secondary">
              02 / Archive
            </p>
            <h2 className="font-display text-4xl text-dark md:text-5xl">前回の記録</h2>
          </div>
          <p className="hidden max-w-xs text-right font-body text-sm leading-6 text-dark/60 md:block">
            2025.10.12 SECOND ROOMS
            <br />
            「OBOG LIVE 2025」より
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        aria-label="OBOG LIVE 2025 写真ギャラリー"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-10 lg:px-[max(2.5rem,calc((100vw-64rem)/2))]"
      >
        {live2025Photos.map((photo, index) => (
          <PhotoFigure key={photo.src} data={photo} index={index} />
        ))}
      </motion.div>

      <div className="mx-auto mt-16 max-w-5xl px-6 sm:px-10">
        {live2025Videos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {live2025Videos.map((video) => (
              <div key={video.id}>
                <VideoEmbed data={video} />
                <p className="mt-3 font-body text-sm text-dark/70">{video.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackTrialCtaClick({
                location: 'live2026',
                destination: 'youtube',
              })
            }
            className="group block border-b border-t border-dark/20 py-7"
          >
            <div className="flex items-center gap-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-dark/20 transition-colors duration-300 group-hover:border-secondary">
                <IconBrandYoutube className="h-7 w-7 text-dark" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-3 font-display text-xl text-dark md:text-2xl">
                  龍大アコギOBOGの部屋
                  <ExternalLink className="h-4 w-4 shrink-0 text-dark/35 transition-colors group-hover:text-secondary" />
                </p>
                <p className="mt-1 font-body text-sm text-dark/60">
                  演奏の記録はYouTubeで公開しています。
                </p>
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  );
};

export default Live2026Memories;
