import HeroSection from "@/components/features/home/HeroSection";
import EventInformation from "@/components/features/home/EventInformation";
import VenueInformation from "@/components/features/home/VenueInformation";
import PastEventPhotos from "@/components/features/home/PastEventPhotos";
import CallToAction from "@/components/features/home/CallToAction";
import { ScrollTransition } from "@/components/features/home/ScrollTransition";

const HomePage = () => {
  // Hero section data
  const heroData = {
    videos: ["/movies/hero1.webm", "/movies/hero2.webm", "/movies/hero3.webm", "/movies/hero4.webm"],
    typewriterTexts: ["龍谷大学", "アコギサークル", "OBOG演奏会 2025"],
  };

  // Event information data
  const eventData = {
    date: "2025年10月12日(日)",
  };

  // Venue information data
  const venueData = {
    name: "Second Rooms",
    address: "京都府向日市寺戸町西田中瀬3-4 FORUM東向日1 3F",
    access: "東向日駅から84m",
  };

  // Past event photos data
  const pastEventData = {
    images: Array.from({ length: 12 }, (_, i) => `/images/image${i + 1}.jpg`),
    title: "昨年の演奏会の様子",
  };

  // Call to action data
  const ctaData = {
    title: "出演者募集中！",
    description: "龍谷大学アコースティックギターサークルOBOGの皆様、一緒に素晴らしい演奏会を作りましょう。詳細はInstagramでご確認ください。",
    instagramUrl: "https://www.instagram.com/",
  };

  return (
    <main className="min-h-screen bg-primary">
      <HeroSection {...heroData} />
      
      <ScrollTransition>
        <EventInformation {...eventData} />
      </ScrollTransition>
      
      <ScrollTransition>
        <VenueInformation {...venueData} />
      </ScrollTransition>
      
      <ScrollTransition>
        <PastEventPhotos {...pastEventData} />
      </ScrollTransition>
      
      <ScrollTransition>
        <CallToAction {...ctaData} />
      </ScrollTransition>
    </main>
  );
};

export default HomePage;