import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Test connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('connection_test').select('*').limit(1);
    return { connected: !error, error };
  } catch (error) {
    return { connected: false, error };
  }
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: 'customer' | 'seller' | 'driver' | 'property_seller' | 'admin';
          kyc_status: 'pending' | 'verified' | 'rejected';
          profile_image: string | null;
          addresses: any[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'customer' | 'seller' | 'driver' | 'property_seller' | 'admin';
          kyc_status?: 'pending' | 'verified' | 'rejected';
          profile_image?: string | null;
          addresses?: any[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: 'customer' | 'seller' | 'driver' | 'property_seller' | 'admin';
          kyc_status?: 'pending' | 'verified' | 'rejected';
          profile_image?: string | null;
          addresses?: any[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sellers: {
        Row: {
          id: string;
          user_id: string;
          shop_name: string;
          shop_description: string | null;
          shop_image: string | null;
          business_license: string | null;
          verification_status: 'pending' | 'verified' | 'rejected';
          created_at: string;
          updated_at: string;
        };
      };
      drivers: {
        Row: {
          id: string;
          user_id: string;
          vehicle_type: string;
          vehicle_plate: string;
          vehicle_model: string | null;
          drivers_license: string | null;
          vehicle_registration: string | null;
          verification_status: 'pending' | 'verified' | 'rejected';
          is_online: boolean;
          current_location: any | null;
          created_at: string;
          updated_at: string;
        };
      };
      products: {
        Row: {
          id: string;
          seller_id: string;
          name: string;
          description: string | null;
          price: number;
          stock: number;
          images: string[];
          category: string;
          sku: string | null;
          variants: any[] | null;
          rating: number;
          reviews_count: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_id: string;
          seller_id: string | null;
          restaurant_id: string | null;
          order_type: 'marketplace' | 'food' | 'errands';
          items: any[];
          total_amount: number;
          status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
          payment_method: 'mpesa' | 'stripe' | 'wallet' | 'cash';
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
          delivery_address: any | null;
          delivery_fee: number;
          delivery_instructions: string | null;
          driver_id: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      rides: {
        Row: {
          id: string;
          customer_id: string;
          driver_id: string | null;
          pickup_location: any;
          dropoff_location: any;
          fare: number;
          distance: number;
          duration: number;
          status: 'pending' | 'accepted' | 'driver_arrived' | 'in_progress' | 'completed' | 'cancelled';
          payment_method: 'mpesa' | 'stripe' | 'wallet' | 'cash';
          payment_status: 'pending' | 'paid' | 'failed';
          driver_location: any | null;
          created_at: string;
          updated_at: string;
        };
      };
      properties: {
        Row: {
          id: string;
          property_seller_id: string;
          title: string;
          description: string | null;
          price: number | null;
          property_type: string;
          bedrooms: number | null;
          bathrooms: number | null;
          size: number | null;
          images: string[];
          location: any;
          address: string;
          contact_phone: string | null;
          contact_email: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      restaurants: {
        Row: {
          id: string;
          seller_id: string;
          name: string;
          description: string | null;
          image: string | null;
          cuisine_type: string | null;
          rating: number;
          reviews_count: number;
          delivery_fee: number;
          min_order: number;
          estimated_delivery: number;
          is_open: boolean;
          operating_hours: any | null;
          created_at: string;
          updated_at: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          restaurant_id: string;
          name: string;
          description: string | null;
          price: number;
          image: string | null;
          category: string;
          modifiers: any[] | null;
          is_available: boolean;
          created_at: string;
          updated_at: string;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          type: 'payment' | 'refund' | 'payout' | 'wallet_topup';
          amount: number;
          currency: string;
          provider: 'mpesa' | 'stripe' | 'wallet';
          provider_transaction_id: string | null;
          status: 'pending' | 'completed' | 'failed' | 'cancelled';
          reference: string | null;
          metadata: any | null;
          created_at: string;
          updated_at: string;
        };
      };
      wallets: {
        Row: {
          id: string;
          user_id: string;
          balance: number;
          currency: string;
          created_at: string;
          updated_at: string;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          is_read: boolean;
          metadata: any | null;
          created_at: string;
        };
      };
      chats: {
        Row: {
          id: string;
          order_id: string | null;
          ride_id: string | null;
          participant_1: string;
          participant_2: string;
          last_message: string | null;
          last_message_at: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          chat_id: string;
          sender_id: string;
          message: string;
          message_type: 'text' | 'image' | 'location';
          metadata: any | null;
          created_at: string;
        };
      };
      admin_settings: {
        Row: {
          id: string;
          key: string;
          value: any;
          updated_by: string;
          updated_at: string;
        };
      };
    };
  };
};