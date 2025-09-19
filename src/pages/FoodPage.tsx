import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  StarIcon,
  TruckIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useAuthContext } from '../contexts/AuthContext';
import { mockRestaurants } from '../lib/mockData';

export default function FoodPage() {
  const { isMockMode } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Food Delivery</h1>
              {isMockMode && (
                <p className="text-sm text-blue-600 mt-1">Demo Mode - Sample Restaurants</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isMockMode && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Demo Food Delivery</h3>
            <p className="text-blue-700">
              This is a preview of the food delivery service. In the full version, customers can browse restaurants, 
              view menus, customize orders, and track deliveries in real-time.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    restaurant.is_open 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {restaurant.is_open ? 'Open' : 'Closed'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{restaurant.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{restaurant.rating}</span>
                    <span>({restaurant.reviews_count})</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{restaurant.estimated_delivery} min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <TruckIcon className="h-4 w-4" />
                    <span>KES {restaurant.delivery_fee} delivery</span>
                  </div>
                  
                  <div className="text-gray-600">
                    Min: KES {restaurant.min_order}
                  </div>
                </div>
                
                <div className="mt-4">
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                    View Menu
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <MapPinIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">Track your order from kitchen to doorstep</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <ClockIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Delivery</h3>
            <p className="text-gray-600">Average delivery time under 30 minutes</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <StarIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-gray-600">Only verified restaurants and fresh food</p>
          </div>
        </div>
      </div>
    </div>
  );
}