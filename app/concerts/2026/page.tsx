import Live2026Access from '@/components/features/live2026/Live2026Access';
import Live2026Follow from '@/components/features/live2026/Live2026Follow';
import Live2026Hero from '@/components/features/live2026/Live2026Hero';
import Live2026Memories from '@/components/features/live2026/Live2026Memories';
import Live2026Overview from '@/components/features/live2026/Live2026Overview';

const Live2026Page = () => {
  return (
    <main className="min-h-screen bg-primary">
      <Live2026Hero />
      <Live2026Overview />
      <Live2026Memories />
      <Live2026Access />
      <Live2026Follow />
    </main>
  );
};

export default Live2026Page;
