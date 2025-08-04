"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export const ScheduleTimeline = ({ 
  data, 
  className 
}: { 
  data: ScheduleItem[];
  className?: string;
}) => {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-[#6a8359]" />
      
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.2,
            ease: "easeOut"
          }}
          viewport={{ once: true }}
          className="relative flex items-start mb-8 md:mb-12 last:mb-0"
        >
          {/* Timeline dot with hover effect */}
          <motion.div 
            className="relative z-10 flex-shrink-0"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#6a8359] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg md:text-xl">{item.icon}</span>
            </div>
          </motion.div>
          
          {/* Content */}
          <div className="ml-6 md:ml-8 flex-1">
            {/* Time */}
            <div className="text-[#9f8f7c] font-bold text-lg md:text-xl mb-2">
              {item.time}
            </div>
            
            {/* Title */}
            <h4 className="text-[#6a8359] font-bold text-xl md:text-2xl mb-2">
              {item.title}
            </h4>
            
            {/* Description */}
            <p className="text-[#9f8f7c] text-base md:text-lg leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};