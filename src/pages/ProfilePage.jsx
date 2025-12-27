import React from 'react';
import { 
  User, Mail, AtSign, Globe, Clock, Calendar,
  MapPin, CheckCircle, TrendingUp
} from 'lucide-react';

export const ProfilePage = () => {
  // Static user data
  const userData = {
    fullName: 'Alex Johnson',
    displayName: 'Alex J.',
    email: 'alex.johnson@example.com',
    username: 'alexj',
    userId: 'USR-7894-2023',
    region: 'United States',
    country: 'USA',
    language: 'English',
    timeZone: 'EST (UTC-5)',
    totalConsents: '1,247',
    longestStreak: '42'
  };

  // Generate dummy heatmap data for last 12 months (364 days)
  const generateHeatmapData = () => {
    const today = new Date();
    const days = 364;
    const data = [];
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      

      const count = Math.floor(Math.random() * 9);
      const intensity = count === 0 ? 0 : 
                       count <= 2 ? 1 : 
                       count <= 4 ? 2 : 
                       count <= 6 ? 3 : 4;
      
      data.push({
        date,
        count,
        intensity
      });
    }
    
    return data;
  };

  const heatmapData = generateHeatmapData();
  
  // Get months for heatmap header
  const getMonthLabels = () => {
    const months = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      months.push(date.toLocaleString('default', { month: 'short' }));
    }
    
    return [...new Set(months)]; // Remove duplicates
  };

  const monthLabels = getMonthLabels();
  
  // Days of week labels
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and view consent analytics</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <User size={16} />
                    <span className="text-sm font-medium">Full Name</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{userData.fullName}</p>
                </div>
                
                {/* Display Name */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <User size={16} />
                    <span className="text-sm font-medium">Display Name</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{userData.displayName}</p>
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail size={16} />
                    <span className="text-sm font-medium">Email Address</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{userData.email}</p>
                </div>
                
                {/* Username */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <AtSign size={16} />
                    <span className="text-sm font-medium">Username</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{userData.username}</p>
                </div>
                
                {/* Region */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin size={16} />
                    <span className="text-sm font-medium">Region / Country</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{userData.region}</p>
                </div>
                
                {/* Language */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Globe size={16} />
                    <span className="text-sm font-medium">Preferred Language</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{userData.language}</p>
                </div>
                
                {/* Time Zone */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={16} />
                    <span className="text-sm font-medium">Time Zone</span>
                  </div>
                  <p className="text-gray-900 font-semibold">{userData.timeZone}</p>
                </div>
              </div>
            </div>

            {/* Consent Activity Heatmap */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Consent Activity</h2>
                <div className="flex items-center gap-2 text-indigo-600">
                  <TrendingUp size={18} />
                  <span className="text-sm font-medium">Last 12 months</span>
                </div>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-end gap-2 mb-4">
                <span className="text-xs text-gray-500">Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((intensity) => (
                    <div
                      key={intensity}
                      className={`w-4 h-4 rounded-sm ${
                        intensity === 0 ? 'bg-gray-100' :
                        intensity === 1 ? 'bg-emerald-100' :
                        intensity === 2 ? 'bg-emerald-200' :
                        intensity === 3 ? 'bg-emerald-400' :
                        'bg-emerald-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">More</span>
              </div>

              {/* Heatmap Container */}
              <div className="overflow-x-auto pb-4">
                <div className="flex">
                  {/* Day Labels */}
                  <div className="flex flex-col mr-2 pt-7">
                    {dayLabels.map((day) => (
                      <div key={day} className="h-[15px] mb-[3px] text-xs text-gray-500 text-right pr-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="flex-1">
                    {/* Month Labels */}
                    <div className="flex mb-2">
                      {monthLabels.map((month, index) => (
                        <div
                          key={`${month}-${index}`}
                          className="text-xs text-gray-500 flex-1 text-center"
                        >
                          {month}
                        </div>
                      ))}
                    </div>

                    {/* Heatmap Grid */}
                    <div className="grid grid-flow-col grid-rows-7 gap-1">
                      {heatmapData.map((day, index) => (
                        <div
                          key={index}
                          className="group relative"
                          style={{ width: '15px', height: '15px' }}
                        >
                          <div
                            className={`w-full h-full rounded-sm transition-all duration-200 ${
                              day.intensity === 0 ? 'bg-gray-100' :
                              day.intensity === 1 ? 'bg-emerald-100 hover:bg-emerald-200' :
                              day.intensity === 2 ? 'bg-emerald-200 hover:bg-emerald-300' :
                              day.intensity === 3 ? 'bg-emerald-400 hover:bg-emerald-500' :
                              'bg-emerald-600 hover:bg-emerald-700'
                            }`}
                          />
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
                            <div className="font-semibold">{day.count} consent{day.count !== 1 ? 's' : ''}</div>
                            <div className="text-gray-300">
                              {day.date.toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Summary */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{userData.totalConsents} consents in the last 12 months</span>
                  </div>
                  <div className="hidden sm:block text-gray-300">·</div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} />
                    <span>Longest streak: {userData.longestStreak} days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Summary</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Data Transparency</h4>
                  <p className="text-sm text-gray-600">
                    Your consent history is visualized above. Each square represents a day, with darker colors indicating higher consent activity.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Recent Activity</h4>
                  <div className="space-y-2">
                    {['Data Sharing Agreement', 'Marketing Preferences', 'Cookie Settings'].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-sm text-gray-600">{item}</span>
                        <span className="text-xs text-gray-500">2 days ago</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Your Rights</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      <span>Right to access your data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      <span>Right to modify consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      <span>Right to data portability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This dashboard shows aggregated, anonymized consent data. Your privacy is protected.
          </p>
        </footer>
      </div>
    </div>
  );
};

