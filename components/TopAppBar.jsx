'use client';

import Link from 'next/link';

export default function TopAppBar({ cartCount = 0, showBack = false }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-zinc-950/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <div className="flex justify-between items-center px-6 h-16 max-w-2xl mx-auto">
        {showBack ? (
          <div className="flex items-center gap-4">
            <Link href="/order" className="text-white hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <Link href="/" className="text-xl font-black italic text-white tracking-tighter font-headline">
              Ghar Ka Zaika
            </Link>
          </div>
        ) : (
          <>
            <button className="text-orange-500 hover:opacity-80 transition-opacity active:scale-95 duration-200 ease-out">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <Link href="/" className="text-xl font-black italic text-white tracking-tighter font-headline">
              Ghar Ka Zaika
            </Link>
          </>
        )}
        <Link href="/order" className="text-orange-500 hover:opacity-80 transition-opacity active:scale-95 duration-200 ease-out relative">
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
