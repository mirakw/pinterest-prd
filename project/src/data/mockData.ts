import { Campaign, EngagementMetric, DemographicData, TopPerformingPin } from '../types';

// Different campaign sets for different date ranges
const campaignsByRange = {
  '7d': [
    {
      id: '1',
      name: 'Valentine\'s Day Special',
      status: 'active',
      budget: 2000,
      spent: 800,
      impressions: 45000,
      clicks: 1200,
      conversions: 80,
      ctr: 2.7,
      startDate: '2025-02-07',
      endDate: '2025-02-14',
    },
    {
      id: '2',
      name: 'Winter Clearance',
      status: 'active',
      budget: 1500,
      spent: 600,
      impressions: 30000,
      clicks: 900,
      conversions: 45,
      ctr: 3.0,
      startDate: '2025-02-01',
      endDate: '2025-02-15',
    },
  ],
  '30d': [
    {
      id: '3',
      name: 'Spring Collection 2025',
      status: 'active',
      budget: 5000,
      spent: 2345,
      impressions: 150000,
      clicks: 4500,
      conversions: 230,
      ctr: 3.0,
      startDate: '2025-02-01',
      endDate: '2025-03-31',
    },
    {
      id: '4',
      name: 'Home Decor Essentials',
      status: 'paused',
      budget: 3000,
      spent: 1500,
      impressions: 98000,
      clicks: 3200,
      conversions: 180,
      ctr: 3.27,
      startDate: '2025-02-15',
      endDate: '2025-03-15',
    },
    {
      id: '5',
      name: 'Wellness Products',
      status: 'active',
      budget: 4000,
      spent: 2800,
      impressions: 120000,
      clicks: 3800,
      conversions: 195,
      ctr: 3.17,
      startDate: '2025-02-01',
      endDate: '2025-03-01',
    },
  ],
  '90d': [
    {
      id: '6',
      name: 'Summer Fashion 2025',
      status: 'active',
      budget: 8000,
      spent: 3200,
      impressions: 280000,
      clicks: 8400,
      conversions: 420,
      ctr: 3.0,
      startDate: '2025-01-01',
      endDate: '2025-03-31',
    },
    {
      id: '7',
      name: 'Home Renovation Ideas',
      status: 'active',
      budget: 6000,
      spent: 4500,
      impressions: 200000,
      clicks: 6000,
      conversions: 300,
      ctr: 3.0,
      startDate: '2025-01-15',
      endDate: '2025-04-15',
    },
    {
      id: '8',
      name: 'Fitness Challenge',
      status: 'completed',
      budget: 4500,
      spent: 4500,
      impressions: 150000,
      clicks: 4500,
      conversions: 225,
      ctr: 3.0,
      startDate: '2025-01-01',
      endDate: '2025-03-01',
    },
  ],
};

// Different pin sets for different date ranges
const pinsByRange = {
  '7d': [
    {
      id: '1',
      title: 'Valentine\'s Day Gift Guide',
      imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
      clicks: 850,
      saves: 420,
      ctr: 4.2,
    },
    {
      id: '2',
      title: 'Winter Comfort Food Recipes',
      imageUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a',
      clicks: 720,
      saves: 380,
      ctr: 3.8,
    },
    {
      id: '3',
      title: 'Cozy Home Office Ideas',
      imageUrl: 'https://images.unsplash.com/photo-1486946255434-2466348c2166',
      clicks: 680,
      saves: 340,
      ctr: 3.6,
    },
  ],
  '30d': [
    {
      id: '4',
      title: 'Spring Fashion Trends 2025',
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      clicks: 2500,
      saves: 1200,
      ctr: 4.2,
    },
    {
      id: '5',
      title: 'Modern Living Room Designs',
      imageUrl: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9',
      clicks: 1800,
      saves: 950,
      ctr: 3.8,
    },
    {
      id: '6',
      title: 'Healthy Meal Prep Ideas',
      imageUrl: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a',
      clicks: 2200,
      saves: 1500,
      ctr: 3.5,
    },
  ],
  '90d': [
    {
      id: '7',
      title: 'Summer Garden Planning',
      imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735',
      clicks: 5500,
      saves: 3200,
      ctr: 4.5,
    },
    {
      id: '8',
      title: 'DIY Home Renovation Tips',
      imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
      clicks: 4800,
      saves: 2900,
      ctr: 4.2,
    },
    {
      id: '9',
      title: '90-Day Fitness Challenge',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      clicks: 4200,
      saves: 2600,
      ctr: 3.9,
    },
  ],
};

export const mockEngagementMetrics: EngagementMetric[] = [
  { category: 'Impressions', value: 468000, change: 12.5 },
  { category: 'Clicks', value: 14500, change: 8.3 },
  { category: 'Conversions', value: 750, change: 15.2 },
  { category: 'Average CTR', value: 3.1, change: -2.1 },
];

export const mockDemographics: DemographicData[] = [
  { ageGroup: '18-24', gender: 'Female', engagement: 35 },
  { ageGroup: '25-34', gender: 'Female', engagement: 45 },
  { ageGroup: '35-44', gender: 'Female', engagement: 20 },
  { ageGroup: '18-24', gender: 'Male', engagement: 25 },
  { ageGroup: '25-34', gender: 'Male', engagement: 30 },
  { ageGroup: '35-44', gender: 'Male', engagement: 15 },
];

// Export functions to get data for specific date ranges
export const getCampaignsByRange = (range: string): Campaign[] => {
  return campaignsByRange[range as keyof typeof campaignsByRange] || campaignsByRange['30d'];
};

export const getPinsByRange = (range: string): TopPerformingPin[] => {
  return pinsByRange[range as keyof typeof pinsByRange] || pinsByRange['30d'];
};