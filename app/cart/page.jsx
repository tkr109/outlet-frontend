'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import TopAppBar from '../../components/TopAppBar';
import BottomNav from '../../components/BottomNav';
import { useCart } from '../../lib/CartContext';
import { currency } from '../../lib/constants';

export default function CartPage() {
  const { cart, updateQty, cartCount, subtotal, allItems } = useCart();

  const serviceFee = cartCount > 0 ? 10 : 0;
  const total = subtotal + serviceFee;

  const cartItems = useMemo(
    () => allItems.filter((it) => cart[it.id]),
    [allItems, cart]
  );

  // ─── EMPTY STATE ───
  if (cartCount === 0) {
    return (
      <>
        <TopAppBar />
        <main className="pt-24 pb-40 px-4 sm:px-6 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh]">
          <div className="w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">shopping_bag</span>
          </div>
          <h2 className="font-headline text-[24px] font-extrabold text-on-surface mb-2">Your bag is empty</h2>
          <p className="text-on-surface-variant font-body text-sm text-center mb-8 max-w-[260px]">
            Looks like you haven&apos;t added anything yet. Browse the menu and discover something delicious.
          </p>
          <Link
            href="/order"
            className="liquid-gradient px-8 py-4 rounded-full font-label font-bold text-on-primary-container uppercase tracking-[1.4px] text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">restaurant_menu</span>
            Browse Menu
          </Link>
        </main>
        <BottomNav />
      </>
    );
  }

  // ─── CART WITH ITEMS ───
  return (
    <>
      <TopAppBar />
      <main className="pt-24 pb-44 px-4 sm:px-6 max-w-lg mx-auto">
        {/* Header */}
        <section className="mb-8">
          <h2 className="font-headline text-[28px] sm:text-[36px] font-extrabold tracking-[-0.9px] text-on-surface mb-2">Your Bag</h2>
          <p className="text-on-surface-variant font-body text-[16px]">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} ready to go.
          </p>
        </section>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-surface-container-low rounded-[32px] p-4 flex items-center gap-4">
              {item.image ? (
                <div className="w-16 h-16 rounded-[24px] bg-surface-container-highest overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-[24px] bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl text-on-surface-variant">lunch_dining</span>
                </div>
              )}
              <div className="flex-grow min-w-0">
                <h4 className="font-headline font-bold text-on-surface text-sm truncate">{item.name}</h4>
                <span className="text-primary font-bold text-sm">{currency.format(item.price * cart[item.id])}</span>
              </div>
              <div className="flex items-center bg-surface-container-highest rounded-full p-1 gap-3 shrink-0">
                <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">
                    {cart[item.id] === 1 ? 'delete' : 'remove'}
                  </span>
                </button>
                <span className="font-label font-bold text-sm min-w-[1rem] text-center">{cart[item.id]}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-on-primary-container shadow-sm">
                  <span className="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-surface-container-low rounded-[32px] p-4 sm:p-6 space-y-4 mb-8">
          <h3 className="font-headline font-bold text-[20px] text-white">Order Summary</h3>
          <div className="h-[1px] bg-outline-variant opacity-[0.15]" />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Subtotal</span>
              <span className="text-white">{currency.format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Service Fee</span>
              <span className="text-white">{currency.format(serviceFee)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Delivery Fee</span>
              <span className="text-white italic text-xs">calculated at checkout</span>
            </div>
            <div className="h-[1px] bg-outline-variant opacity-[0.15] my-2" />
            <div className="flex justify-between text-lg pt-2">
              <span className="font-bold text-white">Estimated Total</span>
              <span className="font-black text-primary">{currency.format(total)}</span>
            </div>
          </div>
        </div>

        {/* Add More Items */}
        <Link
          href="/order"
          className="flex items-center justify-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4 py-3"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          <span className="font-label text-sm font-bold uppercase tracking-[1px]">Add More Items</span>
        </Link>
      </main>

      {/* Sticky Checkout Button */}
      <aside className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <Link
          href="/order?checkout=true"
          className="liquid-gradient block w-full py-5 rounded-full font-headline font-bold text-[16px] text-on-primary-container text-center shadow-xl shadow-primary/20 active:scale-95 transition-transform"
        >
          Proceed to Checkout
        </Link>
      </aside>

      <BottomNav />
    </>
  );
}
