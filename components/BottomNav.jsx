'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isMenu = pathname === '/order' || pathname.startsWith('/order');
  const isProfile = pathname === '/success';

  return (
    <nav className="fixed bottom-6 left-0 right-0 flex justify-around items-center z-50">
      <div className="bg-zinc-900/80 backdrop-blur-2xl shadow-2xl shadow-orange-500/10 left-1/2 w-[90%] max-w-md rounded-full px-8 py-3 flex justify-around items-center mx-auto">
        <Link href="/" className={`${isHome ? 'text-orange-500 scale-110' : 'text-zinc-500'} hover:text-white transition-colors`}>
          <span className="material-symbols-outlined" style={isHome ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            home_app_logo
          </span>
        </Link>
        <Link href="/order" className={`${isMenu ? 'text-orange-500 scale-110' : 'text-zinc-500'} hover:text-white transition-colors`}>
          <span className="material-symbols-outlined" style={isMenu ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            restaurant_menu
          </span>
        </Link>
        <Link href="/success" className={`${isProfile ? 'text-orange-500 scale-110' : 'text-zinc-500'} hover:text-white transition-colors`}>
          <span className="material-symbols-outlined" style={isProfile ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            person
          </span>
        </Link>
      </div>
    </nav>
  );
}
