
import React from 'react';

interface ScoreCardProps {
  label: string;
  value: string | number;
  unit?: string;
  colorClass: string;
  icon: React.ReactNode;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ label, value, unit, colorClass, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center space-x-4">
      <div className={`${colorClass} p-3 rounded-xl text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-bold text-slate-800">
          {value}{unit && <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>}
        </h3>
      </div>
    </div>
  );
};

export default ScoreCard;
