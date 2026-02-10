
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { RiverMetric } from '../types';

interface HealthChartProps {
  data: RiverMetric[];
}

const HealthChart: React.FC<HealthChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">Consciousness & Physical Trends</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorDharma" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDO" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="timestamp" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 12, fill: '#64748b'}}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 12, fill: '#64748b'}}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="dharma" 
            name="Dharma Score"
            stroke="#0ea5e9" 
            fillOpacity={1} 
            fill="url(#colorDharma)" 
            strokeWidth={3}
          />
          <Area 
            type="monotone" 
            dataKey="do" 
            name="DO Level"
            stroke="#10b981" 
            fillOpacity={1} 
            fill="url(#colorDO)" 
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthChart;
