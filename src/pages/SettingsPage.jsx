import React, { useState } from 'react';
import { 
  Settings, 
  Sun, 
  Moon, 
  Monitor,
  Globe,
  Clock,
  Shield,
  Bell,
  Database,
  Lock,
  Check
} from 'lucide-react';

const SettingsPage = () => {
  // State for appearance
  const [theme, setTheme] = useState('system');
  
  // State for language & region
  const [language, setLanguage] = useState('en');
  const [region, setRegion] = useState('US');
  
  // State for time & date
  const [timeZone, setTimeZone] = useState('auto');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  
  // State for consent controls
  const [reviewReminder, setReviewReminder] = useState('monthly');
  const [blockHighRisk, setBlockHighRisk] = useState(true);
  
  // State for notifications
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [newPermissionAlerts, setNewPermissionAlerts] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(false);
  
  // State for data & storage
  const [dataRetention, setDataRetention] = useState('1 year');
  
  // Mock data
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'jp', label: 'Japanese' }
  ];
  
  const regions = [
    { value: 'US', label: 'United States' },
    { value: 'EU', label: 'European Union' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' }
  ];
  
  const timeZones = [
    { value: 'auto', label: 'Auto-detect' },
    { value: 'est', label: 'EST (Eastern Time)' },
    { value: 'pst', label: 'PST (Pacific Time)' },
    { value: 'cet', label: 'CET (Central Europe)' },
    { value: 'gmt', label: 'GMT (Greenwich Mean)' }
  ];

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-7 w-7 text-gray-700" />
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">
            Manage preferences, privacy controls, and account behavior
          </p>
        </div>

        <div className="space-y-6">
          {/* 1️⃣ Appearance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Sun className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme Selector
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setTheme(option.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        theme === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          theme === option.id ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            theme === option.id ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <span className={`font-medium ${
                          theme === option.id ? 'text-blue-700' : 'text-gray-700'
                        }`}>
                          {option.label}
                        </span>
                        {theme === option.id && (
                          <Check className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2️⃣ Language & Region */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Globe className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Language & Region</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {languages.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region / Country
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {regions.map((reg) => (
                    <option key={reg.value} value={reg.value}>
                      {reg.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              Used for localization and applicable privacy regulations.
            </p>
          </div>

          {/* 3️⃣ Time & Date Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Clock className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Time & Date Preferences</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Zone
                </label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {timeZones.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDateFormat('DD/MM/YYYY')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                      dateFormat === 'DD/MM/YYYY'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    DD/MM/YYYY
                  </button>
                  <button
                    onClick={() => setDateFormat('MM/DD/YYYY')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                      dateFormat === 'MM/DD/YYYY'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    MM/DD/YYYY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4️⃣ Consent & Risk Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-red-50 rounded-lg">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Consent & Risk Controls</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission Review Reminder
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['weekly', 'monthly', 'off'].map((frequency) => (
                    <button
                      key={frequency}
                      onClick={() => setReviewReminder(frequency)}
                      className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                        reviewReminder === frequency
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="capitalize">{frequency}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Block High-Risk Permissions</h3>
                  <p className="text-sm text-gray-500">
                    Automatically blocks permissions classified as high risk.
                  </p>
                </div>
                <button
                  onClick={() => setBlockHighRisk(!blockHighRisk)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    blockHighRisk ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      blockHighRisk ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 5️⃣ Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  id: 'highRisk',
                  label: 'High-Risk Permission Alerts',
                  description: 'Get notified when high-risk permissions are requested',
                  state: highRiskAlerts,
                  setState: setHighRiskAlerts
                },
                {
                  id: 'newPermission',
                  label: 'New Permission Request Alerts',
                  description: 'Receive alerts for new permission requests',
                  state: newPermissionAlerts,
                  setState: setNewPermissionAlerts
                },
                {
                  id: 'reminders',
                  label: 'Reminder Notifications',
                  description: 'Regular reminders for permission reviews',
                  state: reminderNotifications,
                  setState: setReminderNotifications
                }
              ].map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{notification.label}</h3>
                    <p className="text-sm text-gray-500">{notification.description}</p>
                  </div>
                  <button
                    onClick={() => notification.setState(!notification.state)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notification.state ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notification.state ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 6️⃣ Data & Storage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-amber-50 rounded-lg">
                <Database className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Data & Storage</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consent Data Retention
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['6 months', '1 year', 'Until manually deleted'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setDataRetention(period)}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      dataRetention === period
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Controls how long revoked consent records are stored.
              </p>
            </div>
          </div>

          {/* 7️⃣ Security */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Lock className="h-5 w-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <button className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Lock className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">Change Password</span>
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Opens a secure modal to update your password
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
          <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;