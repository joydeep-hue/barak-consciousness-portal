
export interface RiverMetric {
  timestamp: string;
  do: number; // Dissolved Oxygen
  ph: number;
  temp: number;
  mood: number;
  meditation: number;
  dharma: number;
  source: string;
}

export interface Prescription {
  action: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  mantra?: string;
  technical?: string;
  duration?: string;
}

export interface WisdomQuote {
  id: string;
  text: string;
  author: string;
  category: 'Vedic' | 'Elder' | 'Observation';
}

export interface FeedbackEntry {
  id: string;
  timestamp: string;
  type: 'issue' | 'suggestion';
  comment: string;
  userName?: string;
}
