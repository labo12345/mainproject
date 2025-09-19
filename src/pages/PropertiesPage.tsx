import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { useAuthContext } from '../contexts/AuthContext';
import { mockProperties } from '../lib/mockData';

const propertyTypes = ['All', 'Apartment', 'House', 'Commercial', 'Land'];

export default function PropertiesPage() {
  const { isMockMode } = useAuthContext();
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = mockProperties.filter(property => {
    const matchesType = selectedType === 'All' || property.property_type === selectedType;
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
              {isMockMode && (
                <p className="text-sm text-blue-600 mt-1">Demo Mode - Sample Property Listings</p>
              )}
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isMockMode && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Demo Property Listings</h3>
            <p className="text-blue-700">
              This is a preview of the property listing service. Property sellers can list their properties, 
              and potential buyers/renters can browse, filter, and contact sellers directly.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-64">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Type</h3>
              <div className="space-y-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedType === type
                        ? 'bg-red-100 text-red-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Property Listings */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredProperties.length} properties
              </p>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No properties found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {property.title}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {property.property_type}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <MapPinIcon className="h-4 w-4" />
                        <span className="text-sm">{property.address}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {property.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        {property.bedrooms && (
                          <div className="flex items-center gap-1">
                            <HomeIcon className="h-4 w-4" />
                            <span>{property.bedrooms} bed</span>
                          </div>
                        )}
                        {property.bathrooms && (
                          <span>{property.bathrooms} bath</span>
                        )}
                        {property.size && (
                          <span>{property.size} m²</span>
                        )}
                      </div>
                      
                      {property.price && (
                        <div className="flex items-center gap-1 mb-4">
                          <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                          <span className="text-lg font-bold text-green-600">
                            KES {property.price.toLocaleString()}/month
                          </span>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {property.contact_phone && (
                          <a
                            href={`tel:${property.contact_phone}`}
                            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                          >
                            <PhoneIcon className="h-4 w-4" />
                            Call
                          </a>
                        )}
                        {property.contact_email && (
                          <a
                            href={`mailto:${property.contact_email}`}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-center text-sm font-medium flex items-center justify-center gap-2"
                          >
                            <EnvelopeIcon className="h-4 w-4" />
                            Email
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
            <BuildingOfficeIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Listings</h3>
            <p className="text-gray-600">All properties are verified by our team</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <MapPinIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prime Locations</h3>
            <p className="text-gray-600">Properties in the best neighborhoods</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <PhoneIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Contact</h3>
            <p className="text-gray-600">Connect directly with property owners</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}