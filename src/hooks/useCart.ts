import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export interface CartItem {
  id: string;
  product_id?: string;
  menu_item_id?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  seller_id?: string;
  restaurant_id?: string;
  modifiers?: any[];
  type: 'product' | 'food';
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    loadCart();
  }, [user]);

  const loadCart = async () => {
    if (!user) {
      // Load from localStorage for non-authenticated users
      const savedCart = localStorage.getItem('quicklink_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(calculateCartTotals(parsedCart));
      }
      return;
    }

      try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading cart:', error);
        return;
      }

      const cartItems = data?.map(item => ({
        id: item.id,
        product_id: item.product_id,
        menu_item_id: item.menu_item_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        seller_id: item.seller_id,
        restaurant_id: item.restaurant_id,
        modifiers: item.modifiers,
        type: item.type,
      })) || [];

      setCart(calculateCartTotals({ items: cartItems }));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
  };

  const calculateCartTotals = (cartData: { items: CartItem[] }): Cart => {
    const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
    const total = cartData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return {
      items: cartData.items,
      total,
      itemCount,
    };
  };

  const saveCart = async (newCart: Cart) => {
    setCart(newCart);

    if (!user) {
      // Save to localStorage for non-authenticated users
      localStorage.setItem('quicklink_cart', JSON.stringify(newCart.items));
      return;
    }

      try {
      // Clear existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      // Insert new cart items
      if (newCart.items.length > 0) {
        const cartItems = newCart.items.map(item => ({
          user_id: user.id,
          product_id: item.product_id,
          menu_item_id: item.menu_item_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          seller_id: item.seller_id,
          restaurant_id: item.restaurant_id,
          modifiers: item.modifiers,
          type: item.type,
        }));

        const { error } = await supabase
          .from('cart_items')
          .insert(cartItems);

        if (error) {
          console.error('Error saving cart:', error);
        }
      }
      } catch (error) {
        console.error('Error saving cart:', error);
      }
  };

  const addToCart = async (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => {
    setIsLoading(true);
    try {
      const existingItem = cart.items.find(
        cartItem => 
          cartItem.product_id === item.product_id ||
          cartItem.menu_item_id === item.menu_item_id
      );

      let newItems: CartItem[];

      if (existingItem) {
        // Update quantity of existing item
        newItems = cart.items.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `temp_${Date.now()}_${Math.random()}`,
          ...item,
          quantity: item.quantity || 1,
        };
        newItems = [...cart.items, newItem];
      }

      const newCart = calculateCartTotals({ items: newItems });
      await saveCart(newCart);
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    setIsLoading(true);
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      const newItems = cart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );

      const newCart = calculateCartTotals({ items: newItems });
      await saveCart(newCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setIsLoading(true);
    try {
      const newItems = cart.items.filter(item => item.id !== itemId);
      const newCart = calculateCartTotals({ items: newItems });
      await saveCart(newCart);
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      if (user) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
      } else {
        localStorage.removeItem('quicklink_cart');
      }

      setCart({ items: [], total: 0, itemCount: 0 });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cart,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    // Convenience getters
    items: cart.items,
    total: cart.total,
    itemCount: cart.itemCount,
  };
}