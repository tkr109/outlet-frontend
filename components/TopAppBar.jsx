'use client';
import Link from 'next/link';
import { useCart } from '../lib/CartContext';

export default function TopAppBar({ cartCount: cartCountProp, showBack = false, onBack }) {
  const { cartCount: contextCartCount } = useCart();
  const cartCount = cartCountProp ?? contextCartCount;

  return (
    <header className="fixed top-0 w-full z-50 bg-zinc-950/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center px-6 h-16 max-w-2xl mx-auto">
        {showBack ? (
          <button
            onClick={onBack}
            className="text-white hover:opacity-80 transition-opacity active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <button className="text-orange-500 hover:opacity-80 transition-opacity active:scale-95">
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        <Link href="/" className="text-xl font-black italic text-white tracking-[-1px] font-headline uppercase">
          P. Corner
        </Link>
        <Link href="/cart" className="text-orange-500 hover:opacity-80 transition-opacity active:scale-95 relative">
          <span className="material-symbols-outlined">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-on-primary-container text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
