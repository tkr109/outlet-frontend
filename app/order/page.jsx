'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TopAppBar from '../../components/TopAppBar';
import BottomNav from '../../components/BottomNav';
import SwipeConfirm from '../../components/SwipeConfirm';
import { menu, outlet } from '../../lib/data';
import { ORDER_KEY, currency, emptyCustomer } from '../../lib/constants';

export default function OrderPage() {
  const router = useRouter();
  const categories = useMemo(() => menu.map((c) => c.category), []);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [cart, setCart] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);

  const allItems = useMemo(() => menu.flatMap((c) => c.items), []);
  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);
  const subtotal = allItems.reduce((s, it) => s + (cart[it.id] || 0) * it.price, 0);
  const serviceFee = cartCount > 0 ? 10 : 0;
  const deliveryFee = customer.orderType === 'delivery' ? 25 : 0;
  const total = subtotal + serviceFee + deliveryFee;

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

  const handleField = useCallback((field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }, []);

  const canConfirm = cartCount > 0 && customer.name.trim() && customer.phone.trim() &&
    (customer.orderType !== 'delivery' || customer.address.trim());

  const handleConfirm = useCallback(() => {
    const now = new Date();
    const orderId = `GKZ-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Date.now().toString().slice(-4)}`;
    const items = allItems.filter((it) => cart[it.id]).map((it) => ({
      name: it.name, qty: cart[it.id], price: it.price,
    }));
    const order = { orderId, customer, items, subtotal, serviceFee, deliveryFee, total, timestamp: now.toISOString() };
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));

    const lines = items.map((it) => `${it.qty}x ${it.name} — ${currency.format(it.price * it.qty)}`);
    const msg = [
      `*New Order: ${orderId}*`,
      `Name: ${customer.name}`, `Phone: ${customer.phone}`,
      `Type: ${customer.orderType}`,
      customer.orderType === 'delivery' ? `Address: ${customer.address}` : null,
      '', ...lines, '',
      `Subtotal: ${currency.format(subtotal)}`,
      `Service: ${currency.format(serviceFee)}`,
      customer.orderType === 'delivery' ? `Delivery: ${currency.format(deliveryFee)}` : null,
      `*Total: ${currency.format(total)}*`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${outlet.ownerWhatsApp}?text=${encodeURIComponent(msg)}`, '_blank');
    router.push('/success');
  }, [cart, customer, allItems, subtotal, serviceFee, deliveryFee, total, router]);

  if (showCheckout) {
    return (
      <>
        <TopAppBar showBack cartCount={cartCount} />
        <main className="pt-24 pb-40 px-6 max-w-lg mx-auto">
          <section className="mb-10">
            <h2 className="font-headline font-extrabold text-4xl tracking-tight text-white mb-2">Final Review</h2>
            <p className="font-body text-on-surface-variant text-sm">Fine-tune your details before the feast begins.</p>
          </section>

          <div className="space-y-8">
            {/* Delivery Toggle */}
            <div className="bg-surface-container-low p-1.5 rounded-full flex items-center">
              <button
                onClick={() => handleField('orderType', 'delivery')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                  customer.orderType === 'delivery'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Home Delivery
              </button>
              <button
                onClick={() => handleField('orderType', 'takeaway')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                  customer.orderType === 'takeaway'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                Takeaway
              </button>
            </div>

            {/* Identity Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-primary font-bold ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={customer.name}
                  onChange={(e) => handleField('name', e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-[1rem] px-6 py-4 text-white font-body focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 99999 99999"
                  value={customer.phone}
                  onChange={(e) => handleField('phone', e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-[1rem] px-6 py-4 text-white font-body focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all"
                />
              </div>
            </div>

            {/* Address Fields (Conditional) */}
            {customer.orderType === 'delivery' && (
              <div className="space-y-6">
                <h3 className="font-headline font-bold text-xl text-white pt-2">Delivery Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">House / Apt No.</label>
                    <input
                      type="text"
                      placeholder="Flat 4B"
                      value={customer.address}
                      onChange={(e) => handleField('address', e.target.value)}
                      className="w-full bg-surface-container-highest border-none rounded-[1rem] px-6 py-4 text-white font-body focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold ml-1">Landmark (Optional)</label>
                    <input
                      type="text"
                      placeholder="Near the central plaza"
                      value={customer.landmark}
                      onChange={(e) => handleField('landmark', e.target.value)}
                      className="w-full bg-surface-container-highest border-none rounded-[1rem] px-6 py-4 text-white font-body focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-xl text-white">Your Order</h3>
                <span className="font-label text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
                  {cartCount} ITEMS
                </span>
              </div>
              <div className="bg-surface-container-low rounded-[1rem] p-6 space-y-4">
                {allItems.filter((it) => cart[it.id]).map((it) => (
                  <div key={it.id} className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-[0.75rem] bg-surface-container-highest overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" src={it.image} alt={it.name} />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{it.name}</p>
                        <p className="text-xs text-on-surface-variant">{cart[it.id]} x {currency.format(it.price)}</p>
                      </div>
                    </div>
                    <p className="font-bold text-white text-sm">{currency.format(it.price * cart[it.id])}</p>
                  </div>
                ))}
                <div className="h-[1px] bg-outline-variant opacity-[0.15] my-2" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="text-white">{currency.format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Service Fee</span>
                    <span className="text-white">{currency.format(serviceFee)}</span>
                  </div>
                  {customer.orderType === 'delivery' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-on-surface-variant">Delivery Fee</span>
                      <span className="text-white">{currency.format(deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg pt-2">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-black text-primary">{currency.format(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <SwipeConfirm onConfirm={handleConfirm} disabled={!canConfirm} />
      </>
    );
  }

  return (
    <>
      <TopAppBar cartCount={cartCount} />
      <main className="pt-20 pb-44 px-6 max-w-2xl mx-auto">
        {/* Hero Hook */}
        <section className="mb-8">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">The Menu</h2>
          <p className="text-on-surface-variant font-body">Fresh, fiery flavors delivered to your doorstep.</p>
        </section>

        {/* Category Pills */}
        <nav className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-label text-sm font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'liquid-gradient text-on-primary-container shadow-lg shadow-primary/20'
                  : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Menu Items */}
        <div className="space-y-8">
          {menu
            .filter((c) => c.category === activeCategory)
            .flatMap((c) => c.items)
            .map((item) => (
              <div
                key={item.id}
                className="group relative bg-surface-container-low rounded-[1rem] p-4 transition-all duration-300 hover:bg-surface-container-high"
              >
                <div className="flex gap-4">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      src={item.image}
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1 flex-grow">
                    <div>
                      <h3 className="font-headline text-xl font-bold text-on-surface leading-tight">{item.name}</h3>
                      <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">{item.note}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-headline text-lg font-extrabold text-primary">{currency.format(item.price)}</span>
                      {cart[item.id] ? (
                        <div className="flex items-center bg-surface-container-highest rounded-full p-1 gap-3">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-lg">remove</span>
                          </button>
                          <span className="font-label font-bold text-sm min-w-[1rem] text-center">{cart[item.id]}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-on-primary-container shadow-sm"
                          >
                            <span className="material-symbols-outlined text-lg">add</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="bg-surface-container-highest text-on-surface px-4 py-2 rounded-full font-label text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary-container transition-all"
                        >
                          Add to bag
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* Sticky Checkout Bar */}
      {cartCount > 0 && (
        <aside className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
          <div className="bg-surface-container-high/90 backdrop-blur-2xl rounded-xl p-4 shadow-2xl shadow-black/50 border border-outline-variant/[0.1] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-label font-bold">
                Total Estimate
              </span>
              <span className="text-xl font-headline font-extrabold text-on-surface">
                {currency.format(subtotal)}
              </span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="liquid-gradient px-8 py-3 rounded-full font-label font-extrabold text-on-primary-container uppercase tracking-widest text-sm flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Checkout
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </aside>
      )}

      <BottomNav />
    </>
  );
}
