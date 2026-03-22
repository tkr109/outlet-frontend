import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { menu, outlet } from './data';

const ORDER_KEY = 'gharkazaika:last-order';

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const emptyCustomer = {
  name: '',
  phone: '',
  orderType: 'takeaway',
  address: '',
  landmark: '',
  city: '',
  pincode: '',
  notes: '',
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function HomePage() {
  return (
    <main className="page-shell">
      <SiteHeader
        eyebrow="food outlet"
        title={outlet.name}
        note="Mobile-first ordering with a clean, screenshot-friendly flow."
        actionLabel="Order Now"
        actionTo="/order"
      />
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Mobile-first food outlet</p>
          <h1>{outlet.name}</h1>
          <p className="lede">{outlet.tagline}</p>
          <p className="body-copy">{outlet.description}</p>
          <div className="feature-strip">
            <FeatureTile label="Fresh" value="Made daily" />
            <FeatureTile label="Speed" value="Fast pickup" />
            <FeatureTile label="Mobile" value="Thumb friendly" />
          </div>
          <div className="hero-actions">
            <Link className="primary-btn" to="/order">
              Start Order
            </Link>
            <a className="secondary-btn" href={`https://wa.me/${outlet.ownerWhatsApp}`} target="_blank" rel="noreferrer">
              WhatsApp Owner
            </a>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-frame">
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />
            <div className="hero-frame-content">
              <p className="eyebrow">Today&apos;s flow</p>
              <h2>Choose food, confirm with a swipe, and keep the receipt on screen.</h2>
              <div className="mini-metrics">
                <div>
                  <strong>2 min</strong>
                  <span>checkout</span>
                </div>
                <div>
                  <strong>2 modes</strong>
                  <span>pickup or delivery</span>
                </div>
                <div>
                  <strong>1 screen</strong>
                  <span>screenshot ready</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-card-top">
            <span className="pill">Takeaway</span>
            <span className="pill muted">Delivery</span>
          </div>
          <div className="timing-grid">
            <TimingBlock title="Takeaway" value={outlet.takeawayTiming} />
            <TimingBlock title="Home Delivery" value={outlet.deliveryTiming} />
          </div>
          <p className="subtle">Address: {outlet.addressLine}</p>
        </div>
      </section>

      <section className="content-grid">
        <Card title="Food Speciality">
          <div className="speciality-list">
            {outlet.specialties.map((item) => (
              <article key={item.name} className="speciality-item">
                <h3>{item.name}</h3>
                <p>{item.blurb}</p>
              </article>
            ))}
          </div>
        </Card>

        <Card title="Social Handles">
          <div className="social-list">
            {outlet.socials.map((social) => (
              <div key={social.label} className="social-item">
                <span>{social.label}</span>
                <strong>{social.handle}</strong>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="menu-preview">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Menu card</p>
            <h2>Quick picks for hungry users on mobile.</h2>
          </div>
          <Link className="text-link" to="/order">
            Open full menu
          </Link>
        </div>

        <div className="preview-cards">
          {menu.flatMap((group) => group.items).slice(0, 5).map((item) => (
            <article key={item.id} className="menu-mini-card">
              <div>
                <h3>{item.name}</h3>
                <p>{item.note}</p>
              </div>
              <strong>{currency.format(item.price)}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function OrderPage() {
  const navigate = useNavigate();
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
    navigate('/success');
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
        <Link className="text-link" to="/">
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

function SuccessPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(ORDER_KEY);
    if (!raw) {
      navigate('/order', { replace: true });
      return;
    }
    setOrder(JSON.parse(raw));
  }, [navigate]);

  if (!order) {
    return <main className="page-shell loading-state">Loading confirmation...</main>;
  }

  const whatsappText = encodeURIComponent(
    [
      `New order ${order.orderId}`,
      `Name: ${order.customer.name}`,
      `Phone: ${order.customer.phone}`,
      `Mode: ${order.customer.orderType}`,
      `Items: ${order.items.map((item) => `${item.name} x ${item.qty}`).join(', ')}`,
      order.customer.orderType === 'delivery'
        ? `Address: ${order.customer.address}, ${order.customer.landmark}, ${order.customer.city} - ${order.customer.pincode}`
        : 'Pickup: takeaway',
      `Total: ${currency.format(order.total)}`,
    ].join('\n'),
  );

  return (
    <main className="page-shell success-shell">
      <SiteHeader
        eyebrow="confirmation"
        title="Receipt ready for screenshot"
        note="Everything the user needs is visible on one screen."
        actionLabel="New Order"
        actionTo="/order"
      />
      <section className="success-card">
        <p className="eyebrow">Order confirmed</p>
        <h1>Save this screen for pickup or delivery.</h1>
        <p className="lede">Your order summary is ready for screenshot and sharing.</p>

        <div className="receipt">
          <div className="receipt-top">
            <div>
              <span className="receipt-label">Order ID</span>
              <strong>{order.orderId}</strong>
            </div>
            <div>
              <span className="receipt-label">Placed at</span>
              <strong>{new Date(order.createdAt).toLocaleString()}</strong>
            </div>
          </div>

          <div className="receipt-section">
            <h2>Customer</h2>
            <p>{order.customer.name}</p>
            <p>{order.customer.phone}</p>
          </div>

          <div className="receipt-section">
            <h2>Mode</h2>
            <p className="capitalized">{order.customer.orderType}</p>
            <p>{order.timings}</p>
          </div>

          {order.customer.orderType === 'delivery' ? (
            <div className="receipt-section">
              <h2>Address</h2>
              <p>{order.customer.address}</p>
              <p>
                {order.customer.landmark}, {order.customer.city} - {order.customer.pincode}
              </p>
            </div>
          ) : null}

          <div className="receipt-section">
            <h2>Items</h2>
            {order.items.map((item) => (
              <div key={item.id} className="summary-row">
                <span>
                  {item.name} x {item.qty}
                </span>
                <strong>{currency.format(item.price * item.qty)}</strong>
              </div>
            ))}
          </div>

          <div className="bill-box receipt-bill">
            <BillRow label="Subtotal" value={currency.format(order.subtotal)} />
            <BillRow label="Service fee" value={currency.format(order.serviceFee)} />
            <BillRow label="Delivery fee" value={currency.format(order.deliveryFee)} />
            <BillRow label="Total" value={currency.format(order.total)} emphasize />
          </div>
        </div>

        <div className="hero-actions">
          <a
            className="primary-btn"
            href={`https://wa.me/${outlet.ownerWhatsApp}?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
          >
            Open WhatsApp
          </a>
          <button className="secondary-btn" type="button" onClick={() => window.print()}>
            Print / Screenshot
          </button>
          <Link className="text-link" to="/order">
            New order
          </Link>
        </div>
      </section>
    </main>
  );
}

function SiteHeader({ eyebrow, title, note, actionLabel, actionTo }) {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="header-note">{note}</p>
      </div>
      <Link className="header-chip" to={actionTo}>
        {actionLabel}
      </Link>
    </header>
  );
}

function FeatureTile({ label, value }) {
  return (
    <div className="feature-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function TimingBlock({ title, value }) {
  return (
    <div className="timing-block">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <article className="panel">
      <div className="section-heading tight">
        <div>
          <p className="eyebrow">{title}</p>
        </div>
      </div>
      {children}
    </article>
  );
}

function BillRow({ label, value, emphasize = false }) {
  return (
    <div className={emphasize ? 'bill-row total' : 'bill-row'}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SwipeConfirm({ disabled, onConfirm }) {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const reset = () => {
    setDragging(false);
    setProgress(0);
  };

  const handlePointerMove = (event) => {
    if (!dragging) return;
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const next = ((event.clientX - rect.left) / rect.width) * 100;
    setProgress(Math.max(0, Math.min(100, next)));
  };

  const handlePointerUp = () => {
    if (progress >= 78 && !disabled) {
      onConfirm();
      reset();
      return;
    }
    reset();
  };

  return (
    <div className={disabled ? 'swipe-wrap disabled' : 'swipe-wrap'}>
      <p className="swipe-label">Swipe to confirm</p>
      <div
        className="swipe-track"
        onPointerDown={(event) => {
          if (disabled) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={() => {
          if (dragging) handlePointerUp();
        }}
      >
        <div className="swipe-fill" style={{ width: `${progress}%` }} />
        <span className="swipe-text">{disabled ? 'Complete details first' : 'Swipe here to confirm'}</span>
        <div className="swipe-thumb" style={{ left: `calc(${progress}% - 22px)` }} />
      </div>
      <p className="helper-text">Release after moving the thumb across the track.</p>
    </div>
  );
}

export default App;
