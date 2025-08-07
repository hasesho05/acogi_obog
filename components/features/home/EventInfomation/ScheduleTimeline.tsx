"use client";

import { useState, useEffect, useCallback } from "react";
import { DoorOpen, Coffee, Camera, PartyPopper, Music, CheckCircle } from "lucide-react";

interface ScheduleDetail {
  time: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

interface ScheduleTimelineProps {
  scheduleData: ScheduleDetail[];
}

const iconMap: Record<string, React.ReactNode> = {
  door: <DoorOpen className="w-5 h-5" />,
  music: <Music className="w-5 h-5" />,
  coffee: <Coffee className="w-5 h-5" />,
  party: <PartyPopper className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />
};

export const ScheduleTimeline = ({ scheduleData }: ScheduleTimelineProps) => {
  const [activeSchedule, setActiveSchedule] = useState<number>(0);

  // 自動切り替え
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSchedule((prev) => (prev + 1) % scheduleData.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [scheduleData.length]);

  const handleHover = useCallback((index: number) => {
    setActiveSchedule(index);
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute left-0 right-0 top-12 h-[2px] bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500"
          style={{
            width: `${(activeSchedule / (scheduleData.length - 1)) * 100}%`
          }}
        />
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        {scheduleData.map((item, index) => (
          <div key={index} className="relative" onMouseEnter={() => handleHover(index)}>
            <div
              className={`w-6 h-6 mx-auto mb-8 rounded-full border-2 transition-all duration-300 ${
                index <= activeSchedule 
                  ? 'bg-gradient-to-r from-secondary to-accent border-transparent' 
                  : 'bg-white border-gray-300'
              } shadow-sm`}
              style={{
                transform: activeSchedule === index ? 'scale(1.3)' : 'scale(1)',
              }}
            />
            
            <div
              className={`bg-white rounded-xl p-4 shadow-lg border transition-all duration-300 ${
                activeSchedule === index 
                  ? 'border-secondary shadow-xl transform -translate-y-1' 
                  : 'border-gray-100'
              }`}
            >
              <div className="text-center mb-3">
                <div className="text-secondary mb-2">{iconMap[item.icon]}</div>
                <div className="text-sm font-bold text-secondary">{item.time}</div>
              </div>
              <h4 className="font-bold text-dark text-center mb-2">{item.title}</h4>
              <p className="text-xs text-gray-600 text-center mb-3">{item.description}</p>
              
              {activeSchedule === index && (
                <div className="pt-3 border-t border-gray-100 space-y-1 animate-fadeIn">
                  {item.details.map((detail, i) => (
                    <div key={i} className="text-xs text-gray-500 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-accent" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};