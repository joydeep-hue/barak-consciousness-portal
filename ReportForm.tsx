
import React, { useState } from 'react';
import { RiverMetric } from '../types';
import { Database, Waves, Thermometer, Smile, Users, Send } from 'lucide-react';

interface ReportFormProps {
  onAddData: (data: RiverMetric) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onAddData }) => {
  const [formData, setFormData] = useState({
    do: 5.0,
    ph: 7.0,
    temp: 25,
    mood: 7,
    meditation: 10
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newData: RiverMetric = {
      timestamp: new Date().toISOString().split('T')[0],
      ...formData,
      dharma: (formData.mood * 10) + (formData.meditation * 2), // Simplified calc
      source: 'User Report'
    };
    onAddData(newData);
    alert('Data synchronized with consciousness grid!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Database className="w-6 h-6 text-sky-500" />
        <h3 className="text-xl font-bold text-slate-800">Field Report</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
            <Waves className="w-4 h-4" /> Dissolved Oxygen (mg/L)
          </label>
          <input 
            type="range" min="0" max="10" step="0.1" 
            name="do" value={formData.do} onChange={handleChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-xs font-bold text-slate-400 mt-1">
            <span>0</span>
            <span className="text-sky-600">{formData.do}</span>
            <span>10</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
            <Thermometer className="w-4 h-4" /> Temperature (°C)
          </label>
          <input 
            type="number" step="0.5" 
            name="temp" value={formData.temp} onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
            <Smile className="w-4 h-4" /> Community Mood (1-10)
          </label>
          <input 
            type="range" min="1" max="10" step="1" 
            name="mood" value={formData.mood} onChange={handleChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
          />
          <div className="flex justify-between text-xs font-bold text-slate-400 mt-1">
            <span>😢</span>
            <span className="text-sky-600">{formData.mood}</span>
            <span>😊</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" /> Meditation Participants
          </label>
          <input 
            type="number" 
            name="meditation" value={formData.meditation} onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-sky-600 text-white font-bold py-3 rounded-xl hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-100"
      >
        <Send className="w-5 h-5" /> Submit to Consciousness Grid
      </button>
    </form>
  );
};

export default ReportForm;
