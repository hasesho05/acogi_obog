import Image from "next/image";

export const ConcertPoster = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-primary py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-200">
          <Image
            src="/images/poster2025.jpg" 
            alt="龍谷大学アコースティックギターサークル OBOG演奏会 2025 チラシ"
            width={768}
            height={1042}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};
