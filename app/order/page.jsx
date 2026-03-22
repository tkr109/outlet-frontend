'use client';

import { useMemo, useState, useCallback, useRef, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import TopAppBar from '../../components/TopAppBar';
import BottomNav from '../../components/BottomNav';
import SwipeConfirm from '../../components/SwipeConfirm';
import { menu, outlet } from '../../lib/data';
import { ORDER_KEY, currency, emptyCustomer } from '../../lib/constants';
import { useCart } from '../../lib/CartContext';

function OrderPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cart, updateQty, clearCart, cartCount, subtotal, allItems } = useCart();
  const categories = useMemo(() => menu.map((c) => c.category), []);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showCheckout, setShowCheckout] = useState(searchParams.get('checkout') === 'true');
  const [customer, setCustomer] = useState(emptyCustomer);
  const sectionRefs = useRef({});

  const serviceFee = cartCount > 0 ? 10 : 0;
  const deliveryFee = customer.orderType === 'delivery' && cartCount > 0 ? 25 : 0;
  const total = subtotal + serviceFee + deliveryFee;

  const scrollToSection = (cat) => {
    setActiveCategory(cat);
    sectionRefs.current[cat]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleField = useCallback((field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  }, []);

  const canConfirm = cartCount > 0 && customer.name.trim() && customer.phone.trim() &&
    (customer.orderType !== 'delivery' || customer.address.trim());

  const handleConfirm = useCallback(() => {
    const now = new Date();
    const orderId = `GKZ-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Date.now().toString().slice(-4)}`;
    const items = allItems.filter((it) => cart[it.id]).map((it) => ({
      name: it.name, qty: cart[it.id], price: it.price, image: it.image,
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
    clearCart();
    router.push('/success');
  }, [cart, customer, allItems, subtotal, serviceFee, deliveryFee, total, router, clearCart]);

  // ─── CHECKOUT VIEW ───
  if (showCheckout) {
    return (
      <>
        <TopAppBar showBack onBack={() => setShowCheckout(false)} />
        <main className="pt-24 pb-40 px-6 max-w-lg mx-auto">
          <section className="mb-10">
            <h2 className="font-headline font-extrabold text-[36px] tracking-[-0.9px] text-white mb-2">Final Review</h2>
            <p className="font-body text-on-surface-variant text-sm">Fine-tune your details before the feast begins.</p>
          </section>
          <div className="space-y-8">
            {/* Delivery Toggle */}
            <div className="bg-surface-container-low p-1.5 rounded-full flex items-center">
              <button onClick={() => handleField('orderType', 'delivery')} className={`flex-1 py-3 px-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${customer.orderType === 'delivery' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-white'}`}>Home Delivery</button>
              <button onClick={() => handleField('orderType', 'takeaway')} className={`flex-1 py-3 px-4 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${customer.orderType === 'takeaway' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:text-white'}`}>Takeaway</button>
            </div>
            {/* Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-[1.2px] text-primary font-bold ml-1">Full Name</label>
                <input type="text" placeholder="Your name" value={customer.name} onChange={(e) => handleField('name', e.target.value)} className="w-full bg-surface-container-highest border-none rounded-[32px] px-6 py-4 text-white font-body focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-[1.2px] text-on-surface-variant font-bold ml-1">Phone Number</label>
                <input type="tel" placeholder="+357 99 000000" value={customer.phone} onChange={(e) => handleField('phone', e.target.value)} className="w-full bg-surface-container-highest border-none rounded-[32px] px-6 py-4 text-white font-body focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all outline-none" />
              </div>
            </div>
            {customer.orderType === 'delivery' && (
              <div className="space-y-6">
                <h3 className="font-headline font-bold text-[20px] text-white pt-2">Delivery Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="font-label text-xs uppercase tracking-[1.2px] text-on-surface-variant font-bold ml-1">House / Apt No.</label>
                    <input type="text" placeholder="Flat 4B" value={customer.address} onChange={(e) => handleField('address', e.target.value)} className="w-full bg-surface-container-highest border-none rounded-[32px] px-6 py-4 text-white font-body focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-xs uppercase tracking-[1.2px] text-on-surface-variant font-bold ml-1">Street Address</label>
                    <input type="text" placeholder="742 Evergreen Terrace" value={customer.landmark} onChange={(e) => handleField('landmark', e.target.value)} className="w-full bg-surface-container-highest border-none rounded-[32px] px-6 py-4 text-white font-body focus:ring-1 focus:ring-primary/40 placeholder:text-outline transition-all outline-none" />
                  </div>
                </div>
              </div>
            )}
            {/* Order Summary */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-[20px] text-white">Your Order</h3>
                <span className="font-label text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">{cartCount} ITEMS</span>
              </div>
              <div className="bg-surface-container-low rounded-[32px] p-6 space-y-4">
                {allItems.filter((it) => cart[it.id]).map((it) => (
                  <div key={it.id} className="flex items-start justify-between">
                    <div className="flex gap-4">
                      {it.image && <div className="w-12 h-12 rounded-[32px] bg-surface-container-highest overflow-hidden shrink-0 relative"><Image fill className="object-cover" src={it.image} alt={it.name} /></div>}
                      <div>
                        <p className="font-bold text-white text-sm">{it.name}</p>
                        <p className="text-xs text-on-surface-variant">{cart[it.id]} x {currency.format(it.price)}</p>
                      </div>
                    </div>
                    <p className="font-bold text-white text-sm">{currency.format(it.price * cart[it.id])}</p>
                  </div>
                ))}
                {cartCount === 0 && <p className="text-on-surface-variant text-sm text-center py-2">No items added yet.</p>}
                <div className="h-[1px] bg-outline-variant opacity-[0.15] my-2" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Subtotal</span><span className="text-white">{currency.format(subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Service Fee</span><span className="text-white">{currency.format(serviceFee)}</span></div>
                  {customer.orderType === 'delivery' && <div className="flex justify-between text-sm"><span className="text-on-surface-variant">Delivery Fee</span><span className="text-white">{currency.format(deliveryFee)}</span></div>}
                  <div className="flex justify-between text-lg pt-2"><span className="font-bold text-white">Total</span><span className="font-black text-primary">{currency.format(total)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <SwipeConfirm onConfirm={handleConfirm} disabled={!canConfirm} />
      </>
    );
  }

  // ─── MENU VIEW (all sections visible) ───
  return (
    <>
      <TopAppBar />
      <main className="pt-20 pb-44 px-6 max-w-2xl mx-auto">
        {/* Hero Hook */}
        <section className="mb-8">
          <h2 className="font-headline text-[36px] font-extrabold tracking-[-0.9px] text-on-surface mb-2">The Menu</h2>
          <p className="text-on-surface-variant font-body text-[16px]">Traditional Greek flavors, contemporary soul.</p>
        </section>

        {/* Category Pills */}
        <nav className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 -mx-6 px-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToSection(cat)}
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

        {/* All Menu Sections */}
        <div className="space-y-12">
          {menu.map((section) => (
            <section key={section.category} ref={(el) => { sectionRefs.current[section.category] = el; }} className="scroll-mt-28">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-headline text-[24px] font-extrabold text-on-surface">{section.category}</h3>
                <div className="h-px flex-grow bg-outline-variant/30" />
              </div>

              {/* Section note */}
              {section.note && <p className="text-[10px] text-on-surface-variant mb-4 italic uppercase tracking-[1px]">{section.note}</p>}

              {/* Special card for Souvlaki */}
              {section.special && (
                <div className="relative overflow-hidden bg-surface-container-low rounded-[32px] p-5 border border-primary/10 mb-4">
                  <div className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-[32px] text-[10px] font-black text-on-primary uppercase tracking-[-0.5px]">Special</div>
                  <h4 className="font-headline text-[20px] font-bold">{section.special.name}</h4>
                  <p className="text-xs text-on-surface-variant mt-1 mb-4">{section.special.note}</p>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-[1px]">Normal</span>
                      <span className="text-[18px] font-bold text-primary">{currency.format(section.special.normalPrice)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-[1px]">Large</span>
                      <span className="text-[18px] font-bold text-primary">{currency.format(section.special.largePrice)}</span>
                    </div>
                    <button onClick={() => updateQty(section.special.name, 1)} className="ml-auto bg-surface-container-highest w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Render items based on section type */}
              {section.category === 'Starters' && <StarterSection items={section.items} cart={cart} updateQty={updateQty} />}
              {section.category === 'Burgers' && <BurgerSection items={section.items} cart={cart} updateQty={updateQty} />}
              {section.category === 'Portions' && <PortionSection items={section.items} cart={cart} updateQty={updateQty} />}
              {section.category === 'Souvlaki & Doner' && <ListSection items={section.items} cart={cart} updateQty={updateQty} />}
              {section.category === 'Sandwiches' && <SandwichSection items={section.items} cart={cart} updateQty={updateQty} />}
              {(section.category === 'Drinks' || section.category === 'Sides') && <ListSection items={section.items} cart={cart} updateQty={updateQty} />}
            </section>
          ))}
        </div>
      </main>

      {/* Sticky Checkout Bar — always visible */}
      <aside className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="bg-surface-container-high/90 backdrop-blur-2xl rounded-[48px] p-[17px] shadow-2xl shadow-black/50 border border-outline-variant/[0.1] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[2px] text-on-surface-variant font-label font-bold">Your Bag</span>
            <span className="text-[20px] font-headline font-extrabold text-on-surface">{currency.format(subtotal)}</span>
          </div>
          <button
            onClick={() => cartCount > 0 && setShowCheckout(true)}
            className={`liquid-gradient px-8 py-3 rounded-full font-label font-bold text-on-primary-container uppercase tracking-[1.4px] text-sm flex items-center gap-2 shadow-lg shadow-primary/20 transition-all ${cartCount === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
          >
            Checkout
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </aside>

      <BottomNav />
    </>
  );
}

export default function OrderPage() {
  return (
    <Suspense>
      <OrderPageInner />
    </Suspense>
  );
}

// ─── SECTION COMPONENTS ───

function StarterSection({ items, cart, updateQty }) {
  const largeItems = items.filter((it) => it.image);
  const smallItems = items.filter((it) => !it.image);

  return (
    <div className="space-y-6">
      {/* Large salad cards */}
      {largeItems.map((item) => (
        <div key={item.id} className="group bg-surface-container-low rounded-[32px] p-4 transition-all duration-300 hover:bg-surface-container-high">
          <div className="flex gap-4">
            <div className="relative w-28 h-28 flex-shrink-0">
              <Image alt={item.name} fill className="object-cover rounded-[48px] shadow-lg group-hover:scale-105 transition-transform duration-500" src={item.image} />
            </div>
            <div className="flex flex-col justify-between py-1 flex-grow">
              <div>
                <h4 className="font-headline text-[18px] font-bold text-on-surface leading-tight">{item.name}</h4>
                <p className="text-on-surface-variant text-xs mt-1">{item.greek && `${item.greek} - `}{item.note}</p>
              </div>
              <div className="flex flex-col items-start gap-2 mt-3">
                <span className="font-headline text-[18px] font-extrabold text-primary leading-none">{currency.format(item.price)}</span>
                <ItemButton id={item.id} cart={cart} updateQty={updateQty} />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Small dip grid */}
      {smallItems.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {smallItems.map((item) => (
            <div key={item.id} className="bg-surface-container-low rounded-[32px] p-4 flex flex-col justify-between gap-4">
              <div>
                <h4 className="font-headline font-bold text-on-surface">{item.name}</h4>
                <p className="text-[10px] text-on-surface-variant uppercase">{item.note}</p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <span className="text-primary font-bold">{currency.format(item.price)}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-surface-container-highest rounded-full hover:bg-primary hover:text-on-primary-container transition-colors">
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BurgerSection({ items, cart, updateQty }) {
  const imageItems = items.filter((it) => it.image);
  const listItems = items.filter((it) => !it.image);

  return (
    <div className="space-y-4">
      {imageItems.map((item) => (
        <div key={item.id} className="group flex items-start gap-4 bg-surface-container-low rounded-[32px] p-4">
          <Image alt={item.name} width={80} height={80} className="w-20 h-20 rounded-[32px] object-cover" src={item.image} />
          <div className="flex-grow">
            <h4 className="font-headline font-bold text-on-surface">{item.name}</h4>
            <p className="text-xs text-on-surface-variant">{item.note}</p>
            <div className="flex flex-col items-start gap-2 mt-2">
              <span className="font-bold text-primary leading-none">{currency.format(item.price)}</span>
              <ItemButton id={item.id} cart={cart} updateQty={updateQty} variant="text" />
            </div>
          </div>
        </div>
      ))}
      {listItems.length > 0 && (
        <div className="space-y-2">
          {listItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 p-3 border-b border-outline-variant/10">
              <span className="text-sm font-medium">{item.name}</span>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-bold text-primary">{currency.format(item.price)}</span>
                <button onClick={() => updateQty(item.id, 1)} className="text-primary leading-none">
                  <span className="material-symbols-outlined text-xl">add_circle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PortionSection({ items, cart, updateQty }) {
  const gridItems = items.filter((it) => it.image);
  const listItems = items.filter((it) => !it.image);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {gridItems.map((item) => (
          <div key={item.id} className={`relative bg-surface-container-high p-4 rounded-[48px] flex flex-col items-center text-center ${item.popular ? 'border-2 border-primary/20' : ''}`}>
            {item.popular && (
              <span className="absolute top-3 right-3 bg-primary text-on-primary text-[8px] font-black uppercase tracking-[1px] px-2.5 py-1 rounded-full z-10">
                Popular
              </span>
            )}
            <Image alt={item.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover mb-3" src={item.image} />
            <h4 className="text-sm font-bold">{item.name}</h4>
            <span className="text-primary font-black mt-2">{currency.format(item.price)}</span>
            <button
              onClick={() => updateQty(item.id, 1)}
              className="mt-3 w-full py-1.5 rounded-full text-[10px] font-bold uppercase bg-background hover:bg-primary hover:text-on-primary transition-colors"
            >
              Select
            </button>
          </div>
        ))}
      </div>
      {listItems.length > 0 && (
        <div className="bg-surface-container-low rounded-[32px] divide-y divide-outline-variant/10">
          {listItems.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold">{item.name}</h4>
                {item.greek && <span className="text-xs text-on-surface-variant">{item.greek}</span>}
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-bold text-primary">{currency.format(item.price)}</span>
                <button onClick={() => updateQty(item.id, 1)} className="text-zinc-500 hover:text-primary transition-colors leading-none">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ListSection({ items, cart, updateQty }) {
  return (
    <div className="bg-surface-container-low rounded-[32px] divide-y divide-outline-variant/10">
      {items.map((item) => (
        <div key={item.id} className="p-4 flex items-start justify-between gap-4">
          <div>
            <h4 className="font-bold">{item.name}</h4>
            {item.greek && <span className="text-xs text-on-surface-variant">{item.greek}</span>}
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs font-bold text-primary leading-none">{currency.format(item.price)}</span>
            <ItemButton id={item.id} cart={cart} updateQty={updateQty} size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SandwichSection({ items, cart, updateQty }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="bg-surface-container-low rounded-[32px] p-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="font-bold text-on-surface truncate">{item.name}</h4>
            <p className="text-xs text-on-surface-variant mt-1">{item.greek && `${item.greek} - `}{item.note}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="font-bold text-primary leading-none">{currency.format(item.price)}</span>
            <ItemButton id={item.id} cart={cart} updateQty={updateQty} size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ItemButton({ id, cart, updateQty, variant = 'pill', size = 'md' }) {
  const isSmall = size === 'sm';
  const quantity = cart[id] || 0;

  if (quantity > 0) {
    return (
      <div className={`inline-flex items-center bg-surface-container-highest rounded-full border border-outline-variant/20 ${isSmall ? 'px-1 py-0.5 gap-1 min-w-[4.8rem]' : 'p-1 gap-3'}`}>
        <button
          type="button"
          onClick={() => updateQty(id, -1)}
          className={`${isSmall ? 'w-7 h-7' : 'w-8 h-8'} flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors`}
        >
          {isSmall ? <span className="text-[15px] font-black leading-none">-</span> : <span className="material-symbols-outlined text-lg">remove</span>}
        </button>
        <span className={`${isSmall ? 'text-xs min-w-[1rem]' : 'text-sm min-w-[1rem]'} font-label font-bold text-center`}>{quantity}</span>
        <button
          type="button"
          onClick={() => updateQty(id, 1)}
          className={`${isSmall ? 'w-7 h-7' : 'w-8 h-8'} flex items-center justify-center bg-primary rounded-full text-on-primary-container shadow-sm`}
        >
          {isSmall ? <span className="text-[15px] font-black leading-none">+</span> : <span className="material-symbols-outlined text-lg">add</span>}
        </button>
      </div>
    );
  }
  if (variant === 'text') {
    return (
      <button type="button" onClick={() => updateQty(id, 1)} className="text-xs font-bold uppercase tracking-[1.2px] text-on-surface-variant hover:text-primary transition-colors">Add</button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => updateQty(id, 1)}
      className={`bg-surface-container-highest text-on-surface rounded-full font-label font-bold uppercase tracking-[1px] hover:bg-primary hover:text-on-primary-container transition-all ${
        isSmall ? 'px-3 py-1 text-[9px]' : 'px-4 py-1.5 text-[10px]'
      }`}
    >
      Add
    </button>
  );
}
