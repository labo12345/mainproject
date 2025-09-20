import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingBagIcon, 
  TruckIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  StarIcon,
  ClockIcon,
  ShieldCheckIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const services = [
  {
    name: 'Marketplace',
    description: 'Shop from local stores and businesses',
    icon: ShoppingBagIcon,
    href: '/marketplace',
    color: 'bg-blue-100 text-blue-600',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
  },
  {
    name: 'Food Delivery',
    description: 'Order from your favorite restaurants',
    icon: TruckIcon,
    href: '/food',
    color: 'bg-green-100 text-green-600',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
  },
  {
    name: 'Taxi Services',
    description: 'Get a ride anywhere, anytime',
    icon: MapPinIcon,
    href: '/taxi',
    color: 'bg-yellow-100 text-yellow-600',
    image: 'https://images.pexels.com/photos/260367/pexels-photo-260367.jpeg',
  },
  {
    name: 'Properties',
    description: 'Find your next home or investment',
    icon: BuildingOfficeIcon,
    href: '/properties',
    color: 'bg-purple-100 text-purple-600',
    image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
  },
];

const features = [
  {
    name: '24/7 Support',
    description: 'Round-the-clock customer support for all your needs',
    icon: PhoneIcon,
  },
  {
    name: 'Fast Delivery',
    description: 'Quick and reliable delivery across the city',
    icon: ClockIcon,
  },
  {
    name: 'Secure Payments',
    description: 'Multiple payment options with bank-level security',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Top Rated',
    description: 'Trusted by thousands of satisfied customers',
    icon: StarIcon,
  },
];

const stats = [
  { name: 'Happy Customers', value: '10,000+' },
  { name: 'Partner Businesses', value: '500+' },
  { name: 'Cities Served', value: '15+' },
  { name: 'Orders Delivered', value: '50,000+' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-800 to-red-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl"
            >
              Everything You Need,{' '}
              <span className="text-yellow-400">One App</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-gray-100"
            >
              QUICKLINK SERVICES connects you with local stores, restaurants, drivers and trusted service professionals. Fast, secure, and reliable.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <Link
                to="/marketplace"
                className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                to="/auth/signup"
                className="text-sm font-semibold leading-6 text-white hover:text-yellow-400 transition-colors"
              >
                Join as Partner <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              All Your Needs, One Platform
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              From shopping to dining, transportation to real estate - we've got you covered.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={service.href}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:ring-red-300 transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className={`inline-flex p-3 rounded-lg ${service.color} mb-4`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose QUICKLINK?
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              We're committed to providing the best service experience in Kenya.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className="inline-flex p-3 rounded-lg bg-red-100 text-red-600 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 sm:py-32 bg-red-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by Thousands
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-100">
              Join the growing community of satisfied customers and partners.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <dt className="text-base leading-7 text-gray-100">{stat.name}</dt>
                <dd className="text-3xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join thousands of satisfied customers and experience the convenience of QUICKLINK SERVICES.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/auth/signup"
                className="rounded-md bg-red-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                to="/marketplace"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-red-600 transition-colors"
              >
                Browse Services <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}