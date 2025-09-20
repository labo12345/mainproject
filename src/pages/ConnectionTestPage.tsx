import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ArrowPathIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { supabase, testConnection } from '../lib/supabase';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function ConnectionTestPage() {
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    error?: any;
    loading: boolean;
  }>({ connected: false, loading: true });
  
  const [testData, setTestData] = useState<any[]>([]);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setConnectionStatus({ connected: false, loading: true });
    
    try {
      const result = await testConnection();
      setConnectionStatus({
        connected: result.connected,
        error: result.error,
        loading: false
      });

      if (result.connected) {
        // Fetch some test data
        const { data } = await supabase.from('connection_test').select('*').limit(5);
        setTestData(data || []);
      }
    } catch (error) {
      setConnectionStatus({
        connected: false,
        error,
        loading: false
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Supabase Connection Test
          </h1>
          <p className="text-gray-600">
            Testing connection to your Supabase database
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Connection Status</h2>
            <button
              onClick={checkConnection}
              disabled={connectionStatus.loading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <ArrowPathIcon className={`h-4 w-4 mr-2 ${connectionStatus.loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {connectionStatus.loading ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className={`flex items-center p-4 rounded-lg ${
                connectionStatus.connected 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {connectionStatus.connected ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-600 mr-3" />
                )}
                <div>
                  <p className={`font-medium ${
                    connectionStatus.connected ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {connectionStatus.connected ? 'Connected Successfully' : 'Connection Failed'}
                  </p>
                  {connectionStatus.error && (
                    <p className="text-sm text-red-600 mt-1">
                      {connectionStatus.error.message || 'Unknown error occurred'}
                    </p>
                  )}
                </div>
              </div>

              {/* Database Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <InformationCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Database Information</h3>
                    <div className="mt-2 text-sm text-blue-700 space-y-1">
                      <p><strong>URL:</strong> {import.meta.env.VITE_SUPABASE_URL}</p>
                      <p><strong>Project:</strong> {import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0] || \'Unknown'}</p>
                      <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Test Data */}
        {connectionStatus.connected && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sample Data</h2>
            
            {testData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {testData.map((row) => (
                      <tr key={row.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.message || 'No message'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.created_at ? new Date(row.created_at).toLocaleString() : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No test data found in connection_test table
              </p>
            )}
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>✅ <strong>Connection established</strong> - Your app can communicate with Supabase</p>
            <p>🔄 <strong>Run migrations</strong> - Execute the SQL migrations to create your tables</p>
            <p>🔐 <strong>Setup authentication</strong> - Configure Google OAuth and email providers</p>
            <p>📊 <strong>Seed data</strong> - Add sample products, restaurants, and users</p>
            <p>🚀 <strong>Deploy</strong> - Your app is ready for production deployment</p>
          </div>
        </div>
      </div>
    </div>
  );
}