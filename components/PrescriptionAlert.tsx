
import React from 'react';
import { Prescription } from '../types';
import { AlertCircle, CheckCircle2, Info, Wind } from 'lucide-react';

interface PrescriptionAlertProps {
  prescription: Prescription | null;
  loading: boolean;
}

const PrescriptionAlert: React.FC<PrescriptionAlertProps> = ({ prescription, loading }) => {
  if (loading) {
    return (
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Gemini is analyzing the river's consciousness...</p>
      </div>
    );
  }

  if (!prescription) return null;

  const colors = {
    high: 'bg-rose-50 border-rose-200 text-rose-800',
    medium: 'bg-amber-50 border-amber-200 text-amber-800',
    low: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  };

  const icons = {
    high: <AlertCircle className="w-6 h-6 text-rose-500" />,
    medium: <Info className="w-6 h-6 text-amber-500" />,
    low: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
  };

  return (
    <div className={`border rounded-2xl p-6 shadow-sm ${colors[prescription.priority]}`}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          {icons[prescription.priority]}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-bold text-lg uppercase tracking-wide">{prescription.action}</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              prescription.priority === 'high' ? 'bg-rose-200' : 
              prescription.priority === 'medium' ? 'bg-amber-200' : 'bg-emerald-200'
            }`}>
              {prescription.priority} Priority
            </span>
          </div>
          <p className="text-md opacity-90 mb-4">{prescription.message}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {prescription.mantra && (
              <div className="bg-white/50 p-3 rounded-xl flex items-center gap-3">
                <Wind className="w-5 h-5 opacity-70" />
                <div>
                  <p className="text-xs font-semibold uppercase opacity-60">Mantra</p>
                  <p className="font-medium">{prescription.mantra}</p>
                </div>
              </div>
            )}
            {prescription.technical && (
              <div className="bg-white/50 p-3 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 opacity-70" />
                <div>
                  <p className="text-xs font-semibold uppercase opacity-60">Technical Note</p>
                  <p className="font-medium">{prescription.technical}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionAlert;
