import { DoorOpen, Coffee, Camera, PartyPopper, Music, CheckCircle } from "lucide-react";

interface ScheduleDetail {
  time: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

interface MobileScheduleProps {
  scheduleData: ScheduleDetail[];
}

const iconMap: Record<string, React.ReactNode> = {
  door: <DoorOpen className="w-5 h-5" />,
  music: <Music className="w-5 h-5" />,
  coffee: <Coffee className="w-5 h-5" />,
  party: <PartyPopper className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />
};

export const MobileSchedule = ({ scheduleData }: MobileScheduleProps) => {
  return (
    <div className="max-w-md mx-auto space-y-4">
      {scheduleData.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
        >
          <div className="flex">
            <div className="bg-gradient-to-b from-secondary to-accent text-white px-4 py-4 flex flex-col items-center justify-center">
              <div className="text-sm font-bold">{item.time}</div>
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-secondary">{iconMap[item.icon]}</span>
                <h4 className="font-bold text-dark">{item.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="space-y-1">
                {item.details.map((detail, i) => (
                  <div key={i} className="text-xs text-gray-500 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-accent" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};