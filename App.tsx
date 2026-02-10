
import React, { useState, useEffect, useCallback } from 'react';
import { RiverMetric, Prescription, WisdomQuote, FeedbackEntry } from './types';
import { INITIAL_DATA, MOCK_WISDOM } from './constants';
import { getGeminiPrescription, getVedicInsight } from './services/geminiService';
import ScoreCard from './components/ScoreCard';
import HealthChart from './components/HealthChart';
import PrescriptionAlert from './components/PrescriptionAlert';
import ChatWidget from './components/ChatWidget';
import ReportForm from './components/ReportForm';
import FeedbackSection from './components/FeedbackSection';
import { 
  Droplets, 
  Activity, 
  Users, 
  Sparkles, 
  Wind, 
  History,
  BookOpen,
  MapPin,
  RefreshCw
} from 'lucide-react';

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<RiverMetric[]>(INITIAL_DATA);
  const [latestPrescription, setLatestPrescription] = useState<Prescription | null>(null);
  const [vedicInsight, setVedicInsight] = useState<string>('');
  const [isLoadingPrescription, setIsLoadingPrescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'report' | 'wisdom'>('dashboard');
  const [feedbackLogs, setFeedbackLogs] = useState<FeedbackEntry[]>([]);

  const latestMetric = metrics[metrics.length - 1];

  const fetchAIInsights = useCallback(async (metric: RiverMetric) => {
    setIsLoadingPrescription(true);
    try {
      const [presc, insight] = await Promise.all([
        getGeminiPrescription(metric),
        getVedicInsight(metric)
      ]);
      setLatestPrescription(presc);
      setVedicInsight(insight);
    } catch (error) {
      console.error("AI Insight error", error);
    } finally {
      setIsLoadingPrescription(false);
    }
  }, []);

  useEffect(() => {
    fetchAIInsights(latestMetric);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddData = (data: RiverMetric) => {
    const updated = [...metrics, data];
    setMetrics(updated);
    fetchAIInsights(data);
    setActiveTab('dashboard');
  };

  const handleFeedbackSubmit = (feedback: Omit<FeedbackEntry, 'id' | 'timestamp'>) => {
    const newEntry: FeedbackEntry = {
      ...feedback,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    setFeedbackLogs(prev => [newEntry, ...prev]);
    console.log('Feedback logged:', newEntry);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-sky-600 p-2 rounded-xl text-white shadow-lg shadow-sky-100">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">BARAK CONSCIOUSNESS API</h1>
            <p className="text-xs font-bold text-sky-600 uppercase tracking-widest flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Silchar, Assam • Integrated Monitoring System
            </p>
          </div>
        </div>
        
        <nav className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('report')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'report' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Report Data
          </button>
          <button 
            onClick={() => setActiveTab('wisdom')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'wisdom' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Wisdom
          </button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Dynamic Insight Banner */}
        {vedicInsight && activeTab === 'dashboard' && (
          <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
            <Sparkles className="absolute top-[-10px] right-[-10px] w-24 h-24 opacity-10 rotate-12" />
            <div className="space-y-2 relative z-10 text-center md:text-left">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] opacity-80">Daily Consciousness Insight</h2>
              <p className="text-xl md:text-2xl font-medium italic tracking-tight">"{vedicInsight}"</p>
            </div>
            <button 
              onClick={() => fetchAIInsights(latestMetric)}
              className="bg-white/20 hover:bg-white/30 transition-colors p-3 rounded-2xl backdrop-blur-md relative z-10"
              title="Refresh AI Analysis"
            >
              <RefreshCw className={`w-6 h-6 ${isLoadingPrescription ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Scores, Prescription, Feedback */}
            <div className="lg:col-span-1 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <ScoreCard 
                  label="Integrated Health" 
                  value={latestMetric.dharma} 
                  unit="/100" 
                  colorClass="bg-sky-500" 
                  icon={<Activity className="w-6 h-6" />} 
                />
                <ScoreCard 
                  label="Physical Oxygen" 
                  value={latestMetric.do} 
                  unit="mg/L" 
                  colorClass="bg-emerald-500" 
                  icon={<Wind className="w-6 h-6" />} 
                />
                <ScoreCard 
                  label="Coherence" 
                  value={latestMetric.meditation} 
                  unit="People" 
                  colorClass="bg-indigo-500" 
                  icon={<Users className="w-6 h-6" />} 
                />
                <ScoreCard 
                  label="Water Mood" 
                  value={latestMetric.mood} 
                  unit="/10" 
                  colorClass="bg-rose-500" 
                  icon={<Sparkles className="w-6 h-6" />} 
                />
              </div>
              
              <div className="pt-2">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Wind className="w-5 h-5 text-sky-500" /> Current Prescription
                </h3>
                <PrescriptionAlert prescription={latestPrescription} loading={isLoadingPrescription} />
              </div>

              {/* Feedback Section added here */}
              <div className="pt-2">
                <FeedbackSection onFeedbackSubmit={handleFeedbackSubmit} />
              </div>
            </div>

            {/* Right Column: Visualization and History */}
            <div className="lg:col-span-2 space-y-8">
              <HealthChart data={metrics} />
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <History className="w-5 h-5 text-sky-500" /> Historical Logs
                  </h3>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">Last 7 Sessions</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                        <th className="pb-4">Timestamp</th>
                        <th className="pb-4">DO</th>
                        <th className="pb-4">pH</th>
                        <th className="pb-4">Mood</th>
                        <th className="pb-4 text-right">Dharma Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[...metrics].reverse().slice(0, 7).map((m, idx) => (
                        <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                          <td className="py-4 font-medium text-slate-600">{m.timestamp}</td>
                          <td className="py-4"><span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md font-bold">{m.do}</span></td>
                          <td className="py-4">{m.ph}</td>
                          <td className="py-4">{m.mood}</td>
                          <td className="py-4 text-right font-black text-sky-600">{m.dharma}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="max-w-3xl mx-auto py-8">
            <ReportForm onAddData={handleAddData} />
          </div>
        )}

        {activeTab === 'wisdom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full mb-4">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-sky-500" /> Elder Wisdom & Vedic Repository
              </h2>
              <p className="text-slate-500">Traditional ecological knowledge (TEK) integrated with modern hydrological monitoring.</p>
            </div>
            {MOCK_WISDOM.map(wisdom => (
              <div key={wisdom.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-md transition-all">
                <div className="flex-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase mb-4 ${
                    wisdom.category === 'Elder' ? 'bg-indigo-100 text-indigo-600' :
                    wisdom.category === 'Vedic' ? 'bg-sky-100 text-sky-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {wisdom.category}
                  </span>
                  <p className="text-lg font-medium text-slate-800 leading-relaxed italic">"{wisdom.text}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 text-right">
                  <p className="font-bold text-slate-600">— {wisdom.author}</p>
                </div>
              </div>
            ))}
            
            {/* Dynamic AI Wisdom Generator */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center items-center text-center space-y-4">
              <Sparkles className="w-10 h-10 text-sky-400" />
              <h4 className="font-bold">Contribute Knowledge</h4>
              <p className="text-sm opacity-70">Have a traditional observation or elder quote? Submit it to the wisdom repository.</p>
              <button className="bg-white text-slate-900 font-bold px-6 py-2 rounded-xl text-sm hover:bg-sky-50 transition-colors">
                Share Wisdom
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="mt-12 py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h5 className="font-black text-slate-400 text-lg uppercase tracking-widest">Barak River</h5>
            <p className="text-sm text-slate-500">© 2024 Conscious Hydrology Inititative. Powered by Gemini AI Suite.</p>
          </div>
          <div className="flex gap-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <img src="https://picsum.photos/40/40?random=1" alt="Partner 1" className="rounded-full grayscale" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <img src="https://picsum.photos/40/40?random=2" alt="Partner 2" className="rounded-full grayscale" />
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <img src="https://picsum.photos/40/40?random=3" alt="Partner 3" className="rounded-full grayscale" />
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;
