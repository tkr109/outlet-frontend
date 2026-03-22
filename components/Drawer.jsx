'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { outlet } from '../lib/data';

const navItems = [
  { href: '/', label: 'Home', icon: 'home_app_logo' },
  { href: '/order', label: 'Menu', icon: 'restaurant_menu' },
  { href: '/cart', label: 'Cart', icon: 'shopping_bag' },
];

export default function Drawer({ isOpen, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKey = (e) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKey);
      };
    }
    document.body.style.overflow = '';
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[300px] max-w-[85vw] bg-[#141414]/95 backdrop-blur-xl overflow-y-auto hide-scrollbar transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 pb-8 sm:p-6 sm:pb-10 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-headline text-[20px] sm:text-[24px] font-extrabold tracking-[-0.6px] text-white">
                {outlet.name}
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">{outlet.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-white transition-colors mt-1"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="h-px bg-outline-variant/15" />

          {/* Operating Hours */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[1.4px] text-primary font-bold">
              Operating Hours
            </span>
            <div className="space-y-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg text-primary">shopping_bag</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">Takeaway</p>
                  <p className="text-sm font-bold text-white">{outlet.takeawayTiming}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg text-tertiary">moped</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">Delivery</p>
                  <p className="text-sm font-bold text-white">{outlet.deliveryTiming}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg text-red-400">event_busy</span>
                </div>
                <p className="text-sm text-on-surface-variant">
                  Closed on <span className="text-white font-semibold">{outlet.closedDay}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-outline-variant/15" />

          {/* Location */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[1.4px] text-primary font-bold">
              Location
            </span>
            <p className="text-sm text-on-surface-variant leading-relaxed mt-2">
              {outlet.addressLabel}
            </p>
            <a
              href={outlet.googleMapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-lg">map</span>
              View on Maps
            </a>
          </div>

          <div className="h-px bg-outline-variant/15" />

          {/* Contact */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[1.4px] text-primary font-bold">
              Get in Touch
            </span>
            <div className="flex gap-4 mt-2">
              {outlet.socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="h-11 w-11 rounded-full bg-surface-container-highest flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined">{link.icon}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="h-px bg-outline-variant/15" />

          {/* Navigation */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[1.4px] text-primary font-bold mb-2 block">
              Navigate
            </span>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-3 rounded-2xl transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-on-surface-variant hover:text-white hover:bg-surface-container-highest'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="h-px bg-outline-variant/15" />

          {/* Specialties */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[1.4px] text-primary font-bold">
              Our Specialties
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {outlet.specialties.map((item) => (
                <span
                  key={item}
                  className="bg-primary/10 text-primary text-[11px] font-semibold rounded-full px-3 py-1.5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
