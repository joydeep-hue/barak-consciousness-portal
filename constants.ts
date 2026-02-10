
import { RiverMetric, WisdomQuote } from './types';

export const INITIAL_DATA: RiverMetric[] = [
  { timestamp: '2024-01-01', do: 4.5, ph: 7.2, temp: 27, mood: 6, meditation: 12, dharma: 65, source: 'Manual' },
  { timestamp: '2024-01-02', do: 4.2, ph: 7.1, temp: 28, mood: 7, meditation: 15, dharma: 75, source: 'Manual' },
  { timestamp: '2024-01-03', do: 3.8, ph: 6.9, temp: 29, mood: 5, meditation: 10, dharma: 55, source: 'Manual' },
  { timestamp: '2024-01-04', do: 4.8, ph: 7.4, temp: 26, mood: 8, meditation: 25, dharma: 85, source: 'Manual' },
  { timestamp: '2024-01-05', do: 5.2, ph: 7.5, temp: 25, mood: 9, meditation: 30, dharma: 95, source: 'Manual' },
  { timestamp: '2024-01-06', do: 4.1, ph: 7.0, temp: 28, mood: 6, meditation: 18, dharma: 70, source: 'Manual' },
  { timestamp: '2024-01-07', do: 4.3, ph: 7.2, temp: 27, mood: 7.5, meditation: 20, dharma: 80, source: 'Community' },
];

export const MOCK_WISDOM: WisdomQuote[] = [
  {
    id: '1',
    text: "The river is not just water; it is the flow of our collective dharma. When the water reflects clarity, the community reflects peace.",
    author: "Shri S. Majumder, Elder",
    category: "Elder"
  },
  {
    id: '2',
    text: "Apohishtha Mayo Bhuvah - O Water, you are the source of bliss; grant us strength and vision.",
    author: "Rigveda",
    category: "Vedic"
  },
  {
    id: '3',
    text: "Observed a rare migratory bird near Annapurna Ghat today. The spirit of the river is returning.",
    author: "Local Volunteer",
    category: "Observation"
  }
];
