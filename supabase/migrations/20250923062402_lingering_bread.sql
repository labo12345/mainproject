/*
  # Complete QUICKLINK SERVICES Database Schema

  1. New Tables
    - `users` - User profiles with roles and KYC status
    - `sellers` - Seller/restaurant information
    - `drivers` - Driver profiles and vehicle info
    - `products` - Marketplace products
    - `restaurants` - Restaurant information
    - `menu_items` - Restaurant menu items
    - `properties` - Property listings
    - `orders` - All types of orders (marketplace, food, errands)
    - `rides` - Taxi/ride bookings
    - `cart_items` - Shopping cart persistence
    - `transactions` - Payment transactions
    - `wallets` - User wallet balances
    - `notifications` - User notifications
    - `chats` - Order/ride communication
    - `chat_messages` - Chat messages
    - `admin_settings` - System configuration

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for each user role
    - Secure data access based on user authentication

  3. Features
    - Multi-role user system (customer, seller, driver, property_seller, admin)
    - Complete e-commerce functionality
    - Real-time chat and notifications
    - Wallet and payment system
    - KYC verification system
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  role text NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'seller', 'driver', 'property_seller', 'admin')),
  kyc_status text NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
  profile_image text,
  addresses jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sellers table
CREATE TABLE IF NOT EXISTS sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  shop_name text NOT NULL,
  shop_description text,
  shop_image text,
  business_license text,
  verification_status text NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  vehicle_type text NOT NULL,
  vehicle_plate text NOT NULL,
  vehicle_model text,
  drivers_license text,
  vehicle_registration text,
  verification_status text NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  is_online boolean DEFAULT false,
  current_location point,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES sellers(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  images text[] DEFAULT '{}',
  category text NOT NULL,
  sku text,
  variants jsonb DEFAULT '[]'::jsonb,
  rating decimal(3,2) DEFAULT 0,
  reviews_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid REFERENCES sellers(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  image text,
  cuisine_type text,
  rating decimal(3,2) DEFAULT 0,
  reviews_count integer DEFAULT 0,
  delivery_fee decimal(8,2) DEFAULT 0,
  min_order decimal(8,2) DEFAULT 0,
  estimated_delivery integer DEFAULT 30,
  is_open boolean DEFAULT true,
  operating_hours jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price decimal(8,2) NOT NULL,
  image text,
  category text NOT NULL,
  modifiers jsonb DEFAULT '[]'::jsonb,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_seller_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  price decimal(12,2),
  property_type text NOT NULL,
  bedrooms integer,
  bathrooms integer,
  size decimal(8,2),
  images text[] DEFAULT '{}',
  location point,
  address text NOT NULL,
  contact_phone text,
  contact_email text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  seller_id uuid REFERENCES sellers(id) ON DELETE SET NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE SET NULL,
  order_type text NOT NULL CHECK (order_type IN ('marketplace', 'food', 'errands')),
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'shipped', 'delivered', 'completed', 'cancelled')),
  payment_method text CHECK (payment_method IN ('mpesa', 'stripe', 'wallet', 'cash')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  delivery_address jsonb,
  delivery_fee decimal(8,2) DEFAULT 0,
  delivery_instructions text,
  driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rides table
CREATE TABLE IF NOT EXISTS rides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  driver_id uuid REFERENCES drivers(id) ON DELETE SET NULL,
  pickup_location point NOT NULL,
  dropoff_location point NOT NULL,
  fare decimal(8,2) NOT NULL,
  distance decimal(8,2),
  duration integer,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'driver_arrived', 'in_progress', 'completed', 'cancelled')),
  payment_method text CHECK (payment_method IN ('mpesa', 'stripe', 'wallet', 'cash')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  driver_location point,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  name text NOT NULL,
  price decimal(8,2) NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  image text,
  seller_id uuid REFERENCES sellers(id) ON DELETE SET NULL,
  restaurant_id uuid REFERENCES restaurants(id) ON DELETE SET NULL,
  modifiers jsonb DEFAULT '[]'::jsonb,
  type text NOT NULL CHECK (type IN ('product', 'food')),
  created_at timestamptz DEFAULT now()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('payment', 'refund', 'payout', 'wallet_topup')),
  amount decimal(10,2) NOT NULL,
  currency text NOT NULL DEFAULT 'KES',
  provider text CHECK (provider IN ('mpesa', 'stripe', 'wallet')),
  provider_transaction_id text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  reference text,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  balance decimal(10,2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'KES',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  is_read boolean DEFAULT false,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  ride_id uuid REFERENCES rides(id) ON DELETE CASCADE,
  participant_1 uuid REFERENCES users(id) ON DELETE CASCADE,
  participant_2 uuid REFERENCES users(id) ON DELETE CASCADE,
  last_message text,
  last_message_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid REFERENCES chats(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  message_type text NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'location')),
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Admin settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_by uuid REFERENCES users(id),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile" ON users FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Public can read verified sellers" ON users FOR SELECT TO anon USING (role = 'seller' AND kyc_status = 'verified');

-- Sellers policies
CREATE POLICY "Sellers can manage own shop" ON sellers FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Public can read verified sellers" ON sellers FOR SELECT TO anon USING (verification_status = 'verified');

-- Drivers policies
CREATE POLICY "Drivers can manage own profile" ON drivers FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Public can read verified drivers" ON drivers FOR SELECT TO anon USING (verification_status = 'verified');

-- Products policies
CREATE POLICY "Anyone can read active products" ON products FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Sellers can manage own products" ON products FOR ALL TO authenticated USING (
  seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
);

-- Restaurants policies
CREATE POLICY "Anyone can read restaurants" ON restaurants FOR SELECT TO anon USING (true);
CREATE POLICY "Sellers can manage own restaurants" ON restaurants FOR ALL TO authenticated USING (
  seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid())
);

-- Menu items policies
CREATE POLICY "Anyone can read available menu items" ON menu_items FOR SELECT TO anon USING (is_available = true);
CREATE POLICY "Restaurant owners can manage menu items" ON menu_items FOR ALL TO authenticated USING (
  restaurant_id IN (
    SELECT r.id FROM restaurants r 
    JOIN sellers s ON r.seller_id = s.id 
    WHERE s.user_id = auth.uid()
  )
);

-- Properties policies
CREATE POLICY "Anyone can read active properties" ON properties FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Property sellers can manage own properties" ON properties FOR ALL TO authenticated USING (property_seller_id = auth.uid());

-- Orders policies
CREATE POLICY "Users can read own orders" ON orders FOR SELECT TO authenticated USING (customer_id = auth.uid());
CREATE POLICY "Users can create orders" ON orders FOR INSERT TO authenticated WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Sellers can read orders for their products" ON orders FOR SELECT TO authenticated USING (
  seller_id IN (SELECT id FROM sellers WHERE user_id = auth.uid()) OR
  restaurant_id IN (SELECT r.id FROM restaurants r JOIN sellers s ON r.seller_id = s.id WHERE s.user_id = auth.uid())
);

-- Rides policies
CREATE POLICY "Users can read own rides" ON rides FOR SELECT TO authenticated USING (customer_id = auth.uid());
CREATE POLICY "Users can create rides" ON rides FOR INSERT TO authenticated WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Drivers can read assigned rides" ON rides FOR SELECT TO authenticated USING (
  driver_id IN (SELECT id FROM drivers WHERE user_id = auth.uid())
);

-- Cart items policies
CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL TO authenticated USING (user_id = auth.uid());

-- Transactions policies
CREATE POLICY "Users can read own transactions" ON transactions FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Wallets policies
CREATE POLICY "Users can read own wallet" ON wallets FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own wallet" ON wallets FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- Chat policies
CREATE POLICY "Users can read own chats" ON chats FOR SELECT TO authenticated USING (
  participant_1 = auth.uid() OR participant_2 = auth.uid()
);

-- Chat messages policies
CREATE POLICY "Users can read messages in their chats" ON chat_messages FOR SELECT TO authenticated USING (
  chat_id IN (
    SELECT id FROM chats WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
  )
);
CREATE POLICY "Users can send messages in their chats" ON chat_messages FOR INSERT TO authenticated WITH CHECK (
  sender_id = auth.uid() AND
  chat_id IN (
    SELECT id FROM chats WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
  )
);

-- Admin settings policies
CREATE POLICY "Only admins can manage settings" ON admin_settings FOR ALL TO authenticated USING (
  auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_rides_customer_id ON rides(customer_id);
CREATE INDEX IF NOT EXISTS idx_rides_driver_id ON rides(driver_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sellers_updated_at BEFORE UPDATE ON sellers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_restaurants_updated_at BEFORE UPDATE ON restaurants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rides_updated_at BEFORE UPDATE ON rides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();