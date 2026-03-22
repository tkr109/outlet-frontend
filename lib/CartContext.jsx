'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { menu } from './data';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const allItems = useMemo(() => menu.flatMap((c) => c.items), []);

  const updateQty = useCallback((id, delta) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);
  const subtotal = allItems.reduce((s, it) => s + (cart[it.id] || 0) * it.price, 0);

  const value = useMemo(() => ({
    cart, updateQty, clearCart, cartCount, subtotal, allItems,
  }), [cart, updateQty, clearCart, cartCount, subtotal, allItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
