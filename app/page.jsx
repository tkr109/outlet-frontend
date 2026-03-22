'use client';

import Link from 'next/link';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';
import { outlet } from '../lib/data';

export default function HomePage() {
  return (
    <>
      <TopAppBar />
      <main className="pt-16 px-4 space-y-8 max-w-2xl mx-auto">
        {/* Hero Section */}
        <section className="relative mt-4">
          <div className="relative h-[480px] w-full rounded-[1rem] overflow-hidden group">
            <img
              alt="Signature dish"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjJwziBGqV6hPj1haKtBsvMTeljWT4intQI9xkfUrxTOfsM88HzlQj3A0GwMRUHkYXgGEywVuDFpiUIh66oruBVyMU5TXfS4yoal-tqi19bcKWWNvJCkeEX1KWwqwHdCGhABR1L2gSOGakt1EszMqU6_7uigeJUapdJcR5lbpcP-HmX1Z8DkNR1w0vkeLpE51sH3nm4FibXypDCu5ODkcmLgsNiShpzWuL3d78tbsTrCpDK99CarfMd-Fa4iElAbq1Zs8ATbT-qpc"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-6 right-6 space-y-4">
              <span className="inline-block px-4 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label text-[10px] uppercase tracking-widest font-bold">
                Chef&apos;s Choice
              </span>
              <h2 className="font-headline text-4xl font-extrabold tracking-tight leading-none text-on-surface">
                {outlet.specialties[0]}
              </h2>
              <p className="font-body text-on-surface-variant text-sm max-w-[280px]">
                {outlet.tagline}
              </p>
              <Link
                href="/order"
                className="liquid-gradient block w-full py-4 rounded-full font-headline font-bold text-on-primary-container text-center shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                Order Now
              </Link>
            </div>
          </div>
        </section>

        {/* Food Speciality - Bento Style */}
        <section className="space-y-4">
          <h3 className="font-headline text-2xl font-bold tracking-tight px-2">Food Speciality</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-surface-container-low rounded-[1rem] p-6 flex items-center justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="font-headline text-xl font-bold">{outlet.specialties[1]}</h4>
                <p className="text-on-surface-variant text-xs mt-1">Loaded with fresh paneer and homestyle spices</p>
              </div>
              <img
                alt="Specialty"
                className="w-24 h-24 rounded-full object-cover -mr-4 rotate-12 group-hover:rotate-0 transition-transform duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3TiOJHJlJsQZbJTm16KfJTvfcTvpni_VV5IMqEzkclTAicO9vk5w9_crv3fk2Nclgz4OxRj9LYhbWOGldYzGOtjjkSS97GujAL_TQ5JOoOInH-NKeiPXqYohqP0F3mjMdf9iXUU3eHQx0sx8wuKTBgdrKAi-8OoCDUwsduE-W0odVoavEYzUYkNwHrcopqb8-MLNJlSWLkqxbgtnmJI2B2QwK9B1E7ptqEKdbbY0sV5cwaLX_XgA3IMlYcrsjziHnoggEd3PYdzc"
              />
            </div>
            <div className="bg-surface-container-high rounded-[1rem] p-5 space-y-3">
              <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <h4 className="font-headline text-lg font-bold">Fresh Daily</h4>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">Made fresh every day with locally sourced ingredients.</p>
            </div>
            <div className="bg-surface-container-high rounded-[1rem] p-5 space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">local_fire_department</span>
              </div>
              <h4 className="font-headline text-lg font-bold">Flame Grilled</h4>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">Smoky charcoal flavors in every bite.</p>
            </div>
          </div>
        </section>

        {/* Timing Sections */}
        <section className="grid grid-cols-1 gap-4">
          <div className="glass-panel p-6 rounded-[1rem] flex items-start space-x-4 border border-outline-variant/15">
            <div className="p-3 rounded-xl bg-surface-container-highest">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
            </div>
            <div>
              <h4 className="font-headline font-bold text-lg">Takeaway Timings</h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between w-full text-xs font-label uppercase tracking-wider">
                  <span className="text-on-surface-variant">Daily</span>
                  <span className="text-on-surface">{outlet.takeawayTiming}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-[1rem] flex items-start space-x-4 border border-outline-variant/15">
            <div className="p-3 rounded-xl bg-surface-container-highest">
              <span className="material-symbols-outlined text-tertiary">moped</span>
            </div>
            <div>
              <h4 className="font-headline font-bold text-lg">Delivery Timings</h4>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between w-full text-xs font-label uppercase tracking-wider">
                  <span className="text-on-surface-variant">Daily</span>
                  <span className="text-on-surface">{outlet.deliveryTiming}</span>
                </div>
                <p className="text-[10px] text-tertiary/80 mt-2 font-medium">Free delivery for orders above ₹500</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="pb-32">
          <h3 className="font-headline text-2xl font-bold tracking-tight px-2 mb-4">Our Community</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex-shrink-0 w-40 h-52 rounded-[1rem] overflow-hidden relative group">
              <img alt="Social post 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSUapt1W5yCyDtSZkHi_H1quAa4I1IuLbnXG885FrbLRA3oMqnPVe1Le__xv8ek-EGVIQjUgmm4-vREpRrn1zFsw6Cd9oVPJ14Rf1-7T-JMDT_TokBrsIpFDZdghZvoQ06vI99YpxWawEekTdqziBk5VgqyeQ-YwYDxtVk8ajl0Fa4gcXP3zH8TNwBtZ5u6L-sAcam0KXp8bQeOPl8LTpZ9i6V4sigxjBcAYZsf_DDmbe15-cn1SOXh3Qek5755HWsdORYgpR_jSk" />
              <div className="absolute top-2 right-2 p-1.5 glass-panel rounded-full">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-40 h-52 rounded-[1rem] overflow-hidden relative group">
              <img alt="Social post 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFzyzb1SlemEm_frbg87_0gUG2vjsXLzala5K7uPe5uLDuAY7gC6fDctP5bpbZKYjyNxHbZOetsenuFXX7gDwVGMg5rzE9bCF6yc73niI0hwpfZ9w4MNTrRbLNhfDqwV8NxcN0Nwc1Kq0haI7lQCckZhXTAYuT3dOWT4ag40x6RkzoOC4YPTvSlIliV-FH291fLPobJFMeh5GL6TWsshTnFic3QXWLH4iBXs3sr5YQesQMH5PsztJnmFSA55krQVTG1YbKvGpct7A" />
              <div className="absolute top-2 right-2 p-1.5 glass-panel rounded-full">
                <span className="material-symbols-outlined text-[16px]">videocam</span>
              </div>
            </div>
            <div className="flex-shrink-0 w-40 h-52 rounded-[1rem] overflow-hidden relative group">
              <img alt="Social post 3" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0qZ2fBqiRGD5P5V8o2UdJY32v3AR3R3vqrjHkNOVLNo4xFsZyz4Vv6KvoidyDbSqKq1V84gffjhHGEJX2D6cxGygqEenFzT_iO4zMCfmoxxhlhGbvP6-1Th7R6vIY4uus1wTQ2KW2qW2ZXXrKukShaSAAofOLMOlsH8v9JIdLcMNSxGNxQjcKJ8_Z8fkRb7slB_deOul9tuOyIc3cAeW_yOTOL3RM4Aj1BQdkWAIi0qf12jfATuRTkRRkCxWq6hunEHFhWCbwmbc" />
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
