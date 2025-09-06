import React from 'react';

const SectionHeader = (props: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="text-center fade-in-up">
      <div className="inline-flex flex-col items-center gap-2 bg-tertiary rounded-2xl border border-secondary/20 px-6 py-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-secondary">{props.icon}</span>
          <span className="text-sm font-semibold text-dark">{props.title}</span>
        </div>
        <span className="text-xs text-secondary font-medium uppercase tracking-wider">{props.subtitle}</span>
      </div>
    </div>
  );
};

export default SectionHeader;