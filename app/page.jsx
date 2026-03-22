'use client';

import Link from 'next/link';
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
            <div className="col-span-2 bg-surface-container-low rounded-[32px] h-[144px] flex items-center justify-between overflow-hidden relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
                <h4 className="font-headline text-[20px] font-bold">Artisanal Pastas</h4>
                <p className="text-on-surface-variant text-xs mt-1">Hand-rolled daily with organic semolina</p>
              </div>
              <img
                alt="Pasta"
                className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-24 h-24 rounded-full object-cover rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-xl"
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2000&auto=format&fit=crop"
              />
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
        <section className="grid grid-cols-1 gap-4">
          <div className="glass-panel p-[25px] rounded-[32px] flex items-start space-x-4 border border-outline-variant/[0.15]">
            <div className="p-3 rounded-xl bg-surface-container-highest">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
            </div>
            <div className="pl-4">
              <h4 className="font-headline font-bold text-[18px]">Takeaway Timings</h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between w-full text-xs font-label uppercase tracking-[0.6px]">
                  <span className="text-on-surface-variant">Daily</span>
                  <span className="text-white">{outlet.takeawayTiming}</span>
                </div>
                <div className="flex justify-between w-full text-xs font-label uppercase tracking-[0.6px]">
                  <span className="text-on-surface-variant">Closed</span>
                  <span className="text-white">{outlet.closedDay}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel p-[25px] rounded-[32px] flex items-start space-x-4 border border-outline-variant/[0.15]">
            <div className="p-3 rounded-xl bg-surface-container-highest">
              <span className="material-symbols-outlined text-tertiary">moped</span>
            </div>
            <div className="pl-4">
              <h4 className="font-headline font-bold text-[18px]">Delivery Timings</h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between w-full text-xs font-label uppercase tracking-[0.6px]">
                  <span className="text-on-surface-variant">Daily Window</span>
                  <span className="text-white">{outlet.deliveryTiming}</span>
                </div>
                <p className="text-[10px] text-tertiary/80 mt-2 font-medium">Free delivery 18:00 - 21:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="pb-12">
          <h3 className="font-headline text-[24px] font-bold tracking-[-0.6px] px-2 mb-4">Our Community</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex-shrink-0 w-40 h-52 rounded-[32px] overflow-hidden relative">
              <img alt="Social post 1" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1414235077428-338988a2e8c0?q=80&w=2000&auto=format&fit=crop" />
              <div className="absolute top-2 right-2 p-1.5 glass-panel rounded-full">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-40 h-52 rounded-[32px] overflow-hidden relative">
              <img alt="Social post 2" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1498837167922-4115340058b8?q=80&w=2000&auto=format&fit=crop" />
              <div className="absolute top-2 right-2 p-1.5 glass-panel rounded-full">
                <span className="material-symbols-outlined text-[16px]">videocam</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-40 h-52 rounded-[32px] overflow-hidden relative">
              <img alt="Social post 3" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop" />
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
