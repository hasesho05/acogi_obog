import HeroSection from "@/components/features/home/HeroSection";
import EventInformation from "@/components/features/home/EventInformation";
import VenueInformation from "@/components/features/home/VenueInformation";
import PastEventPhotos from "@/components/features/home/PastEventPhotos";
import CallToAction from "@/components/features/home/CallToAction";

const Live2025Page = () => {

  return (
    <main className="min-h-screen bg-primary">
      <HeroSection />
      <EventInformation />
      <VenueInformation />
      <PastEventPhotos />
      <CallToAction />
    </main>
  );
};

export default Live2025Page;