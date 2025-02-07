export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  startDate: string;
  endDate: string;
}

export interface EngagementMetric {
  category: string;
  value: number;
  change: number;
}

export interface DemographicData {
  ageGroup: string;
  gender: string;
  engagement: number;
}

export interface TopPerformingPin {
  id: string;
  title: string;
  imageUrl: string;
  clicks: number;
  saves: number;
  ctr: number;
}