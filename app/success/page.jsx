'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { outlet } from '../../lib/data';
import { ORDER_KEY, currency } from '../../lib/constants';
import SiteHeader from '../../components/SiteHeader';
import BillRow from '../../components/BillRow';

export default function SuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(ORDER_KEY);
    if (!raw) {
      router.replace('/order');
      return;
    }
    setOrder(JSON.parse(raw));
  }, [router]);

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
          <Link className="text-link" href="/order">
            New order
          </Link>
        </div>
      </section>
    </main>
  );
}
