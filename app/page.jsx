'use client';

import Link from 'next/link';
import Image from 'next/image';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import ChefChoiceCarousel from '../components/ChefChoiceCarousel';
import { outlet } from '../lib/data';

export default function HomePage() {
  return (
    <>
      <TopAppBar />
      <main className="pt-16 px-4 space-y-8 pb-32">
        {/* Hero Section */}
        <section className="relative mt-4">
          <ChefChoiceCarousel />
        </section>

        {/* Food Speciality - Bento Style */}
        <section className="space-y-4">
          <h3 className="font-headline text-[24px] font-bold tracking-[-0.6px] px-2">Food Speciality</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Full-width pasta card */}
            <div className="col-span-2 bg-surface-container-low rounded-[32px] h-[144px] overflow-hidden relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
                <h4 className="font-headline text-[20px] font-bold">Artisanal Pastas</h4>
                <p className="text-on-surface-variant text-xs mt-1">Hand-rolled daily with organic semolina</p>
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <Image
                  alt="Pasta"
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-xl"
                  src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2000&auto=format&fit=crop"
                />
              </div>
            </div>
            {/* Botanical */}
            <div className="rounded-[32px] p-5 space-y-3" style={{ backgroundColor: '#201f1f' }}>
              <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <h4 className="font-headline text-[18px] font-bold">Botanical</h4>
              <p className="text-on-surface-variant text-[11px] leading-[17.88px]">Sustainable, farm-to-table vegetable compositions.</p>
            </div>
            {/* Wood-Fired */}
            <div className="rounded-[32px] p-5 space-y-3" style={{ backgroundColor: '#201f1f' }}>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">local_fire_department</span>
              </div>
              <h4 className="font-headline text-[18px] font-bold">Wood-Fired</h4>
              <p className="text-on-surface-variant text-[11px] leading-[17.88px]">Ancient techniques using local oak and cherry wood.</p>
            </div>
          </div>
        </section>

        {/* Timing Sections */}
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
            footnote="Free delivery 18:00 - 21:00"
          />
        </section>

        {/* Community Section */}
        <section className="pb-12">
          <h3 className="font-headline text-[24px] font-bold tracking-[-0.6px] px-2 mb-4">Our Community</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex-shrink-0 w-40 h-52 rounded-[32px] overflow-hidden relative">
              <Image alt="Social post 1" fill className="object-cover" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop" />
              <div className="absolute top-2 right-2 p-1.5 glass-panel rounded-full">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-40 h-52 rounded-[32px] overflow-hidden relative">
              <Image alt="Social post 2" fill className="object-cover" src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop" />
              <div className="absolute top-2 right-2 p-1.5 glass-panel rounded-full">
                <span className="material-symbols-outlined text-[16px]">videocam</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-40 h-52 rounded-[32px] overflow-hidden relative">
              <Image alt="Social post 3" fill className="object-cover" src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop" />
              <div className="absolute top-2 right-2 p-1.5 glass-panel rounded-full">
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

function TimingCard({ icon, iconClass, title, label, value, footnote }) {
  return (
    <div className="glass-panel rounded-[24px] border border-outline-variant/[0.14] p-3 sm:p-4 shadow-[0_10px_28px_rgba(0,0,0,0.16)]">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-surface-container-highest sm:h-11 sm:w-11">
          <span className={`material-symbols-outlined ${iconClass}`}>{icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="font-headline text-[16px] font-bold tracking-[-0.3px] sm:text-[17px]">{title}</h4>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-on-surface-variant">{label}</p>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-[0.12em] text-on-surface-variant">{label}</span>
              <span className="block text-[13px] font-semibold text-white sm:text-[14px]">{value}</span>
            </div>
          </div>
          <div className="mt-3 h-px w-full bg-outline-variant/15" />
          <p className="mt-2 text-[10px] font-medium text-tertiary/85 sm:text-[11px]">{footnote}</p>
        </div>
      </div>
    </div>
  );
}
