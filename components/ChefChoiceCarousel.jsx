'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const carouselItems = [
  {
    id: 1,
    title: 'Smoked Truffle Rib-Eye',
    description: 'Traditional Greek flavors, contemporary soul.',
    image: '/images/photo-1558030006-450675393462.webp',
    tag: "Chef's Choice",
  },
  {
    id: 2,
    title: 'Wagyu Beef Burger',
    description: 'Double patty with aged cheddar and caramelized onions.',
    image: '/images/photo-1568901346375-23c9450c58cd.webp',
    tag: "Signature",
  },
  {
    id: 3,
    title: 'Wood-Fired Pizza',
    description: 'Authentic Neapolitan crust with San Marzano tomatoes.',
    image: '/images/photo-1513104890138-7c749659a591.webp',
    tag: "Classic",
  },
  {
    id: 4,
    title: 'Mediterranean Salad',
    description: 'Fresh seasonal greens with feta and kalamata olives.',
    image: '/images/photo-1512621776951-a57141f2eefd.webp',
    tag: "Fresh",
  },
  {
    id: 5,
    title: 'Artisanal Pasta',
    description: 'Hand-rolled daily with organic semolina and rich ragu.',
    image: '/images/photo-1473093295043-cdd812d0e601.webp',
    tag: "Special",
  },
  {
    id: 6,
    title: 'Grilled Seafood',
    description: 'Fresh local catch with lemon-herb butter.',
    image: '/images/photo-1615141982883-c7ad0e69fd62.webp',
    tag: "Premium",
  }
];

export default function ChefChoiceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipeStartX = useRef(0);
  const swipeActive = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  const currentItem = carouselItems[currentIndex];

  const handleSwipeStart = (event) => {
    swipeActive.current = true;
    swipeStartX.current = event.clientX;
  };

  const handleSwipeEnd = (event) => {
    if (!swipeActive.current) return;

    const deltaX = event.clientX - swipeStartX.current;
    swipeActive.current = false;

    if (Math.abs(deltaX) < 50) return;

    setCurrentIndex((prev) =>
      deltaX < 0 ? (prev + 1) % carouselItems.length : (prev - 1 + carouselItems.length) % carouselItems.length,
    );
  };

  return (
    <div
      className="relative h-[360px] sm:h-[480px] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden group touch-pan-y select-none"
      onPointerDown={handleSwipeStart}
      onPointerUp={handleSwipeEnd}
      onPointerCancel={() => {
        swipeActive.current = false;
      }}
      onPointerLeave={() => {
        swipeActive.current = false;
      }}
      style={{ touchAction: 'pan-y' }}
    >
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              index === currentIndex ? 'scale-100' : 'scale-105'
            }`}
            src={item.image}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 z-20" />
      
      {/* Dots indicator */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-30 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 p-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-6 left-5 right-5 sm:bottom-8 sm:left-6 sm:right-6 space-y-4 z-30">
        <span className="inline-block px-4 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-label text-[10px] uppercase tracking-[1px] font-bold transition-all duration-500">
          {currentItem.tag}
        </span>
        <h2 
          key={`title-${currentIndex}`}
          className="font-headline text-[28px] leading-[28px] sm:text-[36px] sm:leading-[36px] font-extrabold tracking-[-0.9px] text-white animate-fade-in-up"
        >
          {currentItem.title.split(' ').map((word, i, arr) => (
            i === arr.length - 2 ? <span key={i}>{word}<br /></span> : <span key={i}>{word} </span>
          ))}
        </h2>
        <p 
          key={`desc-${currentIndex}`}
          className="font-body text-white/90 text-sm leading-5 max-w-[240px] sm:max-w-[280px] animate-fade-in-up delay-75"
        >
          {currentItem.description}
        </p>
        <Link
          href="/order"
          className="liquid-gradient block w-full py-4 rounded-full font-headline font-bold text-[16px] text-on-primary-container text-center shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}
