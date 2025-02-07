import React, { useState } from 'react';
import { BarChart3, PieChart, Download, Calendar, Mail, X } from 'lucide-react';
import { mockEngagementMetrics, getCampaignsByRange, getPinsByRange } from '../data/mockData';

export default function Dashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    frequency: 'weekly',
    email: '',
    format: 'pdf'
  });

  // Calculate date-adjusted metrics based on selected range
  const getAdjustedMetrics = () => {
    const multiplier = selectedDateRange === '7d' ? 0.25 : selectedDateRange === '90d' ? 3 : 1;
    return mockEngagementMetrics.map(metric => ({
      ...metric,
      value: Math.round(metric.value * multiplier),
      change: metric.change + (selectedDateRange === '7d' ? -2 : selectedDateRange === '90d' ? 5 : 0)
    }));
  };

  const handleExport = () => {
    const metrics = getAdjustedMetrics();
    const campaigns = getCampaignsByRange(selectedDateRange);
    const pins = getPinsByRange(selectedDateRange);

    // Create CSV content
    let csvContent = 'Report Type,Category,Value,Change\n';
    
    // Add metrics
    metrics.forEach(metric => {
      csvContent += `Metric,${metric.category},${metric.value},${metric.change}%\n`;
    });
    
    csvContent += '\nCampaign Name,Status,Budget,Spent,CTR,Start Date,End Date\n';
    // Add campaigns
    campaigns.forEach(campaign => {
      csvContent += `${campaign.name},${campaign.status},${campaign.budget},${campaign.spent},${campaign.ctr}%,${campaign.startDate},${campaign.endDate}\n`;
    });
    
    csvContent += '\nPin Title,Clicks,Saves,CTR\n';
    // Add pins
    pins.forEach(pin => {
      csvContent += `${pin.title},${pin.clicks},${pin.saves},${pin.ctr}%\n`;
    });

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinterest-analytics-${selectedDateRange}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate scheduling success
    alert(`Report scheduled! You will receive ${scheduleForm.frequency} reports at ${scheduleForm.email} in ${scheduleForm.format.toUpperCase()} format.`);
    setShowScheduleModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-red-500" />
              <span className="ml-2 text-xl font-semibold">Pinterest Analytics</span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button 
                onClick={handleExport}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
              <button 
                onClick={() => setShowScheduleModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Schedule Report
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {getAdjustedMetrics().map((metric) => (
            <div key={metric.category} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">{metric.category}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.category === 'Average CTR' 
                    ? `${metric.value}%`
                    : metric.value.toLocaleString()}
                </p>
                <span className={`ml-2 text-sm ${
                  metric.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Active Campaigns</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTR
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCampaignsByRange(selectedDateRange).map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(campaign.startDate).toLocaleDateString()} - 
                        {new Date(campaign.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : campaign.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${campaign.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${campaign.spent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.ctr}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performing Pins */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Top Performing Pins</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {getPinsByRange(selectedDateRange).map((pin) => (
              <div key={pin.id} className="border rounded-lg overflow-hidden">
                <img 
                  src={pin.imageUrl} 
                  alt={pin.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900">{pin.title}</h3>
                  <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Clicks</p>
                      <p className="font-medium">{pin.clicks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Saves</p>
                      <p className="font-medium">{pin.saves.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">CTR</p>
                      <p className="font-medium">{pin.ctr}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Schedule Report</h3>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Frequency</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    value={scheduleForm.frequency}
                    onChange={(e) => setScheduleForm({...scheduleForm, frequency: e.target.value})}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    value={scheduleForm.email}
                    onChange={(e) => setScheduleForm({...scheduleForm, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Format</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    value={scheduleForm.format}
                    onChange={(e) => setScheduleForm({...scheduleForm, format: e.target.value})}
                  >
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                    <option value="xlsx">Excel</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Schedule Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}