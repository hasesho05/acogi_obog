"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle } from "lucide-react";

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];
}

interface ScheduleTimelineProps {
  data: ScheduleItem[];
}

export const ScheduleTimeline = ({ data }: ScheduleTimelineProps) => {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* 中央のライン */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gray-200" />
      
      <div className="space-y-12">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* コンテンツカード */}
            <div className="w-5/12">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg text-secondary">
                    {item.icon}
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded-full">
                    <span className="text-xs font-bold text-gray-700">{item.time}</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-dark mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {item.description}
                </p>
                
                {item.details && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    {item.details.map((detail, i) => (
                      <div key={i} className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                        <CheckCircle className="w-3 h-3 text-accent" />
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* 中央のドット */}
            <div className="w-2/12 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* 外側のリング */}
                <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20" />
                
                {/* 中心のドット */}
                <div className="relative w-12 h-12 rounded-full bg-white border-2 border-secondary shadow-md flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
              </motion.div>
            </div>

            {/* 時間表示（反対側） */}
            <div className="w-5/12 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1 + 0.3
                }}
                viewport={{ once: true }}
                className={index % 2 === 0 ? 'text-left' : 'text-right'}
              >
                <div className="text-3xl font-bold text-gray-200">
                  {item.time}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};