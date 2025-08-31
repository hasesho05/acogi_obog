import HeroSection from "@/components/features/home/HeroSection";
import EventInformation from "@/components/features/home/EventInformation";
import VenueInformation from "@/components/features/home/VenueInformation";
import PastEventPhotos from "@/components/features/home/PastEventPhotos";
import CallToAction from "@/components/features/home/CallToAction";
import { ScrollTransition } from "@/components/features/home/ScrollTransition";

const Live2025Page = () => {

  return (
    <main className="min-h-screen bg-primary">
      <HeroSection />
      
      <ScrollTransition>
        <EventInformation />
      </ScrollTransition>
      
      <ScrollTransition>
        <VenueInformation />
      </ScrollTransition>
      
      <ScrollTransition>
        <PastEventPhotos />
      </ScrollTransition>
      
      <ScrollTransition>
        <CallToAction />
      </ScrollTransition>
    </main>
  );
};

export default Live2025Page;