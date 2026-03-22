'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopAppBar from '../../components/TopAppBar';
import BottomNav from '../../components/BottomNav';
import { ORDER_KEY, currency } from '../../lib/constants';

export default function SuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(ORDER_KEY);
    if (!raw) { router.replace('/'); return; }
    setOrder(JSON.parse(raw));
  }, [router]);

  if (!order) return null;

  const date = new Date(order.timestamp);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });

  return (
    <>
      <TopAppBar />
      <main className="flex-grow pt-24 pb-32 px-6 flex flex-col items-center max-w-lg mx-auto w-full">
        {/* Visual Confirmation Header */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-tertiary-container blur-2xl opacity-20 animate-pulse" />
            <div className="w-20 h-20 rounded-full liquid-gradient flex items-center justify-center shadow-2xl shadow-primary/40">
              <span
                className="material-symbols-outlined text-white text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>
          <h2 className="text-[36px] font-headline font-extrabold tracking-[-0.9px] mb-2">Order Confirmed!</h2>
          <p className="text-on-surface-variant font-body text-[16px]">Your feast is being prepared with artistry.</p>
        </div>

        {/* The Premium Receipt Card */}
        <div className="w-full bg-surface-container-low rounded-[32px] p-1 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 border border-outline-variant/[0.1] rounded-[32px] pointer-events-none" />
          <div className="bg-surface-container-high rounded-[32px] p-8 relative">
            {/* Receipt Header */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-label text-primary font-bold mb-1">Receipt ID</p>
                <p className="font-headline font-bold text-lg text-white">{order.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest font-label text-on-surface-variant mb-1">Mode</p>
                <div className="flex items-center gap-2 justify-end">
                  <span className="material-symbols-outlined text-tertiary text-sm">
                    {order.customer.orderType === 'delivery' ? 'delivery_dining' : 'shopping_bag'}
                  </span>
                  <p className="font-body font-semibold text-white capitalize">{order.customer.orderType}</p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-6 mb-10">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {item.image && (
                      <div className="w-12 h-12 rounded-[32px] overflow-hidden bg-surface-container-highest shrink-0">
                        <img className="w-full h-full object-cover opacity-90" src={item.image} alt={item.name} />
                      </div>
                    )}
                    <div>
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-xs text-on-surface-variant font-label">{item.qty} x {currency.format(item.price)}</p>
                    </div>
                  </div>
                  <p className="font-headline font-bold text-white">{currency.format(item.price * item.qty)}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-outline-variant/20 mb-8" />

            {/* Financials */}
            <div className="space-y-3 mb-10">
              <div className="flex justify-between text-on-surface-variant font-body text-sm">
                <span>Subtotal</span>
                <span className="text-white">{currency.format(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant font-body text-sm">
                <span>Service Fee</span>
                <span className="text-white">{currency.format(order.serviceFee)}</span>
              </div>
              {order.deliveryFee > 0 && (
                <div className="flex justify-between text-on-surface-variant font-body text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-white">{currency.format(order.deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-headline font-extrabold text-white">Total</span>
                <span className="text-2xl font-headline font-extrabold text-primary">{currency.format(order.total)}</span>
              </div>
            </div>

            {/* Footer / Timestamp */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="px-4 py-2 bg-surface-container-highest rounded-full">
                <p className="text-[10px] uppercase tracking-[0.2em] font-label text-on-secondary-container">
                  {formattedDate} &bull; {formattedTime}
                </p>
              </div>
              {/* Decorative Barcode */}
              <div className="h-12 w-full max-w-[200px] flex gap-1 items-end justify-center opacity-40">
                <div className="bg-white w-1 h-full" />
                <div className="bg-white w-2 h-8" />
                <div className="bg-white w-1 h-10" />
                <div className="bg-white w-3 h-12" />
                <div className="bg-white w-1 h-full" />
                <div className="bg-white w-2 h-9" />
                <div className="bg-white w-1 h-11" />
                <div className="bg-white w-4 h-full" />
                <div className="bg-white w-1 h-7" />
                <div className="bg-white w-2 h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 w-full space-y-4">
          <button
            onClick={() => window.print()}
            className="w-full liquid-gradient py-5 rounded-full text-on-primary-container font-headline font-extrabold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/20 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">screenshot_region</span>
            Take Screenshot
          </button>
          <Link
            href="/"
            className="w-full bg-surface-container-high border border-outline-variant/[0.15] py-5 rounded-full text-white font-headline font-extrabold text-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">home</span>
            Return Home
          </Link>
        </div>
      </main>

      {/* Background Gradient Blurs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] right-[-10%] w-[40%] h-[40%] bg-tertiary/5 blur-[100px] rounded-full" />
      </div>

      <BottomNav />
    </>
  );
}
