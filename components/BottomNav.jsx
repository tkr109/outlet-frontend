'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isOrder = pathname === '/order';
  const isCart = pathname === '/cart';
  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <div className="bg-zinc-900/80 backdrop-blur-2xl shadow-2xl shadow-orange-500/10 w-[90%] max-w-md rounded-full px-8 py-3 flex justify-around items-center">
        <Link href="/" className={`transition-colors ${isHome ? 'text-orange-500 scale-110' : 'text-zinc-500 hover:text-white'}`}>
          <span className="material-symbols-outlined" style={isHome ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            home_app_logo
          </span>
        </Link>
        <Link href="/order" className={`transition-colors ${isOrder ? 'text-orange-500 scale-110' : 'text-zinc-500 hover:text-white'}`}>
          <span className="material-symbols-outlined" style={isOrder ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            restaurant_menu
          </span>
        </Link>
        <Link href="/cart" className={`transition-colors ${isCart ? 'text-orange-500 scale-110' : 'text-zinc-500 hover:text-white'}`}>
          <span className="material-symbols-outlined" style={isCart ? { fontVariationSettings: "'FILL' 1" } : undefined}>
            shopping_bag
          </span>
        </Link>
      </div>
    </nav>
  );
}
