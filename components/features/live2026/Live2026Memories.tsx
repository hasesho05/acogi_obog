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

const easeOut = [0.22, 1, 0.36, 1] as const;
const filmstripVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOut,
      delayChildren: 0.08,
      staggerChildren: 0.045,
    },
  },
};
const photoVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 14,
    rotate: index % 2 === 0 ? -0.6 : 0.6,
  }),
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const PhotoFigure = (props: Live2026PhotoFigureProps) => {
  const isPortrait = props.data.orientation === 'portrait';

  return (
    <motion.figure
      custom={props.index}
      variants={photoVariants}
      whileHover={{
        y: -4,
        rotate: 0,
        transition: { duration: 0.25, ease: easeOut },
      }}
      className={`shrink-0 snap-start ${
        isPortrait ? 'w-[190px] md:w-[230px]' : 'w-[300px] md:w-[380px]'
      } ${props.index % 3 === 1 ? 'mt-7' : ''}`}
    >
      <div className="border border-dark/15 bg-white p-1.5">
        <Image
          src={props.data.src}
          alt={props.data.alt}
          width={isPortrait ? 1108 : 1477}
          height={isPortrait ? 1477 : 1108}
          loading="lazy"
          quality={75}
          className="h-[250px] w-full object-cover md:h-[300px]"
        />
      </div>
      <figcaption className="mt-2 flex items-baseline gap-2 font-body text-[0.625rem] text-dark/55">
        <span className="tracking-[0.16em] text-secondary">
          {String(props.index + 1).padStart(2, '0')}
        </span>
        <span>{props.data.caption}</span>
      </figcaption>
    </motion.figure>
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
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-primary px-3 py-2 font-body text-[0.625rem] tracking-[0.12em] text-dark transition-colors group-hover:text-secondary">
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
    <section ref={sectionRef} className="content-visibility-auto bg-tertiary/45 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-9 grid gap-5 pt-6 md:grid-cols-[13rem_1fr] md:gap-16"
        >
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.65, ease: easeOut }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-dark/25"
          />
          <div>
            <p className="font-body text-[0.6rem] tracking-[0.2em] text-secondary">[ 02 ]</p>
            <h2 className="mt-3 font-display text-2xl text-dark md:text-3xl">前回の記録</h2>
          </div>
          <p className="max-w-md self-end font-body text-xs leading-6 text-dark/55">
            2025.10.12 SECOND ROOMS
            <br />
            「OBOG LIVE 2025」より
          </p>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={filmstripVariants}
        aria-label="OBOG LIVE 2025 写真ギャラリー"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:px-10 lg:px-[max(2.5rem,calc((100vw-72rem)/2))]"
      >
        {live2025Photos.map((photo, index) => (
          <PhotoFigure key={photo.src} data={photo} index={index} />
        ))}
      </motion.div>

      <div className="mx-auto mt-12 max-w-6xl px-6 sm:px-10">
        {live2025Videos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {live2025Videos.map((video) => (
              <div key={video.id}>
                <VideoEmbed data={video} />
                <p className="mt-2 font-body text-xs text-dark/70">{video.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <motion.a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackTrialCtaClick({
                location: 'live2026',
                destination: 'youtube',
              })
            }
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.22, ease: easeOut }}
            className="group block border-b border-t border-dark/20 py-5"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-dark/20 transition-colors duration-300 group-hover:border-secondary">
                <IconBrandYoutube className="h-5 w-5 text-dark" />
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-display text-lg text-dark md:text-xl">
                  龍大アコギOBOGの部屋
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-dark/35 transition-colors group-hover:text-secondary" />
                </p>
                <p className="mt-1 font-body text-xs text-dark/60">
                  演奏の記録はYouTubeで公開しています。
                </p>
              </div>
            </div>
          </motion.a>
        )}
      </div>
    </section>
  );
};

export default Live2026Memories;
