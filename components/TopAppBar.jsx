'use client';
import { useState } from 'react';
import Link from 'next/link';
import Drawer from './Drawer';

export default function TopAppBar({ showBack = false, onBack }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
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
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-orange-500 hover:opacity-80 transition-opacity active:scale-95"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          )}
          <Link href="/" className="text-xl font-black italic text-white tracking-[-1px] font-headline uppercase">
            P. Corner
          </Link>
          <div className="w-6 h-6" aria-hidden="true" />
        </div>
      </header>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
