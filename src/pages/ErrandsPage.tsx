import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TruckIcon,
  ClockIcon,
  ShieldCheckIcon,
  CameraIcon,
  MapPinIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useAuthContext } from '../contexts/AuthContext';

const errandTypes = [
  {
    id: 'delivery',
    name: 'Package Delivery',
    description: 'Send packages anywhere in the city',
    basePrice: 200,
    icon: '📦'
  },
  {
    id: 'shopping',
    name: 'Shopping Service',
    description: 'We shop for you and deliver',
    basePrice: 300,
    icon: '🛒'
  },
  {
    id: 'documents',
    name: 'Document Pickup',
    description: 'Collect and deliver important documents',
    basePrice: 150,
    icon: '📄'
  },
  {
    id: 'custom',
    name: 'Custom Errand',
    description: 'Any other task you need help with',
    basePrice: 250,
    icon: '🔧'
  }
];

export default function ErrandsPage() {
  const { isMockMode, isAuthenticated } = useAuthContext();
  const [selectedErrand, setSelectedErrand] = useState(errandTypes[0]);
  const [formData, setFormData] = useState({
    pickup: '',
    delivery: '',
    description: '',
    urgency: 'normal',
    photos: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated && !isMockMode) {
      alert('Please sign in to request an errand');
      return;
    }
    alert('Errand request functionality will be implemented with real-time tracking!');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(e.target.files!)]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Errands & Delivery</h1>
              {isMockMode && (
                <p className="text-sm text-blue-600 mt-1">Demo Mode - Errand Service Preview</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isMockMode && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Demo Errand Service</h3>
            <p className="text-blue-700">
              This is a preview of the errand and delivery service. Customers can request various tasks, 
              upload photos for reference, and track progress in real-time.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Errand Type Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Service Type</h2>
            
            <div className="space-y-3">
              {errandTypes.map((errand) => (
                <div
                  key={errand.id}
                  onClick={() => setSelectedErrand(errand)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedErrand.id === errand.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{errand.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{errand.name}</h3>
                        <span className="text-sm text-gray-600">
                          From KES {errand.basePrice}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{errand.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Request Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Request Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.pickup}
                    onChange={(e) => setFormData(prev => ({ ...prev, pickup: e.target.value }))}
                    placeholder="Enter pickup location"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Location
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.delivery}
                    onChange={(e) => setFormData(prev => ({ ...prev, delivery: e.target.value }))}
                    placeholder="Enter delivery location"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what you need help with..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData(prev => ({ ...prev, urgency: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="normal">Normal (2-4 hours)</option>
                  <option value="urgent">Urgent (1-2 hours)</option>
                  <option value="express">Express (30-60 minutes)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                  <CameraIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload photos to help us understand your request
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Choose Photos
                  </label>
                  {formData.photos.length > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      {formData.photos.length} photo(s) selected
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Estimated Cost:</span>
                  <span className="font-medium text-gray-900">
                    KES {selectedErrand.basePrice}+
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Final price depends on distance and complexity
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Request {selectedErrand.name}
              </button>
            </form>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <ClockIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Service</h3>
            <p className="text-gray-600">Most errands completed within 2-4 hours</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <ShieldCheckIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Runners</h3>
            <p className="text-gray-600">All service providers are verified and insured</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <TruckIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">Track your errand progress from start to finish</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}