/*
  # Seed Sample Data for QUICKLINK SERVICES

  This migration adds sample data to demonstrate the platform functionality:
  - Sample users with different roles
  - Sample sellers and their shops
  - Sample products across different categories
  - Sample restaurants and menu items
  - Sample properties
  - Sample drivers
*/

-- Insert sample users (these will be created when users sign up via auth)
-- We'll create some sellers and products that can be associated with real users later

-- Insert sample sellers
INSERT INTO sellers (id, user_id, shop_name, shop_description, shop_image, verification_status) VALUES
('550e8400-e29b-41d4-a716-446655440001', NULL, 'TechHub Kenya', 'Your one-stop shop for electronics and gadgets', 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg', 'verified'),
('550e8400-e29b-41d4-a716-446655440002', NULL, 'SportZone', 'Premium sports equipment and apparel', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 'verified'),
('550e8400-e29b-41d4-a716-446655440003', NULL, 'Kenya Coffee Co.', 'Premium Kenyan coffee beans and accessories', 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg', 'verified'),
('550e8400-e29b-41d4-a716-446655440004', NULL, 'FitLife Store', 'Fitness equipment and wellness products', 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg', 'verified'),
('550e8400-e29b-41d4-a716-446655440005', NULL, 'Beauty Essentials', 'Natural skincare and beauty products', 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg', 'verified'),
('550e8400-e29b-41d4-a716-446655440006', NULL, 'Green Thumb', 'Indoor plants and gardening supplies', 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg', 'verified');

-- Insert sample products
INSERT INTO products (id, seller_id, name, description, price, stock, images, category, rating, reviews_count) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Samsung Galaxy S24 Ultra', 'Latest flagship smartphone with advanced camera system and S Pen', 125000.00, 25, ARRAY['https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'], 'Electronics', 4.8, 156),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Nike Air Max 270', 'Comfortable running shoes with Air Max technology', 12500.00, 50, ARRAY['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'], 'Fashion', 4.6, 89),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'MacBook Pro 14-inch', 'Powerful laptop for professionals with M3 chip', 285000.00, 15, ARRAY['https://images.pexels.com/photos/18105/pexels-photo.jpg'], 'Electronics', 4.9, 234),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', 'Organic Coffee Beans', 'Premium Kenyan coffee beans, freshly roasted', 1500.00, 100, ARRAY['https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg'], 'Groceries', 4.7, 67),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'Wireless Bluetooth Headphones', 'High-quality sound with noise cancellation', 8500.00, 35, ARRAY['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'], 'Electronics', 4.5, 123),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440004', 'Yoga Mat Premium', 'Non-slip yoga mat for all fitness levels', 3500.00, 60, ARRAY['https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg'], 'Sports', 4.4, 45),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440005', 'Skincare Set', 'Complete skincare routine with natural ingredients', 5500.00, 40, ARRAY['https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg'], 'Beauty', 4.6, 78),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440006', 'Indoor Plant Collection', 'Set of 3 air-purifying indoor plants', 2500.00, 25, ARRAY['https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg'], 'Home & Garden', 4.3, 34),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440001', 'iPhone 15 Pro', 'Latest iPhone with titanium design and advanced cameras', 135000.00, 20, ARRAY['https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg'], 'Electronics', 4.7, 198),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'Adidas Ultraboost 22', 'Premium running shoes with boost technology', 15000.00, 30, ARRAY['https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg'], 'Fashion', 4.5, 112);

-- Insert sample restaurants
INSERT INTO restaurants (id, seller_id, name, description, image, cuisine_type, rating, reviews_count, delivery_fee, min_order, estimated_delivery) VALUES
('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Mama Oliech Restaurant', 'Authentic Kenyan cuisine and fresh fish', 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg', 'Kenyan', 4.7, 156, 200.00, 500.00, 35),
('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Pizza Palace', 'Wood-fired pizzas and Italian favorites', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg', 'Italian', 4.5, 203, 150.00, 800.00, 25),
('750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Spice Route', 'Authentic Indian and Asian cuisine', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Indian', 4.6, 189, 180.00, 600.00, 30),
('750e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Burger Junction', 'Gourmet burgers and fast food favorites', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg', 'Fast Food', 4.3, 267, 120.00, 400.00, 20);

-- Insert sample menu items
INSERT INTO menu_items (restaurant_id, name, description, price, image, category) VALUES
-- Mama Oliech Restaurant
('750e8400-e29b-41d4-a716-446655440001', 'Tilapia Fish', 'Fresh tilapia served with ugali and sukuma wiki', 1200.00, 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg', 'Main Course'),
('750e8400-e29b-41d4-a716-446655440001', 'Nyama Choma', 'Grilled beef with traditional sides', 1500.00, 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg', 'Main Course'),
('750e8400-e29b-41d4-a716-446655440001', 'Ugali', 'Traditional Kenyan staple', 200.00, 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg', 'Sides'),

-- Pizza Palace
('750e8400-e29b-41d4-a716-446655440002', 'Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 1800.00, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg', 'Pizza'),
('750e8400-e29b-41d4-a716-446655440002', 'Pepperoni Pizza', 'Pepperoni with mozzarella cheese', 2200.00, 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg', 'Pizza'),
('750e8400-e29b-41d4-a716-446655440002', 'Chicken Alfredo Pasta', 'Creamy pasta with grilled chicken', 1600.00, 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg', 'Pasta'),

-- Spice Route
('750e8400-e29b-41d4-a716-446655440003', 'Chicken Biryani', 'Aromatic basmati rice with spiced chicken', 1400.00, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', 'Main Course'),
('750e8400-e29b-41d4-a716-446655440003', 'Butter Chicken', 'Creamy tomato curry with tender chicken', 1300.00, 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', 'Curry'),
('750e8400-e29b-41d4-a716-446655440003', 'Naan Bread', 'Fresh baked Indian bread', 300.00, 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', 'Bread'),

-- Burger Junction
('750e8400-e29b-41d4-a716-446655440004', 'Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 900.00, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg', 'Burgers'),
('750e8400-e29b-41d4-a716-446655440004', 'Chicken Burger', 'Grilled chicken breast with special sauce', 850.00, 'https://images.pexels.com/photos/552056/pexels-photo-552056.jpeg', 'Burgers'),
('750e8400-e29b-41d4-a716-446655440004', 'French Fries', 'Crispy golden fries', 400.00, 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg', 'Sides');

-- Insert sample properties
INSERT INTO properties (property_seller_id, title, description, price, property_type, bedrooms, bathrooms, size, images, address, contact_phone, contact_email) VALUES
(NULL, '3 Bedroom Apartment in Kilimani', 'Modern apartment with great amenities including swimming pool, gym, and 24/7 security', 85000.00, 'Apartment', 3, 2, 120.00, ARRAY['https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'], 'Kilimani, Nairobi', '+254700000001', 'property@example.com'),
(NULL, '4 Bedroom House in Karen', 'Spacious family home with garden, DSQ, and modern finishes', 150000.00, 'House', 4, 3, 250.00, ARRAY['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'], 'Karen, Nairobi', '+254700000002', 'karen@example.com'),
(NULL, '2 Bedroom Apartment in Westlands', 'Contemporary apartment in prime location with city views', 75000.00, 'Apartment', 2, 2, 90.00, ARRAY['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'], 'Westlands, Nairobi', '+254700000003', 'westlands@example.com'),
(NULL, 'Commercial Office Space', 'Modern office space in CBD with parking and high-speed internet', 200000.00, 'Commercial', NULL, 2, 150.00, ARRAY['https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg'], 'CBD, Nairobi', '+254700000004', 'office@example.com'),
(NULL, '5 Bedroom Villa in Runda', 'Luxury villa with swimming pool, garden, and staff quarters', 300000.00, 'House', 5, 4, 400.00, ARRAY['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'], 'Runda, Nairobi', '+254700000005', 'runda@example.com');

-- Insert sample admin settings
INSERT INTO admin_settings (key, value) VALUES
('delivery_fee_rate', '{"rate": 0.1, "minimum": 100, "maximum": 500}'),
('commission_rates', '{"marketplace": 0.05, "food": 0.15, "rides": 0.20}'),
('payment_methods', '{"mpesa": true, "stripe": true, "wallet": true, "cash": false}'),
('app_maintenance', '{"enabled": false, "message": "App is under maintenance"}'),
('kyc_requirements', '{"id_required": true, "phone_verification": true, "email_verification": true}');