import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  ClockIcon,
  CurrencyDollarIcon,
  TruckIcon,
  UserIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { useAuthContext } from '../contexts/AuthContext';

const vehicleTypes = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Affordable rides for everyday trips',
    basePrice: 150,
    pricePerKm: 50,
    icon: '🚗',
    capacity: '1-4 passengers'
  },
  {
    id: 'comfort',
    name: 'Comfort',
    description: 'More space and premium vehicles',
    basePrice: 200,
    pricePerKm: 70,
    icon: '🚙',
    capacity: '1-4 passengers'
  },
  {
    id: 'xl',
    name: 'XL',
    description: 'Larger vehicles for groups',
    basePrice: 300,
    pricePerKm: 90,
    icon: '🚐',
    capacity: '1-6 passengers'
  }
];

export default function TaxiPage() {
  const { isMockMode, isAuthenticated } = useAuthContext();
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0]);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [estimatedFare, setEstimatedFare] = useState(0);

  const calculateFare = () => {
    if (pickup && destination) {
      // Mock calculation - in real app would use Google Maps Distance Matrix
      const mockDistance = Math.random() * 20 + 2; // 2-22 km
      const fare = selectedVehicle.basePrice + (mockDistance * selectedVehicle.pricePerKm);
      setEstimatedFare(Math.round(fare));
    }
  };

  const handleBookRide = () => {
    if (!isAuthenticated && !isMockMode) {
      alert('Please sign in to book a ride');
      return;
    }
    alert('Ride booking functionality will be implemented with real-time driver matching!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Taxi Services</h1>
              {isMockMode && (
                <p className="text-sm text-blue-600 mt-1">Demo Mode - Ride Booking Preview</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isMockMode && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Demo Taxi Service</h3>
            <p className="text-blue-700">
              This is a preview of the taxi booking service. The full version includes real-time driver tracking, 
              GPS navigation, secure payments, and driver-customer communication.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Book a Ride</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter pickup location"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              
              <button
                onClick={calculateFare}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Calculate Fare
              </button>
              
              {estimatedFare > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                    <span className="text-green-800 font-medium">
                      Estimated Fare: KES {estimatedFare.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Vehicle Type</h2>
            
            <div className="space-y-3">
              {vehicleTypes.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedVehicle.id === vehicle.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{vehicle.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{vehicle.name}</h3>
                        <span className="text-sm text-gray-600">
                          KES {vehicle.basePrice} + {vehicle.pricePerKm}/km
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{vehicle.description}</p>
                      <p className="text-xs text-gray-500">{vehicle.capacity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleBookRide}
              disabled={!pickup || !destination}
              className="w-full mt-6 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Book {selectedVehicle.name} Ride
            </button>
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
            <MapPinIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Tracking</h3>
            <p className="text-gray-600">Track your driver's location in real-time</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <UserIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Drivers</h3>
            <p className="text-gray-600">All drivers are background-checked and verified</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <PhoneIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock customer support</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}