'use client';

import Link from 'next/link';
import Image from 'next/image';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import ChefChoiceCarousel from '../components/ChefChoiceCarousel';
import { homepage, menu, outlet } from '../lib/data';
import { currency } from '../lib/constants';

const menuItemsById = new Map(
  menu.flatMap((section) =>
    section.items.map((item) => [
      item.id,
      {
        ...item,
        category: section.category,
      },
    ]),
  ),
);

export default function HomePage() {
  const featuredItems = homepage.featuredItemIds
    .map((itemId) => menuItemsById.get(itemId))
    .filter(Boolean);

  return (
    <>
      <TopAppBar />
      <main className="pt-16 px-4 space-y-8 pb-36">
        <section className="relative mt-4">
          <ChefChoiceCarousel />
        </section>

        <section className="space-y-4">
          <SectionHeader
            title="Popular Right Now"
            subtitle="A fast shortcut into what guests usually go for first."
            action={
              <Link
                href="/order"
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary"
              >
                Full Menu
              </Link>
            }
          />
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 hide-scrollbar">
            {featuredItems.map((item) => (
              <Link
                key={item.id}
                href="/order"
                className="glass-panel group relative flex w-[274px] flex-shrink-0 overflow-hidden rounded-[32px] border border-outline-variant/[0.14] p-4 shadow-[0_14px_34px_rgba(0,0,0,0.18)]"
              >
                <div className="flex min-h-[192px] flex-col justify-between pr-24">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                        {item.category}
                      </span>
                      {item.popular ? (
                        <span className="rounded-full bg-tertiary/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-tertiary">
                          Popular
                        </span>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="font-headline text-[24px] font-extrabold tracking-[-0.6px] text-white">
                        {item.name}
                      </h3>
                      <p className="mt-2 max-w-[170px] text-sm leading-5 text-on-surface-variant">
                        {item.note || 'Made fresh to order.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">
                        Starts at
                      </p>
                      <p className="font-headline text-[20px] font-bold text-primary">
                        {currency.format(item.price)}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                      Order Now
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 h-24 w-24 overflow-hidden rounded-full shadow-xl shadow-black/30 transition-transform duration-500 group-hover:scale-105">
                  <img
                    alt={item.name}
                    className="h-full w-full object-cover"
                    src={item.image}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeader
            title="Food Speciality"
            subtitle="The details that make the menu feel a little more house-made."
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 h-[144px] overflow-hidden rounded-[32px] bg-surface-container-low group">
              <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2">
                <h4 className="font-headline text-[20px] font-bold">Artisanal Pastas</h4>
                <p className="mt-1 text-xs text-on-surface-variant">
                  Hand-rolled daily with organic semolina
                </p>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <Image
                  alt="Pasta"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover rotate-12 shadow-xl transition-transform duration-500 group-hover:rotate-0"
                  src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2000&auto=format&fit=crop"
                />
              </div>
            </div>
            <div className="space-y-3 rounded-[32px] p-5" style={{ backgroundColor: '#201f1f' }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary/10 text-tertiary">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <h4 className="font-headline text-[18px] font-bold">Botanical</h4>
              <p className="text-[11px] leading-[17.88px] text-on-surface-variant">
                Sustainable, farm-to-table vegetable compositions.
              </p>
            </div>
            <div className="space-y-3 rounded-[32px] p-5" style={{ backgroundColor: '#201f1f' }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined">local_fire_department</span>
              </div>
              <h4 className="font-headline text-[18px] font-bold">Wood-Fired</h4>
              <p className="text-[11px] leading-[17.88px] text-on-surface-variant">
                Ancient techniques using local oak and cherry wood.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <TimingCard
            icon="shopping_bag"
            iconClass="text-primary"
            title="Takeaway Timings"
            label="Daily"
            value={outlet.takeawayTiming}
            footnote={`Closed ${outlet.closedDay}`}
          />
          <TimingCard
            icon="moped"
            iconClass="text-tertiary"
            title="Delivery Timings"
            label="Daily window"
            value={outlet.deliveryTiming}
            footnote="Village-friendly delivery window"
          />
        </section>

        <section className="space-y-4">
          <SectionHeader
            title="Find Us"
            subtitle="Simple pickup directions, with one tap out to Google Maps."
          />
          <div className="overflow-hidden rounded-[32px] border border-outline-variant/[0.14] bg-surface-container-low shadow-[0_14px_34px_rgba(0,0,0,0.18)]">
            <div className="relative aspect-[16/10] bg-surface-container-high">
              <iframe
                title={`${outlet.name} map location`}
                src={outlet.googleMapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  Pickup Location
                </p>
                <h3 className="font-headline text-[22px] font-extrabold tracking-[-0.5px] text-white">
                  {outlet.name}
                </h3>
                <p className="max-w-[28rem] text-sm leading-6 text-on-surface-variant">
                  {outlet.addressLabel}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <InfoChip label="Takeaway" value={outlet.takeawayTiming} accent="text-primary" />
                <InfoChip label="Delivery" value={outlet.deliveryTiming} accent="text-tertiary" />
              </div>
              <a
                href={outlet.googleMapsPlaceUrl}
                target="_blank"
                rel="noreferrer"
                className="liquid-gradient flex w-full items-center justify-center gap-3 rounded-full px-5 py-4 text-center font-headline text-[16px] font-bold text-on-primary-container shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined">map</span>
                Open in Google Maps
              </a>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeader
            title="Stay Connected"
            subtitle="Quick links for WhatsApp, direct contact, and guest feedback."
          />
          <div className="grid grid-cols-3 gap-3">
            {outlet.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="glass-panel flex min-h-[116px] flex-col items-center justify-center gap-3 rounded-[28px] border border-outline-variant/[0.14] px-3 py-4 text-center shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition-transform active:scale-95"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-container-highest text-primary">
                  <span className="material-symbols-outlined">{link.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{link.label}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">
                    Open Link
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <SectionHeader
            title="Guest Reviews"
            subtitle="A compact snapshot from public guest feedback."
          />
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 hide-scrollbar">
            {homepage.reviews.map((review, index) => (
              <article
                key={`${review.author}-${index}`}
                className="glass-panel flex w-[292px] flex-shrink-0 flex-col justify-between rounded-[32px] border border-outline-variant/[0.14] p-5 shadow-[0_14px_34px_rgba(0,0,0,0.18)]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className="material-symbols-outlined text-[18px]"
                          style={{
                            fontVariationSettings:
                              starIndex < review.rating ? "'FILL' 1" : "'FILL' 0",
                          }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="flex shrink-0 max-w-[100px] flex-col items-end rounded-full bg-tertiary/10 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-tertiary leading-none">
                      <span>{review.source}</span>
                      <span className="mt-1 text-[7px] tracking-[0.18em] opacity-80">{review.date}</span>
                    </span>
                  </div>
                  <p className="font-body text-[15px] leading-6 text-white">
                    “{review.quote}”
                  </p>
                </div>
                <div className="mt-5 border-t border-outline-variant/10 pt-4">
                  <p className="font-headline text-[17px] font-bold text-white">{review.author}</p>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    Public guest feedback summary
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-12">
          <SectionHeader
            title="Our Community"
            subtitle="A little atmosphere from what lands on the table."
          />
          <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
            <div className="relative h-52 w-40 flex-shrink-0 overflow-hidden rounded-[32px]">
              <Image
                alt="Social post 1"
                fill
                className="object-cover"
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="glass-panel absolute right-2 top-2 rounded-full p-1.5">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>
            <div className="relative h-52 w-40 flex-shrink-0 overflow-hidden rounded-[32px]">
              <Image
                alt="Social post 2"
                fill
                className="object-cover"
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="glass-panel absolute right-2 top-2 rounded-full p-1.5">
                <span className="material-symbols-outlined text-[16px]">videocam</span>
              </div>
            </div>
            <div className="relative h-52 w-40 flex-shrink-0 overflow-hidden rounded-[32px]">
              <Image
                alt="Social post 3"
                fill
                className="object-cover"
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
              />
              <div className="glass-panel absolute right-2 top-2 rounded-full p-1.5">
                <span className="material-symbols-outlined text-[16px]">favorite</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}

function SectionHeader({ title, subtitle, action = null }) {
  return (
    <div className="flex items-end justify-between gap-4 px-2">
      <div>
        <h2 className="font-headline text-[24px] font-bold tracking-[-0.6px] text-white">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 max-w-[28rem] text-sm leading-5 text-on-surface-variant">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function InfoChip({ label, value, accent }) {
  return (
    <div className="rounded-[24px] bg-surface-container-high p-4">
      <p className="text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">
        {label}
      </p>
      <p className={`mt-2 text-sm font-semibold ${accent}`}>{value}</p>
    </div>
  );
}

function TimingCard({ icon, iconClass, title, label, value, footnote }) {
  return (
    <div className="glass-panel rounded-[24px] border border-outline-variant/[0.14] p-3 shadow-[0_10px_28px_rgba(0,0,0,0.16)] sm:p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-surface-container-highest sm:h-11 sm:w-11">
          <span className={`material-symbols-outlined ${iconClass}`}>{icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-headline text-[16px] font-bold tracking-[-0.3px] sm:text-[17px]">
                {title}
              </h4>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-on-surface-variant">
                {label}
              </p>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.12em] text-on-surface-variant">
                {label}
              </span>
              <span className="block text-[13px] font-semibold text-white sm:text-[14px]">
                {value}
              </span>
            </div>
          </div>
          <div className="mt-3 h-px w-full bg-outline-variant/15" />
          <p className="mt-2 text-[10px] font-medium text-tertiary/85 sm:text-[11px]">
            {footnote}
          </p>
        </div>
      </div>
    </div>
  );
}
