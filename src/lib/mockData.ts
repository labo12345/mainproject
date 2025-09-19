// Mock data for local development without Supabase connection
export interface MockProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  reviews_count: number;
  seller_id: string;
  category: string;
  stock: number;
  sellers: {
    shop_name: string;
  };
}

export interface MockUser {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'customer' | 'seller' | 'driver' | 'property_seller' | 'admin';
  kyc_status: 'pending' | 'verified' | 'rejected';
  profile_image: string | null;
}

export const mockProducts: MockProduct[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Latest flagship smartphone with advanced camera system and S Pen',
    price: 125000,
    images: ['https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'],
    rating: 4.8,
    reviews_count: 156,
    seller_id: 'seller1',
    category: 'Electronics',
    stock: 25,
    sellers: {
      shop_name: 'TechHub Kenya'
    }
  },
  {
    id: '2',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max technology',
    price: 12500,
    images: ['https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'],
    rating: 4.6,
    reviews_count: 89,
    seller_id: 'seller2',
    category: 'Fashion',
    stock: 50,
    sellers: {
      shop_name: 'SportZone'
    }
  },
  {
    id: '3',
    name: 'MacBook Pro 14-inch',
    description: 'Powerful laptop for professionals with M3 chip',
    price: 285000,
    images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg'],
    rating: 4.9,
    reviews_count: 234,
    seller_id: 'seller1',
    category: 'Electronics',
    stock: 15,
    sellers: {
      shop_name: 'TechHub Kenya'
    }
  },
  {
    id: '4',
    name: 'Organic Coffee Beans',
    description: 'Premium Kenyan coffee beans, freshly roasted',
    price: 1500,
    images: ['https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg'],
    rating: 4.7,
    reviews_count: 67,
    seller_id: 'seller3',
    category: 'Groceries',
    stock: 100,
    sellers: {
      shop_name: 'Kenya Coffee Co.'
    }
  },
  {
    id: '5',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality sound with noise cancellation',
    price: 8500,
    images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
    rating: 4.5,
    reviews_count: 123,
    seller_id: 'seller1',
    category: 'Electronics',
    stock: 35,
    sellers: {
      shop_name: 'TechHub Kenya'
    }
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat for all fitness levels',
    price: 3500,
    images: ['https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg'],
    rating: 4.4,
    reviews_count: 45,
    seller_id: 'seller4',
    category: 'Sports',
    stock: 60,
    sellers: {
      shop_name: 'FitLife Store'
    }
  },
  {
    id: '7',
    name: 'Skincare Set',
    description: 'Complete skincare routine with natural ingredients',
    price: 5500,
    images: ['https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg'],
    rating: 4.6,
    reviews_count: 78,
    seller_id: 'seller5',
    category: 'Beauty',
    stock: 40,
    sellers: {
      shop_name: 'Beauty Essentials'
    }
  },
  {
    id: '8',
    name: 'Indoor Plant Collection',
    description: 'Set of 3 air-purifying indoor plants',
    price: 2500,
    images: ['https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg'],
    rating: 4.3,
    reviews_count: 34,
    seller_id: 'seller6',
    category: 'Home & Garden',
    stock: 25,
    sellers: {
      shop_name: 'Green Thumb'
    }
  }
];

export const mockUser: MockUser = {
  id: 'user1',
  email: 'demo@quicklink.co.ke',
  full_name: 'Demo User',
  phone: '+254700000000',
  role: 'customer',
  kyc_status: 'verified',
  profile_image: null
};

export const mockRestaurants = [
  {
    id: '1',
    name: 'Mama Oliech Restaurant',
    description: 'Authentic Kenyan cuisine and fresh fish',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
    cuisine_type: 'Kenyan',
    rating: 4.7,
    reviews_count: 156,
    delivery_fee: 200,
    min_order: 500,
    estimated_delivery: 35,
    is_open: true
  },
  {
    id: '2',
    name: 'Pizza Palace',
    description: 'Wood-fired pizzas and Italian favorites',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    cuisine_type: 'Italian',
    rating: 4.5,
    reviews_count: 203,
    delivery_fee: 150,
    min_order: 800,
    estimated_delivery: 25,
    is_open: true
  }
];

export const mockProperties = [
  {
    id: '1',
    title: '3 Bedroom Apartment in Kilimani',
    description: 'Modern apartment with great amenities',
    price: 85000,
    property_type: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    size: 120,
    images: ['https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'],
    address: 'Kilimani, Nairobi',
    contact_phone: '+254700000001',
    contact_email: 'property@example.com'
  },
  {
    id: '2',
    title: '4 Bedroom House in Karen',
    description: 'Spacious family home with garden',
    price: 150000,
    property_type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    size: 250,
    images: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'],
    address: 'Karen, Nairobi',
    contact_phone: '+254700000002',
    contact_email: 'karen@example.com'
  }
];

// Mock API functions
export const mockApi = {
  // Products
  getProducts: async (filters?: any) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    let filteredProducts = [...mockProducts];
    
    if (filters?.category && filters.category !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category);
    }
    
    if (filters?.search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'reviews':
          filteredProducts.sort((a, b) => b.reviews_count - a.reviews_count);
          break;
        default:
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      }
    }
    
    return { data: filteredProducts, error: null };
  },
  
  // Auth
  signIn: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === 'demo@quicklink.co.ke' && password === 'password123') {
      return { data: { user: mockUser, session: { access_token: 'mock-token' } }, error: null };
    }
    return { data: null, error: { message: 'Invalid credentials' } };
  },
  
  signUp: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { 
      data: { 
        user: { ...mockUser, ...userData, id: 'new-user-' + Date.now() }, 
        session: { access_token: 'mock-token' } 
      }, 
      error: null 
    };
  },
  
  signOut: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { error: null };
  },
  
  // Cart
  getCartItems: async (userId: string) => {
    const cartItems = JSON.parse(localStorage.getItem('quicklink_cart') || '[]');
    return { data: cartItems, error: null };
  },
  
  addToCart: async (item: any) => {
    const cartItems = JSON.parse(localStorage.getItem('quicklink_cart') || '[]');
    cartItems.push({ ...item, id: 'cart-' + Date.now() });
    localStorage.setItem('quicklink_cart', JSON.stringify(cartItems));
    return { data: item, error: null };
  }
};