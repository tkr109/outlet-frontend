'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { menu, outlet } from '../../lib/data';
import { ORDER_KEY, currency, emptyCustomer } from '../../lib/constants';
import SiteHeader from '../../components/SiteHeader';
import TimingBlock from '../../components/TimingBlock';
import BillRow from '../../components/BillRow';
import SwipeConfirm from '../../components/SwipeConfirm';

export default function OrderPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(menu[0].category);
  const [cart, setCart] = useState({});
  const [customer, setCustomer] = useState(emptyCustomer);
  const [confirmed, setConfirmed] = useState(false);

  const allItems = useMemo(() => menu.flatMap((group) => group.items), []);
  const activeItems = menu.find((group) => group.category === selectedCategory)?.items ?? menu[0].items;

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const item = allItems.find((entry) => entry.id === id);
          return item ? { ...item, qty } : null;
        })
        .filter(Boolean),
    [allItems, cart],
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const serviceFee = cartItems.length ? 10 : 0;
  const deliveryFee = customer.orderType === 'delivery' && cartItems.length ? 25 : 0;
  const total = subtotal + serviceFee + deliveryFee;

  useEffect(() => {
    setConfirmed(false);
  }, [customer.orderType]);

  const updateQty = (id, delta) => {
    setCart((current) => {
      const next = { ...current };
      const qty = (next[id] ?? 0) + delta;
      if (qty <= 0) {
        delete next[id];
      } else {
        next[id] = qty;
      }
      return next;
    });
  };

  const canReview =
    customer.name.trim() &&
    customer.phone.trim() &&
    cartItems.length > 0 &&
    (customer.orderType === 'takeaway' ||
      (customer.address.trim() && customer.city.trim() && customer.pincode.trim()));

  const confirmOrder = () => {
    if (!canReview) return;

    const order = {
      orderId: `GKZ-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${String(Date.now()).slice(-4)}`,
      createdAt: new Date().toISOString(),
      outletName: outlet.name,
      customer,
      items: cartItems,
      subtotal,
      serviceFee,
      deliveryFee,
      total,
      timings: customer.orderType === 'delivery' ? outlet.deliveryTiming : outlet.takeawayTiming,
    };

    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    setConfirmed(true);
    router.push('/success');
  };

  return (
    <main className="page-shell order-shell">
      <SiteHeader
        eyebrow="order desk"
        title="Quick, thumb-first ordering"
        note="Built to feel fast and clean on a small screen."
        actionLabel="Back Home"
        actionTo="/"
      />
      <header className="order-topbar">
        <div>
          <p className="eyebrow">Build your order</p>
          <h1>Pick food, choose mode, and swipe to confirm.</h1>
        </div>
        <Link className="text-link" href="/">
          Back home
        </Link>
      </header>

      <section className="order-layout">
        <div className="panel panel-menu">
          <div className="section-heading tight">
            <div>
              <p className="eyebrow">Menu card</p>
              <h2>Tap to add items</h2>
            </div>
          </div>
          <div className="menu-intro">
            <span>Swipe up on mobile-friendly cards</span>
            <strong>Freshly styled for quick decisions.</strong>
          </div>

          <div className="category-tabs">
            {menu.map((group) => (
              <button
                key={group.category}
                className={group.category === selectedCategory ? 'tab active' : 'tab'}
                onClick={() => setSelectedCategory(group.category)}
                type="button"
              >
                {group.category}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {activeItems.map((item) => (
              <article key={item.id} className="food-card">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.note}</p>
                </div>
                <div className="food-card-footer">
                  <strong>{currency.format(item.price)}</strong>
                  <div className="qty-controls">
                    <button type="button" onClick={() => updateQty(item.id, -1)}>
                      -
                    </button>
                    <span>{cart[item.id] ?? 0}</span>
                    <button type="button" onClick={() => updateQty(item.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="panel panel-summary">
          <div className="summary-kicker">
            <span className="status-dot" />
            <p>Order summary stays visible while you fill details.</p>
          </div>
          <div className="section-heading tight">
            <div>
              <p className="eyebrow">Order details</p>
              <h2>One screen, mobile ready</h2>
            </div>
          </div>

          <div className="form-stack">
            <label>
              Name
              <input
                value={customer.name}
                onChange={(event) => setCustomer((current) => ({ ...current, name: event.target.value }))}
                placeholder="Your name"
              />
            </label>

            <label>
              Phone
              <input
                value={customer.phone}
                onChange={(event) => setCustomer((current) => ({ ...current, phone: event.target.value }))}
                placeholder="10-digit number"
              />
            </label>

            <div className="toggle-row">
              <button
                type="button"
                className={customer.orderType === 'takeaway' ? 'toggle active' : 'toggle'}
                onClick={() => setCustomer((current) => ({ ...current, orderType: 'takeaway' }))}
              >
                Takeaway
              </button>
              <button
                type="button"
                className={customer.orderType === 'delivery' ? 'toggle active' : 'toggle'}
                onClick={() => setCustomer((current) => ({ ...current, orderType: 'delivery' }))}
              >
                Home Delivery
              </button>
            </div>

            {customer.orderType === 'delivery' ? (
              <div className="address-box">
                <label>
                  Address
                  <textarea
                    value={customer.address}
                    onChange={(event) => setCustomer((current) => ({ ...current, address: event.target.value }))}
                    placeholder="House number, street, area"
                    rows={3}
                  />
                </label>
                <div className="two-col">
                  <label>
                    Landmark
                    <input
                      value={customer.landmark}
                      onChange={(event) => setCustomer((current) => ({ ...current, landmark: event.target.value }))}
                      placeholder="Nearby place"
                    />
                  </label>
                  <label>
                    City
                    <input
                      value={customer.city}
                      onChange={(event) => setCustomer((current) => ({ ...current, city: event.target.value }))}
                      placeholder="City"
                    />
                  </label>
                </div>
                <label>
                  Pincode
                  <input
                    value={customer.pincode}
                    onChange={(event) => setCustomer((current) => ({ ...current, pincode: event.target.value }))}
                    placeholder="Postal code"
                  />
                </label>
              </div>
            ) : null}

            <label>
              Notes
              <textarea
                value={customer.notes}
                onChange={(event) => setCustomer((current) => ({ ...current, notes: event.target.value }))}
                placeholder="Extra instructions"
                rows={3}
              />
            </label>
          </div>

          <div className="timing-strip">
            <TimingBlock title="Takeaway timing" value={outlet.takeawayTiming} />
            <TimingBlock title="Delivery timing" value={outlet.deliveryTiming} />
          </div>

          <div className="summary-list">
            {cartItems.length === 0 ? (
              <p className="empty-state">No items added yet.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="summary-row">
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <strong>{currency.format(item.price * item.qty)}</strong>
                </div>
              ))
            )}
          </div>

          <div className="bill-box">
            <BillRow label="Subtotal" value={currency.format(subtotal)} />
            <BillRow label="Service fee" value={currency.format(serviceFee)} />
            <BillRow label="Delivery fee" value={currency.format(deliveryFee)} />
            <BillRow label="Total" value={currency.format(total)} emphasize />
          </div>

          <SwipeConfirm disabled={!canReview || confirmed} onConfirm={confirmOrder} />
          {!canReview ? <p className="helper-text">Add your details and at least one item before confirming.</p> : null}
        </aside>
      </section>
    </main>
  );
}
