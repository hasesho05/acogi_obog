import { Camera, Users, Heart } from "lucide-react";
import PastEventPhotosClient from "./PastEventPhotosClient";

const PastEventPhotos = () => {
  const title = "昨年の演奏会の様子";
  const images = Array.from({ length: 22 }, (_, i) => `/images/image${i + 1}.jpg`);
  const stats = [
    { icon: <Camera className="w-5 h-5" />, value: "100+", label: "写真" },
    { icon: <Users className="w-5 h-5" />, value: "50+", label: "参加者" },
    { icon: <Heart className="w-5 h-5" />, value: "∞", label: "思い出" }
  ];

  return <PastEventPhotosClient title={title} images={images} stats={stats} />;
};

export default PastEventPhotos;
